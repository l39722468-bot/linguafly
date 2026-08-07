/**
 * Índice de las 5 lecciones de la Unidad 41 (A1).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_41_LESSON_1_GRAMMAR } from './unit-41-lesson-1-grammar';
import { UNIT_41_LESSON_2_VOCABULARY } from './unit-41-lesson-2-vocabulary';
import { UNIT_41_LESSON_3_READING } from './unit-41-lesson-3-reading';
import { UNIT_41_LESSON_4_LISTENING } from './unit-41-lesson-4-listening';
import { UNIT_41_LESSON_6_WRITING } from './unit-41-lesson-6-writing';

export const UNIT_41_LESSONS = {
  grammar: UNIT_41_LESSON_1_GRAMMAR,
  vocabulary: UNIT_41_LESSON_2_VOCABULARY,
  reading: UNIT_41_LESSON_3_READING,
  listening: UNIT_41_LESSON_4_LISTENING,
  writing: UNIT_41_LESSON_6_WRITING,
} as const;

export const UNIT_41_ALL_LESSONS: Exercise[][] = [
  UNIT_41_LESSON_1_GRAMMAR,
  UNIT_41_LESSON_2_VOCABULARY,
  UNIT_41_LESSON_3_READING,
  UNIT_41_LESSON_4_LISTENING,
  UNIT_41_LESSON_6_WRITING,
];

export const UNIT_41_ALL_EXERCISES: Exercise[] = UNIT_41_ALL_LESSONS.flat();
