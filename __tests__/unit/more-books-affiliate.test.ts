import { affiliateBookForSlug } from "@/lib/affiliates/for-article";
import {
  C1_ADVANCED_AMAZON_URL,
  COLLOCATIONS_AMAZON_URL,
  ESSENTIAL_GRAMMAR_AMAZON_URL,
  IELTS_AMAZON_URL,
} from "@/lib/affiliates/more-books";

describe("more amazon books", () => {
  it("keeps the four affiliate URLs", () => {
    expect(ESSENTIAL_GRAMMAR_AMAZON_URL).toBe("https://link.amazon/B018DZDWS");
    expect(COLLOCATIONS_AMAZON_URL).toBe("https://link.amazon/B0emi5gC7");
    expect(IELTS_AMAZON_URL).toBe("https://link.amazon/B0fFwIKQp");
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
