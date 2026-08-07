/**
 * Índice de las 5 lecciones de la Unidad 13 (B1).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_13_LESSON_1_GRAMMAR } from './unit-13-lesson-1-grammar';
import { UNIT_13_LESSON_2_VOCABULARY } from './unit-13-lesson-2-vocabulary';
import { UNIT_13_LESSON_3_READING } from './unit-13-lesson-3-reading';
import { UNIT_13_LESSON_4_LISTENING } from './unit-13-lesson-4-listening';
import { UNIT_13_LESSON_6_WRITING } from './unit-13-lesson-6-writing';

export const UNIT_13_LESSONS = {
  grammar: UNIT_13_LESSON_1_GRAMMAR,
  vocabulary: UNIT_13_LESSON_2_VOCABULARY,
  reading: UNIT_13_LESSON_3_READING,
  listening: UNIT_13_LESSON_4_LISTENING,
  writing: UNIT_13_LESSON_6_WRITING,
} as const;

export const UNIT_13_ALL_LESSONS: Exercise[][] = [
  UNIT_13_LESSON_1_GRAMMAR,
  UNIT_13_LESSON_2_VOCABULARY,
  UNIT_13_LESSON_3_READING,
  UNIT_13_LESSON_4_LISTENING,
  UNIT_13_LESSON_6_WRITING,
];

export const UNIT_13_ALL_EXERCISES: Exercise[] = UNIT_13_ALL_LESSONS.flat();
