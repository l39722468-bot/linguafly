const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const textEncoder = new TextEncoder();

export function isValidEmail(value: string): boolean {
  return value.length <= 320 && EMAIL_PATTERN.test(value);
}

/**
 * GoTrue stores passwords with bcrypt, which only uses the first 72 bytes.
 * The character bounds stay, and the byte length is checked as well.
 */
export function passwordError(password: string, confirmation?: string): string | null {
  const bytes = textEncoder.encode(password).length;
  if (password.length < 8 || password.length > 72 || bytes > 72) {
    return "Usa entre 8 y 72 caracteres, sin superar 72 bytes.";
  }
  if (confirmation !== undefined && password !== confirmation) {
    return "Las contraseñas no coinciden.";
  }
  return null;
}
