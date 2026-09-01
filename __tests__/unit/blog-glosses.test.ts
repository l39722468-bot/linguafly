import { expandBlogGlosses } from '@/lib/blog-glosses';

describe('expandBlogGlosses', () => {
  it('turns [[español|English]] into markdown that GFM can parse', () => {
    expect(expandBlogGlosses('[[Me llamo Ana.|My name is Ana.]]')).toBe(
      '**Me llamo Ana.** — *My name is Ana.*',
    );
  });

  it('leaves table pipes outside glosses intact after expansion', () => {
    const row = '| [[Hola.|Hello.]] | greeting |';
    expect(expandBlogGlosses(row)).toBe('| **Hola.** — *Hello.* | greeting |');
  });

  it('is a no-op when there are no glosses', () => {
    expect(expandBlogGlosses('Soy Ana.')).toBe('Soy Ana.');
  });
});
