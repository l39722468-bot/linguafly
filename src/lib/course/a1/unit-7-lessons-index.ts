/**
 * Índice de las 5 lecciones de la Unidad 7 (A1).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_7_LESSON_1_GRAMMAR } from './unit-7-lesson-1-grammar';
import { UNIT_7_LESSON_2_VOCABULARY } from './unit-7-lesson-2-vocabulary';
import { UNIT_7_LESSON_3_READING } from './unit-7-lesson-3-reading';
import { UNIT_7_LESSON_4_LISTENING } from './unit-7-lesson-4-listening';
import { UNIT_7_LESSON_6_WRITING } from './unit-7-lesson-6-writing';

export const UNIT_7_LESSONS = {
  grammar: UNIT_7_LESSON_1_GRAMMAR,
  vocabulary: UNIT_7_LESSON_2_VOCABULARY,
  reading: UNIT_7_LESSON_3_READING,
  listening: UNIT_7_LESSON_4_LISTENING,
  writing: UNIT_7_LESSON_6_WRITING,
} as const;

export const UNIT_7_ALL_LESSONS: Exercise[][] = [
  UNIT_7_LESSON_1_GRAMMAR,
  UNIT_7_LESSON_2_VOCABULARY,
  UNIT_7_LESSON_3_READING,
  UNIT_7_LESSON_4_LISTENING,
  UNIT_7_LESSON_6_WRITING,
];

export const UNIT_7_ALL_EXERCISES: Exercise[] = UNIT_7_ALL_LESSONS.flat();
