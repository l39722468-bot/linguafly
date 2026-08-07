/**
 * Índice de las 5 lecciones de la Unidad 12 (B1).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_12_LESSON_1_GRAMMAR } from './unit-12-lesson-1-grammar';
import { UNIT_12_LESSON_2_VOCABULARY } from './unit-12-lesson-2-vocabulary';
import { UNIT_12_LESSON_3_READING } from './unit-12-lesson-3-reading';
import { UNIT_12_LESSON_4_LISTENING } from './unit-12-lesson-4-listening';
import { UNIT_12_LESSON_6_WRITING } from './unit-12-lesson-6-writing';

export const UNIT_12_LESSONS = {
  grammar: UNIT_12_LESSON_1_GRAMMAR,
  vocabulary: UNIT_12_LESSON_2_VOCABULARY,
  reading: UNIT_12_LESSON_3_READING,
  listening: UNIT_12_LESSON_4_LISTENING,
  writing: UNIT_12_LESSON_6_WRITING,
} as const;

export const UNIT_12_ALL_LESSONS: Exercise[][] = [
  UNIT_12_LESSON_1_GRAMMAR,
  UNIT_12_LESSON_2_VOCABULARY,
  UNIT_12_LESSON_3_READING,
  UNIT_12_LESSON_4_LISTENING,
  UNIT_12_LESSON_6_WRITING,
];

export const UNIT_12_ALL_EXERCISES: Exercise[] = UNIT_12_ALL_LESSONS.flat();
