import { affiliateBookForSlug } from "@/lib/affiliates/for-article";
import {
  C1_ADVANCED_AMAZON_URL,
  ADVANCED_GRAMMAR_C1_C2_AMAZON_URL,
  COLLOCATIONS_AMAZON_URL,
  ESSENTIAL_GRAMMAR_AMAZON_URL,
  IELTS_AMAZON_URL,
  CAMBRIDGE_ESSENTIAL_DICTIONARY_AMAZON_URL,
  OXFORD_PICTURE_DICTIONARY_AMAZON_URL,
  IELTS_VOCABULARY_AMAZON_URL,
  ENGLISH_VOCABULARY_IN_USE_B1_AMAZON_URL,
} from "@/lib/affiliates/more-books";

describe("more amazon books", () => {
  it("keeps the four affiliate URLs", () => {
    expect(ESSENTIAL_GRAMMAR_AMAZON_URL).toBe("https://link.amazon/B018DZDWS");
    expect(COLLOCATIONS_AMAZON_URL).toBe("https://link.amazon/B0emi5gC7");
    expect(IELTS_AMAZON_URL).toBe("https://link.amazon/B0h9J7Rhh");
    expect(C1_ADVANCED_AMAZON_URL).toBe("https://link.amazon/B087jx513");
    expect(CAMBRIDGE_ESSENTIAL_DICTIONARY_AMAZON_URL).toBe("https://link.amazon/B07Ubkp9c");
    expect(OXFORD_PICTURE_DICTIONARY_AMAZON_URL).toBe("https://link.amazon/B0bV6SmUF");
    expect(IELTS_VOCABULARY_AMAZON_URL).toBe("https://link.amazon/B04VKlypc");
    expect(ENGLISH_VOCABULARY_IN_USE_B1_AMAZON_URL).toBe("https://link.amazon/B093v6IMv");
  });

  it("maps each book to its articles", () => {
    expect(affiliateBookForSlug("unidad-11-present-perfect-introduccion")?.url).toBe(
      ESSENTIAL_GRAMMAR_AMAZON_URL,
    );
    expect(affiliateBookForSlug("unidad-11-lugares-ciudad-ejercicios-soluciones")?.url).toBe(OXFORD_PICTURE_DICTIONARY_AMAZON_URL);
    expect(affiliateBookForSlug("ielts-vocabulario-academico")?.url).toBe(IELTS_VOCABULARY_AMAZON_URL);
    expect(affiliateBookForSlug("unidad-37-compound-adjectives-travel")?.url).toBe(ENGLISH_VOCABULARY_IN_USE_B1_AMAZON_URL);
    for (const slug of [
      "unidad-56-mixed-grammar-sport",
      "unidad-57-mixed-grammar-clothes-colours",
      "unidad-58-mixed-grammar-places",
    ]) {
      expect(affiliateBookForSlug(slug)?.url).toBe(OXFORD_PICTURE_DICTIONARY_AMAZON_URL);
    }
    expect(affiliateBookForSlug("unidad-28-collocations-verb-noun-food")?.url).toBe(
      COLLOCATIONS_AMAZON_URL,
    );
    expect(affiliateBookForSlug("ielts-listening-estrategias")?.url).toBe(IELTS_AMAZON_URL);
    expect(affiliateBookForSlug("cambridge-c1-advanced-guia")?.url).toBe(
      C1_ADVANCED_AMAZON_URL,
    );
  });

  it("maps the next twenty A2 course articles to Essential Grammar in Use", () => {
    const slugs = [
      "unidad-2-past-simple-verbos-regulares",
      "unidad-3-past-simple-verbos-irregulares",
      "unidad-4-wh-questions-past-simple",
      "unidad-5-comparativos-er-more-than",
      "unidad-6-superlativos-est-the-most",
      "unidad-7-adverbios-modo-ly",
      "unidad-8-preposiciones-tiempo-at-on-in",
      "unidad-9-preposiciones-lugar-movimiento",
      "unidad-10-repaso-modulo-1",
      "unidad-11-present-perfect-introduccion",
      "unidad-12-present-perfect-ever-never",
      "unidad-13-present-perfect-already-yet",
      "unidad-14-present-perfect-just",
      "unidad-15-present-perfect-vs-past-simple",
      "unidad-16-past-continuous",
      "unidad-17-past-simple-past-continuous",
      "unidad-18-for-since",
      "unidad-19-how-questions",
      "unidad-21-going-to-planes-intenciones",
      "unidad-22-going-to-predicciones",
    ];

    for (const slug of slugs) {
      expect(affiliateBookForSlug(slug)?.url).toBe(ESSENTIAL_GRAMMAR_AMAZON_URL);
    }
  });

  it("maps A2 course units 23–42 to the relevant affiliate offer", () => {
    const grammarSlugs = [
      "unidad-23-will-wont-predicciones-promesas",
      "unidad-24-present-continuous-futuro",
      "unidad-25-futuro-going-to-will-present-continuous",
      "unidad-26-first-conditional",
      "unidad-27-zero-conditional",
      "unidad-28-have-to-dont-have-to",
      "unidad-29-could-habilidad-peticiones",
      "unidad-30-repaso-modulo-3",
      "unidad-33-gerunds-infinitives",
      "unidad-34-subject-object-questions",
      "unidad-35-some-any-much-many",
      "unidad-36-articles-a-an-the",
      "unidad-37-would-like-vs-like",
      "unidad-38-should-ought-to",
      "unidad-39-adverbial-phrases",
      "unidad-40-module-4-review",
      "unidad-41-travel-transport",
      "unidad-42-accommodation",
    ];

    for (const slug of grammarSlugs) {
      expect(affiliateBookForSlug(slug)?.url).toBe(ESSENTIAL_GRAMMAR_AMAZON_URL);
    }

    // The intermediate phrasal-verbs book is deliberately excluded for these A2 lessons,
    // and a general grammar book is not specific enough to force a card here.
    for (const slug of [
      "unidad-31-phrasal-verbs-introduccion",
      "unidad-32-phrasal-verbs-separables",
      "unidad-31-phrasal-verbs-introduccion-ejercicios-soluciones",
      "unidad-32-phrasal-verbs-separables-ejercicios-soluciones",
    ]) {
      expect(affiliateBookForSlug(slug)?.url).toBe(CAMBRIDGE_ESSENTIAL_DICTIONARY_AMAZON_URL);
    }
  });

  it("maps remaining A2 exercise workbooks and focused B1 grammar units", () => {
    const a2WorkbookSlugs = [
      "unidad-45-entertainment-media-ejercicios-soluciones",
      "unidad-46-shopping-services-ejercicios-soluciones",
      "unidad-47-health-body-ejercicios-soluciones",
      "unidad-48-clothes-fashion-ejercicios-soluciones",
      "unidad-49-people-relationships-ejercicios-soluciones",
      "unidad-50-module-5-review-ejercicios-soluciones",
      "unidad-51-making-suggestions-ejercicios-soluciones",
      "unidad-52-offers-requests-ejercicios-soluciones",
      "unidad-53-expressing-opinions-ejercicios-soluciones",
      "unidad-54-feelings-emotions-ejercicios-soluciones",
      "unidad-55-the-environment-ejercicios-soluciones",
      "unidad-56-technology-communication-ejercicios-soluciones",
      "unidad-57-work-education-ejercicios-soluciones",
      "unidad-58-places-buildings-ejercicios-soluciones",
      "unidad-59-linking-words-ejercicios-soluciones",
      "unidad-60-module-6-review-ejercicios-soluciones",
    ];

    for (const slug of a2WorkbookSlugs) {
      expect(affiliateBookForSlug(slug)?.url).toBe(ESSENTIAL_GRAMMAR_AMAZON_URL);
    }

    // A2→B1 is a broad review, so do not force a commercial recommendation.
    expect(affiliateBookForSlug("unidad-1-repaso-a2-b1")).toBeNull();

    for (const slug of [
      "unidad-2-present-perfect-continuous",
      "unidad-3-past-perfect",
      "unidad-4-past-vs-present-perfect",
    ]) {
      expect(affiliateBookForSlug(slug)?.url).toBe("https://link.amazon/B05erVGD8");
    }
  });

  it("maps B1 course units 5–24 selectively by topic", () => {
    const grammarSlugs = [
      "unidad-6-future-will-going-to",
      "unidad-7-was-were-going-to",
      "unidad-8-modals-deduction",
      "unidad-9-used-to-be-get-used-to",
      "unidad-11-first-conditional-weather",
      "unidad-12-second-conditional",
      "unidad-13-first-vs-second-conditional",
      "unidad-14-third-conditional",
      "unidad-16-passive-voice-technology",
      "unidad-17-modal-passive-work",
      "unidad-18-reported-speech-statements",
      "unidad-19-reported-speech-questions",
      "unidad-21-gerund-infinitive-hobbies",
      "unidad-22-gerund-infinitive-house",
    ];
    for (const slug of grammarSlugs) {
      expect(affiliateBookForSlug(slug)?.url).toBe("https://link.amazon/B05erVGD8");
    }

    for (const slug of [
      "unidad-5-repaso-1-4",
      "unidad-10-repaso-6-9",
      "unidad-15-repaso-11-14",
      "unidad-20-repaso-16-19",
    ]) {
      expect(affiliateBookForSlug(slug)).toBeNull();
    }

    expect(affiliateBookForSlug("unidad-23-phrasal-verbs-daily")?.url).toBe(
      "https://link.amazon/B05alffpy",
    );
    expect(affiliateBookForSlug("unidad-24-phrasal-verbs-shopping")?.url).toBe(
      "https://link.amazon/B05alffpy",
    );
  });

  it("maps focused B1 units 26–44 to Murphy but skips reviews and lexical-only units", () => {
    const grammarSlugs = [
      "unidad-26-quantifiers-food",
      "unidad-27-both-either-neither",
      "unidad-28-articles-buildings",
      "unidad-29-reflexive-pronouns",
      "unidad-31-defining-relative-nature",
      "unidad-32-nondefining-relative-environment",
      "unidad-33-question-tags-services",
      "unidad-34-ed-ing-adjectives-feelings",
      "unidad-36-so-such-intensifiers",
      "unidad-38-contrast-opinions",
      "unidad-39-purpose-reason-explaining",
      "unidad-41-verb-preposition-dependent",
      "unidad-42-adjective-preposition-feelings",
      "unidad-43-during-for-while-time",
      "unidad-44-for-since-from-time",
    ];
    for (const slug of grammarSlugs) {
      expect(affiliateBookForSlug(slug)?.url).toBe("https://link.amazon/B05erVGD8");
    }

    for (const slug of [
      "unidad-25-repaso-21-24",
      "unidad-30-repaso-26-29",
      "unidad-35-repaso-31-34",
      "unidad-40-repaso-36-39",
    ]) {
      expect(affiliateBookForSlug(slug)).toBeNull();
    }
  });

  it("maps B1 advice, preferences, necessity, exercise workbooks and exam prep selectively", () => {
    const grammarSlugs = [
      "unidad-46-had-better-its-time-advice",
      "unidad-47-would-rather-preferences",
      "unidad-49-need-neednt-necessity",
      "unidad-2-present-perfect-continuous-ejercicios-soluciones",
      "unidad-3-past-perfect-ejercicios-soluciones",
      "unidad-4-past-vs-present-perfect-ejercicios-soluciones",
    ];
    for (const slug of grammarSlugs) {
      expect(affiliateBookForSlug(slug)?.url).toBe("https://link.amazon/B05erVGD8");
    }

    expect(affiliateBookForSlug("unidad-48-phrasal-verbs-work-study")?.url).toBe(
      "https://link.amazon/B05alffpy",
    );
    expect(affiliateBookForSlug("unidad-48-phrasal-verbs-work-study-ejercicios-soluciones")?.url).toBe(
      "https://link.amazon/B05alffpy",
    );
    expect(affiliateBookForSlug("unidad-59-exam-preparation-strategies")?.url).toBe(
      "https://link.amazon/B0c7dLGlB",
    );
    expect(affiliateBookForSlug("unidad-59-exam-preparation-strategies-ejercicios-soluciones")?.url).toBe(
      "https://link.amazon/B0c7dLGlB",
    );

    for (const slug of [
      "unidad-45-repaso-41-44",
      "unidad-50-repaso-46-49",
      "unidad-51-review-conditionals",
      "unidad-52-review-passive-reported",
      "unidad-53-review-modals",
      "unidad-54-review-tenses",
      "unidad-55-repaso-51-54",
      "unidad-60-final-b1-review",
      "unidad-1-repaso-a2-b1-ejercicios-soluciones",
    ]) {
      expect(affiliateBookForSlug(slug)).toBeNull();
    }
  });


  it("maps B1 exercise workbooks units 5–24 selectively", () => {
    const grammarWorkbooks = [
      "unidad-6-future-will-going-to-ejercicios-soluciones",
      "unidad-7-was-were-going-to-ejercicios-soluciones",
      "unidad-8-modals-deduction-ejercicios-soluciones",
      "unidad-9-used-to-be-get-used-to-ejercicios-soluciones",
      "unidad-11-first-conditional-weather-ejercicios-soluciones",
      "unidad-12-second-conditional-ejercicios-soluciones",
      "unidad-13-first-vs-second-conditional-ejercicios-soluciones",
      "unidad-14-third-conditional-ejercicios-soluciones",
      "unidad-16-passive-voice-technology-ejercicios-soluciones",
      "unidad-17-modal-passive-work-ejercicios-soluciones",
      "unidad-18-reported-speech-statements-ejercicios-soluciones",
      "unidad-19-reported-speech-questions-ejercicios-soluciones",
      "unidad-21-gerund-infinitive-hobbies-ejercicios-soluciones",
      "unidad-22-gerund-infinitive-house-ejercicios-soluciones",
    ];
    for (const slug of grammarWorkbooks) {
      expect(affiliateBookForSlug(slug)?.url).toBe("https://link.amazon/B05erVGD8");
    }

    for (const slug of [
      "unidad-5-repaso-1-4-ejercicios-soluciones",
      "unidad-10-repaso-6-9-ejercicios-soluciones",
      "unidad-15-repaso-11-14-ejercicios-soluciones",
      "unidad-20-repaso-16-19-ejercicios-soluciones",
    ]) {
      expect(affiliateBookForSlug(slug)).toBeNull();
    }

    expect(affiliateBookForSlug("unidad-23-phrasal-verbs-daily-ejercicios-soluciones")?.url).toBe(
      "https://link.amazon/B05alffpy",
    );
    expect(affiliateBookForSlug("unidad-24-phrasal-verbs-shopping-ejercicios-soluciones")?.url).toBe(
      "https://link.amazon/B05alffpy",
    );
  });

  it("maps the next ten advanced grammar articles to Advanced Grammar in Use", () => {
    expect(ADVANCED_GRAMMAR_C1_C2_AMAZON_URL).toBe("https://link.amazon/B0gMB4d16");
    const slugs = [
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
    ];

    for (const slug of slugs) {
      expect(affiliateBookForSlug(slug)?.url).toBe(ADVANCED_GRAMMAR_C1_C2_AMAZON_URL);
    }
  });

  it("does not replace books already on other pages", () => {
    expect(affiliateBookForSlug("aptis-general-guia-completa")?.url).toBe(
      "https://link.amazon/B0hv2bAg0",
    );
    expect(affiliateBookForSlug("dele-vs-cambridge-vs-ielts-vs-aptis")?.url).toBe(
      "https://link.amazon/B0hv2bAg0",
    );
    expect(affiliateBookForSlug("unidad-2-to-be-pronombres-nacionalidades")?.url).toBe(
      "https://link.amazon/B07z0nAvN",
    );
    expect(affiliateBookForSlug("unidad-20-repaso-modulo-2")).toBeNull();
  });

  it("maps additional practical English articles to a context-relevant book", () => {
    for (const slug of [
      "cv-ingles-tecnologia-it",
      "plantillas-emails-profesionales-ingles",
      "email-formal-ingles-estructura",
      "liderar-reuniones-ingles-frases",
      "ingles-para-trabajar-en-inteligencia-artificial",
    ]) {
      expect(affiliateBookForSlug(slug)?.url).toBe(
        slug === "cv-ingles-tecnologia-it" || slug === "ingles-para-trabajar-en-inteligencia-artificial"
          ? "https://link.amazon/B07AQ8MwE"
          : "https://link.amazon/B09W8hHz6",
      );
    }
    expect(affiliateBookForSlug("mejores-libros-aprender-ingles")).toBeNull();
    expect(affiliateBookForSlug("mejores-canales-youtube-aprender-ingles")).toBeNull();
  });

});
