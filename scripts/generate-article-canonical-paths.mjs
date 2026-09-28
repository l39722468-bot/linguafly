#!/usr/bin/env node
/**
 * Builds slug → /blog/{category}/{slug} for middleware canonical redirects.
 * Cloudflare has no fs over src/content, so the map is bundled.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const BLOG_DIR = path.join(ROOT, "src", "content", "blog");
const OUT_FILE = path.join(ROOT, "src", "lib", "seo", "article-canonical-paths.json");

function walkMarkdown(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walkMarkdown(full, acc);
    else if (name.endsWith(".md") || name.endsWith(".mdx")) acc.push(full);
  }
  return acc;
}

const map = {};
for (const file of walkMarkdown(BLOG_DIR)) {
  const rel = path.relative(BLOG_DIR, file);
  const parts = rel.split(path.sep);
  if (parts.length !== 2) continue;
  const category = parts[0];
  const slug = parts[1].replace(/\.mdx?$/, "");
  if (!slug || slug.startsWith(".")) continue;
  const canonical = `/blog/${category}/${slug}`;
  if (!map[slug]) {
    map[slug] = canonical;
  } else if (map[slug] !== canonical) {
    // El mismo slug existe en otro nivel (p. ej. repaso B1 y B2).
    // La clave corta se queda en el primero; esta conserva la lección del nivel.
    map[`${category}/${slug}`] = canonical;
  }
}

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, `${JSON.stringify(map, null, 0)}\n`);
console.warn(`[canonical-paths] wrote ${Object.keys(map).length} slugs → ${path.relative(ROOT, OUT_FILE)}`);

const coversByPath = new Map();
for (const file of walkMarkdown(BLOG_DIR)) {
  const slug = path.basename(file).replace(/\.mdx?$/, "");
  const { data } = matter(fs.readFileSync(file, "utf8"));
  const image = typeof data.image === "string" ? data.image.trim() : "";
  if (!image) continue;
  if (!coversByPath.has(image)) coversByPath.set(image, []);
  coversByPath.get(image).push(slug);
}

function coverKeeper(slugs) {
  const theory = slugs.filter((slug) => !slug.includes("ejercicios-soluciones"));
  const pool = theory.length ? theory : slugs;
  return [...pool].sort()[0];
}

const sharedCovers = {};
for (const [image, slugs] of coversByPath) {
  if (slugs.length < 2) continue;
  sharedCovers[image] = coverKeeper(slugs);
}
const sharedFile = path.join(ROOT, "src", "lib", "seo", "shared-article-covers.json");
fs.writeFileSync(sharedFile, `${JSON.stringify(sharedCovers, null, 0)}\n`);
console.warn(
  `[article-covers] wrote ${Object.keys(sharedCovers).length} shared images → ${path.relative(ROOT, sharedFile)}`,
);
