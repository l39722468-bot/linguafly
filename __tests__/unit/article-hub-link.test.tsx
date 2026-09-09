import { render, screen } from "@testing-library/react";
import { SEOInterlinking } from "@/components/blog/SEOInterlinking";
import { getArticleHubLink } from "@/lib/seo/article-hub-link";

function assertIndexable(href: string) {
  expect(href).not.toMatch(/^\/aprender-ingles/);
  expect(href).not.toMatch(/^\/blog\/temas/);
  expect(href).not.toMatch(/^\/curso-/);
}

describe("article hub links", () => {
  it("sends grammar articles to the pillar guide and the category index", () => {
    const hub = getArticleHubLink("gramatica");
    expect(hub.href).toBe("/blog/gramatica/gramatica-inglesa-guia");
    expect(hub.indexHref).toBe("/blog/gramatica");
    expect(hub.showIndex).toBe(true);
    assertIndexable(hub.href);
    assertIndexable(hub.indexHref);
  });

  it("sends course-unit articles to the blog series, not /curso-*", () => {
    const hub = getArticleHubLink("curso-a1");
    expect(hub.href).toBe("/blog/curso-a1");
    expect(hub.showIndex).toBe(false);
    assertIndexable(hub.href);
  });

  it("sends magazine articles to the vertical landing", () => {
    const hub = getArticleHubLink("alimentacion");
    expect(hub.href).toBe("/alimentacion");
    expect(hub.indexHref).toBe("/blog/alimentacion");
    expect(hub.showIndex).toBe(true);
    assertIndexable(hub.href);
    assertIndexable(hub.indexHref);
  });

  it("falls back to the blog home without a category", () => {
    const hub = getArticleHubLink();
    expect(hub.href).toBe("/blog");
    assertIndexable(hub.href);
  });
});

describe("SEOInterlinking", () => {
  it("renders indexable grammar links and no parked URLs", () => {
    render(<SEOInterlinking category="gramatica" />);
    const hrefs = screen.getAllByRole("link").map((link) => link.getAttribute("href") || "");
    expect(hrefs).toContain("/blog/gramatica/gramatica-inglesa-guia");
    expect(hrefs).toContain("/blog/gramatica");
    hrefs.forEach(assertIndexable);
  });
});
