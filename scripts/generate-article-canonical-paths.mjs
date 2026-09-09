#!/usr/bin/env node
/**
 * Builds slug → /blog/{category}/{slug} for middleware canonical redirects.
 * Cloudflare has no fs over src/content, so the map is bundled.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

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
  if (!map[slug]) map[slug] = `/blog/${category}/${slug}`;
}

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, `${JSON.stringify(map, null, 0)}\n`);
console.warn(`[canonical-paths] wrote ${Object.keys(map).length} slugs → ${path.relative(ROOT, OUT_FILE)}`);
