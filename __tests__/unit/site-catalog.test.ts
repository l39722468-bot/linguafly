import {
  getParkedPageRedirect,
  isPublicArticleCategory,
  isPublicSitePath,
} from "@/lib/site-catalog";

describe("site catalog", () => {
  it("only treats the three new verticals as public article categories", () => {
    expect(isPublicArticleCategory("idiomas")).toBe(true);
    expect(isPublicArticleCategory("alimentacion")).toBe(true);
    expect(isPublicArticleCategory("entrenamiento")).toBe(true);
    expect(isPublicArticleCategory("gramatica")).toBe(false);
    expect(isPublicArticleCategory("viajes")).toBe(false);
    expect(isPublicArticleCategory("curso-a1")).toBe(false);
  });

  it("keeps magazine routes public", () => {
    expect(isPublicSitePath("/")).toBe(true);
    expect(isPublicSitePath("/blog")).toBe(true);
    expect(isPublicSitePath("/blog/idiomas/como-empezar-a-aprender-un-idioma")).toBe(true);
    expect(isPublicSitePath("/alimentacion")).toBe(true);
    expect(isPublicSitePath("/entrenamiento")).toBe(true);
    expect(isPublicSitePath("/api/articles/foo")).toBe(true);
    expect(isPublicSitePath("/sobre-nosotros")).toBe(true);
  });

  it("parks the old website instead of publishing it", () => {
    expect(getParkedPageRedirect("/blog/viajes/ingles-para-viajar")).toBe("/blog");
    expect(getParkedPageRedirect("/blog/gramatica")).toBe("/blog");
    expect(getParkedPageRedirect("/curso-a1")).toBe("/");
    expect(getParkedPageRedirect("/frases-en-ingles")).toBe("/");
    expect(getParkedPageRedirect("/vocabulario")).toBe("/");
    expect(getParkedPageRedirect("/fitness")).toBe("/entrenamiento");
    expect(getParkedPageRedirect("/idiomas")).toBeNull();
    expect(getParkedPageRedirect("/blog/entrenamiento/rutina-fuerza-principiantes-casa")).toBeNull();
  });
});
