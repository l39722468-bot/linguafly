import { NextResponse } from "next/server";
import { MISSION_CATALOG } from "@/lib/exercise-types";
import { enforceAIRateLimit, runWorkersAIJson, validateChatMessages } from "@/lib/ai/workers-ai";

function stringArray(value: unknown, maxItems = 8): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, 300))
    .filter(Boolean)
    .slice(0, maxItems);
}

export async function POST(req: Request) {
  const rateLimitResponse = await enforceAIRateLimit(req, "ai-lab-evaluate");
  if (rateLimitResponse) return rateLimitResponse;

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await req.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 });
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const missionId = typeof body.missionId === "string" ? body.missionId.slice(0, 100) : "";
  const mission = MISSION_CATALOG.find((entry) => entry.id === missionId);
  if (!mission) return NextResponse.json({ success: false, error: "Mission not found." }, { status: 404 });

  const messages = validateChatMessages(body.messages);
  if (!messages) {
    return NextResponse.json({ success: false, error: "Invalid conversation history." }, { status: 400 });
  }
  const goalsReached = stringArray(body.goalsReached, 20);

  const evaluationPrompt = `Evaluate this student's English roleplay in Spanish.
MISSION: ${mission.title}
GOAL: ${mission.goal}
LEVEL: ${mission.level}
SECTOR: ${mission.sector}

CONVERSATION:
${messages.map((message) => `${message.role.toUpperCase()}: ${message.content}`).join("\n")}

GOALS MARKED AS REACHED BY THE APP (may be inaccurate; verify against the conversation):
${goalsReached.join(", ") || "None"}

Evaluate goal achievement, language accuracy, vocabulary, and appropriateness for the sector.
Return JSON with:
{
  "score": number from 0 to 100,
  "feedback": "concise constructive summary in Spanish",
  "strengths": ["strength"],
  "improvements": ["improvement"],
  "grammarCorrections": [{"original": "incorrect phrase", "correction": "correct phrase", "explanation": "brief explanation in Spanish"}],
  "missionStatus": "SUCCESS" | "PARTIAL" | "FAILED"
}`;

  try {
    const raw = await runWorkersAIJson([
      { role: "system", content: "You are a fair, encouraging English teacher. Base all judgments on the supplied conversation. Do not invent learner statements." },
      { role: "user", content: evaluationPrompt },
    ], { temperature: 0.2, maxTokens: 700 });

    const numericScore = typeof raw.score === "number" ? raw.score : Number(raw.score ?? 0);
    const score = Number.isFinite(numericScore) ? Math.max(0, Math.min(100, Math.round(numericScore))) : 0;
    const missionStatus = raw.missionStatus === "SUCCESS" || raw.missionStatus === "FAILED"
      ? raw.missionStatus
      : "PARTIAL";
    const grammarCorrections = Array.isArray(raw.grammarCorrections)
      ? raw.grammarCorrections
          .filter((item) => item && typeof item === "object" && !Array.isArray(item))
          .slice(0, 8)
          .map((item) => {
            const correction = item as Record<string, unknown>;
            return {
              original: typeof correction.original === "string" ? correction.original.slice(0, 300) : "",
              correction: typeof correction.correction === "string" ? correction.correction.slice(0, 300) : "",
              explanation: typeof correction.explanation === "string" ? correction.explanation.slice(0, 500) : "",
            };
          })
      : [];

    return NextResponse.json({
      success: true,
      evaluation: {
        score,
        feedback: typeof raw.feedback === "string" ? raw.feedback.slice(0, 1200) : "Evaluación completada.",
        strengths: stringArray(raw.strengths),
        improvements: stringArray(raw.improvements),
        grammarCorrections,
        missionStatus,
      },
    });
  } catch (error: unknown) {
    console.error("Workers AI mission evaluation failed:", error instanceof Error ? error.name : "UnknownError");
    return NextResponse.json(
      { success: false, error: "No se ha podido evaluar la misión. Inténtalo de nuevo." },
      { status: 502 },
    );
  }
}
