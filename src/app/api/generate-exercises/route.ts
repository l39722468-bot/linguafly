import { NextRequest, NextResponse } from 'next/server';
import { EXERCISE_TYPE_CATALOG } from '@/lib/exercise-types';
import {
  generateExercisesWithLlama,
  type GenerateExercisesRequest,
} from '@/lib/ai/generate-exercises-llama';

export const maxDuration = 60;

export async function GET() {
  return NextResponse.json({
    success: true,
    message:
      'POST JSON: { level, topic, count?, exerciseTypes?, weakTopics?, focusOn?, pedagogy? } — pedagogy: learningObjectives, spacedRepetitionNotes, emphasizeSpacedRepetition, vocabulary, expressions, grammarFocus, readingComprehension, listeningComprehension, speakingGoals',
    exerciseTypes: EXERCISE_TYPE_CATALOG,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateExercisesRequest = await request.json();
    const result = await generateExercisesWithLlama(body);
    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal error';
    console.error('Generate exercises error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
