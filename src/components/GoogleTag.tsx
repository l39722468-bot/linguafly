import { DEFAULT_GA_MEASUREMENT_ID } from '@/lib/analytics';
import {
  buildGoogleTagConfigScript,
  getGoogleTagScriptSrc,
} from '@/lib/google-consent-mode';

/**
 * Snippet oficial de GA4 en HTML nativo (no next/script).
 * next/script beforeInteractive serializa a (self.__next_s).push(...) y el
 * comprobador de Google no lo reconoce como etiqueta.
 */
export default function GoogleTag() {
  const measurementId = DEFAULT_GA_MEASUREMENT_ID;

  return (
    <>
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
