import type { AffiliateBook } from "@/lib/affiliates/book";

export const ESSENTIAL_GRAMMAR_AMAZON_URL = "https://link.amazon/B018DZDWS";
export const COLLOCATIONS_AMAZON_URL = "https://link.amazon/B0emi5gC7";
export const COLLOCATIONS_ADVANCED_AMAZON_URL = "https://link.amazon/B02dLfJmc";
export const IELTS_AMAZON_URL = "https://link.amazon/B0h9J7Rhh";
export const C1_ADVANCED_AMAZON_URL = "https://link.amazon/B087jx513";
export const LISTENING_CAE_AMAZON_URL = "https://link.amazon/B07IyJOy0";
export const WORD_FORMATION_CAE_AMAZON_URL = "https://link.amazon/B03zW3NCI";
export const ADVANCED_GRAMMAR_C1_C2_AMAZON_URL = "https://link.amazon/B0gMB4d16";
export const IT_COMMUNICATION_AMAZON_URL = "https://link.amazon/B07AQ8MwE";
export const PROFESSIONAL_EMAILS_AMAZON_URL = "https://link.amazon/B09W8hHz6";

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

export const COLLOCATIONS_ADVANCED_BOOK: AffiliateBook = {
  id: "collocations-in-use-advanced",
  url: COLLOCATIONS_ADVANCED_AMAZON_URL,
  title: "English Collocations in Use Advanced",
  eyebrow: "Collocations C1–C2",
  description:
    "Práctica de collocations de nivel avanzado para ampliar la precisión y naturalidad del inglés académico y profesional.",
  highlights: [
    "Nivel avanzado C1–C2",
    "Combinaciones de palabras en contexto",
    "Ejercicios para consolidar el vocabulario",
  ],
  tone: "emerald",
};

export const IELTS_BOOK: AffiliateBook = {
  id: "official-cambridge-guide-ielts",
  url: IELTS_AMAZON_URL,
  title: "The Official Cambridge Guide to IELTS",
  eyebrow: "Preparación IELTS",
  description:
    "Guía de preparación para IELTS con orientación y práctica de las destrezas evaluadas. Comprueba la ficha y edición exactas antes de publicar.",
  highlights: [
    "Preparación de las destrezas de IELTS",
    "Orientación para el examen",
    "Recurso de autoestudio",
  ],
  tone: "amber",
};

export const LISTENING_CAE_BOOK: AffiliateBook = {
  id: "c1-advanced-listening-practice",
  url: LISTENING_CAE_AMAZON_URL,
  title: "C1 Advanced Practice Tests",
  eyebrow: "Listening C1 Advanced",
  description:
    "Material de práctica para preparar el listening del Cambridge C1 Advanced y familiarizarse con el formato del examen.",
  highlights: [
    "Práctica de comprensión auditiva para C1 Advanced",
    "Preparación orientada al formato del examen",
    "Complemento para el estudio autónomo",
  ],
  tone: "sky",
};

export const WORD_FORMATION_CAE_BOOK: AffiliateBook = {
  id: "word-formation-cae-practice",
  url: WORD_FORMATION_CAE_AMAZON_URL,
  title: "C1 Advanced Practice Tests",
  eyebrow: "Word Formation C1 Advanced",
  description:
    "Material de práctica para preparar Use of English, con ejercicios de formación de palabras del Cambridge C1 Advanced.",
  highlights: [
    "Práctica de word formation para C1 Advanced",
    "Preparación orientada al formato del examen",
    "Complemento para el estudio autónomo",
  ],
  tone: "sky",
};

