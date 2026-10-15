import { NextRequest, NextResponse } from 'next/server';
import { enforceAIRateLimit, synthesizeWorkersAIAudioBase64 } from '@/lib/ai/workers-ai';

export const maxDuration = 30;

const GREETINGS: Record<string, string> = {
  emma: "Hi there! I'm Emma, your English tutor. Before we begin, what would you like to practise: travel, work, everyday conversation, grammar, vocabulary or exams? And what is your English level, from A1 to C2? If you're not sure, just tell me and I'll help you choose.",
  james: "Hello, I'm James. Let's make your English practice useful for you. What would you like to work on: travel, work, everyday conversation, grammar, vocabulary or exams? And what level are you, A1 to C2? It's fine if you don't know yet.",
  sofia: "Hello, I'm Sofia. First, let's personalise your lesson. Which topic interests you: travel, work, everyday conversation, grammar, vocabulary or exam preparation? And what is your English level, from A1 to C2? If you are unsure, I can help you find a good starting point.",
  carlos: "Hey! I'm Carlos, your English buddy. Before we jump in, what sounds fun to practise: travel, work, everyday chat, grammar, vocabulary or exams? And what's your level, A1 to C2? Don't worry if you don't know—I'll help you figure it out!",
};

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
        tutorGender === 'female' ? 'luna' : 'orion',
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
    return NextResponse.json({ error: 'Could not start the tutor. Please try again.' }, { status: 502 });
  }
}
