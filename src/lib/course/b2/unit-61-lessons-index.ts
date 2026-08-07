/**
 * Índice de las 5 lecciones de la Unidad 61 (B2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_61_LESSON_1_GRAMMAR } from './unit-61-lesson-1-grammar';
import { UNIT_61_LESSON_2_VOCABULARY } from './unit-61-lesson-2-vocabulary';
import { UNIT_61_LESSON_3_READING } from './unit-61-lesson-3-reading';
import { UNIT_61_LESSON_4_LISTENING } from './unit-61-lesson-4-listening';
import { UNIT_61_LESSON_6_WRITING } from './unit-61-lesson-6-writing';

export const UNIT_61_LESSONS = {
  grammar: UNIT_61_LESSON_1_GRAMMAR,
  vocabulary: UNIT_61_LESSON_2_VOCABULARY,
  reading: UNIT_61_LESSON_3_READING,
  listening: UNIT_61_LESSON_4_LISTENING,
  writing: UNIT_61_LESSON_6_WRITING,
} as const;

export const UNIT_61_ALL_LESSONS: Exercise[][] = [
  UNIT_61_LESSON_1_GRAMMAR,
  UNIT_61_LESSON_2_VOCABULARY,
  UNIT_61_LESSON_3_READING,
  UNIT_61_LESSON_4_LISTENING,
  UNIT_61_LESSON_6_WRITING,
];

export const UNIT_61_ALL_EXERCISES: Exercise[] = UNIT_61_ALL_LESSONS.flat();
