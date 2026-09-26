import {
  appendArticleReturnParam,
  getArticleReturnPath,
  isValidArticleReturnPath,
} from '@/lib/blog-article-return';

describe('blog-article-return', () => {
  it('validates internal blog article paths', () => {
    expect(isValidArticleReturnPath('/blog/gramatica/voz-pasiva-ingles-guia')).toBe(true);
    expect(isValidArticleReturnPath('https://evil.com/blog/foo')).toBe(false);
    expect(isValidArticleReturnPath('/mi-panel')).toBe(false);
  });

  it('points unit urls at the indexable lesson without fromArticle', () => {
    const url = appendArticleReturnParam(
      '/curso-a2/unit-26',
      '/blog/gramatica/ejercicios-condicionales-ingles-b1-b2',
    );

    expect(url).toBe('/blog/curso-a2/unidad-26-first-conditional');
    expect(url).not.toContain('fromArticle');
  });

  it('reads article return path from search params', () => {
    const params = new URLSearchParams(
      'fromArticle=%2Fblog%2Fgramatica%2Fvoz-pasiva-ingles-guia',
    );

    expect(getArticleReturnPath(params)).toBe('/blog/gramatica/voz-pasiva-ingles-guia');
  });
});
