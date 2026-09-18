import {
  getAdPlacement,
  shouldFillAdSlots,
} from "@/lib/ads/placements";
import { shouldUseMarkdownArticleFallback } from "@/lib/content/articles";
import {
  buildPublisherHome,
  escapeXml,
  splitMarkdownForMidArticleAd,
} from "@/lib/content/publisher-home";
import type { BlogPost } from "@/lib/blog";
import { SITE_VERTICALS } from "@/lib/site-catalog";

function post(
  overrides: Partial<BlogPost> & Pick<BlogPost, "slug" | "category" | "title">,
): BlogPost {
  return {
    date: "2026-09-01T00:00:00.000Z",
    author: "Linguafly",
    excerpt: "Resumen",
    readTime: "6 min",
    content: "",
    ...overrides,
  };
}

describe("publisher home model", () => {
  const articles: BlogPost[] = [
    post({ slug: "featured-ai", category: "inteligencia-artificial", title: "IA destacada", featured: true }),
    post({ slug: "idioma-1", category: "idiomas", title: "Idioma 1" }),
    post({ slug: "comida-1", category: "alimentacion", title: "Comida 1" }),
    post({ slug: "gym-1", category: "entrenamiento", title: "Gym 1" }),
    post({ slug: "idioma-2", category: "idiomas", title: "Idioma 2" }),
    post({ slug: "idioma-3", category: "idiomas", title: "Idioma 3" }),
    post({ slug: "comida-2", category: "alimentacion", title: "Comida 2" }),
    post({ slug: "gym-2", category: "entrenamiento", title: "Gym 2" }),
    post({ slug: "ai-2", category: "inteligencia-artificial", title: "IA 2" }),
    post({ slug: "idioma-4", category: "idiomas", title: "Idioma 4" }),
    post({ slug: "viajes-1", category: "viajes", title: "Viaje 1" }),
    post({ slug: "trabajo-1", category: "trabajo", title: "Trabajo 1" }),
    post({ slug: "examen-1", category: "examenes", title: "Examen 1" }),
    post({ slug: "metodo-1", category: "metodos", title: "Método 1" }),
    post({ slug: "idioma-5", category: "idiomas", title: "Idioma 5" }),
    post({ slug: "comida-3", category: "alimentacion", title: "Comida 3" }),
    post({ slug: "gym-3", category: "entrenamiento", title: "Gym 3" }),
    post({ slug: "ai-3", category: "inteligencia-artificial", title: "IA 3" }),
  ];

  it("uses the featured article as the hero and keeps later stories unique", () => {
    const model = buildPublisherHome(articles, {
      secondaryCount: 3,
      latestCount: 4,
      railCount: 2,
    });

    expect(model.featured?.slug).toBe("featured-ai");
    expect(model.secondary.map((article) => article.slug)).toEqual([
      "idioma-1",
      "comida-1",
      "gym-1",
    ]);
    expect(model.latest.map((article) => article.slug)).toEqual([
      "idioma-2",
      "idioma-3",
      "comida-2",
      "gym-2",
    ]);

    const heroKeys = new Set(
      [model.featured, ...model.secondary, ...model.latest]
        .filter(Boolean)
        .map((article) => `${article!.category}:${article!.slug}`),
    );
    for (const rail of model.rails) {
      const overlap = rail.articles.filter((article) =>
        heroKeys.has(`${article.category}:${article.slug}`),
      );
      expect(overlap).toHaveLength(0);
    }
  });

  it("puts news on the hero and fills the actualidad rail before other blocks", () => {
    const mixed: BlogPost[] = [
      post({ slug: "featured-ai", category: "inteligencia-artificial", title: "IA destacada", featured: true }),
      post({
        slug: "key-papel",
        category: "actualidad",
        title: "A2 Key papel",
        featured: true,
      }),
      post({ slug: "ielts-pc", category: "actualidad", title: "IELTS ordenador" }),
      post({ slug: "santander", category: "actualidad", title: "Plazas Santander" }),
      post({ slug: "foto-cam", category: "actualidad", title: "Foto Cambridge" }),
      post({ slug: "certacles", category: "actualidad", title: "CertAcles" }),
      post({ slug: "idioma-1", category: "idiomas", title: "Idioma 1" }),
    ];
    const model = buildPublisherHome(mixed, {
      secondaryCount: 3,
      latestCount: 4,
      railCount: 2,
      newsCount: 4,
    });

    expect(model.featured?.slug).toBe("key-papel");
    expect(model.news.map((article) => article.slug)).toEqual([
      "ielts-pc",
      "santander",
      "foto-cam",
      "certacles",
    ]);
    expect(model.secondary.map((article) => article.slug)).toEqual([
      "featured-ai",
      "idioma-1",
    ]);
    const reused = new Set(
      [model.featured, ...model.news, ...model.secondary]
        .filter(Boolean)
        .map((article) => article!.slug),
    );
    expect(reused.size).toBe(7);
  });

  it("fills a category rail from that vertical even if uniqueness runs out", () => {
    const few = [
      post({ slug: "only-food", category: "alimentacion", title: "Única comida", featured: true }),
    ];
    const model = buildPublisherHome(few, { railCount: 2 });
    const foodRail = model.rails.find(
      (rail) => rail.vertical.slug === "alimentacion",
    );
    expect(foodRail?.articles.map((article) => article.slug)).toEqual(["only-food"]);
    expect(model.rails).toHaveLength(SITE_VERTICALS.length);
  });
});

describe("splitMarkdownForMidArticleAd", () => {
  it("inserts the break after the second h2", () => {
    const content = [
      "Introducción del artículo.",
      "",
      "## Primera sección",
      "Texto uno.",
      "",
      "## Segunda sección",
      "Texto dos.",
    ].join("\n");

    const split = splitMarkdownForMidArticleAd(content);
    expect(split.intro).toContain("## Primera sección");
    expect(split.intro).not.toContain("## Segunda sección");
    expect(split.rest).toContain("## Segunda sección");
  });

  it("keeps short articles in a single block", () => {
    const split = splitMarkdownForMidArticleAd("Solo un párrafo.\n\n## Única");
    expect(split.rest).toBeNull();
    expect(split.intro).toContain("## Única");
  });
});

describe("escapeXml", () => {
  it("escapes RSS-sensitive characters", () => {
    expect(escapeXml(`A & B <C> "x" 'y'`)).toBe(
      "A &amp; B &lt;C&gt; &quot;x&quot; &apos;y&apos;",
    );
  });
});

describe("ad placements", () => {
  it("uses in-article fluid layout and auto units for the rest", () => {
    expect(getAdPlacement("in-article")).toMatchObject({
      format: "fluid",
      layout: "in-article",
    });
    expect(getAdPlacement("leaderboard").format).toBe("auto");
    expect(getAdPlacement("sidebar").minHeight).toBeGreaterThan(100);
  });

  it("does not fill live ads in the test environment", () => {
    expect(shouldFillAdSlots()).toBe(false);
  });

  it("allows markdown fallback outside production", () => {
    expect(shouldUseMarkdownArticleFallback()).toBe(true);
  });
});
