import {
  isIndexableSitemapLoc,
  resolveIndexRedirect,
  withoutTrackingParams,
} from "@/lib/seo/index-redirect";
import { getCourseLessonLinks } from "@/lib/seo/course-lesson-nav";
import { applySerpOverride, SERP_OVERRIDES } from "@/lib/seo/serp-overrides";
import { breadcrumbSectionName } from "@/lib/seo/breadcrumb-labels";
import {
  appendArticleReturnParam,
  toIndexableUnitUrl,
} from "@/lib/blog-article-return";

describe("index redirects", () => {
  it("sends www and http to the apex https URL in one hop", () => {
    expect(
      resolveIndexRedirect({
        pathname: "/blog/gramatica/wont-ingles-usos",
        searchParams: new URLSearchParams(),
        hostname: "www.linguafly.app",
        forwardedProto: "https",
      })?.destination,
    ).toBe("https://linguafly.app/blog/gramatica/wont-ingles-usos");

    expect(
      resolveIndexRedirect({
        pathname: "/",
        searchParams: new URLSearchParams(),
        hostname: "linguafly.app",
        forwardedProto: "http",
      })?.destination,
    ).toBe("https://linguafly.app/");
  });

  it("strips fromArticle and keeps a return cookie only on the same document", () => {
    const article = resolveIndexRedirect({
      pathname: "/blog/gramatica/wont-ingles-usos",
      searchParams: new URLSearchParams(
        "fromArticle=/blog/curso-a1/unidad-12-dias-semana&utm_source=newsletter",
      ),
      hostname: "linguafly.app",
      forwardedProto: "https",
    });
    expect(article).toEqual({
      destination: "https://linguafly.app/blog/gramatica/wont-ingles-usos",
      fromArticle: "/blog/curso-a1/unidad-12-dias-semana",
    });

    const parked = resolveIndexRedirect({
      pathname: "/curso-a2/unit-12",
      searchParams: new URLSearchParams("fromArticle=/blog/curso-a2/unidad-12-present-perfect-ever-never"),
      hostname: "linguafly.app",
      forwardedProto: "https",
    });
    expect(parked?.destination).toBe("https://linguafly.app/blog/curso-a2");
    expect(parked?.fromArticle).toBeNull();
  });

  it("folds a blog category query into the section URL in the same hop as tracking cleanup", () => {
    expect(
      resolveIndexRedirect({
        pathname: "/blog",
        searchParams: new URLSearchParams("category=Gramática&utm_source=newsletter"),
        hostname: "linguafly.app",
        forwardedProto: "https",
      })?.destination,
    ).toBe("https://linguafly.app/blog/gramatica");
  });

  it("301s a trailing slash and leaves pagination query strings alone", () => {
    expect(
      resolveIndexRedirect({
        pathname: "/blog/gramatica/",
        searchParams: new URLSearchParams(),
        hostname: "linguafly.app",
        forwardedProto: "https",
      })?.destination,
    ).toBe("https://linguafly.app/blog/gramatica");

    expect(
      resolveIndexRedirect({
        pathname: "/blog/gramatica",
        searchParams: new URLSearchParams("page=2"),
        hostname: "linguafly.app",
        forwardedProto: "https",
      }),
    ).toBeNull();
  });

  it("does not treat localhost http as a production host redirect", () => {
    expect(
      resolveIndexRedirect({
        pathname: "/blog",
        searchParams: new URLSearchParams(),
        hostname: "localhost",
        forwardedProto: "http",
      }),
    ).toBeNull();
  });

  it("drops tracking params and rejects non-canonical sitemap locs", () => {
    const cleaned = withoutTrackingParams(
      new URLSearchParams("page=2&gclid=abc&fromArticle=/blog/gramatica/wont-ingles-usos"),
    );
    expect(cleaned.params.toString()).toBe("page=2");
    expect(cleaned.fromArticle).toBe("/blog/gramatica/wont-ingles-usos");
    expect(isIndexableSitemapLoc("https://linguafly.app/blog/gramatica/wont-ingles-usos")).toBe(true);
    expect(isIndexableSitemapLoc("https://www.linguafly.app/blog")).toBe(false);
    expect(isIndexableSitemapLoc("https://linguafly.app/blog?fromArticle=/blog/a")).toBe(false);
    expect(isIndexableSitemapLoc("http://linguafly.app/blog")).toBe(false);
  });
});

describe("course lesson navigation", () => {
  it("links a lesson to its hub, exercises and neighbouring units", () => {
    const links = getCourseLessonLinks("curso-a1", "unidad-12-dias-semana");
    expect(links.map((link) => link.kind)).toEqual([
      "hub",
      "previous",
      "practice",
      "next",
    ]);
    expect(links.find((link) => link.kind === "practice")?.href).toBe(
      "/blog/curso-a1/unidad-12-dias-semana-ejercicios-soluciones",
    );
    expect(links.find((link) => link.kind === "next")?.href).toBe(
      "/blog/curso-a1/unidad-13-rutina-diaria",
    );
  });

  it("links a workbook back to the explanation", () => {
    const links = getCourseLessonLinks(
      "curso-a1",
      "unidad-12-dias-semana-ejercicios-soluciones",
    );
    expect(links.find((link) => link.kind === "theory")?.href).toBe(
      "/blog/curso-a1/unidad-12-dias-semana",
    );
  });
});

describe("serp overrides", () => {
  it("rewrites the high-impression titles and keeps them inside the snippet budget", () => {
    for (const [slug, copy] of Object.entries(SERP_OVERRIDES)) {
      expect(copy.title.length).toBeGreaterThanOrEqual(30);
      expect(copy.title.length).toBeLessThanOrEqual(65);
      expect(copy.description.length).toBeGreaterThanOrEqual(120);
      expect(copy.description.length).toBeLessThanOrEqual(170);
      const article = applySerpOverride({
        slug,
        title: "Unidad 12",
        description: "corta",
        excerpt: "corta",
      });
      expect(article.title).toBe(copy.title);
      expect(article.description).toBe(copy.description);
    }
  });

  it("names course and grammar hubs the way the breadcrumb should read", () => {
    expect(breadcrumbSectionName("curso-a1")).toBe("Curso de inglés A1");
    expect(breadcrumbSectionName("gramatica")).toBe("Gramática inglesa");
  });
});

describe("indexable unit links", () => {
  it("points course player URLs at the lesson and drops fromArticle", () => {
    expect(
      appendArticleReturnParam(
        "/curso-a2/unit-26",
        "/blog/gramatica/ejercicios-condicionales-ingles-b1-b2",
      ),
    ).toBe("/blog/curso-a2/unidad-26-first-conditional");
    expect(toIndexableUnitUrl("/curso-a2/unit-26?fromArticle=%2Fblog%2Fgramatica%2Fwont-ingles-usos")).toBe(
      "/blog/curso-a2/unidad-26-first-conditional",
    );
  });
});
