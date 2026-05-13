import { isFreeCourseRoute, isLegacyCourseRedirectRoute } from '@/lib/routes/course-access';

describe('middleware course routing', () => {
  it('keeps current course routes public', () => {
    expect(isFreeCourseRoute('/curso-a1')).toBe(true);
    expect(isFreeCourseRoute('/curso-b2/unit-10')).toBe(true);
    expect(isFreeCourseRoute('/curso-camarero-a2')).toBe(true);
    expect(isFreeCourseRoute('/curso-')).toBe(false);
    expect(isFreeCourseRoute('/curso-/')).toBe(false);
    expect(isLegacyCourseRedirectRoute('/curso-a1')).toBe(false);
    expect(isLegacyCourseRedirectRoute('/curso-camarero-a2')).toBe(false);
  });

  it('still flags legacy course directories for redirect', () => {
    expect(isLegacyCourseRedirectRoute('/curso/ingles-a1')).toBe(true);
    expect(isLegacyCourseRedirectRoute('/cursos')).toBe(true);
    expect(isLegacyCourseRedirectRoute('/cursos/ingles')).toBe(true);
    expect(isLegacyCourseRedirectRoute('/cursos-something')).toBe(false);
    expect(isFreeCourseRoute('/curso/ingles-a1')).toBe(false);
  });
});
