/**
 * Índice de las 5 lecciones de la Unidad 36 (B2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_36_LESSON_1_GRAMMAR } from './unit-36-lesson-1-grammar';
import { UNIT_36_LESSON_2_VOCABULARY } from './unit-36-lesson-2-vocabulary';
import { UNIT_36_LESSON_3_READING } from './unit-36-lesson-3-reading';
import { UNIT_36_LESSON_4_LISTENING } from './unit-36-lesson-4-listening';
import { UNIT_36_LESSON_6_WRITING } from './unit-36-lesson-6-writing';

export const UNIT_36_LESSONS = {
  grammar: UNIT_36_LESSON_1_GRAMMAR,
  vocabulary: UNIT_36_LESSON_2_VOCABULARY,
  reading: UNIT_36_LESSON_3_READING,
  listening: UNIT_36_LESSON_4_LISTENING,
  writing: UNIT_36_LESSON_6_WRITING,
} as const;

export const UNIT_36_ALL_LESSONS: Exercise[][] = [
  UNIT_36_LESSON_1_GRAMMAR,
  UNIT_36_LESSON_2_VOCABULARY,
  UNIT_36_LESSON_3_READING,
  UNIT_36_LESSON_4_LISTENING,
  UNIT_36_LESSON_6_WRITING,
];

export const UNIT_36_ALL_EXERCISES: Exercise[] = UNIT_36_ALL_LESSONS.flat();
