import { articleRecordToBlogPost, blogPostToArticleInput } from "@/lib/content/map-article";
import { ftsMatchQuery } from "@/lib/db/client";
import type { BlogPost } from "@/lib/blog";
import {
  parsePageParam,
  paginationHref,
  isOutOfRangePage,
  sitemapShardCount,
  sitemapShardIds,
  isSitemapShardId,
  SITEMAP_CHUNK_SIZE,
  SITEMAP_MAX_SHARDS,
  SITEMAP_MAX_ARTICLE_URLS,
} from "@/lib/content/pagination";

describe("articleRecordToBlogPost", () => {
  it("maps D1 rows onto BlogPost including JSON faqs and tags", () => {
    const post = articleRecordToBlogPost({
      id: 1,
      slug: "como-empezar-a-aprender-un-idioma",
      title: "Cómo empezar",
      description: "Desc",
      content: "Cuerpo",
      category: "idiomas",
      excerpt: "Resumen",
      author: "linguafly-team",
      read_time: "8 min",
      faqs: JSON.stringify([
        { question: "¿Cuánto?", answer: "20 minutos" },
      ]),
      featured: 1,
      related_routes: JSON.stringify(["otro-slug"]),
      created_at: "2026-09-08T00:00:00.000Z",
      is_published: 1,
      tags: ["hábito de estudio de idiomas"],
    });

    expect(post.slug).toBe("como-empezar-a-aprender-un-idioma");
    expect(post.category).toBe("idiomas");
    expect(post.excerpt).toBe("Resumen");
    expect(post.featured).toBe(true);
    expect(post.published).toBe(true);
    expect(post.faqs).toEqual([{ question: "¿Cuánto?", answer: "20 minutos" }]);
    expect(post.relatedRoutes).toEqual(["otro-slug"]);
    expect(post.keywords).toEqual(["hábito de estudio de idiomas"]);
    expect(post.authorData?.slug).toBe("linguafly-team");
  });

  it("round-trips a BlogPost into ArticleInput for D1 upserts", () => {
    const article: BlogPost = {
      slug: "demo",
      title: "Demo",
      date: "2026-09-08",
      author: "linguafly-team",
      excerpt: "ex",
      description: "desc",
      category: "Alimentación",
      readTime: "5 min",
      keywords: ["proteína"],
      featured: true,
      published: true,
      content: "hola",
    };

    const input = blogPostToArticleInput(article);
    expect(input.category).toBe("alimentacion");
    expect(input.excerpt).toBe("ex");
    expect(input.tags).toEqual(["proteína"]);
    expect(input.featured).toBe(true);
    expect(input.isPublished).toBe(true);
  });

  it("marks English-learning archive posts as published for D1 even without the flag", () => {
    const article: BlogPost = {
      slug: "ingles-para-viajar",
      title: "Inglés para viajar",
      date: "2025-01-01",
      author: "linguafly-team",
      excerpt: "ex",
      category: "viajes",
      readTime: "8 min",
      keywords: ["viajes"],
      canonical: "https://linguafly.app/blog/viajes/ingles-para-viajar",
      content: "hola",
    };

    expect(blogPostToArticleInput(article).isPublished).toBe(true);
    expect(blogPostToArticleInput(article).canonical).toBe(
      "https://linguafly.app/blog/viajes/ingles-para-viajar"
    );
  });
});

describe("ftsMatchQuery", () => {
  it("quotes terms and joins with OR/AND", () => {
    expect(ftsMatchQuery("vocabulario activo!", "any")).toBe(
      '"vocabulario" OR "activo"'
    );
    expect(ftsMatchQuery("vocabulario activo", "all")).toBe(
      '"vocabulario" AND "activo"'
    );
  });

  it("strips MATCH operators and rejects tiny tokens", () => {
    expect(ftsMatchQuery("a OR b AND *", "any")).toBeNull();
    expect(ftsMatchQuery('foo "bar"', "any")).toBe('"foo" OR "bar"');
  });
});

describe("pagination helpers", () => {
  it("parses page params and builds hrefs", () => {
    expect(parsePageParam(undefined)).toBe(1);
    expect(parsePageParam("0")).toBe(1);
    expect(parsePageParam("3")).toBe(3);
    expect(paginationHref("/blog", 1)).toBe("/blog");
    expect(paginationHref("/blog", 2)).toBe("/blog?page=2");
    expect(paginationHref("/blog/idiomas", 4)).toBe("/blog/idiomas?page=4");
    expect(isOutOfRangePage(1, 0)).toBe(false);
    expect(isOutOfRangePage(1, 5)).toBe(false);
    expect(isOutOfRangePage(5, 5)).toBe(false);
    expect(isOutOfRangePage(2, 0)).toBe(true);
    expect(isOutOfRangePage(6, 5)).toBe(true);
  });
});

describe("sitemap shards", () => {
  it("keeps a single shard until the chunk fills", () => {
    expect(sitemapShardCount(0)).toBe(1);
    expect(sitemapShardCount(1)).toBe(1);
    expect(sitemapShardCount(SITEMAP_CHUNK_SIZE)).toBe(1);
    expect(sitemapShardCount(SITEMAP_CHUNK_SIZE + 1)).toBe(2);
  });

  it("covers more than a million article URLs before capping", () => {
    expect(sitemapShardCount(1_000_000)).toBe(25);
    expect(SITEMAP_MAX_ARTICLE_URLS).toBeGreaterThan(1_000_000);
    expect(sitemapShardCount(SITEMAP_MAX_ARTICLE_URLS)).toBe(SITEMAP_MAX_SHARDS);
    expect(sitemapShardCount(SITEMAP_MAX_ARTICLE_URLS + 1)).toBe(SITEMAP_MAX_SHARDS);
    expect(sitemapShardIds(943)).toEqual([{ id: 0 }]);
    expect(sitemapShardIds(1_000_000)).toHaveLength(25);
  });

  it("rejects shard ids outside the 1.2M ceiling", () => {
    expect(isSitemapShardId(0)).toBe(true);
    expect(isSitemapShardId(29)).toBe(true);
    expect(isSitemapShardId(30)).toBe(false);
    expect(isSitemapShardId(-1)).toBe(false);
    expect(isSitemapShardId(1.5)).toBe(false);
  });
});
