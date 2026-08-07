/**
 * Índice de las 5 lecciones de la Unidad 30 (B1).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_30_LESSON_1_GRAMMAR } from './unit-30-lesson-1-grammar';
import { UNIT_30_LESSON_2_VOCABULARY } from './unit-30-lesson-2-vocabulary';
import { UNIT_30_LESSON_3_READING } from './unit-30-lesson-3-reading';
import { UNIT_30_LESSON_4_LISTENING } from './unit-30-lesson-4-listening';
import { UNIT_30_LESSON_6_WRITING } from './unit-30-lesson-6-writing';

export const UNIT_30_LESSONS = {
  grammar: UNIT_30_LESSON_1_GRAMMAR,
  vocabulary: UNIT_30_LESSON_2_VOCABULARY,
  reading: UNIT_30_LESSON_3_READING,
  listening: UNIT_30_LESSON_4_LISTENING,
  writing: UNIT_30_LESSON_6_WRITING,
} as const;

export const UNIT_30_ALL_LESSONS: Exercise[][] = [
  UNIT_30_LESSON_1_GRAMMAR,
  UNIT_30_LESSON_2_VOCABULARY,
  UNIT_30_LESSON_3_READING,
  UNIT_30_LESSON_4_LISTENING,
  UNIT_30_LESSON_6_WRITING,
];

export const UNIT_30_ALL_EXERCISES: Exercise[] = UNIT_30_ALL_LESSONS.flat();
