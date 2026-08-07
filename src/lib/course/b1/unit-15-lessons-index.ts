/**
 * Índice de las 5 lecciones de la Unidad 15 (B1).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_15_LESSON_1_GRAMMAR } from './unit-15-lesson-1-grammar';
import { UNIT_15_LESSON_2_VOCABULARY } from './unit-15-lesson-2-vocabulary';
import { UNIT_15_LESSON_3_READING } from './unit-15-lesson-3-reading';
import { UNIT_15_LESSON_4_LISTENING } from './unit-15-lesson-4-listening';
import { UNIT_15_LESSON_6_WRITING } from './unit-15-lesson-6-writing';

export const UNIT_15_LESSONS = {
  grammar: UNIT_15_LESSON_1_GRAMMAR,
  vocabulary: UNIT_15_LESSON_2_VOCABULARY,
  reading: UNIT_15_LESSON_3_READING,
  listening: UNIT_15_LESSON_4_LISTENING,
  writing: UNIT_15_LESSON_6_WRITING,
} as const;

export const UNIT_15_ALL_LESSONS: Exercise[][] = [
  UNIT_15_LESSON_1_GRAMMAR,
  UNIT_15_LESSON_2_VOCABULARY,
  UNIT_15_LESSON_3_READING,
  UNIT_15_LESSON_4_LISTENING,
  UNIT_15_LESSON_6_WRITING,
];

export const UNIT_15_ALL_EXERCISES: Exercise[] = UNIT_15_ALL_LESSONS.flat();
