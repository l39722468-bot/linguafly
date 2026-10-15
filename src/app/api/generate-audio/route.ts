import { NextRequest, NextResponse } from "next/server";
import { enforceAIRateLimit, getAuraSpeaker, getWorkersAIBinding, WORKERS_AI_TTS_MODEL } from "@/lib/ai/workers-ai";

const MAX_TEXT_LENGTH = 1800;

async function generateAudioResponse(textValue: unknown, voiceValue: unknown): Promise<Response> {
  const text = typeof textValue === "string" ? textValue.trim() : "";
  if (!text) return NextResponse.json({ error: "Text is required." }, { status: 400 });
  if (text.length > MAX_TEXT_LENGTH) {
    return NextResponse.json({ error: "Text exceeds the 1,800 character voice limit." }, { status: 413 });
  }

  try {
    const ai = await getWorkersAIBinding();
    const result = await ai.run(
      WORKERS_AI_TTS_MODEL,
      { text, speaker: getAuraSpeaker(voiceValue), encoding: "mp3" },
      { returnRawResponse: true },
    );

    if (result instanceof Response) {
      if (!result.ok) {
        console.error("Workers AI audio endpoint returned status:", result.status);
        return NextResponse.json({ error: "Audio generation failed." }, { status: 502 });
      }
      return new Response(result.body, {
        status: 200,
        headers: {
          "Content-Type": result.headers.get("Content-Type") || "audio/mpeg",
          "Cache-Control": "no-store",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }

    if (result instanceof ReadableStream) {
      return new Response(result, {
        status: 200,
        headers: {
          "Content-Type": "audio/mpeg",
          "Cache-Control": "no-store",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }

    return NextResponse.json({ error: "Audio generation returned an unsupported response." }, { status: 502 });
  } catch (error: unknown) {
    console.error("Workers AI audio generation failed:", error instanceof Error ? error.name : "UnknownError");
    return NextResponse.json({ error: "Audio generation is temporarily unavailable." }, { status: 502 });
  }
}

export async function GET(request: NextRequest) {
  const rateLimitResponse = await enforceAIRateLimit(request, 'generate-audio');
  if (rateLimitResponse) return rateLimitResponse;
  const { searchParams } = new URL(request.url);
  return generateAudioResponse(searchParams.get("text"), searchParams.get("voice"));
}

export async function POST(request: NextRequest) {
  const rateLimitResponse = await enforceAIRateLimit(request, 'generate-audio');
  if (rateLimitResponse) return rateLimitResponse;
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  return generateAudioResponse(body.text, body.voice);
}
