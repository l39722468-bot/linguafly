/**
 * Índice de las 5 lecciones de la Unidad 63 (B2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_63_LESSON_1_GRAMMAR } from './unit-63-lesson-1-grammar';
import { UNIT_63_LESSON_2_VOCABULARY } from './unit-63-lesson-2-vocabulary';
import { UNIT_63_LESSON_3_READING } from './unit-63-lesson-3-reading';
import { UNIT_63_LESSON_4_LISTENING } from './unit-63-lesson-4-listening';
import { UNIT_63_LESSON_6_WRITING } from './unit-63-lesson-6-writing';

export const UNIT_63_LESSONS = {
  grammar: UNIT_63_LESSON_1_GRAMMAR,
  vocabulary: UNIT_63_LESSON_2_VOCABULARY,
  reading: UNIT_63_LESSON_3_READING,
  listening: UNIT_63_LESSON_4_LISTENING,
  writing: UNIT_63_LESSON_6_WRITING,
} as const;

export const UNIT_63_ALL_LESSONS: Exercise[][] = [
  UNIT_63_LESSON_1_GRAMMAR,
  UNIT_63_LESSON_2_VOCABULARY,
  UNIT_63_LESSON_3_READING,
  UNIT_63_LESSON_4_LISTENING,
  UNIT_63_LESSON_6_WRITING,
];

export const UNIT_63_ALL_EXERCISES: Exercise[] = UNIT_63_ALL_LESSONS.flat();
