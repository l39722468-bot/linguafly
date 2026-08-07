/**
 * Índice de las 5 lecciones de la Unidad 25 (A1).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_25_LESSON_1_GRAMMAR } from './unit-25-lesson-1-grammar';
import { UNIT_25_LESSON_2_VOCABULARY } from './unit-25-lesson-2-vocabulary';
import { UNIT_25_LESSON_3_READING } from './unit-25-lesson-3-reading';
import { UNIT_25_LESSON_4_LISTENING } from './unit-25-lesson-4-listening';
import { UNIT_25_LESSON_6_WRITING } from './unit-25-lesson-6-writing';

export const UNIT_25_LESSONS = {
  grammar: UNIT_25_LESSON_1_GRAMMAR,
  vocabulary: UNIT_25_LESSON_2_VOCABULARY,
  reading: UNIT_25_LESSON_3_READING,
  listening: UNIT_25_LESSON_4_LISTENING,
  writing: UNIT_25_LESSON_6_WRITING,
} as const;

export const UNIT_25_ALL_LESSONS: Exercise[][] = [
  UNIT_25_LESSON_1_GRAMMAR,
  UNIT_25_LESSON_2_VOCABULARY,
  UNIT_25_LESSON_3_READING,
  UNIT_25_LESSON_4_LISTENING,
  UNIT_25_LESSON_6_WRITING,
];

export const UNIT_25_ALL_EXERCISES: Exercise[] = UNIT_25_ALL_LESSONS.flat();
