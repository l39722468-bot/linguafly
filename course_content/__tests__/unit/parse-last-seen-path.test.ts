import { parseLastSeenPath } from '@/lib/access/parse-last-seen-path';

describe('parseLastSeenPath', () => {
  it('parses official course unit paths', () => {
    expect(parseLastSeenPath('/curso-b2/unit-15')).toEqual({
      coursePath: '/curso-b2',
      unitSlug: 'unit-15',
      unitNumber: 15,
    });
  });

  it('normalizes casing', () => {
    expect(parseLastSeenPath('/Curso-A1/Unit-3')?.unitNumber).toBe(3);
    expect(parseLastSeenPath('/Curso-A1/Unit-3')?.coursePath).toBe('/curso-a1');
  });

  it('returns null for unsupported paths', () => {
    expect(parseLastSeenPath('/curso/toefl-ibt')).toBeNull();
    expect(parseLastSeenPath('/curso-a1/outline')).toBeNull();
    expect(parseLastSeenPath(null)).toBeNull();
  });
});
