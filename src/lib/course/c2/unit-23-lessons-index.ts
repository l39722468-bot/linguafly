/**
 * Índice de las 5 lecciones de la Unidad 23 (C2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_23_LESSON_1_GRAMMAR } from './unit-23-lesson-1-grammar';
import { UNIT_23_LESSON_2_GRAMMAR_CONTEXT } from './unit-23-lesson-2-grammar-context';
import { UNIT_23_LESSON_3_READING } from './unit-23-lesson-3-reading';
import { UNIT_23_LESSON_4_LISTENING } from './unit-23-lesson-4-listening';
import { UNIT_23_LESSON_5_WRITING } from './unit-23-lesson-5-writing';

export const UNIT_23_LESSONS = {
  grammar: UNIT_23_LESSON_1_GRAMMAR,
  grammar_context: UNIT_23_LESSON_2_GRAMMAR_CONTEXT,
  reading: UNIT_23_LESSON_3_READING,
  listening: UNIT_23_LESSON_4_LISTENING,
  writing: UNIT_23_LESSON_5_WRITING,
} as const;

export const UNIT_23_ALL_LESSONS: Exercise[][] = [
  UNIT_23_LESSON_1_GRAMMAR,
  UNIT_23_LESSON_2_GRAMMAR_CONTEXT,
  UNIT_23_LESSON_3_READING,
  UNIT_23_LESSON_4_LISTENING,
  UNIT_23_LESSON_5_WRITING,
];

export const UNIT_23_ALL_EXERCISES: Exercise[] = UNIT_23_ALL_LESSONS.flat();
