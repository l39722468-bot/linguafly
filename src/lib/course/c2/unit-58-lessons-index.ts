/**
 * Índice de las 5 lecciones de la Unidad 58 (C2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_58_LESSON_1_GRAMMAR } from './unit-58-lesson-1-grammar';
import { UNIT_58_LESSON_2_GRAMMAR_CONTEXT } from './unit-58-lesson-2-grammar-context';
import { UNIT_58_LESSON_3_READING } from './unit-58-lesson-3-reading';
import { UNIT_58_LESSON_4_LISTENING } from './unit-58-lesson-4-listening';
import { UNIT_58_LESSON_5_WRITING } from './unit-58-lesson-5-writing';

export const UNIT_58_LESSONS = {
  grammar: UNIT_58_LESSON_1_GRAMMAR,
  grammar_context: UNIT_58_LESSON_2_GRAMMAR_CONTEXT,
  reading: UNIT_58_LESSON_3_READING,
  listening: UNIT_58_LESSON_4_LISTENING,
  writing: UNIT_58_LESSON_5_WRITING,
} as const;

export const UNIT_58_ALL_LESSONS: Exercise[][] = [
  UNIT_58_LESSON_1_GRAMMAR,
  UNIT_58_LESSON_2_GRAMMAR_CONTEXT,
  UNIT_58_LESSON_3_READING,
  UNIT_58_LESSON_4_LISTENING,
  UNIT_58_LESSON_5_WRITING,
];

export const UNIT_58_ALL_EXERCISES: Exercise[] = UNIT_58_ALL_LESSONS.flat();
