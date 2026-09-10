import {
  buildArticleMarkdown,
  buildIdiomasHubMarkdown,
  buildLlmsTxt,
  resolveMarkdownTarget,
} from "@/lib/llm-txt";
import {
  htmlPathFromMarkdownTwin,
  htmlToMarkdownPath,
  llmMarkdownUrl,
} from "@/lib/seo/canonical";
import type { BlogPost } from "@/lib/blog";

const sampleArticle: BlogPost = {
  slug: "rutina-fuerza-principiantes-casa",
  title: "Rutina de fuerza para principiantes en casa",
  date: "2026-09-01",
  author: "Linguafly",
  excerpt: "Un plan de tres días sin máquinas.",
  description: "Cómo entrenar fuerza en casa tres días por semana.",
  category: "entrenamiento",
  readTime: "8 min",
  content: "Empieza con sentadillas. No hace falta un gimnasio.",
};

describe("markdown twins", () => {
  it("maps HTML paths to .md twins", () => {
    expect(htmlToMarkdownPath("/")).toBe("/index.md");
    expect(htmlToMarkdownPath("/idiomas")).toBe("/idiomas.md");
    expect(htmlToMarkdownPath("/blog/entrenamiento/rutina-fuerza-principiantes-casa")).toBe(
      "/blog/entrenamiento/rutina-fuerza-principiantes-casa.md",
    );
    expect(htmlPathFromMarkdownTwin("/index.md")).toBe("/");
    expect(htmlPathFromMarkdownTwin("/idiomas/index.md")).toBe("/idiomas");
    expect(htmlPathFromMarkdownTwin("/blog/idiomas/foo.md")).toBe("/blog/idiomas/foo");
    expect(llmMarkdownUrl("/")).toBe("https://linguafly.app/index.md");
  });

  it("builds llms.txt with H1, summary and markdown links", () => {
    const txt = buildLlmsTxt([sampleArticle]);
    expect(txt.startsWith("# Linguafly\n")).toBe(true);
    expect(txt).toContain("> Revista práctica");
    expect(txt).toContain("## Temáticas");
    expect(txt).toContain("https://linguafly.app/idiomas.md");
    expect(txt).toContain(
      "https://linguafly.app/blog/entrenamiento/rutina-fuerza-principiantes-casa.md",
    );
    expect(txt).toContain("https://linguafly.app/sitemap.xml");
  });

  it("emits article markdown with canonical HTML URL", () => {
    const md = buildArticleMarkdown(sampleArticle);
    expect(md).toContain("# Rutina de fuerza para principiantes en casa");
    expect(md).toContain(
      "Canonical: https://linguafly.app/blog/entrenamiento/rutina-fuerza-principiantes-casa",
    );
    expect(md).toContain("Empieza con sentadillas");
  });

  it("resolves hub and article markdown targets", () => {
    expect(resolveMarkdownTarget("/index.md")).toEqual({ kind: "home" });
    expect(resolveMarkdownTarget("/idiomas.md")).toMatchObject({
      kind: "hub",
      htmlPath: "/idiomas",
      category: "idiomas",
    });
    expect(resolveMarkdownTarget("/blog/entrenamiento/rutina-fuerza-principiantes-casa.md")).toEqual({
      kind: "article",
      category: "entrenamiento",
      slug: "rutina-fuerza-principiantes-casa",
      htmlPath: "/blog/entrenamiento/rutina-fuerza-principiantes-casa",
    });
    expect(resolveMarkdownTarget("/privacidad.md")).toBeNull();
  });

  it("classifies the idiomas hub by CEFR level and topic", () => {
    const md = buildIdiomasHubMarkdown([sampleArticle], 824);
    expect(md).toContain("## Por nivel de inglés");
    expect(md).toContain("## Por temática");
    expect(md).toContain("https://linguafly.app/blog/curso-a1.md");
    expect(md).toContain("https://linguafly.app/blog/gramatica.md");
    expect(md).toContain("https://linguafly.app/blog/idiomas.md");
    expect(md).toContain("824 artículos publicados");
    expect(md).toContain("Rutina de fuerza para principiantes en casa");
  });
});
