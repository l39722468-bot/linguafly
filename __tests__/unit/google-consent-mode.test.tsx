import { renderToStaticMarkup } from 'react-dom/server';
import GoogleConsentMode from '@/components/GoogleConsentMode';
import GoogleTag from '@/components/GoogleTag';
import {
  GOOGLE_CONSENT_DEFAULT,
  buildGoogleConsentDefaultScript,
  buildGoogleTagConfigScript,
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

describe('GoogleTag', () => {
  it('emits the official Linguafly snippet once for the checker', () => {
    const html = renderToStaticMarkup(<GoogleTag />);

    expect(html).toContain('https://www.googletagmanager.com/gtag/js?id=G-845LV77ZG9');
    expect(html).toContain("gtag('config', 'G-845LV77ZG9')");
    expect(html.match(/gtag\/js\?id=/g)).toHaveLength(1);
    expect(html).not.toContain('G-TNTG3MJ3TL');
  });

  it('matches the official gtag config body', () => {
    expect(buildGoogleTagConfigScript('G-845LV77ZG9')).toBe(
      [
        'window.dataLayer = window.dataLayer || [];',
        'function gtag(){dataLayer.push(arguments);}',
        "gtag('js', new Date());",
        "gtag('config', 'G-845LV77ZG9');",
      ].join('\n'),
    );
  });
});
