/**
 * Índice de las 5 lecciones de la Unidad 51 (C2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_51_LESSON_1_GRAMMAR } from './unit-51-lesson-1-grammar';
import { UNIT_51_LESSON_2_GRAMMAR_CONTEXT } from './unit-51-lesson-2-grammar-context';
import { UNIT_51_LESSON_3_READING } from './unit-51-lesson-3-reading';
import { UNIT_51_LESSON_4_LISTENING } from './unit-51-lesson-4-listening';
import { UNIT_51_LESSON_5_WRITING } from './unit-51-lesson-5-writing';

export const UNIT_51_LESSONS = {
  grammar: UNIT_51_LESSON_1_GRAMMAR,
  grammar_context: UNIT_51_LESSON_2_GRAMMAR_CONTEXT,
  reading: UNIT_51_LESSON_3_READING,
  listening: UNIT_51_LESSON_4_LISTENING,
  writing: UNIT_51_LESSON_5_WRITING,
} as const;

export const UNIT_51_ALL_LESSONS: Exercise[][] = [
  UNIT_51_LESSON_1_GRAMMAR,
  UNIT_51_LESSON_2_GRAMMAR_CONTEXT,
  UNIT_51_LESSON_3_READING,
  UNIT_51_LESSON_4_LISTENING,
  UNIT_51_LESSON_5_WRITING,
];

export const UNIT_51_ALL_EXERCISES: Exercise[] = UNIT_51_ALL_LESSONS.flat();
