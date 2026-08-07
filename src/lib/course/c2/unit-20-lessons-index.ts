/**
 * Índice de las 5 lecciones de la Unidad 20 (C2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_20_LESSON_1_GRAMMAR } from './unit-20-lesson-1-grammar';
import { UNIT_20_LESSON_2_GRAMMAR_CONTEXT } from './unit-20-lesson-2-grammar-context';
import { UNIT_20_LESSON_3_READING } from './unit-20-lesson-3-reading';
import { UNIT_20_LESSON_4_LISTENING } from './unit-20-lesson-4-listening';
import { UNIT_20_LESSON_5_WRITING } from './unit-20-lesson-5-writing';

export const UNIT_20_LESSONS = {
  grammar: UNIT_20_LESSON_1_GRAMMAR,
  grammar_context: UNIT_20_LESSON_2_GRAMMAR_CONTEXT,
  reading: UNIT_20_LESSON_3_READING,
  listening: UNIT_20_LESSON_4_LISTENING,
  writing: UNIT_20_LESSON_5_WRITING,
} as const;

export const UNIT_20_ALL_LESSONS: Exercise[][] = [
  UNIT_20_LESSON_1_GRAMMAR,
  UNIT_20_LESSON_2_GRAMMAR_CONTEXT,
  UNIT_20_LESSON_3_READING,
  UNIT_20_LESSON_4_LISTENING,
  UNIT_20_LESSON_5_WRITING,
];

export const UNIT_20_ALL_EXERCISES: Exercise[] = UNIT_20_ALL_LESSONS.flat();
