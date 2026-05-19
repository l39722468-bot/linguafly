/**
 * Unit 43 lessons index (A1)
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_43_LESSON_1_GRAMMAR } from './unit-43-lesson-1-grammar';
import { UNIT_43_LESSON_2_VOCABULARY } from './unit-43-lesson-2-vocabulary';
import { UNIT_43_LESSON_3_READING } from './unit-43-lesson-3-reading';
import { UNIT_43_LESSON_4_LISTENING } from './unit-43-lesson-4-listening';
import { UNIT_43_LESSON_5_SPEAKING } from './unit-43-lesson-5-speaking';
import { UNIT_43_LESSON_6_WRITING } from './unit-43-lesson-6-writing';

export const UNIT_43_LESSONS = {
  grammar: UNIT_43_LESSON_1_GRAMMAR,
  vocabulary: UNIT_43_LESSON_2_VOCABULARY,
  reading: UNIT_43_LESSON_3_READING,
  listening: UNIT_43_LESSON_4_LISTENING,
  speaking: UNIT_43_LESSON_5_SPEAKING,
  writing: UNIT_43_LESSON_6_WRITING,
} as const;

export const UNIT_43_ALL_LESSONS: Exercise[][] = [
  UNIT_43_LESSON_1_GRAMMAR,
  UNIT_43_LESSON_2_VOCABULARY,
  UNIT_43_LESSON_3_READING,
  UNIT_43_LESSON_4_LISTENING,
  UNIT_43_LESSON_5_SPEAKING,
  UNIT_43_LESSON_6_WRITING,
];

export const UNIT_43_ALL_EXERCISES: Exercise[] = UNIT_43_ALL_LESSONS.flat();
