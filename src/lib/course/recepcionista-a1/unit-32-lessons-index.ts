/**
 * Unit 32 lessons index (A1)
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_32_LESSON_1_GRAMMAR } from './unit-32-lesson-1-grammar';
import { UNIT_32_LESSON_2_VOCABULARY } from './unit-32-lesson-2-vocabulary';
import { UNIT_32_LESSON_3_READING } from './unit-32-lesson-3-reading';
import { UNIT_32_LESSON_4_LISTENING } from './unit-32-lesson-4-listening';
import { UNIT_32_LESSON_5_SPEAKING } from './unit-32-lesson-5-speaking';
import { UNIT_32_LESSON_6_WRITING } from './unit-32-lesson-6-writing';

export const UNIT_32_LESSONS = {
  grammar: UNIT_32_LESSON_1_GRAMMAR,
  vocabulary: UNIT_32_LESSON_2_VOCABULARY,
  reading: UNIT_32_LESSON_3_READING,
  listening: UNIT_32_LESSON_4_LISTENING,
  speaking: UNIT_32_LESSON_5_SPEAKING,
  writing: UNIT_32_LESSON_6_WRITING,
} as const;

export const UNIT_32_ALL_LESSONS: Exercise[][] = [
  UNIT_32_LESSON_1_GRAMMAR,
  UNIT_32_LESSON_2_VOCABULARY,
  UNIT_32_LESSON_3_READING,
  UNIT_32_LESSON_4_LISTENING,
  UNIT_32_LESSON_5_SPEAKING,
  UNIT_32_LESSON_6_WRITING,
];

export const UNIT_32_ALL_EXERCISES: Exercise[] = UNIT_32_ALL_LESSONS.flat();
