/**
 * Unit 50 lessons index (A1)
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_50_LESSON_1_GRAMMAR } from './unit-50-lesson-1-grammar';
import { UNIT_50_LESSON_2_VOCABULARY } from './unit-50-lesson-2-vocabulary';
import { UNIT_50_LESSON_3_READING } from './unit-50-lesson-3-reading';
import { UNIT_50_LESSON_4_LISTENING } from './unit-50-lesson-4-listening';
import { UNIT_50_LESSON_5_SPEAKING } from './unit-50-lesson-5-speaking';
import { UNIT_50_LESSON_6_WRITING } from './unit-50-lesson-6-writing';

export const UNIT_50_LESSONS = {
  grammar: UNIT_50_LESSON_1_GRAMMAR,
  vocabulary: UNIT_50_LESSON_2_VOCABULARY,
  reading: UNIT_50_LESSON_3_READING,
  listening: UNIT_50_LESSON_4_LISTENING,
  speaking: UNIT_50_LESSON_5_SPEAKING,
  writing: UNIT_50_LESSON_6_WRITING,
} as const;

export const UNIT_50_ALL_LESSONS: Exercise[][] = [
  UNIT_50_LESSON_1_GRAMMAR,
  UNIT_50_LESSON_2_VOCABULARY,
  UNIT_50_LESSON_3_READING,
  UNIT_50_LESSON_4_LISTENING,
  UNIT_50_LESSON_5_SPEAKING,
  UNIT_50_LESSON_6_WRITING,
];

export const UNIT_50_ALL_EXERCISES: Exercise[] = UNIT_50_ALL_LESSONS.flat();
