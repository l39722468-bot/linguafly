/**
 * Índice de las 5 lecciones de la Unidad 37 (C2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_37_LESSON_1_GRAMMAR } from './unit-37-lesson-1-grammar';
import { UNIT_37_LESSON_2_GRAMMAR_CONTEXT } from './unit-37-lesson-2-grammar-context';
import { UNIT_37_LESSON_3_READING } from './unit-37-lesson-3-reading';
import { UNIT_37_LESSON_4_LISTENING } from './unit-37-lesson-4-listening';
import { UNIT_37_LESSON_5_WRITING } from './unit-37-lesson-5-writing';

export const UNIT_37_LESSONS = {
  grammar: UNIT_37_LESSON_1_GRAMMAR,
  grammar_context: UNIT_37_LESSON_2_GRAMMAR_CONTEXT,
  reading: UNIT_37_LESSON_3_READING,
  listening: UNIT_37_LESSON_4_LISTENING,
  writing: UNIT_37_LESSON_5_WRITING,
} as const;

export const UNIT_37_ALL_LESSONS: Exercise[][] = [
  UNIT_37_LESSON_1_GRAMMAR,
  UNIT_37_LESSON_2_GRAMMAR_CONTEXT,
  UNIT_37_LESSON_3_READING,
  UNIT_37_LESSON_4_LISTENING,
  UNIT_37_LESSON_5_WRITING,
];

export const UNIT_37_ALL_EXERCISES: Exercise[] = UNIT_37_ALL_LESSONS.flat();
