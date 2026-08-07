/**
 * Índice de las 5 lecciones de la Unidad 4 (logistica-b2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_4_LESSON_1_GRAMMAR } from './unit-4-lesson-1-grammar';
import { UNIT_4_LESSON_2_VOCABULARY } from './unit-4-lesson-2-vocabulary';
import { UNIT_4_LESSON_3_READING } from './unit-4-lesson-3-reading';
import { UNIT_4_LESSON_4_LISTENING } from './unit-4-lesson-4-listening';
import { UNIT_4_LESSON_6_WRITING } from './unit-4-lesson-6-writing';

export const UNIT_4_LESSONS = {
  grammar: UNIT_4_LESSON_1_GRAMMAR,
  vocabulary: UNIT_4_LESSON_2_VOCABULARY,
  reading: UNIT_4_LESSON_3_READING,
  listening: UNIT_4_LESSON_4_LISTENING,
  writing: UNIT_4_LESSON_6_WRITING,
} as const;

export const UNIT_4_ALL_LESSONS: Exercise[][] = [
  UNIT_4_LESSON_1_GRAMMAR,
  UNIT_4_LESSON_2_VOCABULARY,
  UNIT_4_LESSON_3_READING,
  UNIT_4_LESSON_4_LISTENING,
  UNIT_4_LESSON_6_WRITING,
];

export const UNIT_4_ALL_EXERCISES: Exercise[] = UNIT_4_ALL_LESSONS.flat();
