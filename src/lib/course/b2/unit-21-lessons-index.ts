/**
 * Índice de las 5 lecciones de la Unidad 21 (B2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_21_LESSON_1_GRAMMAR } from './unit-21-lesson-1-grammar';
import { UNIT_21_LESSON_2_VOCABULARY } from './unit-21-lesson-2-vocabulary';
import { UNIT_21_LESSON_3_READING } from './unit-21-lesson-3-reading';
import { UNIT_21_LESSON_4_LISTENING } from './unit-21-lesson-4-listening';
import { UNIT_21_LESSON_6_WRITING } from './unit-21-lesson-6-writing';

export const UNIT_21_LESSONS = {
  grammar: UNIT_21_LESSON_1_GRAMMAR,
  vocabulary: UNIT_21_LESSON_2_VOCABULARY,
  reading: UNIT_21_LESSON_3_READING,
  listening: UNIT_21_LESSON_4_LISTENING,
  writing: UNIT_21_LESSON_6_WRITING,
} as const;

export const UNIT_21_ALL_LESSONS: Exercise[][] = [
  UNIT_21_LESSON_1_GRAMMAR,
  UNIT_21_LESSON_2_VOCABULARY,
  UNIT_21_LESSON_3_READING,
  UNIT_21_LESSON_4_LISTENING,
  UNIT_21_LESSON_6_WRITING,
];

export const UNIT_21_ALL_EXERCISES: Exercise[] = UNIT_21_ALL_LESSONS.flat();
