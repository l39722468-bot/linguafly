/**
 * Índice de las 5 lecciones de la Unidad 59 (A2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_59_LESSON_1_GRAMMAR } from './unit-59-lesson-1-grammar';
import { UNIT_59_LESSON_2_VOCABULARY } from './unit-59-lesson-2-vocabulary';
import { UNIT_59_LESSON_3_READING } from './unit-59-lesson-3-reading';
import { UNIT_59_LESSON_4_LISTENING } from './unit-59-lesson-4-listening';
import { UNIT_59_LESSON_6_WRITING } from './unit-59-lesson-6-writing';

export const UNIT_59_LESSONS = {
  grammar: UNIT_59_LESSON_1_GRAMMAR,
  vocabulary: UNIT_59_LESSON_2_VOCABULARY,
  reading: UNIT_59_LESSON_3_READING,
  listening: UNIT_59_LESSON_4_LISTENING,
  writing: UNIT_59_LESSON_6_WRITING,
} as const;

export const UNIT_59_ALL_LESSONS: Exercise[][] = [
  UNIT_59_LESSON_1_GRAMMAR,
  UNIT_59_LESSON_2_VOCABULARY,
  UNIT_59_LESSON_3_READING,
  UNIT_59_LESSON_4_LISTENING,
  UNIT_59_LESSON_6_WRITING,
];

export const UNIT_59_ALL_EXERCISES: Exercise[] = UNIT_59_ALL_LESSONS.flat();
