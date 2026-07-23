import {
  isFreeCourseRoute,
  isLegacyCourseRedirectRoute,
  isPaidCourseRoute,
} from '@/lib/routes/course-access';
import {
  canAccessCourseUnit,
  isFreeCourseContentPath,
  isFreeUnitId,
  requiresSubscriptionForCoursePath,
} from '@/lib/access/unit-access';

describe('middleware course routing (freemium)', () => {
  it('keeps landings and unit-1 public', () => {
    expect(isFreeCourseRoute('/curso-a1')).toBe(true);
    expect(isFreeCourseRoute('/curso-b2/unit-1')).toBe(true);
    expect(isFreeCourseRoute('/curso-a1/unit1')).toBe(true);
    expect(isFreeCourseRoute('/curso-a2/outline')).toBe(true);
    expect(isFreeCourseRoute('/curso-a1/tipografia')).toBe(true);
    expect(isFreeCourseContentPath('/curso-c1/unit-1')).toBe(true);
  });

  it('requires subscription for unit-2+ and course extras', () => {
    expect(isFreeCourseRoute('/curso-b2/unit-10')).toBe(false);
    expect(isPaidCourseRoute('/curso-b2/unit-10')).toBe(true);
    expect(requiresSubscriptionForCoursePath('/curso-a1/unit-2')).toBe(true);
    expect(requiresSubscriptionForCoursePath('/curso-a1/test-final')).toBe(true);
    expect(requiresSubscriptionForCoursePath('/curso-a1/sesion-diaria')).toBe(true);
    expect(requiresSubscriptionForCoursePath('/curso-a1/practica-inteligente')).toBe(true);
    expect(requiresSubscriptionForCoursePath('/curso-a1')).toBe(false);
  });

  it('still flags legacy course directories for redirect', () => {
    expect(isLegacyCourseRedirectRoute('/curso/ingles-a1')).toBe(true);
    expect(isLegacyCourseRedirectRoute('/cursos')).toBe(true);
    expect(isLegacyCourseRedirectRoute('/cursos/ingles')).toBe(true);
    expect(isLegacyCourseRedirectRoute('/cursos-something')).toBe(false);
    expect(isFreeCourseRoute('/curso/ingles-a1')).toBe(false);
  });

  it('resolves free unit ids and access rules', () => {
    expect(isFreeUnitId('unit-1')).toBe(true);
    expect(isFreeUnitId('unit1')).toBe(true);
    expect(isFreeUnitId('1')).toBe(true);
    expect(isFreeUnitId('unit-2')).toBe(false);
    expect(canAccessCourseUnit({ unitId: 'unit-1', isPaid: false })).toBe(true);
    expect(canAccessCourseUnit({ unitId: 'unit-2', isPaid: false })).toBe(false);
    expect(canAccessCourseUnit({ unitId: 'unit-2', isPaid: true })).toBe(true);
    expect(canAccessCourseUnit({ unitId: 'unit-2', isPaid: false, isAdmin: true })).toBe(true);
  });
});
