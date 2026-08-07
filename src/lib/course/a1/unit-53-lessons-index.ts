/**
 * Índice de las 5 lecciones de la Unidad 53 (A1).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_53_LESSON_1_GRAMMAR } from './unit-53-lesson-1-grammar';
import { UNIT_53_LESSON_2_VOCABULARY } from './unit-53-lesson-2-vocabulary';
import { UNIT_53_LESSON_3_READING } from './unit-53-lesson-3-reading';
import { UNIT_53_LESSON_4_LISTENING } from './unit-53-lesson-4-listening';
import { UNIT_53_LESSON_6_WRITING } from './unit-53-lesson-6-writing';

export const UNIT_53_LESSONS = {
  grammar: UNIT_53_LESSON_1_GRAMMAR,
  vocabulary: UNIT_53_LESSON_2_VOCABULARY,
  reading: UNIT_53_LESSON_3_READING,
  listening: UNIT_53_LESSON_4_LISTENING,
  writing: UNIT_53_LESSON_6_WRITING,
} as const;

export const UNIT_53_ALL_LESSONS: Exercise[][] = [
  UNIT_53_LESSON_1_GRAMMAR,
  UNIT_53_LESSON_2_VOCABULARY,
  UNIT_53_LESSON_3_READING,
  UNIT_53_LESSON_4_LISTENING,
  UNIT_53_LESSON_6_WRITING,
];

export const UNIT_53_ALL_EXERCISES: Exercise[] = UNIT_53_ALL_LESSONS.flat();
