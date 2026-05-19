/**
 * Unit 14 lessons index (A1)
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_14_LESSON_1_GRAMMAR } from './unit-14-lesson-1-grammar';
import { UNIT_14_LESSON_2_VOCABULARY } from './unit-14-lesson-2-vocabulary';
import { UNIT_14_LESSON_3_READING } from './unit-14-lesson-3-reading';
import { UNIT_14_LESSON_4_LISTENING } from './unit-14-lesson-4-listening';
import { UNIT_14_LESSON_5_SPEAKING } from './unit-14-lesson-5-speaking';
import { UNIT_14_LESSON_6_WRITING } from './unit-14-lesson-6-writing';

export const UNIT_14_LESSONS = {
  grammar: UNIT_14_LESSON_1_GRAMMAR,
  vocabulary: UNIT_14_LESSON_2_VOCABULARY,
  reading: UNIT_14_LESSON_3_READING,
  listening: UNIT_14_LESSON_4_LISTENING,
  speaking: UNIT_14_LESSON_5_SPEAKING,
  writing: UNIT_14_LESSON_6_WRITING,
} as const;

export const UNIT_14_ALL_LESSONS: Exercise[][] = [
  UNIT_14_LESSON_1_GRAMMAR,
  UNIT_14_LESSON_2_VOCABULARY,
  UNIT_14_LESSON_3_READING,
  UNIT_14_LESSON_4_LISTENING,
  UNIT_14_LESSON_5_SPEAKING,
  UNIT_14_LESSON_6_WRITING,
];

export const UNIT_14_ALL_EXERCISES: Exercise[] = UNIT_14_ALL_LESSONS.flat();
