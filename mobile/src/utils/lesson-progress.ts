import type { CourseExercise } from '../types/exercise';

const SIX_LESSON_KEYS = [
  'grammar',
  'vocabulary',
  'reading',
  'listening',
  'writing',
  'speaking',
] as const;

function detectLessonSlot(exercise: CourseExercise): number {
  const id = (exercise.id ?? '').trim();
  const mL = id.match(/-l([1-6])-/i);
  if (mL) {
    const n = parseInt(mL[1], 10);
    if (n >= 1 && n <= 6) return n - 1;
  }

  const tn = (exercise.topicName || '').trim().toLowerCase();
  if (tn === 'grammar') return 0;
  if (tn === 'vocabulary') return 1;
  if (tn === 'reading') return 2;
  if (tn === 'listening') return 3;
  if (tn === 'writing') return 4;
  if (tn === 'speaking') return 5;

  const ty = (exercise.type || '').toLowerCase();
  if (ty.includes('reading')) return 2;
  if (ty.includes('listening')) return 3;
  if (ty.includes('writing')) return 4;
  if (ty.includes('speaking') || ty === 'pronunciation') return 5;
  return 0;
}

export function buildLessonKeyCounts(exercises: CourseExercise[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const exercise of exercises) {
    const slot = detectLessonSlot(exercise);
    const key = `lesson-${slot + 1}-${SIX_LESSON_KEYS[slot]}`;
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
}

export function getLessonKeyForExercise(exercise: CourseExercise): string {
  const slot = detectLessonSlot(exercise);
  return `lesson-${slot + 1}-${SIX_LESSON_KEYS[slot]}`;
}

export const LESSON_LABELS_ES: Record<string, string> = {
  grammar: 'Gramática',
  vocabulary: 'Vocabulario',
  reading: 'Lectura',
  listening: 'Escucha',
  writing: 'Escritura',
  speaking: 'Oral',
};

export function getLessonLabel(exercise: CourseExercise): string {
  const slot = detectLessonSlot(exercise);
  return LESSON_LABELS_ES[SIX_LESSON_KEYS[slot]] ?? 'Práctica';
}
