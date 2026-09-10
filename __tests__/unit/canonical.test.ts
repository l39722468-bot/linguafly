import {
  canonicalAlternates,
  canonicalLinkHeaderValue,
  getCanonicalUrl,
  languageAlternates,
  llmMarkdownAlternates,
  normalizeCanonicalPath,
} from "@/lib/seo/canonical";
import { SITE_SERP_TITLE } from "@/lib/site-catalog";

describe("canonical URLs", () => {
  const previousSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://linguafly.app";
  });

  afterEach(() => {
    if (previousSiteUrl === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = previousSiteUrl;
    }
  });

  it("strips tracking and duplicate-content query params", () => {
    expect(
      getCanonicalUrl(
        "/curso-a1/unit-30",
        "fromArticle=/blog/curso-a1/unidad-19-meses-fechas-cumpleanos",
      ),
    ).toBe("https://linguafly.app/curso-a1/unit-30");

    expect(
      getCanonicalUrl(
        "/blog/ejercicios-relacionados",
        new URLSearchParams("articulo=unidad-54-how-much-how-many"),
      ),
    ).toBe("https://linguafly.app/blog/ejercicios-relacionados");

    expect(getCanonicalUrl("/curso-b2/unit-6", "index=3&utm_source=blog")).toBe(
      "https://linguafly.app/curso-b2/unit-6",
    );
  });

  it("keeps paginated blog indexes in the canonical", () => {
    expect(getCanonicalUrl("/blog/gramatica", "page=2")).toBe(
      "https://linguafly.app/blog/gramatica?page=2",
    );
    expect(getCanonicalUrl("/blog/gramatica", "page=1")).toBe(
      "https://linguafly.app/blog/gramatica",
    );
  });

  it("points parked course URLs at the blog section Google can index", () => {
    expect(canonicalLinkHeaderValue("/blog/curso-a1")).toBe(
      '<https://linguafly.app/blog/curso-a1>; rel="canonical", <https://linguafly.app/blog/curso-a1>; rel="alternate"; hreflang="es", <https://linguafly.app/blog/curso-a1>; rel="alternate"; hreflang="x-default"',
    );
  });

  it("always emits apex canonicals even if SITE_URL is www", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://www.linguafly.app";
    expect(getCanonicalUrl("/blog/gramatica/have-something-done-ingles")).toBe(
      "https://linguafly.app/blog/gramatica/have-something-done-ingles",
    );
  });

  it("normalizes trailing slashes and emits a Link header Google can use", () => {
    expect(normalizeCanonicalPath("/cookies/")).toBe("/cookies");
    expect(canonicalLinkHeaderValue("/privacidad", "utm_medium=email")).toBe(
      '<https://linguafly.app/privacidad>; rel="canonical", <https://linguafly.app/privacidad>; rel="alternate"; hreflang="es", <https://linguafly.app/privacidad>; rel="alternate"; hreflang="x-default"',
    );
  });

  it("declares Spanish hreflang on the canonical URL", () => {
    expect(languageAlternates("https://linguafly.app/")).toEqual({
      es: "https://linguafly.app/",
      "x-default": "https://linguafly.app/",
    });
    expect(canonicalAlternates("/idiomas").languages).toEqual({
      es: "https://linguafly.app/idiomas",
      "x-default": "https://linguafly.app/idiomas",
    });
    expect(llmMarkdownAlternates("/").languages.es).toBe("https://linguafly.app/");
  });

  it("keeps the homepage title short enough for the SERP snippet", () => {
    expect(SITE_SERP_TITLE.length).toBeLessThanOrEqual(60);
    expect(SITE_SERP_TITLE).toMatch(/idiomas/i);
    expect(SITE_SERP_TITLE).toContain("alimentación");
    expect(SITE_SERP_TITLE).toContain("entrenamiento");
    expect(SITE_SERP_TITLE).toMatch(/IA|inteligencia/i);
  });
});
