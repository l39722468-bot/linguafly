/**
 * Índice de las 5 lecciones de la Unidad 11 (C2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_11_LESSON_1_GRAMMAR } from './unit-11-lesson-1-grammar';
import { UNIT_11_LESSON_2_GRAMMAR_CONTEXT } from './unit-11-lesson-2-grammar-context';
import { UNIT_11_LESSON_3_READING } from './unit-11-lesson-3-reading';
import { UNIT_11_LESSON_4_LISTENING } from './unit-11-lesson-4-listening';
import { UNIT_11_LESSON_5_WRITING } from './unit-11-lesson-5-writing';

export const UNIT_11_LESSONS = {
  grammar: UNIT_11_LESSON_1_GRAMMAR,
  grammar_context: UNIT_11_LESSON_2_GRAMMAR_CONTEXT,
  reading: UNIT_11_LESSON_3_READING,
  listening: UNIT_11_LESSON_4_LISTENING,
  writing: UNIT_11_LESSON_5_WRITING,
} as const;

export const UNIT_11_ALL_LESSONS: Exercise[][] = [
  UNIT_11_LESSON_1_GRAMMAR,
  UNIT_11_LESSON_2_GRAMMAR_CONTEXT,
  UNIT_11_LESSON_3_READING,
  UNIT_11_LESSON_4_LISTENING,
  UNIT_11_LESSON_5_WRITING,
];

export const UNIT_11_ALL_EXERCISES: Exercise[] = UNIT_11_ALL_LESSONS.flat();
