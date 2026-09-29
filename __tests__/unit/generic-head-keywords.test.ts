import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

/** Guías amplias de método, nivel o curso. Los artículos de nicho no entran. */
const GENERIC_ARTICLES = [
  "idiomas/como-empezar-a-aprender-un-idioma.md",
  "metodos/apps-vs-cursos-ingles.md",
  "metodos/aprender-ingles-si-trabajo-todo-el-dia.md",
  "metodos/bbc-learning-english-guia-completa.md",
  "metodos/bloqueo-mental-ingles-superar.md",
  "metodos/clases-de-ingles-guia.md",
  "metodos/como-estudiar-ingles-sin-tiempo.md",
  "metodos/cuanto-se-tarda-en-aprender-ingles.md",
  "metodos/curso-ingles-gratis.md",
  "metodos/curso-ingles-online.md",
  "metodos/cursos-online-ingles-b1.md",
  "metodos/hablar-ingles-con-fluidez.md",
  "metodos/ingles-a1-vs-a2.md",
  "metodos/ingles-a1.md",
  "metodos/ingles-a2.md",
  "metodos/ingles-b2.md",
  "metodos/ingles-c1.md",
  "metodos/ingles-c2.md",
  "metodos/mejor-app-aprender-ingles.md",
  "metodos/mejores-apps-ingles-gratis.md",
  "metodos/mejores-canales-youtube-aprender-ingles.md",
  "metodos/mejores-libros-aprender-ingles.md",
  "metodos/mejores-peliculas-series-ingles.md",
];

function fold(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function bodyAfterFrontmatter(raw: string): string {
  const match = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
  return match ? raw.slice(match[0].length) : raw;
}

function keywordsFromFrontmatter(raw: string): string[] {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) return [];
  const block = match[1].match(/^keywords:\r?\n((?:  - .+\r?\n)+)/m);
  if (!block) return [];
  return block[1]
    .split(/\r?\n/)
    .map((line) => line.replace(/^  - /, "").trim().replace(/^['"]|['"]$/g, ""))
    .filter(Boolean);
}

function seoCopyFromFrontmatter(raw: string): { title: string; description: string } {
  const frontmatter = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/)?.[1] || "";
  const title = frontmatter
    .match(/^title:\s*(.+)$/m)?.[1]
    ?.trim()
    .replace(/^['"]|['"]$/g, "") || "";
  const descriptionMatch = frontmatter.match(
    /^description:\s*(?:>-\r?\n((?: {2}.+(?:\r?\n|$))+)|(.+))$/m
  );
  const description = (descriptionMatch?.[1] || descriptionMatch?.[2] || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .join(" ")
    .replace(/^['"]|['"]$/g, "")
    .trim();

  return { title, description };
}

describe("head keywords on generic articles", () => {
  it.each(GENERIC_ARTICLES)("%s incluye aprender ingles y curso ingles", (relativePath) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, relativePath), "utf8");
    const keywords = keywordsFromFrontmatter(raw).map(fold);
    const body = fold(bodyAfterFrontmatter(raw));

    expect(keywords).toEqual(expect.arrayContaining(["aprender ingles", "curso ingles"]));
    expect(body).toMatch(/(?<![a-z])aprender ingles(?![a-z])/);
    expect(body).toMatch(/(?<![a-z])curso ingles(?![a-z])/);
  });

  it.each(GENERIC_ARTICLES)("%s mantiene metadatos aptos para la SERP", (relativePath) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, relativePath), "utf8");
    const { title, description } = seoCopyFromFrontmatter(raw);

    expect(title.length).toBeGreaterThanOrEqual(35);
    expect(title.length).toBeLessThanOrEqual(60);
    expect(description.length).toBeGreaterThanOrEqual(120);
    expect(description.length).toBeLessThanOrEqual(160);
    expect(description).not.toMatch(/\.{3}$/);
  });

  it.each(GENERIC_ARTICLES)("%s invita al curso gratuito al inicio", (relativePath) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, relativePath), "utf8");
    const bodyStart = bodyAfterFrontmatter(raw).slice(0, 500);

    expect(bodyStart).toContain("Prueba gratis nuestros cursos de inglés");
    expect(bodyStart).toContain("[cursos de inglés A1–C2](/idiomas#niveles)");
  });
});
