/**
 * Índice de las 5 lecciones de la Unidad 59 (C2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_59_LESSON_1_GRAMMAR } from './unit-59-lesson-1-grammar';
import { UNIT_59_LESSON_2_GRAMMAR_CONTEXT } from './unit-59-lesson-2-grammar-context';
import { UNIT_59_LESSON_3_READING } from './unit-59-lesson-3-reading';
import { UNIT_59_LESSON_4_LISTENING } from './unit-59-lesson-4-listening';
import { UNIT_59_LESSON_5_WRITING } from './unit-59-lesson-5-writing';

export const UNIT_59_LESSONS = {
  grammar: UNIT_59_LESSON_1_GRAMMAR,
  grammar_context: UNIT_59_LESSON_2_GRAMMAR_CONTEXT,
  reading: UNIT_59_LESSON_3_READING,
  listening: UNIT_59_LESSON_4_LISTENING,
  writing: UNIT_59_LESSON_5_WRITING,
} as const;

export const UNIT_59_ALL_LESSONS: Exercise[][] = [
  UNIT_59_LESSON_1_GRAMMAR,
  UNIT_59_LESSON_2_GRAMMAR_CONTEXT,
  UNIT_59_LESSON_3_READING,
  UNIT_59_LESSON_4_LISTENING,
  UNIT_59_LESSON_5_WRITING,
];

export const UNIT_59_ALL_EXERCISES: Exercise[] = UNIT_59_ALL_LESSONS.flat();
