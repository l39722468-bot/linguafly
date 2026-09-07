import type { MetadataRoute } from "next";
import { getBlogArticles, normalizeCategory } from "@/lib/blog";
import { authors } from "@/lib/authors";

import { getSiteUrl } from "@/lib/site-brand";

/**
 * Cloudflare/OpenNext article-only sitemap.
 *
 * This is a trimmed copy of `sitemap.ts` used only for the Cloudflare Worker
 * build (see scripts/cf-build.mjs), which only deploys the article
 * experience. It intentionally omits every course/hub/phrase/vocabulary URL
 * (and their heavy imports from `@/lib/course/*`, `@/lib/phrases`,
 * `@/lib/vocabulario/sectors`, `@/lib/services/premium-course-service.server`,
 * `@/lib/course-indexing`) so those modules aren't pulled into the Worker
 * bundle. Keep this in sync with the article-related entries in
 * `sitemap.ts` when they change.
 */

const baseUrl = getSiteUrl();

const SITE_LAUNCH_DATE = new Date("2024-09-01");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = getBlogArticles();
  const mostRecentArticleDate = articles.length > 0
    ? new Date(articles[0].date)
    : SITE_LAUNCH_DATE;

  const urls: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: mostRecentArticleDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: mostRecentArticleDate,
      changeFrequency: "daily",
      priority: 0.98,
    },
  ];

  const categories = Array.from(new Set(articles.map(a => normalizeCategory(a.category))));
  urls.push(
    ...categories.map((category) => {
      const categoryArticles = articles.filter(a => normalizeCategory(a.category) === category);
      const latestDate = categoryArticles.length > 0
        ? new Date(categoryArticles[0].date)
        : SITE_LAUNCH_DATE;

      return {
        url: `${baseUrl}/blog/${category}`,
        lastModified: latestDate,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      };
    })
  );

  urls.push(
    ...articles.map((article) => {
      const category = normalizeCategory(article.category);
      return {
        url: `${baseUrl}/blog/${category}/${article.slug}`,
        lastModified: new Date(article.updatedDate || article.date),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      };
    })
  );

  urls.push(
    ...Object.keys(authors).map((slug) => {
      const authorArticles = articles.filter(
        a => a.authorData?.slug === slug
      );
      const latestDate = authorArticles.length > 0
        ? new Date(authorArticles[0].date)
        : SITE_LAUNCH_DATE;

      return {
        url: `${baseUrl}/blog/autor/${slug}`,
        lastModified: latestDate,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      };
    })
  );

  // Keyword/hub pages (`/blog/temas/*`) are excluded from the Cloudflare
  // build, so their URLs are intentionally left out of this sitemap.

  return Array.from(
    new Map(urls.map((entry) => [entry.url, entry])).values()
  );
}
