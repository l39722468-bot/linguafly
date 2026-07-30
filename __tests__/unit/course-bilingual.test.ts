import {
  applyCourseBilingualText,
  applyCourseQuestionBilingual,
  normalizeCourseBilingualText,
  shouldExpandWordPairsForExercise,
  wrapTextWithBilingualDictionary,
} from '@/lib/course/course-bilingual';

describe('course-bilingual', () => {
  it('activates word-pair expansion for C1 and C2', () => {
    expect(shouldExpandWordPairsForExercise('c1-u73-g1')).toBe(true);
    expect(shouldExpandWordPairsForExercise('c2-u61-l1-1')).toBe(true);
    expect(shouldExpandWordPairsForExercise('b2-u8-l1-g1')).toBe(false);
  });

  it('wraps plain English with dictionary markup', () => {
    const out = wrapTextWithBilingualDictionary('If you need help, contact me.');
    expect(out).toContain('[[If|');
    expect(out).toContain('[[help|');
  });

  it('replaces grammar-hint option pairs with EN dictionary wrap', () => {
    const input = '[[Had I known, I would have acted differently.|Had + sujeto + participio]]';
    const out = normalizeCourseBilingualText(input);
    expect(out).toContain('[[known|');
    expect(out).not.toContain('sujeto');
  });

  it('keeps real bilingual phrase pairs intact', () => {
    const input = '[[She cannot have gone far.|No puede haber ido lejos.]]';
    expect(normalizeCourseBilingualText(input)).toBe(input);
  });

  it('applies C1 question map when available', () => {
    const out = applyCourseQuestionBilingual(
      'c1-u1-g1',
      'She left her keys on the table and her coat is still here. Which sentence expresses the best deduction about the past?'
    );
    expect(out).toContain('[[');
    expect(out.length).toBeGreaterThan(50);
  });

  it('applies dictionary fallback for C2 questions', () => {
    const out = applyCourseQuestionBilingual(
      'c2-u61-l1-1',
      'If I had known about the delay, I would have changed plans.'
    );
    expect(out).toContain('[[');
  });

  it('applyCourseBilingualText only affects C1/C2', () => {
    expect(applyCourseBilingualText('b1-u1-g1', 'If you need help')).toBe('If you need help');
    expect(applyCourseBilingualText('c1-u11-g1', 'If you need help')).toContain('[[');
  });
});
