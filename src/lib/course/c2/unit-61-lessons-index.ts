/**
 * Índice de las 5 lecciones de la Unidad 61 (C2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_61_LESSON_1_GRAMMAR } from './unit-61-lesson-1-grammar';
import { UNIT_61_LESSON_2_GRAMMAR_CONTEXT } from './unit-61-lesson-2-grammar-context';
import { UNIT_61_LESSON_3_READING } from './unit-61-lesson-3-reading';
import { UNIT_61_LESSON_4_LISTENING } from './unit-61-lesson-4-listening';
import { UNIT_61_LESSON_5_WRITING } from './unit-61-lesson-5-writing';

export const UNIT_61_LESSONS = {
  grammar: UNIT_61_LESSON_1_GRAMMAR,
  grammar_context: UNIT_61_LESSON_2_GRAMMAR_CONTEXT,
  reading: UNIT_61_LESSON_3_READING,
  listening: UNIT_61_LESSON_4_LISTENING,
  writing: UNIT_61_LESSON_5_WRITING,
} as const;

export const UNIT_61_ALL_LESSONS: Exercise[][] = [
  UNIT_61_LESSON_1_GRAMMAR,
  UNIT_61_LESSON_2_GRAMMAR_CONTEXT,
  UNIT_61_LESSON_3_READING,
  UNIT_61_LESSON_4_LISTENING,
  UNIT_61_LESSON_5_WRITING,
];

export const UNIT_61_ALL_EXERCISES: Exercise[] = UNIT_61_ALL_LESSONS.flat();
