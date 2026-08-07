/**
 * Índice de las 5 lecciones de la Unidad 19 (B2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_19_LESSON_1_GRAMMAR } from './unit-19-lesson-1-grammar';
import { UNIT_19_LESSON_2_VOCABULARY } from './unit-19-lesson-2-vocabulary';
import { UNIT_19_LESSON_3_READING } from './unit-19-lesson-3-reading';
import { UNIT_19_LESSON_4_LISTENING } from './unit-19-lesson-4-listening';
import { UNIT_19_LESSON_6_WRITING } from './unit-19-lesson-6-writing';

export const UNIT_19_LESSONS = {
  grammar: UNIT_19_LESSON_1_GRAMMAR,
  vocabulary: UNIT_19_LESSON_2_VOCABULARY,
  reading: UNIT_19_LESSON_3_READING,
  listening: UNIT_19_LESSON_4_LISTENING,
  writing: UNIT_19_LESSON_6_WRITING,
} as const;

export const UNIT_19_ALL_LESSONS: Exercise[][] = [
  UNIT_19_LESSON_1_GRAMMAR,
  UNIT_19_LESSON_2_VOCABULARY,
  UNIT_19_LESSON_3_READING,
  UNIT_19_LESSON_4_LISTENING,
  UNIT_19_LESSON_6_WRITING,
];

export const UNIT_19_ALL_EXERCISES: Exercise[] = UNIT_19_ALL_LESSONS.flat();
