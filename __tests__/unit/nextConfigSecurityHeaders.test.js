describe('next.config security headers', () => {
  it('allows Cloudflare challenge resources in CSP', async () => {
    const nextConfig = require('../../next.config.js');
    const headers = await nextConfig.headers();
    const appHeaders = headers.find((entry) => entry.source === '/(.*)');
    const cspHeader = appHeaders.headers.find(
      (header) => header.key === 'Content-Security-Policy'
    );

    expect(cspHeader).toBeDefined();
    expect(cspHeader.value).toContain("script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'");
    expect(cspHeader.value).toContain('https://static.cloudflareinsights.com');
    expect(cspHeader.value).toContain('https://consent.cookiebot.com');
    expect(cspHeader.value).toContain('https://consentcdn.cookiebot.com');
    expect(cspHeader.value).toContain('connect-src');
    expect(cspHeader.value).toContain('https://challenges.cloudflare.com');
    expect(cspHeader.value).toContain('https://fonts.googleapis.com');
    expect(cspHeader.value).toContain('https://region1.google-analytics.com');
    expect(cspHeader.value).not.toContain('https://vitals.vercel-insights.com');
  });
});
