export const SITE_BRAND_NAME = 'Linguafly';

const DEFAULT_SITE_URL = 'https://linguafly.app';

export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL)
    .replace(/\/$/, "")
    .replace(/^https:\/\/www\./i, "https://");
}

export function getAbsoluteUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}
