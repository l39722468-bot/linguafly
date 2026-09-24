import type { AffiliateBook } from "@/lib/affiliates/book";

export const ESSENTIAL_GRAMMAR_AMAZON_URL = "https://link.amazon/B018DZDWS";
export const COLLOCATIONS_AMAZON_URL = "https://link.amazon/B0emi5gC7";
export const IELTS_AMAZON_URL = "https://link.amazon/B0fFwIKQp";
export const C1_ADVANCED_AMAZON_URL = "https://link.amazon/B087jx513";

export const ESSENTIAL_GRAMMAR_BOOK: AffiliateBook = {
  id: "essential-grammar-in-use",
  url: ESSENTIAL_GRAMMAR_AMAZON_URL,
  title: "Essential Grammar in Use. Fourth edition",
  eyebrow: "Gramática A1–B1",
  description:
    "El libro rojo de Raymond Murphy: gramática elemental con explicaciones cortas, ejercicios y soluciones. Para quien está en A2.",
  highlights: [
    "Nivel elemental, A1–B1",
    "115 unidades con teoría y práctica",
    "Respuestas al final",
  ],
  tone: "sky",
};

export const COLLOCATIONS_BOOK: AffiliateBook = {
  id: "collocations-in-use-intermediate",
  url: COLLOCATIONS_AMAZON_URL,
  title: "English Collocations in Use Intermediate",
  eyebrow: "Collocations B1–B2",
  description:
    "Más de 1.500 combinaciones de palabras en contexto, con ejercicios y soluciones. La edición intermedia de McCarthy y O'Dell.",
  highlights: [
    "Nivel B1–B2",
    "Temas de internet, presentaciones y inglés social",
    "Soluciones incluidas",
  ],
  tone: "emerald",
};

export const IELTS_BOOK: AffiliateBook = {
  id: "ielts-20-academic",
  url: IELTS_AMAZON_URL,
  title: "IELTS 20 Academic. Practice tests",
  eyebrow: "Exámenes IELTS",
  description:
    "Cuatro exámenes académicos completos de Cambridge, con respuestas, audio y ejemplos de speaking y writing.",
  highlights: [
    "Formato Academic",
    "Listening, reading, writing y speaking",
    "Claves y pack digital",
  ],
  tone: "amber",
};

export const C1_ADVANCED_BOOK: AffiliateBook = {
  id: "c1-advanced-practice-tests",
  url: C1_ADVANCED_AMAZON_URL,
  title: "C1 Advanced Volume 1 Practice Tests",
  eyebrow: "Cambridge C1",
  description:
    "Práctica del Cambridge C1 Advanced: reading, use of English, writing, listening y speaking, al formato del examen.",
  highlights: [
    "Exámenes de práctica del C1 Advanced",
    "Las cuatro destrezas y el Use of English",
    "Para simular el examen",
  ],
  tone: "sky",
};

