import { NextRequest, NextResponse } from 'next/server';
import {
  CF_LLAMA_3_3_70B_INSTRUCT_FP8_FAST,
  CF_WHISPER_LARGE_V3_TURBO,
} from '@/lib/ai/cloudflare-workers-ai-models';
import { getMobileAuth } from '@/lib/api/mobile-auth';
import { resolveEntitlements } from '@/lib/access/entitlements';
import { getUserProfileByAuthId } from '@/lib/access/user-profile';

export const maxDuration = 60;

export interface SpeakingEvaluationRequest {
  audioBase64: string;
  prompt: string;
  expectedResponse?: string;
  targetWords?: string[];
  level?: string;
}

export interface SpeakingEvaluationResponse {
  transcription: string;
  pronunciationScore: number;
  fluencyScore: number;
  grammarScore: number;
  vocabularyScore: number;
  overallScore: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
  detectedWords: string[];
  missedWords: string[];
}

export async function POST(request: NextRequest) {
  try {
    const { supabase, user } = await getMobileAuth(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const profile = await getUserProfileByAuthId<{
      subscription_status?: string;
      subscription_plan?: string;
    }>(supabase, user.id, 'subscription_status, subscription_plan');

    const entitlements = resolveEntitlements({
      subscriptionStatus: profile?.subscription_status,
      subscriptionPlan: profile?.subscription_plan,
    });

    // Premium: acceso completo. Basic: acceso limitado (este endpoint). Free/inactive: bloqueado.
    if (!entitlements.aiSpeakingFull && !entitlements.aiSpeakingLimited) {
      return NextResponse.json(
        { error: 'Speaking con IA requiere una suscripción activa.' },
        { status: 402 }
      );
    }

    const body: SpeakingEvaluationRequest = await request.json();

    const {
      audioBase64,
      prompt,
      expectedResponse,
      targetWords = [],
      level = 'A1',
    } = body;

    if (!audioBase64 || !prompt) {
      return NextResponse.json(
        { error: 'Missing required fields: audioBase64 and prompt' },
        { status: 400 }
      );
    }

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;

    if (!accountId || !apiToken) {
      return NextResponse.json(
        { error: 'Cloudflare credentials not configured' },
        { status: 500 }
      );
    }

    const audioBuffer = Buffer.from(audioBase64, 'base64');

    if (audioBuffer.byteLength < 3000) {
      return NextResponse.json(
        { noSpeechDetected: true, transcription: '', overallScore: 0, feedback: 'No se detectó audio. Asegúrate de hablar cerca del micrófono e inténtalo de nuevo.' },
        { status: 200 }
      );
    }

    const whisperResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${CF_WHISPER_LARGE_V3_TURBO}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/octet-stream',
        },
        body: audioBuffer,
      }
    );

    if (!whisperResponse.ok) {
      const err = await whisperResponse.text();
      console.error('Whisper error:', err);
      return NextResponse.json({ error: 'Transcription failed' }, { status: 500 });
    }

    const whisperResult = await whisperResponse.json() as { result?: { text?: string } };
    const rawTranscription: string = whisperResult.result?.text?.trim() || '';

    const WHISPER_HALLUCINATIONS = new Set([
      '', ' ', '.', '..', '...', 'you', 'you.', 'You.', 'You',
      'Thank you.', 'Thank you', 'thank you', 'thanks', 'Thanks',
      'Bye.', 'bye', 'Bye', 'goodbye', 'Goodbye',
      'Hmm.', 'Hmm', 'hmm', 'Uh', 'uh', 'Um', 'um',
      'music', 'Music', '[music]', '[Music]', '[MUSIC]',
      '[Applause]', '[applause]', '[BLANK_AUDIO]',
    ]);

    const isHallucination = WHISPER_HALLUCINATIONS.has(rawTranscription) || rawTranscription.length < 3;

    if (isHallucination) {
      return NextResponse.json(
        { noSpeechDetected: true, transcription: '', overallScore: 0, feedback: 'No se detectó voz. Habla claramente cerca del micrófono e inténtalo de nuevo.' },
        { status: 200 }
      );
    }

    const transcription = rawTranscription;

    const systemPrompt = `Eres un profesor de inglés que evalúa la pronunciación y expresión oral de estudiantes de nivel ${level}. Devuelve ÚNICAMENTE un JSON válido sin texto adicional.`;

    const userPrompt = `Evalúa esta respuesta oral de un estudiante de nivel ${level}.

Instrucción dada: "${prompt}"
${expectedResponse ? `Respuesta esperada: "${expectedResponse}"` : ''}
${targetWords.length > 0 ? `Palabras clave: ${targetWords.join(', ')}` : ''}
Transcripción del alumno: "${transcription}"

Devuelve este JSON exacto:
{
  "pronunciationScore": <0-100>,
  "fluencyScore": <0-100>,
  "grammarScore": <0-100>,
  "vocabularyScore": <0-100>,
  "overallScore": <0-100>,
  "feedback": "<2-3 frases de retroalimentación constructiva en español>",
  "strengths": ["<fortaleza 1>", "<fortaleza 2>"],
  "improvements": ["<mejora 1>", "<mejora 2>"],
  "detectedWords": [<palabras clave que usó>],
  "missedWords": [<palabras clave que omitió>]
}`;

    const llamaResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${CF_LLAMA_3_3_70B_INSTRUCT_FP8_FAST}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          max_tokens: 600,
        }),
      }
    );

    if (!llamaResponse.ok) {
      const err = await llamaResponse.text();
      console.error('Llama error:', err);
      return NextResponse.json({ error: 'Evaluation failed' }, { status: 500 });
    }

    const llamaResult = await llamaResponse.json() as { result?: { response?: string } };
    const rawText = llamaResult.result?.response || '';

    let evaluation: Partial<SpeakingEvaluationResponse> = {};
    try {
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        evaluation = JSON.parse(jsonMatch[0]);
      }
    } catch {
      console.error('Failed to parse Llama JSON:', rawText);
    }

    const response: SpeakingEvaluationResponse = {
      transcription,
      pronunciationScore: Number(evaluation.pronunciationScore) || 0,
      fluencyScore: Number(evaluation.fluencyScore) || 0,
      grammarScore: Number(evaluation.grammarScore) || 0,
      vocabularyScore: Number(evaluation.vocabularyScore) || 0,
      overallScore: Number(evaluation.overallScore) || 0,
      feedback: evaluation.feedback || '¡Buen esfuerzo! Sigue practicando.',
      strengths: evaluation.strengths || [],
      improvements: evaluation.improvements || [],
      detectedWords: evaluation.detectedWords || [],
      missedWords: evaluation.missedWords || [],
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error evaluating speaking:', error);
    return NextResponse.json(
      { error: error.message || 'Error al evaluar el ejercicio de expresión oral.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'evaluacion-expresion-oral',
    version: '2.0.0',
    features: [
      'Transcripción con Cloudflare Whisper',
      'Evaluación con Cloudflare Llama 3.1',
    ],
  });
}
