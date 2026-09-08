import type { BlogPost } from "@/lib/blog";
import { getTheoryWorkbookPeerSlug, normalizeCategory } from "@/lib/blog-paths";
import {
  DatabaseClient,
  type ArticleSearchResult,
  resolveCloudflareEnv,
} from "@/lib/db/client";
import { PUBLIC_ARTICLE_CATEGORIES, isPublicArticleCategory } from "@/lib/site-catalog";
import { articleRecordToBlogPost } from "@/lib/content/map-article";
import {
  ARTICLES_PER_PAGE,
  RELATED_ARTICLE_LIMIT,
  SIDEBAR_ARTICLE_LIMIT,
} from "@/lib/content/pagination";

const PUBLIC_CATEGORIES = [...PUBLIC_ARTICLE_CATEGORIES];

async function getContentDb(): Promise<DatabaseClient> {
  const { env, ctx } = await resolveCloudflareEnv();
  return new DatabaseClient(env, ctx);
}

export interface PublishedListResult {
  articles: BlogPost[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export async function listPublishedArticles(options: {
  page?: number;
  limit?: number;
  category?: string;
  author?: string;
} = {}): Promise<PublishedListResult> {
  const db = await getContentDb();
  const category = options.category
    ? normalizeCategory(options.category)
    : undefined;
  if (category && !isPublicArticleCategory(category)) {
    const limit = options.limit ?? ARTICLES_PER_PAGE;
    return { articles: [], total: 0, page: options.page ?? 1, limit, pages: 0 };
  }
  const result = await db.listArticlesFiltered({
    page: options.page,
    limit: options.limit ?? ARTICLES_PER_PAGE,
    categories: category ? [category] : PUBLIC_CATEGORIES,
    author: options.author,
  });

  return {
    articles: result.articles.map(articleRecordToBlogPost),
    total: result.total,
    page: result.page,
    limit: result.limit,
    pages: result.pages,
  };
}

export async function getPublishedArticle(
  slug: string,
  category?: string
): Promise<BlogPost | null> {
  const db = await getContentDb();
  const normalized = category ? normalizeCategory(category) : undefined;
  const row = await db.getArticle(slug, normalized);
  if (!row || !isPublicArticleCategory(row.category)) return null;
  return articleRecordToBlogPost(row);
}

export async function countPublishedArticles(category?: string): Promise<number> {
  const db = await getContentDb();
  return db.countPublished(
    category ? [normalizeCategory(category)] : PUBLIC_CATEGORIES
  );
}

export async function getRelatedPublishedArticles(
  currentSlug: string,
  category: string,
  relatedRoutes: string[] = [],
  limit = RELATED_ARTICLE_LIMIT
): Promise<BlogPost[]> {
  const db = await getContentDb();
  const picked: BlogPost[] = [];
  const seen = new Set<string>([currentSlug]);

  const push = (article: BlogPost | undefined | null) => {
    if (!article || seen.has(article.slug) || picked.length >= limit) return;
    seen.add(article.slug);
    picked.push(article);
  };

  const peerSlug = getTheoryWorkbookPeerSlug(currentSlug);
  if (peerSlug) {
    const peer = await db.getArticle(peerSlug);
    if (peer) push(articleRecordToBlogPost(peer));
  }

  if (relatedRoutes.length > 0) {
    const routed = await db.getArticlesBySlugs(relatedRoutes);
    for (const row of routed) {
      push(articleRecordToBlogPost(row));
    }
  }

  if (picked.length < limit) {
    const more = await db.listArticlesFiltered({
      page: 1,
      limit: limit + 8,
      categories: [normalizeCategory(category)],
    });
    for (const row of more.articles) {
      push(articleRecordToBlogPost(row));
    }
  }

  return picked;
}

export async function getRelatedByKeywordsPublished(
  currentSlug: string,
  keywords: string[],
  limit = RELATED_ARTICLE_LIMIT
): Promise<BlogPost[]> {
  if (!keywords.length) return [];
  const db = await getContentDb();
  const rows = await db.getRelatedByTags(
    currentSlug,
    keywords,
    limit,
    PUBLIC_CATEGORIES
  );
  return rows.map(articleRecordToBlogPost);
}

export async function listSidebarArticles(
  category: string,
  currentSlug: string,
  limit = SIDEBAR_ARTICLE_LIMIT
): Promise<BlogPost[]> {
  const listed = await listPublishedArticles({
    category,
    page: 1,
    limit: limit + 1,
  });
  return listed.articles.filter((article) => article.slug !== currentSlug).slice(0, limit);
}

export async function searchPublishedArticles(options: {
  query: string;
  category?: string;
  match?: "any" | "all";
  limit?: number;
  offset?: number;
}): Promise<ArticleSearchResult> {
  const db = await getContentDb();
  const category =
    options.category && options.category !== "all"
      ? normalizeCategory(options.category)
      : undefined;
  return db.searchPublishedText({
    query: options.query,
    match: options.match,
    categories: category ? [category] : PUBLIC_CATEGORIES,
    limit: options.limit,
    offset: options.offset,
  });
}

export async function listSitemapArticles(offset: number, limit: number) {
  const db = await getContentDb();
  return db.listSitemapEntries(offset, limit, PUBLIC_CATEGORIES);
}
