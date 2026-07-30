/**
 * Arquitectura curricular C1 (única referencia para “qué es cada bloque”).
 *
 * - Los **títulos de unidad** viven en `index.ts` (`C1_COURSE.units`).
 * - Aquí se define **cómo se agrupa el curso** en la UI y el **foco teórico** del Language Lab.
 *
 * ## Carga por unidad (temario → ítems)
 * **Modelo estándar:** `C1_EXERCISES_PER_UNIT` ejercicios en **6 lecciones** × **3 ítems** (`six-lesson-layout`).
 * **Modelo ampliado (piloto):** `C1_EXERCISES_PER_UNIT_FULL` = 6 × **18** ítems (p. ej. unidad 1).
 * Patrón de IDs: `c1-u{n}-g…`, `v…`, `r…`, `l…`, `w…`, `s…` con el mismo sufijo numérico por lección.
 */

/** Total de ejercicios por unidad — modelo mayoritario (6 lecciones × 3 ítems). */
export const C1_EXERCISES_PER_UNIT = 18 as const;

/** Ítems por franja en el modelo estándar. */
export const C1_EXERCISES_PER_LESSON_SLOT = 3 as const;

/** Unidades con 18 ítems por lección (108 en total). El validador y el player admiten ambos modelos. */
export const C1_UNITS_FULL_LESSON_DEPTH: readonly number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

/** Total ejercicios en modelo ampliado (6 × 18). */
export const C1_EXERCISES_PER_UNIT_FULL = 108 as const;

/** Ítems por lección en modelo ampliado. */
export const C1_EXERCISES_PER_LESSON_SLOT_FULL = 18 as const;

export type C1UnitTrack = 'thematic' | 'language-lab' | 'consolidation' | 'exam-prep';

export interface C1UnitCurriculumEntry {
  unitId: number;
  track: C1UnitTrack;
  focus: string;
}

/** Unidades 1–58: temas por contenido (sin contar cierre 59–60). */
export const C1_THEMATIC_RANGE = { from: 1, to: 58 } as const;

/** Unidades 59–60: consolidación gramatical y preparación de examen (dentro del bloque 51–60 en la UI). */
export const C1_CONSOLIDATION_UNITS = [59, 60] as const;

/** Unidades 61–73: Language Lab (sistemas lingüísticos C1). IDs de ítem: `c1-uN-g|v|r|l|w|s…`. */
export const C1_LANGUAGE_LAB_RANGE = { from: 61, to: 73 } as const;

/**
 * Módulos para la vista “Por módulos” del selector de unidades (`groupUnitsIntoModules`).
 * Rangos inclusivos; deben cubrir 1–73 sin solaparse.
 */
export const C1_UI_MODULES: readonly {
  key: string;
  titleEs: string;
  descriptionEs: string;
  unitRange: readonly [number, number];
}[] = [
  {
    key: 'thematic-i',
    titleEs: 'Bloque temático I — Persona, sociedad y entorno',
    descriptionEs: 'Unidades 1–10: identidad, comunicación, ciencia, naturaleza, cultura, economía, salud, problemas globales, medios y reflexión.',
    unitRange: [1, 10],
  },
  {
    key: 'thematic-ii',
    titleEs: 'Bloque temático II — Cultura, ciudad y economía',
    descriptionEs: 'Unidades 11–20: educación, arquitectura y ciudad, viajes, gastronomía, deporte, artes escénicas, literatura, moda, justicia y globalización.',
    unitRange: [11, 20],
  },
  {
    key: 'thematic-iii',
    titleEs: 'Bloque temático III — Planeta, medios y patrimonio',
    descriptionEs: 'Unidades 21–30: clima, biodiversidad, riesgos, océanos, cine, artes visuales, teatro, danza, fotografía y patrimonio.',
    unitRange: [21, 30],
  },
  {
    key: 'thematic-iv',
    titleEs: 'Bloque temático IV — Trabajo, innovación y salud',
    descriptionEs: 'Unidades 31–40: carrera, negocios, emprendimiento, liderazgo, ética laboral, economía, salud mental, neurociencia, nutrición y longevidad.',
    unitRange: [31, 40],
  },
  {
    key: 'thematic-v',
    titleEs: 'Bloque temático V — Derechos, conflicto y cooperación',
    descriptionEs: 'Unidades 41–50: medicina alternativa y cierre del módulo salud; derechos humanos, migración, desigualdad, conflicto, diplomacia climática y cierre de problemas globales.',
    unitRange: [41, 50],
  },
  {
    key: 'thematic-vi-close',
    titleEs: 'Bloque temático VI — Medios, filosofía y cierre de curso',
    descriptionEs: 'Unidades 51–60: medios digitales, IA, ética periodística, filosofía, futuro de la humanidad; consolidación gramatical global (59) y preparación CAE/IELTS/TOEFL (60).',
    unitRange: [51, 60],
  },
  {
    key: 'language-lab',
    titleEs: 'Language Lab — Sistemas lingüísticos C1',
    descriptionEs:
      'Unidades 61–73: gramática y léxico de precisión, lectura/listening/writing/speaking en registro académico o formal. Complementa el bloque temático con teoría y uso sistémico.',
    unitRange: [61, 73],
  },
] as const;

/**
 * Foco teórico por unidad del Language Lab (el título visible sigue en `C1_COURSE` / `index.ts`).
 */
export const C1_LANGUAGE_LAB_SYLLABUS: { unitId: number; theoryFocus: string }[] = [
  { unitId: 61, theoryFocus: 'Phrasal verbs, registro formal/informal, alternativas latinas' },
  { unitId: 62, theoryFocus: 'Colocaciones verbo/adjetivo + preposición' },
  { unitId: 63, theoryFocus: 'Formación de palabras y precisión léxica' },
  { unitId: 64, theoryFocus: 'Fórmulas fijas y stems académicos' },
  { unitId: 65, theoryFocus: 'Condicionales avanzados e inversión condicional' },
  { unitId: 66, theoryFocus: 'Subjuntivo mandativo (registro formal/legal)' },
  { unitId: 67, theoryFocus: 'Inversión y énfasis (Never, Seldom, Not only, So… that…)' },
  { unitId: 68, theoryFocus: 'Hendidas, pseudohendidas y estructura informativa' },
  { unitId: 69, theoryFocus: 'Hedging, postura epistémica y registro académico' },
  { unitId: 70, theoryFocus: 'Cohesión discursiva (conectores, anáfora, consecuencia)' },
  { unitId: 71, theoryFocus: 'Participios, oraciones reducidas, estilo compacto' },
  { unitId: 72, theoryFocus: 'Nominalización y densidad informativa' },
  { unitId: 73, theoryFocus: 'Condicionales mixtos, inversión (Had/Were/Should), but for y otherwise' },
];

export function getLanguageLabUnitIds(): number[] {
  return C1_LANGUAGE_LAB_SYLLABUS.map((u) => u.unitId);
}

export function getC1ModuleKeyForUnit(unitNumber: number): string | undefined {
  const m = C1_UI_MODULES.find(
    (mod) => unitNumber >= mod.unitRange[0] && unitNumber <= mod.unitRange[1]
  );
  return m?.key;
}
