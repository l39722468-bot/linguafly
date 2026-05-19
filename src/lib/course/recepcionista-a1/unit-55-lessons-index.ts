/**
 * Unit 55 lessons index (A1)
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_55_LESSON_1_GRAMMAR } from './unit-55-lesson-1-grammar';
import { UNIT_55_LESSON_2_VOCABULARY } from './unit-55-lesson-2-vocabulary';
import { UNIT_55_LESSON_3_READING } from './unit-55-lesson-3-reading';
import { UNIT_55_LESSON_4_LISTENING } from './unit-55-lesson-4-listening';
import { UNIT_55_LESSON_5_SPEAKING } from './unit-55-lesson-5-speaking';
import { UNIT_55_LESSON_6_WRITING } from './unit-55-lesson-6-writing';

export const UNIT_55_LESSONS = {
  grammar: UNIT_55_LESSON_1_GRAMMAR,
  vocabulary: UNIT_55_LESSON_2_VOCABULARY,
  reading: UNIT_55_LESSON_3_READING,
  listening: UNIT_55_LESSON_4_LISTENING,
  speaking: UNIT_55_LESSON_5_SPEAKING,
  writing: UNIT_55_LESSON_6_WRITING,
} as const;

export const UNIT_55_ALL_LESSONS: Exercise[][] = [
  UNIT_55_LESSON_1_GRAMMAR,
  UNIT_55_LESSON_2_VOCABULARY,
  UNIT_55_LESSON_3_READING,
  UNIT_55_LESSON_4_LISTENING,
  UNIT_55_LESSON_5_SPEAKING,
  UNIT_55_LESSON_6_WRITING,
];

export const UNIT_55_ALL_EXERCISES: Exercise[] = UNIT_55_ALL_LESSONS.flat();
