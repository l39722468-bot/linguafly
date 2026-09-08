import {
  getParkedPageRedirect,
  isPublicArticleCategory,
  isPublicSitePath,
} from "@/lib/site-catalog";
import robots from "@/app/robots";

describe("site catalog", () => {
  it("treats magazine and English-learning article categories as public", () => {
    expect(isPublicArticleCategory("idiomas")).toBe(true);
    expect(isPublicArticleCategory("alimentacion")).toBe(true);
    expect(isPublicArticleCategory("entrenamiento")).toBe(true);
    expect(isPublicArticleCategory("gramatica")).toBe(true);
    expect(isPublicArticleCategory("viajes")).toBe(true);
    expect(isPublicArticleCategory("curso-a1")).toBe(true);
    expect(isPublicArticleCategory("curso-c1")).toBe(true);
    expect(isPublicArticleCategory("fitness")).toBe(false);
  });

  it("keeps magazine routes public", () => {
    expect(isPublicSitePath("/")).toBe(true);
    expect(isPublicSitePath("/blog")).toBe(true);
    expect(isPublicSitePath("/blog/idiomas/como-empezar-a-aprender-un-idioma")).toBe(true);
    expect(isPublicSitePath("/alimentacion")).toBe(true);
    expect(isPublicSitePath("/entrenamiento")).toBe(true);
    expect(isPublicSitePath("/api/articles/foo")).toBe(true);
    expect(isPublicSitePath("/sitemaps/0.xml")).toBe(true);
    expect(isPublicSitePath("/sitemap.xml")).toBe(true);
  });

  it("republishes English-learning article URLs and parks the rest of the old site", () => {
    expect(getParkedPageRedirect("/blog/viajes/ingles-para-viajar")).toBeNull();
    expect(getParkedPageRedirect("/blog/gramatica")).toBeNull();
    expect(getParkedPageRedirect("/blog/curso-a1/unidad-20-repaso-modulo-2")).toBeNull();
    expect(getParkedPageRedirect("/blog/temas")).toBe("/blog");
    expect(getParkedPageRedirect("/blog/temas/present-perfect")).toBe("/blog");
    expect(getParkedPageRedirect("/curso-a1")).toBe("/blog/curso-a1");
    expect(getParkedPageRedirect("/curso-a1/unit-30")).toBe("/blog/curso-a1");
    expect(getParkedPageRedirect("/curso-b2/unit-6")).toBe("/blog/curso-b2");
    expect(getParkedPageRedirect("/curso-c2/unit-57")).toBe("/blog/examenes");
    expect(getParkedPageRedirect("/curso-camarero-a1/unit-1")).toBe("/blog/trabajo");
    expect(getParkedPageRedirect("/blog/ejercicios-relacionados")).toBe("/blog");
    expect(getParkedPageRedirect("/frases-en-ingles")).toBe("/");
    expect(getParkedPageRedirect("/vocabulario")).toBe("/");
    expect(getParkedPageRedirect("/fitness")).toBe("/entrenamiento");
    expect(getParkedPageRedirect("/idiomas")).toBeNull();
    expect(getParkedPageRedirect("/blog/entrenamiento/rutina-fuerza-principiantes-casa")).toBeNull();
  });
});

describe("robots", () => {
  it("allows English article prefixes and still blocks parked platforms", () => {
    const spec = robots();
    const disallow = spec.rules[0].disallow ?? [];
    expect(disallow).not.toContain("/blog/gramatica");
    expect(disallow).not.toContain("/blog/viajes");
    expect(disallow).not.toContain("/blog/curso-a1");
    expect(disallow).not.toContain("/curso-a1");
    expect(disallow).not.toContain("/curso-b2");
    expect(disallow).toContain("/blog/temas");
    expect(disallow).toContain("/frases-en-ingles");
    expect(disallow).toContain("/vocabulario");
  });
});
