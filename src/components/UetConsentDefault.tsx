import { UET_TAG_ID } from '@/components/UetConsent';

/**
 * Consent Mode por defecto para la etiqueta UET de Microsoft/Bing.
 *
 * Debe ir en <head> ANTES de cualquier etiqueta que pueda bloquear, igual que
 * el default de Consent Mode v2 de Google (lib/google-consent-mode.ts).
 * La concesion se hace en UetConsent, ligada al banner de la web.
 */
export default function UetConsentDefault() {
  const script = `window.uetq = window.uetq || [];window.uetq.push('consent', 'default', {'ad_storage': 'denied'});`;

  return (
    <script
      id="uet-consent-default"
      data-uet-tag-id={UET_TAG_ID}
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
