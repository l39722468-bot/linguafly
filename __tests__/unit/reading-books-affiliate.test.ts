import { curatedAffiliateBooksForSlug } from "@/lib/affiliates/reading-books";

describe("curated reading affiliate books", () => {
  it("assigns grammar and graded-reading titles to the broad books guide", () => {
    const books = curatedAffiliateBooksForSlug("mejores-libros-aprender-ingles");
    expect(books.map((book) => book.id)).toEqual([
      "murphy-grammar-in-use",
      "oxford-bookworms-stage-1-the-elephant-man",
      "short-stories-in-english-for-beginners-olly-richards",
      "oxford-bookworms-stage-2-the-canterville-ghost",
      "short-stories-in-english-for-intermediate-learners-olly-richards",
      "oxford-bookworms-stage-3-animal-farm",
    ]);
    expect(books.map((book) => book.url)).toContain("https://link.amazon/B043oS3jw");
    expect(books.map((book) => book.url)).toContain("https://link.amazon/B0bq0Rp4b");
    expect(books.map((book) => book.url)).toContain("https://link.amazon/B08EL7KIW");
    expect(books.map((book) => book.url)).toContain("https://link.amazon/B0bBR8nI2");
    expect(books.map((book) => book.url)).toContain("https://link.amazon/B0c7kh8dn");
  });

  it("keeps the A1 vs A2 guide focused on elementary grammar and a first graded reader", () => {
    const books = curatedAffiliateBooksForSlug("ingles-a1-vs-a2");
    expect(books.map((book) => book.url)).toEqual([
      "https://link.amazon/B018DZDWS",
      "https://link.amazon/B08EL7KIW",
    ]);
  });

  it("does not show the curated reading list on unrelated articles", () => {
    expect(curatedAffiliateBooksForSlug("unidad-11-present-perfect-introduccion")).toEqual([]);
    expect(curatedAffiliateBooksForSlug(null)).toEqual([]);
  });
});
