import { articleRecordToBlogPost, blogPostToArticleInput } from "@/lib/content/map-article";
import { ftsMatchQuery } from "@/lib/db/client";
import type { BlogPost } from "@/lib/blog";
import { parsePageParam, paginationHref } from "@/lib/content/pagination";

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
  });
});
