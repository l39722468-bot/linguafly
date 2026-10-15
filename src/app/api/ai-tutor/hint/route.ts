import { NextResponse } from "next/server";
import { enforceAIRateLimit, runWorkersAIJson, validateChatMessages } from "@/lib/ai/workers-ai";

function safeLabel(value: unknown, fallback: string, maxLength = 120): string {
  if (typeof value !== "string") return fallback;
  const cleaned = value.replace(/[\u0000-\u001f\u007f]/g, " ").trim();
  return cleaned ? cleaned.slice(0, maxLength) : fallback;
}

export async function POST(req: Request) {
  const rateLimitResponse = await enforceAIRateLimit(req, "ai-tutor-hint");
  if (rateLimitResponse) return rateLimitResponse;

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await req.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 });
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const messages = validateChatMessages(body.messages);
  if (!messages) {
    return NextResponse.json({ success: false, error: "Invalid conversation messages." }, { status: 400 });
  }

  const scenario = safeLabel(body.scenario, "General Conversation");
  const level = safeLabel(body.level, "Intermediate", 32);
  const systemPrompt = `You are an expert English speaking coach.
The student is practicing the scenario "${scenario}" at level ${level}.
Use the conversation history to provide a SHORT hint that helps the learner continue speaking.
Return only a JSON object with:
{
  "keyword": "a useful vocabulary word",
  "starter": "a sentence starter",
  "sentence": "a complete natural sentence at the learner's level"
}
Keep the three suggestions concise, practical, and different from one another.`;

  try {
    const hint = await runWorkersAIJson([
      { role: "system", content: systemPrompt },
      ...messages.slice(-5),
    ], { temperature: 0.5, maxTokens: 180 });

    return NextResponse.json({
      success: true,
      hint: {
        keyword: typeof hint.keyword === "string" ? hint.keyword : "",
        starter: typeof hint.starter === "string" ? hint.starter : "",
        sentence: typeof hint.sentence === "string" ? hint.sentence : "",
      },
    });
  } catch (error: unknown) {
    console.error(
      "Workers AI hint generation failed:",
      error instanceof Error ? error.name : "UnknownError",
    );
    return NextResponse.json(
      { success: false, error: "Hints are temporarily unavailable. Please try again." },
      { status: 502 },
    );
  }
}
