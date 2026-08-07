/**
 * Índice de las 5 lecciones de la Unidad 8 (C2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_8_LESSON_1_GRAMMAR } from './unit-8-lesson-1-grammar';
import { UNIT_8_LESSON_2_GRAMMAR_CONTEXT } from './unit-8-lesson-2-grammar-context';
import { UNIT_8_LESSON_3_READING } from './unit-8-lesson-3-reading';
import { UNIT_8_LESSON_4_LISTENING } from './unit-8-lesson-4-listening';
import { UNIT_8_LESSON_5_WRITING } from './unit-8-lesson-5-writing';

export const UNIT_8_LESSONS = {
  grammar: UNIT_8_LESSON_1_GRAMMAR,
  grammar_context: UNIT_8_LESSON_2_GRAMMAR_CONTEXT,
  reading: UNIT_8_LESSON_3_READING,
  listening: UNIT_8_LESSON_4_LISTENING,
  writing: UNIT_8_LESSON_5_WRITING,
} as const;

export const UNIT_8_ALL_LESSONS: Exercise[][] = [
  UNIT_8_LESSON_1_GRAMMAR,
  UNIT_8_LESSON_2_GRAMMAR_CONTEXT,
  UNIT_8_LESSON_3_READING,
  UNIT_8_LESSON_4_LISTENING,
  UNIT_8_LESSON_5_WRITING,
];

export const UNIT_8_ALL_EXERCISES: Exercise[] = UNIT_8_ALL_LESSONS.flat();
