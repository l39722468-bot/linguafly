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
});
