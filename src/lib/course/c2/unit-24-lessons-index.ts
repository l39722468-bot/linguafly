/**
 * Índice de las 5 lecciones de la Unidad 24 (C2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_24_LESSON_1_GRAMMAR } from './unit-24-lesson-1-grammar';
import { UNIT_24_LESSON_2_GRAMMAR_CONTEXT } from './unit-24-lesson-2-grammar-context';
import { UNIT_24_LESSON_3_READING } from './unit-24-lesson-3-reading';
import { UNIT_24_LESSON_4_LISTENING } from './unit-24-lesson-4-listening';
import { UNIT_24_LESSON_5_WRITING } from './unit-24-lesson-5-writing';

export const UNIT_24_LESSONS = {
  grammar: UNIT_24_LESSON_1_GRAMMAR,
  grammar_context: UNIT_24_LESSON_2_GRAMMAR_CONTEXT,
  reading: UNIT_24_LESSON_3_READING,
  listening: UNIT_24_LESSON_4_LISTENING,
  writing: UNIT_24_LESSON_5_WRITING,
} as const;

export const UNIT_24_ALL_LESSONS: Exercise[][] = [
  UNIT_24_LESSON_1_GRAMMAR,
  UNIT_24_LESSON_2_GRAMMAR_CONTEXT,
  UNIT_24_LESSON_3_READING,
  UNIT_24_LESSON_4_LISTENING,
  UNIT_24_LESSON_5_WRITING,
];

export const UNIT_24_ALL_EXERCISES: Exercise[] = UNIT_24_ALL_LESSONS.flat();
