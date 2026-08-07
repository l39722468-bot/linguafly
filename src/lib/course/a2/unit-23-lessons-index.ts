/**
 * Índice de las 5 lecciones de la Unidad 23 (A2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_23_LESSON_1_GRAMMAR } from './unit-23-lesson-1-grammar';
import { UNIT_23_LESSON_2_VOCABULARY } from './unit-23-lesson-2-vocabulary';
import { UNIT_23_LESSON_3_READING } from './unit-23-lesson-3-reading';
import { UNIT_23_LESSON_4_LISTENING } from './unit-23-lesson-4-listening';
import { UNIT_23_LESSON_6_WRITING } from './unit-23-lesson-6-writing';

export const UNIT_23_LESSONS = {
  grammar: UNIT_23_LESSON_1_GRAMMAR,
  vocabulary: UNIT_23_LESSON_2_VOCABULARY,
  reading: UNIT_23_LESSON_3_READING,
  listening: UNIT_23_LESSON_4_LISTENING,
  writing: UNIT_23_LESSON_6_WRITING,
} as const;

export const UNIT_23_ALL_LESSONS: Exercise[][] = [
  UNIT_23_LESSON_1_GRAMMAR,
  UNIT_23_LESSON_2_VOCABULARY,
  UNIT_23_LESSON_3_READING,
  UNIT_23_LESSON_4_LISTENING,
  UNIT_23_LESSON_6_WRITING,
];

export const UNIT_23_ALL_EXERCISES: Exercise[] = UNIT_23_ALL_LESSONS.flat();
