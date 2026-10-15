export const SITE_BRAND_NAME = 'Linguafly';

/** Único contacto público. De momento no hay redes sociales. */
export const CONTACT_EMAIL = 'linguafly6@gmail.com';

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
