import {
  COOKIEBOT_ID,
  getCookiebotAuthorizedHosts,
  isCookiebotHost,
  shouldLoadCookiebot,
} from '@/lib/cookiebot-config';

describe('cookiebot-config', () => {
  const originalHosts = process.env.NEXT_PUBLIC_COOKIEBOT_HOSTS;
  const originalEnabled = process.env.NEXT_PUBLIC_COOKIEBOT_ENABLED;

  afterEach(() => {
    process.env.NEXT_PUBLIC_COOKIEBOT_HOSTS = originalHosts;
    process.env.NEXT_PUBLIC_COOKIEBOT_ENABLED = originalEnabled;
  });

  it('exposes the default Cookiebot id', () => {
    expect(COOKIEBOT_ID).toBe('474b1dce-7229-40d3-88c2-a2323b9a57f9');
  });

  it('authorizes focus-on-english domains by default', () => {
    delete process.env.NEXT_PUBLIC_COOKIEBOT_HOSTS;

    expect(isCookiebotHost('www.focus-on-english.com')).toBe(true);
    expect(isCookiebotHost('focus-on-english.com')).toBe(true);
    expect(isCookiebotHost('localhost')).toBe(true);
  });

  it('does not authorize linguafly.app unless configured', () => {
    delete process.env.NEXT_PUBLIC_COOKIEBOT_HOSTS;

    expect(isCookiebotHost('linguafly.app')).toBe(false);
    expect(shouldLoadCookiebot('linguafly.app')).toBe(false);
  });

  it('allows overriding authorized hosts via env', () => {
    process.env.NEXT_PUBLIC_COOKIEBOT_HOSTS = 'linguafly.app,www.focus-on-english.com';

    expect(getCookiebotAuthorizedHosts()).toEqual([
      'linguafly.app',
      'www.focus-on-english.com',
    ]);
    expect(shouldLoadCookiebot('linguafly.app')).toBe(true);
  });

  it('can disable Cookiebot globally', () => {
    process.env.NEXT_PUBLIC_COOKIEBOT_ENABLED = 'false';

    expect(shouldLoadCookiebot('www.focus-on-english.com')).toBe(false);
  });
});
