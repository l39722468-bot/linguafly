#!/usr/bin/env node
/**
 * Demote markdown ATX H1 (`# `) in article bodies to H2.
 * The page already renders <h1>{frontmatter.title}</h1>.
 * Leaves YAML frontmatter untouched.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const BLOG_DIR = path.join(ROOT, "src", "content", "blog");

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, acc);
    else if (name.endsWith(".md") || name.endsWith(".mdx")) acc.push(full);
  }
  return acc;
}

function splitFrontmatter(raw) {
  const match = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
  if (!match) return { head: "", body: raw };
  return { head: match[0], body: raw.slice(match[0].length) };
}

function demoteBodyH1s(body) {
  const lines = body.split("\n");
  let inFence = false;
  return lines
    .map((line) => {
      if (/^(`{3,}|~{3,})/.test(line)) {
        inFence = !inFence;
        return line;
      }
      if (inFence) return line;
      if (line.startsWith("# ") && !line.startsWith("## ")) return `#${line}`;
      return line;
    })
    .join("\n");
}

let changed = 0;
let remaining = 0;
for (const file of walk(BLOG_DIR)) {
  const raw = fs.readFileSync(file, "utf8");
  const { head, body } = splitFrontmatter(raw);
  const nextBody = demoteBodyH1s(body);
  if (nextBody !== body) {
    fs.writeFileSync(file, `${head}${nextBody}`);
    changed += 1;
  }
  remaining += (nextBody.match(/^# /gm) || []).length;
}

console.warn(`[demote-h1] updated ${changed} files; remaining body H1s: ${remaining}`);
