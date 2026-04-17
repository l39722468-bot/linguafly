#!/usr/bin/env node
// Auditoría SEO completa del blog: detecta thin content, canibalización, orphans,
// broken links, metadatos débiles, FAQ faltantes, contenido outdated y más.
//
// Salida:
//   - audit-seo-report.json : datos estructurados por artículo y globales
//   - audit-seo-report.md   : informe legible con quick wins priorizados
//
// Uso:
//   npm run audit-seo:full
//
// Este script no modifica ningún archivo; solo analiza y reporta.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const BLOG_DIR = path.join(REPO_ROOT, "src/content/blog");

// ---------- Thresholds ----------
const THIN_WORDCOUNT = 800;           // <800 palabras = thin
const IDEAL_WORDCOUNT = 1500;         // <1500 = corto
const TITLE_MIN = 30;                 // ideal 30-65
const TITLE_MAX = 65;
const DESC_MIN = 120;                 // ideal 120-160
const DESC_MAX = 170;
const CANNIBAL_TITLE_JACCARD = 0.7;   // similitud Jaccard en tokens de título
const CANNIBAL_KEYWORD_OVERLAP = 0.6; // overlap de keywords
const OUTDATED_MONTHS = 18;           // si updatedDate/date > 18 meses
const NOW = new Date();

// ---------- Helpers ----------
const readFilesRecursive = (dir) => {
  const out = [];
  const walk = (d) => {
    if (!fs.existsSync(d)) return;
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (/\.mdx?$/.test(entry.name)) out.push(p);
    }
  };
  walk(dir);
  return out;
};

const wordCount = (text) =>
  text
    .replace(/```[\s\S]*?```/g, " ")     // strip code fences
    .replace(/!\[.*?\]\(.*?\)/g, " ")    // strip images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // unwrap links
    .replace(/[#*_`>~-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

const tokenize = (s) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOPWORDS.has(t));

const STOPWORDS = new Set([
  "para","como","con","por","una","unos","unas","los","las","del","sus",
  "pero","más","son","sin","ese","esa","esto","esta","estos","estas","que",
  "the","and","for","with","from","your","you","how","what","why","where",
  "ingles","english","completa","guia","gui","todo","todos","cómo","como",
]);

const jaccard = (a, b) => {
  const A = new Set(a);
  const B = new Set(b);
  const inter = [...A].filter((x) => B.has(x)).length;
  const union = new Set([...A, ...B]).size;
  return union === 0 ? 0 : inter / union;
};

const overlap = (a, b) => {
  const A = new Set(a);
  const B = new Set(b);
  if (A.size === 0 || B.size === 0) return 0;
  const inter = [...A].filter((x) => B.has(x)).length;
  return inter / Math.min(A.size, B.size);
};

const normalizeCategory = (c) =>
  (c || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

const monthsAgo = (iso) => {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return (NOW.getTime() - d.getTime()) / (1000 * 60 * 60 * 24 * 30);
};

// ---------- Collect ----------
const files = readFilesRecursive(BLOG_DIR);
const articles = files
  .map((filePath) => {
    const raw = fs.readFileSync(filePath, "utf8");
    let parsed;
    try {
      parsed = matter(raw);
    } catch (err) {
      return {
        filePath,
        parseError: err.reason || String(err),
      };
    }
    const { data, content } = parsed;
    const slug = path.basename(filePath).replace(/\.mdx?$/, "");
    const category = normalizeCategory(data.category);
    const title = (data.title || "").trim();
    const desc = ((data.description || data.excerpt || "") + "").trim();
    return {
      filePath: path.relative(REPO_ROOT, filePath),
      slug,
      title,
      titleTokens: tokenize(title),
      description: desc,
      category,
      keywords: Array.isArray(data.keywords)
        ? data.keywords.map((k) => k.toString().trim().toLowerCase())
        : [],
      faqsCount: Array.isArray(data.faqs) ? data.faqs.length : 0,
      author: data.author,
      date: data.date,
      updatedDate: data.updatedDate || data.updated_date,
      words: wordCount(content),
      canonical: data.canonical,
      image: data.image,
      content,
    };
  })
  .filter(Boolean);

// ---------- Build indices ----------
const articlesBySlug = new Map();
const urlToArticle = new Map();
for (const a of articles) {
  if (a.parseError) continue;
  articlesBySlug.set(a.slug, a);
  urlToArticle.set(`/blog/${a.category}/${a.slug}`, a);
}

// Inlinks (from content → internal URLs)
const LINK_RE = /\]\((\/[^\s)]+)\)/g;
const inlinksBySlug = new Map();
const internalLinkOccurrences = [];
for (const a of articles) {
  if (a.parseError) continue;
  const seen = new Set();
  let m;
  while ((m = LINK_RE.exec(a.content)) !== null) {
    const url = m[1].split("#")[0].replace(/\/+$/, "");
    if (!seen.has(url)) {
      seen.add(url);
      internalLinkOccurrences.push({ from: a.slug, url });
    }
  }
}

