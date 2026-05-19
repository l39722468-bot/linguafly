/**
 * Unit 29 lessons index (A1)
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_29_LESSON_1_GRAMMAR } from './unit-29-lesson-1-grammar';
import { UNIT_29_LESSON_2_VOCABULARY } from './unit-29-lesson-2-vocabulary';
import { UNIT_29_LESSON_3_READING } from './unit-29-lesson-3-reading';
import { UNIT_29_LESSON_4_LISTENING } from './unit-29-lesson-4-listening';
import { UNIT_29_LESSON_5_SPEAKING } from './unit-29-lesson-5-speaking';
import { UNIT_29_LESSON_6_WRITING } from './unit-29-lesson-6-writing';

export const UNIT_29_LESSONS = {
  grammar: UNIT_29_LESSON_1_GRAMMAR,
  vocabulary: UNIT_29_LESSON_2_VOCABULARY,
  reading: UNIT_29_LESSON_3_READING,
  listening: UNIT_29_LESSON_4_LISTENING,
  speaking: UNIT_29_LESSON_5_SPEAKING,
  writing: UNIT_29_LESSON_6_WRITING,
} as const;

export const UNIT_29_ALL_LESSONS: Exercise[][] = [
  UNIT_29_LESSON_1_GRAMMAR,
  UNIT_29_LESSON_2_VOCABULARY,
  UNIT_29_LESSON_3_READING,
  UNIT_29_LESSON_4_LISTENING,
  UNIT_29_LESSON_5_SPEAKING,
  UNIT_29_LESSON_6_WRITING,
];

export const UNIT_29_ALL_EXERCISES: Exercise[] = UNIT_29_ALL_LESSONS.flat();
