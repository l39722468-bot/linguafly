import type { A1CourseMetadata, ExerciseTypeBreakdown, UnitMetadata } from "@/types/premium-course";
import { calculateDifficulty } from "@/lib/utils/course-metadata";
import { bilingualTitleEnglishPrimary } from "@/lib/utils/bilingual-title";

export interface OrderedUnit {
  id: number;
  title: string;
}

/**
 * Secuencia pública de B2 y C1, en el mismo orden que A1–B1:
 * unidad 1, unidad 2, unidad 3… con el título real de la lección.
 *
 * B2 se queda en 1–60 (como A1, A2 y B1). Las unidades 61–65 no tienen
 * artículo de lección. Las 66–100 repiten lecciones anteriores.
 * C1 publica las lecciones 1–70. Las 71–73 no tienen artículo.
 */

export const B2_ORDERED_UNITS: readonly OrderedUnit[] = [
  { id: 1, title: "Repaso B1 → B2" },
  { id: 2, title: "Future Tenses & Work" },
  { id: 3, title: "Gerund vs Infinitive & Education" },
  { id: 4, title: "Gerund & Object + Infinitive" },
  { id: 5, title: "Repaso 1–4" },
  { id: 6, title: "Wish & If Only" },
  { id: 7, title: "Would Rather & Family" },
  { id: 8, title: "Mixed Conditionals & Travel" },
  { id: 9, title: "Participle Clauses & Environment" },
  { id: 10, title: "Repaso 6–9" },
  { id: 11, title: "Relative Clauses & Urban Life" },
  { id: 12, title: "Relative Clauses Reduction & Gardening" },
  { id: 13, title: "Modals & Volunteering" },
  { id: 14, title: "Modal Deduction & Fashion" },
  { id: 15, title: "Repaso 11–14" },
  { id: 16, title: "Passive & Technology" },
  { id: 17, title: "Modal Passive & Adventure & Extreme Sports" },
  { id: 18, title: "So Such Too Enough" },
  { id: 19, title: "Comparative & Superlative & Literature & Books" },
  { id: 20, title: "Repaso 16–19" },
  { id: 21, title: "Linkers Contrast & Personal Development" },
  { id: 22, title: "Linkers Reason Purpose & Photography & Media" },
  { id: 23, title: "Phrasal Verbs 1 & Home & Living" },
  { id: 24, title: "Phrasal Verbs 2 & Social Media & Networking" },
  { id: 25, title: "Repaso 21–24" },
  { id: 26, title: "Phrasal Verbs 3 & Sustainability & Eco-living" },
  { id: 27, title: "Phrasal Verbs 4 & Music & Entertainment" },
  { id: 28, title: "Collocations Verb+Noun & Food & Gastronomy" },
  { id: 29, title: "Collocations Adj+Noun & Psychology & Mind" },
  { id: 30, title: "Repaso 26–29" },
  { id: 31, title: "Articles (advanced) & Education" },
  { id: 32, title: "Quantifiers & Environment" },
  { id: 33, title: "Regret, remember, forget & Feelings" },
  { id: 34, title: "State verbs & Technology" },
  { id: 35, title: "Repaso 31–34" },
  { id: 36, title: "Used to, would & Culture" },
  { id: 37, title: "Auxiliaries & Business" },
  { id: 38, title: "Phrasal Verbs 5 (RUN, SET, TAKE) & Leisure" },
  { id: 39, title: "Phrasal Verbs 6 (TURN, WORK, others) & Sport" },
  { id: 40, title: "Repaso 36–39" },
  { id: 41, title: "Education Systems & Learning" },
  { id: 42, title: "Scientific Discoveries" },
  { id: 43, title: "University Life & Academics" },
  { id: 44, title: "Medical Research & Health" },
  { id: 45, title: "Space Exploration" },
  { id: 46, title: "Psychology & Human Behavior" },
  { id: 47, title: "Academic Writing & Reports" },
  { id: 48, title: "Innovation in Teaching" },
  { id: 49, title: "Sociology & Cultural Shifts" },
  { id: 50, title: "Repaso 41-49" },
  { id: 51, title: "Global Economic Crisis" },
  { id: 52, title: "Human Migration & Society" },
  { id: 53, title: "The Future of Work" },
  { id: 54, title: "Urban Planning & Sustainable Cities" },
  { id: 55, title: "Cultural Heritage & Identity" },
  { id: 56, title: "Digital Rights & Online Ethics" },
  { id: 57, title: "Media Literacy & Critical Thinking" },
  { id: 58, title: "Review: Advanced Conditionals" },
  { id: 59, title: "Review: Modal Deduction & Speculation" },
  { id: 60, title: "Final Course Review & Evaluation" },
];

