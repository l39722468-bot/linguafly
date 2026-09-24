import { affiliateBookForSlug } from "@/lib/affiliates/for-article";
import { MURPHY_GRAMMAR_AMAZON_URL, shouldOfferMurphyGrammar } from "@/lib/affiliates/murphy-grammar";

describe("murphy grammar affiliate", () => {
  it("keeps the Amazon affiliate URL", () => {
    expect(MURPHY_GRAMMAR_AMAZON_URL).toBe("https://link.amazon/B01Kk95OQ");
  });

  it("offers the intermediate grammar book on B1-B2 grammar and exam guides", () => {
    expect(shouldOfferMurphyGrammar("mejores-libros-aprender-ingles")).toBe(true);
    expect(shouldOfferMurphyGrammar("cambridge-b2-first-estrategias-aprobar")).toBe(true);
    expect(shouldOfferMurphyGrammar("present-perfect-vs-past-simple")).toBe(true);
    expect(shouldOfferMurphyGrammar("verbos-modales-ingles-guia")).toBe(true);
    expect(affiliateBookForSlug("ingles-b2")?.url).toBe(MURPHY_GRAMMAR_AMAZON_URL);
  });

  it("does not offer it on pronunciation, beginner or advanced pages", () => {
    expect(shouldOfferMurphyGrammar("pronunciacion-ingles-guia-completa")).toBe(false);
    expect(shouldOfferMurphyGrammar("verbos-modales-ingles-avanzados")).toBe(false);
    expect(shouldOfferMurphyGrammar("phrasal-verbs-principiantes")).toBe(false);
    expect(shouldOfferMurphyGrammar("ingles-a1")).toBe(false);
    expect(shouldOfferMurphyGrammar("cambridge-c1-advanced-guia")).toBe(false);
  });

  it("keeps the Aptis book on Aptis General articles", () => {
    expect(affiliateBookForSlug("aptis-general-guia-completa")?.url).toBe(
      "https://link.amazon/B0hv2bAg0",
    );
  });
});
