/**
 * Unit 39 lessons index (A1)
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_39_LESSON_1_GRAMMAR } from './unit-39-lesson-1-grammar';
import { UNIT_39_LESSON_2_VOCABULARY } from './unit-39-lesson-2-vocabulary';
import { UNIT_39_LESSON_3_READING } from './unit-39-lesson-3-reading';
import { UNIT_39_LESSON_4_LISTENING } from './unit-39-lesson-4-listening';
import { UNIT_39_LESSON_5_SPEAKING } from './unit-39-lesson-5-speaking';
import { UNIT_39_LESSON_6_WRITING } from './unit-39-lesson-6-writing';

export const UNIT_39_LESSONS = {
  grammar: UNIT_39_LESSON_1_GRAMMAR,
  vocabulary: UNIT_39_LESSON_2_VOCABULARY,
  reading: UNIT_39_LESSON_3_READING,
  listening: UNIT_39_LESSON_4_LISTENING,
  speaking: UNIT_39_LESSON_5_SPEAKING,
  writing: UNIT_39_LESSON_6_WRITING,
} as const;

export const UNIT_39_ALL_LESSONS: Exercise[][] = [
  UNIT_39_LESSON_1_GRAMMAR,
  UNIT_39_LESSON_2_VOCABULARY,
  UNIT_39_LESSON_3_READING,
  UNIT_39_LESSON_4_LISTENING,
  UNIT_39_LESSON_5_SPEAKING,
  UNIT_39_LESSON_6_WRITING,
];

export const UNIT_39_ALL_EXERCISES: Exercise[] = UNIT_39_ALL_LESSONS.flat();
