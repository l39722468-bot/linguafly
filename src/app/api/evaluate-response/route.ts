import { NextRequest, NextResponse } from 'next/server';
import { evaluateWithAI } from '@/lib/ai/evaluator';
import { enforceAIRateLimit } from '@/lib/ai/workers-ai';
import type { CEFRLevel } from '@/lib/exercise-types';

const LEVELS = new Set<CEFRLevel>(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']);

export async function POST(request: NextRequest) {
  const rateLimitResponse = await enforceAIRateLimit(request, 'evaluate-response');
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const payload: unknown = await request.json();
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
    }

    const body = payload as Record<string, unknown>;
    const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
    const userResponse = typeof body.userResponse === 'string' ? body.userResponse.trim() : '';
    const level = typeof body.level === 'string' && LEVELS.has(body.level as CEFRLevel)
      ? body.level as CEFRLevel
      : null;
    const type = body.type === 'writing' || body.type === 'speaking' ? body.type : null;

    if (!prompt || !userResponse || !level || !type) {
      return NextResponse.json(
        { success: false, error: 'A valid prompt, user response, CEFR level and exercise type are required.' },
        { status: 400 },
      );
    }

    const evaluation = await evaluateWithAI(prompt, userResponse, level, type);
    return NextResponse.json({ success: true, evaluation });
  } catch (error: unknown) {
    console.error('API Error (evaluate-response):', error instanceof Error ? error.name : 'UnknownError');
    return NextResponse.json(
      { success: false, error: 'Error interno al evaluar la respuesta' },
      { status: 500 },
    );
  }
}
