import { affiliateBookForSlug } from "@/lib/affiliates/for-article";
import {
  PASO_A_PASO_AMAZON_URL,
  shouldOfferPasoAPaso,
} from "@/lib/affiliates/paso-a-paso";

describe("paso a paso affiliate", () => {
  it("keeps the Amazon affiliate URL", () => {
    expect(PASO_A_PASO_AMAZON_URL).toBe("https://link.amazon/B07z0nAvN");
  });

  it("offers the beginner grammar book on A1 foundation articles", () => {
    expect(shouldOfferPasoAPaso("ingles-a1")).toBe(true);
    expect(shouldOfferPasoAPaso("unidad-2-to-be-pronombres-nacionalidades")).toBe(true);
    expect(shouldOfferPasoAPaso("unidad-23-there-is-there-are")).toBe(true);
    expect(affiliateBookForSlug("unidad-5-present-simple-rutinas")?.url).toBe(
      PASO_A_PASO_AMAZON_URL,
    );
  });

  it("does not offer it on intermediate grammar or other topics", () => {
    expect(shouldOfferPasoAPaso("present-perfect-vs-past-simple")).toBe(false);
    expect(shouldOfferPasoAPaso("unidad-56-restaurante-pedidos")).toBe(false);
    expect(shouldOfferPasoAPaso("phrasal-verbs-guia-b2")).toBe(false);
  });
});
