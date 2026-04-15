import { normalizeCefrLevel } from '@/lib/world-progress';

describe('world-progress', () => {
  it('normaliza niveles validos', () => {
    expect(normalizeCefrLevel('a1')).toBe('A1');
    expect(normalizeCefrLevel('b2')).toBe('B2');
    expect(normalizeCefrLevel(' C1 ')).toBe('C1');
  });

  it('usa A1 cuando el nivel no es valido', () => {
    expect(normalizeCefrLevel('')).toBe('A1');
    expect(normalizeCefrLevel('Z9')).toBe('A1');
    expect(normalizeCefrLevel(undefined)).toBe('A1');
  });
});
