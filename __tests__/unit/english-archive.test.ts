import {
  formatEsCount,
  tallyEnglishArchiveCounts,
  totalEnglishArchiveCount,
} from "@/lib/content/english-archive";

describe("english archive counts", () => {
  it("tallies articles by English-learning category", () => {
    const counts = tallyEnglishArchiveCounts([
      { category: "curso-a1" },
      { category: "curso-a1" },
      { category: "Gramática" },
      { category: "alimentacion" },
      { category: "idiomas" },
    ]);
    expect(counts["curso-a1"]).toBe(2);
    expect(counts.gramatica).toBe(1);
    expect(counts.idiomas).toBe(1);
    expect(counts.viajes).toBe(0);
    expect(counts).not.toHaveProperty("alimentacion");
    expect(totalEnglishArchiveCount(counts)).toBe(4);
  });

  it("formats Spanish singular and plural counts", () => {
    expect(formatEsCount(1, "guía", "guías")).toBe("1 guía");
    expect(formatEsCount(120, "guía", "guías")).toBe("120 guías");
  });
});
