import { headers } from "next/headers";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getAuth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

type PracticeProfile = {
  cefr_level: string | null;
  explanation_language: string;
};

type RuntimeEnv = {
  AUTH_DB: D1Database;
  AI: {
    run(model: string, inputs: Record<string, unknown>): Promise<unknown>;
  };
};

type ChatTurn = {
  role: "user" | "assistant";
  text: string;
};

const MODELS = {
  transcription: "@cf/openai/whisper-large-v3-turbo",
  conversation: "@cf/openai/gpt-oss-20b",
  speech: "@cf/deepgram/aura-2-en",
} as const;

const explanationLanguageNames: Record<string, string> = {
  es: "Spanish",
  ca: "Catalan",
  en: "English",
  fr: "French",
  pt: "Portuguese",
  de: "German",
  it: "Italian",
};

const scenarios = {
  free: {
    title: "Friendly free conversation",
    mission: "Have a natural conversation about everyday life, hobbies, plans, travel, or topics the learner brings up.",
  },
  listening: {
    title: "Listening and speaking practice",
    mission: "Train listening comprehension through a short spoken message, then ask one question at a time about its main idea or details. Do not give away the answer before the learner tries.",
  },
  restaurant: {
    title: "At a restaurant",
    mission: "Role-play a real restaurant visit: greeting the server, asking about the menu, ordering food, and politely handling a small problem.",
  },
  travel: {
    title: "Travel and airport",
    mission: "Role-play a travel situation such as checking in, asking for directions, solving a luggage problem, or arranging transport.",
  },
  interview: {
    title: "Job interview",
    mission: "Role-play a supportive job interviewer. Ask one interview question at a time and give the learner space to answer.",
  },
} as const;

type ScenarioId = keyof typeof scenarios;

function isScenarioId(value: string | null): value is ScenarioId {
  return value !== null && Object.prototype.hasOwnProperty.call(scenarios, value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunkSize = 0x8000;
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }
  return btoa(binary);
}

function extractText(result: unknown): string {
  if (!isRecord(result)) return "";
  if (typeof result.response === "string") return result.response.trim();
  if (typeof result.output_text === "string") return result.output_text.trim();
  if (typeof result.text === "string") return result.text.trim();

  const choices = result.choices;
  if (Array.isArray(choices) && choices.length > 0 && isRecord(choices[0])) {
    const message = choices[0].message;
    if (isRecord(message)) {
      const content = message.content;
      if (typeof content === "string") return content.trim();
      if (Array.isArray(content)) {
        return content
          .map((part) => isRecord(part) && typeof part.text === "string" ? part.text : "")
          .join("")
          .trim();
      }
    }
  }

  const transcriptionInfo = result.transcription_info;
  if (isRecord(transcriptionInfo) && typeof transcriptionInfo.text === "string") {
    return transcriptionInfo.text.trim();
  }
  return "";
}

async function resultToAudioBytes(result: unknown): Promise<Uint8Array> {
  if (result instanceof Response) return new Uint8Array(await result.arrayBuffer());
  if (result instanceof ReadableStream) {
    return new Uint8Array(await new Response(result).arrayBuffer());
  }
  if (result instanceof ArrayBuffer) return new Uint8Array(result);
  if (ArrayBuffer.isView(result)) {
    return new Uint8Array(result.buffer, result.byteOffset, result.byteLength);
  }
  if (isRecord(result)) {
    for (const key of ["audio", "data", "output"]) {
      const nested = result[key];
      if (nested !== undefined) {
        try {
          return await resultToAudioBytes(nested);
        } catch {
          // Try the next known audio field shape.
        }
      }
    }
  }
  throw new Error("Workers AI returned an unsupported audio response.");
}

function normaliseHistory(value: FormDataEntryValue | null): ChatTurn[] {
  if (typeof value !== "string") return [];
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (turn): turn is Record<string, unknown> =>
          isRecord(turn) &&
          (turn.role === "user" || turn.role === "assistant") &&
          typeof turn.text === "string",
      )
      .slice(-10)
      .map((turn) => ({
        role: turn.role as ChatTurn["role"],
        text: (turn.text as string).trim().slice(0, 900),
      }))
      .filter((turn) => turn.text.length > 0);
  } catch {
    return [];
  }
}

function buildSystemPrompt(
  level: string,
  explanationLanguage: string,
  scenarioId: ScenarioId,
): string {
  const scenario = scenarios[scenarioId];
  const explanationLanguageName = explanationLanguageNames[explanationLanguage] ?? "Spanish";
  const levelGuidance =
    level === "A1" || level === "A2"
      ? "Use short sentences, very common vocabulary, and a calm, slightly slower pace. Ask just one simple question at a time."
      : level === "B1" || level === "B2"
        ? "Use natural everyday English with moderately complex sentences. Encourage complete answers and short explanations."
        : "Use natural, nuanced English, idioms where appropriate, and thoughtful follow-up questions without dominating the conversation.";

  const listeningMethod = scenarioId === "listening"
    ? "LISTENING-FIRST ROUTINE: In your next reply, say a short natural message of 2-3 sentences, then ask exactly one comprehension question. Do not reveal the answer in advance. If the learner did not understand, repeat once more slowly; after another attempt, give one brief hint in " + explanationLanguageName + "."
    : "CONVERSATION ROUTINE: Make this a real task-based dialogue. React to what the learner actually said. Ask one question per turn, leave room for the learner to speak, and introduce no more than one or two useful expressions at a time.";

  return `You are LinguaFly AI, a patient, encouraging English teacher and conversation partner. The learner's CEFR level is ${level}.
Scenario: ${scenario.title}. Goal: ${scenario.mission}

TEACHING METHOD:
- Use English as the main language. Speak clearly and at the learner's level. ${levelGuidance}
- Be supportive and adult-to-adult. Never shame mistakes and do not praise every turn automatically.
- Meaning first: respond to what the learner meant, then gently recast one important error as a natural English phrase. Explain at most one grammar or vocabulary point in ${explanationLanguageName}, only when useful.
- Maximise learner speaking time. Do not lecture, correct every tiny mistake, or translate every sentence.
- Reuse helpful phrases later to promote active recall. If the learner gets stuck, give a short hint or sentence starter instead of the complete answer.
- Keep each spoken reply short (usually 1-3 sentences) and finish with no more than one clear question when appropriate.
- Output only the words to say aloud: no markdown, stage directions, labels, pronunciation scores, or internal reasoning.
- Never claim to have measured pronunciation precisely.

${listeningMethod}

Begin the session in a friendly way if there is no previous dialogue; otherwise respond naturally to the learner's latest turn.`;
}

