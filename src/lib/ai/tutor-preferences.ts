export const TUTOR_TOPICS = [
  "general",
  "social",
  "travel",
  "business",
  "grammar",
  "exams",
  "vocabulary",
] as const;

export type TutorTopic = (typeof TUTOR_TOPICS)[number];

export interface TutorPreferences {
  level: string;
  topic: TutorTopic;
  levelDetected: boolean;
  topicDetected: boolean;
}

const TOPIC_TERMS: Record<Exclude<TutorTopic, "general">, string[]> = {
  travel: [
    "travel", "travelling", "traveling", "trip", "holiday", "vacation",
    "airport", "hotel", "flight", "viajar", "viaje", "viajes", "vacaciones",
    "aeropuerto", "hotel", "turismo",
  ],
  business: [
    "business", "work", "job", "office", "meeting", "interview", "email",
    "career", "negocio", "trabajo", "entrevista", "oficina", "reunión",
    "reunion", "correo",
  ],
  social: [
    "social", "daily", "everyday", "friends", "family", "routine", "smalltalk",
    "cotidiana", "cotidiano", "amigos", "familia", "rutina", "conversación",
    "conversacion", "charlar",
  ],
  grammar: [
    "grammar", "gramática", "gramatica", "tense", "tenses", "verb", "verbs",
    "preposition", "prepositions", "past", "present", "conditional", "grammar",
    "tiempo", "tiempos", "verbo", "verbos", "preposición", "preposicion",
  ],
  exams: [
    "exam", "exams", "ielts", "cambridge", "toefl", "certificate", "certification",
    "examen", "exámenes", "examenes", "certificado", "certificación", "certificacion",
  ],
  vocabulary: [
    "vocabulary", "vocab", "words", "phrases", "expressions", "words",
    "vocabulario", "palabras", "frases", "expresiones",
  ],
};

function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function detectLevel(text: string): string | null {
  const normalized = normalize(text);
  const levelMatch = normalized.match(/\b([abc])\s*([1-2])\b/);
  if (levelMatch) return `${levelMatch[1].toUpperCase()}${levelMatch[2]}`;

  if (/\b(a one|level one|beginner|absolute beginner|principiante)\b/.test(normalized)) return "A1";
  if (/\b(a two|elementary|basico|basica)\b/.test(normalized)) return "A2";
  if (/\b(b one|intermediate|intermedio|intermedia)\b/.test(normalized)) return "B1";
  if (/\b(b two|upper intermediate|intermedio alto)\b/.test(normalized)) return "B2";
  if (/\b(c one|advanced|avanzado|avanzada)\b/.test(normalized)) return "C1";
  if (/\b(c two|proficient|proficiency|near native|dominio)\b/.test(normalized)) return "C2";
  return null;
}

function detectTopic(text: string): TutorTopic | null {
  const normalized = normalize(text);
  const tokens = new Set(normalized.split(/\s+/));

  // Prefer more specific intents before general conversation.
  const priority: Exclude<TutorTopic, "general">[] = [
    "exams", "grammar", "travel", "business", "vocabulary", "social",
  ];
  for (const topic of priority) {
    if (TOPIC_TERMS[topic].some((term) => {
      const normalizedTerm = normalize(term);
      return normalized.includes(normalizedTerm) || tokens.has(normalizedTerm);
    })) {
      return topic;
    }
  }
  return null;
}

export function inferTutorPreferences(
  text: string,
  fallback: { level?: string; topic?: string } = {},
): TutorPreferences {
  const detectedLevel = detectLevel(text);
  const detectedTopic = detectTopic(text);
  const fallbackTopic = TUTOR_TOPICS.find((topic) => topic === fallback.topic) ?? "general";
  const fallbackLevel = typeof fallback.level === "string" && /^[ABC][12]$/.test(fallback.level)
    ? fallback.level
    : "B1";

  return {
    level: detectedLevel ?? fallbackLevel,
    topic: detectedTopic ?? fallbackTopic,
    levelDetected: detectedLevel !== null,
    topicDetected: detectedTopic !== null,
  };
}