export const C1_ORDERED_UNITS: readonly OrderedUnit[] = [
  { id: 1, title: "[[Personal Identity and Self-Image|Identidad personal e imagen personal]]" },
  { id: 2, title: "[[Language and Communication|Lenguaje y comunicación]]" },
  { id: 3, title: "[[Science and Technology|Ciencia y tecnología]]" },
  { id: 4, title: "[[The Natural World|El mundo natural]]" },
  { id: 5, title: "[[Arts and Culture|Arte y cultura]]" },
  { id: 6, title: "[[Work and Economy|Trabajo y economía]]" },
  { id: 7, title: "[[Health and Mind|Salud y mente]]" },
  { id: 8, title: "[[Global Issues|Problemas globales]]" },
  { id: 9, title: "[[Media and Information|Medios e información]]" },
  { id: 10, title: "[[Philosophy, Ethics and the Future|Filosofía, ética y el futuro]]" },
  { id: 11, title: "Education and Learning" },
  { id: 12, title: "Urban Life and Architecture" },
  { id: 13, title: "Travel and Cultural Exchange" },
  { id: 14, title: "Food, Gastronomy and Culture" },
  { id: 15, title: "Sport, Competition and Performance" },
  { id: 16, title: "Music and the Performing Arts" },
  { id: 17, title: "Literature and Storytelling" },
  { id: 18, title: "Fashion, Identity and Society" },
  { id: 19, title: "Crime, Justice and Society" },
  { id: 20, title: "Economics and Globalisation" },
  { id: 21, title: "The Environment and Climate Change" },
  { id: 22, title: "Biodiversity and Conservation" },
  { id: 23, title: "Natural Disasters and Risk" },
  { id: 24, title: "Oceans and Marine Life" },
  { id: 25, title: "Cinema and Film" },
  { id: 26, title: "Visual Arts and Aesthetics" },
  { id: 27, title: "Theatre and Performance" },
  { id: 28, title: "Dance and Choreography" },
  { id: 29, title: "Photography and Visual Storytelling" },
  { id: 30, title: "Cultural Heritage and Preservation" },
  { id: 31, title: "The World of Work: Careers and Ambition" },
  { id: 32, title: "Business and Economic Trends" },
  { id: 33, title: "Entrepreneurship and Innovation" },
  { id: 34, title: "Leadership and Management" },
  { id: 35, title: "Work Ethics and Corporate Responsibility" },
  { id: 36, title: "The Economy and Society" },
  { id: 37, title: "Mental Health and Wellbeing" },
  { id: 38, title: "The Science of the Brain" },
  { id: 39, title: "Nutrition and Lifestyle Medicine" },
  { id: 40, title: "Ageing and Longevity" },
  { id: 41, title: "Alternative Medicine and Treatment" },
  { id: 42, title: "Health and Mind: Module Consolidation" },
  { id: 43, title: "Human Rights and International Law" },
  { id: 44, title: "Migration and Displacement" },
  { id: 45, title: "Development and Global Inequality" },
  { id: 46, title: "War, Conflict and Peacekeeping" },
  { id: 47, title: "Climate Diplomacy and International Cooperation" },
  { id: 48, title: "Global Issues: Module Consolidation" },
  { id: 49, title: "Traditional vs Digital Media" },
  { id: 50, title: "Fake News and Disinformation" },
  { id: 51, title: "Privacy, Surveillance and Digital Rights" },
  { id: 52, title: "Artificial Intelligence and Society" },
  { id: 53, title: "Journalism Ethics and Press Freedom" },
  { id: 54, title: "Media and Information: Module Consolidation" },
  { id: 55, title: "Free Will and Determinism" },
  { id: 56, title: "Philosophy of Mind" },
  { id: 57, title: "Ethics and Moral Philosophy" },
  { id: 58, title: "The Future of Humanity" },
  { id: 59, title: "Full Grammar Consolidation" },
  { id: 60, title: "Exam Preparation: CAE, IELTS and TOEFL" },
  { id: 61, title: "C1 Language Lab — Phrasal Verbs in Argument" },
  { id: 62, title: "C1 Language Lab — Verb and Adjective + Preposition" },
  { id: 63, title: "C1 Language Lab — Word Formation and Precision" },
  { id: 64, title: "C1 Language Lab — Fixed Expressions and Academic Stems" },
  { id: 65, title: "C1 Language Lab — Advanced Conditionals" },
  { id: 66, title: "C1 Language Lab — Mandative Subjunctive" },
  { id: 67, title: "C1 Language Lab — Inversion and Emphatic Fronting" },
  { id: 68, title: "C1 Language Lab — Clefts and Pseudo-clefts" },
  { id: 69, title: "C1 Language Lab — Hedging and Stance" },
  { id: 70, title: "C1 Language Lab — Discourse Cohesion" },
];

