import Script from 'next/script';
import { buildGoogleConsentDefaultScript } from '@/lib/google-consent-mode';

/**
 * Stub gtag + Consent Mode v2 default (denied).
 * beforeInteractive lo deja en el HTML inicial, antes de hidratar Next.
 */
export default function GoogleConsentMode() {
  return (
    <Script id="google-consent-default" strategy="beforeInteractive">
      {buildGoogleConsentDefaultScript()}
    </Script>
  );
}
