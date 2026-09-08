import type { MetadataRoute } from "next";
import { getBlogArticles, normalizeCategory } from "@/lib/blog";
import { authors } from "@/lib/authors";
import { getSiteUrl } from "@/lib/site-brand";
import { SITE_VERTICALS } from "@/lib/site-catalog";

/**
 * Cloudflare/OpenNext article-only sitemap (web nueva).
 * La hemeroteca y los cursos antiguos no se indexan.
 */

const baseUrl = getSiteUrl();
const SITE_LAUNCH_DATE = new Date("2026-09-08");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = getBlogArticles();
  const mostRecentArticleDate = articles.length > 0
    ? new Date(articles[0].date)
    : SITE_LAUNCH_DATE;

  const urls: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: mostRecentArticleDate, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/blog`, lastModified: mostRecentArticleDate, changeFrequency: "daily", priority: 0.98 },
    { url: `${baseUrl}/contacto`, lastModified: SITE_LAUNCH_DATE, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/sobre-nosotros`, lastModified: mostRecentArticleDate, changeFrequency: "monthly", priority: 0.6 },
    ...SITE_VERTICALS.map((vertical) => ({
      url: `${baseUrl}${vertical.href}`,
      lastModified: mostRecentArticleDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];

  const categories = Array.from(new Set(articles.map((a) => normalizeCategory(a.category))));
  urls.push(
    ...categories.map((category) => {
      const categoryArticles = articles.filter((a) => normalizeCategory(a.category) === category);
      return {
        url: `${baseUrl}/blog/${category}`,
        lastModified: categoryArticles.length > 0 ? new Date(categoryArticles[0].date) : SITE_LAUNCH_DATE,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      };
    })
  );

  urls.push(
    ...articles.map((article) => ({
      url: `${baseUrl}/blog/${normalizeCategory(article.category)}/${article.slug}`,
      lastModified: new Date(article.updatedDate || article.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  urls.push(
    ...Object.keys(authors).map((slug) => {
      const authorArticles = articles.filter((a) => a.authorData?.slug === slug);
      return {
        url: `${baseUrl}/blog/autor/${slug}`,
        lastModified: authorArticles.length > 0 ? new Date(authorArticles[0].date) : SITE_LAUNCH_DATE,
        changeFrequency: "weekly" as const,
        priority: 0.4,
      };
    })
  );

  return Array.from(new Map(urls.map((entry) => [entry.url, entry])).values());
}
