/**
 * Índice de las 5 lecciones de la Unidad 32 (C2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_32_LESSON_1_GRAMMAR } from './unit-32-lesson-1-grammar';
import { UNIT_32_LESSON_2_GRAMMAR_CONTEXT } from './unit-32-lesson-2-grammar-context';
import { UNIT_32_LESSON_3_READING } from './unit-32-lesson-3-reading';
import { UNIT_32_LESSON_4_LISTENING } from './unit-32-lesson-4-listening';
import { UNIT_32_LESSON_5_WRITING } from './unit-32-lesson-5-writing';

export const UNIT_32_LESSONS = {
  grammar: UNIT_32_LESSON_1_GRAMMAR,
  grammar_context: UNIT_32_LESSON_2_GRAMMAR_CONTEXT,
  reading: UNIT_32_LESSON_3_READING,
  listening: UNIT_32_LESSON_4_LISTENING,
  writing: UNIT_32_LESSON_5_WRITING,
} as const;

export const UNIT_32_ALL_LESSONS: Exercise[][] = [
  UNIT_32_LESSON_1_GRAMMAR,
  UNIT_32_LESSON_2_GRAMMAR_CONTEXT,
  UNIT_32_LESSON_3_READING,
  UNIT_32_LESSON_4_LISTENING,
  UNIT_32_LESSON_5_WRITING,
];

export const UNIT_32_ALL_EXERCISES: Exercise[] = UNIT_32_ALL_LESSONS.flat();
