import { getCanonicalTopicPath, resolveTopicHref } from "@/lib/blog";

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
  });
});
