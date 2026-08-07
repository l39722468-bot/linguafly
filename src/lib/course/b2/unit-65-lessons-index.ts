/**
 * Índice de las 5 lecciones de la Unidad 65 (B2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_65_LESSON_1_GRAMMAR } from './unit-65-lesson-1-grammar';
import { UNIT_65_LESSON_2_VOCABULARY } from './unit-65-lesson-2-vocabulary';
import { UNIT_65_LESSON_3_READING } from './unit-65-lesson-3-reading';
import { UNIT_65_LESSON_4_LISTENING } from './unit-65-lesson-4-listening';
import { UNIT_65_LESSON_6_WRITING } from './unit-65-lesson-6-writing';

export const UNIT_65_LESSONS = {
  grammar: UNIT_65_LESSON_1_GRAMMAR,
  vocabulary: UNIT_65_LESSON_2_VOCABULARY,
  reading: UNIT_65_LESSON_3_READING,
  listening: UNIT_65_LESSON_4_LISTENING,
  writing: UNIT_65_LESSON_6_WRITING,
} as const;

export const UNIT_65_ALL_LESSONS: Exercise[][] = [
  UNIT_65_LESSON_1_GRAMMAR,
  UNIT_65_LESSON_2_VOCABULARY,
  UNIT_65_LESSON_3_READING,
  UNIT_65_LESSON_4_LISTENING,
  UNIT_65_LESSON_6_WRITING,
];

export const UNIT_65_ALL_EXERCISES: Exercise[] = UNIT_65_ALL_LESSONS.flat();
