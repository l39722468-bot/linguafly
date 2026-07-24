/** Convierte marcadores [[en|es]] al idioma preferido. */
export function parseBilingual(text: string, lang: 'en' | 'es' = 'es'): string {
  if (!text) return '';
  return text.replace(/\[\[(.*?)\|(.*?)\]\]/g, (_, en: string, es: string) =>
    lang === 'es' ? es : en
  );
}

export function optionLabel(option: string | { text?: string }): string {
  if (typeof option === 'string') return parseBilingual(option);
  return parseBilingual(option.text ?? '');
}
