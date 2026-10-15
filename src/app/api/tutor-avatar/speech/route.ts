import { NextRequest, NextResponse } from 'next/server';
import {
  enforceAIRateLimit,
  synthesizeWorkersAIAudioBase64,
  WORKERS_AI_TTS_ENGLISH_MODEL,
  WORKERS_AI_TTS_SPANISH_MODEL,
} from '@/lib/ai/workers-ai';

export const maxDuration = 45;

type AudioSegment = {
  language: 'es' | 'en';
  text: string;
  audioBase64: string;
};

export async function POST(request: NextRequest) {
  const rateLimitResponse = await enforceAIRateLimit(request, 'tutor-avatar-speech');
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const payload: unknown = await request.json();
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      return NextResponse.json({ error: 'Solicitud de audio no válida.' }, { status: 400 });
    }

    const body = payload as Record<string, unknown>;
    const spokenSpanish = typeof body.spokenSpanish === 'string' ? body.spokenSpanish.trim() : '';
    const pronunciationText = typeof body.pronunciationText === 'string' ? body.pronunciationText.trim() : '';
    const tutorGender = body.tutorGender === 'male' ? 'male' : 'female';

    if (!spokenSpanish && !pronunciationText) {
      return NextResponse.json({ error: 'No hay texto que reproducir.' }, { status: 400 });
    }
    if (spokenSpanish.length > 1800 || pronunciationText.length > 300) {
      return NextResponse.json({ error: 'El texto de audio es demasiado largo.' }, { status: 413 });
    }

    // Generate both languages concurrently. The UI can render the tutor's text
    // before calling this endpoint, so audio generation no longer blocks the answer.
    const tasks: { language: 'es' | 'en'; text: string; promise: Promise<{ language: 'es' | 'en'; text: string; audioBase64: string }> }[] = [];
    if (spokenSpanish) {
      tasks.push({
        language: 'es',
        text: spokenSpanish,
        promise: synthesizeWorkersAIAudioBase64(
          spokenSpanish,
          tutorGender === 'female' ? 'carina' : 'alvaro',
          WORKERS_AI_TTS_SPANISH_MODEL,
        ).then((audioBase64) => ({ language: 'es' as const, text: spokenSpanish, audioBase64 })),
      });
    }
    if (pronunciationText) {
      tasks.push({
        language: 'en',
        text: pronunciationText,
        promise: synthesizeWorkersAIAudioBase64(
          pronunciationText,
          tutorGender === 'female' ? 'athena' : 'draco',
          WORKERS_AI_TTS_ENGLISH_MODEL,
        ).then((audioBase64) => ({ language: 'en' as const, text: pronunciationText, audioBase64 })),
      });
    }

    const settled = await Promise.allSettled(tasks.map((task) => task.promise));
    const segments: AudioSegment[] = [];
    const failedLanguages: string[] = [];
    settled.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value.audioBase64) {
        segments.push(result.value);
      } else {
        failedLanguages.push(tasks[index].language);
        if (result.status === 'rejected') {
          console.error(
            `Tutor ${tasks[index].language} speech synthesis failed:`,
            result.reason instanceof Error
              ? `${result.reason.name}: ${result.reason.message.slice(0, 160)}`
              : 'UnknownError',
          );
        }
        // Include the original text even when model TTS fails so the browser
        // can speak it using its built-in Spanish/English voice as a fallback.
        segments.push({
          language: tasks[index].language,
          text: tasks[index].text,
          audioBase64: '',
        });
      }
    });

    if (segments.length === 0) {
      return NextResponse.json(
        { error: 'No he podido generar el audio. Puedes seguir leyendo la respuesta e intentarlo otra vez.' },
        { status: 502 },
      );
    }

    return NextResponse.json({
      segments,
      partial: failedLanguages.length > 0,
      failedLanguages,
    }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error: unknown) {
    console.error(
      'Tutor speech endpoint failed:',
      error instanceof Error ? `${error.name}: ${error.message.slice(0, 180)}` : 'UnknownError',
    );
    return NextResponse.json(
      { error: 'No he podido preparar el audio. La respuesta escrita sigue disponible.' },
      { status: 502 },
    );
  }
}
