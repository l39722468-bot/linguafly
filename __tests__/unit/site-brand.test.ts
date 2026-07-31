import { getAbsoluteUrl, getSiteUrl, SITE_BRAND_NAME } from '@/lib/site-brand';

describe('site-brand', () => {
  it('uses Linguafly as brand name', () => {
    expect(SITE_BRAND_NAME).toBe('Linguafly');
  });

  it('builds absolute urls from site base', () => {
    expect(getAbsoluteUrl('/blog')).toMatch(/\/blog$/);
    expect(getAbsoluteUrl('/blog')).toBe(`${getSiteUrl()}/blog`);
  });
});
