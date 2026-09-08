import {
  canonicalLinkHeaderValue,
  getCanonicalUrl,
  normalizeCanonicalPath,
} from "@/lib/seo/canonical";

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
      '<https://linguafly.app/blog/curso-a1>; rel="canonical"',
    );
  });

  it("normalizes trailing slashes and emits a Link header Google can use", () => {
    expect(normalizeCanonicalPath("/cookies/")).toBe("/cookies");
    expect(canonicalLinkHeaderValue("/privacidad", "utm_medium=email")).toBe(
      '<https://linguafly.app/privacidad>; rel="canonical"',
    );
  });
});
