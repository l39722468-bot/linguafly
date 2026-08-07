/**
 * Índice de las 5 lecciones de la Unidad 54 (recepcionista-a1).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_54_LESSON_1_GRAMMAR } from './unit-54-lesson-1-grammar';
import { UNIT_54_LESSON_2_VOCABULARY } from './unit-54-lesson-2-vocabulary';
import { UNIT_54_LESSON_3_READING } from './unit-54-lesson-3-reading';
import { UNIT_54_LESSON_4_LISTENING } from './unit-54-lesson-4-listening';
import { UNIT_54_LESSON_6_WRITING } from './unit-54-lesson-6-writing';

export const UNIT_54_LESSONS = {
  grammar: UNIT_54_LESSON_1_GRAMMAR,
  vocabulary: UNIT_54_LESSON_2_VOCABULARY,
  reading: UNIT_54_LESSON_3_READING,
  listening: UNIT_54_LESSON_4_LISTENING,
  writing: UNIT_54_LESSON_6_WRITING,
} as const;

export const UNIT_54_ALL_LESSONS: Exercise[][] = [
  UNIT_54_LESSON_1_GRAMMAR,
  UNIT_54_LESSON_2_VOCABULARY,
  UNIT_54_LESSON_3_READING,
  UNIT_54_LESSON_4_LISTENING,
  UNIT_54_LESSON_6_WRITING,
];

export const UNIT_54_ALL_EXERCISES: Exercise[] = UNIT_54_ALL_LESSONS.flat();
