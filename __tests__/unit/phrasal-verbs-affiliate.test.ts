import { affiliateBookForSlug } from "@/lib/affiliates/for-article";
import {
  PHRASAL_VERBS_AMAZON_URL,
  shouldOfferPhrasalVerbsBook,
} from "@/lib/affiliates/phrasal-verbs";

describe("phrasal verbs affiliate", () => {
  it("keeps the Amazon affiliate URL", () => {
    expect(PHRASAL_VERBS_AMAZON_URL).toBe("https://link.amazon/B0fg732an");
  });

  it("offers the intermediate book on B1-B2 phrasal verb articles", () => {
    expect(shouldOfferPhrasalVerbsBook("phrasal-verbs-guia-b2")).toBe(true);
    expect(shouldOfferPhrasalVerbsBook("phrasal-verbs-with-get")).toBe(true);
    expect(shouldOfferPhrasalVerbsBook("unidad-23-phrasal-verbs-daily")).toBe(true);
    expect(shouldOfferPhrasalVerbsBook("unidad-38-phrasal-verbs-5-run-set-take-leisure")).toBe(
      true,
    );
    expect(affiliateBookForSlug("phrasal-verbs-b2-fce")?.url).toBe(PHRASAL_VERBS_AMAZON_URL);
  });

  it("does not offer it on beginner or advanced phrasal verb pages", () => {
    expect(shouldOfferPhrasalVerbsBook("phrasal-verbs-principiantes")).toBe(false);
    expect(shouldOfferPhrasalVerbsBook("phrasal-verbs-c1-avanzados")).toBe(false);
    expect(shouldOfferPhrasalVerbsBook("unidad-31-phrasal-verbs-introduccion")).toBe(false);
    expect(shouldOfferPhrasalVerbsBook("unidad-61-language-lab-phrasal-verbs-argumento")).toBe(
      false,
    );
    expect(shouldOfferPhrasalVerbsBook("present-perfect-vs-past-simple")).toBe(false);
  });
});
