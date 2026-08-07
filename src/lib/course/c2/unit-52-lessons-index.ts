/**
 * Índice de las 5 lecciones de la Unidad 52 (C2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_52_LESSON_1_GRAMMAR } from './unit-52-lesson-1-grammar';
import { UNIT_52_LESSON_2_GRAMMAR_CONTEXT } from './unit-52-lesson-2-grammar-context';
import { UNIT_52_LESSON_3_READING } from './unit-52-lesson-3-reading';
import { UNIT_52_LESSON_4_LISTENING } from './unit-52-lesson-4-listening';
import { UNIT_52_LESSON_5_WRITING } from './unit-52-lesson-5-writing';

export const UNIT_52_LESSONS = {
  grammar: UNIT_52_LESSON_1_GRAMMAR,
  grammar_context: UNIT_52_LESSON_2_GRAMMAR_CONTEXT,
  reading: UNIT_52_LESSON_3_READING,
  listening: UNIT_52_LESSON_4_LISTENING,
  writing: UNIT_52_LESSON_5_WRITING,
} as const;

export const UNIT_52_ALL_LESSONS: Exercise[][] = [
  UNIT_52_LESSON_1_GRAMMAR,
  UNIT_52_LESSON_2_GRAMMAR_CONTEXT,
  UNIT_52_LESSON_3_READING,
  UNIT_52_LESSON_4_LISTENING,
  UNIT_52_LESSON_5_WRITING,
];

export const UNIT_52_ALL_EXERCISES: Exercise[] = UNIT_52_ALL_LESSONS.flat();
