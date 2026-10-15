import { getCloudflareContext } from "@opennextjs/cloudflare";

export type CachedTutorAnswer = {
  reply: string;
  spokenSpanish: string;
  pronunciationText: string;
  feedback: null;
};

type D1Statement = {
  bind(...values: (string | number)[]): {
    first<T = unknown>(): Promise<T | null>;
    run(): Promise<unknown>;
  };
};

type TutorCacheEnv = {
  DB?: { prepare(query: string): D1Statement };
};

const CACHE_VERSION = "v1";
const CACHE_TTL_DAYS = 45;
const PERSONAL_OR_CONTEXTUAL = /\b(?:i|my|mine|we|our|ours|yo|mi|mis|m[ií]o|m[ií]a|nosotros|nuestro|mi nombre|mi familia|mi direcci[oó]n|mi tel[eé]fono|my name|my family|my address|my phone|my email)\b/i;
const FOLLOW_UP = /\b(?:more|another|again|repeat|same|different|that|this|it|previous|next|continue|m[aá]s|otra|otro|repite|repetir|siguiente|anterior|eso|esto|estas|estos|como antes|la anterior|el anterior)\b/i;
const LEARNING_REQUEST = /\b(?:examples?|sentences?|phrases?|vocabulary|words|grammar|explain|difference|translate|meaning|verb|tense|ejemplos?|frases?|oraciones?|vocabulario|palabras|gram[aá]tica|expl[ií]ca(?:me)?|diferencia|traduce|significa|tiempos verbales|c[oó]mo se dice|c[oó]mo decir|ens[eé]ñame|mu[eé]strame|dame frases|quiero practicar)\b/i;

export function normalizeTutorQuery(query: string): string {
  return query
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 240);
}

export function detectPreparedTutorIntent(query: string): string | null {
  const text = normalizeTutorQuery(query);
  if (!text || FOLLOW_UP.test(text)) return null;

  const asksForExamples = /\b(?:examples?|sentences?|phrases?|expressions?|ejemplos?|frases?|oraciones?|expresiones?)\b/.test(text);
  const asksForStudyMaterial = asksForExamples ||
    /\b(?:vocabulary|words|vocabulario|palabras|teach me|learn|practice|practise|practicar|aprender|como se dice|how do i say|frases para|words for)\b/.test(text);
  const asksForGrammarHelp = asksForExamples ||
    /\b(?:explain|explain to me|grammar|expl[ií]ca(?:me)?|gram[aá]tica|diferencia|difference|when do i use|cu[aá]ndo se usa)\b/.test(text);

  if (
    asksForExamples &&
    /(?:\b0\b|\bcero\b|\bzero\b).{0,55}(?:\b10\b|\bdiez\b|\bten\b)/.test(text)
  ) return "numbers_0_10_examples";

  if (asksForStudyMaterial && /\b(?:days of the week|weekdays|d[ií]as de la semana|d[ií]as semanales)\b/.test(text)) return "days_of_week_examples";
  if (asksForStudyMaterial && /\b(?:months of the year|months|meses del a[nñ]o|meses)\b/.test(text)) return "months_of_year_examples";
  if (asksForStudyMaterial && /\b(?:colou?rs?|colores|colour names|color names)\b/.test(text)) return "colours_examples";
  if (asksForStudyMaterial && /\b(?:greetings?|saludos|saludar|say hello|decir hola)\b/.test(text)) return "greetings_examples";
  if (asksForStudyMaterial && /\b(?:introduce myself|introducing yourself|presentarme|presentarse|presentaci[oó]n personal)\b/.test(text)) return "self_introduction_examples";
  if (asksForStudyMaterial && /\b(?:family|familia|relatives|parientes)\b/.test(text)) return "family_examples";
  if (asksForStudyMaterial && /\b(?:food|meals|comida|alimentos|bebidas|drinks)\b/.test(text)) return "food_examples";
  if (asksForStudyMaterial && /\b(?:weather|clima|tiempo atmosf[eé]rico)\b/.test(text)) return "weather_examples";
  if (asksForStudyMaterial && /\b(?:restaurant|restaurante|order food|ordering food|pedir comida|pedir en un restaurante)\b/.test(text)) return "restaurant_phrases";
  if (asksForStudyMaterial && /\b(?:hotel|check in|check-in|recepci[oó]n)\b/.test(text)) return "hotel_phrases";
  if (asksForStudyMaterial && /\b(?:airport|aeropuerto|boarding pass|embarque|check in for a flight)\b/.test(text)) return "airport_phrases";
  if (asksForStudyMaterial && /\b(?:directions|direcciones|ask the way|pedir indicaciones|street|calle|turn left|gira a la izquierda)\b/.test(text)) return "directions_phrases";
  if (asksForStudyMaterial && /\b(?:shopping|buying clothes|compras|ir de compras|price|precio|how much)\b/.test(text)) return "shopping_phrases";
  if (asksForStudyMaterial && /\b(?:daily routine|rutina diaria|everyday routine)\b/.test(text)) return "daily_routine_examples";
  if (asksForGrammarHelp && /\b(?:present simple|presente simple)\b/.test(text)) return "present_simple_examples";
  if (asksForGrammarHelp && /\b(?:past simple|simple past|pasado simple)\b/.test(text)) return "past_simple_examples";
  if (asksForGrammarHelp && /\b(?:future|going to|will future|futuro)\b/.test(text)) return "future_examples";
  if (asksForGrammarHelp && /\b(?:present perfect|presente perfecto)\b/.test(text)) return "present_perfect_examples";
  if (asksForGrammarHelp && /\b(?:verb to be|verbo to be|verbo be|am is are)\b/.test(text)) return "verb_to_be_examples";
  if (asksForGrammarHelp && /\b(?:a an|articles|art[ií]culos indefinidos)\b/.test(text)) return "articles_a_an_examples";
  if (asksForGrammarHelp && /\b(?:subject pronouns|personal pronouns|pronombres personales)\b/.test(text)) return "subject_pronouns_examples";
  if (asksForGrammarHelp && /\b(?:question words|wh questions|palabras interrogativas)\b/.test(text)) return "question_words_examples";
  if (asksForGrammarHelp && /\b(?:can and could|can could|can versus could|can y could|poder en ingl[eé]s)\b/.test(text)) return "can_could_examples";
  if (asksForGrammarHelp && /\b(?:comparatives|comparativos|comparative adjectives|adjetivos comparativos)\b/.test(text)) return "comparatives_examples";

  return null;
}

