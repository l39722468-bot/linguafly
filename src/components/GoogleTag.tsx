import { DEFAULT_GA_MEASUREMENT_ID } from '@/lib/analytics';
import {
  buildGoogleTagConfigScript,
  getGoogleTagScriptSrc,
} from '@/lib/google-consent-mode';

/**
 * Una sola etiqueta Google para todo el sitio (layout raíz, justo tras <head>).
 * No repetir este snippet en páginas hijas.
 */
export default function GoogleTag() {
  const measurementId = DEFAULT_GA_MEASUREMENT_ID;

  return (
    <>
      {/* Google tag (gtag.js) */}
      <script async src={getGoogleTagScriptSrc(measurementId)} />
      <script
        id="google-tag-config"
        dangerouslySetInnerHTML={{
          __html: buildGoogleTagConfigScript(measurementId),
        }}
      />
    </>
  );
}
