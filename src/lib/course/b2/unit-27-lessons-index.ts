/**
 * Índice de las 5 lecciones de la Unidad 27 (B2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_27_LESSON_1_GRAMMAR } from './unit-27-lesson-1-grammar';
import { UNIT_27_LESSON_2_VOCABULARY } from './unit-27-lesson-2-vocabulary';
import { UNIT_27_LESSON_3_READING } from './unit-27-lesson-3-reading';
import { UNIT_27_LESSON_4_LISTENING } from './unit-27-lesson-4-listening';
import { UNIT_27_LESSON_6_WRITING } from './unit-27-lesson-6-writing';

export const UNIT_27_LESSONS = {
  grammar: UNIT_27_LESSON_1_GRAMMAR,
  vocabulary: UNIT_27_LESSON_2_VOCABULARY,
  reading: UNIT_27_LESSON_3_READING,
  listening: UNIT_27_LESSON_4_LISTENING,
  writing: UNIT_27_LESSON_6_WRITING,
} as const;

export const UNIT_27_ALL_LESSONS: Exercise[][] = [
  UNIT_27_LESSON_1_GRAMMAR,
  UNIT_27_LESSON_2_VOCABULARY,
  UNIT_27_LESSON_3_READING,
  UNIT_27_LESSON_4_LISTENING,
  UNIT_27_LESSON_6_WRITING,
];

export const UNIT_27_ALL_EXERCISES: Exercise[] = UNIT_27_ALL_LESSONS.flat();
