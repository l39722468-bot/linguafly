import { NextResponse } from "next/server";
import { enforceAIRateLimit, arrayBufferToBase64,
  getWorkersAIBinding,
  WORKERS_AI_STT_MODEL, } from "@/lib/ai/workers-ai";

const MAX_AUDIO_BYTES = 8 * 1024 * 1024;

export async function POST(request: Request) {
  const rateLimitResponse = await enforceAIRateLimit(request, "ai-lab-stt");
  if (rateLimitResponse) return rateLimitResponse;

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_AUDIO_BYTES + 64 * 1024) {
    return NextResponse.json({ error: "Audio request must be 8 MB or smaller." }, { status: 413 });
  }

  let audioFile: FormDataEntryValue | null;
  try {
    const formData = await request.formData();
    audioFile = formData.get("audio");
  } catch {
    return NextResponse.json({ error: "Invalid multipart form data." }, { status: 400 });
  }

  if (!audioFile || typeof audioFile === "string" || typeof audioFile.arrayBuffer !== "function") {
    return NextResponse.json({ error: "An audio file is required." }, { status: 400 });
  }
  if (audioFile.size <= 0) {
    return NextResponse.json({ error: "The audio file is empty." }, { status: 400 });
  }
  if (audioFile.size > MAX_AUDIO_BYTES) {
    return NextResponse.json({ error: "Audio must be 8 MB or smaller." }, { status: 413 });
  }
  if (audioFile.type && !audioFile.type.startsWith("audio/")) {
    return NextResponse.json({ error: "Unsupported audio content type." }, { status: 415 });
  }

  try {
    const audio = await audioFile.arrayBuffer();
    const ai = await getWorkersAIBinding();
    const result = await ai.run(WORKERS_AI_STT_MODEL, {
      audio: arrayBufferToBase64(audio),
      task: "transcribe",
      language: "en",
      vad_filter: true,
      condition_on_previous_text: false,
    });

    const output = result && typeof result === "object"
      ? result as Record<string, unknown>
      : {};
    const transcription = typeof output.text === "string" ? output.text.trim() : "";

    if (!transcription) {
      return NextResponse.json({ transcription: "", empty: true });
    }

    return NextResponse.json({ transcription });
  } catch (error: unknown) {
    console.error(
      "Workers AI speech transcription failed:",
      error instanceof Error ? error.name : "UnknownError",
    );
    return NextResponse.json(
      { error: "Speech transcription is temporarily unavailable. Please try again." },
      { status: 502 },
    );
  }
}
