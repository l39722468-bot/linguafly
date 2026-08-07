/**
 * Índice de las 5 lecciones de la Unidad 17 (B1).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_17_LESSON_1_GRAMMAR } from './unit-17-lesson-1-grammar';
import { UNIT_17_LESSON_2_VOCABULARY } from './unit-17-lesson-2-vocabulary';
import { UNIT_17_LESSON_3_READING } from './unit-17-lesson-3-reading';
import { UNIT_17_LESSON_4_LISTENING } from './unit-17-lesson-4-listening';
import { UNIT_17_LESSON_6_WRITING } from './unit-17-lesson-6-writing';

export const UNIT_17_LESSONS = {
  grammar: UNIT_17_LESSON_1_GRAMMAR,
  vocabulary: UNIT_17_LESSON_2_VOCABULARY,
  reading: UNIT_17_LESSON_3_READING,
  listening: UNIT_17_LESSON_4_LISTENING,
  writing: UNIT_17_LESSON_6_WRITING,
} as const;

export const UNIT_17_ALL_LESSONS: Exercise[][] = [
  UNIT_17_LESSON_1_GRAMMAR,
  UNIT_17_LESSON_2_VOCABULARY,
  UNIT_17_LESSON_3_READING,
  UNIT_17_LESSON_4_LISTENING,
  UNIT_17_LESSON_6_WRITING,
];

export const UNIT_17_ALL_EXERCISES: Exercise[] = UNIT_17_ALL_LESSONS.flat();