export function isCacheableTutorQuery(query: string): boolean {
  const normalized = normalizeTutorQuery(query);
  if (normalized.length < 10 || normalized.length > 200) return false;
  if (PERSONAL_OR_CONTEXTUAL.test(normalized) || FOLLOW_UP.test(normalized)) return false;
  return LEARNING_REQUEST.test(normalized);
}

async function getCacheDatabase(): Promise<{ prepare(query: string): D1Statement } | null> {
  try {
    const cloudflare = await getCloudflareContext({ async: true });
    const env = cloudflare.env as unknown as TutorCacheEnv;
    return env.DB ?? null;
  } catch (error: unknown) {
    console.warn("Tutor response cache unavailable:", error instanceof Error ? error.name : "UnknownError");
    return null;
  }
}

function parseAnswer(value: unknown): CachedTutorAnswer | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const row = value as Record<string, unknown>;
  if (
    typeof row.reply !== "string" || !row.reply.trim() ||
    typeof row.spokenSpanish !== "string" ||
    typeof row.pronunciationText !== "string"
  ) return null;

  return {
    reply: row.reply.slice(0, 5000),
    spokenSpanish: row.spokenSpanish.slice(0, 1400),
    pronunciationText: row.pronunciationText.slice(0, 1400),
    feedback: null,
  };
}

async function getAnswerByKey(key: string): Promise<CachedTutorAnswer | null> {
  const db = await getCacheDatabase();
  if (!db) return null;

  try {
    const row = await db.prepare(`
      SELECT response_json
      FROM tutor_response_cache
      WHERE cache_key = ?
        AND (response_kind = 'prepared' OR created_at >= datetime('now', '-${CACHE_TTL_DAYS} days'))
      LIMIT 1
    `).bind(key).first<{ response_json?: unknown }>();
    if (!row || typeof row.response_json !== "string") return null;
    return parseAnswer(JSON.parse(row.response_json) as unknown);
  } catch (error: unknown) {
    // Cache failures must never prevent the AI tutor from answering normally.
    console.warn("Tutor response cache read failed:", error instanceof Error ? error.name : "UnknownError");
    return null;
  }
}

export async function getPreparedTutorResponse(intentKey: string): Promise<CachedTutorAnswer | null> {
  if (!/^[a-z0-9_]{1,80}$/.test(intentKey)) return null;
  return getAnswerByKey(`prepared:${intentKey}`);
}

async function makeCacheKey(query: string, tutorId: string, level: string, topic: string): Promise<string> {
  const normalized = normalizeTutorQuery(query);
  const identity = [CACHE_VERSION, tutorId, level, topic, normalized].join("\u001f");
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(identity));
  const hex = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
  return `cached:${hex}`;
}

export async function getCachedTutorResponse(
  query: string,
  tutorId: string,
  level: string,
  topic: string,
): Promise<CachedTutorAnswer | null> {
  if (!isCacheableTutorQuery(query)) return null;
  try {
    return await getAnswerByKey(await makeCacheKey(query, tutorId, level, topic));
  } catch (error: unknown) {
    console.warn("Tutor response cache key failed:", error instanceof Error ? error.name : "UnknownError");
    return null;
  }
}

export async function saveCachedTutorResponse(
  query: string,
  tutorId: string,
  level: string,
  topic: string,
  answer: CachedTutorAnswer,
): Promise<void> {
  if (!isCacheableTutorQuery(query) || !answer.reply.trim() || answer.reply.length > 5000) return;
  const db = await getCacheDatabase();
  if (!db) return;

  try {
    const key = await makeCacheKey(query, tutorId, level, topic);
    await db.prepare(`
      INSERT INTO tutor_response_cache (cache_key, response_json, response_kind)
      VALUES (?, ?, 'cached')
      ON CONFLICT(cache_key) DO UPDATE SET
        response_json = excluded.response_json,
        created_at = CURRENT_TIMESTAMP
      WHERE tutor_response_cache.response_kind = 'cached'
    `).bind(key, JSON.stringify({
      reply: answer.reply,
      spokenSpanish: answer.spokenSpanish,
      pronunciationText: answer.pronunciationText,
    })).run();
  } catch (error: unknown) {
    // Saving is best effort; never turn a good answer into an error.
    console.warn("Tutor response cache write failed:", error instanceof Error ? error.name : "UnknownError");
  }
}
