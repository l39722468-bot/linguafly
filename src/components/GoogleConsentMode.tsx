import { buildGoogleConsentDefaultScript } from '@/lib/google-consent-mode';

/**
 * Stub gtag + Consent Mode v2 default (denied).
 * Script nativo en el HTML inicial, ANTES de gtag.js.
 */
export default function GoogleConsentMode() {
  return (
    <script
      id="google-consent-default"
      dangerouslySetInnerHTML={{
        __html: buildGoogleConsentDefaultScript(),
      }}
    />
  );
}
