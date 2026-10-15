import { NextRequest, NextResponse } from "next/server";
import { enforceAIRateLimit, getAuraSpeaker, getWorkersAIBinding, WORKERS_AI_TTS_MODEL } from "@/lib/ai/workers-ai";

export async function POST(request: NextRequest) {
  const rateLimitResponse = await enforceAIRateLimit(request, "ai-lab-tts");
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

  const text = typeof body.text === "string" ? body.text.trim() : "";
  if (!text) return NextResponse.json({ error: "Text is required." }, { status: 400 });
  if (text.length > 1800) {
    return NextResponse.json({ error: "Text exceeds the 1,800 character voice limit." }, { status: 413 });
  }

  try {
    const ai = await getWorkersAIBinding();
    const result = await ai.run(
      WORKERS_AI_TTS_MODEL,
      {
        text,
        speaker: getAuraSpeaker(body.voice),
        encoding: "mp3",
      },
      { returnRawResponse: true },
    );

    if (result instanceof Response) {
      if (!result.ok) {
        console.error("Workers AI lab TTS returned status:", result.status);
        return NextResponse.json({ error: "Voice generation failed." }, { status: 502 });
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
        headers: {
          "Content-Type": "audio/mpeg",
          "Cache-Control": "no-store",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }

    return NextResponse.json({ error: "Voice generation returned an unsupported response." }, { status: 502 });
  } catch (error: unknown) {
    console.error("Workers AI lab TTS failed:", error instanceof Error ? error.name : "UnknownError");
    return NextResponse.json({ error: "Voice is temporarily unavailable." }, { status: 502 });
  }
}
