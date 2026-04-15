/**
 * Respuesta de respaldo cuando no hay IPA en el JSON (p. ej. palabras compuestas raras).
 * Las entradas generadas incluyen IPA desde el script de build.
 */
export function fallbackPhoneticHint(word: string): string {
  const w = word.trim().toLowerCase();
  if (!w) return "";
  return `/${w.split("").join("·")}/`;
}
