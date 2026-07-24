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

  const required = [pick(upper), pick(lower), pick(digits), pick(symbols)];
  const restLen = Math.max(length - required.length, 8);
  const rest = Array.from({ length: restLen }, () => pick(all));

  const chars = [...required, ...rest];
  for (let i = chars.length - 1; i > 0; i -= 1) {
    const j = crypto.randomInt(0, i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join('');
}

/** Misma política que exigimos en Auth / panel. */
export function validatePasswordPolicy(password: string): string | null {
  if (typeof password !== 'string' || password.length < 8) {
    return 'La contraseña debe tener al menos 8 caracteres.';
  }
  if (password.length > 72) {
    return 'La contraseña no puede superar 72 caracteres.';
  }
  if (/[^\x20-\x7E]/.test(password)) {
    return 'Usa solo letras, números y símbolos del teclado (sin acentos ni emojis).';
  }
  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%*]/.test(password)) {
    return 'La contraseña debe incluir mayúscula, minúscula, número y un símbolo (!@#$*).';
  }
  return null;
}
