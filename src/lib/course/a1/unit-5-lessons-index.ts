/**
 * Índice de las 5 lecciones de la Unidad 5 (A1).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_5_LESSON_1_GRAMMAR } from './unit-5-lesson-1-grammar';
import { UNIT_5_LESSON_2_VOCABULARY } from './unit-5-lesson-2-vocabulary';
import { UNIT_5_LESSON_3_READING } from './unit-5-lesson-3-reading';
import { UNIT_5_LESSON_4_LISTENING } from './unit-5-lesson-4-listening';
import { UNIT_5_LESSON_6_WRITING } from './unit-5-lesson-6-writing';

export const UNIT_5_LESSONS = {
  grammar: UNIT_5_LESSON_1_GRAMMAR,
  vocabulary: UNIT_5_LESSON_2_VOCABULARY,
  reading: UNIT_5_LESSON_3_READING,
  listening: UNIT_5_LESSON_4_LISTENING,
  writing: UNIT_5_LESSON_6_WRITING,
} as const;

export const UNIT_5_ALL_LESSONS: Exercise[][] = [
  UNIT_5_LESSON_1_GRAMMAR,
  UNIT_5_LESSON_2_VOCABULARY,
  UNIT_5_LESSON_3_READING,
  UNIT_5_LESSON_4_LISTENING,
  UNIT_5_LESSON_6_WRITING,
];

export const UNIT_5_ALL_EXERCISES: Exercise[] = UNIT_5_ALL_LESSONS.flat();
