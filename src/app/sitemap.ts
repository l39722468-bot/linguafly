import type { MetadataRoute } from "next";
import { getBlogArticles, getAllKeywords, slugify, normalizeCategory } from "@/lib/blog";
import { authors } from "@/lib/authors";
import { phraseService } from "@/lib/phrases";

const baseUrl = "https://www.focus-on-english.com";

const SITE_LAUNCH_DATE = new Date("2024-09-01");
const LEGAL_DATE = new Date("2024-09-01");
const FRASES_DATE = new Date("2025-01-01");

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
      url: `${baseUrl}/aprender-ingles`,
      lastModified: SITE_LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/frases-en-ingles`,
      lastModified: FRASES_DATE,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/aplicaciones-para-aprender-ingles`,
      lastModified: SITE_LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/certificaciones-ingles-oficiales`,
      lastModified: SITE_LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/herramientas/generador-firmas-email-ingles`,
      lastModified: SITE_LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: mostRecentArticleDate,
      changeFrequency: "daily",
      priority: 0.98,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: SITE_LAUNCH_DATE,
      changeFrequency: "yearly",
      priority: 0.6,
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
    ...articles.map((article) => ({
      url: `${baseUrl}/blog/${normalizeCategory(article.category)}/${article.slug}`,
      lastModified: new Date(article.updatedDate || article.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  const keywords = getAllKeywords();
  urls.push(
    ...keywords
      .map((keyword) => {
        const keywordArticles = articles.filter(a =>
          a.keywords?.some(k => slugify(k) === slugify(keyword))
        );
        return { keyword, keywordArticles };
      })
      .filter(({ keywordArticles }) => keywordArticles.length >= 3)
      .map(({ keyword, keywordArticles }) => {
        const latestDate = new Date(keywordArticles[0].date);
        return {
          url: `${baseUrl}/blog/temas/${slugify(keyword)}`,
          lastModified: latestDate,
          changeFrequency: "weekly" as const,
          priority: 0.5,
        };
      })
  );

  urls.push({
    url: `${baseUrl}/blog/autores`,
    lastModified: mostRecentArticleDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  });

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

  const phraseCategories = await phraseService.getAllCategories();
  urls.push(
    ...phraseCategories.map((cat) => ({
      url: `${baseUrl}/frases-en-ingles/${cat.slug}`,
      lastModified: FRASES_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }))
  );

  return urls;
}
