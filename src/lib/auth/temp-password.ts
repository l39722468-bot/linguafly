import crypto from 'crypto';

/**
 * Genera una contraseña temporal compatible con la política de Supabase Auth
 * (mayúscula, minúscula, número y símbolo; solo ASCII imprimible).
 */
export function generateTempPassword(length = 14): string {
  const upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const lower = 'abcdefghijkmnopqrstuvwxyz';
  const digits = '23456789';
  const symbols = '!@#$%*';
  const all = upper + lower + digits + symbols;

  const pick = (alphabet: string) => alphabet[crypto.randomInt(0, alphabet.length)];

  // Garantizar al menos un carácter de cada clase exigida.
  const required = [pick(upper), pick(lower), pick(digits), pick(symbols)];

  const restLen = Math.max(length - required.length, 8);
  const rest = Array.from({ length: restLen }, () => pick(all));

  // Mezclar para que la posición de los caracteres requeridos no sea predecible.
  const chars = [...required, ...rest];
  for (let i = chars.length - 1; i > 0; i -= 1) {
    const j = crypto.randomInt(0, i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join('');
}