/** Número de unidad al final del nombre (`unit10.json`, `unit-10.json`), no el primer dígito. */
export function unitNumberFromCourseFile(filename: string): number {
  const named = filename.match(/unit-?(\d+)\.json$/i);
  if (named) return parseInt(named[1], 10);
  const beforeExt = filename.match(/(\d+)\.json$/i);
  if (beforeExt) return parseInt(beforeExt[1], 10);
  const first = filename.match(/\d+/);
  return first ? parseInt(first[0], 10) : 0;
}

const MINUTES_PER_UNIT = 60;

/** La mayoría de unidades B2 tienen 54 ejercicios (5 lecciones). */
export function b2CardExerciseCount(unitNumber: number): number {
  return unitNumber >= 1 && unitNumber <= 60 ? 54 : 0;
}

/** C1: unidades 1–10 ampliadas (90) y el resto del temario publicado (15). */
export function c1CardExerciseCount(unitNumber: number): number {
  if (unitNumber >= 1 && unitNumber <= 10) return 90;
  if (unitNumber >= 11 && unitNumber <= 70) return 15;
  return 0;
}

function exerciseBreakdown(total: number): ExerciseTypeBreakdown {
  return {
    multiple_choice: 0,
    fill_in_the_blank: 0,
    matching: 0,
    drag_and_drop: 0,
    categorization: 0,
    short_answer: 0,
    audio_matching: 0,
    listening: 0,
    video_narrative: 0,
    flashcards: 0,
    other: total,
    total,
  };
}

/** Lista de unidades ya ordenada por número, con el título del temario. */
export function metadataFromOrderedUnits(
  units: readonly OrderedUnit[],
  exerciseCountFor: (unitNumber: number) => number,
): A1CourseMetadata {
  const ordered = [...units].sort((a, b) => a.id - b.id);
  const metadata: UnitMetadata[] = ordered.map((unit) => {
    const exerciseCount = exerciseCountFor(unit.id);
    return {
      unitId: `unit-${unit.id}`,
      unitNumber: unit.id,
      title: bilingualTitleEnglishPrimary(unit.title),
      topics: [],
      exerciseCount,
      exerciseBreakdown: exerciseBreakdown(exerciseCount),
      difficulty: calculateDifficulty(unit.id, ordered.length || 60),
      estimatedDuration: MINUTES_PER_UNIT,
    };
  });
  return {
    totalUnits: metadata.length,
    totalDuration: metadata.reduce((sum, unit) => sum + unit.estimatedDuration, 0),
    units: metadata,
  };
}
