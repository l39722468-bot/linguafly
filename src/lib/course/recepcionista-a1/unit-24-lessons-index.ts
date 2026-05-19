/**
 * Unit 24 lessons index (A1)
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_24_LESSON_1_GRAMMAR } from './unit-24-lesson-1-grammar';
import { UNIT_24_LESSON_2_VOCABULARY } from './unit-24-lesson-2-vocabulary';
import { UNIT_24_LESSON_3_READING } from './unit-24-lesson-3-reading';
import { UNIT_24_LESSON_4_LISTENING } from './unit-24-lesson-4-listening';
import { UNIT_24_LESSON_5_SPEAKING } from './unit-24-lesson-5-speaking';
import { UNIT_24_LESSON_6_WRITING } from './unit-24-lesson-6-writing';

export const UNIT_24_LESSONS = {
  grammar: UNIT_24_LESSON_1_GRAMMAR,
  vocabulary: UNIT_24_LESSON_2_VOCABULARY,
  reading: UNIT_24_LESSON_3_READING,
  listening: UNIT_24_LESSON_4_LISTENING,
  speaking: UNIT_24_LESSON_5_SPEAKING,
  writing: UNIT_24_LESSON_6_WRITING,
} as const;

export const UNIT_24_ALL_LESSONS: Exercise[][] = [
  UNIT_24_LESSON_1_GRAMMAR,
  UNIT_24_LESSON_2_VOCABULARY,
  UNIT_24_LESSON_3_READING,
  UNIT_24_LESSON_4_LISTENING,
  UNIT_24_LESSON_5_SPEAKING,
  UNIT_24_LESSON_6_WRITING,
];

export const UNIT_24_ALL_EXERCISES: Exercise[] = UNIT_24_ALL_LESSONS.flat();
