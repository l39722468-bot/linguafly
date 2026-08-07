/**
 * Índice de las 5 lecciones de la Unidad 60 (B2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_60_LESSON_1_GRAMMAR } from './unit-60-lesson-1-grammar';
import { UNIT_60_LESSON_2_VOCABULARY } from './unit-60-lesson-2-vocabulary';
import { UNIT_60_LESSON_3_READING } from './unit-60-lesson-3-reading';
import { UNIT_60_LESSON_4_LISTENING } from './unit-60-lesson-4-listening';
import { UNIT_60_LESSON_6_WRITING } from './unit-60-lesson-6-writing';

export const UNIT_60_LESSONS = {
  grammar: UNIT_60_LESSON_1_GRAMMAR,
  vocabulary: UNIT_60_LESSON_2_VOCABULARY,
  reading: UNIT_60_LESSON_3_READING,
  listening: UNIT_60_LESSON_4_LISTENING,
  writing: UNIT_60_LESSON_6_WRITING,
} as const;

export const UNIT_60_ALL_LESSONS: Exercise[][] = [
  UNIT_60_LESSON_1_GRAMMAR,
  UNIT_60_LESSON_2_VOCABULARY,
  UNIT_60_LESSON_3_READING,
  UNIT_60_LESSON_4_LISTENING,
  UNIT_60_LESSON_6_WRITING,
];

export const UNIT_60_ALL_EXERCISES: Exercise[] = UNIT_60_ALL_LESSONS.flat();
