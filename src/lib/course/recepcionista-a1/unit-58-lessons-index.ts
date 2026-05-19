/**
 * Unit 58 lessons index (A1)
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_58_LESSON_1_GRAMMAR } from './unit-58-lesson-1-grammar';
import { UNIT_58_LESSON_2_VOCABULARY } from './unit-58-lesson-2-vocabulary';
import { UNIT_58_LESSON_3_READING } from './unit-58-lesson-3-reading';
import { UNIT_58_LESSON_4_LISTENING } from './unit-58-lesson-4-listening';
import { UNIT_58_LESSON_5_SPEAKING } from './unit-58-lesson-5-speaking';
import { UNIT_58_LESSON_6_WRITING } from './unit-58-lesson-6-writing';

export const UNIT_58_LESSONS = {
  grammar: UNIT_58_LESSON_1_GRAMMAR,
  vocabulary: UNIT_58_LESSON_2_VOCABULARY,
  reading: UNIT_58_LESSON_3_READING,
  listening: UNIT_58_LESSON_4_LISTENING,
  speaking: UNIT_58_LESSON_5_SPEAKING,
  writing: UNIT_58_LESSON_6_WRITING,
} as const;

export const UNIT_58_ALL_LESSONS: Exercise[][] = [
  UNIT_58_LESSON_1_GRAMMAR,
  UNIT_58_LESSON_2_VOCABULARY,
  UNIT_58_LESSON_3_READING,
  UNIT_58_LESSON_4_LISTENING,
  UNIT_58_LESSON_5_SPEAKING,
  UNIT_58_LESSON_6_WRITING,
];

export const UNIT_58_ALL_EXERCISES: Exercise[] = UNIT_58_ALL_LESSONS.flat();
