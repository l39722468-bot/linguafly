import {
  canAccessUnitInSequentialMode,
  getCurrentUnitNumber,
  getNextUnitSlug,
  isUnitCompleted,
  parseUnitNumber,
} from '@/lib/access/sequential-unit-access';

describe('sequential-unit-access', () => {
  const progress = [
    { unit_id: 1, status: 'completed', exercises_completed: 10, exercises_total: 10 },
    { unit_id: 2, status: 'in_progress', exercises_completed: 3, exercises_total: 12 },
  ];

  it('parseUnitNumber handles common slugs', () => {
    expect(parseUnitNumber('unit-3')).toBe(3);
    expect(parseUnitNumber('unit3')).toBe(3);
    expect(parseUnitNumber('test-final')).toBeNull();
  });

  it('detects completed units from status or counts', () => {
    expect(isUnitCompleted(progress, 1)).toBe(true);
    expect(isUnitCompleted(progress, 2)).toBe(false);
    expect(isUnitCompleted(progress, 3)).toBe(false);
  });

  it('returns first incomplete unit as current', () => {
    expect(getCurrentUnitNumber(progress, 5)).toBe(2);
    expect(getCurrentUnitNumber([], 5)).toBe(1);
  });

  it('locks units outside the active one in sequential mode', () => {
    expect(canAccessUnitInSequentialMode(2, 2)).toBe(true);
    expect(canAccessUnitInSequentialMode(3, 2)).toBe(false);
    expect(canAccessUnitInSequentialMode(1, 2)).toBe(false);
  });

  it('builds next unit slug', () => {
    expect(getNextUnitSlug('unit-2', 5)).toBe('unit-3');
    expect(getNextUnitSlug('unit-5', 5)).toBeNull();
  });
});
