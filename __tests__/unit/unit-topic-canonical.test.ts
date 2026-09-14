import {
  getCourseUnitEyebrow,
  isSitemapSatelliteArticle,
  linkHeaderCanonicalPath,
  resolveArticleCanonicalUrl,
  resolveCourseTopicCanonicalPath,
  resolveCourseTopicCanonicalPathFromPathname,
} from "@/lib/seo/unit-topic-canonical";
import { getTheoryPathForCourseUnit } from "@/lib/seo/article-paths";
import { canonicalLinkHeaderValue } from "@/lib/seo/canonical";

describe("course unit topic canonicals", () => {
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

  it("sends high-impression grammar units to the matching guide", () => {
    expect(
      resolveCourseTopicCanonicalPath(
        "curso-a2",
        "unidad-27-zero-conditional",
      ),
    ).toBe("/blog/gramatica/zero-conditional-ingles");
    expect(
      resolveCourseTopicCanonicalPath(
        "curso-a2",
        "unidad-15-present-perfect-vs-past-simple",
      ),
    ).toBe("/blog/gramatica/present-perfect-vs-past-simple");
    expect(
      resolveCourseTopicCanonicalPath("curso-b1", "unidad-3-past-perfect"),
    ).toBe("/blog/gramatica/past-perfect-ingles");
    expect(
      resolveCourseTopicCanonicalPath(
        "curso-b1",
        "unidad-14-third-conditional",
      ),
    ).toBe("/blog/gramatica/third-conditional-ingles");
  });

  it("does not invent a guide when the unit topic has no published twin", () => {
    expect(
      resolveCourseTopicCanonicalPath(
        "curso-a1",
        "unidad-24-preposiciones-lugar-next-to-between",
      ),
    ).toBeNull();
    expect(
      resolveCourseTopicCanonicalPath(
        "curso-a1",
        "unidad-4-articulos-plurales-demostrativos",
      ),
    ).toBeNull();
  });

  it("does not match loosely related grammar (present simple ≠ present perfect)", () => {
    expect(
      resolveCourseTopicCanonicalPath(
        "curso-a1",
        "unidad-5-present-simple-rutinas",
      ),
    ).toBeNull();
    expect(
      resolveCourseTopicCanonicalPath(
        "curso-c1",
        "unidad-60-preparacion-examen",
      ),
    ).toBeNull();
    expect(
      resolveCourseTopicCanonicalPath(
        "curso-a1",
        "unidad-29-ropa-present-continuous",
      ),
    ).toBeNull();
  });

  it("flattens the workbook onto the same topic URL as the theory unit", () => {
    expect(
      resolveCourseTopicCanonicalPath(
        "curso-a2",
        "unidad-27-zero-conditional-ejercicios-soluciones",
      ),
    ).toBe("/blog/gramatica/zero-conditional-ingles");
    expect(
      resolveCourseTopicCanonicalPath(
        "curso-a1",
        "unidad-24-preposiciones-lugar-next-to-between-ejercicios-soluciones",
      ),
    ).toBe(
      "/blog/curso-a1/unidad-24-preposiciones-lugar-next-to-between",
    );
    expect(getTheoryPathForCourseUnit("a1", 1)).toBe(
      "/blog/curso-a1/unidad-1-saludos-presentarse",
    );
    expect(
      resolveCourseTopicCanonicalPath(
        "curso-a1",
        "unidad-1-saludos-ejercicios-soluciones",
      ),
    ).toBe("/blog/curso-a1/unidad-1-saludos-presentarse");
  });

  it("keeps grammar guides as their own canonical and ignores frontmatter self-URLs on units", () => {
    expect(
      resolveArticleCanonicalUrl({
        category: "gramatica",
        slug: "zero-conditional-ingles",
        canonical: "https://linguafly.app/blog/gramatica/zero-conditional-ingles",
      }),
    ).toBe("https://linguafly.app/blog/gramatica/zero-conditional-ingles");

    expect(
      resolveArticleCanonicalUrl({
        category: "curso-a2",
        slug: "unidad-27-zero-conditional",
        canonical: "https://linguafly.app/blog/curso-a2/unidad-27-zero-conditional",
      }),
    ).toBe("https://linguafly.app/blog/gramatica/zero-conditional-ingles");
  });

  it("omits satellite course URLs from the sitemap and leaves unique units in", () => {
    expect(
      isSitemapSatelliteArticle("curso-a2", "unidad-27-zero-conditional"),
    ).toBe(true);
    expect(
      isSitemapSatelliteArticle(
        "curso-a2",
        "unidad-27-zero-conditional-ejercicios-soluciones",
      ),
    ).toBe(true);
    expect(
      isSitemapSatelliteArticle(
        "curso-a1",
        "unidad-24-preposiciones-lugar-next-to-between-ejercicios-soluciones",
      ),
    ).toBe(true);
    expect(
      isSitemapSatelliteArticle(
        "curso-a1",
        "unidad-24-preposiciones-lugar-next-to-between",
      ),
    ).toBe(false);
    expect(
      isSitemapSatelliteArticle("gramatica", "zero-conditional-ingles"),
    ).toBe(false);
  });

  it("puts Unidad N in a kicker, not as the competing document title", () => {
    expect(
      getCourseUnitEyebrow(
        "curso-a1",
        "unidad-24-preposiciones-lugar-next-to-between",
      ),
    ).toBe("Curso A1 · Unidad 24");
    expect(
      getCourseUnitEyebrow(
        "curso-a2",
        "unidad-27-zero-conditional-ejercicios-soluciones",
      ),
    ).toBe("Ejercicios · Curso A2 · Unidad 27");
  });

  it("aligns the HTTP Link header with the HTML canonical without 301ing the unit", () => {
    expect(
      resolveCourseTopicCanonicalPathFromPathname(
        "/blog/curso-a2/unidad-27-zero-conditional",
      ),
    ).toBe("/blog/gramatica/zero-conditional-ingles");
    expect(
      linkHeaderCanonicalPath("/blog/curso-a2/unidad-27-zero-conditional"),
    ).toBe("/blog/gramatica/zero-conditional-ingles");
    expect(linkHeaderCanonicalPath("/blog/curso-a1")).toBe("/blog/curso-a1");
    expect(
      canonicalLinkHeaderValue(
        linkHeaderCanonicalPath("/blog/curso-b1/unidad-3-past-perfect"),
      ),
    ).toContain("https://linguafly.app/blog/gramatica/past-perfect-ingles");
  });
});
