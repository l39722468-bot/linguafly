import { buildInMobiChoiceCmpScript } from '@/lib/inmobi-cmp-script';

/**
 * Banner de consentimiento InMobi Choice (TCF 2.3) de The Moneytizer.
 * Debe cargarse al inicio del <head>, antes de scripts publicitarios.
 */
export default function InMobiChoiceConsent() {
  return (
    <script
      id="inmobi-choice-cmp"
      dangerouslySetInnerHTML={{
        __html: buildInMobiChoiceCmpScript(),
      }}
    />
  );
}
