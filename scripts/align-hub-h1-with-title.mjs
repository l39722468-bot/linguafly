/**
 * Sustituye el primer H1 (# ...) del cuerpo por el texto de `title` del frontmatter
 * en cada archivo de src/content/hubs/*.md
 *
 * Uso: node scripts/align-hub-h1-with-title.mjs
 *      node scripts/align-hub-h1-with-title.mjs --dry-run
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HUB_DIR = path.join(__dirname, "../src/content/hubs");
const DRY = process.argv.includes("--dry-run");

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

/** Devuelve { prefix: hasta fin de frontmatter inclusive, body: resto } */
function splitFrontmatter(content) {
  const m = content.match(/^---\n([\s\S]*?)\n---(\r?\n?)/);
  if (!m) return null;
  const prefix = m[0];
  const body = content.slice(prefix.length);
  return { prefix, fmInner: m[1], body };
}

let updated = 0;
let unchanged = 0;
let noH1 = 0;

for (const name of fs.readdirSync(HUB_DIR).sort()) {
  if (!name.endsWith(".md")) continue;
  const file = path.join(HUB_DIR, name);
  const content = fs.readFileSync(file, "utf8");
  const parts = splitFrontmatter(content);
  if (!parts) {
    noH1++;
    console.warn("No frontmatter:", name);
    continue;
  }
  const title = parseTitleFromFrontmatter(parts.fmInner);
  if (!title) {
    noH1++;
    continue;
  }

  const lines = parts.body.split(/\r?\n/);
  let h1Index = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^#\s+/.test(lines[i])) {
      h1Index = i;
      break;
    }
  }
  if (h1Index === -1) {
    noH1++;
    console.warn("No H1:", name);
    continue;
  }

  const newH1 = `# ${title}`;
  if (lines[h1Index] === newH1) {
    unchanged++;
    continue;
  }

  lines[h1Index] = newH1;
  const newBody = lines.join("\n");
  const out = parts.prefix + newBody;

  if (!DRY) {
    fs.writeFileSync(file, out, "utf8");
  }
  updated++;
  console.log(`${name}\n  H1 → ${title}`);
}

console.log(
  `\nDone. ${updated} updated, ${unchanged} already aligned, ${noH1} skipped. Dry-run: ${DRY}`
);
