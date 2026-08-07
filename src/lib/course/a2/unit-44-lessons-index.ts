/**
 * Índice de las 5 lecciones de la Unidad 44 (A2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_44_LESSON_1_GRAMMAR } from './unit-44-lesson-1-grammar';
import { UNIT_44_LESSON_2_VOCABULARY } from './unit-44-lesson-2-vocabulary';
import { UNIT_44_LESSON_3_READING } from './unit-44-lesson-3-reading';
import { UNIT_44_LESSON_4_LISTENING } from './unit-44-lesson-4-listening';
import { UNIT_44_LESSON_6_WRITING } from './unit-44-lesson-6-writing';

export const UNIT_44_LESSONS = {
  grammar: UNIT_44_LESSON_1_GRAMMAR,
  vocabulary: UNIT_44_LESSON_2_VOCABULARY,
  reading: UNIT_44_LESSON_3_READING,
  listening: UNIT_44_LESSON_4_LISTENING,
  writing: UNIT_44_LESSON_6_WRITING,
} as const;

export const UNIT_44_ALL_LESSONS: Exercise[][] = [
  UNIT_44_LESSON_1_GRAMMAR,
  UNIT_44_LESSON_2_VOCABULARY,
  UNIT_44_LESSON_3_READING,
  UNIT_44_LESSON_4_LISTENING,
  UNIT_44_LESSON_6_WRITING,
];

export const UNIT_44_ALL_EXERCISES: Exercise[] = UNIT_44_ALL_LESSONS.flat();