export const ADVANCED_GRAMMAR_C1_C2_BOOK: AffiliateBook = {
  id: "advanced-grammar-in-use-c1-c2",
  url: ADVANCED_GRAMMAR_C1_C2_AMAZON_URL,
  title: "Advanced Grammar in Use. Fourth edition",
  eyebrow: "Gramática avanzada C1–C2",
  description: "Manual de referencia y práctica gramatical para estudiantes avanzados de inglés, con explicaciones y ejercicios de nivel C1–C2.",
  highlights: [
    "Nivel avanzado C1–C2",
    "Explicaciones y ejercicios de gramática",
    "Para profundizar en estructuras avanzadas",
  ],
  tone: "sky",
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


export const IT_COMMUNICATION_BOOK: AffiliateBook = {
  id: "english-for-it-communication",
  url: IT_COMMUNICATION_AMAZON_URL,
  title: "English for IT Communication",
  eyebrow: "Inglés técnico para IT",
  description: "Guía de comunicación técnica en inglés para estudiantes y profesionales de informática, con ejemplos de emails, procedimientos, informes y especificaciones.",
  highlights: ["Comunicación técnica en IT", "Ejemplos de textos profesionales", "Para estudiantes y profesionales de informática"],
  tone: "sky",
};

export const PROFESSIONAL_EMAILS_BOOK: AffiliateBook = {
  id: "email-commercial-correspondence",
  url: PROFESSIONAL_EMAILS_AMAZON_URL,
  title: "Email and Commercial Correspondence",
  eyebrow: "Inglés profesional",
  description: "Guía para redactar emails y cartas profesionales con claridad, tono adecuado, peticiones, respuestas y frases útiles.",
  highlights: ["Estructura y tono de emails", "Frases útiles para correspondencia", "Comunicación profesional más clara"],
  tone: "emerald",
};

const ESSENTIAL_GRAMMAR_SLUGS = new Set([
  "ingles-a1-vs-a2",
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
  "unidad-30-repaso-modulo-3",
  "unidad-3-past-simple-verbos-irregulares",
  "unidad-3-past-simple-verbos-irregulares-ejercicios-soluciones",
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

const ADVANCED_COLLOCATION_SLUGS = new Set(["collocations-ingles-c1"]);
const IT_COMMUNICATION_SLUGS = new Set(["cv-ingles-tecnologia-it"]);
const PROFESSIONAL_EMAILS_SLUGS = new Set(["plantillas-emails-profesionales-ingles"]);


const IELTS_SLUGS = new Set([
  "ielts-general-training-guia",
  "ielts-listening-estrategias",
  "ielts-reading-trucos",
  "ielts-speaking-estrategias",
  "ielts-speaking-part-3-preguntas",
  "ielts-writing-task-1-graficos",
  "ielts-writing-task-2-essay",
  "preparar-ielts-desde-b2",
]);

const ADVANCED_GRAMMAR_C1_C2_SLUGS = new Set([
  "ejercicios-condicionales-c1-c2",
  "passive-reporting-verbs-guia-avanzada",
  "reporting-verbs-patterns-list",
  "inversiones-ingles-c1",
  "unidad-13-participle-clauses-viajes",
  "unidad-14-subjuntivo-gastronomia",
  "unidad-65-language-lab-condicionales-avanzados",
  "unidad-66-language-lab-subjuntivo-mandativo",
  "unidad-67-language-lab-inversion-enfasis",
  "condicionales-ingles-mixtos-avanzados",
  "ejercicios-condicionales-ingles-c1",
]);
const LISTENING_CAE_SLUGS = new Set(["listening-cae-consejos"]);
const WORD_FORMATION_CAE_SLUGS = new Set(["word-formation-cae"]);

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

export function shouldOfferItCommunication(slug?: string | null): boolean {
  return hasSlug(IT_COMMUNICATION_SLUGS, slug);
}

export function shouldOfferProfessionalEmails(slug?: string | null): boolean {
  return hasSlug(PROFESSIONAL_EMAILS_SLUGS, slug);
}

export function shouldOfferEssentialGrammar(slug?: string | null): boolean {
  return hasSlug(ESSENTIAL_GRAMMAR_SLUGS, slug);
}

export function shouldOfferCollocationsBook(slug?: string | null): boolean {
  return hasSlug(COLLOCATION_SLUGS, slug);
}

export function shouldOfferAdvancedCollocationsBook(slug?: string | null): boolean {
  return hasSlug(ADVANCED_COLLOCATION_SLUGS, slug);
}

export function shouldOfferIeltsBook(slug?: string | null): boolean {
  return hasSlug(IELTS_SLUGS, slug);
}

export function shouldOfferAdvancedGrammarC1C2(slug?: string | null): boolean {
  return hasSlug(ADVANCED_GRAMMAR_C1_C2_SLUGS, slug);
}

export function shouldOfferListeningCaeBook(slug?: string | null): boolean {
  return hasSlug(LISTENING_CAE_SLUGS, slug);
}

export function shouldOfferWordFormationCaeBook(slug?: string | null): boolean {
  return hasSlug(WORD_FORMATION_CAE_SLUGS, slug);
}

export function shouldOfferC1AdvancedBook(slug?: string | null): boolean {
  return hasSlug(C1_ADVANCED_SLUGS, slug);
}


/** Productos complementarios específicos seleccionados tras la revisión editorial. */
export const CAMBRIDGE_ESSENTIAL_DICTIONARY_AMAZON_URL = "https://link.amazon/B07Ubkp9c";
export const OXFORD_PICTURE_DICTIONARY_AMAZON_URL = "https://link.amazon/B0bV6SmUF";
export const IELTS_VOCABULARY_AMAZON_URL = "https://link.amazon/B04VKlypc";
export const ENGLISH_VOCABULARY_IN_USE_B1_AMAZON_URL = "https://link.amazon/B093v6IMv";

export const CAMBRIDGE_ESSENTIAL_DICTIONARY_BOOK: AffiliateBook = {
  id: "cambridge-essential-english-dictionary",
  url: CAMBRIDGE_ESSENTIAL_DICTIONARY_AMAZON_URL,
  title: "Cambridge Essential English Dictionary",
  eyebrow: "Diccionario de inglés A2",
  description: "Diccionario para estudiantes de nivel inicial e intermedio bajo, útil para consultar significado, uso y vocabulario en contexto, incluidos phrasal verbs.",
  highlights: ["Orientado a estudiantes de inglés", "Apoyo de vocabulario para nivel A2", "Complemento para estudiar phrasal verbs en contexto"],
  tone: "sky",
};

export const OXFORD_PICTURE_DICTIONARY_BOOK: AffiliateBook = {
  id: "oxford-picture-dictionary-english-spanish",
  url: OXFORD_PICTURE_DICTIONARY_AMAZON_URL,
  title: "Oxford Picture Dictionary, 3rd edition (English/Spanish)",
  eyebrow: "Vocabulario visual por temas",
  description: "Diccionario visual bilingüe para aprender y repasar vocabulario temático, como lugares, comunidad, ropa y actividades.",
  highlights: ["Vocabulario presentado mediante imágenes", "Edición English/Spanish", "Recurso complementario para temas concretos"],
  tone: "emerald",
};

export const IELTS_VOCABULARY_BOOK: AffiliateBook = {
  id: "ielts-vocabulary-bands-65-plus",
  url: IELTS_VOCABULARY_AMAZON_URL,
  title: "IELTS Vocabulary for Bands 6.5 and above",
  eyebrow: "Vocabulario académico IELTS",
  description: "Recurso específico para ampliar y practicar vocabulario orientado a IELTS, adecuado como complemento de una guía de vocabulario académico.",
  highlights: ["Enfoque específico en vocabulario para IELTS", "Práctica para objetivos de banda 6.5 o superior", "Complemento de la preparación general del examen"],
  tone: "amber",
};

export const ENGLISH_VOCABULARY_IN_USE_B1_BOOK: AffiliateBook = {
  id: "english-vocabulary-in-use-pre-intermediate-intermediate",
  url: ENGLISH_VOCABULARY_IN_USE_B1_AMAZON_URL,
  title: "English Vocabulary in Use: Pre-intermediate and Intermediate",
  eyebrow: "Vocabulario B1",
  description: "Manual de autoestudio para aprender vocabulario por temas con explicaciones y ejercicios, apropiado como apoyo de una unidad sobre adjetivos compuestos y viajes.",
  highlights: ["Nivel pre-intermediate e intermediate", "Vocabulario organizado por temas", "Ejercicios para consolidar palabras y expresiones"],
  tone: "emerald",
};

const CAMBRIDGE_ESSENTIAL_DICTIONARY_SLUGS = new Set([
  "unidad-31-phrasal-verbs-introduccion",
  "unidad-31-phrasal-verbs-introduccion-ejercicios-soluciones",
  "unidad-32-phrasal-verbs-separables",
  "unidad-32-phrasal-verbs-separables-ejercicios-soluciones",
]);
const OXFORD_PICTURE_DICTIONARY_SLUGS = new Set([
  "unidad-11-lugares-ciudad-ejercicios-soluciones",
  "unidad-56-mixed-grammar-sport",
  "unidad-56-mixed-grammar-sport-ejercicios-soluciones",
  "unidad-57-mixed-grammar-clothes-colours",
  "unidad-57-mixed-grammar-clothes-colours-ejercicios-soluciones",
  "unidad-58-mixed-grammar-places",
  "unidad-58-mixed-grammar-places-ejercicios-soluciones",
]);
const IELTS_VOCABULARY_SLUGS = new Set(["ielts-vocabulario-academico"]);
const ENGLISH_VOCABULARY_IN_USE_B1_SLUGS = new Set(["unidad-37-compound-adjectives-travel"]);

// Additional evergreen articles identified in the October 2026 affiliate URL sweep.
const PRACTICAL_USAGE_SLUGS = new Set([
  "diferencia-say-tell-speak-talk",
  "errores-comunes-ingles-hispanohablantes",
  "errores-frecuentes-ingles-b2",
  "expresiones-idiomaticas-ingles",
  "frases-ingles-conversacion",
  "ingles-para-trabajo-entrevistas",
  "modales-ingles-guia-completa",
  "preposiciones-ingles-guia-completa",
  "reported-speech-guia-completa",
  "verbos-irregulares-ingles-lista-completa",
]);

export function shouldOfferPracticalUsageBook(slug?: string | null): boolean {
  return hasSlug(PRACTICAL_USAGE_SLUGS, slug);
}


export function shouldOfferCambridgeEssentialDictionary(slug?: string | null): boolean {
  return hasSlug(CAMBRIDGE_ESSENTIAL_DICTIONARY_SLUGS, slug);
}
export function shouldOfferOxfordPictureDictionary(slug?: string | null): boolean {
  return hasSlug(OXFORD_PICTURE_DICTIONARY_SLUGS, slug);
}
export function shouldOfferIeltsVocabularyBook(slug?: string | null): boolean {
  return hasSlug(IELTS_VOCABULARY_SLUGS, slug);
}
export function shouldOfferEnglishVocabularyInUseB1(slug?: string | null): boolean {
  return hasSlug(ENGLISH_VOCABULARY_IN_USE_B1_SLUGS, slug);
}
