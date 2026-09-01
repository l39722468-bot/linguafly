import {
  buildGoogleConsentDefaultScript,
  buildGoogleTagConfigScript,
  getGoogleTagScriptSrc,
  isGaMeasurementId,
} from "@/lib/google-consent-mode";
import { getGaTrackingId } from "@/lib/analytics";

/**
 * Snippet nativo de GA4 en el HTML del layout (Server Component).
 *
 * Tres tags independientes (consent → gtag.js → config) hacen que React 19
 * reordene: `renderToStaticMarkup` y el HTML de Next hoist `<script async src>`
 * al inicio. El checker de GA4 Admin y Consent Mode exigen el orden oficial
 * y un atributo `src` estático a googletagmanager.com (no next/script / __next_s
 * y no document.createElement).
 *
 * Un único `<script>` sin src/async, con breakout en innerHTML, serializa los
 * tres tags en orden. `async=""` (no solo `async`) coincide con el HTML nativo
 * que espera el checker.
 */
export default function GoogleHeadScripts() {
  const measurementId = getGaTrackingId();
  if (!measurementId || !isGaMeasurementId(measurementId)) {
    return null;
  }

  const src = getGoogleTagScriptSrc(measurementId);
  const consent = buildGoogleConsentDefaultScript();
  const config = buildGoogleTagConfigScript(measurementId);

  if (consent.includes("</script") || config.includes("</script")) {
    return null;
  }

  return (
    <script
      id="google-consent-default"
      dangerouslySetInnerHTML={{
        __html: `${consent}</script><script async="" src="${src}"></script><script id="google-tag-config">${config}`,
      }}
    />
  );
}
