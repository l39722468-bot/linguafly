/**
 * Reemplaza la parte ampliada del artículo por el fragmento en scripts/expansions/.
 * Detecta el encabezado H2 del fragmento y corta el markdown previo en ese punto.
 * Uso: node scripts/apply-unique-expansions.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MET = path.join(__dirname, "../src/content/blog/metodos");
const EXP = path.join(__dirname, "expansions");

const MAP = {
  "mejores-cursos-ingles-online-focus-english-examenes.md": "focus-english-examenes.md",
  "mejores-cursos-ingles-online-british-council.md": "british-council.md",
  "mejores-cursos-ingles-online-babbel.md": "babbel.md",
  "mejores-cursos-ingles-online-preply.md": "preply.md",
  "mejores-cursos-ingles-online-aba-english.md": "aba-english.md",
  "mejores-cursos-ingles-online-coursera-examenes.md": "coursera-examenes.md",
  "mejores-cursos-ingles-online-duolingo.md": "duolingo.md",
  "mejores-cursos-ingles-online-lingoda.md": "lingoda.md",
  "mejores-cursos-ingles-online-ef-english-live.md": "ef-english-live.md",
  "mejores-cursos-ingles-online-open-english.md": "open-english.md",
};

function wordCountBody(md) {
  const m = md.match(/^---[\s\S]*?---\s*/);
  if (!m) return 0;
  const body = md.slice(m[0].length);
  return body.trim().split(/\s+/).filter(Boolean).length;
}

function firstH2Line(expansionText) {
  const m = expansionText.match(/^\s*---\s*\n+\s*(##[^\n]+)/);
  return m ? m[1].trim() : null;
}

for (const [articleName, expName] of Object.entries(MAP)) {
  const articlePath = path.join(MET, articleName);
  const expPath = path.join(EXP, expName);
  const expansion = fs.readFileSync(expPath, "utf8").trim();
  const h2 = firstH2Line(expansion + "\n");
  if (!h2) {
    console.error("No H2 in expansion", expName);
    process.exit(1);
  }

  const needle = `\n---\n\n${h2}\n`;
  let md = fs.readFileSync(articlePath, "utf8");

  let prefix;
  if (md.includes(needle)) {
    prefix = md.split(needle)[0];
  } else {
    const legacy = "\n---\n\n## Ampliación:";
    if (md.includes(legacy)) {
      prefix = md.split(legacy)[0];
    } else {
      console.error("No se encontró punto de corte en", articleName, "buscando:", h2.slice(0, 50));
      process.exit(1);
    }
  }

  const out = `${prefix.trimEnd()}\n\n${expansion}\n`;
  const wc = wordCountBody(out);
  const readMin = Math.max(8, Math.round(wc / 180));
  const head = out.replace(/^readTime:.*$/m, `readTime: ${readMin} min`);
  fs.writeFileSync(articlePath, head, "utf8");
  console.log(articleName, "→", wc, "palabras, readTime", readMin, "min");
}
