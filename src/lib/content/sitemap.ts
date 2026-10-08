import type { MetadataRoute } from "next";
import { authors } from "@/lib/authors";
import { normalizeCategory } from "@/lib/blog-paths";
import { getSiteUrl } from "@/lib/site-brand";
import { ENGLISH_LEARNING_SECTIONS, SITE_VERTICALS } from "@/lib/site-catalog";
import {
  countPublishedArticles,
  getPublishedArticle,
  listPublishedArticles,
  listSitemapArticles,
} from "@/lib/content/articles";
import type { SitemapArticleEntry } from "@/lib/db/client";
import { getArticleUnitVideo } from "@/lib/course/unit-videos";
import {
  isoDurationToSeconds,
  youtubeEmbedUrl,
  youtubeThumbnailUrl,
} from "@/lib/video/youtube";
import {
  SITEMAP_CHUNK_SIZE,
  isSitemapShardId,
  sitemapShardIds,
} from "@/lib/content/pagination";
import {
  getArticleOgImageUrl,
  getCategoryOgImageUrl,
} from "@/lib/seo/og-images";
import { isIndexableSitemapLoc } from "@/lib/seo/index-redirect";
import { isSitemapSatelliteArticle } from "@/lib/seo/unit-topic-canonical";

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
    .filter((entry) => isIndexableSitemapLoc(entry.url))
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
      const videos = (entry.videos ?? [])
        .map((video) => {
          const player = video.player_loc
            ? `<video:player_loc>${escapeXml(video.player_loc)}</video:player_loc>`
            : "";
          const duration =
            typeof video.duration === "number"
              ? `<video:duration>${video.duration}</video:duration>`
              : "";
          const published = video.publication_date
            ? `<video:publication_date>${escapeXml(String(video.publication_date))}</video:publication_date>`
            : "";
          return `<video:video><video:thumbnail_loc>${escapeXml(video.thumbnail_loc)}</video:thumbnail_loc><video:title>${escapeXml(video.title)}</video:title><video:description>${escapeXml(video.description)}</video:description>${player}${duration}${published}</video:video>`;
        })
        .join("");
      return `<url><loc>${escapeXml(entry.url)}</loc>${lastmod}${changefreq}${priority}${images}${videos}</url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
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

/**
 * Las filas del sitemap no traen título ni descripción (son ~45k por shard),
 * así que solo se consulta el artículo completo de las unidades con vídeo.
 */
async function attachUnitVideos(
  urls: MetadataRoute.Sitemap,
  articles: SitemapArticleEntry[],
  baseUrl: string,
): Promise<void> {
  const withVideo = articles
    .map((article) => {
      const category = normalizeCategory(article.category);
      const video = getArticleUnitVideo(category, article.slug);
      return video ? { category, slug: article.slug, video } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
  if (withVideo.length === 0) return;

  const byUrl = new Map(urls.map((entry) => [entry.url, entry]));
  await Promise.all(
    withVideo.map(async ({ category, slug, video }) => {
      const entry = byUrl.get(`${baseUrl}/blog/${category}/${slug}`);
      if (!entry) return;
      const article = await getPublishedArticle(slug, category);
      if (!article) return;
      entry.videos = [
        {
          title: video.title || article.title,
          description: video.description || article.description || article.excerpt,
          thumbnail_loc: youtubeThumbnailUrl(video.youtubeId),
          player_loc: youtubeEmbedUrl(video.youtubeId),
          duration: isoDurationToSeconds(video.duration),
          publication_date: video.uploadDate,
        },
      ];
    }),
  );
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
        ...articles
          .filter(
            (article) =>
              !isSitemapSatelliteArticle(
                normalizeCategory(article.category),
                article.slug,
              ),
          )
          .map((article) => ({
            url: `${baseUrl}/blog/${normalizeCategory(article.category)}/${article.slug}`,
            lastModified: new Date(
              article.updated_at || article.created_at || SITE_LAUNCH_DATE,
            ),
            changeFrequency: "weekly" as const,
            priority: 0.7,
            images: [getArticleOgImageUrl(article)],
          })),
      );
      await attachUnitVideos(urls, articles, baseUrl);
    }

    return Array.from(new Map(urls.map((entry) => [entry.url, entry])).values()).filter(
      (entry) => isIndexableSitemapLoc(entry.url),
    );
  } catch (error) {
    console.error("[sitemap] D1 unavailable, returning static URLs:", error);
    return shard === 0 ? staticUrls(SITE_LAUNCH_DATE, includeLegal) : [];
  }
}
