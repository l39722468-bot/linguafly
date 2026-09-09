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
