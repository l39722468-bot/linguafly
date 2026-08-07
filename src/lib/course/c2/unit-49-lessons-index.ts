/**
 * Índice de las 5 lecciones de la Unidad 49 (C2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_49_LESSON_1_GRAMMAR } from './unit-49-lesson-1-grammar';
import { UNIT_49_LESSON_2_GRAMMAR_CONTEXT } from './unit-49-lesson-2-grammar-context';
import { UNIT_49_LESSON_3_READING } from './unit-49-lesson-3-reading';
import { UNIT_49_LESSON_4_LISTENING } from './unit-49-lesson-4-listening';
import { UNIT_49_LESSON_5_WRITING } from './unit-49-lesson-5-writing';

export const UNIT_49_LESSONS = {
  grammar: UNIT_49_LESSON_1_GRAMMAR,
  grammar_context: UNIT_49_LESSON_2_GRAMMAR_CONTEXT,
  reading: UNIT_49_LESSON_3_READING,
  listening: UNIT_49_LESSON_4_LISTENING,
  writing: UNIT_49_LESSON_5_WRITING,
} as const;

export const UNIT_49_ALL_LESSONS: Exercise[][] = [
  UNIT_49_LESSON_1_GRAMMAR,
  UNIT_49_LESSON_2_GRAMMAR_CONTEXT,
  UNIT_49_LESSON_3_READING,
  UNIT_49_LESSON_4_LISTENING,
  UNIT_49_LESSON_5_WRITING,
];

export const UNIT_49_ALL_EXERCISES: Exercise[] = UNIT_49_ALL_LESSONS.flat();
