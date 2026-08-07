/**
 * Índice de las 5 lecciones de la Unidad 38 (C2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_38_LESSON_1_GRAMMAR } from './unit-38-lesson-1-grammar';
import { UNIT_38_LESSON_2_GRAMMAR_CONTEXT } from './unit-38-lesson-2-grammar-context';
import { UNIT_38_LESSON_3_READING } from './unit-38-lesson-3-reading';
import { UNIT_38_LESSON_4_LISTENING } from './unit-38-lesson-4-listening';
import { UNIT_38_LESSON_5_WRITING } from './unit-38-lesson-5-writing';

export const UNIT_38_LESSONS = {
  grammar: UNIT_38_LESSON_1_GRAMMAR,
  grammar_context: UNIT_38_LESSON_2_GRAMMAR_CONTEXT,
  reading: UNIT_38_LESSON_3_READING,
  listening: UNIT_38_LESSON_4_LISTENING,
  writing: UNIT_38_LESSON_5_WRITING,
} as const;

export const UNIT_38_ALL_LESSONS: Exercise[][] = [
  UNIT_38_LESSON_1_GRAMMAR,
  UNIT_38_LESSON_2_GRAMMAR_CONTEXT,
  UNIT_38_LESSON_3_READING,
  UNIT_38_LESSON_4_LISTENING,
  UNIT_38_LESSON_5_WRITING,
];

export const UNIT_38_ALL_EXERCISES: Exercise[] = UNIT_38_ALL_LESSONS.flat();
