/**
 * Índice de las 5 lecciones de la Unidad 48 (A2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_48_LESSON_1_GRAMMAR } from './unit-48-lesson-1-grammar';
import { UNIT_48_LESSON_2_VOCABULARY } from './unit-48-lesson-2-vocabulary';
import { UNIT_48_LESSON_3_READING } from './unit-48-lesson-3-reading';
import { UNIT_48_LESSON_4_LISTENING } from './unit-48-lesson-4-listening';
import { UNIT_48_LESSON_6_WRITING } from './unit-48-lesson-6-writing';

export const UNIT_48_LESSONS = {
  grammar: UNIT_48_LESSON_1_GRAMMAR,
  vocabulary: UNIT_48_LESSON_2_VOCABULARY,
  reading: UNIT_48_LESSON_3_READING,
  listening: UNIT_48_LESSON_4_LISTENING,
  writing: UNIT_48_LESSON_6_WRITING,
} as const;

export const UNIT_48_ALL_LESSONS: Exercise[][] = [
  UNIT_48_LESSON_1_GRAMMAR,
  UNIT_48_LESSON_2_VOCABULARY,
  UNIT_48_LESSON_3_READING,
  UNIT_48_LESSON_4_LISTENING,
  UNIT_48_LESSON_6_WRITING,
];

export const UNIT_48_ALL_EXERCISES: Exercise[] = UNIT_48_ALL_LESSONS.flat();