function jsonError(message: string, status: number): Response {
  return Response.json(
    { error: message },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  const auth = await getAuth().catch(() => null);
  if (!auth) {
    return jsonError("No se ha podido comprobar la sesión. Inicia sesión de nuevo.", 401);
  }

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return jsonError("Tu sesión ha caducado. Inicia sesión de nuevo.", 401);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return jsonError("No se ha podido leer el audio enviado.", 400);
  }

  const startSession = form.get("start") === "true";
  const audio = form.get("audio");
  if (!startSession && (!(audio instanceof File) || !audio.type.toLowerCase().startsWith("audio/"))) {
    return jsonError("Graba una respuesta de voz antes de enviarla.", 400);
  }
  if (!startSession && audio instanceof File && audio.size < 500) {
    return jsonError("No se ha detectado suficiente audio. Prueba a hablar un poco más.", 400);
  }
  if (!startSession && audio instanceof File && audio.size > 5 * 1024 * 1024) {
    return jsonError("El audio es demasiado largo. Graba una respuesta más breve (máximo 5 MB).", 413);
  }

  const scenarioValue = form.get("scenario");
  const scenarioId: ScenarioId = isScenarioId(typeof scenarioValue === "string" ? scenarioValue : null)
    ? scenarioValue as ScenarioId
    : "free";
  const history = normaliseHistory(form.get("history"));

  try {
    const context = await getCloudflareContext({ async: true });
    const env = context.env as unknown as RuntimeEnv;

    let profile: PracticeProfile | null = null;
    try {
      profile = await env.AUTH_DB.prepare(
        "SELECT cefr_level, explanation_language FROM profiles WHERE user_id = ?",
      )
        .bind(session.user.id)
        .first<PracticeProfile>();
    } catch {
      // A new learner can still start with safe A1/Spanish defaults.
    }

    const level = profile?.cefr_level ?? "A1";
    const explanationLanguage = profile?.explanation_language ?? "es";
    let learnerText = "";
    if (!startSession && audio instanceof File) {
      const audioBase64 = bytesToBase64(new Uint8Array(await audio.arrayBuffer()));
      const transcriptionResult = await env.AI.run(MODELS.transcription, {
        audio: audioBase64,
        task: "transcribe",
        language: "en",
        vad_filter: true,
        condition_on_previous_text: false,
        initial_prompt: "The speaker is a learner practising spoken English. Preserve their English words; do not translate.",
      });
      learnerText = extractText(transcriptionResult);
      if (!learnerText) {
        return jsonError("No he entendido la grabación. Prueba otra vez hablando un poco más cerca del micrófono.", 422);
      }
    }

    const modelMessages = [
      { role: "system", content: buildSystemPrompt(level, explanationLanguage, scenarioId) },
      ...history.map((turn) => ({ role: turn.role, content: turn.text })),
      {
        role: "user",
        content: startSession
          ? "Start the session now. Introduce yourself briefly and ask the opening question for this scenario in one short spoken turn."
          : learnerText,
      },
    ];

    const conversationResult = await env.AI.run(MODELS.conversation, {
      messages: modelMessages,
      max_tokens: 150,
      temperature: 0.45,
    });
    const tutorText = extractText(conversationResult);
    if (!tutorText) {
      console.error("LinguaFly Workers AI returned an empty conversation response.");
      return jsonError("El tutor no ha podido preparar una respuesta. Inténtalo de nuevo.", 502);
    }

    let speechBase64: string | null = null;
    try {
      const speechResult = await env.AI.run(MODELS.speech, {
        text: tutorText.slice(0, 1800),
        speaker: "luna",
        encoding: "mp3",
        container: "none",
      });
      const speechBytes = await resultToAudioBytes(speechResult);
      if (speechBytes.byteLength > 0 && speechBytes.byteLength <= 2 * 1024 * 1024) {
        speechBase64 = bytesToBase64(speechBytes);
      }
    } catch (error) {
      console.error(
        "LinguaFly Workers AI speech generation failed:",
        error instanceof Error ? error.message : "unknown error",
      );
    }

    return Response.json(
      { transcript: learnerText, reply: tutorText, audio: speechBase64, audioMimeType: "audio/mpeg" },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error(
      "LinguaFly Workers AI conversation turn failed:",
      error instanceof Error ? error.message : "unknown error",
    );
    return jsonError("No se ha podido procesar el turno. Comprueba la conexión e inténtalo de nuevo.", 502);
  }
}
