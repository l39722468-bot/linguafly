import { hasPlacementCompleted } from '@/lib/access/has-placement-completed';

describe('has-placement-completed', () => {
  it('returns true when placement_completed_at exists', () => {
    expect(
      hasPlacementCompleted({
        placement_completed_at: '2026-07-30T00:00:00.000Z',
      })
    ).toBe(true);
  });

  it('returns true when learning_goals includes placement_completed', () => {
    expect(
      hasPlacementCompleted({
        learning_goals: ['general', 'placement_completed'],
      })
    ).toBe(true);
  });

  it('returns true when profile language_level is valid', () => {
    expect(
      hasPlacementCompleted({
        language_level: 'b2',
      })
    ).toBe(true);
  });

  it('falls back to users.language_level', () => {
    expect(hasPlacementCompleted(null, 'C1')).toBe(true);
  });

  it('returns false when there is no completion signal', () => {
    expect(hasPlacementCompleted({ learning_goals: ['general'] }, null)).toBe(false);
  });
});
