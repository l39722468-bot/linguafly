/**
 * Unit 40 lessons index (A1)
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_40_LESSON_1_GRAMMAR } from './unit-40-lesson-1-grammar';
import { UNIT_40_LESSON_2_VOCABULARY } from './unit-40-lesson-2-vocabulary';
import { UNIT_40_LESSON_3_READING } from './unit-40-lesson-3-reading';
import { UNIT_40_LESSON_4_LISTENING } from './unit-40-lesson-4-listening';
import { UNIT_40_LESSON_5_SPEAKING } from './unit-40-lesson-5-speaking';
import { UNIT_40_LESSON_6_WRITING } from './unit-40-lesson-6-writing';

export const UNIT_40_LESSONS = {
  grammar: UNIT_40_LESSON_1_GRAMMAR,
  vocabulary: UNIT_40_LESSON_2_VOCABULARY,
  reading: UNIT_40_LESSON_3_READING,
  listening: UNIT_40_LESSON_4_LISTENING,
  speaking: UNIT_40_LESSON_5_SPEAKING,
  writing: UNIT_40_LESSON_6_WRITING,
} as const;

export const UNIT_40_ALL_LESSONS: Exercise[][] = [
  UNIT_40_LESSON_1_GRAMMAR,
  UNIT_40_LESSON_2_VOCABULARY,
  UNIT_40_LESSON_3_READING,
  UNIT_40_LESSON_4_LISTENING,
  UNIT_40_LESSON_5_SPEAKING,
  UNIT_40_LESSON_6_WRITING,
];

export const UNIT_40_ALL_EXERCISES: Exercise[] = UNIT_40_ALL_LESSONS.flat();
