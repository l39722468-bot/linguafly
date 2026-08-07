/**
 * Índice de las 5 lecciones de la Unidad 20 (B2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_20_LESSON_1_GRAMMAR } from './unit-20-lesson-1-grammar';
import { UNIT_20_LESSON_2_VOCABULARY } from './unit-20-lesson-2-vocabulary';
import { UNIT_20_LESSON_3_READING } from './unit-20-lesson-3-reading';
import { UNIT_20_LESSON_4_LISTENING } from './unit-20-lesson-4-listening';
import { UNIT_20_LESSON_6_WRITING } from './unit-20-lesson-6-writing';

export const UNIT_20_LESSONS = {
  grammar: UNIT_20_LESSON_1_GRAMMAR,
  vocabulary: UNIT_20_LESSON_2_VOCABULARY,
  reading: UNIT_20_LESSON_3_READING,
  listening: UNIT_20_LESSON_4_LISTENING,
  writing: UNIT_20_LESSON_6_WRITING,
} as const;

export const UNIT_20_ALL_LESSONS: Exercise[][] = [
  UNIT_20_LESSON_1_GRAMMAR,
  UNIT_20_LESSON_2_VOCABULARY,
  UNIT_20_LESSON_3_READING,
  UNIT_20_LESSON_4_LISTENING,
  UNIT_20_LESSON_6_WRITING,
];

export const UNIT_20_ALL_EXERCISES: Exercise[] = UNIT_20_ALL_LESSONS.flat();
