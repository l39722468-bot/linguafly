/**
 * Índice de las 5 lecciones de la Unidad 35 (C2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_35_LESSON_1_GRAMMAR } from './unit-35-lesson-1-grammar';
import { UNIT_35_LESSON_2_GRAMMAR_CONTEXT } from './unit-35-lesson-2-grammar-context';
import { UNIT_35_LESSON_3_READING } from './unit-35-lesson-3-reading';
import { UNIT_35_LESSON_4_LISTENING } from './unit-35-lesson-4-listening';
import { UNIT_35_LESSON_5_WRITING } from './unit-35-lesson-5-writing';

export const UNIT_35_LESSONS = {
  grammar: UNIT_35_LESSON_1_GRAMMAR,
  grammar_context: UNIT_35_LESSON_2_GRAMMAR_CONTEXT,
  reading: UNIT_35_LESSON_3_READING,
  listening: UNIT_35_LESSON_4_LISTENING,
  writing: UNIT_35_LESSON_5_WRITING,
} as const;

export const UNIT_35_ALL_LESSONS: Exercise[][] = [
  UNIT_35_LESSON_1_GRAMMAR,
  UNIT_35_LESSON_2_GRAMMAR_CONTEXT,
  UNIT_35_LESSON_3_READING,
  UNIT_35_LESSON_4_LISTENING,
  UNIT_35_LESSON_5_WRITING,
];

export const UNIT_35_ALL_EXERCISES: Exercise[] = UNIT_35_ALL_LESSONS.flat();
