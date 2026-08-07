/**
 * Índice de las 5 lecciones de la Unidad 26 (B1).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_26_LESSON_1_GRAMMAR } from './unit-26-lesson-1-grammar';
import { UNIT_26_LESSON_2_VOCABULARY } from './unit-26-lesson-2-vocabulary';
import { UNIT_26_LESSON_3_READING } from './unit-26-lesson-3-reading';
import { UNIT_26_LESSON_4_LISTENING } from './unit-26-lesson-4-listening';
import { UNIT_26_LESSON_6_WRITING } from './unit-26-lesson-6-writing';

export const UNIT_26_LESSONS = {
  grammar: UNIT_26_LESSON_1_GRAMMAR,
  vocabulary: UNIT_26_LESSON_2_VOCABULARY,
  reading: UNIT_26_LESSON_3_READING,
  listening: UNIT_26_LESSON_4_LISTENING,
  writing: UNIT_26_LESSON_6_WRITING,
} as const;

export const UNIT_26_ALL_LESSONS: Exercise[][] = [
  UNIT_26_LESSON_1_GRAMMAR,
  UNIT_26_LESSON_2_VOCABULARY,
  UNIT_26_LESSON_3_READING,
  UNIT_26_LESSON_4_LISTENING,
  UNIT_26_LESSON_6_WRITING,
];

export const UNIT_26_ALL_EXERCISES: Exercise[] = UNIT_26_ALL_LESSONS.flat();
