import { savePlacementResult, normalizePlacementLevel } from '@/lib/access/save-placement-result';

describe('save-placement-result', () => {
  it('normalizes valid CEFR levels', () => {
    expect(normalizePlacementLevel('b1')).toBe('B1');
    expect(normalizePlacementLevel('invalid')).toBeNull();
  });

  it('updates existing profile without placement_completed column', async () => {
    const updates: any[] = [];
    const supabase = {
      from(table: string) {
        return {
          select() {
            return {
              eq() {
                return {
                  maybeSingle: async () => ({
                    data:
                      table === 'user_profiles'
                        ? {
                            user_id: 'user-1',
                            learning_goals: [],
                            language_level: 'B2',
                            last_seen_path: '/curso-b2/unit-10',
                          }
                        : null,
                  }),
                };
              },
            };
          },
          update(payload: unknown) {
            updates.push({ table, payload });
            return { eq: async () => ({ error: null }) };
          },
          upsert: async () => ({ error: null }),
        };
      },
    };

    const result = await savePlacementResult({
      supabase,
      userId: 'user-1',
      level: 'A1',
    });

    expect(result).toEqual({ ok: true, level: 'B2' });
    expect(updates[0].payload).toMatchObject({
      language_level: 'B2',
      learning_goals: ['placement_completed'],
    });
    expect(updates[0].payload).not.toHaveProperty('placement_completed');
  });
});
