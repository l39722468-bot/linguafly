import { config } from '../config';
import { getAccessToken } from '../supabase';

async function authHeaders(): Promise<HeadersInit> {
  const token = await getAccessToken();
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function evaluateSentenceBuilding(body: {
  userSentence: string;
  targetSentence: string;
  grammarFocus?: string;
  words?: Array<{ text: string; type: string }>;
}) {
  const response = await fetch(`${config.apiUrl}/api/evaluate-sentence-building`, {
    method: 'POST',
    headers: await authHeaders(),
    body: JSON.stringify({
      userSentence: body.userSentence,
      targetSentence: body.targetSentence,
      grammarFocus: body.grammarFocus ?? 'general',
      words: body.words ?? [],
    }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error ?? 'Error al evaluar la frase');
  return payload as { isCorrect: boolean; score: number; feedback: string };
}

export async function evaluateTextAnswer(body: {
  question: string;
  userAnswer: string;
  correctAnswer?: string;
  level?: string;
}) {
  const response = await fetch(`${config.apiUrl}/api/evaluate-text-answer`, {
    method: 'POST',
    headers: await authHeaders(),
    body: JSON.stringify({
      question: body.question,
      userAnswer: body.userAnswer,
      correctAnswer: body.correctAnswer,
      level: body.level ?? 'A1',
      questionType: 'general',
    }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error ?? 'Error al evaluar la respuesta');
  return payload as { isCorrect: boolean; score: number; feedback: string };
}

export async function evaluateSpeaking(body: {
  audioBase64: string;
  prompt: string;
  expectedResponse?: string;
  level?: string;
}) {
  const response = await fetch(`${config.apiUrl}/api/evaluate-speaking`, {
    method: 'POST',
    headers: await authHeaders(),
    body: JSON.stringify(body),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error ?? 'Error al evaluar la pronunciación');
  return payload as {
    overallScore: number;
    feedback: string;
    transcription: string;
  };
}
