import { listPublishedArticles } from "@/lib/content/articles";
import { compareCourseUnitArticles } from "@/lib/content/course-unit-order";

describe("course unit hub order", () => {
  it("puts theory before that unit's exercises, and unit 2 before unit 10", () => {
    const slugs = [
      "unidad-10-rutinas-hora-ejercicios-soluciones",
      "unidad-2-to-be-ejercicios-soluciones",
      "unidad-1-saludos-ejercicios-soluciones",
      "unidad-10-rutinas-diarias-hora",
      "unidad-1-saludos-presentarse",
      "unidad-2-to-be-pronombres-nacionalidades",
    ];
    const ordered = slugs
      .map((slug) => ({ slug }))
      .sort(compareCourseUnitArticles)
      .map((article) => article.slug);
    expect(ordered).toEqual([
      "unidad-1-saludos-presentarse",
      "unidad-1-saludos-ejercicios-soluciones",
      "unidad-2-to-be-pronombres-nacionalidades",
      "unidad-2-to-be-ejercicios-soluciones",
      "unidad-10-rutinas-diarias-hora",
      "unidad-10-rutinas-hora-ejercicios-soluciones",
    ]);
  });

  it("lists the A1 hub as theory then exercises for each unit", async () => {
    const first = await listPublishedArticles({
      category: "curso-a1",
      page: 1,
      limit: 4,
    });
    expect(first.articles.map((article) => article.slug)).toEqual([
      "unidad-1-saludos-presentarse",
      "unidad-1-saludos-ejercicios-soluciones",
      "unidad-2-to-be-pronombres-nacionalidades",
      "unidad-2-to-be-ejercicios-soluciones",
    ]);

    const secondPage = await listPublishedArticles({
      category: "curso-a1",
      page: 2,
      limit: 24,
    });
    expect(secondPage.articles[0]?.slug).toBe("unidad-13-rutina-diaria");
    expect(secondPage.articles[1]?.slug).toBe(
      "unidad-13-rutina-diaria-ejercicios-soluciones",
    );
  });

  it("lists B2 and C1 hubs in unit order, with the workbook after its theory article", async () => {
    const b2 = await listPublishedArticles({
      category: "curso-b2",
      page: 1,
      limit: 100,
    });
    expect(b2.articles.slice(0, 3).map((article) => article.slug)).toEqual([
      "unidad-1-repaso-b1-b2",
      "unidad-2-future-tenses-work",
      "unidad-3-gerund-infinitive-education",
    ]);
    const b2Slugs = b2.articles.map((article) => article.slug);
    const theory52 = b2Slugs.indexOf("unidad-52-passive-reported-speech-human-rights");
    expect(b2Slugs[theory52 + 1]).toBe(
      "unidad-52-passive-reported-speech-human-rights-ejercicios-soluciones",
    );
    expect(unitNumbers(b2Slugs)).toEqual(
      [...unitNumbers(b2Slugs)].sort((a, b) => a - b),
    );

    const c1 = await listPublishedArticles({
      category: "curso-c1",
      page: 1,
      limit: 100,
    });
    expect(c1.articles.slice(0, 2).map((article) => article.slug)).toEqual([
      "unidad-1-deduccion-identidad",
      "unidad-2-aspecto-perfecto",
    ]);
    const c1Numbers = unitNumbers(c1.articles.map((article) => article.slug));
    expect(c1Numbers[0]).toBe(1);
    expect(c1Numbers[c1Numbers.length - 1]).toBe(70);
    expect(c1Numbers).toEqual([...c1Numbers].sort((a, b) => a - b));
    expect(c1Numbers).toHaveLength(70);
  });
});

function unitNumbers(slugs: string[]): number[] {
  return slugs.map((slug) => {
    const match = slug.match(/^unidad-(\d+)/);
    return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
  });
}
