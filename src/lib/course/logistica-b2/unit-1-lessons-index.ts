/**
 * Índice de las 5 lecciones de la Unidad 1 (logistica-b2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_1_LESSON_1_GRAMMAR } from './unit-1-lesson-1-grammar';
import { UNIT_1_LESSON_2_VOCABULARY } from './unit-1-lesson-2-vocabulary';
import { UNIT_1_LESSON_3_READING } from './unit-1-lesson-3-reading';
import { UNIT_1_LESSON_4_LISTENING } from './unit-1-lesson-4-listening';
import { UNIT_1_LESSON_6_WRITING } from './unit-1-lesson-6-writing';

export const UNIT_1_LESSONS = {
  grammar: UNIT_1_LESSON_1_GRAMMAR,
  vocabulary: UNIT_1_LESSON_2_VOCABULARY,
  reading: UNIT_1_LESSON_3_READING,
  listening: UNIT_1_LESSON_4_LISTENING,
  writing: UNIT_1_LESSON_6_WRITING,
} as const;

export const UNIT_1_ALL_LESSONS: Exercise[][] = [
  UNIT_1_LESSON_1_GRAMMAR,
  UNIT_1_LESSON_2_VOCABULARY,
  UNIT_1_LESSON_3_READING,
  UNIT_1_LESSON_4_LISTENING,
  UNIT_1_LESSON_6_WRITING,
];

export const UNIT_1_ALL_EXERCISES: Exercise[] = UNIT_1_ALL_LESSONS.flat();
