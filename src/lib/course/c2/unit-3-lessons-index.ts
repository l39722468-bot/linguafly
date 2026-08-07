/**
 * Índice de las 5 lecciones de la Unidad 3 (C2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_3_LESSON_1_GRAMMAR } from './unit-3-lesson-1-grammar';
import { UNIT_3_LESSON_2_GRAMMAR_CONTEXT } from './unit-3-lesson-2-grammar-context';
import { UNIT_3_LESSON_3_READING } from './unit-3-lesson-3-reading';
import { UNIT_3_LESSON_4_LISTENING } from './unit-3-lesson-4-listening';
import { UNIT_3_LESSON_5_WRITING } from './unit-3-lesson-5-writing';

export const UNIT_3_LESSONS = {
  grammar: UNIT_3_LESSON_1_GRAMMAR,
  grammar_context: UNIT_3_LESSON_2_GRAMMAR_CONTEXT,
  reading: UNIT_3_LESSON_3_READING,
  listening: UNIT_3_LESSON_4_LISTENING,
  writing: UNIT_3_LESSON_5_WRITING,
} as const;

export const UNIT_3_ALL_LESSONS: Exercise[][] = [
  UNIT_3_LESSON_1_GRAMMAR,
  UNIT_3_LESSON_2_GRAMMAR_CONTEXT,
  UNIT_3_LESSON_3_READING,
  UNIT_3_LESSON_4_LISTENING,
  UNIT_3_LESSON_5_WRITING,
];

export const UNIT_3_ALL_EXERCISES: Exercise[] = UNIT_3_ALL_LESSONS.flat();
