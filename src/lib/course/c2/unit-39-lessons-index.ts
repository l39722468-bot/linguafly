/**
 * Índice de las 5 lecciones de la Unidad 39 (C2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_39_LESSON_1_GRAMMAR } from './unit-39-lesson-1-grammar';
import { UNIT_39_LESSON_2_GRAMMAR_CONTEXT } from './unit-39-lesson-2-grammar-context';
import { UNIT_39_LESSON_3_READING } from './unit-39-lesson-3-reading';
import { UNIT_39_LESSON_4_LISTENING } from './unit-39-lesson-4-listening';
import { UNIT_39_LESSON_5_WRITING } from './unit-39-lesson-5-writing';

export const UNIT_39_LESSONS = {
  grammar: UNIT_39_LESSON_1_GRAMMAR,
  grammar_context: UNIT_39_LESSON_2_GRAMMAR_CONTEXT,
  reading: UNIT_39_LESSON_3_READING,
  listening: UNIT_39_LESSON_4_LISTENING,
  writing: UNIT_39_LESSON_5_WRITING,
} as const;

export const UNIT_39_ALL_LESSONS: Exercise[][] = [
  UNIT_39_LESSON_1_GRAMMAR,
  UNIT_39_LESSON_2_GRAMMAR_CONTEXT,
  UNIT_39_LESSON_3_READING,
  UNIT_39_LESSON_4_LISTENING,
  UNIT_39_LESSON_5_WRITING,
];

export const UNIT_39_ALL_EXERCISES: Exercise[] = UNIT_39_ALL_LESSONS.flat();
