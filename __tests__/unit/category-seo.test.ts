import { generateCollectionPageSchema } from "@/lib/schemas";
import { articleDatesDiffer, formatArticleDate } from "@/lib/seo/article-dates";

describe("article dates", () => {
  it("treats the same calendar day as unchanged", () => {
    expect(
      articleDatesDiffer("2026-09-02T10:00:00.000Z", "2026-09-02T22:00:00.000Z"),
    ).toBe(false);
  });

  it("flags a later revision day", () => {
    expect(articleDatesDiffer("2026-09-02", "2026-09-04")).toBe(true);
  });

  it("formats a Spanish long date", () => {
    expect(formatArticleDate("2026-09-04")).toMatch(/septiembre/i);
    expect(formatArticleDate("2026-09-04")).toMatch(/2026/);
  });
});

describe("collection page schema", () => {
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

  it("emits CollectionPage with an ItemList of the visible articles", () => {
    const schema = generateCollectionPageSchema({
      name: "Gramática Inglesa",
      description: "Guías de gramática.",
      url: "https://linguafly.app/blog/gramatica",
      numberOfItems: 40,
      articles: [
        {
          title: "Have something done",
          url: "https://linguafly.app/blog/gramatica/have-something-done-ingles",
          datePublished: "2026-01-01",
        },
      ],
    });

    expect(schema["@type"]).toBe("CollectionPage");
    expect(schema.mainEntity["@type"]).toBe("ItemList");
    expect(schema.mainEntity.numberOfItems).toBe(40);
    expect(schema.mainEntity.itemListElement[0]).toMatchObject({
      "@type": "ListItem",
      position: 1,
      url: "https://linguafly.app/blog/gramatica/have-something-done-ingles",
    });
  });
});
