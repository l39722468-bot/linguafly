import Script from 'next/script';
import { DEFAULT_GA_MEASUREMENT_ID } from '@/lib/analytics';
import {
  buildGoogleTagConfigScript,
  getGoogleTagScriptSrc,
} from '@/lib/google-consent-mode';

/**
 * Una sola etiqueta Google para todo el sitio (layout raíz).
 * strategy=beforeInteractive: el comprobador y el HTML inicial ven G-845LV77ZG9.
 */
export default function GoogleTag() {
  const measurementId = DEFAULT_GA_MEASUREMENT_ID;

  return (
    <>
      <Script
        id="google-tag-js"
        src={getGoogleTagScriptSrc(measurementId)}
        strategy="beforeInteractive"
      />
      <Script id="google-tag-config" strategy="beforeInteractive">
        {buildGoogleTagConfigScript(measurementId)}
      </Script>
    </>
  );
}