const ESSENTIAL_GRAMMAR_SLUGS = new Set([
  "unidad-1-saludos-introducciones-repaso",
  "unidad-1-saludos-introducciones-repaso-ejercicios-soluciones",
  "unidad-10-repaso-modulo-1",
  "unidad-10-repaso-modulo-1-ejercicios-soluciones",
  "unidad-11-present-perfect-introduccion",
  "unidad-11-present-perfect-introduccion-ejercicios-soluciones",
  "unidad-12-present-perfect-ever-never",
  "unidad-12-present-perfect-ever-never-ejercicios-soluciones",
  "unidad-13-present-perfect-already-yet",
  "unidad-13-present-perfect-already-yet-ejercicios-soluciones",
  "unidad-14-present-perfect-just",
  "unidad-14-present-perfect-just-ejercicios-soluciones",
  "unidad-15-present-perfect-vs-past-simple",
  "unidad-15-present-perfect-vs-past-simple-ejercicios-soluciones",
  "unidad-16-past-continuous",
  "unidad-16-past-continuous-ejercicios-soluciones",
  "unidad-17-past-simple-past-continuous",
  "unidad-17-past-simple-past-continuous-ejercicios-soluciones",
  "unidad-18-for-since",
  "unidad-18-for-since-ejercicios-soluciones",
  "unidad-19-how-questions",
  "unidad-19-how-questions-ejercicios-soluciones",
  "unidad-2-past-simple-verbos-regulares",
  "unidad-2-past-simple-verbos-regulares-ejercicios-soluciones",
  "unidad-21-going-to-planes-intenciones",
  "unidad-21-going-to-planes-intenciones-ejercicios-soluciones",
  "unidad-22-going-to-predicciones",
  "unidad-22-going-to-predicciones-ejercicios-soluciones",
  "unidad-23-will-wont-predicciones-promesas",
  "unidad-23-will-wont-predicciones-promesas-ejercicios-soluciones",
  "unidad-24-present-continuous-futuro",
  "unidad-24-present-continuous-futuro-ejercicios-soluciones",
  "unidad-25-futuro-going-to-will-present-continuous",
  "unidad-25-futuro-going-to-will-present-continuous-ejercicios-soluciones",
  "unidad-26-first-conditional",
  "unidad-26-first-conditional-ejercicios-soluciones",
  "unidad-27-zero-conditional",
  "unidad-27-zero-conditional-ejercicios-soluciones",
  "unidad-28-have-to-dont-have-to",
  "unidad-28-have-to-dont-have-to-ejercicios-soluciones",
  "unidad-29-could-habilidad-peticiones",
  "unidad-29-could-habilidad-peticiones-ejercicios-soluciones",
  "unidad-3-past-simple-verbos-irregulares",
  "unidad-3-past-simple-verbos-irregulares-ejercicios-soluciones",
  "unidad-31-phrasal-verbs-introduccion",
  "unidad-31-phrasal-verbs-introduccion-ejercicios-soluciones",
  "unidad-32-phrasal-verbs-separables",
  "unidad-32-phrasal-verbs-separables-ejercicios-soluciones",
  "unidad-33-gerunds-infinitives",
  "unidad-33-gerunds-infinitives-ejercicios-soluciones",
  "unidad-34-subject-object-questions",
  "unidad-34-subject-object-questions-ejercicios-soluciones",
  "unidad-35-some-any-much-many",
  "unidad-35-some-any-much-many-ejercicios-soluciones",
  "unidad-36-articles-a-an-the",
  "unidad-36-articles-a-an-the-ejercicios-soluciones",
  "unidad-37-would-like-vs-like",
  "unidad-37-would-like-vs-like-ejercicios-soluciones",
  "unidad-38-should-ought-to",
  "unidad-38-should-ought-to-ejercicios-soluciones",
  "unidad-39-adverbial-phrases",
  "unidad-39-adverbial-phrases-ejercicios-soluciones",
  "unidad-4-wh-questions-past-simple",
  "unidad-4-wh-questions-past-simple-ejercicios-soluciones",
  "unidad-40-module-4-review",
  "unidad-40-module-4-review-ejercicios-soluciones",
  "unidad-41-travel-transport",
  "unidad-41-travel-transport-ejercicios-soluciones",
  "unidad-42-accommodation",
  "unidad-42-accommodation-ejercicios-soluciones",
  "unidad-43-holiday-activities",
  "unidad-43-holiday-activities-ejercicios-soluciones",
  "unidad-44-the-weather",
  "unidad-44-the-weather-ejercicios-soluciones",
  "unidad-45-entertainment-media",
  "unidad-45-entertainment-media-ejercicios-soluciones",
  "unidad-46-shopping-services",
  "unidad-46-shopping-services-ejercicios-soluciones",
  "unidad-47-health-body",
  "unidad-47-health-body-ejercicios-soluciones",
  "unidad-48-clothes-fashion",
  "unidad-48-clothes-fashion-ejercicios-soluciones",
  "unidad-49-people-relationships",
  "unidad-49-people-relationships-ejercicios-soluciones",
  "unidad-5-comparativos-er-more-than",
  "unidad-5-comparativos-er-more-than-ejercicios-soluciones",
  "unidad-50-module-5-review",
  "unidad-50-module-5-review-ejercicios-soluciones",
  "unidad-51-making-suggestions",
  "unidad-51-making-suggestions-ejercicios-soluciones",
  "unidad-52-offers-requests",
  "unidad-52-offers-requests-ejercicios-soluciones",
  "unidad-53-expressing-opinions",
  "unidad-53-expressing-opinions-ejercicios-soluciones",
  "unidad-54-feelings-emotions",
  "unidad-54-feelings-emotions-ejercicios-soluciones",
  "unidad-55-the-environment",
  "unidad-55-the-environment-ejercicios-soluciones",
  "unidad-56-technology-communication",
  "unidad-56-technology-communication-ejercicios-soluciones",
  "unidad-57-work-education",
  "unidad-57-work-education-ejercicios-soluciones",
  "unidad-58-places-buildings",
  "unidad-58-places-buildings-ejercicios-soluciones",
  "unidad-59-linking-words",
  "unidad-59-linking-words-ejercicios-soluciones",
  "unidad-6-superlativos-est-the-most",
  "unidad-6-superlativos-est-the-most-ejercicios-soluciones",
  "unidad-60-module-6-review",
  "unidad-60-module-6-review-ejercicios-soluciones",
  "unidad-7-adverbios-modo-ly",
  "unidad-7-adverbios-modo-ly-ejercicios-soluciones",
  "unidad-8-preposiciones-tiempo-at-on-in",
  "unidad-8-preposiciones-tiempo-at-on-in-ejercicios-soluciones",
  "unidad-9-preposiciones-lugar-movimiento",
  "unidad-9-preposiciones-lugar-movimiento-ejercicios-soluciones",
]);

