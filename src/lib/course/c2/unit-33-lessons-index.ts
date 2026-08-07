/**
 * Índice de las 5 lecciones de la Unidad 33 (C2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_33_LESSON_1_GRAMMAR } from './unit-33-lesson-1-grammar';
import { UNIT_33_LESSON_2_GRAMMAR_CONTEXT } from './unit-33-lesson-2-grammar-context';
import { UNIT_33_LESSON_3_READING } from './unit-33-lesson-3-reading';
import { UNIT_33_LESSON_4_LISTENING } from './unit-33-lesson-4-listening';
import { UNIT_33_LESSON_5_WRITING } from './unit-33-lesson-5-writing';

export const UNIT_33_LESSONS = {
  grammar: UNIT_33_LESSON_1_GRAMMAR,
  grammar_context: UNIT_33_LESSON_2_GRAMMAR_CONTEXT,
  reading: UNIT_33_LESSON_3_READING,
  listening: UNIT_33_LESSON_4_LISTENING,
  writing: UNIT_33_LESSON_5_WRITING,
} as const;

export const UNIT_33_ALL_LESSONS: Exercise[][] = [
  UNIT_33_LESSON_1_GRAMMAR,
  UNIT_33_LESSON_2_GRAMMAR_CONTEXT,
  UNIT_33_LESSON_3_READING,
  UNIT_33_LESSON_4_LISTENING,
  UNIT_33_LESSON_5_WRITING,
];

export const UNIT_33_ALL_EXERCISES: Exercise[] = UNIT_33_ALL_LESSONS.flat();
