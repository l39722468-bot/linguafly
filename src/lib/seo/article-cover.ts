import sharedArticleCovers from "@/lib/seo/shared-article-covers.json";

/** Image path → slug that keeps it when several articles point at the same file. */
export const SHARED_ARTICLE_COVERS: Record<string, string> = sharedArticleCovers;

export function articleCoverPath(slug: string): string {
  return `/blog/portada/${slug}`;
}

export function articleImageIsGenerated(src: string): boolean {
  return src.startsWith("/blog/portada/");
}

/**
 * A custom file stays only when this article is its only user, or the one
 * chosen to keep a shared diagram. Everyone else gets a cover of their own.
 */
export function exclusiveArticleImage(
  image: string | null | undefined,
  slug: string | null | undefined,
): string | undefined {
  const custom = image?.trim();
  if (!custom) return undefined;
  const keeper = SHARED_ARTICLE_COVERS[custom];
  if (!keeper || !slug || keeper === slug) return custom;
  return undefined;
}

function hashSlug(slug: string): number {
  let hash = 2166136261;
  for (let i = 0; i < slug.length; i += 1) {
    hash ^= slug.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrapTitle(title: string, max = 32, maxLines = 3): string[] {
  const words = title.replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  if (words.length === 0) return ["Linguafly"];
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (current && next.length > max) {
      lines.push(current);
      if (lines.length === maxLines) return lines;
      current = word;
    } else {
      current = next;
    }
  }
  if (current && lines.length < maxLines) lines.push(current);
  return lines;
}

const CATEGORY_LABELS: Record<string, string> = {
  gramatica: "Gramática",
  viajes: "Viajes",
  trabajo: "Trabajo",
  examenes: "Exámenes",
  metodos: "Métodos",
  habilidades: "Habilidades",
  actualidad: "Actualidad",
  idiomas: "Idiomas",
  alimentacion: "Alimentación",
  entrenamiento: "Entrenamiento",
  "inteligencia-artificial": "Inteligencia artificial",
  "curso-a1": "Curso A1",
  "curso-a2": "Curso A2",
  "curso-b1": "Curso B1",
  "curso-b2": "Curso B2",
  "curso-c1": "Curso C1",
};

/** Room for the category kicker above a title of up to three lines. */
const PANEL_Y = 332;
const PANEL_HEIGHT = 262;
const LABEL_SIZE = 20;
const LABEL_BASELINE = 384;
const TITLE_SIZE = 40;
const TITLE_LINE = 52;
const TITLE_BASELINE = 456;

export function renderArticleCoverSvg(input: {
  slug: string;
  title?: string | null;
  category?: string | null;
}): string {
  const hash = hashSlug(input.slug);
  const hue = hash % 360;
  const hue2 = (hue + 40 + ((hash >> 8) % 80)) % 360;
  const lines = wrapTitle(input.title?.trim() || input.slug.replace(/-/g, " "));
  const label = CATEGORY_LABELS[input.category || ""] || "Linguafly";
  const circles = [0, 1, 2, 3, 4].map((index) => {
    const shift = hash >>> (index * 3);
    const cx = 80 + ((shift >> 3) % 1040);
    const cy = 40 + ((shift >> 7) % 340);
    const r = 36 + ((shift >> 1) % 90);
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="rgba(255,255,255,0.14)"/>`;
  });
  const titleSvg = lines
    .map(
      (line, index) =>
        `<text x="72" y="${TITLE_BASELINE + index * TITLE_LINE}" fill="#ffffff" font-family="Georgia, 'Times New Roman', serif" font-size="${TITLE_SIZE}" font-weight="700">${escapeXml(line)}</text>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="hsl(${hue} 62% 38%)"/>
      <stop offset="1" stop-color="hsl(${hue2} 48% 22%)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  ${circles.join("")}
  <rect x="48" y="${PANEL_Y}" width="1104" height="${PANEL_HEIGHT}" rx="28" fill="rgba(15,23,42,0.55)"/>
  <text x="72" y="${LABEL_BASELINE}" fill="rgba(255,255,255,0.82)" font-family="ui-sans-serif, system-ui, sans-serif" font-size="${LABEL_SIZE}" font-weight="700" letter-spacing="1.5">${escapeXml(label.toUpperCase())}</text>
  ${titleSvg}
</svg>`;
}
