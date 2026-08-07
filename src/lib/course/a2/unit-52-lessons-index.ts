/**
 * Índice de las 5 lecciones de la Unidad 52 (A2).
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_52_LESSON_1_GRAMMAR } from './unit-52-lesson-1-grammar';
import { UNIT_52_LESSON_2_VOCABULARY } from './unit-52-lesson-2-vocabulary';
import { UNIT_52_LESSON_3_READING } from './unit-52-lesson-3-reading';
import { UNIT_52_LESSON_4_LISTENING } from './unit-52-lesson-4-listening';
import { UNIT_52_LESSON_6_WRITING } from './unit-52-lesson-6-writing';

export const UNIT_52_LESSONS = {
  grammar: UNIT_52_LESSON_1_GRAMMAR,
  vocabulary: UNIT_52_LESSON_2_VOCABULARY,
  reading: UNIT_52_LESSON_3_READING,
  listening: UNIT_52_LESSON_4_LISTENING,
  writing: UNIT_52_LESSON_6_WRITING,
} as const;

export const UNIT_52_ALL_LESSONS: Exercise[][] = [
  UNIT_52_LESSON_1_GRAMMAR,
  UNIT_52_LESSON_2_VOCABULARY,
  UNIT_52_LESSON_3_READING,
  UNIT_52_LESSON_4_LISTENING,
  UNIT_52_LESSON_6_WRITING,
];

export const UNIT_52_ALL_EXERCISES: Exercise[] = UNIT_52_ALL_LESSONS.flat();
