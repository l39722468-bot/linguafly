#!/usr/bin/env node
/**
 * Inventario heurístico de intención comercial del blog.
 * Clasifica candidatos para revisión humana; no mide demanda ni rendimiento SEO.
 * Uso: node scripts/audit-commercial-editorial.mjs [--json]
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const blogDir = path.join(root, "src/content/blog");
const outputDir = path.join(root, "reports/geo-aeo");
const writeJson = process.argv.includes("--json");

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.mdx?$/.test(entry.name)) out.push(full);
  }
  return out;
}
function clean(value = "") {
  return String(value).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
function classify(file, title, description) {
  const rel = path.relative(blogDir, file).split(path.sep).join("/");
  const haystack = (rel + " " + title + " " + description).toLocaleLowerCase("es");
  const rules = [
    { category: "apps", patterns: [/apps? de ingles/, /aplicaciones?/, /duolingo/, /babbel/, /busuu/, /apps-ingles/, /app-aprender-ingles/, /gratis.*pago/, /sin internet/, /offline/] },
    { category: "herramientas_ia", patterns: [/inteligencia artificial/, /\bia\b/, /chatgpt/, /pronunciacion.*ia/, /speaking.*ia/, /herramientas digitales/] },
    { category: "academias_cursos", patterns: [/academias?/, /cursos? de ingles/, /clases particulares/, /profesores? de ingles/, /aprender ingles online/, /precio.*curso/] },
    { category: "examenes", patterns: [/cambridge/, /\bb2\b/, /\bc1\b/, /first certificate/, /\bielts\b/, /\btoefl\b/, /preparar.*examen/] },
    { category: "empresas", patterns: [/ingles para empresas/, /business english/, /formacion.*empresa/, /ingles profesional/] }
  ];
  const matches = rules.filter(rule => rule.patterns.some(pattern => pattern.test(haystack))).map(rule => rule.category);
  let intent = "informational";
  let confidence = "low";
  if (/mejores?|comparativa|comparar|vs\b|alternativas?|gratis.*pago|cuanto cuesta|precio|merece la pena|recomiend|contratar|comprar|suscripcion|sin internet|offline/.test(haystack)) {
    intent = "commercial_investigation";
    confidence = matches.length ? "medium" : "low";
  }
  if (/precio|cuanto cuesta|contratar|comprar|suscripcion|academias? online|cursos? online|plataformas?/.test(haystack) && matches.length) {
    intent = "transactional_or_vendor_selection";
    confidence = "medium";
  }
  if (matches.length > 1) confidence = "low";
  return {
    path: "src/content/blog/" + rel,
    title: clean(title),
    editorialCategory: rel.split("/")[0] || "root",
    candidateCommercialCategories: matches.join("|"),
    inferredIntent: intent,
    confidence,
    needsHumanReview: true,
    recommendation: intent === "informational"
      ? "Valorar si existe una conexión natural con una decisión de compra; no forzar enlaces comerciales."
      : "Comprobar intención, frescura, fuentes, conversión y solapamiento antes de editar."
  };
}
function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? '"' + text.replaceAll('"', '""') + '"' : text;
}

const records = walk(blogDir).map(file => {
  try {
    const parsed = matter(fs.readFileSync(file, "utf8"));
    return classify(file, parsed.data.title || "", parsed.data.description || parsed.data.excerpt || "");
  } catch (error) {
    return {
      path: path.relative(root, file), title: "", editorialCategory: "",
      candidateCommercialCategories: "", inferredIntent: "parse_error",
      confidence: "none", needsHumanReview: true, recommendation: String(error)
    };
  }
}).sort((a, b) => a.inferredIntent.localeCompare(b.inferredIntent) || a.path.localeCompare(b.path));

fs.mkdirSync(outputDir, { recursive: true });
const fields = ["path", "title", "editorialCategory", "candidateCommercialCategories", "inferredIntent", "confidence", "needsHumanReview", "recommendation"];
const csv = [fields.join(","), ...records.map(record => fields.map(field => csvEscape(record[field])).join(","))].join("\n") + "\n";
fs.writeFileSync(path.join(outputDir, "commercial-editorial-inventory.csv"), csv);
const totals = records.reduce((acc, row) => {
  acc[row.inferredIntent] = (acc[row.inferredIntent] || 0) + 1;
  return acc;
}, {});
if (writeJson) {
  fs.writeFileSync(path.join(outputDir, "commercial-editorial-inventory.json"), JSON.stringify({
    generatedAt: new Date().toISOString(),
    note: "Clasificación heurística basada en rutas, títulos y metadatos; requiere revisión humana. No representa volumen de búsqueda, rankings ni conversiones.",
    totals: { articles: records.length, ...totals },
    records
  }, null, 2) + "\n");
}
console.log("Inventario comercial editorial: " + records.length + " artículos");
for (const [intent, count] of Object.entries(totals).sort((a, b) => b[1] - a[1])) console.log("  " + intent + ": " + count);
console.log("CSV guardado en " + path.relative(root, path.join(outputDir, "commercial-editorial-inventory.csv")));
if (writeJson) console.log("JSON guardado en " + path.relative(root, path.join(outputDir, "commercial-editorial-inventory.json")));
