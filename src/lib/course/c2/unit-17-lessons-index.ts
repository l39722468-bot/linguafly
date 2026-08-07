/**
 * Índice de las 5 lecciones de la Unidad 17 (C2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_17_LESSON_1_GRAMMAR } from './unit-17-lesson-1-grammar';
import { UNIT_17_LESSON_2_GRAMMAR_CONTEXT } from './unit-17-lesson-2-grammar-context';
import { UNIT_17_LESSON_3_READING } from './unit-17-lesson-3-reading';
import { UNIT_17_LESSON_4_LISTENING } from './unit-17-lesson-4-listening';
import { UNIT_17_LESSON_5_WRITING } from './unit-17-lesson-5-writing';

export const UNIT_17_LESSONS = {
  grammar: UNIT_17_LESSON_1_GRAMMAR,
  grammar_context: UNIT_17_LESSON_2_GRAMMAR_CONTEXT,
  reading: UNIT_17_LESSON_3_READING,
  listening: UNIT_17_LESSON_4_LISTENING,
  writing: UNIT_17_LESSON_5_WRITING,
} as const;

export const UNIT_17_ALL_LESSONS: Exercise[][] = [
  UNIT_17_LESSON_1_GRAMMAR,
  UNIT_17_LESSON_2_GRAMMAR_CONTEXT,
  UNIT_17_LESSON_3_READING,
  UNIT_17_LESSON_4_LISTENING,
  UNIT_17_LESSON_5_WRITING,
];

export const UNIT_17_ALL_EXERCISES: Exercise[] = UNIT_17_ALL_LESSONS.flat();
