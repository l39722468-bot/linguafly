/**
 * Índice de las 5 lecciones de la Unidad 27 (C2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_27_LESSON_1_GRAMMAR } from './unit-27-lesson-1-grammar';
import { UNIT_27_LESSON_2_GRAMMAR_CONTEXT } from './unit-27-lesson-2-grammar-context';
import { UNIT_27_LESSON_3_READING } from './unit-27-lesson-3-reading';
import { UNIT_27_LESSON_4_LISTENING } from './unit-27-lesson-4-listening';
import { UNIT_27_LESSON_5_WRITING } from './unit-27-lesson-5-writing';

export const UNIT_27_LESSONS = {
  grammar: UNIT_27_LESSON_1_GRAMMAR,
  grammar_context: UNIT_27_LESSON_2_GRAMMAR_CONTEXT,
  reading: UNIT_27_LESSON_3_READING,
  listening: UNIT_27_LESSON_4_LISTENING,
  writing: UNIT_27_LESSON_5_WRITING,
} as const;

export const UNIT_27_ALL_LESSONS: Exercise[][] = [
  UNIT_27_LESSON_1_GRAMMAR,
  UNIT_27_LESSON_2_GRAMMAR_CONTEXT,
  UNIT_27_LESSON_3_READING,
  UNIT_27_LESSON_4_LISTENING,
  UNIT_27_LESSON_5_WRITING,
];

export const UNIT_27_ALL_EXERCISES: Exercise[] = UNIT_27_ALL_LESSONS.flat();
