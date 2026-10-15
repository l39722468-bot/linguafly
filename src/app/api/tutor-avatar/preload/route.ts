import { NextRequest, NextResponse } from 'next/server';
import {
  enforceAIRateLimit,
  synthesizeWorkersAIAudioBase64,
  WORKERS_AI_TTS_ENGLISH_MODEL,
  WORKERS_AI_TTS_SPANISH_MODEL,
} from '@/lib/ai/workers-ai';
import { getPreparedTutorResponse } from '@/lib/ai/tutor-response-cache';
import { getOrCreateTutorAudio } from '@/lib/ai/tutor-audio-cache';
import { TUTOR_GREETINGS } from '@/lib/ai/tutor-greetings';

export const maxDuration = 60;

// Keep background warming bounded: the goal is to have the first common lesson
// ready, not to synthesize every article in the blog into audio.
const ALLOWED_INTENTS = new Set([
  'numbers_0_10_examples',
  'greetings_examples',
  'self_introduction_examples',
]);

export async function POST(request: NextRequest) {
  const rateLimitResponse = await enforceAIRateLimit(request, 'tutor-avatar-preload');
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const payload: unknown = await request.json();
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      return NextResponse.json({ error: 'Solicitud de precarga no válida.' }, { status: 400 });
    }

    const body = payload as Record<string, unknown>;
    const tutorId = typeof body.tutorId === 'string' && Object.prototype.hasOwnProperty.call(TUTOR_GREETINGS, body.tutorId)
      ? body.tutorId
      : 'emma';
    const tutorGender = body.tutorGender === 'male' ? 'male' : 'female';
    const intents = Array.isArray(body.intents)
      ? [...new Set(body.intents.filter((value): value is string =>
          typeof value === 'string' && ALLOWED_INTENTS.has(value)))].slice(0, 2)
      : ['numbers_0_10_examples'];

    const speakerEs = tutorGender === 'female' ? 'carina' : 'alvaro';
    const speakerEn = tutorGender === 'female' ? 'pandora' : 'draco';
    const tasks: Promise<string>[] = [
      getOrCreateTutorAudio(
        TUTOR_GREETINGS[tutorId],
        speakerEs,
        WORKERS_AI_TTS_SPANISH_MODEL,
        () => synthesizeWorkersAIAudioBase64(
          TUTOR_GREETINGS[tutorId],
          speakerEs,
          WORKERS_AI_TTS_SPANISH_MODEL,
        ),
      ),
    ];

    const answers = await Promise.all(intents.map((intent) => getPreparedTutorResponse(intent)));
    answers.forEach((answer) => {
      if (answer?.spokenSpanish) {
        tasks.push(getOrCreateTutorAudio(
          answer.spokenSpanish,
          speakerEs,
          WORKERS_AI_TTS_SPANISH_MODEL,
          () => synthesizeWorkersAIAudioBase64(answer.spokenSpanish, speakerEs, WORKERS_AI_TTS_SPANISH_MODEL),
        ));
      }
      if (answer?.pronunciationText) {
        tasks.push(getOrCreateTutorAudio(
          answer.pronunciationText,
          speakerEn,
          WORKERS_AI_TTS_ENGLISH_MODEL,
          () => synthesizeWorkersAIAudioBase64(answer.pronunciationText, speakerEn, WORKERS_AI_TTS_ENGLISH_MODEL),
        ));
      }
    });

    const settled = await Promise.allSettled(tasks);
    const ready = settled.filter((result) => result.status === 'fulfilled').length;

    return NextResponse.json({
      ready,
      requested: tasks.length,
    }, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error: unknown) {
    console.warn(
      'Tutor audio prewarm skipped:',
      error instanceof Error ? error.name : 'UnknownError',
    );
    // Prewarming is best-effort; opening the tutor must never depend on it.
    return NextResponse.json({ ready: 0, requested: 0 }, { status: 200 });
  }
}
