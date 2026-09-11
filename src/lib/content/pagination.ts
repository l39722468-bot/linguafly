export const ARTICLES_PER_PAGE = 24;
export const HOME_ARTICLE_LIMIT = 6;
/** Recientes en /idiomas: el hub es clasificación, no el listado de las ~800 guías. */
export const ENGLISH_HUB_ARTICLE_LIMIT = 8;
export const RELATED_ARTICLE_LIMIT = 3;
export const SIDEBAR_ARTICLE_LIMIT = 5;
/**
 * URLs per sitemap file. Stay under Google's 50k / ~50 MB cap; shard 0
 * also carries a handful of static URLs.
 */
export const SITEMAP_CHUNK_SIZE = 40_000;
/** 30 × 40k = 1.2M article URLs (headroom past 1M). Index grows with D1 count. */
export const SITEMAP_MAX_SHARDS = 30;
export const SITEMAP_MAX_ARTICLE_URLS = SITEMAP_CHUNK_SIZE * SITEMAP_MAX_SHARDS;
/** Ceiling used when a caller cannot query D1. Prefer sitemapShardCount(total). */
export const SITEMAP_SHARD_COUNT = SITEMAP_MAX_SHARDS;

export function sitemapShardCount(articleTotal: number): number {
  const total = Math.max(0, Math.floor(Number(articleTotal)) || 0);
  const needed = Math.max(1, Math.ceil(total / SITEMAP_CHUNK_SIZE));
  return Math.min(SITEMAP_MAX_SHARDS, needed);
}

export function sitemapShardIds(articleTotal: number): { id: number }[] {
  return Array.from({ length: sitemapShardCount(articleTotal) }, (_, i) => ({
    id: i,
  }));
}

export function isSitemapShardId(id: number): boolean {
  return Number.isInteger(id) && id >= 0 && id < SITEMAP_MAX_SHARDS;
}

export function parsePageParam(value: string | string[] | undefined): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const page = Number.parseInt(raw || "1", 10);
  return Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
}

export function paginationHref(basePath: string, page: number): string {
  if (page <= 1) return basePath;
  const separator = basePath.includes("?") ? "&" : "?";
  return `${basePath}${separator}page=${page}`;
}

/** True when `?page=` is past the last listing (Google: 404, not a soft-empty 200). */
export function isOutOfRangePage(page: number, pages: number): boolean {
  return page > Math.max(pages, 1);
}
