import {
  ADSENSE_ADS_TXT_LINE,
  mergeAdsTxtPhpStyle,
} from '@/lib/ads-txt';

describe('ads-txt', () => {
  describe('mergeAdsTxtPhpStyle', () => {
    it('fusiona Moneytizer primero y luego líneas locales sin duplicar', () => {
      const moneytizer = [
        'OWNERDOMAIN=linguafly.app',
        'themoneytizer.com,132245,DIRECT',
      ].join('\n');
      const local = ADSENSE_ADS_TXT_LINE;

      const merged = mergeAdsTxtPhpStyle(moneytizer, local);

      expect(merged).toContain('OWNERDOMAIN=linguafly.app');
      expect(merged).toContain('themoneytizer.com, 132245, DIRECT');
      expect(merged).toContain(ADSENSE_ADS_TXT_LINE);
      expect(merged.indexOf('OWNERDOMAIN=linguafly.app')).toBeLessThan(
        merged.indexOf(ADSENSE_ADS_TXT_LINE),
      );
    });

    it('normaliza espacios y formatea comas como el PHP original', () => {
      const moneytizer = 'improvedigital.com, 1602_132245, DIRECT';
      const local = 'google.com,pub-1198438843650445,DIRECT,f08c47fec0942fa0';

      const merged = mergeAdsTxtPhpStyle(moneytizer, local);

      expect(merged).toContain('improvedigital.com, 1602_132245, DIRECT');
      expect(merged).toContain(ADSENSE_ADS_TXT_LINE);
    });

    it('no duplica líneas equivalentes sin espacios', () => {
      const line = 'google.com,pub-1198438843650445,DIRECT,f08c47fec0942fa0';
      const merged = mergeAdsTxtPhpStyle(line, ADSENSE_ADS_TXT_LINE);
      const occurrences = merged
        .split('\n')
        .filter((row) => row.includes('pub-1198438843650445')).length;

      expect(occurrences).toBe(1);
    });
  });
});
