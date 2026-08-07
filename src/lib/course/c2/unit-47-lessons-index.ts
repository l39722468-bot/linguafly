/**
 * Índice de las 5 lecciones de la Unidad 47 (C2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_47_LESSON_1_GRAMMAR } from './unit-47-lesson-1-grammar';
import { UNIT_47_LESSON_2_GRAMMAR_CONTEXT } from './unit-47-lesson-2-grammar-context';
import { UNIT_47_LESSON_3_READING } from './unit-47-lesson-3-reading';
import { UNIT_47_LESSON_4_LISTENING } from './unit-47-lesson-4-listening';
import { UNIT_47_LESSON_5_WRITING } from './unit-47-lesson-5-writing';

export const UNIT_47_LESSONS = {
  grammar: UNIT_47_LESSON_1_GRAMMAR,
  grammar_context: UNIT_47_LESSON_2_GRAMMAR_CONTEXT,
  reading: UNIT_47_LESSON_3_READING,
  listening: UNIT_47_LESSON_4_LISTENING,
  writing: UNIT_47_LESSON_5_WRITING,
} as const;

export const UNIT_47_ALL_LESSONS: Exercise[][] = [
  UNIT_47_LESSON_1_GRAMMAR,
  UNIT_47_LESSON_2_GRAMMAR_CONTEXT,
  UNIT_47_LESSON_3_READING,
  UNIT_47_LESSON_4_LISTENING,
  UNIT_47_LESSON_5_WRITING,
];

export const UNIT_47_ALL_EXERCISES: Exercise[] = UNIT_47_ALL_LESSONS.flat();
