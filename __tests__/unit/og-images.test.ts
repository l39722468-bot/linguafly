import { renderArticleCoverSvg } from "@/lib/seo/article-cover";
import {
  CATEGORY_OG_IMAGE_PATHS,
  DEFAULT_OG_IMAGE_PATH,
  getArticleOgImagePath,
  getArticleOgImageUrl,
  getCategoryOgImagePath,
  getCategoryOgImageUrl,
  ogImageMeta,
} from "@/lib/seo/og-images";
import { serializeSitemapXml } from "@/lib/content/sitemap";
import { generateCollectionPageSchema } from "@/lib/schemas";

function textBaseline(svg: string, includes: string): number {
  const block = svg.split("<text ").find((part) => part.includes(includes));
  return Number(block?.match(/y="(\d+)"/)?.[1]);
}

function georgiaBaselines(svg: string): number[] {
  return [...svg.matchAll(/<text ([^>]*font-family="Georgia[^"]*"[^>]*)>/g)].map((match) =>
    Number(match[1].match(/y="(\d+)"/)?.[1]),
  );
}

describe("category OG images", () => {
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

  it("maps each public cluster to its own still", () => {
    expect(getCategoryOgImagePath("gramatica")).toBe("/blog/og-gramatica.jpg");
    expect(getCategoryOgImagePath("actualidad")).toBe("/blog/og-actualidad.jpg");
    expect(getCategoryOgImagePath("Gramática")).toBe("/blog/og-gramatica.jpg");
    expect(getCategoryOgImagePath("inteligencia-artificial")).toBe(
      "/blog/og-inteligencia-artificial.jpg",
    );
    expect(getCategoryOgImagePath("curso-b2")).toBe("/blog/og-curso-b2.jpg");
    expect(getCategoryOgImagePath("unknown")).toBe(DEFAULT_OG_IMAGE_PATH);
    expect(getCategoryOgImagePath()).toBe(DEFAULT_OG_IMAGE_PATH);
  });

  it("prefers an article photo over the category still", () => {
    expect(
      getArticleOgImagePath({
        image: "/blog/curso-a1/unit-1/photo.png",
        category: "curso-a1",
      }),
    ).toBe("/blog/curso-a1/unit-1/photo.png");
    expect(getArticleOgImagePath({ category: "viajes" })).toBe("/blog/og-viajes.jpg");
  });

  it("gives each article without its own file a different cover", () => {
    const days = getArticleOgImagePath({
      slug: "unidad-12-dias-semana",
      category: "curso-a1",
    });
    const grammar = getArticleOgImagePath({
      slug: "pasiva-pasado-ingles",
      category: "gramatica",
    });
    expect(days).toBe("/blog/portada/unidad-12-dias-semana?v=2");
    expect(grammar).toBe("/blog/portada/pasiva-pasado-ingles?v=2");
    expect(days).not.toBe(grammar);
    expect(days).not.toBe(getCategoryOgImagePath("curso-a1"));
    expect(
      getArticleOgImagePath({
        slug: "pasiva-pasado-ingles",
        image: "/blog/og-gramatica.jpg",
        category: "gramatica",
      }),
    ).toBe("/blog/portada/pasiva-pasado-ingles?v=2");
  });

  it("keeps a shared diagram on one article and gives the other its own cover", () => {
    const shared = "/blog/curso-a1/unit-12/a1-unit12-days.png";
    expect(
      getArticleOgImagePath({
        slug: "unidad-12-dias-semana",
        image: shared,
        category: "curso-a1",
      }),
    ).toBe(shared);
    expect(
      getArticleOgImagePath({
        slug: "unidad-12-dias-semana-ejercicios-soluciones",
        image: shared,
        category: "curso-a1",
      }),
    ).toBe("/blog/portada/unidad-12-dias-semana-ejercicios-soluciones?v=2");
  });

  it("returns apex absolute URLs", () => {
    expect(getCategoryOgImageUrl("trabajo")).toBe(
      "https://linguafly.app/blog/og-trabajo.jpg",
    );
    expect(
      getArticleOgImageUrl({
        image: "https://cdn.example/photo.jpg",
        category: "viajes",
      }),
    ).toBe("https://cdn.example/photo.jpg");
  });

  it("covers every mapped category with a distinct file", () => {
    const paths = Object.values(CATEGORY_OG_IMAGE_PATHS);
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).not.toContain(DEFAULT_OG_IMAGE_PATH);
  });

  it("draws a different cover for each slug and escapes the title", () => {
    const days = renderArticleCoverSvg({
      slug: "unidad-12-dias-semana",
      title: "Días <de> la semana",
      category: "curso-a1",
    });
    const grammar = renderArticleCoverSvg({
      slug: "pasiva-pasado-ingles",
      title: "Voz pasiva en pasado",
      category: "gramatica",
    });
    expect(days).not.toBe(grammar);
    expect(days).toContain("Días &lt;de&gt; la semana");
    expect(days).toContain("CURSO A1");
    const labelY = textBaseline(days, "CURSO A1");
    const titleY = textBaseline(days, "Días");
    const panel = days.match(/<rect x="48" y="(\d+)" width="1104" height="(\d+)"/);
    const panelTop = Number(panel?.[1]);
    const panelBottom = panelTop + Number(panel?.[2]);
    expect(labelY).toBeLessThan(panelTop - 16);
    expect(titleY).toBeGreaterThan(panelTop + 36);
    const titleBaselines = georgiaBaselines(days);
    expect(Math.max(...titleBaselines)).toBeLessThan(panelBottom - 16);

    const crowded = renderArticleCoverSvg({
      slug: "unidad-24-preposiciones-lugar-next-to-between",
      title: "Preposiciones de lugar A1: next to, between, opposite y ejercicios",
      category: "curso-a1",
    });
    const crowdedLabel = textBaseline(crowded, "CURSO A1");
    const crowdedTitles = georgiaBaselines(crowded);
    expect(crowdedTitles.length).toBe(3);
    const crowdedPanel = crowded.match(/<rect x="48" y="(\d+)" width="1104" height="(\d+)"/);
    const crowdedTop = Number(crowdedPanel?.[1]);
    const crowdedBottom = crowdedTop + Number(crowdedPanel?.[2]);
    expect(crowdedLabel).toBeLessThan(crowdedTop - 16);
    expect(Math.min(...crowdedTitles)).toBeGreaterThan(crowdedTop + 36);
    expect(Math.max(...crowdedTitles)).toBeLessThan(crowdedBottom - 16);
  });

  it("builds Open Graph image metadata", () => {
    const og = ogImageMeta("Gramática inglesa", "/blog/og-gramatica.jpg");
    expect(og.url).toBe("https://linguafly.app/blog/og-gramatica.jpg");
    expect(og.images[0]).toMatchObject({
      url: og.url,
      width: 1200,
      height: 630,
      alt: "Gramática inglesa",
    });
  });

  it("emits sitemap image tags", () => {
    const xml = serializeSitemapXml([
      {
        url: "https://linguafly.app/blog/gramatica/have-something-done-ingles",
        images: ["https://linguafly.app/blog/og-gramatica.jpg"],
      },
    ]);
    expect(xml).toContain('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"');
    expect(xml).toContain(
      "<image:loc>https://linguafly.app/blog/og-gramatica.jpg</image:loc>",
    );
  });

  it("escapes sitemap URLs", () => {
    const xml = serializeSitemapXml([
      {
        url: "https://linguafly.app/blog?q=a&b=1",
        images: ["https://linguafly.app/og.jpg?w=1200&h=630"],
      },
    ]);
    expect(xml).toContain("https://linguafly.app/blog?q=a&amp;b=1");
    expect(xml).toContain("https://linguafly.app/og.jpg?w=1200&amp;h=630");
  });
});

describe("collection page image", () => {
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

  it("includes an ImageObject URL when provided", () => {
    const schema = generateCollectionPageSchema({
      name: "Gramática",
      description: "Guías",
      url: "https://linguafly.app/blog/gramatica",
      image: "/blog/og-gramatica.jpg",
      articles: [],
    });
    expect(schema.image).toBe("https://linguafly.app/blog/og-gramatica.jpg");
  });
});
