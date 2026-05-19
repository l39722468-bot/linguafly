/**
 * Unit 45 lessons index (A1)
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_45_LESSON_1_GRAMMAR } from './unit-45-lesson-1-grammar';
import { UNIT_45_LESSON_2_VOCABULARY } from './unit-45-lesson-2-vocabulary';
import { UNIT_45_LESSON_3_READING } from './unit-45-lesson-3-reading';
import { UNIT_45_LESSON_4_LISTENING } from './unit-45-lesson-4-listening';
import { UNIT_45_LESSON_5_SPEAKING } from './unit-45-lesson-5-speaking';
import { UNIT_45_LESSON_6_WRITING } from './unit-45-lesson-6-writing';

export const UNIT_45_LESSONS = {
  grammar: UNIT_45_LESSON_1_GRAMMAR,
  vocabulary: UNIT_45_LESSON_2_VOCABULARY,
  reading: UNIT_45_LESSON_3_READING,
  listening: UNIT_45_LESSON_4_LISTENING,
  speaking: UNIT_45_LESSON_5_SPEAKING,
  writing: UNIT_45_LESSON_6_WRITING,
} as const;

export const UNIT_45_ALL_LESSONS: Exercise[][] = [
  UNIT_45_LESSON_1_GRAMMAR,
  UNIT_45_LESSON_2_VOCABULARY,
  UNIT_45_LESSON_3_READING,
  UNIT_45_LESSON_4_LISTENING,
  UNIT_45_LESSON_5_SPEAKING,
  UNIT_45_LESSON_6_WRITING,
];

export const UNIT_45_ALL_EXERCISES: Exercise[] = UNIT_45_ALL_LESSONS.flat();
