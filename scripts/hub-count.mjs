import fs from "fs";
import path from "path";
import matter from "gray-matter";

const hubsDir = "src/content/hubs";
const blogDir = "src/content/blog";

const slugify = (s) => s.toLowerCase()
  .replace(/á/g,"a").replace(/é/g,"e").replace(/í/g,"i").replace(/ó/g,"o").replace(/ú/g,"u").replace(/ñ/g,"n")
  .replace(/[^\w\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").trim();

const articles = [];
for (const cat of fs.readdirSync(blogDir)) {
  const catDir = path.join(blogDir, cat);
  if (!fs.statSync(catDir).isDirectory()) continue;
  for (const f of fs.readdirSync(catDir)) {
    if (!f.endsWith(".md")) continue;
    const raw = fs.readFileSync(path.join(catDir, f), "utf8");
    const { data } = matter(raw);
    articles.push({
      slug: f.replace(/\.md$/, ""),
      category: cat,
      title: data.title || "",
      keywords: (data.keywords || []).map(k => slugify(k)),
    });
  }
}

const hubs = fs.readdirSync(hubsDir).filter(f => f.endsWith(".md")).map(f => f.replace(/\.md$/, ""));
const results = [];
for (const hub of hubs) {
  const count = articles.filter(a =>
    a.keywords.includes(hub) ||
    a.keywords.includes(slugify(hub.replace(/-/g," ")))
  ).length;
  results.push({ hub, count });
}
results.sort((a,b)=>a.count-b.count);
console.log("Hub | Artículos que lo matchean por keyword");
console.log("----|---");
for (const r of results) console.log(`${r.hub} | ${r.count}`);
