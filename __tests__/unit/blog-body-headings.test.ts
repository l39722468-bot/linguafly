import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

function walk(dir: string, acc: string[] = []): string[] {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, acc);
    else if (name.endsWith(".md") || name.endsWith(".mdx")) acc.push(full);
  }
  return acc;
}

function bodyAfterFrontmatter(raw: string): string {
  const match = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
  return match ? raw.slice(match[0].length) : raw;
}

describe("published article markdown headings", () => {
  it("does not use H1 in the body (the page title is already H1)", () => {
    const offenders: string[] = [];
    for (const file of walk(BLOG_DIR)) {
      const body = bodyAfterFrontmatter(fs.readFileSync(file, "utf8"));
      if (/^# /m.test(body)) {
        offenders.push(path.relative(BLOG_DIR, file));
      }
    }
    expect(offenders).toEqual([]);
  });
});
