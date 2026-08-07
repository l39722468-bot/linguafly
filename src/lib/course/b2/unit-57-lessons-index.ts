/**
 * Índice de las 5 lecciones de la Unidad 57 (B2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_57_LESSON_1_GRAMMAR } from './unit-57-lesson-1-grammar';
import { UNIT_57_LESSON_2_VOCABULARY } from './unit-57-lesson-2-vocabulary';
import { UNIT_57_LESSON_3_READING } from './unit-57-lesson-3-reading';
import { UNIT_57_LESSON_4_LISTENING } from './unit-57-lesson-4-listening';
import { UNIT_57_LESSON_6_WRITING } from './unit-57-lesson-6-writing';

export const UNIT_57_LESSONS = {
  grammar: UNIT_57_LESSON_1_GRAMMAR,
  vocabulary: UNIT_57_LESSON_2_VOCABULARY,
  reading: UNIT_57_LESSON_3_READING,
  listening: UNIT_57_LESSON_4_LISTENING,
  writing: UNIT_57_LESSON_6_WRITING,
} as const;

export const UNIT_57_ALL_LESSONS: Exercise[][] = [
  UNIT_57_LESSON_1_GRAMMAR,
  UNIT_57_LESSON_2_VOCABULARY,
  UNIT_57_LESSON_3_READING,
  UNIT_57_LESSON_4_LISTENING,
  UNIT_57_LESSON_6_WRITING,
];

export const UNIT_57_ALL_EXERCISES: Exercise[] = UNIT_57_ALL_LESSONS.flat();
