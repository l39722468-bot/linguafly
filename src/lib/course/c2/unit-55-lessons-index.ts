/**
 * Índice de las 5 lecciones de la Unidad 55 (C2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_55_LESSON_1_GRAMMAR } from './unit-55-lesson-1-grammar';
import { UNIT_55_LESSON_2_GRAMMAR_CONTEXT } from './unit-55-lesson-2-grammar-context';
import { UNIT_55_LESSON_3_READING } from './unit-55-lesson-3-reading';
import { UNIT_55_LESSON_4_LISTENING } from './unit-55-lesson-4-listening';
import { UNIT_55_LESSON_5_WRITING } from './unit-55-lesson-5-writing';

export const UNIT_55_LESSONS = {
  grammar: UNIT_55_LESSON_1_GRAMMAR,
  grammar_context: UNIT_55_LESSON_2_GRAMMAR_CONTEXT,
  reading: UNIT_55_LESSON_3_READING,
  listening: UNIT_55_LESSON_4_LISTENING,
  writing: UNIT_55_LESSON_5_WRITING,
} as const;

export const UNIT_55_ALL_LESSONS: Exercise[][] = [
  UNIT_55_LESSON_1_GRAMMAR,
  UNIT_55_LESSON_2_GRAMMAR_CONTEXT,
  UNIT_55_LESSON_3_READING,
  UNIT_55_LESSON_4_LISTENING,
  UNIT_55_LESSON_5_WRITING,
];

export const UNIT_55_ALL_EXERCISES: Exercise[] = UNIT_55_ALL_LESSONS.flat();
