import { NextRequest, NextResponse } from 'next/server';
import {
  CF_LLAMA_3_2_11B_VISION_INSTRUCT,
  CF_LLAMA_3_3_70B_INSTRUCT_FP8_FAST,
  CF_WHISPER_LARGE_V3_TURBO,
} from '@/lib/ai/cloudflare-workers-ai-models';
import { synthesizeAura2English } from '@/lib/ai/cloudflare-tts';

export const maxDuration = 60;

async function analyzeImageWithVision(
  imageBase64: string,
  accountId: string,
  apiToken: string
): Promise<string> {
  const imageBytes = Array.from(Buffer.from(imageBase64, 'base64'));
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/meta/llama-3.2-11b-vision-instruct`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: 'Describe what you see in this image in detail, in English. Focus on objects, people, actions, setting, and any text visible. Be concise but thorough.',
          },
        ],
        image: imageBytes,
        max_tokens: 300,
      }),
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Vision failed: ${err}`);
  }
  const data = await res.json() as { result?: { response?: string } };
  return data.result?.response?.trim() || 'An image was shared.';
}

const TUTOR_SYSTEM_PROMPTS: Record<string, string> = {
  emma: `You are Emma, a warm and professional English tutor from New York. Speak naturally, like a real teacher having a conversation. Be encouraging but correct mistakes gently.`,
  james: `You are James, a friendly and patient English tutor from London. Use natural British English. Be relaxed, casual, and very encouraging. Make the student feel comfortable.`,
  sofia: `You are Sofia, an experienced English teacher specializing in academic and exam preparation. Be precise, structured, and motivating.`,
  carlos: `You are Carlos, an energetic English tutor who makes learning fun. Use humor appropriately and keep the energy high.`,
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

async function transcribeAudio(audioBuffer: Buffer, accountId: string, apiToken: string): Promise<string> {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${CF_WHISPER_LARGE_V3_TURBO}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/octet-stream',
      },
      body: new Uint8Array(audioBuffer),
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Whisper failed: ${err}`);
  }
  const data = await res.json() as { result?: { text?: string } };
  return data.result?.text?.trim() || '';
}

async function chatWithLlama(
  messages: { role: string; content: string }[],
  accountId: string,
  apiToken: string
): Promise<{ reply: string; feedback: null | { original: string; correction: string; explanation: string } }> {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${CF_LLAMA_3_3_70B_INSTRUCT_FP8_FAST}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages, max_tokens: 400 }),
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Llama failed: ${err}`);
  }
  const data = await res.json() as { result?: { response?: string } };
  const raw = data.result?.response || '';
  const match = raw.match(/\{[\s\S]*\}/);
  if (match) {
    try {
      return JSON.parse(match[0]);
    } catch {
      /* fall through */
    }
  }
  return { reply: raw.trim() || "Sorry, I didn't understand. Could you say that again?", feedback: null };
}

async function textToSpeech(text: string, gender: string, accountId: string, apiToken: string): Promise<Buffer> {
  const speaker = gender === 'female' ? 'luna' : 'orion';
  const { body } = await synthesizeAura2English(text, accountId, apiToken, speaker);
  return Buffer.from(body);
}

export async function POST(request: NextRequest) {
  try {
    const { audioBase64, imageBase64 = null, history = [], tutorId = 'emma', tutorGender = 'female', level = 'B1', topic = 'General conversation' } = await request.json();

    if (!audioBase64) {
      return NextResponse.json({ error: 'audioBase64 is required' }, { status: 400 });
    }

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;

    if (!accountId || !apiToken) {
      return NextResponse.json({ error: 'Cloudflare credentials not configured' }, { status: 500 });
    }

    const audioBuffer = Buffer.from(audioBase64, 'base64');

    if (audioBuffer.byteLength < 3000) {
      return NextResponse.json({ noSpeechDetected: true }, { status: 200 });
    }

    const rawTranscription = await transcribeAudio(audioBuffer, accountId, apiToken);

    const WHISPER_HALLUCINATIONS = new Set([
      '', ' ', '.', '..', '...', 'you', 'you.', 'You.', 'You',
      'Thank you.', 'Thank you', 'thank you', 'thanks', 'Thanks',
      'Bye.', 'bye', 'Bye', 'goodbye', 'Goodbye',
      'Hmm.', 'Hmm', 'hmm', 'Uh', 'uh', 'Um', 'um',
      'music', 'Music', '[music]', '[Music]', '[MUSIC]',
      '[Applause]', '[applause]', '[BLANK_AUDIO]',
    ]);

    const isHallucination = WHISPER_HALLUCINATIONS.has(rawTranscription) || rawTranscription.length < 3;

    if (!rawTranscription || isHallucination) {
      return NextResponse.json({ noSpeechDetected: true }, { status: 200 });
    }

    const transcription = rawTranscription;

    let imageDescription = '';
    if (imageBase64) {
      try {
        imageDescription = await analyzeImageWithVision(imageBase64, accountId, apiToken);
      } catch (e) {
        console.error('Vision analysis failed, continuing without image:', e);
      }
    }

    const systemPrompt = buildSystemPrompt(tutorId, level, topic);
    const userContent = imageDescription
      ? `[The student shared an image. Image description: ${imageDescription}]\n\nStudent said: ${transcription}`
      : transcription;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...history,
      { role: 'user', content: userContent },
    ];

    const { reply, feedback } = await chatWithLlama(messages, accountId, apiToken);

    const audioBuffer2 = await textToSpeech(reply, tutorGender, accountId, apiToken);
    const audioBase64Out = audioBuffer2.toString('base64');

    return NextResponse.json({
      transcription,
      reply,
      feedback,
      audioBase64: audioBase64Out,
    });
  } catch (error: any) {
    console.error('Tutor avatar turn error:', error);
    return NextResponse.json({ error: error.message || 'Internal error' }, { status: 500 });
  }
}
