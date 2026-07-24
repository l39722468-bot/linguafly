import type { CourseExercise, ExerciseQuestion } from '../types/exercise';
import { optionLabel } from './bilingual';
import { config } from '../config';

function normalize(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
}

export function getExerciseContent(exercise: CourseExercise) {
  return exercise.content ?? {};
}

export function getQuestions(exercise: CourseExercise): ExerciseQuestion[] {
  const content = getExerciseContent(exercise);
  return content.questions?.length ? content.questions : [];
}

export function getPrimaryQuestion(exercise: CourseExercise): ExerciseQuestion | null {
  const questions = getQuestions(exercise);
  return questions[0] ?? null;
}

export function checkMultipleChoice(q: ExerciseQuestion, selectedIndex: number): boolean {
  const correct = q.correctAnswer ?? q.answer;
  if (correct === undefined || correct === null) return false;

  if (typeof correct === 'number') return correct === selectedIndex;

  const answers = Array.isArray(correct) ? correct : [String(correct)];
  const selected = q.options?.[selectedIndex];
  const selectedText = selected ? optionLabel(selected) : '';

  for (const answer of answers) {
    const answerStr = String(answer).trim();
    if (/^[A-D]$/i.test(answerStr)) {
      const idx = answerStr.toUpperCase().charCodeAt(0) - 65;
      if (idx === selectedIndex) return true;
    }
    if (normalize(answerStr) === normalize(selectedText)) return true;
  }
  return false;
}

export function checkTrueFalse(q: ExerciseQuestion, value: boolean): boolean {
  const correct = q.correctAnswer ?? q.answer;
  if (typeof correct === 'boolean') return correct === value;
  const normalized = String(correct).toLowerCase();
  if (normalized === 'true') return value === true;
  if (normalized === 'false') return value === false;
  return false;
}

export function checkTextAnswer(q: ExerciseQuestion, raw: string): boolean {
  const answer = normalize(raw);
  const correct = q.correctAnswer ?? q.answer;
  const acceptable = q.acceptableAnswers
    ? Array.isArray(q.acceptableAnswers)
      ? q.acceptableAnswers
      : [q.acceptableAnswers]
    : [];

  const candidates = [
    ...(correct !== undefined && correct !== null ? [String(correct)] : []),
    ...acceptable.map(String),
  ].map(normalize);

  return candidates.some((c) => c === answer);
}

export function getAudioUrl(exercise: CourseExercise, question?: ExerciseQuestion | null): string | null {
  const content = getExerciseContent(exercise);
  const url = question?.audioUrl ?? content.audioUrl ?? exercise.audioUrl;
  if (!url) return null;
  if (url.startsWith('http')) return url;
  if (url.startsWith('/')) return `${config.apiUrl}${url}`;
  return `${config.apiUrl}/${url}`;
}
