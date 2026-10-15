import { NextResponse } from "next/server";
import { MISSION_CATALOG } from "@/lib/exercise-types";
import { generateMissionSystemPrompt } from "@/lib/ai/mission-engine";
import { enforceAIRateLimit, streamWorkersAIText, validateChatMessages } from "@/lib/ai/workers-ai";

export async function POST(req: Request) {
  const rateLimitResponse = await enforceAIRateLimit(req, "ai-lab-chat");
  if (rateLimitResponse) return rateLimitResponse;

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await req.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const missionId = typeof body.missionId === "string" ? body.missionId.slice(0, 100) : "";
  const mission = MISSION_CATALOG.find((entry) => entry.id === missionId);
  if (!mission) return NextResponse.json({ error: "Mission not found." }, { status: 404 });

  const messages = validateChatMessages(body.messages);
  if (!messages) {
    return NextResponse.json({ error: "Invalid conversation messages." }, { status: 400 });
  }

  try {
    const stream = await streamWorkersAIText([
      { role: "system", content: generateMissionSystemPrompt(mission) },
      ...messages,
    ], { temperature: 0.7, maxTokens: 500 });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error: unknown) {
    console.error("Workers AI mission chat failed:", error instanceof Error ? error.name : "UnknownError");
    return NextResponse.json(
      { error: "La conversación no está disponible ahora. Inténtalo de nuevo." },
      { status: 502 },
    );
  }
}
