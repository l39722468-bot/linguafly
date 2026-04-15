/**
 * Acorta `title` en frontmatter de hubs (`src/content/hubs/*.md`) para que
 * title + " | Focus English" ≤ 60 caracteres.
 * Los hubs NO pasan por optimizeSEOTitle en generateMetadata (solo el string del MD).
 *
 * Uso: node scripts/shorten-hub-titles.mjs
 *      node scripts/shorten-hub-titles.mjs --dry-run
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HUB_DIR = path.join(__dirname, "../src/content/hubs");

const SUFFIX = " | Focus English";
const MAX_TOTAL = 60;
const MAX_BASE = MAX_TOTAL - SUFFIX.length;

const DRY = process.argv.includes("--dry-run");

/** Títulos acortados a mano cuando el algoritmo genera cortes confusos (clave = nombre del .md). */
const MANUAL_TITLES = {
  "mejores-cursos-de-ingles-online.md":
    "Cursos inglés online 2026 (hub 9 marcas)",
  "cambridge-english-2026.md": "B2 First FCE 2026: guía preparación",
  "present-perfect-vs-past-simple.md":
    "Present Perfect vs Past Simple (guía)",
  "pronunciacion-ingles-guia-completa.md":
    "Pronunciación inglés: ritmo y acento",
  "aprender-ingles-con-chatgpt.md": "Inglés con ChatGPT: guía práctica",
  "cae-c1-advanced-cambridge.md": "C1 Advanced (CAE): guía examen",
  "mejores-peliculas-series-ingles.md":
    "Películas y series para aprender inglés",
};

function fullLen(t) {
  return t.trim().length + SUFFIX.length;
}

function fitsHub(t) {
  return fullLen(t) <= MAX_TOTAL;
}

function trimTitleTail(s) {
  let t = s.trim();
  t = t.replace(/[:;,—–]+$/g, "").trim();
  for (let i = 0; i < 6; i++) {
    const next = t
      .replace(
        /\s+(a|al|de|del|el|la|los|las|y|e|o|u|en|por|para|con|sin|tu|un|una|como|que)$/i,
        ""
      )
      .trim();
    if (next === t) break;
    t = next;
  }
  t = t.replace(/[:;,—–]+$/g, "").trim();
  t = t.replace(/\s+para\s+no\s*$/i, "").trim();
  t = t.replace(/:\s*\d+\s*$/, "").trim();
  return t;
}

/** Última pasada: quita cortes típicamente rotos al truncar por palabras. */
function postPolish(t) {
  let s = trimTitleTail(t);
  s = s.replace(/:\s*La Herramienta\s*$/i, "").trim();
  s = s.replace(/,\s*Connected\s*$/i, "").trim();
  s = s.replace(/:\s*Guía para no\s*$/i, "").trim();
  s = s.replace(/:\s*\d+\s*$/, "").trim();
  return trimTitleTail(s);
}

function shortenHubTitle(raw) {
  let t = trimTitleTail(raw.trim());
  if (fitsHub(t)) return t;

  const fluffPatterns = [
    /\s*:\s*Guía Completa.*$/i,
    /\s+Guía Completa.*$/i,
    /\s+y Recursos en Inglés\s*$/i,
    /\s+Ejercicios y Recursos.*$/i,
  ];
  for (const re of fluffPatterns) {
    const next = trimTitleTail(t.replace(re, "").trim());
    if (next !== t && fitsHub(next)) return next;
  }

  const dashParts = t.split(/\s+[—–]\s+/);
  if (dashParts.length > 1) {
    const candidate = trimTitleTail(dashParts[0]);
    if (fitsHub(candidate)) return candidate;
  }

  let words = t.split(/\s+/).filter(Boolean);
  while (words.length > 1) {
    words.pop();
    const candidate = trimTitleTail(words.join(" "));
    if (fitsHub(candidate)) return candidate;
  }

  let s = trimTitleTail(words[0] || "");
  while (s.length > 8 && !fitsHub(s)) {
    s = s.replace(/\s+\S+$/, "").trim();
    s = trimTitleTail(s);
  }
  while (s.length > 5 && !fitsHub(s)) {
    s = s.slice(0, -1).replace(/[\s,;:]+$/, "").trim();
  }
  if (!fitsHub(s)) {
    s = trimTitleTail(s.slice(0, MAX_BASE - 1).trim()) + "…";
  }
  return postPolish(trimTitleTail(s));
}

function parseTitleFromFrontmatter(fm) {
  const m = fm.match(/^title:\s*(.+)$/m);
  if (!m) return null;
  let v = m[1].trim();
  if (
    (v.startsWith("'") && v.endsWith("'")) ||
    (v.startsWith('"') && v.endsWith('"'))
  ) {
    const q = v[0];
    v = v.slice(1, -1);
    if (q === "'") v = v.replace(/''/g, "'");
    else v = v.replace(/\\"/g, '"');
  }
  return v;
}

function replaceTitleInFrontmatter(content, newTitle) {
  const escaped = newTitle.replace(/'/g, "''");
  const newLine = `title: '${escaped}'`;
  if (!content.startsWith("---")) return null;
  const end = content.indexOf("\n---", 3);
  if (end === -1) return null;
  const fm = content.slice(0, end);
  const rest = content.slice(end);
  if (!/^title:\s/m.test(fm)) return null;
  const updatedFm = fm.replace(/^title:\s*.+$/m, newLine);
  return updatedFm + rest;
}

let changed = 0;
let skippedFit = 0;
let errors = 0;

const files = fs
  .readdirSync(HUB_DIR)
  .filter((f) => f.endsWith(".md"))
  .map((f) => path.join(HUB_DIR, f))
  .sort();

for (const file of files) {
  let content;
  try {
    content = fs.readFileSync(file, "utf8");
  } catch {
    errors++;
    continue;
  }
  if (!content.startsWith("---")) continue;
  const end = content.indexOf("\n---", 3);
  if (end === -1) continue;
  const fm = content.slice(0, end);
  const rawTitle = parseTitleFromFrontmatter(fm);
  if (rawTitle == null) {
    errors++;
    continue;
  }

  if (fitsHub(rawTitle)) {
    skippedFit++;
    continue;
  }

  const base = path.basename(file);
  let newTitle;
  if (MANUAL_TITLES[base] != null) {
    newTitle = MANUAL_TITLES[base];
    if (!fitsHub(newTitle)) {
      console.error("MANUAL too long:", base, fullLen(newTitle), newTitle);
      errors++;
      continue;
    }
  } else {
    newTitle = shortenHubTitle(rawTitle);
    if (!fitsHub(newTitle)) {
      newTitle = postPolish(newTitle);
    }
  }

  if (!fitsHub(newTitle)) {
    console.error("FAIL:", file, fullLen(newTitle), newTitle);
    errors++;
    continue;
  }

  const out = replaceTitleInFrontmatter(content, newTitle);
  if (!out) {
    errors++;
    continue;
  }

  const rel = path.relative(path.join(__dirname, ".."), file);
  if (!DRY) {
    fs.writeFileSync(file, out, "utf8");
  }
  changed++;
  console.log(
    `${rel}\n  ${fullLen(rawTitle)} → ${fullLen(newTitle)} chars | ${newTitle}`
  );
}

console.log(
  `\nDone. ${changed} updated, ${skippedFit} already OK, ${errors} errors. Dry-run: ${DRY}`
);
