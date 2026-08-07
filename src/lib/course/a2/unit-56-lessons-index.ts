/**
 * Índice de las 5 lecciones de la Unidad 56 (A2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_56_LESSON_1_GRAMMAR } from './unit-56-lesson-1-grammar';
import { UNIT_56_LESSON_2_VOCABULARY } from './unit-56-lesson-2-vocabulary';
import { UNIT_56_LESSON_3_READING } from './unit-56-lesson-3-reading';
import { UNIT_56_LESSON_4_LISTENING } from './unit-56-lesson-4-listening';
import { UNIT_56_LESSON_6_WRITING } from './unit-56-lesson-6-writing';

export const UNIT_56_LESSONS = {
  grammar: UNIT_56_LESSON_1_GRAMMAR,
  vocabulary: UNIT_56_LESSON_2_VOCABULARY,
  reading: UNIT_56_LESSON_3_READING,
  listening: UNIT_56_LESSON_4_LISTENING,
  writing: UNIT_56_LESSON_6_WRITING,
} as const;

export const UNIT_56_ALL_LESSONS: Exercise[][] = [
  UNIT_56_LESSON_1_GRAMMAR,
  UNIT_56_LESSON_2_VOCABULARY,
  UNIT_56_LESSON_3_READING,
  UNIT_56_LESSON_4_LISTENING,
  UNIT_56_LESSON_6_WRITING,
];

export const UNIT_56_ALL_EXERCISES: Exercise[] = UNIT_56_ALL_LESSONS.flat();
