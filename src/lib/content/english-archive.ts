import { getBlogArticles, type BlogPost } from "@/lib/blog";
import { normalizeCategory } from "@/lib/blog-paths";
import {
  countPublishedArticlesByCategory,
  listPublishedArticles,
  type PublishedListResult,
} from "@/lib/content/articles";
import { ARTICLES_PER_PAGE } from "@/lib/content/pagination";
import {
  ENGLISH_LEARNING_CATEGORIES,
  isEnglishLearningCategory,
} from "@/lib/site-catalog";

const ENGLISH_CATEGORIES = [...ENGLISH_LEARNING_CATEGORIES];

export function tallyEnglishArchiveCounts(
  articles: Array<{ category: string }>,
): Record<string, number> {
  const counts = Object.fromEntries(ENGLISH_CATEGORIES.map((category) => [category, 0]));
  for (const article of articles) {
    const category = normalizeCategory(article.category);
    if (category in counts) {
      counts[category] += 1;
    }
  }
  return counts;
}

export function formatEsCount(n: number, singular: string, plural: string): string {
  const formatted = new Intl.NumberFormat("es-ES").format(n);
  return `${formatted} ${n === 1 ? singular : plural}`;
}

function paginateMarkdownArchive(
  articles: BlogPost[],
  page: number,
  limit: number,
): PublishedListResult {
  const total = articles.length;
  const start = (page - 1) * limit;
  return {
    articles: articles.slice(start, start + limit),
    total,
    page,
    limit,
    pages: total > 0 ? Math.ceil(total / limit) : 0,
  };
}

function listEnglishArchiveFromMarkdown(page: number, limit: number): PublishedListResult {
  const articles = getBlogArticles().filter((article) =>
    isEnglishLearningCategory(article.category),
  );
  return paginateMarkdownArchive(articles, page, limit);
}

/** Archivo de inglés (~800 guías): D1 en producción, markdown si no hay bindings. */
export async function listEnglishArchiveArticles(options: {
  page?: number;
  limit?: number;
} = {}): Promise<PublishedListResult> {
  const page = options.page ?? 1;
  const limit = options.limit ?? ARTICLES_PER_PAGE;
  try {
    return await listPublishedArticles({
      page,
      limit,
      categories: ENGLISH_CATEGORIES,
    });
  } catch {
    return listEnglishArchiveFromMarkdown(page, limit);
  }
}

export async function countEnglishArchiveByCategory(): Promise<Record<string, number>> {
  try {
    return await countPublishedArticlesByCategory(ENGLISH_CATEGORIES);
  } catch {
    return tallyEnglishArchiveCounts(getBlogArticles());
  }
}

export function totalEnglishArchiveCount(counts: Record<string, number>): number {
  return ENGLISH_CATEGORIES.reduce((sum, category) => sum + (counts[category] ?? 0), 0);
}
