import { headers } from "next/headers";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getAuth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

type PracticeProfile = {
  cefr_level: string | null;
  explanation_language: string;
};

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
    opening: "Introduce yourself briefly and ask one easy, friendly question to get the conversation started.",
  },
  restaurant: {
    title: "At a restaurant",
    mission: "Role-play a real restaurant visit: greeting the server, asking about the menu, ordering food, and politely handling a small problem.",
    opening: "Welcome the learner to the restaurant and ask how many people the table is for.",
  },
  travel: {
    title: "Travel and airport",
    mission: "Role-play a travel situation such as checking in, asking for directions, solving a luggage problem, or arranging transport.",
    opening: "Greet the learner as an airport or hotel staff member and ask how you can help.",
  },
  interview: {
    title: "Job interview",
    mission: "Role-play a supportive job interviewer. Ask one interview question at a time and give the learner space to answer.",
    opening: "Welcome the learner and ask them to tell you a little about themselves.",
  },
} as const;

type ScenarioId = keyof typeof scenarios;

function isScenarioId(value: string | null): value is ScenarioId {
  return value !== null && Object.prototype.hasOwnProperty.call(scenarios, value);
}

function buildInstructions(
  level: string,
  explanationLanguage: string,
  scenarioId: ScenarioId,
): string {
  const scenario = scenarios[scenarioId];
  const explanationLanguageName = explanationLanguageNames[explanationLanguage] ?? "Spanish";
  const levelGuidance =
    level === "A1" || level === "A2"
      ? "Use short sentences, common vocabulary, and a calm, slightly slower pace. Ask only one simple question at a time."
      : level === "B1" || level === "B2"
        ? "Use natural everyday English with a mix of straightforward and moderately complex sentences. Encourage longer answers."
        : "Use natural, nuanced English, idioms where appropriate, and thoughtful follow-up questions without dominating the conversation.";

  return `You are LinguaFly AI, a warm, patient English conversation coach. The learner's CEFR level is ${level}.
The scenario is: ${scenario.title}.
Scenario goal: ${scenario.mission}

Speak primarily in English and adjust your vocabulary, grammar, sentence length, and speaking pace to the learner's level. ${levelGuidance}
Keep each turn concise so the learner gets plenty of speaking time. Ask one question at a time and respond to what the learner actually says. Stay in the role-play when appropriate, but be friendly and never make the learner feel embarrassed.
When the learner makes an important grammar or word-choice mistake, let them finish first. Then, when it fits naturally, give a brief, gentle correction in ${explanationLanguageName}: quote a short version of what they said, offer a natural correction, and explain the rule in one simple sentence. Do not correct every tiny mistake, do not interrupt the flow, and do not claim to measure pronunciation precisely.
If the learner asks for help or seems stuck, offer a short hint in ${explanationLanguageName}, then return to speaking English.
Do not provide numerical fluency or pronunciation scores and do not invent a transcript of words you could not understand.
At the start of the session, follow this opening instruction: ${scenario.opening}`;
}

async function hashUserId(userId: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(userId),
  );
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

export async function POST(request: Request) {
  const auth = await getAuth().catch(() => null);
  if (!auth) {
    return Response.json(
      { error: "No se ha podido comprobar la sesión. Inicia sesión de nuevo." },
      { status: 401 },
    );
  }

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return Response.json(
      { error: "Tu sesión ha caducado. Inicia sesión de nuevo." },
      { status: 401 },
    );
  }

  const scenarioValue = new URL(request.url).searchParams.get("scenario");
  const scenarioId: ScenarioId = isScenarioId(scenarioValue) ? scenarioValue : "free";
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/sdp")) {
    return Response.json({ error: "La solicitud de audio no es válida." }, { status: 415 });
  }

  const sdp = await request.text();
  if (!sdp.trim() || sdp.length > 250_000) {
    return Response.json({ error: "No se ha podido iniciar el audio del micrófono." }, { status: 400 });
  }

  try {
    const context = await getCloudflareContext({ async: true });
    const env = context.env as unknown as CloudflareEnv & { OPENAI_API_KEY?: string };
    const apiKey = env.OPENAI_API_KEY?.trim();

    if (!apiKey) {
      return Response.json(
        { error: "La conversación por voz todavía no está configurada. Falta la clave de OpenAI en el Worker privado." },
        { status: 503 },
      );
    }

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
    const scenario = scenarios[scenarioId];
    const sessionConfig = {
      type: "realtime",
      model: "gpt-realtime-mini",
      instructions: buildInstructions(level, explanationLanguage, scenarioId),
      audio: {
        input: {
          transcription: {
            model: "gpt-4o-mini-transcribe",
            language: "en",
          },
          noise_reduction: { type: "near_field" },
          turn_detection: {
            type: "semantic_vad",
            eagerness: "medium",
            create_response: true,
            interrupt_response: true,
          },
        },
        output: {
          voice: "marin",
        },
      },
    };

    const formData = new FormData();
    formData.set("sdp", sdp);
    formData.set("session", JSON.stringify(sessionConfig));

    const upstream = await fetch("https://api.openai.com/v1/realtime/calls", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "OpenAI-Safety-Identifier": await hashUserId(session.user.id),
      },
      body: formData,
    });

    const answerSdp = await upstream.text();
    if (!upstream.ok) {
      console.error(
        "LinguaFly AI Realtime session failed:",
        upstream.status,
        answerSdp.slice(0, 700),
      );
      return Response.json(
        {
          error:
            upstream.status === 401 || upstream.status === 403
              ? "OpenAI ha rechazado la clave o el acceso al modelo Realtime. Revisa la configuración de la API."
              : "No se ha podido conectar con el tutor de voz. Inténtalo de nuevo en unos instantes.",
        },
        { status: upstream.status >= 400 && upstream.status < 600 ? upstream.status : 502 },
      );
    }

    return new Response(answerSdp, {
      status: 200,
      headers: {
        "Content-Type": "application/sdp",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error(
      "LinguaFly AI conversation setup failed:",
      error instanceof Error ? error.message : "unknown error",
    );
    return Response.json(
      { error: "No se ha podido preparar la conversación. Inténtalo de nuevo." },
      { status: 500 },
    );
  }
}
