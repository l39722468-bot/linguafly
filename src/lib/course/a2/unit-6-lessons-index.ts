/**
 * Índice de las 5 lecciones de la Unidad 6 (A2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_6_LESSON_1_GRAMMAR } from './unit-6-lesson-1-grammar';
import { UNIT_6_LESSON_2_VOCABULARY } from './unit-6-lesson-2-vocabulary';
import { UNIT_6_LESSON_3_READING } from './unit-6-lesson-3-reading';
import { UNIT_6_LESSON_4_LISTENING } from './unit-6-lesson-4-listening';
import { UNIT_6_LESSON_6_WRITING } from './unit-6-lesson-6-writing';

export const UNIT_6_LESSONS = {
  grammar: UNIT_6_LESSON_1_GRAMMAR,
  vocabulary: UNIT_6_LESSON_2_VOCABULARY,
  reading: UNIT_6_LESSON_3_READING,
  listening: UNIT_6_LESSON_4_LISTENING,
  writing: UNIT_6_LESSON_6_WRITING,
} as const;

export const UNIT_6_ALL_LESSONS: Exercise[][] = [
  UNIT_6_LESSON_1_GRAMMAR,
  UNIT_6_LESSON_2_VOCABULARY,
  UNIT_6_LESSON_3_READING,
  UNIT_6_LESSON_4_LISTENING,
  UNIT_6_LESSON_6_WRITING,
];

export const UNIT_6_ALL_EXERCISES: Exercise[] = UNIT_6_ALL_LESSONS.flat();
