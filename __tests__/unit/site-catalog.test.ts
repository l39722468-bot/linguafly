import {
  getEnglishLevelSections,
  getEnglishTopicSections,
  getParkedPageRedirect,
  isEnglishLevelCategory,
  isPublicArticleCategory,
  isPublicSitePath,
} from "@/lib/site-catalog";
import robots from "@/app/robots";

describe("site catalog", () => {
  it("treats magazine and English-learning article categories as public", () => {
    expect(isPublicArticleCategory("idiomas")).toBe(true);
    expect(isPublicArticleCategory("alimentacion")).toBe(true);
    expect(isPublicArticleCategory("entrenamiento")).toBe(true);
    expect(isPublicArticleCategory("inteligencia-artificial")).toBe(true);
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
    expect(isPublicSitePath("/inteligencia-artificial")).toBe(true);
    expect(isPublicSitePath("/blog/inteligencia-artificial")).toBe(true);
    expect(isPublicSitePath("/api/articles/foo")).toBe(true);
    expect(isPublicSitePath("/sitemaps/0.xml")).toBe(true);
    expect(isPublicSitePath("/sitemap.xml")).toBe(true);
    expect(isPublicSitePath("/llms.txt")).toBe(true);
    expect(isPublicSitePath("/index.md")).toBe(true);
    expect(isPublicSitePath("/idiomas.md")).toBe(true);
    expect(isPublicSitePath("/blog/idiomas/como-empezar-a-aprender-un-idioma.md")).toBe(true);
  });

  it("republishes English-learning article URLs and parks the rest of the old site", () => {
    expect(getParkedPageRedirect("/blog/viajes/ingles-para-viajar")).toBeNull();
    expect(getParkedPageRedirect("/blog/gramatica")).toBeNull();
    expect(getParkedPageRedirect("/blog/curso-a1/unidad-20-repaso-modulo-2")).toBeNull();
    expect(getParkedPageRedirect("/blog/temas")).toBe("/blog");
    expect(getParkedPageRedirect("/blog/temas/present-perfect")).toBe("/blog");
    expect(getParkedPageRedirect("/blog/temas/have-something-done-ingles")).toBe(
      "/blog/gramatica/have-something-done-ingles",
    );
    expect(getParkedPageRedirect("/blog/temas/precios-examenes-cambridge")).toBe(
      "/blog/examenes/precios-examenes-cambridge",
    );
    expect(
      getParkedPageRedirect(
        "/blog/ejercicios-relacionados",
        new URLSearchParams("articulo=ielts-speaking-estrategias"),
      ),
    ).toBe("/blog/examenes/ielts-speaking-estrategias");
    expect(
      getParkedPageRedirect(
        "/blog/ejercicios-relacionados",
        new URLSearchParams("articulo=unidad-1-saludos-presentarse"),
      ),
    ).toBe("/blog/curso-a1/unidad-1-saludos-ejercicios-soluciones");
    expect(
      getParkedPageRedirect(
        "/blog/ejercicios-relacionados",
        new URLSearchParams("articulo=unidad-9-preposiciones-lugar-movimiento"),
      ),
    ).toBe("/blog/curso-a2/unidad-9-preposiciones-lugar-movimiento-ejercicios-soluciones");
    expect(
      getParkedPageRedirect(
        "/curso-a1/unit-1/ejercicio/44-verbo-to-be-en-ingles-who-wrote-this-text-quien-escribe-este-texto",
      ),
    ).toBe("/blog/curso-a1/unidad-1-saludos-ejercicios-soluciones");
    expect(getParkedPageRedirect("/curso-a1/unit-1")).toBe("/blog/curso-a1");
    expect(getParkedPageRedirect("/aprender-ingles")).toBe("/idiomas");
    expect(getParkedPageRedirect("/podcasts")).toBe("/blog");
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
    expect(getParkedPageRedirect("/llms.txt")).toBeNull();
    expect(getParkedPageRedirect("/index.md")).toBeNull();
    expect(getParkedPageRedirect("/idiomas.md")).toBeNull();
    expect(getParkedPageRedirect("/aprender-ingles.md")).toBe("/idiomas.md");
    expect(getParkedPageRedirect("/fitness.md")).toBe("/entrenamiento.md");
  });

  it("splits the English archive into CEFR levels and topics", () => {
    expect(isEnglishLevelCategory("curso-a2")).toBe(true);
    expect(isEnglishLevelCategory("gramatica")).toBe(false);
    const levels = getEnglishLevelSections().map((section) => section.slug);
    expect(levels).toEqual(["curso-a1", "curso-a2", "curso-b1", "curso-b2", "curso-c1"]);
    const topics = getEnglishTopicSections().map((section) => section.slug);
    expect(topics[0]).toBe("idiomas");
    expect(topics).toEqual(
      expect.arrayContaining([
        "idiomas",
        "gramatica",
        "viajes",
        "trabajo",
        "examenes",
        "metodos",
        "habilidades",
      ]),
    );
    expect(topics).not.toContain("curso-a1");
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
    expect(disallow).not.toContain("/blog/temas");
    expect(disallow).not.toContain("/aprender-ingles");
    expect(disallow).toContain("/frases-en-ingles");
    expect(disallow).toContain("/vocabulario");
    expect(disallow).toContain("/gtag");
    expect(disallow).toContain("/monetag");
    expect(disallow).toContain("/*?*page=");
    expect(disallow).toContain("/*?*q=");
    expect(disallow).toContain("/*?*c=");
    expect(disallow).toContain("/*?*m=");
    const allow = spec.rules[0].allow ?? [];
    expect(allow).toContain("/llms.txt");
  });

  it("blocks faceted listing and search URLs instead of relying on noindex", () => {
    const spec = robots();
    const disallow = spec.rules[0].disallow ?? [];
    expect(disallow).toEqual(
      expect.arrayContaining([
        "/*?*page=",
        "/*?*q=",
        "/*?*c=",
        "/*?*m=",
        "/monetag",
      ]),
    );
    expect(disallow).not.toContain("/sitemaps/");
    expect(disallow).not.toContain("/blog/");
  });
});
