/**
 * Índice de las 5 lecciones de la Unidad 3 (logistica-b2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_3_LESSON_1_GRAMMAR } from './unit-3-lesson-1-grammar';
import { UNIT_3_LESSON_2_VOCABULARY } from './unit-3-lesson-2-vocabulary';
import { UNIT_3_LESSON_3_READING } from './unit-3-lesson-3-reading';
import { UNIT_3_LESSON_4_LISTENING } from './unit-3-lesson-4-listening';
import { UNIT_3_LESSON_6_WRITING } from './unit-3-lesson-6-writing';

export const UNIT_3_LESSONS = {
  grammar: UNIT_3_LESSON_1_GRAMMAR,
  vocabulary: UNIT_3_LESSON_2_VOCABULARY,
  reading: UNIT_3_LESSON_3_READING,
  listening: UNIT_3_LESSON_4_LISTENING,
  writing: UNIT_3_LESSON_6_WRITING,
} as const;

export const UNIT_3_ALL_LESSONS: Exercise[][] = [
  UNIT_3_LESSON_1_GRAMMAR,
  UNIT_3_LESSON_2_VOCABULARY,
  UNIT_3_LESSON_3_READING,
  UNIT_3_LESSON_4_LISTENING,
  UNIT_3_LESSON_6_WRITING,
];

export const UNIT_3_ALL_EXERCISES: Exercise[] = UNIT_3_ALL_LESSONS.flat();
