import { NextRequest, NextResponse } from 'next/server';
import {
  enforceAIRateLimit,
  getWorkersAIBinding,
  runWorkersAIJson,
  synthesizeWorkersAIAudioBase64,
  WORKERS_AI_STT_MODEL,
  type WorkersAIMessage,
} from '@/lib/ai/workers-ai';
import { CF_LLAMA_3_2_11B_VISION_INSTRUCT } from '@/lib/ai/cloudflare-workers-ai-models';

export const maxDuration = 60;

type TutorFeedback = {
  original: string;
  correction: string;
  explanation: string;
};

const TUTOR_SYSTEM_PROMPTS: Record<string, string> = {
  emma: 'You are Emma, a warm and professional English tutor from New York. Speak naturally, like a real teacher having a conversation. Be encouraging but correct mistakes gently.',
  james: 'You are James, a friendly and patient English tutor from London. Use natural British English. Be relaxed, casual, and very encouraging. Make the student feel comfortable.',
  sofia: 'You are Sofia, an experienced English teacher specializing in academic and exam preparation. Be precise, structured, and motivating.',
  carlos: 'You are Carlos, an energetic English tutor who makes learning fun. Use humor appropriately and keep the energy high.',
};

function buildSystemPrompt(tutorId: string, level: string, topic: string): string {
  const base = TUTOR_SYSTEM_PROMPTS[tutorId] || TUTOR_SYSTEM_PROMPTS.emma;
  return `${base}

Student level: ${level}. Current topic: ${topic}.

Rules:
- Keep replies short and conversational (2-4 sentences maximum).
- Always respond in English.
- If the student makes a grammar or vocabulary mistake, correct it gently once.
- Adapt vocabulary complexity to the student's level.
- Ask a follow-up question to keep the conversation going.

Respond ONLY with valid JSON in this exact format:
{
  "reply": "Your response here",
  "feedback": null
}
OR if there is a mistake to correct:
{
  "reply": "Your response here",
  "feedback": {
    "original": "the student phrase with mistake",
    "correction": "the corrected phrase",
    "explanation": "breve explicación en español de por qué es incorrecto"
  }
}`;
}

function getTranscriptionText(result: unknown): string {
  if (typeof result === 'string') return result.trim();
  if (!result || typeof result !== 'object' || Array.isArray(result)) return '';

  const value = result as Record<string, unknown>;
  if (typeof value.text === 'string') return value.text.trim();
  if (typeof value.transcription === 'string') return value.transcription.trim();

  const nested = value.result;
  if (nested && typeof nested === 'object' && !Array.isArray(nested)) {
    const nestedValue = nested as Record<string, unknown>;
    if (typeof nestedValue.text === 'string') return nestedValue.text.trim();
    if (typeof nestedValue.transcription === 'string') return nestedValue.transcription.trim();
  }
  return '';
}

async function transcribeAudio(audioBase64: string): Promise<string> {
  const ai = await getWorkersAIBinding();
  const result = await ai.run(WORKERS_AI_STT_MODEL, {
    audio: audioBase64,
    task: 'transcribe',
    language: 'en',
    condition_on_previous_text: false,
  });
  return getTranscriptionText(result);
}

async function analyzeImageWithVision(imageBase64: string): Promise<string> {
  const ai = await getWorkersAIBinding();
  const image = imageBase64.startsWith('data:')
    ? imageBase64
    : `data:image/jpeg;base64,${imageBase64}`;
  const result = await ai.run(CF_LLAMA_3_2_11B_VISION_INSTRUCT, {
    messages: [{
      role: 'user',
      content: 'Describe what you see in this image in detail, in English. Focus on objects, people, actions, setting, and any text visible. Be concise but thorough.',
    }],
    image,
    max_tokens: 300,
  });

  if (typeof result === 'string') return result.trim() || 'An image was shared.';
  if (!result || typeof result !== 'object' || Array.isArray(result)) return 'An image was shared.';

  const value = result as Record<string, unknown>;
  if (typeof value.response === 'string' && value.response.trim()) return value.response.trim();
  if (typeof value.description === 'string' && value.description.trim()) return value.description.trim();
  const nested = value.result;
  if (nested && typeof nested === 'object' && !Array.isArray(nested)) {
    const nestedValue = nested as Record<string, unknown>;
    if (typeof nestedValue.response === 'string' && nestedValue.response.trim()) return nestedValue.response.trim();
  }
  return 'An image was shared.';
}

async function chatWithTutor(
  messages: WorkersAIMessage[],
): Promise<{ reply: string; feedback: TutorFeedback | null }> {
  const result = await runWorkersAIJson(messages, { temperature: 0.7, maxTokens: 400 });
  const reply = typeof result.reply === 'string' ? result.reply.trim().slice(0, 1800) : '';

  let feedback: TutorFeedback | null = null;
  if (result.feedback && typeof result.feedback === 'object' && !Array.isArray(result.feedback)) {
    const candidate = result.feedback as Record<string, unknown>;
    if (
      typeof candidate.original === 'string' &&
      typeof candidate.correction === 'string' &&
      typeof candidate.explanation === 'string'
    ) {
      feedback = {
        original: candidate.original.slice(0, 300),
        correction: candidate.correction.slice(0, 300),
        explanation: candidate.explanation.slice(0, 500),
      };
    }
  }

  return {
    reply: reply || "Sorry, I didn't understand. Could you say that again?",
    feedback,
  };
}

