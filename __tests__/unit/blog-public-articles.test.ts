/**
 * @jest-environment node
 */
import { getAllBlogArticles, getBlogArticles } from "@/lib/blog";
import { blogPostToArticleInput } from "@/lib/content/map-article";
import { PUBLIC_ARTICLE_CATEGORIES } from "@/lib/site-catalog";

describe("public magazine and English-learning articles", () => {
  it("publishes magazine verticals and the English archive", () => {
    const publicArticles = getBlogArticles();
    const allowed = new Set<string>(PUBLIC_ARTICLE_CATEGORIES);

    expect(publicArticles.length).toBeGreaterThan(800);
    expect(publicArticles.every((article) => allowed.has(article.category))).toBe(true);
    expect(publicArticles.some((article) => article.slug === "ingles-para-viajar")).toBe(true);
    expect(
      publicArticles.some((article) => article.slug === "como-empezar-a-aprender-un-idioma"),
    ).toBe(true);
    expect(
      publicArticles.some((article) => article.slug === "organizar-comidas-de-la-semana"),
    ).toBe(true);
    expect(
      publicArticles.some((article) => article.slug === "rutina-fuerza-principiantes-casa"),
    ).toBe(true);
    expect(
      publicArticles.some((article) => article.slug === "sentadilla-en-casa-de-la-silla-al-aire"),
    ).toBe(true);
    expect(
      publicArticles.some((article) => article.slug === "lista-de-la-compra-semanal-sencilla"),
    ).toBe(true);
    expect(
      publicArticles.some(
        (article) =>
          article.slug === "que-es-la-inteligencia-artificial-sin-ciencia-ficcion" &&
          article.category === "inteligencia-artificial",
      ),
    ).toBe(true);
    expect(
      publicArticles.some(
        (article) =>
          article.slug === "duolingo-english-test" && article.category === "examenes",
      ),
    ).toBe(true);
    expect(publicArticles.some((article) => article.category === "fitness")).toBe(false);
  });

  it("keeps colliding course slugs distinct by category", () => {
    const publicArticles = getBlogArticles();
    const pair = publicArticles.filter(
      (article) => article.slug === "unidad-20-repaso-modulo-2",
    );
    expect(pair.map((article) => article.category).sort()).toEqual(["curso-a1", "curso-a2"]);
    const inputs = pair.map(blogPostToArticleInput);
    expect(inputs.every((input) => input.isPublished)).toBe(true);
    expect(new Set(inputs.map((input) => `${input.category}:${input.slug}`)).size).toBe(2);
  });

  it("keeps fitness and other unpublished markdown off the public list", () => {
    const all = getAllBlogArticles();
    const published = getBlogArticles();

    expect(all.length).toBeGreaterThan(published.length);
    expect(all.some((article) => article.category === "fitness")).toBe(true);
  });
});
