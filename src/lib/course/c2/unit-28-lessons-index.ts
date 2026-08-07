/**
 * Índice de las 5 lecciones de la Unidad 28 (C2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_28_LESSON_1_GRAMMAR } from './unit-28-lesson-1-grammar';
import { UNIT_28_LESSON_2_GRAMMAR_CONTEXT } from './unit-28-lesson-2-grammar-context';
import { UNIT_28_LESSON_3_READING } from './unit-28-lesson-3-reading';
import { UNIT_28_LESSON_4_LISTENING } from './unit-28-lesson-4-listening';
import { UNIT_28_LESSON_5_WRITING } from './unit-28-lesson-5-writing';

export const UNIT_28_LESSONS = {
  grammar: UNIT_28_LESSON_1_GRAMMAR,
  grammar_context: UNIT_28_LESSON_2_GRAMMAR_CONTEXT,
  reading: UNIT_28_LESSON_3_READING,
  listening: UNIT_28_LESSON_4_LISTENING,
  writing: UNIT_28_LESSON_5_WRITING,
} as const;

export const UNIT_28_ALL_LESSONS: Exercise[][] = [
  UNIT_28_LESSON_1_GRAMMAR,
  UNIT_28_LESSON_2_GRAMMAR_CONTEXT,
  UNIT_28_LESSON_3_READING,
  UNIT_28_LESSON_4_LISTENING,
  UNIT_28_LESSON_5_WRITING,
];

export const UNIT_28_ALL_EXERCISES: Exercise[] = UNIT_28_ALL_LESSONS.flat();
