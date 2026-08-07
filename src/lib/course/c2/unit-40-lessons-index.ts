/**
 * Índice de las 5 lecciones de la Unidad 40 (C2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_40_LESSON_1_GRAMMAR } from './unit-40-lesson-1-grammar';
import { UNIT_40_LESSON_2_GRAMMAR_CONTEXT } from './unit-40-lesson-2-grammar-context';
import { UNIT_40_LESSON_3_READING } from './unit-40-lesson-3-reading';
import { UNIT_40_LESSON_4_LISTENING } from './unit-40-lesson-4-listening';
import { UNIT_40_LESSON_5_WRITING } from './unit-40-lesson-5-writing';

export const UNIT_40_LESSONS = {
  grammar: UNIT_40_LESSON_1_GRAMMAR,
  grammar_context: UNIT_40_LESSON_2_GRAMMAR_CONTEXT,
  reading: UNIT_40_LESSON_3_READING,
  listening: UNIT_40_LESSON_4_LISTENING,
  writing: UNIT_40_LESSON_5_WRITING,
} as const;

export const UNIT_40_ALL_LESSONS: Exercise[][] = [
  UNIT_40_LESSON_1_GRAMMAR,
  UNIT_40_LESSON_2_GRAMMAR_CONTEXT,
  UNIT_40_LESSON_3_READING,
  UNIT_40_LESSON_4_LISTENING,
  UNIT_40_LESSON_5_WRITING,
];

export const UNIT_40_ALL_EXERCISES: Exercise[] = UNIT_40_ALL_LESSONS.flat();
