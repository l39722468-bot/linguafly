import {
  getRelatedArticles,
  getTheoryWorkbookPeerSlug,
} from "@/lib/blog";

describe("theory ↔ workbook related articles", () => {
  it("derives peer slugs for theory and workbook posts", () => {
    expect(getTheoryWorkbookPeerSlug("unidad-1-repaso-a2-b1")).toBe(
      "unidad-1-repaso-a2-b1-ejercicios-soluciones"
    );
    expect(
      getTheoryWorkbookPeerSlug("unidad-1-repaso-a2-b1-ejercicios-soluciones")
    ).toBe("unidad-1-repaso-a2-b1");
  });

  it("pins the B1 workbook first for a theory article", () => {
    const related = getRelatedArticles("unidad-1-repaso-a2-b1", "curso-b1", 3);
    expect(related.length).toBeGreaterThan(0);
    expect(related[0]?.slug).toBe("unidad-1-repaso-a2-b1-ejercicios-soluciones");
  });

  it("pins the B1 theory guide first for a workbook article", () => {
    const related = getRelatedArticles(
      "unidad-1-repaso-a2-b1-ejercicios-soluciones",
      "curso-b1",
      3
    );
    expect(related.length).toBeGreaterThan(0);
    expect(related[0]?.slug).toBe("unidad-1-repaso-a2-b1");
  });
});
