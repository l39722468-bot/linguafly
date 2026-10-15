import { NextRequest, NextResponse } from 'next/server';
import { enforceAIRateLimit } from '@/lib/ai/workers-ai';
import { TUTOR_GREETINGS } from '@/lib/ai/tutor-greetings';

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  const rateLimitResponse = await enforceAIRateLimit(request, 'tutor-avatar-greet');
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const payload: unknown = await request.json();
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const body = payload as Record<string, unknown>;
    const tutorId = typeof body.tutorId === 'string' && Object.prototype.hasOwnProperty.call(TUTOR_GREETINGS, body.tutorId)
      ? body.tutorId
      : 'emma';
    const greeting = TUTOR_GREETINGS[tutorId];

    // Return the greeting text immediately; the client starts TTS in parallel
    // after rendering it, so the user sees the tutor before audio is ready.
    return NextResponse.json({ greeting, speechPending: true });
  } catch (error: unknown) {
    console.error(
      'Tutor greeting request failed:',
      error instanceof Error ? `${error.name}: ${error.message.slice(0, 180)}` : 'UnknownError',
    );
    return NextResponse.json({ error: 'No he podido iniciar el tutor. Inténtalo de nuevo.' }, { status: 502 });
  }
}
