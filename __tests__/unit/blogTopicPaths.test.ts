import {
  getCanonicalTopicPath,
  getStaticTemaKeywords,
  resolveKeywordHubRedirect,
  resolveTopicHref,
  slugify,
} from "@/lib/blog";

describe("blog topic canonical paths", () => {
  it("points topic slugs that are real articles at the article URL", () => {
    expect(getCanonicalTopicPath("present-perfect-vs-past-simple")).toBe(
      "/blog/gramatica/present-perfect-vs-past-simple"
    );
  });

  it("falls back to the category index instead of /blog/temas", () => {
    expect(getCanonicalTopicPath("phrasal-verbs")).toBe("/blog");
    expect(getCanonicalTopicPath("phrasal-verbs", "gramatica")).toBe("/blog/gramatica");
  });

  it("preserves query strings and hashes when resolving topic hrefs", () => {
    expect(resolveTopicHref("/blog/temas/present-perfect-vs-past-simple?ref=nav#faq")).toBe(
      "/blog/gramatica/present-perfect-vs-past-simple?ref=nav#faq"
    );
  });

  it("rewrites parked aprender-ingles links to /idiomas", () => {
    expect(resolveTopicHref("/aprender-ingles")).toBe("/idiomas");
    expect(resolveTopicHref("/aprender-ingles?ref=nav#faq")).toBe("/idiomas?ref=nav#faq");
  });

  it("rewrites parked course unit links to the blog series", () => {
    expect(resolveTopicHref("/curso-a1/unit-1")).toBe("/blog/curso-a1");
    expect(
      resolveTopicHref(
        "/curso-a1/unit-1/ejercicio/44-verbo-to-be?fromArticle=/blog/curso-a1/unidad-1-saludos-presentarse",
      ),
    ).toBe("/blog/curso-a1/unidad-1-saludos-ejercicios-soluciones");
    expect(
      resolveTopicHref(
        "/blog/ejercicios-relacionados?articulo=unidad-1-saludos-presentarse",
      ),
    ).toBe("/blog/curso-a1/unidad-1-saludos-ejercicios-soluciones");
  });
});

describe("keyword hub crawl-budget redirects", () => {
  it("301s a duplicate tema slug to the article instead of serving noindex", () => {
    expect(resolveKeywordHubRedirect("have-something-done-ingles")).toBe(
      "/blog/gramatica/have-something-done-ingles",
    );
  });

  it("keeps indexable tema hubs crawlable (hub markdown or ≥3 articles)", () => {
    const keyword = getStaticTemaKeywords()[0];
    expect(keyword).toBeTruthy();
    expect(resolveKeywordHubRedirect(slugify(keyword))).toBeNull();
  });

  it("redirects empty tema slugs to the blog index", () => {
    expect(resolveKeywordHubRedirect("this-keyword-does-not-exist-xyz")).toBe(
      "/blog",
    );
  });
});
