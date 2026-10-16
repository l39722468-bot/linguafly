#!/usr/bin/env node
/**
 * Resume resultados observados del piloto de visibilidad comercial en IA.
 * No consulta modelos ni infiere resultados que no estén en el CSV.
 * Uso: node scripts/report-commercial-visibility.mjs <resultados.csv> [--brand=LinguaFly] [--json]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const input = args.find((arg) => !arg.startsWith("--"));
const brandArg = args.find((arg) => arg.startsWith("--brand="));
const targetBrand = brandArg ? brandArg.slice("--brand=".length).trim() : "LinguaFly";
const jsonOutput = args.includes("--json");

if (!input || !targetBrand) {
  console.error("Uso: node scripts/report-commercial-visibility.mjs <resultados.csv> [--brand=LinguaFly] [--json]");
  process.exit(1);
}

const inputPath = path.resolve(process.cwd(), input);
if (!fs.existsSync(inputPath)) {
  console.error("No se encuentra el CSV: " + inputPath);
  process.exit(1);
}

// Parser CSV compatible con comillas escapadas y saltos de línea dentro de campos.
function parseCsv(source) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < source.length; i++) {
    const ch = source[i];
    if (quoted) {
      if (ch === '"' && source[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"' && field.length === 0) quoted = true;
    else if (ch === ",") { row.push(field); field = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && source[i + 1] === "\n") i++;
      row.push(field);
      if (row.some((cell) => cell.trim() !== "")) rows.push(row);
      row = [];
      field = "";
    } else field += ch;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  if (!rows.length) return [];
  const headers = rows.shift().map((value) => value.trim().replace(/^\uFEFF/, ""));
  return rows.map((values) => Object.fromEntries(headers.map((header, i) => [header, (values[i] || "").trim()])));
}
function truthy(value) {
  return /^(1|true|yes|sí|si|x)$/i.test(String(value || "").trim());
}
function splitValues(value) {
  return String(value || "").split(/[;|\n]+/).map((v) => v.trim()).filter(Boolean);
}
function urlsFrom(row) {
  return [...(row.cited_urls || "").split(/[\s;]+/), ...(row.linguafly_urls_cited || "").split(/[\s;]+/)]
    .map((url) => url.trim().replace(/[),.]+$/, ""))
    .filter((url) => /^https?:\/\//i.test(url));
}
const rows = parseCsv(fs.readFileSync(inputPath, "utf8"));
const required = ["system", "query_id", "brands_mentioned", "brands_recommended", "cited_urls", "linguafly_cited"];
if (rows.length && required.some((key) => !(key in rows[0]))) {
  console.error("El CSV no contiene las columnas requeridas: " + required.join(", "));
  process.exit(1);
}
const validRows = rows.filter((row) => row.system && row.query_id);
const brandNeedle = targetBrand.toLocaleLowerCase("es");
const matchesBrand = (value) => splitValues(value).some((name) => name.toLocaleLowerCase("es").includes(brandNeedle));
const distinctUrls = new Set(validRows.flatMap(urlsFrom));
const systems = [...new Set(validRows.map((row) => row.system))].sort();
const bySystem = systems.map((system) => {
  const subset = validRows.filter((row) => row.system === system);
  const mentions = subset.filter((row) => matchesBrand(row.brands_mentioned)).length;
  const recommendations = subset.filter((row) => matchesBrand(row.brands_recommended)).length;
  const citations = subset.filter((row) => truthy(row.linguafly_cited) || urlsFrom(row).some((url) => /(?:^|:\/\/|\.)(?:www\.)?linguafly\.app\//i.test(url))).length;
  return {
    system,
    validRuns: subset.length,
    brandMentionRuns: mentions,
    brandMentionRate: subset.length ? Number((mentions / subset.length).toFixed(4)) : null,
    brandRecommendationRuns: recommendations,
    brandRecommendationRate: subset.length ? Number((recommendations / subset.length).toFixed(4)) : null,
    linguaflyCitationRuns: citations,
    linguaflyCitationRate: subset.length ? Number((citations / subset.length).toFixed(4)) : null,
    distinctCitedUrls: new Set(subset.flatMap(urlsFrom)).size,
  };
});
const total = validRows.length;
const count = (predicate) => validRows.filter(predicate).length;
const summary = {
  generatedAt: new Date().toISOString(),
  sourceFile: path.relative(process.cwd(), inputPath),
  targetBrand,
  note: "Solo resume filas registradas; no consulta asistentes, valida la veracidad de las respuestas ni demuestra causalidad.",
  totalValidRuns: total,
  brandMentionRuns: count((row) => matchesBrand(row.brands_mentioned)),
  brandMentionRate: total ? Number((count((row) => matchesBrand(row.brands_mentioned)) / total).toFixed(4)) : null,
  brandRecommendationRuns: count((row) => matchesBrand(row.brands_recommended)),
  brandRecommendationRate: total ? Number((count((row) => matchesBrand(row.brands_recommended)) / total).toFixed(4)) : null,
  linguaflyCitationRuns: count((row) => truthy(row.linguafly_cited) || urlsFrom(row).some((url) => /(?:^|:\/\/|\.)(?:www\.)?linguafly\.app\//i.test(url))),
  linguaflyCitationRate: total ? Number((count((row) => truthy(row.linguafly_cited) || urlsFrom(row).some((url) => /(?:^|:\/\/|\.)(?:www\.)?linguafly\.app\//i.test(url))) / total).toFixed(4)) : null,
  distinctCitedUrls: distinctUrls.size,
  systems: bySystem,
};

if (jsonOutput) {
  console.log(JSON.stringify(summary, null, 2));
} else {
  const pct = (value) => value === null ? "n/d" : (value * 100).toFixed(1) + "%";
  console.log("# Informe de visibilidad comercial en IA");
  console.log("");
  console.log("- Marca analizada: " + targetBrand);
  console.log("- Ejecuciones válidas: " + total);
  console.log("- Tasa de mención: " + pct(summary.brandMentionRate) + " (" + summary.brandMentionRuns + "/" + total + ")");
  console.log("- Tasa de recomendación: " + pct(summary.brandRecommendationRate) + " (" + summary.brandRecommendationRuns + "/" + total + ")");
  console.log("- Tasa de cita de LinguaFly: " + pct(summary.linguaflyCitationRate) + " (" + summary.linguaflyCitationRuns + "/" + total + ")");
  console.log("- URLs citadas distintas registradas: " + distinctUrls.size);
  console.log("");
  console.log("| Sistema | Ejecuciones | Menciones | Recomendaciones | Citas LinguaFly |");
  console.log("|---|---:|---:|---:|---:|");
  for (const item of bySystem) {
    console.log("| " + item.system + " | " + item.validRuns + " | " + pct(item.brandMentionRate) + " | " + pct(item.brandRecommendationRate) + " | " + pct(item.linguaflyCitationRate) + " |");
  }
  console.log("");
  console.log("> " + summary.note);
  if (!total) console.log("> No hay ejecuciones registradas. Este archivo no es una medición de línea base.");
}
