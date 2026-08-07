/**
 * Índice de las 5 lecciones de la Unidad 42 (recepcionista-a1).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_42_LESSON_1_GRAMMAR } from './unit-42-lesson-1-grammar';
import { UNIT_42_LESSON_2_VOCABULARY } from './unit-42-lesson-2-vocabulary';
import { UNIT_42_LESSON_3_READING } from './unit-42-lesson-3-reading';
import { UNIT_42_LESSON_4_LISTENING } from './unit-42-lesson-4-listening';
import { UNIT_42_LESSON_6_WRITING } from './unit-42-lesson-6-writing';

export const UNIT_42_LESSONS = {
  grammar: UNIT_42_LESSON_1_GRAMMAR,
  vocabulary: UNIT_42_LESSON_2_VOCABULARY,
  reading: UNIT_42_LESSON_3_READING,
  listening: UNIT_42_LESSON_4_LISTENING,
  writing: UNIT_42_LESSON_6_WRITING,
} as const;

export const UNIT_42_ALL_LESSONS: Exercise[][] = [
  UNIT_42_LESSON_1_GRAMMAR,
  UNIT_42_LESSON_2_VOCABULARY,
  UNIT_42_LESSON_3_READING,
  UNIT_42_LESSON_4_LISTENING,
  UNIT_42_LESSON_6_WRITING,
];

export const UNIT_42_ALL_EXERCISES: Exercise[] = UNIT_42_ALL_LESSONS.flat();
