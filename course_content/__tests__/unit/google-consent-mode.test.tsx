import { renderToStaticMarkup } from 'react-dom/server';
import GoogleConsentMode from '@/components/GoogleConsentMode';
import GoogleHeadScripts from '@/components/GoogleHeadScripts';
import GoogleTag from '@/components/GoogleTag';
import {
  GOOGLE_CONSENT_DEFAULT,
  DEFAULT_GOOGLE_TAG_GATEWAY_PATH,
  buildGoogleConsentDefaultScript,
  buildGoogleTagConfigScript,
  getGoogleTagGatewayPath,
  getGoogleTagScriptSrc,
  normalizeGoogleTagGatewayPath,
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
    expect(html).not.toContain('__next_s');
  });
});

describe('GoogleTag', () => {
  const previousGatewayPath = process.env.NEXT_PUBLIC_GOOGLE_TAG_GATEWAY_PATH;

  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_GOOGLE_TAG_GATEWAY_PATH;
  });

  afterEach(() => {
    if (previousGatewayPath === undefined) {
      delete process.env.NEXT_PUBLIC_GOOGLE_TAG_GATEWAY_PATH;
    } else {
      process.env.NEXT_PUBLIC_GOOGLE_TAG_GATEWAY_PATH = previousGatewayPath;
    }
  });

  it('reserves /gtag for Google Tag Gateway and rejects /metrics', () => {
    expect(DEFAULT_GOOGLE_TAG_GATEWAY_PATH).toBe('/gtag');
    expect(normalizeGoogleTagGatewayPath('/metrics')).toBe('/gtag');
    expect(normalizeGoogleTagGatewayPath('/metrics/health')).toBe('/gtag');
    expect(getGoogleTagGatewayPath()).toBe('/gtag');
    expect(getGoogleTagScriptSrc('G-ZNL3VGHK2E')).toBe('/gtag/');
  });

  it('falls back to googletagmanager.com when the gateway path is empty', () => {
    process.env.NEXT_PUBLIC_GOOGLE_TAG_GATEWAY_PATH = '';
    expect(getGoogleTagGatewayPath()).toBeNull();
    expect(getGoogleTagScriptSrc('G-ZNL3VGHK2E')).toBe(
      'https://www.googletagmanager.com/gtag/js?id=G-ZNL3VGHK2E',
    );
  });

  it('emits the official Linguafly snippet once for the checker', () => {
    const html = renderToStaticMarkup(<GoogleTag />);

    expect(html).toContain('src="/gtag/"');
    expect(html).toContain("gtag('config', 'G-ZNL3VGHK2E')");
    expect(html.match(/src="\/gtag\/"/g)).toHaveLength(1);
    expect(html).not.toContain('www.googletagmanager.com');
    expect(html).not.toContain('__next_s');
    expect(html).not.toContain('data-nscript');
    expect(html).not.toContain('G-TNTG3MJ3TL');
    expect(html).not.toContain('G-845LV77ZG9');
  });

  it('GoogleHeadScripts emite los 3 scripts nativos en el orden oficial, sin __next_s', () => {
    const html = renderToStaticMarkup(<GoogleHeadScripts />);
    expect(html).toContain('id="google-consent-default"');
    expect(html).toContain('src="/gtag/"');
    expect(html).toContain('async=""');
    expect(html).toContain('id="google-tag-config"');
    expect(html).toContain("gtag('config', 'G-ZNL3VGHK2E')");
    expect(html.indexOf('google-consent-default')).toBeLessThan(
      html.indexOf('src="/gtag/"')
    );
    expect(html.indexOf('src="/gtag/"')).toBeLessThan(
      html.indexOf('google-tag-config')
    );
    expect(html).not.toContain('__next_s');
    expect(html).not.toContain('data-nscript');
  });

  it('matches the official gtag config body', () => {
    expect(buildGoogleTagConfigScript('G-ZNL3VGHK2E')).toBe(
      [
        'window.dataLayer = window.dataLayer || [];',
        'function gtag(){dataLayer.push(arguments);}',
        "gtag('js', new Date());",
        '',
        "gtag('config', 'G-ZNL3VGHK2E');",
      ].join('\n'),
    );
  });
});
