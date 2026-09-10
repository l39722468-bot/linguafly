/**
 * Consent Mode v2 (EEE / España).
 *
 * El default va en <head> ANTES de gtag.js. Cookiebot o InMobi Choice
 * actualizan a granted cuando el usuario acepta estadísticas / TCF.
 * Con storage denied, GA4 sigue enviando pings sin cookie (modelado).
 */
export const GOOGLE_CONSENT_DEFAULT = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  functionality_storage: 'denied',
  personalization_storage: 'denied',
  security_storage: 'granted',
  wait_for_update: 500,
} as const;

export function buildGoogleConsentDefaultScript(): string {
  return [
    'window.dataLayer=window.dataLayer||[];',
    'function gtag(){dataLayer.push(arguments);}',
    `gtag('consent','default',${JSON.stringify(GOOGLE_CONSENT_DEFAULT)});`,
    "gtag('set','ads_data_redaction',true);",
    "gtag('set','url_passthrough',true);",
  ].join('');
}

export function isGaMeasurementId(value: string): boolean {
  return /^G-[A-Z0-9]+$/.test(value);
}

/**
 * Ruta first-party de Google Tag Gateway (Cloudflare).
 * No usar `/metrics`: el Worker legado sirve JSON ahí.
 *
 * El HTML debe seguir apuntando a googletagmanager.com. Cloudflare reescribe
 * esa petición a `/gtag/` una sola vez. Si el snippet usa `src="/gtag/"` y el
 * gateway está ON, PageSpeed descarga el loader dos veces (~360 KiB).
 *
 * `NEXT_PUBLIC_GOOGLE_TAG_GATEWAY_INLINE=1` fuerza `src="/gtag/"` (solo si el
 * rewrite de zona está apagado). Vacía `NEXT_PUBLIC_GOOGLE_TAG_GATEWAY_PATH`
 * para no reservar la ruta.
 */
export const DEFAULT_GOOGLE_TAG_GATEWAY_PATH = '/gtag';

const FORBIDDEN_GOOGLE_TAG_GATEWAY_PATHS = new Set(['', '/', '/metrics']);

export function normalizeGoogleTagGatewayPath(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const withSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  const normalized = withSlash.replace(/\/+$/, '') || '/';
  if (
    FORBIDDEN_GOOGLE_TAG_GATEWAY_PATHS.has(normalized) ||
    normalized === '/metrics' ||
    normalized.startsWith('/metrics/')
  ) {
    return DEFAULT_GOOGLE_TAG_GATEWAY_PATH;
  }
  if (normalized.includes('..') || !/^\/[A-Za-z0-9/_-]+$/.test(normalized)) {
    return DEFAULT_GOOGLE_TAG_GATEWAY_PATH;
  }
  return normalized;
}

/** `null` = desactivado (snippet clásico a googletagmanager.com). */
export function getGoogleTagGatewayPath(): string | null {
  const raw = process.env.NEXT_PUBLIC_GOOGLE_TAG_GATEWAY_PATH;
  if (raw === '') return null;
  return normalizeGoogleTagGatewayPath(raw ?? DEFAULT_GOOGLE_TAG_GATEWAY_PATH);
}

export function shouldInlineGoogleTagGateway(): boolean {
  const raw = process.env.NEXT_PUBLIC_GOOGLE_TAG_GATEWAY_INLINE?.trim().toLowerCase();
  return raw === '1' || raw === 'true' || raw === 'yes';
}

export function officialGoogleTagScriptSrc(measurementId: string): string {
  return `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
}

export function getGoogleTagScriptSrc(measurementId: string): string {
  if (!shouldInlineGoogleTagGateway()) {
    return officialGoogleTagScriptSrc(measurementId);
  }
  const gatewayPath = getGoogleTagGatewayPath() ?? DEFAULT_GOOGLE_TAG_GATEWAY_PATH;
  return `${gatewayPath}/`;
}

/** Snippet oficial de GA4 (el comprobador busca `gtag('config', 'G-…')`). */
export function buildGoogleTagConfigScript(measurementId: string): string {
  return [
    'window.dataLayer = window.dataLayer || [];',
    'function gtag(){dataLayer.push(arguments);}',
    "gtag('js', new Date());",
    '',
    `gtag('config', '${measurementId}');`,
  ].join('\n');
}
