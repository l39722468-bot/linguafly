import { renderToStaticMarkup } from 'react-dom/server';
import IubendaConsent from '@/components/IubendaConsent';

describe('IubendaConsent', () => {
  it('emite el banner y autoblocking como scripts nativos en el orden oficial', () => {
    const html = renderToStaticMarkup(<IubendaConsent />);

    expect(html).toContain('"siteId":4664129');
    expect(html).toContain('"cookiePolicyId":98937340');
    expect(html).toContain('"lang":"es"');
    expect(html).toContain(
      'src="https://cs.iubenda.com/autoblocking/4664129.js"',
    );
    expect(html).toContain('src="//cdn.iubenda.com/cs/gpp/stub.js"');
    expect(html).toContain('src="//cdn.iubenda.com/cs/iubenda_cs.js"');
    expect(html).toContain('charset="UTF-8"');
    expect(html).toContain('async=""');
    expect(html.indexOf('csConfiguration')).toBeLessThan(
      html.indexOf('autoblocking/4664129.js'),
    );
    expect(html.indexOf('autoblocking/4664129.js')).toBeLessThan(
      html.indexOf('/cs/gpp/stub.js'),
    );
    expect(html.indexOf('/cs/gpp/stub.js')).toBeLessThan(
      html.indexOf('/cs/iubenda_cs.js'),
    );
    expect(html).not.toContain('__next_s');
    expect(html).not.toContain('data-nscript');
  });
});
