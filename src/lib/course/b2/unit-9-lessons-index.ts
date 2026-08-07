/**
 * Índice de las 5 lecciones de la Unidad 9 (B2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_9_LESSON_1_GRAMMAR } from './unit-9-lesson-1-grammar';
import { UNIT_9_LESSON_2_VOCABULARY } from './unit-9-lesson-2-vocabulary';
import { UNIT_9_LESSON_3_READING } from './unit-9-lesson-3-reading';
import { UNIT_9_LESSON_4_LISTENING } from './unit-9-lesson-4-listening';
import { UNIT_9_LESSON_6_WRITING } from './unit-9-lesson-6-writing';

export const UNIT_9_LESSONS = {
  grammar: UNIT_9_LESSON_1_GRAMMAR,
  vocabulary: UNIT_9_LESSON_2_VOCABULARY,
  reading: UNIT_9_LESSON_3_READING,
  listening: UNIT_9_LESSON_4_LISTENING,
  writing: UNIT_9_LESSON_6_WRITING,
} as const;

export const UNIT_9_ALL_LESSONS: Exercise[][] = [
  UNIT_9_LESSON_1_GRAMMAR,
  UNIT_9_LESSON_2_VOCABULARY,
  UNIT_9_LESSON_3_READING,
  UNIT_9_LESSON_4_LISTENING,
  UNIT_9_LESSON_6_WRITING,
];

export const UNIT_9_ALL_EXERCISES: Exercise[] = UNIT_9_ALL_LESSONS.flat();
