/**
 * Unit 31 lessons index (A1)
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_31_LESSON_1_GRAMMAR } from './unit-31-lesson-1-grammar';
import { UNIT_31_LESSON_2_VOCABULARY } from './unit-31-lesson-2-vocabulary';
import { UNIT_31_LESSON_3_READING } from './unit-31-lesson-3-reading';
import { UNIT_31_LESSON_4_LISTENING } from './unit-31-lesson-4-listening';
import { UNIT_31_LESSON_5_SPEAKING } from './unit-31-lesson-5-speaking';
import { UNIT_31_LESSON_6_WRITING } from './unit-31-lesson-6-writing';

export const UNIT_31_LESSONS = {
  grammar: UNIT_31_LESSON_1_GRAMMAR,
  vocabulary: UNIT_31_LESSON_2_VOCABULARY,
  reading: UNIT_31_LESSON_3_READING,
  listening: UNIT_31_LESSON_4_LISTENING,
  speaking: UNIT_31_LESSON_5_SPEAKING,
  writing: UNIT_31_LESSON_6_WRITING,
} as const;

export const UNIT_31_ALL_LESSONS: Exercise[][] = [
  UNIT_31_LESSON_1_GRAMMAR,
  UNIT_31_LESSON_2_VOCABULARY,
  UNIT_31_LESSON_3_READING,
  UNIT_31_LESSON_4_LISTENING,
  UNIT_31_LESSON_5_SPEAKING,
  UNIT_31_LESSON_6_WRITING,
];

export const UNIT_31_ALL_EXERCISES: Exercise[] = UNIT_31_ALL_LESSONS.flat();
