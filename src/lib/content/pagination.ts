export const ARTICLES_PER_PAGE = 24;
export const HOME_ARTICLE_LIMIT = 6;
export const RELATED_ARTICLE_LIMIT = 3;
export const SIDEBAR_ARTICLE_LIMIT = 5;
export const SITEMAP_CHUNK_SIZE = 40_000;
/** Enough shards for ~200k URLs so generateSitemaps works at build without D1. */
export const SITEMAP_SHARD_COUNT = 5;

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
