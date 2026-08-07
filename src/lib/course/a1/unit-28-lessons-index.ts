/**
 * Índice de las 5 lecciones de la Unidad 28 (A1).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_28_LESSON_1_GRAMMAR } from './unit-28-lesson-1-grammar';
import { UNIT_28_LESSON_2_VOCABULARY } from './unit-28-lesson-2-vocabulary';
import { UNIT_28_LESSON_3_READING } from './unit-28-lesson-3-reading';
import { UNIT_28_LESSON_4_LISTENING } from './unit-28-lesson-4-listening';
import { UNIT_28_LESSON_6_WRITING } from './unit-28-lesson-6-writing';

export const UNIT_28_LESSONS = {
  grammar: UNIT_28_LESSON_1_GRAMMAR,
  vocabulary: UNIT_28_LESSON_2_VOCABULARY,
  reading: UNIT_28_LESSON_3_READING,
  listening: UNIT_28_LESSON_4_LISTENING,
  writing: UNIT_28_LESSON_6_WRITING,
} as const;

export const UNIT_28_ALL_LESSONS: Exercise[][] = [
  UNIT_28_LESSON_1_GRAMMAR,
  UNIT_28_LESSON_2_VOCABULARY,
  UNIT_28_LESSON_3_READING,
  UNIT_28_LESSON_4_LISTENING,
  UNIT_28_LESSON_6_WRITING,
];

export const UNIT_28_ALL_EXERCISES: Exercise[] = UNIT_28_ALL_LESSONS.flat();
