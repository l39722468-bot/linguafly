/**
 * Unit 11 lessons index (A1)
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_11_LESSON_1_GRAMMAR } from './unit-11-lesson-1-grammar';
import { UNIT_11_LESSON_2_VOCABULARY } from './unit-11-lesson-2-vocabulary';
import { UNIT_11_LESSON_3_READING } from './unit-11-lesson-3-reading';
import { UNIT_11_LESSON_4_LISTENING } from './unit-11-lesson-4-listening';
import { UNIT_11_LESSON_5_SPEAKING } from './unit-11-lesson-5-speaking';
import { UNIT_11_LESSON_6_WRITING } from './unit-11-lesson-6-writing';

export const UNIT_11_LESSONS = {
  grammar: UNIT_11_LESSON_1_GRAMMAR,
  vocabulary: UNIT_11_LESSON_2_VOCABULARY,
  reading: UNIT_11_LESSON_3_READING,
  listening: UNIT_11_LESSON_4_LISTENING,
  speaking: UNIT_11_LESSON_5_SPEAKING,
  writing: UNIT_11_LESSON_6_WRITING,
} as const;

export const UNIT_11_ALL_LESSONS: Exercise[][] = [
  UNIT_11_LESSON_1_GRAMMAR,
  UNIT_11_LESSON_2_VOCABULARY,
  UNIT_11_LESSON_3_READING,
  UNIT_11_LESSON_4_LISTENING,
  UNIT_11_LESSON_5_SPEAKING,
  UNIT_11_LESSON_6_WRITING,
];

export const UNIT_11_ALL_EXERCISES: Exercise[] = UNIT_11_ALL_LESSONS.flat();
