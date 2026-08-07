/**
 * Índice de las 5 lecciones de la Unidad 31 (C2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_31_LESSON_1_GRAMMAR } from './unit-31-lesson-1-grammar';
import { UNIT_31_LESSON_2_GRAMMAR_CONTEXT } from './unit-31-lesson-2-grammar-context';
import { UNIT_31_LESSON_3_READING } from './unit-31-lesson-3-reading';
import { UNIT_31_LESSON_4_LISTENING } from './unit-31-lesson-4-listening';
import { UNIT_31_LESSON_5_WRITING } from './unit-31-lesson-5-writing';

export const UNIT_31_LESSONS = {
  grammar: UNIT_31_LESSON_1_GRAMMAR,
  grammar_context: UNIT_31_LESSON_2_GRAMMAR_CONTEXT,
  reading: UNIT_31_LESSON_3_READING,
  listening: UNIT_31_LESSON_4_LISTENING,
  writing: UNIT_31_LESSON_5_WRITING,
} as const;

export const UNIT_31_ALL_LESSONS: Exercise[][] = [
  UNIT_31_LESSON_1_GRAMMAR,
  UNIT_31_LESSON_2_GRAMMAR_CONTEXT,
  UNIT_31_LESSON_3_READING,
  UNIT_31_LESSON_4_LISTENING,
  UNIT_31_LESSON_5_WRITING,
];

export const UNIT_31_ALL_EXERCISES: Exercise[] = UNIT_31_ALL_LESSONS.flat();
