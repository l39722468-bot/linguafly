import {
  ADSENSE_CLIENT_ID,
  evaluateTcfMarketingConsent,
  hasMarketingConsent,
  loadAdSenseScript,
  onMarketingConsentChange,
  runWithMarketingConsent,
} from '@/lib/marketing-consent';

jest.mock('@/lib/cookiebot-config', () => ({
  shouldLoadCookiebot: jest.fn(),
}));

jest.mock('@/lib/inmobi-cmp-config', () => ({
  shouldLoadInMobiCmp: jest.fn(),
}));

const { shouldLoadCookiebot } = jest.requireMock('@/lib/cookiebot-config');
const { shouldLoadInMobiCmp } = jest.requireMock('@/lib/inmobi-cmp-config');

describe('marketing-consent', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    delete window.Cookiebot;
    delete window.__tcfapi;
    document.head.innerHTML = '';
    shouldLoadCookiebot.mockReset();
    shouldLoadInMobiCmp.mockReset();
    shouldLoadInMobiCmp.mockReturnValue(false);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('permite marketing sin Cookiebot en dominios no gestionados', () => {
    shouldLoadCookiebot.mockReturnValue(false);

    expect(hasMarketingConsent('linguafly.app')).toBe(true);
  });

  it('requiere consentimiento de marketing cuando Cookiebot está activo', () => {
    shouldLoadCookiebot.mockReturnValue(true);
    window.Cookiebot = { hasResponse: true, consent: { marketing: false } };

    expect(hasMarketingConsent('www.focus-on-english.com')).toBe(false);

    window.Cookiebot = { hasResponse: true, consent: { marketing: true } };
    expect(hasMarketingConsent('www.focus-on-english.com')).toBe(true);
  });

  it('carga AdSense solo tras consentimiento de marketing', () => {
    shouldLoadCookiebot.mockReturnValue(true);
    window.Cookiebot = { hasResponse: true, consent: { marketing: false } };

    const cleanup = runWithMarketingConsent(loadAdSenseScript);
    jest.runAllTimers();

    expect(document.getElementById('adsense-sdk')).toBeNull();

    window.Cookiebot = { hasResponse: true, consent: { marketing: true } };
    window.dispatchEvent(new Event('CookiebotOnAccept'));

    const script = document.getElementById('adsense-sdk') as HTMLScriptElement | null;
    expect(script).not.toBeNull();
    expect(script?.src).toContain(ADSENSE_CLIENT_ID);

    cleanup();
  });

  it('notifica cuando Cookiebot responde con consentimiento', () => {
    shouldLoadCookiebot.mockReturnValue(true);
    const callback = jest.fn();
    const cleanup = onMarketingConsentChange(callback);

    window.Cookiebot = { hasResponse: true, consent: { marketing: true } };
    jest.advanceTimersByTime(250);

    expect(callback).toHaveBeenCalledWith(true);
    cleanup();
  });

  it('requiere consentimiento TCF cuando InMobi CMP está activo', () => {
    shouldLoadInMobiCmp.mockReturnValue(true);

    expect(hasMarketingConsent('www.linguafly.app')).toBe(false);

    expect(
      evaluateTcfMarketingConsent({
        gdprApplies: true,
        purpose: { consents: { '1': true, '2': true } },
      }),
    ).toBe(true);
  });
});
