import {
  getArticleBySlug,
  getBlogArticles,
  getRelatedArticles,
  getRelatedByKeywords,
  type BlogPost,
} from "@/lib/blog";
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

export function shouldUseMarkdownArticleFallback(): boolean {
  return (
    process.env.NODE_ENV !== "production" ||
    process.env.NEXT_PUBLIC_USE_MARKDOWN_FALLBACK === "1"
  );
}

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

function emptyPublishedList(page: number, limit: number): PublishedListResult {
  return { articles: [], total: 0, page, limit, pages: 0 };
}

function resolveListCategories(options: {
  category?: string;
  categories?: string[];
}): string[] | null {
  if (options.categories) {
    return options.categories.map(normalizeCategory).filter(isPublicArticleCategory);
  }
  if (options.category) {
    const category = normalizeCategory(options.category);
    return isPublicArticleCategory(category) ? [category] : [];
  }
  return null;
}

function listPublishedArticlesFromMarkdown(options: {
  page: number;
  limit: number;
  categories: string[] | null;
  author?: string;
}): PublishedListResult {
  let articles = getBlogArticles();
  if (options.categories) {
    const allowed = new Set(options.categories);
    articles = articles.filter((article) =>
      allowed.has(normalizeCategory(article.category)),
    );
  }
  if (options.author) {
    articles = articles.filter((article) => article.author === options.author);
  }
  const total = articles.length;
  const start = (options.page - 1) * options.limit;
  return {
    articles: articles.slice(start, start + options.limit),
    total,
    page: options.page,
    limit: options.limit,
    pages: total > 0 ? Math.ceil(total / options.limit) : 0,
  };
}

export async function listPublishedArticles(options: {
  page?: number;
  limit?: number;
  category?: string;
  categories?: string[];
  author?: string;
} = {}): Promise<PublishedListResult> {
  const page = options.page ?? 1;
  const limit = options.limit ?? ARTICLES_PER_PAGE;
  const categories = resolveListCategories(options);
  if (categories && categories.length === 0) {
    return emptyPublishedList(page, limit);
  }
  try {
    const db = await getContentDb();
    const result = await db.listArticlesFiltered({
      page,
      limit,
      categories: categories ?? PUBLIC_CATEGORIES,
      author: options.author,
    });

    return {
      articles: result.articles.map(articleRecordToBlogPost),
      total: result.total,
      page: result.page,
      limit: result.limit,
      pages: result.pages,
    };
  } catch (error) {
    if (!shouldUseMarkdownArticleFallback()) throw error;
    return listPublishedArticlesFromMarkdown({
      page,
      limit,
      categories,
      author: options.author,
    });
  }
}

export async function getPublishedArticle(
  slug: string,
  category?: string
): Promise<BlogPost | null> {
  try {
    const db = await getContentDb();
    const normalized = category ? normalizeCategory(category) : undefined;
    const row = await db.getArticle(slug, normalized);
    if (!row || !isPublicArticleCategory(row.category)) return null;
    return articleRecordToBlogPost(row);
  } catch (error) {
    if (!shouldUseMarkdownArticleFallback()) throw error;
    const article = getArticleBySlug(slug, category);
    if (!article || !isPublicArticleCategory(article.category)) return null;
    return article;
  }
}

export async function countPublishedArticles(category?: string): Promise<number> {
  try {
    const db = await getContentDb();
    return db.countPublished(
      category ? [normalizeCategory(category)] : PUBLIC_CATEGORIES
    );
  } catch (error) {
    if (!shouldUseMarkdownArticleFallback()) throw error;
    const listed = listPublishedArticlesFromMarkdown({
      page: 1,
      limit: 1,
      categories: category ? [normalizeCategory(category)] : null,
    });
    return listed.total;
  }
}

export async function countPublishedArticlesByCategory(
  categories: string[],
): Promise<Record<string, number>> {
  const publicCategories = categories
    .map(normalizeCategory)
    .filter(isPublicArticleCategory);
  const entries = await Promise.all(
    publicCategories.map(async (category) => {
      const total = await countPublishedArticles(category);
      return [category, total] as const;
    }),
  );
  return Object.fromEntries(entries);
}

export async function getRelatedPublishedArticles(
  currentSlug: string,
  category: string,
  relatedRoutes: string[] = [],
  limit = RELATED_ARTICLE_LIMIT
): Promise<BlogPost[]> {
  try {
  const db = await getContentDb();
  const picked: BlogPost[] = [];
  const seen = new Set<string>([`${normalizeCategory(category)}:${currentSlug}`]);

  const push = (article: BlogPost | undefined | null) => {
    if (!article) return;
    const key = `${normalizeCategory(article.category)}:${article.slug}`;
    if (seen.has(key) || picked.length >= limit) return;
    seen.add(key);
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
  } catch (error) {
    if (!shouldUseMarkdownArticleFallback()) throw error;
    return getRelatedArticles(currentSlug, category, limit);
  }
}

export async function getRelatedByKeywordsPublished(
  currentSlug: string,
  keywords: string[],
  limit = RELATED_ARTICLE_LIMIT
): Promise<BlogPost[]> {
  if (!keywords.length) return [];
  try {
    const db = await getContentDb();
    const rows = await db.getRelatedByTags(
      currentSlug,
      keywords,
      limit,
      PUBLIC_CATEGORIES
    );
    return rows.map(articleRecordToBlogPost);
  } catch (error) {
    if (!shouldUseMarkdownArticleFallback()) throw error;
    return getRelatedByKeywords(currentSlug, keywords, limit);
  }
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
