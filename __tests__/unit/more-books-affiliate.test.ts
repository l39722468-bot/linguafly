import { affiliateBookForSlug } from "@/lib/affiliates/for-article";
import {
  C1_ADVANCED_AMAZON_URL,
  ADVANCED_GRAMMAR_C1_C2_AMAZON_URL,
  COLLOCATIONS_AMAZON_URL,
  ESSENTIAL_GRAMMAR_AMAZON_URL,
  IELTS_AMAZON_URL,
} from "@/lib/affiliates/more-books";

describe("more amazon books", () => {
  it("keeps the four affiliate URLs", () => {
    expect(ESSENTIAL_GRAMMAR_AMAZON_URL).toBe("https://link.amazon/B018DZDWS");
    expect(COLLOCATIONS_AMAZON_URL).toBe("https://link.amazon/B0emi5gC7");
    expect(IELTS_AMAZON_URL).toBe("https://link.amazon/B0h9J7Rhh");
    expect(C1_ADVANCED_AMAZON_URL).toBe("https://link.amazon/B087jx513");
  });

  it("maps each book to its articles", () => {
    expect(affiliateBookForSlug("unidad-11-present-perfect-introduccion")?.url).toBe(
      ESSENTIAL_GRAMMAR_AMAZON_URL,
    );
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

  it("maps A2 course units 23–42 to their appropriate affiliate offer", () => {
    const slugs = [
      "unidad-23-will-wont-predicciones-promesas",
      "unidad-24-present-continuous-futuro",
      "unidad-25-futuro-going-to-will-present-continuous",
      "unidad-26-first-conditional",
      "unidad-27-zero-conditional",
      "unidad-28-have-to-dont-have-to",
      "unidad-29-could-habilidad-peticiones",
      "unidad-30-repaso-modulo-3",
      "unidad-31-phrasal-verbs-introduccion",
      "unidad-32-phrasal-verbs-separables",
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

    for (const slug of slugs) {
      expect(affiliateBookForSlug(slug)?.url).toBe(ESSENTIAL_GRAMMAR_AMAZON_URL);
    }
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
});
