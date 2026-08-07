/**
 * Índice de las 5 lecciones de la Unidad 16 (recepcionista-a1).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_16_LESSON_1_GRAMMAR } from './unit-16-lesson-1-grammar';
import { UNIT_16_LESSON_2_VOCABULARY } from './unit-16-lesson-2-vocabulary';
import { UNIT_16_LESSON_3_READING } from './unit-16-lesson-3-reading';
import { UNIT_16_LESSON_4_LISTENING } from './unit-16-lesson-4-listening';
import { UNIT_16_LESSON_6_WRITING } from './unit-16-lesson-6-writing';

export const UNIT_16_LESSONS = {
  grammar: UNIT_16_LESSON_1_GRAMMAR,
  vocabulary: UNIT_16_LESSON_2_VOCABULARY,
  reading: UNIT_16_LESSON_3_READING,
  listening: UNIT_16_LESSON_4_LISTENING,
  writing: UNIT_16_LESSON_6_WRITING,
} as const;

export const UNIT_16_ALL_LESSONS: Exercise[][] = [
  UNIT_16_LESSON_1_GRAMMAR,
  UNIT_16_LESSON_2_VOCABULARY,
  UNIT_16_LESSON_3_READING,
  UNIT_16_LESSON_4_LISTENING,
  UNIT_16_LESSON_6_WRITING,
];

export const UNIT_16_ALL_EXERCISES: Exercise[] = UNIT_16_ALL_LESSONS.flat();
