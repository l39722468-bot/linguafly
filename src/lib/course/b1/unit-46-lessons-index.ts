/**
 * Índice de las 5 lecciones de la Unidad 46 (B1).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_46_LESSON_1_GRAMMAR } from './unit-46-lesson-1-grammar';
import { UNIT_46_LESSON_2_VOCABULARY } from './unit-46-lesson-2-vocabulary';
import { UNIT_46_LESSON_3_READING } from './unit-46-lesson-3-reading';
import { UNIT_46_LESSON_4_LISTENING } from './unit-46-lesson-4-listening';
import { UNIT_46_LESSON_6_WRITING } from './unit-46-lesson-6-writing';

export const UNIT_46_LESSONS = {
  grammar: UNIT_46_LESSON_1_GRAMMAR,
  vocabulary: UNIT_46_LESSON_2_VOCABULARY,
  reading: UNIT_46_LESSON_3_READING,
  listening: UNIT_46_LESSON_4_LISTENING,
  writing: UNIT_46_LESSON_6_WRITING,
} as const;

export const UNIT_46_ALL_LESSONS: Exercise[][] = [
  UNIT_46_LESSON_1_GRAMMAR,
  UNIT_46_LESSON_2_VOCABULARY,
  UNIT_46_LESSON_3_READING,
  UNIT_46_LESSON_4_LISTENING,
  UNIT_46_LESSON_6_WRITING,
];

export const UNIT_46_ALL_EXERCISES: Exercise[] = UNIT_46_ALL_LESSONS.flat();
