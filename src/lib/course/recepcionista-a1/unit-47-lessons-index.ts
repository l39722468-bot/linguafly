/**
 * Índice de las 5 lecciones de la Unidad 47 (recepcionista-a1).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_47_LESSON_1_GRAMMAR } from './unit-47-lesson-1-grammar';
import { UNIT_47_LESSON_2_VOCABULARY } from './unit-47-lesson-2-vocabulary';
import { UNIT_47_LESSON_3_READING } from './unit-47-lesson-3-reading';
import { UNIT_47_LESSON_4_LISTENING } from './unit-47-lesson-4-listening';
import { UNIT_47_LESSON_6_WRITING } from './unit-47-lesson-6-writing';

export const UNIT_47_LESSONS = {
  grammar: UNIT_47_LESSON_1_GRAMMAR,
  vocabulary: UNIT_47_LESSON_2_VOCABULARY,
  reading: UNIT_47_LESSON_3_READING,
  listening: UNIT_47_LESSON_4_LISTENING,
  writing: UNIT_47_LESSON_6_WRITING,
} as const;

export const UNIT_47_ALL_LESSONS: Exercise[][] = [
  UNIT_47_LESSON_1_GRAMMAR,
  UNIT_47_LESSON_2_VOCABULARY,
  UNIT_47_LESSON_3_READING,
  UNIT_47_LESSON_4_LISTENING,
  UNIT_47_LESSON_6_WRITING,
];

export const UNIT_47_ALL_EXERCISES: Exercise[] = UNIT_47_ALL_LESSONS.flat();
