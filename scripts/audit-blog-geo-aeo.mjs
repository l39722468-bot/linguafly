#!/usr/bin/env node
/**
 * Auditoría heurística GEO/AEO para los artículos Markdown del blog.
 * No modifica los artículos ni afirma medir rankings: prioriza señales editoriales
 * observables (respuestas directas, FAQs útiles, estructura, enlaces y metadatos).
 *
 * Uso: npm run audit:geo-aeo
 *      npm run audit:geo-aeo -- --json
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const blogDir = path.join(root, "src/content/blog");
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
function clean(text = "") {
  return String(text)
    .replace(/<[^>]*>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\s+/g, " ").trim();
}
function words(text = "") {
  return clean(text).split(/\s+/).filter(Boolean).length;
}
function add(issues, severity, code, detail) {
  issues.push({ severity, code, detail });
}

const articles = walk(blogDir).map((file) => {
  const rel = path.relative(root, file);
  try {
    const { data, content } = matter(fs.readFileSync(file, "utf8"));
    const issues = [];
    const title = String(data.title || "").trim();
    const description = String(data.description || data.excerpt || "").trim();
    const faqs = Array.isArray(data.faqs) ? data.faqs : [];
    const bodyWords = words(content);
    const headings = [...content.matchAll(/^#{2,6}\s+(.+)$/gm)].map((m) => m[1].trim());
    const internalLinks = [...content.matchAll(/\[[^\]]+\]\((\/(?!\/)[^\s)]+)\)/g)];
    const externalLinks = [...content.matchAll(/\[[^\]]+\]\((https?:\/\/[^\s)]+)\)/g)];
    const firstChunk = clean(content).slice(0, 700);
    const firstAnswerSignals = /\b(es|son|se usa|se utiliza|significa|consiste en|permite|ocurre cuando|la diferencia|para usar|to use|is a|are|means|refers to|you should|you can)\b/i.test(firstChunk);
    const usableFaqs = faqs.filter((faq) => String(faq?.question || "").trim() && words(faq?.answer || "") >= 25);

    if (!title) add(issues, "high", "missing_title", "Falta title.");
    else if (title.length < 30 || title.length > 65) add(issues, "medium", "title_length", `Título de ${title.length} caracteres; revisar legibilidad y truncamiento.`);
    if (!description) add(issues, "high", "missing_description", "Falta description/excerpt para el snippet.");
    else if (description.length < 110 || description.length > 170) add(issues, "medium", "description_length", `Descripción de ${description.length} caracteres; revisar si resume la intención de búsqueda.`);
    if (!Array.isArray(data.keywords) || !data.keywords.length) add(issues, "low", "missing_keywords", "No hay keywords declaradas (señal editorial, no factor decisivo por sí sola).");
    if (!data.author) add(issues, "medium", "missing_author", "No se declara autor en el frontmatter.");
    if (!data.date && !data.updatedDate && !data.updated_date) add(issues, "low", "missing_dates", "No hay fecha de publicación/actualización.");
    if (!headings.length) add(issues, "high", "missing_subheadings", "No hay encabezados H2–H6 que segmenten la respuesta.");
    if (!/^\s*#{1}\s/m.test(content) && !headings.length) add(issues, "medium", "weak_structure", "Revisar la estructura semántica del contenido.");
    if (!usableFaqs.length) add(issues, "medium", "no_answer_faqs", "No hay FAQ con pregunta y respuesta de al menos 25 palabras.");
    else if (usableFaqs.length < 3) add(issues, "low", "few_answer_faqs", `Solo ${usableFaqs.length} FAQ(s) con respuesta desarrollada.`);
    if (bodyWords < 300) add(issues, "high", "very_short", `${bodyWords} palabras limpias; comprobar si resuelve la intención completa.`);
    else if (bodyWords < 700) add(issues, "medium", "short_content", `${bodyWords} palabras limpias; valorar profundidad según la intención, sin alargar por alargar.`);
    if (!firstAnswerSignals) add(issues, "medium", "answer_not_obvious_early", "El inicio no contiene señales textuales típicas de definición/respuesta directa; revisión humana recomendada.");
    if (internalLinks.length === 0) add(issues, "medium", "no_internal_links", "No se detectaron enlaces internos Markdown.");
    if (externalLinks.length === 0) add(issues, "low", "no_external_sources", "No se detectaron enlaces externos Markdown; añadir fuentes fiables cuando el tema lo requiera.");
    if (!data.image) add(issues, "low", "missing_image", "No se declara imagen principal.");
    if (data.image && !data.alt) add(issues, "low", "missing_image_alt", "Hay imagen principal pero no alt en metadatos.");

    const score = Math.max(0, 100 - issues.reduce((n, issue) => n + ({ high: 18, medium: 8, low: 3 }[issue.severity] || 0), 0));
    return { file: rel, title, words: bodyWords, faqCount: faqs.length, score, issues };
  } catch (error) {
    return { file: rel, title: "", words: 0, faqCount: 0, score: 0, issues: [{ severity: "high", code: "parse_error", detail: String(error) }] };
  }
});

const totals = { files: articles.length, avgScore: 0, bySeverity: { high: 0, medium: 0, low: 0 }, byCode: {} };
for (const article of articles) {
  for (const issue of article.issues) {
    totals.bySeverity[issue.severity] = (totals.bySeverity[issue.severity] || 0) + 1;
    totals.byCode[issue.code] = (totals.byCode[issue.code] || 0) + 1;
  }
}
totals.avgScore = articles.length ? Math.round(articles.reduce((sum, a) => sum + a.score, 0) / articles.length) : 0;
articles.sort((a, b) => a.score - b.score || b.issues.length - a.issues.length);
console.log(`\nAuditoría heurística GEO/AEO · ${totals.files} artículos`);
console.log(`Puntuación heurística media: ${totals.avgScore}/100 (no es una métrica de Google ni predice rankings)`);
console.log(`Hallazgos: alta ${totals.bySeverity.high || 0} · media ${totals.bySeverity.medium || 0} · baja ${totals.bySeverity.low || 0}\n`);
console.log("Hallazgos más frecuentes:");
for (const [code, count] of Object.entries(totals.byCode).sort((a, b) => b[1] - a[1]).slice(0, 12)) console.log(`  ${String(count).padStart(4)}  ${code}`);
console.log("\n20 artículos con más incidencias:");
for (const a of articles.slice(0, 20)) console.log(`  [${String(a.score).padStart(3)}] ${a.file} — ${a.issues.length} hallazgo(s)`);
if (writeJson) {
  const out = path.join(root, "audit-geo-aeo-report.json");
  fs.writeFileSync(out, JSON.stringify({ generatedAt: new Date().toISOString(), note: "Heurística editorial; requiere revisión humana.", totals, articles }, null, 2) + "\n");
  console.log(`\nInforme JSON guardado en ${path.relative(root, out)}`);
}
