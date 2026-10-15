import { NextRequest, NextResponse } from 'next/server';
import { enforceAIRateLimit, synthesizeWorkersAIAudioBase64, WORKERS_AI_TTS_SPANISH_MODEL } from '@/lib/ai/workers-ai';

export const maxDuration = 30;

const GREETINGS: Record<string, string> = {
  emma: "¡Hola! Soy Emma, tu profesora de inglés. Antes de empezar, dime: ¿qué te gustaría practicar: viajes, trabajo, conversación cotidiana, gramática, vocabulario o preparación de exámenes? ¿Y qué nivel tienes, de A1 a C2? Si no lo sabes, no pasa nada: te ayudaré a encontrar un buen punto de partida.",
  james: "¡Hola! Soy James, tu tutor de inglés. Vamos a adaptar la clase a ti. ¿Qué quieres practicar: viajes, trabajo, situaciones del día a día, gramática, vocabulario o exámenes? ¿Qué nivel tienes, de A1 a C2? Si no estás seguro, lo averiguaremos juntos.",
  sofia: "¡Hola! Soy Sofia, tu profesora de inglés. Primero vamos a personalizar tu clase. ¿Qué tema te interesa: viajes, trabajo, conversación cotidiana, gramática, vocabulario o preparación de IELTS y Cambridge? ¿Qué nivel tienes, de A1 a C2? Si no lo sabes, te ayudaré a elegir.",
  carlos: "¡Buenas! Soy Carlos, tu tutor de inglés. Vamos a practicar algo que te sirva de verdad. ¿Qué prefieres: viajes, trabajo, conversación cotidiana, gramática, vocabulario o exámenes? ¿Y qué nivel tienes, de A1 a C2? Si no lo sabes, encontraremos juntos el nivel adecuado.",
}

export async function POST(request: NextRequest) {
  const rateLimitResponse = await enforceAIRateLimit(request, 'tutor-avatar-greet');
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const payload: unknown = await request.json();
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const body = payload as Record<string, unknown>;
    const tutorId = typeof body.tutorId === 'string' && Object.prototype.hasOwnProperty.call(GREETINGS, body.tutorId)
      ? body.tutorId
      : 'emma';
    const tutorGender = body.tutorGender === 'male' ? 'male' : 'female';
    const greeting = GREETINGS[tutorId];

    let audioBase64 = '';
    let audioUnavailable = false;
    try {
      audioBase64 = await synthesizeWorkersAIAudioBase64(
        greeting,
        tutorGender === 'female' ? 'carina' : 'alvaro',
        WORKERS_AI_TTS_SPANISH_MODEL,
      );
    } catch (error: unknown) {
      audioUnavailable = true;
      console.error(
        'Tutor greeting audio failed:',
        error instanceof Error ? `${error.name}: ${error.message.slice(0, 180)}` : 'UnknownError',
      );
    }

    // A TTS outage should not prevent the learner from seeing the welcome
    // and starting a session; the tutor can continue in text if needed.
    return NextResponse.json({ greeting, audioBase64, audioUnavailable });
  } catch (error: unknown) {
    console.error(
      'Tutor greeting request failed:',
      error instanceof Error ? `${error.name}: ${error.message.slice(0, 180)}` : 'UnknownError',
    );
    return NextResponse.json({ error: 'No he podido iniciar el tutor. Inténtalo de nuevo.' }, { status: 502 });
  }
}
