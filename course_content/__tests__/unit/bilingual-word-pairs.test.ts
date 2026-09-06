import { alignSpanishPerEnglishWord, expandBlockToWordPairMarkup, tokenizeBilingualLine } from '@/lib/bilingual-word-pairs';

describe('alignSpanishPerEnglishWord', () => {
  it('empareja 1:1 cuando el número de tokens coincide', () => {
    const en = ['Hello', 'world'];
    const es = ['Hola', 'mundo'];
    expect(alignSpanishPerEnglishWord(en, es)).toEqual(['Hola', 'mundo']);
  });

  it('reparte la frase ES en bloques sin repetir cada token español en muchos EN (regresión)', () => {
    const en = tokenizeBilingualLine(
      'Guest satisfaction scores ___ (analyse) by the management team every Monday morning.',
    );
    const es = tokenizeBilingualLine(
      'Las puntuaciones de satisfacción del huésped ___ (analizar) por el equipo directivo cada lunes por la mañana.',
    );
    const aligned = alignSpanishPerEnglishWord(en, es);
    const joined = aligned.join(' ');
    expect((joined.match(/analizar/g) || []).length).toBeLessThanOrEqual(1);
    expect((joined.match(/directivo/g) || []).length).toBeLessThanOrEqual(1);
    expect(aligned.length).toBe(en.length);
  });
});

describe('expandBlockToWordPairMarkup', () => {
  it('genera un par por palabra EN sin duplicar "(analizar)" en cada tooltip', () => {
    const en =
      'Guest satisfaction scores ___ (analyse) by the management team every Monday morning.';
    const es =
      'Las puntuaciones de satisfacción del huésped ___ (analizar) por el equipo directivo cada lunes por la mañana.';
    const out = expandBlockToWordPairMarkup(en, es);
    const analizarCount = (out.match(/\(analizar\)/g) || []).length;
    expect(analizarCount).toBe(1);
  });
});
