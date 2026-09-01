import { renderToStaticMarkup } from 'react-dom/server';
import GoogleConsentMode from '@/components/GoogleConsentMode';
import {
  GOOGLE_CONSENT_DEFAULT,
  buildGoogleConsentDefaultScript,
} from '@/lib/google-consent-mode';

describe('google-consent-mode', () => {
  it('defaults analytics and ads storage to denied for EEE', () => {
    expect(GOOGLE_CONSENT_DEFAULT.analytics_storage).toBe('denied');
    expect(GOOGLE_CONSENT_DEFAULT.ad_storage).toBe('denied');
    expect(GOOGLE_CONSENT_DEFAULT.ad_user_data).toBe('denied');
    expect(GOOGLE_CONSENT_DEFAULT.ad_personalization).toBe('denied');
    expect(GOOGLE_CONSENT_DEFAULT.security_storage).toBe('granted');
    expect(GOOGLE_CONSENT_DEFAULT.wait_for_update).toBe(500);
  });

  it('emits a gtag consent default stub', () => {
    const script = buildGoogleConsentDefaultScript();

    expect(script).toContain("gtag('consent','default'");
    expect(script).toContain('"analytics_storage":"denied"');
    expect(script).toContain("gtag('set','ads_data_redaction',true)");
    expect(script).toContain("gtag('set','url_passthrough',true)");
  });
});

describe('GoogleConsentMode', () => {
  it('renders the consent default script in head-safe markup', () => {
    const html = renderToStaticMarkup(<GoogleConsentMode />);

    expect(html).toContain('id="google-consent-default"');
    expect(html).toContain("gtag('consent','default'");
    expect(html).not.toContain('GTM-PR2H3P77');
  });
});
