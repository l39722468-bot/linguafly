/**
 * Índice de las 5 lecciones de la Unidad 57 (C2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_57_LESSON_1_GRAMMAR } from './unit-57-lesson-1-grammar';
import { UNIT_57_LESSON_2_GRAMMAR_CONTEXT } from './unit-57-lesson-2-grammar-context';
import { UNIT_57_LESSON_3_READING } from './unit-57-lesson-3-reading';
import { UNIT_57_LESSON_4_LISTENING } from './unit-57-lesson-4-listening';
import { UNIT_57_LESSON_5_WRITING } from './unit-57-lesson-5-writing';

export const UNIT_57_LESSONS = {
  grammar: UNIT_57_LESSON_1_GRAMMAR,
  grammar_context: UNIT_57_LESSON_2_GRAMMAR_CONTEXT,
  reading: UNIT_57_LESSON_3_READING,
  listening: UNIT_57_LESSON_4_LISTENING,
  writing: UNIT_57_LESSON_5_WRITING,
} as const;

export const UNIT_57_ALL_LESSONS: Exercise[][] = [
  UNIT_57_LESSON_1_GRAMMAR,
  UNIT_57_LESSON_2_GRAMMAR_CONTEXT,
  UNIT_57_LESSON_3_READING,
  UNIT_57_LESSON_4_LISTENING,
  UNIT_57_LESSON_5_WRITING,
];

export const UNIT_57_ALL_EXERCISES: Exercise[] = UNIT_57_ALL_LESSONS.flat();
