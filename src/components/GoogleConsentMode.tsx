import { buildGoogleConsentDefaultScript } from '@/lib/google-consent-mode';

/**
 * Stub gtag + Consent Mode v2 default (denied).
 * Debe ir al inicio del <head>, antes de gtag.js / anuncios.
 */
export default function GoogleConsentMode() {
  return (
    <script
      id="google-consent-default"
      dangerouslySetInnerHTML={{ __html: buildGoogleConsentDefaultScript() }}
    />
  );
}
