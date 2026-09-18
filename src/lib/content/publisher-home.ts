import { getBlogArticles, type BlogPost } from "@/lib/blog";
import { listPublishedArticles } from "@/lib/content/articles";
import { SITE_VERTICALS, type SiteVertical } from "@/lib/site-catalog";

export const PUBLISHER_SECONDARY_COUNT = 3;
export const PUBLISHER_LATEST_COUNT = 8;
export const PUBLISHER_RAIL_COUNT = 4;
export const PUBLISHER_NEWS_COUNT = 4;
export const NEWS_CATEGORY = "actualidad";

export type PublisherRail = {
  vertical: SiteVertical;
  articles: BlogPost[];
};

export type PublisherHomeModel = {
  featured: BlogPost | null;
  secondary: BlogPost[];
  latest: BlogPost[];
  news: BlogPost[];
  rails: PublisherRail[];
  more: BlogPost[];
};

function articleKey(article: BlogPost): string {
  return `${article.category}:${article.slug}`;
}

function takeUnused(
  articles: BlogPost[],
  seen: Set<string>,
  limit: number,
): BlogPost[] {
  const picked: BlogPost[] = [];
  for (const article of articles) {
    const key = articleKey(article);
    if (seen.has(key)) continue;
    seen.add(key);
    picked.push(article);
    if (picked.length >= limit) break;
  }
  return picked;
}

export function buildPublisherHome(
  articles: BlogPost[],
  options: {
    secondaryCount?: number;
    latestCount?: number;
    railCount?: number;
    newsCount?: number;
  } = {},
): PublisherHomeModel {
  const secondaryCount = options.secondaryCount ?? PUBLISHER_SECONDARY_COUNT;
  const latestCount = options.latestCount ?? PUBLISHER_LATEST_COUNT;
  const railCount = options.railCount ?? PUBLISHER_RAIL_COUNT;
  const newsCount = options.newsCount ?? PUBLISHER_NEWS_COUNT;
  const seen = new Set<string>();
  const newsPool = articles.filter((article) => article.category === NEWS_CATEGORY);

  const featured =
    articles.find((article) => article.category === NEWS_CATEGORY && article.featured) ||
    articles.find((article) => article.featured) ||
    newsPool[0] ||
    articles[0] ||
    null;
  if (featured) seen.add(articleKey(featured));

  const news = takeUnused(newsPool, seen, newsCount);
  const secondary = takeUnused(articles, seen, secondaryCount);
  const latest = takeUnused(articles, seen, latestCount);

  const rails = SITE_VERTICALS.map((vertical) => {
    const inCategory = articles.filter(
      (article) => article.category === vertical.slug,
    );
    const unused = takeUnused(inCategory, new Set(seen), railCount);
    const fill = unused.length > 0 ? unused : inCategory.slice(0, railCount);
    for (const article of fill) seen.add(articleKey(article));
    return { vertical, articles: fill };
  });

  const more = takeUnused(articles, seen, 6);

  return { featured, secondary, latest, news, rails, more };
}

function mergeNewsFirst(news: BlogPost[], rest: BlogPost[], limit: number): BlogPost[] {
  const seen = new Set<string>();
  const merged: BlogPost[] = [];
  for (const article of [...news, ...rest]) {
    const key = articleKey(article);
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(article);
    if (merged.length >= limit) break;
  }
  return merged;
}

export async function listPublisherHomeArticles(
  limit: number,
): Promise<{ articles: BlogPost[]; total: number }> {
  try {
    const [listed, news] = await Promise.all([
      listPublishedArticles({ page: 1, limit }),
      listPublishedArticles({ category: NEWS_CATEGORY, page: 1, limit: 8 }),
    ]);
    if (listed.articles.length > 0 || news.articles.length > 0) {
      return {
        articles: mergeNewsFirst(news.articles, listed.articles, limit),
        total: Math.max(listed.total, news.total),
      };
    }
  } catch {
    // D1 bindings are missing in some local/preview environments.
  }

  const allowMarkdownFallback =
    process.env.NODE_ENV !== "production" ||
    process.env.NEXT_PUBLIC_USE_MARKDOWN_FALLBACK === "1";
  if (!allowMarkdownFallback) {
    return { articles: [], total: 0 };
  }

  try {
    const markdown = getBlogArticles();
    const news = markdown.filter((article) => article.category === NEWS_CATEGORY);
    return {
      articles: mergeNewsFirst(news, markdown, limit),
      total: markdown.length,
    };
  } catch {
    return { articles: [], total: 0 };
  }
}

export function splitMarkdownForMidArticleAd(content: string): {
  intro: string;
  rest: string | null;
} {
  const heading = /\n## /g;
  let match: RegExpExecArray | null;
  let count = 0;
  while ((match = heading.exec(content))) {
    count += 1;
    if (count === 2) {
      return {
        intro: content.slice(0, match.index),
        rest: content.slice(match.index).replace(/^\n/, ""),
      };
    }
  }
  return { intro: content, rest: null };
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function formatShortEsDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
  }).format(date);
}
