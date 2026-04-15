/**
 * Acorta `title` en frontmatter de todos los posts del blog para que
 * optimizeSEOTitle(title) + " | Focus English" no supere MAX_TOTAL_CHARS.
 *
 * Uso: node scripts/shorten-all-blog-titles.mjs
 *      node scripts/shorten-all-blog-titles.mjs --dry-run
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_ROOT = path.join(__dirname, "../src/content/blog");

const SUFFIX = " | Focus English";
const MAX_TOTAL = 60;
const MAX_OPT = MAX_TOTAL - SUFFIX.length;

const DRY = process.argv.includes("--dry-run");

function optimizeSEOTitle(title) {
  if (!title || typeof title !== "string") return title || "Focus English";
  const currentYear = new Date().getFullYear().toString();
  let optimizedTitle = title.trim();
  if (!optimizedTitle.includes(currentYear)) {
    if (optimizedTitle.includes("Guía ") || optimizedTitle.endsWith("Guía")) {
      optimizedTitle = optimizedTitle.replace("Guía", `Guía ${currentYear}`);
    } else if (optimizedTitle.includes("Guías")) {
      optimizedTitle = optimizedTitle.replace("Guías", `Guías ${currentYear}`);
    } else {
      optimizedTitle = `${optimizedTitle} (${currentYear})`;
    }
  }
  return optimizedTitle;
}

function fits(opt) {
  return opt.length <= MAX_OPT;
}

/** Quita puntuación colgante y palabras conectoras finales típicas al truncar. */
function trimTitleTail(s) {
  let t = s.trim();
  t = t.replace(/[:;,—–]+$/g, "").trim();
  for (let i = 0; i < 6; i++) {
    const next = t
      .replace(
        /\s+(a|al|de|del|el|la|los|las|y|e|o|u|en|por|para|con|sin|tu|un|una|como|que|Guía)$/i,
        ""
      )
      .trim();
    if (next === t) break;
    t = next;
  }
  t = t.replace(/[:;,—–]+$/g, "").trim();
  return t;
}

function shortenTitle(raw) {
  let t = raw.trim();
  if (fits(optimizeSEOTitle(t))) return trimTitleTail(t);

  const fluffPatterns = [
    /\s*:\s*Guía Completa.*$/i,
    /\s*—\s*Guía Completa.*$/i,
    /\s+Guía Completa.*$/i,
    /\s+Completa para Inmigración y Trabajo en el Extranjero\s*$/i,
    /\s+que Funcionan de Verdad\s*$/i,
    /\s+de Verdad\s*$/i,
    /\s+Paso a Paso\s*$/i,
    /\s+sin Morir en el Intento\s*$/i,
    /\s+que Nadie Te Cuenta\s*$/i,
    /\s+que Todo el Mundo Confunde\s*$/i,
    /\s+que Más Importan\s*$/i,
  ];
  for (const re of fluffPatterns) {
    const next = trimTitleTail(t.replace(re, "").trim());
    if (next !== t && fits(optimizeSEOTitle(next))) return next;
  }

  const dashParts = t.split(/\s+[—–]\s+/);
  if (dashParts.length > 1) {
    const candidate = trimTitleTail(dashParts[0]);
    if (fits(optimizeSEOTitle(candidate))) return candidate;
  }

  let words = t.split(/\s+/).filter(Boolean);
  while (words.length > 1) {
    words.pop();
    let candidate = trimTitleTail(words.join(" "));
    if (fits(optimizeSEOTitle(candidate))) return candidate;
  }

  let s = trimTitleTail(words[0] || "");
  while (s.length > 12 && !fits(optimizeSEOTitle(s))) {
    s = s.replace(/\s+\S+$/, "").trim();
    s = trimTitleTail(s);
  }
  while (s.length > 8 && !fits(optimizeSEOTitle(s))) {
    s = s.slice(0, -1).replace(/[\s,;:]+$/, "").trim();
  }
  if (!fits(optimizeSEOTitle(s))) {
    s = trimTitleTail(s.slice(0, MAX_OPT - 10).trim()) + "…";
  }
  return trimTitleTail(s);
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

function walkMd(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walkMd(p, acc);
    else if (name.endsWith(".md")) acc.push(p);
  }
  return acc;
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
let skipped = 0;
let errors = 0;

for (const file of walkMd(BLOG_ROOT).sort()) {
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
    skipped++;
    continue;
  }

  const beforeOpt = optimizeSEOTitle(rawTitle);
  const beforeTotal = beforeOpt.length + SUFFIX.length;
  if (beforeTotal <= MAX_TOTAL) continue;

  const newTitle = shortenTitle(rawTitle);
  const afterOpt = optimizeSEOTitle(newTitle);
  const afterTotal = afterOpt.length + SUFFIX.length;

  if (afterTotal > MAX_TOTAL) {
    console.error("FAIL still long:", file, afterTotal, afterOpt);
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
    `${rel}\n  ${beforeTotal} → ${afterTotal} chars | ${afterOpt}`
  );
}

console.log(
  `\nDone. ${changed} updated, ${skipped} skipped (no title line?), ${errors} errors. Dry-run: ${DRY}`
);