// Resolve inlinks
const brokenLinks = [];
for (const { from, url } of internalLinkOccurrences) {
  if (!url.startsWith("/blog/") || url.split("/").length < 4) continue; // solo artículo/hub
  const target = urlToArticle.get(url);
  if (target) {
    if (!inlinksBySlug.has(target.slug)) inlinksBySlug.set(target.slug, new Set());
    inlinksBySlug.get(target.slug).add(from);
  } else {
    // Puede ser hub /blog/temas/... o categoría, no lo contamos como roto
    if (!url.startsWith("/blog/temas/") && !urlToArticle.has(url)) {
      const isCategoryRoot = url.split("/").length === 3;
      if (!isCategoryRoot) brokenLinks.push({ from, url });
    }
  }
}

// ---------- Per-article issues ----------
const findings = [];
for (const a of articles) {
  if (a.parseError) {
    findings.push({
      slug: a.slug || path.basename(a.filePath),
      filePath: a.filePath,
      severity: "critical",
      type: "parse_error",
      detail: a.parseError,
    });
    continue;
  }
  const fileName = a.filePath;

  // Metadata
  if (!a.title) {
    findings.push({ slug: a.slug, filePath: fileName, severity: "high", type: "missing_title" });
  } else {
    if (a.title.length < TITLE_MIN)
      findings.push({ slug: a.slug, filePath: fileName, severity: "medium", type: "title_short", detail: `${a.title.length} chars (ideal ${TITLE_MIN}-${TITLE_MAX})` });
    if (a.title.length > TITLE_MAX)
      findings.push({ slug: a.slug, filePath: fileName, severity: "medium", type: "title_long", detail: `${a.title.length} chars (ideal ${TITLE_MIN}-${TITLE_MAX})` });
  }

  if (!a.description) {
    findings.push({ slug: a.slug, filePath: fileName, severity: "high", type: "missing_description" });
  } else {
    if (a.description.length < DESC_MIN)
      findings.push({ slug: a.slug, filePath: fileName, severity: "medium", type: "description_short", detail: `${a.description.length} chars (ideal ${DESC_MIN}-${DESC_MAX})` });
    if (a.description.length > DESC_MAX)
      findings.push({ slug: a.slug, filePath: fileName, severity: "low", type: "description_long", detail: `${a.description.length} chars (ideal ${DESC_MIN}-${DESC_MAX})` });
  }

  if (!a.keywords || a.keywords.length === 0)
    findings.push({ slug: a.slug, filePath: fileName, severity: "medium", type: "missing_keywords" });

  if (!a.category)
    findings.push({ slug: a.slug, filePath: fileName, severity: "high", type: "missing_category" });

  if (a.faqsCount === 0)
    findings.push({ slug: a.slug, filePath: fileName, severity: "medium", type: "missing_faqs", detail: "0 FAQs · perdemos FAQPage schema en Bing/Google" });

  // Content size
  if (a.words < THIN_WORDCOUNT)
    findings.push({ slug: a.slug, filePath: fileName, severity: "high", type: "thin_content", detail: `${a.words} palabras (<${THIN_WORDCOUNT})` });
  else if (a.words < IDEAL_WORDCOUNT)
    findings.push({ slug: a.slug, filePath: fileName, severity: "low", type: "short_content", detail: `${a.words} palabras (<${IDEAL_WORDCOUNT})` });

  // Outdated
  const newest = a.updatedDate || a.date;
  const ago = monthsAgo(newest);
  if (ago !== null && ago > OUTDATED_MONTHS)
    findings.push({ slug: a.slug, filePath: fileName, severity: "low", type: "outdated", detail: `Última actualización hace ${ago.toFixed(1)} meses` });

  // H1 en body (título ya es H1)
  const h1 = (a.content.match(/^# /gm) || []).length;
  if (h1 > 0)
    findings.push({ slug: a.slug, filePath: fileName, severity: "low", type: "h1_in_body", detail: `${h1} H1 dentro del markdown` });

  // Imágenes sin alt
  const noAlt = (a.content.match(/!\[\]\([^)]+\)/g) || []).length;
  if (noAlt > 0)
    findings.push({ slug: a.slug, filePath: fileName, severity: "low", type: "image_no_alt", detail: `${noAlt} imágenes sin alt` });

  // Orphan (0 inlinks internos desde otros artículos)
  const inlinks = inlinksBySlug.get(a.slug)?.size || 0;
  if (inlinks === 0)
    findings.push({ slug: a.slug, filePath: fileName, severity: "medium", type: "orphan", detail: "Ningún otro artículo enlaza a este" });
}

// Broken internal links
for (const b of brokenLinks) {
  findings.push({
    slug: b.from,
    filePath: articlesBySlug.get(b.from)?.filePath,
    severity: "high",
    type: "broken_internal_link",
    detail: b.url,
  });
}

// ---------- Canibalización ----------
const cannibals = [];
const byCategory = new Map();
for (const a of articles) {
  if (!a.category) continue;
  if (!byCategory.has(a.category)) byCategory.set(a.category, []);
  byCategory.get(a.category).push(a);
}

for (const [cat, arts] of byCategory) {
  for (let i = 0; i < arts.length; i++) {
    for (let j = i + 1; j < arts.length; j++) {
      const A = arts[i];
      const B = arts[j];
      const tJac = jaccard(A.titleTokens, B.titleTokens);
      const kOv = overlap(A.keywords, B.keywords);
      if (tJac >= CANNIBAL_TITLE_JACCARD || kOv >= CANNIBAL_KEYWORD_OVERLAP) {
        cannibals.push({
          category: cat,
          a: A.slug,
          b: B.slug,
          titleA: A.title,
          titleB: B.title,
          titleJaccard: +tJac.toFixed(2),
          keywordOverlap: +kOv.toFixed(2),
        });
      }
    }
  }
}
cannibals.sort((x, y) => (y.titleJaccard + y.keywordOverlap) - (x.titleJaccard + x.keywordOverlap));

// ---------- Stats ----------
const catStats = new Map();
for (const a of articles) {
  if (!a.category) continue;
  const s = catStats.get(a.category) || { count: 0, words: 0, thin: 0, orphans: 0, noFaq: 0 };
  s.count++;
  s.words += a.words;
  if (a.words < THIN_WORDCOUNT) s.thin++;
  if ((inlinksBySlug.get(a.slug)?.size || 0) === 0) s.orphans++;
  if (a.faqsCount === 0) s.noFaq++;
  catStats.set(a.category, s);
}

// ---------- Output ----------
const bySeverity = findings.reduce((acc, f) => {
  acc[f.severity] = (acc[f.severity] || 0) + 1;
  return acc;
}, {});

const jsonReport = {
  generatedAt: NOW.toISOString(),
  totals: {
    articles: articles.length,
    findings: findings.length,
    bySeverity,
    brokenInternalLinks: brokenLinks.length,
    cannibalizationPairs: cannibals.length,
  },
  byCategory: Object.fromEntries(
    [...catStats.entries()].map(([k, v]) => [
      k,
      { ...v, avgWords: Math.round(v.words / v.count) },
    ])
  ),
  findings,
  cannibals,
  brokenLinks,
};

fs.writeFileSync(
  path.join(REPO_ROOT, "audit-seo-report.json"),
  JSON.stringify(jsonReport, null, 2)
);

// ---------- Markdown report ----------
const mdLines = [];
mdLines.push(`# Auditoría SEO del blog — ${NOW.toISOString().slice(0, 10)}\n`);
mdLines.push(`_Generado por \`scripts/audit-blog-seo-full.mjs\`_\n`);

mdLines.push(`## Resumen\n`);
mdLines.push(`- Artículos analizados: **${articles.length}**`);
mdLines.push(`- Hallazgos totales: **${findings.length}**`);
mdLines.push(`  - Críticos: ${bySeverity.critical || 0}`);
mdLines.push(`  - Altos: ${bySeverity.high || 0}`);
mdLines.push(`  - Medios: ${bySeverity.medium || 0}`);
mdLines.push(`  - Bajos: ${bySeverity.low || 0}`);
mdLines.push(`- Enlaces internos rotos: **${brokenLinks.length}**`);
mdLines.push(`- Pares posibles de canibalización: **${cannibals.length}**\n`);

mdLines.push(`## Distribución por categoría\n`);
mdLines.push(`| Categoría | Artículos | Palabras medias | Thin (<${THIN_WORDCOUNT}w) | Huérfanos | Sin FAQ |`);
mdLines.push(`| --- | ---: | ---: | ---: | ---: | ---: |`);
for (const [cat, s] of [...catStats.entries()].sort((a, b) => b[1].count - a[1].count)) {
  mdLines.push(
    `| ${cat} | ${s.count} | ${Math.round(s.words / s.count)} | ${s.thin} | ${s.orphans} | ${s.noFaq} |`
  );
}
mdLines.push("");

// Thin content
const thin = findings.filter((f) => f.type === "thin_content");
if (thin.length) {
  mdLines.push(`## Thin content (<${THIN_WORDCOUNT} palabras) — ${thin.length}\n`);
  mdLines.push(`Alto riesgo para Bing/Google. Amplía o consolida con otro artículo.\n`);
  for (const f of thin.slice(0, 40)) mdLines.push(`- \`${f.filePath}\` — ${f.detail}`);
  if (thin.length > 40) mdLines.push(`- …y ${thin.length - 40} más (ver JSON).`);
  mdLines.push("");
}

// Orphans
const orphans = findings.filter((f) => f.type === "orphan");
if (orphans.length) {
  mdLines.push(`## Huérfanos sin enlaces internos entrantes — ${orphans.length}\n`);
  mdLines.push(`Ningún otro artículo del blog los enlaza. Añade 2-3 enlaces contextuales desde artículos de la misma categoría.\n`);
  for (const f of orphans.slice(0, 40)) mdLines.push(`- \`${f.filePath}\``);
  if (orphans.length > 40) mdLines.push(`- …y ${orphans.length - 40} más.`);
  mdLines.push("");
}

// Broken
if (brokenLinks.length) {
  mdLines.push(`## Enlaces internos rotos — ${brokenLinks.length}\n`);
  for (const b of brokenLinks.slice(0, 60)) mdLines.push(`- \`${b.from}\` → \`${b.url}\``);
  if (brokenLinks.length > 60) mdLines.push(`- …y ${brokenLinks.length - 60} más (ver JSON).`);
  mdLines.push("");
}

// Canibalización
if (cannibals.length) {
  mdLines.push(`## Canibalización potencial — ${cannibals.length} pares\n`);
  mdLines.push(`Pares dentro de la misma categoría con similitud alta de título o keywords. Revisa si conviene fusionar uno en otro con redirect 301.\n`);
  mdLines.push(`| Categoría | Artículo A | Artículo B | Sim. título | Overlap keywords |`);
  mdLines.push(`| --- | --- | --- | ---: | ---: |`);
  for (const c of cannibals.slice(0, 60)) {
    mdLines.push(`| ${c.category} | \`${c.a}\` | \`${c.b}\` | ${c.titleJaccard} | ${c.keywordOverlap} |`);
  }
  if (cannibals.length > 60) mdLines.push(`\n…y ${cannibals.length - 60} pares más (ver JSON).`);
  mdLines.push("");
}

// Title length issues
const titleShort = findings.filter((f) => f.type === "title_short");
const titleLong = findings.filter((f) => f.type === "title_long");
if (titleShort.length + titleLong.length) {
  mdLines.push(`## Títulos fuera de rango (${TITLE_MIN}-${TITLE_MAX})\n`);
  mdLines.push(`- Cortos (<${TITLE_MIN}): ${titleShort.length}`);
  mdLines.push(`- Largos (>${TITLE_MAX}): ${titleLong.length}\n`);
  for (const f of [...titleShort, ...titleLong].slice(0, 40)) {
    mdLines.push(`- \`${f.filePath}\` — ${f.detail}`);
  }
  mdLines.push("");
}

// Description length
const descShort = findings.filter((f) => f.type === "description_short");
const descLong = findings.filter((f) => f.type === "description_long");
const descMissing = findings.filter((f) => f.type === "missing_description");
if (descShort.length + descLong.length + descMissing.length) {
  mdLines.push(`## Meta description\n`);
  mdLines.push(`- Ausentes: ${descMissing.length}`);
  mdLines.push(`- Cortas (<${DESC_MIN}): ${descShort.length}`);
  mdLines.push(`- Largas (>${DESC_MAX}): ${descLong.length}\n`);
}

// Sin FAQ
const noFaq = findings.filter((f) => f.type === "missing_faqs");
if (noFaq.length) {
  mdLines.push(`## Sin FAQs — ${noFaq.length}\n`);
  mdLines.push(`Pierdes schema FAQPage, que en Bing y Google genera rich results bajo el snippet. Añade 4-6 FAQs por artículo.\n`);
  for (const f of noFaq.slice(0, 40)) mdLines.push(`- \`${f.filePath}\``);
  if (noFaq.length > 40) mdLines.push(`- …y ${noFaq.length - 40} más.`);
  mdLines.push("");
}

// Outdated
const outdated = findings.filter((f) => f.type === "outdated");
if (outdated.length) {
  mdLines.push(`## Outdated (>${OUTDATED_MONTHS} meses) — ${outdated.length}\n`);
  for (const f of outdated.slice(0, 40)) mdLines.push(`- \`${f.filePath}\` — ${f.detail}`);
  if (outdated.length > 40) mdLines.push(`- …y ${outdated.length - 40} más.`);
  mdLines.push("");
}

// Quick wins ordenados por impacto
mdLines.push(`## Quick wins priorizados\n`);
mdLines.push(`Plan sugerido de trabajo, mayor impacto primero:\n`);
mdLines.push(`1. **Resolver ${brokenLinks.length} enlaces internos rotos** (editar o retirar) — impacto directo en crawl y UX.`);
mdLines.push(`2. **Revisar ${cannibals.length} pares de canibalización** — fusionar con redirect 301 donde corresponda.`);
mdLines.push(`3. **Ampliar o fusionar ${thin.length} artículos thin** (<${THIN_WORDCOUNT} palabras).`);
mdLines.push(`4. **Enlazar los ${orphans.length} huérfanos** desde artículos hermanos (2-3 links contextuales).`);
mdLines.push(`5. **Añadir FAQs a los ${noFaq.length} sin ellas** — fácil win para FAQPage schema en Bing.`);
mdLines.push(`6. **Ajustar ${titleShort.length + titleLong.length} títulos** fuera de rango y ${descShort.length + descLong.length + descMissing.length} meta descriptions.`);
mdLines.push("");

fs.writeFileSync(
  path.join(REPO_ROOT, "audit-seo-report.md"),
  mdLines.join("\n")
);

console.log(`[audit] artículos=${articles.length} hallazgos=${findings.length}`);
console.log(`[audit] críticos=${bySeverity.critical || 0} altos=${bySeverity.high || 0} medios=${bySeverity.medium || 0} bajos=${bySeverity.low || 0}`);
console.log(`[audit] broken-links=${brokenLinks.length} cannibal-pairs=${cannibals.length}`);
console.log(`[audit] reportes: audit-seo-report.json · audit-seo-report.md`);
