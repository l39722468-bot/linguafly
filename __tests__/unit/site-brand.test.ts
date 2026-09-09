import { getAbsoluteUrl, getSiteUrl, SITE_BRAND_NAME } from '@/lib/site-brand';

describe('site-brand', () => {
  it('uses Linguafly as brand name', () => {
    expect(SITE_BRAND_NAME).toBe('Linguafly');
  });

  it('builds absolute urls from site base', () => {
    expect(getAbsoluteUrl('/blog')).toMatch(/\/blog$/);
    expect(getAbsoluteUrl('/blog')).toBe(`${getSiteUrl()}/blog`);
  });

  it('strips www from the public site origin', () => {
    const previous = process.env.NEXT_PUBLIC_SITE_URL;
    process.env.NEXT_PUBLIC_SITE_URL = 'https://www.linguafly.app';
    expect(getSiteUrl()).toBe('https://linguafly.app');
    expect(getAbsoluteUrl('/idiomas')).toBe('https://linguafly.app/idiomas');
    if (previous === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = previous;
    }
  });
});
