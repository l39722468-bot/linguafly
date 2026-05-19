/**
 * Unit 34 lessons index (A1)
 */

import { Exercise } from '@/lib/exercise-generator';
import { UNIT_34_LESSON_1_GRAMMAR } from './unit-34-lesson-1-grammar';
import { UNIT_34_LESSON_2_VOCABULARY } from './unit-34-lesson-2-vocabulary';
import { UNIT_34_LESSON_3_READING } from './unit-34-lesson-3-reading';
import { UNIT_34_LESSON_4_LISTENING } from './unit-34-lesson-4-listening';
import { UNIT_34_LESSON_5_SPEAKING } from './unit-34-lesson-5-speaking';
import { UNIT_34_LESSON_6_WRITING } from './unit-34-lesson-6-writing';

export const UNIT_34_LESSONS = {
  grammar: UNIT_34_LESSON_1_GRAMMAR,
  vocabulary: UNIT_34_LESSON_2_VOCABULARY,
  reading: UNIT_34_LESSON_3_READING,
  listening: UNIT_34_LESSON_4_LISTENING,
  speaking: UNIT_34_LESSON_5_SPEAKING,
  writing: UNIT_34_LESSON_6_WRITING,
} as const;

export const UNIT_34_ALL_LESSONS: Exercise[][] = [
  UNIT_34_LESSON_1_GRAMMAR,
  UNIT_34_LESSON_2_VOCABULARY,
  UNIT_34_LESSON_3_READING,
  UNIT_34_LESSON_4_LISTENING,
  UNIT_34_LESSON_5_SPEAKING,
  UNIT_34_LESSON_6_WRITING,
];

export const UNIT_34_ALL_EXERCISES: Exercise[] = UNIT_34_ALL_LESSONS.flat();