const COLLOCATION_SLUGS = new Set([
  "unidad-28-collocations-verb-noun-food",
  "unidad-29-collocations-adj-noun-psychology",
  "unidad-54-linkers-collocations-geopolitics",
]);

const IELTS_SLUGS = new Set([
  "ielts-computer-vs-papel",
  "ielts-dia-del-examen",
  "ielts-general-training-guia",
  "ielts-listening-estrategias",
  "ielts-reading-trucos",
  "ielts-speaking-estrategias",
  "ielts-speaking-part-3-preguntas",
  "ielts-vocabulario-academico",
  "ielts-vs-toefl-diferencias-cual-elegir",
  "ielts-writing-task-1-graficos",
  "ielts-writing-task-2-essay",
  "preparar-ielts-desde-b2",
  "ielts-vs-toefl-trabajo",
]);

const C1_ADVANCED_SLUGS = new Set([
  "cambridge-c1-advanced-guia",
  "key-word-transformations-cae",
  "listening-cae-consejos",
  "reading-cae-estrategias",
  "speaking-cae-avanzado",
  "use-of-english-c1-ejercicios",
  "word-formation-cae",
  "writing-essay-cae",
  "trucos-writing-c1-advanced",
  "vocabulario-c1-avanzado",
]);

function hasSlug(set: Set<string>, slug?: string | null): boolean {
  return set.has((slug ?? "").trim().toLowerCase());
}

export function shouldOfferEssentialGrammar(slug?: string | null): boolean {
  return hasSlug(ESSENTIAL_GRAMMAR_SLUGS, slug);
}

export function shouldOfferCollocationsBook(slug?: string | null): boolean {
  return hasSlug(COLLOCATION_SLUGS, slug);
}

export function shouldOfferIeltsBook(slug?: string | null): boolean {
  return hasSlug(IELTS_SLUGS, slug);
}

export function shouldOfferC1AdvancedBook(slug?: string | null): boolean {
  return hasSlug(C1_ADVANCED_SLUGS, slug);
}
