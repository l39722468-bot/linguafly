/**
 * Unit 22 lessons index (A1)
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_22_LESSON_1_GRAMMAR } from './unit-22-lesson-1-grammar';
import { UNIT_22_LESSON_2_VOCABULARY } from './unit-22-lesson-2-vocabulary';
import { UNIT_22_LESSON_3_READING } from './unit-22-lesson-3-reading';
import { UNIT_22_LESSON_4_LISTENING } from './unit-22-lesson-4-listening';
import { UNIT_22_LESSON_5_SPEAKING } from './unit-22-lesson-5-speaking';
import { UNIT_22_LESSON_6_WRITING } from './unit-22-lesson-6-writing';

export const UNIT_22_LESSONS = {
  grammar: UNIT_22_LESSON_1_GRAMMAR,
  vocabulary: UNIT_22_LESSON_2_VOCABULARY,
  reading: UNIT_22_LESSON_3_READING,
  listening: UNIT_22_LESSON_4_LISTENING,
  speaking: UNIT_22_LESSON_5_SPEAKING,
  writing: UNIT_22_LESSON_6_WRITING,
} as const;

export const UNIT_22_ALL_LESSONS: Exercise[][] = [
  UNIT_22_LESSON_1_GRAMMAR,
  UNIT_22_LESSON_2_VOCABULARY,
  UNIT_22_LESSON_3_READING,
  UNIT_22_LESSON_4_LISTENING,
  UNIT_22_LESSON_5_SPEAKING,
  UNIT_22_LESSON_6_WRITING,
];

export const UNIT_22_ALL_EXERCISES: Exercise[] = UNIT_22_ALL_LESSONS.flat();
