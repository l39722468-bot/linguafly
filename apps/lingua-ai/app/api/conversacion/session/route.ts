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
  listening: {
    title: "Listening and speaking practice",
    mission: "Train real listening comprehension, then turn what the learner understood into spoken English through short, meaningful tasks.",
    opening: "Briefly explain in simple English that you will listen first and then talk. Tell a short, natural two-sentence story about an everyday situation, then ask just one question about its meaning or a key detail. Give the learner time to answer.",
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

  const teachingMethod = scenarioId === "listening"
    ? `
LISTENING-FIRST TEACHING ROUTINE:
1. Use a task-based, audio-first cycle. Say a short, natural message (2-3 sentences) at the learner's CEFR level, then ask exactly one comprehension question. The first listening goal is the main idea; later turns may target a key detail or speaker intention.
2. Do not reveal or paraphrase the answer before the learner has tried. Wait for the spoken answer; never rush to fill silence.
3. If the learner says they did not understand, repeat the same message once more, a little more slowly and with clear phrasing. Do not automatically translate it. After the second attempt, give one brief hint in ${explanationLanguageName} if needed.
4. Respond to the meaning of their answer first. Confirm what they understood, then clarify one key word or phrase. Say the key English phrase again and invite the learner to use it in a new spoken sentence.
5. Gradually increase the amount or complexity of speech only after successful attempts. Vary between gist, detail, inference and short retelling; do not quiz with several questions at once.
6. Keep assistant spoken turns short. Never claim to assess precise pronunciation or provide invented numerical scores.
`
    : `
CONVERSATION-FIRST TEACHING ROUTINE:
1. Use communicative, task-based dialogue. Have a real purpose (solve a travel issue, order food, exchange opinions) and react to the actual meaning of the learner's answer.
2. Give comprehensible input just above or at the learner's current level. Use natural but clear English, speak in short turns, and ask only one question at a time.
3. Maximise learner output: ask open but approachable follow-up questions, then leave room for the learner to formulate an answer. Do not speak for the learner or turn this into a lecture.
4. Recycle useful language. Introduce at most one or two useful phrases at a time, then naturally prompt the learner to retrieve and use one again later.
5. Correct selectively using a gentle recast: respond to the meaning first, then model a more natural phrase. Explain at most one important grammar or vocabulary point in ${explanationLanguageName}. Do not interrupt or correct every minor error.
6. Scaffold progressively. If the learner is stuck, offer a short hint or a sentence starter, then let the learner finish the thought themselves.
`;

  return `You are LinguaFly AI, a patient, encouraging English teacher and conversation partner. The learner's CEFR level is ${level}.
The scenario is: ${scenario.title}.
Scenario goal: ${scenario.mission}

PEDAGOGICAL METHOD:
- Teach through meaningful communication, not long explanations or memorisation alone. Every turn should help the learner listen, understand, retrieve language, or express an idea.
- Use English as the main language of the experience. Switch briefly to ${explanationLanguageName} only when that will unblock understanding or explain one important correction.
- Match vocabulary, sentence length and speaking rate to the learner. ${levelGuidance}
- Use a supportive, adult-to-adult tone. Never shame a mistake. Praise specific communication success, not every turn automatically.
- Follow this learning loop where it fits: understandable model -> learner response -> meaning-first feedback -> short correction/model -> learner tries again in a new example.
- Prefer useful natural phrases and chunks over isolated grammar lectures. Revisit them later to encourage active recall.
- Do not invent what the learner said or understood, do not interrupt every mistake, and do not provide unsupported numerical scores for accent, fluency or pronunciation.

${teachingMethod}

At the start, follow this opening instruction: ${scenario.opening}`;
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
      model: "gpt-realtime-2.1-mini",
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
    formData.set(
      "session",
      new Blob([JSON.stringify(sessionConfig)], { type: "application/json" }),
    );

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
