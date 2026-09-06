import { isSupportedMobileCourseId, loadUnitExercisesForApi } from '@/lib/course/load-unit-for-api';

describe('load-unit-for-api', () => {
  it('supports all CEFR course ids', () => {
    expect(isSupportedMobileCourseId('ingles-a1')).toBe(true);
    expect(isSupportedMobileCourseId('ingles-c2')).toBe(true);
    expect(isSupportedMobileCourseId('ingles-x9')).toBe(false);
  });

  it('loads A1 unit 1 exercises from server modules', async () => {
    const payload = await loadUnitExercisesForApi('ingles-a1', 'unit-1');
    expect(payload).not.toBeNull();
    expect(payload?.title).toBeTruthy();
    expect(payload?.exercises.length).toBeGreaterThan(0);
    expect(payload?.isFinalTest).toBe(false);
  });

  it('loads B1 unit via course index', async () => {
    const payload = await loadUnitExercisesForApi('ingles-b1', 'unit-1');
    expect(payload).not.toBeNull();
    expect(payload?.exercises.length).toBeGreaterThan(0);
  });

  it('loads final test when requested', async () => {
    const payload = await loadUnitExercisesForApi('ingles-a1', 'test-final');
    expect(payload?.isFinalTest).toBe(true);
    expect(payload?.exercises.length).toBeGreaterThan(0);
  });
});
