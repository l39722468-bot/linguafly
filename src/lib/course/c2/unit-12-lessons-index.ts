/**
 * Índice de las 5 lecciones de la Unidad 12 (C2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_12_LESSON_1_GRAMMAR } from './unit-12-lesson-1-grammar';
import { UNIT_12_LESSON_2_GRAMMAR_CONTEXT } from './unit-12-lesson-2-grammar-context';
import { UNIT_12_LESSON_3_READING } from './unit-12-lesson-3-reading';
import { UNIT_12_LESSON_4_LISTENING } from './unit-12-lesson-4-listening';
import { UNIT_12_LESSON_5_WRITING } from './unit-12-lesson-5-writing';

export const UNIT_12_LESSONS = {
  grammar: UNIT_12_LESSON_1_GRAMMAR,
  grammar_context: UNIT_12_LESSON_2_GRAMMAR_CONTEXT,
  reading: UNIT_12_LESSON_3_READING,
  listening: UNIT_12_LESSON_4_LISTENING,
  writing: UNIT_12_LESSON_5_WRITING,
} as const;

export const UNIT_12_ALL_LESSONS: Exercise[][] = [
  UNIT_12_LESSON_1_GRAMMAR,
  UNIT_12_LESSON_2_GRAMMAR_CONTEXT,
  UNIT_12_LESSON_3_READING,
  UNIT_12_LESSON_4_LISTENING,
  UNIT_12_LESSON_5_WRITING,
];

export const UNIT_12_ALL_EXERCISES: Exercise[] = UNIT_12_ALL_LESSONS.flat();
