/**
 * Índice de las 5 lecciones de la Unidad 64 (B2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_64_LESSON_1_GRAMMAR } from './unit-64-lesson-1-grammar';
import { UNIT_64_LESSON_2_VOCABULARY } from './unit-64-lesson-2-vocabulary';
import { UNIT_64_LESSON_3_READING } from './unit-64-lesson-3-reading';
import { UNIT_64_LESSON_4_LISTENING } from './unit-64-lesson-4-listening';
import { UNIT_64_LESSON_6_WRITING } from './unit-64-lesson-6-writing';

export const UNIT_64_LESSONS = {
  grammar: UNIT_64_LESSON_1_GRAMMAR,
  vocabulary: UNIT_64_LESSON_2_VOCABULARY,
  reading: UNIT_64_LESSON_3_READING,
  listening: UNIT_64_LESSON_4_LISTENING,
  writing: UNIT_64_LESSON_6_WRITING,
} as const;

export const UNIT_64_ALL_LESSONS: Exercise[][] = [
  UNIT_64_LESSON_1_GRAMMAR,
  UNIT_64_LESSON_2_VOCABULARY,
  UNIT_64_LESSON_3_READING,
  UNIT_64_LESSON_4_LISTENING,
  UNIT_64_LESSON_6_WRITING,
];

export const UNIT_64_ALL_EXERCISES: Exercise[] = UNIT_64_ALL_LESSONS.flat();
