/**
 * Índice de las 5 lecciones de la Unidad 18 (C2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_18_LESSON_1_GRAMMAR } from './unit-18-lesson-1-grammar';
import { UNIT_18_LESSON_2_GRAMMAR_CONTEXT } from './unit-18-lesson-2-grammar-context';
import { UNIT_18_LESSON_3_READING } from './unit-18-lesson-3-reading';
import { UNIT_18_LESSON_4_LISTENING } from './unit-18-lesson-4-listening';
import { UNIT_18_LESSON_5_WRITING } from './unit-18-lesson-5-writing';

export const UNIT_18_LESSONS = {
  grammar: UNIT_18_LESSON_1_GRAMMAR,
  grammar_context: UNIT_18_LESSON_2_GRAMMAR_CONTEXT,
  reading: UNIT_18_LESSON_3_READING,
  listening: UNIT_18_LESSON_4_LISTENING,
  writing: UNIT_18_LESSON_5_WRITING,
} as const;

export const UNIT_18_ALL_LESSONS: Exercise[][] = [
  UNIT_18_LESSON_1_GRAMMAR,
  UNIT_18_LESSON_2_GRAMMAR_CONTEXT,
  UNIT_18_LESSON_3_READING,
  UNIT_18_LESSON_4_LISTENING,
  UNIT_18_LESSON_5_WRITING,
];

export const UNIT_18_ALL_EXERCISES: Exercise[] = UNIT_18_ALL_LESSONS.flat();
