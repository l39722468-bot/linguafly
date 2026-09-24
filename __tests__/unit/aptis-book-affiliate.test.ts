import {
  APTIS_BOOK_AMAZON_URL,
  shouldOfferAptisBook,
} from "@/lib/affiliates/aptis-book";

describe("aptis book affiliate", () => {
  it("keeps the Amazon affiliate URL", () => {
    expect(APTIS_BOOK_AMAZON_URL).toBe("https://link.amazon/B0hv2bAg0");
  });

  it("offers the book on Aptis General pages", () => {
    expect(shouldOfferAptisBook({ slug: "aptis-general-guia-completa" })).toBe(true);
    expect(
      shouldOfferAptisBook({ slug: "aptis-general-speaking-writing-tips" }),
    ).toBe(true);
    expect(
      shouldOfferAptisBook({ slug: "dele-vs-cambridge-vs-ielts-vs-aptis" }),
    ).toBe(true);
    expect(shouldOfferAptisBook({ hubKeyword: "aptis-general-b1" })).toBe(true);
  });

  it("does not offer the book on other exams", () => {
    expect(shouldOfferAptisBook({ slug: "aptis-a2-guia-completa" })).toBe(false);
    expect(shouldOfferAptisBook({ slug: "aptis-advanced-c1-guia" })).toBe(false);
    expect(shouldOfferAptisBook({ slug: "ielts-listening-estrategias" })).toBe(false);
    expect(shouldOfferAptisBook({ hubKeyword: "ielts-vs-toefl-2026" })).toBe(false);
  });
});
