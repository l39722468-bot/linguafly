import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

/**
 * Réplica del `optimizeSEOTitle` actual (src/utils/seo-utils.ts).
 * Desde el cambio, la función devuelve el título tal cual.
 */
function optimizeSEOTitle(title) {
  if (!title || typeof title !== "string") return title || "Focus English";
  return title;
}

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, acc);
    else if (entry.isFile() && /\.(md|mdx)$/.test(entry.name)) acc.push(p);
  }
  return acc;
}

const files = walk(BLOG_DIR);
const rows = files.map((file) => {
  const raw = fs.readFileSync(file, "utf-8");
  const { data } = matter(raw);
  const title = data?.title || "(SIN TITULO)";
  const optimized = optimizeSEOTitle(title);
  return {
    file: path.relative(process.cwd(), file),
    title,
    optimized,
    len: optimized.length,
  };
});

const total = rows.length;
const over60 = rows.filter((r) => r.len > 60);
const over55 = rows.filter((r) => r.len > 55);
const over50 = rows.filter((r) => r.len > 50);

const fmt = (n) => String(n).padStart(4);
const pct = (n) => ((n / total) * 100).toFixed(1) + "%";

console.log("============================================================");
console.log("AUDITORÍA DE TÍTULOS (sin sufijo ni año auto)");
console.log("============================================================");
console.log(`Total artículos: ${fmt(total)}`);
console.log("");
console.log("--- Distribución de longitudes (lo que ve Google) ---");
console.log(`  ≤ 50 caracteres:  ${fmt(total - over50.length)} (${pct(total - over50.length)})`);
console.log(`  ≤ 55 caracteres:  ${fmt(total - over55.length)} (${pct(total - over55.length)})`);
console.log(`  ≤ 60 caracteres:  ${fmt(total - over60.length)} (${pct(total - over60.length)})`);
console.log(`  > 60 caracteres:  ${fmt(over60.length)} (${pct(over60.length)})`);
console.log("");

const lens = rows.map((r) => r.len).sort((a, b) => a - b);
const avg = (lens.reduce((s, n) => s + n, 0) / total).toFixed(1);
console.log(`  Media:   ${avg}`);
console.log(`  Mediana: ${lens[Math.floor(lens.length / 2)]}`);
console.log(`  P90:     ${lens[Math.floor(lens.length * 0.9)]}`);
console.log(`  Máximo:  ${lens[lens.length - 1]}`);
console.log("");

// Heurística de títulos semánticamente truncados:
// terminan con conjunciones, pronombres o palabras que "esperan continuación".
const DANGLING = new Set(
  [
    "el","la","los","las","y","o","u","e","de","del","en","con","sin",
    "por","para","sobre","que","tan","muy","más","mas","como","qué",
    "cual","cuál","dos","tres","4","5","1st","2nd","3rd",
    "palabras","ejercicio","lista","usos","tips","consejos","ideas",
    "need","dare","is","are","be",
  ].map((w) => w.toLowerCase())
);
const suspected = rows.filter((r) => {
  const normalized = r.title.replace(/[^\w\sáéíóúñÁÉÍÓÚÑ]/g, " ").trim();
  const lastWord = normalized.split(/\s+/).pop()?.toLowerCase() || "";
  return DANGLING.has(lastWord);
});

console.log(`--- Posibles títulos TRUNCADOS (terminan en palabra "pendiente"): ${suspected.length} ---`);
suspected
  .sort((a, b) => b.len - a.len)
  .forEach((r, i) => {
    console.log(`${String(i + 1).padStart(2)}. [${String(r.len).padStart(2)} ch] ${r.file}`);
    console.log(`     "${r.title}"`);
  });
console.log("");

// Top 15 títulos más largos
const longest = [...rows].sort((a, b) => b.len - a.len).slice(0, 15);
console.log("--- TOP 15 títulos más largos ---");
longest.forEach((r, i) => {
  console.log(`${String(i + 1).padStart(2)}. [${String(r.len).padStart(2)} ch] ${r.file}`);
  console.log(`     "${r.title}"`);
});
console.log("");

const csvPath = path.join(process.cwd(), "scripts/audit-titles-report.csv");
const csv = [
  "file;title;len;fits_60",
  ...rows.map((r) =>
    [r.file, `"${r.title.replace(/"/g, '""')}"`, r.len, r.len <= 60 ? "yes" : "no"].join(";")
  ),
].join("\n");
fs.writeFileSync(csvPath, csv, "utf-8");
console.log(`CSV: ${csvPath}`);
