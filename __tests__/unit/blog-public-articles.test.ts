/**
 * @jest-environment node
 */
import { getAllBlogArticles, getBlogArticles } from "@/lib/blog";
import { PUBLIC_ARTICLE_CATEGORIES } from "@/lib/site-catalog";

describe("public magazine articles", () => {
  it("publishes only the new verticals with published: true", () => {
    const publicArticles = getBlogArticles();
    const allowed = new Set<string>(PUBLIC_ARTICLE_CATEGORIES);

    expect(publicArticles.length).toBeGreaterThanOrEqual(6);
    expect(publicArticles.every((article) => article.published === true)).toBe(true);
    expect(publicArticles.every((article) => allowed.has(article.category))).toBe(true);
    expect(publicArticles.some((article) => article.slug === "ingles-para-viajar")).toBe(false);
    expect(
      publicArticles.some((article) => article.slug === "como-empezar-a-aprender-un-idioma"),
    ).toBe(true);
    expect(
      publicArticles.some((article) => article.slug === "organizar-comidas-de-la-semana"),
    ).toBe(true);
    expect(
      publicArticles.some((article) => article.slug === "rutina-fuerza-principiantes-casa"),
    ).toBe(true);
  });

  it("keeps the old archive on disk without exposing it on the public list", () => {
    const all = getAllBlogArticles();
    const published = getBlogArticles();

    expect(all.length).toBeGreaterThan(published.length);
    expect(all.some((article) => article.slug === "ingles-para-viajar")).toBe(true);
    expect(all.some((article) => article.category === "gramatica")).toBe(true);
  });
});
