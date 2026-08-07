/**
 * Índice de las 5 lecciones de la Unidad 51 (A2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_51_LESSON_1_GRAMMAR } from './unit-51-lesson-1-grammar';
import { UNIT_51_LESSON_2_VOCABULARY } from './unit-51-lesson-2-vocabulary';
import { UNIT_51_LESSON_3_READING } from './unit-51-lesson-3-reading';
import { UNIT_51_LESSON_4_LISTENING } from './unit-51-lesson-4-listening';
import { UNIT_51_LESSON_6_WRITING } from './unit-51-lesson-6-writing';

export const UNIT_51_LESSONS = {
  grammar: UNIT_51_LESSON_1_GRAMMAR,
  vocabulary: UNIT_51_LESSON_2_VOCABULARY,
  reading: UNIT_51_LESSON_3_READING,
  listening: UNIT_51_LESSON_4_LISTENING,
  writing: UNIT_51_LESSON_6_WRITING,
} as const;

export const UNIT_51_ALL_LESSONS: Exercise[][] = [
  UNIT_51_LESSON_1_GRAMMAR,
  UNIT_51_LESSON_2_VOCABULARY,
  UNIT_51_LESSON_3_READING,
  UNIT_51_LESSON_4_LISTENING,
  UNIT_51_LESSON_6_WRITING,
];

export const UNIT_51_ALL_EXERCISES: Exercise[] = UNIT_51_ALL_LESSONS.flat();
