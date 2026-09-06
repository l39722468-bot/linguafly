import { getCanonicalTopicPath, resolveTopicHref } from "@/lib/blog";

describe("blog topic canonical paths", () => {
  it("rewrites duplicate topic hubs to the canonical article path", () => {
    expect(getCanonicalTopicPath("present-perfect-vs-past-simple")).toBe(
      "/blog/gramatica/present-perfect-vs-past-simple"
    );
  });

  it("keeps genuine topic hubs under /blog/temas", () => {
    expect(getCanonicalTopicPath("phrasal-verbs")).toBe("/blog/temas/phrasal-verbs");
  });

  it("preserves query strings and hashes when resolving topic hrefs", () => {
    expect(resolveTopicHref("/blog/temas/present-perfect-vs-past-simple?ref=nav#faq")).toBe(
      "/blog/gramatica/present-perfect-vs-past-simple?ref=nav#faq"
    );
  });
});