export async function POST(request: NextRequest) {
  const rateLimitResponse = await enforceAIRateLimit(request, 'tutor-avatar-turn');
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const contentLength = Number(request.headers.get('content-length') || 0);
    if (Number.isFinite(contentLength) && contentLength > 15 * 1024 * 1024) {
      return NextResponse.json({ error: 'Audio/image request must be 15 MB or smaller.' }, { status: 413 });
    }

    const payload: unknown = await request.json();
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const body = payload as Record<string, unknown>;
    const audioBase64 = body.audioBase64;
    const imageBase64 = typeof body.imageBase64 === 'string' ? body.imageBase64 : null;
    const tutorId = typeof body.tutorId === 'string' && Object.prototype.hasOwnProperty.call(TUTOR_SYSTEM_PROMPTS, body.tutorId)
      ? body.tutorId
      : 'emma';
    const tutorGender = body.tutorGender === 'male' ? 'male' : 'female';
    const level = typeof body.level === 'string' ? body.level.slice(0, 32) : 'B1';
    const topic = typeof body.topic === 'string' ? body.topic.slice(0, 100) : 'General conversation';
    const historyInput = Array.isArray(body.history) ? body.history.slice(-16) : [];
    const history: WorkersAIMessage[] = [];
    let historyCharacters = 0;

    for (const item of historyInput) {
      if (!item || typeof item !== 'object' || Array.isArray(item)) continue;
      const row = item as Record<string, unknown>;
      const role = row.role === 'assistant' || row.role === 'ai'
        ? 'assistant'
        : row.role === 'user' ? 'user' : null;
      if (!role || typeof row.content !== 'string') continue;
      const content = row.content.trim().slice(0, 1800);
      if (!content) continue;
      historyCharacters += content.length;
      if (historyCharacters > 10000) {
        return NextResponse.json({ error: 'Conversation history is too long.' }, { status: 413 });
      }
      history.push({ role, content });
    }

    if (typeof audioBase64 !== 'string' || !audioBase64) {
      return NextResponse.json({ error: 'audioBase64 is required' }, { status: 400 });
    }
    if (audioBase64.length > 11 * 1024 * 1024) {
      return NextResponse.json({ error: 'Audio must be 8 MB or smaller.' }, { status: 413 });
    }
    if (imageBase64 !== null && imageBase64.length > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Image must be 4 MB or smaller.' }, { status: 413 });
    }

    const audioBuffer = Buffer.from(audioBase64, 'base64');
    if (audioBuffer.byteLength < 3000) {
      return NextResponse.json({ noSpeechDetected: true }, { status: 200 });
    }

    const rawTranscription = await transcribeAudio(audioBase64);
    const hallucinations = new Set([
      '', ' ', '.', '..', '...', 'you', 'you.', 'You.', 'You',
      'Thank you.', 'Thank you', 'thank you', 'thanks', 'Thanks',
      'Bye.', 'bye', 'Bye', 'goodbye', 'Goodbye',
      'Hmm.', 'Hmm', 'hmm', 'Uh', 'uh', 'Um', 'um',
      'music', 'Music', '[music]', '[Music]', '[MUSIC]',
      '[Applause]', '[applause]', '[BLANK_AUDIO]',
    ]);

    if (!rawTranscription || rawTranscription.length < 3 || hallucinations.has(rawTranscription)) {
      return NextResponse.json({ noSpeechDetected: true }, { status: 200 });
    }

    let imageDescription = '';
    if (imageBase64) {
      try {
        imageDescription = await analyzeImageWithVision(imageBase64);
      } catch (error: unknown) {
        console.error(
          'Tutor image analysis failed:',
          error instanceof Error ? error.name : 'UnknownError',
        );
      }
    }

    const userContent = imageDescription
      ? `[The student shared an image. Image description: ${imageDescription}]\n\nStudent said: ${rawTranscription}`
      : rawTranscription;
    const messages: WorkersAIMessage[] = [
      { role: 'system', content: buildSystemPrompt(tutorId, level, topic) },
      ...history,
      { role: 'user', content: userContent },
    ];

    const { reply, feedback } = await chatWithTutor(messages);
    const audioBase64Out = await synthesizeWorkersAIAudioBase64(
      reply,
      tutorGender === 'female' ? 'luna' : 'orion',
    );

    return NextResponse.json({
      transcription: rawTranscription,
      reply,
      feedback,
      audioBase64: audioBase64Out,
    });
  } catch (error: unknown) {
    console.error(
      'Tutor avatar turn failed:',
      error instanceof Error ? error.name : 'UnknownError',
    );
    return NextResponse.json(
      { error: 'The tutor is temporarily unavailable. Please try again.' },
      { status: 502 },
    );
  }
}
