/**
 * Índice de las 5 lecciones de la Unidad 10 (C2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_10_LESSON_1_GRAMMAR } from './unit-10-lesson-1-grammar';
import { UNIT_10_LESSON_2_GRAMMAR_CONTEXT } from './unit-10-lesson-2-grammar-context';
import { UNIT_10_LESSON_3_READING } from './unit-10-lesson-3-reading';
import { UNIT_10_LESSON_4_LISTENING } from './unit-10-lesson-4-listening';
import { UNIT_10_LESSON_5_WRITING } from './unit-10-lesson-5-writing';

export const UNIT_10_LESSONS = {
  grammar: UNIT_10_LESSON_1_GRAMMAR,
  grammar_context: UNIT_10_LESSON_2_GRAMMAR_CONTEXT,
  reading: UNIT_10_LESSON_3_READING,
  listening: UNIT_10_LESSON_4_LISTENING,
  writing: UNIT_10_LESSON_5_WRITING,
} as const;

export const UNIT_10_ALL_LESSONS: Exercise[][] = [
  UNIT_10_LESSON_1_GRAMMAR,
  UNIT_10_LESSON_2_GRAMMAR_CONTEXT,
  UNIT_10_LESSON_3_READING,
  UNIT_10_LESSON_4_LISTENING,
  UNIT_10_LESSON_5_WRITING,
];

export const UNIT_10_ALL_EXERCISES: Exercise[] = UNIT_10_ALL_LESSONS.flat();
