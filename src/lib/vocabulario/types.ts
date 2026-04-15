export type VocabEntry = {
  en: string;
  es: string;
  /** IPA aproximada (en-US) para lectura */
  phonetic: string;
  /** URL de audio generado (p. ej. Workers AI); null = usar síntesis del navegador */
  audioUrl: string | null;
};

export type VocabSectorFile = {
  slug: string;
  title: string;
  words: VocabEntry[];
};
