/**
 * Índice de las 5 lecciones de la Unidad 29 (C2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_29_LESSON_1_GRAMMAR } from './unit-29-lesson-1-grammar';
import { UNIT_29_LESSON_2_GRAMMAR_CONTEXT } from './unit-29-lesson-2-grammar-context';
import { UNIT_29_LESSON_3_READING } from './unit-29-lesson-3-reading';
import { UNIT_29_LESSON_4_LISTENING } from './unit-29-lesson-4-listening';
import { UNIT_29_LESSON_5_WRITING } from './unit-29-lesson-5-writing';

export const UNIT_29_LESSONS = {
  grammar: UNIT_29_LESSON_1_GRAMMAR,
  grammar_context: UNIT_29_LESSON_2_GRAMMAR_CONTEXT,
  reading: UNIT_29_LESSON_3_READING,
  listening: UNIT_29_LESSON_4_LISTENING,
  writing: UNIT_29_LESSON_5_WRITING,
} as const;

export const UNIT_29_ALL_LESSONS: Exercise[][] = [
  UNIT_29_LESSON_1_GRAMMAR,
  UNIT_29_LESSON_2_GRAMMAR_CONTEXT,
  UNIT_29_LESSON_3_READING,
  UNIT_29_LESSON_4_LISTENING,
  UNIT_29_LESSON_5_WRITING,
];

export const UNIT_29_ALL_EXERCISES: Exercise[] = UNIT_29_ALL_LESSONS.flat();
