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
