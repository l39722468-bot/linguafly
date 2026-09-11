import type { MetadataRoute } from "next";
import { authors } from "@/lib/authors";
import { normalizeCategory } from "@/lib/blog-paths";
import { getSiteUrl } from "@/lib/site-brand";
import { ENGLISH_LEARNING_SECTIONS, SITE_VERTICALS } from "@/lib/site-catalog";
import {
  countPublishedArticles,
  listPublishedArticles,
  listSitemapArticles,
} from "@/lib/content/articles";
import {
  SITEMAP_CHUNK_SIZE,
  isSitemapShardId,
  sitemapShardIds,
} from "@/lib/content/pagination";
import {
  getArticleOgImageUrl,
  getCategoryOgImageUrl,
} from "@/lib/seo/og-images";

const SITE_LAUNCH_DATE = new Date("2026-09-08");

export async function magazineSitemapIds(): Promise<{ id: number }[]> {
  try {
    const total = await countPublishedArticles();
    return sitemapShardIds(total);
  } catch (error) {
    console.error("[sitemap] D1 unavailable, listing shard 0 only:", error);
    return [{ id: 0 }];
  }
}

export function serializeSitemapIndex(
  ids: { id: number }[],
  baseUrl: string
): string {
  const body = ids
    .filter(({ id }) => isSitemapShardId(id))
    .map(({ id }) => `  <sitemap><loc>${baseUrl}/sitemaps/${id}.xml</loc></sitemap>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</sitemapindex>
`;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function serializeSitemapXml(entries: MetadataRoute.Sitemap): string {
  const urls = entries
    .map((entry) => {
      const lastmod = entry.lastModified
        ? `<lastmod>${new Date(entry.lastModified).toISOString()}</lastmod>`
        : "";
      const changefreq = entry.changeFrequency
        ? `<changefreq>${entry.changeFrequency}</changefreq>`
        : "";
      const priority =
        typeof entry.priority === "number"
          ? `<priority>${entry.priority.toFixed(1)}</priority>`
          : "";
      const images = (entry.images ?? [])
        .map(
          (image) =>
            `<image:image><image:loc>${escapeXml(image)}</image:loc></image:image>`,
        )
        .join("");
      return `<url><loc>${escapeXml(entry.url)}</loc>${lastmod}${changefreq}${priority}${images}</url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;
}

function staticUrls(
  mostRecent: Date,
  includeLegal: boolean
): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const brandImage = getCategoryOgImageUrl();
  const urls: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: mostRecent,
      changeFrequency: "daily",
      priority: 1.0,
      images: [brandImage],
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: mostRecent,
      changeFrequency: "daily",
      priority: 0.98,
      images: [brandImage],
    },
    { url: `${baseUrl}/llms.txt`, lastModified: mostRecent, changeFrequency: "daily", priority: 0.7 },
    { url: `${baseUrl}/contacto`, lastModified: SITE_LAUNCH_DATE, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/sobre-nosotros`, lastModified: mostRecent, changeFrequency: "monthly", priority: 0.6 },
    ...SITE_VERTICALS.map((vertical) => ({
      url: `${baseUrl}${vertical.href}`,
      lastModified: mostRecent,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      images: [getCategoryOgImageUrl(vertical.slug)],
    })),
    ...SITE_VERTICALS.map((vertical) => ({
      url: `${baseUrl}${vertical.blogHref}`,
      lastModified: mostRecent,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: [getCategoryOgImageUrl(vertical.slug)],
    })),
    ...ENGLISH_LEARNING_SECTIONS.map((section) => ({
      url: `${baseUrl}${section.href}`,
      lastModified: mostRecent,
      changeFrequency: "weekly" as const,
      priority: 0.85,
      images: [getCategoryOgImageUrl(section.slug)],
    })),
  ];

  if (includeLegal) {
    urls.push(
      { url: `${baseUrl}/privacidad`, lastModified: SITE_LAUNCH_DATE, changeFrequency: "yearly", priority: 0.3 },
      { url: `${baseUrl}/cookies`, lastModified: SITE_LAUNCH_DATE, changeFrequency: "yearly", priority: 0.3 },
      { url: `${baseUrl}/terminos`, lastModified: SITE_LAUNCH_DATE, changeFrequency: "yearly", priority: 0.3 },
    );
  }

  urls.push(
    ...Object.keys(authors).map((slug) => ({
      url: `${baseUrl}/blog/autor/${slug}`,
      lastModified: mostRecent,
      changeFrequency: "weekly" as const,
      priority: 0.4,
    }))
  );

  return urls;
}

export async function buildMagazineSitemap(
  id: number,
  options: { includeLegal?: boolean } = {}
): Promise<MetadataRoute.Sitemap> {
  const shard = Number.isFinite(id) ? Math.max(0, Math.floor(id)) : 0;
  const includeLegal = options.includeLegal !== false;
  const baseUrl = getSiteUrl();

  try {
    const total = await countPublishedArticles();
    const mostRecentListed = await listPublishedArticles({ page: 1, limit: 1 });
    const mostRecent = mostRecentListed.articles[0]
      ? new Date(mostRecentListed.articles[0].updatedDate || mostRecentListed.articles[0].date)
      : SITE_LAUNCH_DATE;

    const urls: MetadataRoute.Sitemap = shard === 0 ? staticUrls(mostRecent, includeLegal) : [];

    const offset = shard * SITEMAP_CHUNK_SIZE;
    if (offset < total) {
      const articles = await listSitemapArticles(offset, SITEMAP_CHUNK_SIZE);
      urls.push(
        ...articles.map((article) => ({
          url: `${baseUrl}/blog/${normalizeCategory(article.category)}/${article.slug}`,
          lastModified: new Date(article.updated_at || article.created_at || SITE_LAUNCH_DATE),
          changeFrequency: "weekly" as const,
          priority: 0.7,
          images: [getArticleOgImageUrl(article)],
        }))
      );
    }

    return Array.from(new Map(urls.map((entry) => [entry.url, entry])).values());
  } catch (error) {
    console.error("[sitemap] D1 unavailable, returning static URLs:", error);
    return shard === 0 ? staticUrls(SITE_LAUNCH_DATE, includeLegal) : [];
  }
}
