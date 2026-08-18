#!/usr/bin/env node
// Envía URLs a IndexNow (Bing, Yandex, Seznam, Naver) con una sola petición al endpoint compartido.
//
// Uso:
//   node scripts/indexnow-submit.mjs                 # URLs cambiadas en el último commit (modo por defecto tras un deploy)
//   node scripts/indexnow-submit.mjs --since=HEAD~5  # URLs cambiadas desde ese ref
//   node scripts/indexnow-submit.mjs --all           # Envía TODAS las URLs del sitemap en producción (one-shot)
//   node scripts/indexnow-submit.mjs --urls=https://... https://...   # Lista manual
//   node scripts/indexnow-submit.mjs --dry-run       # No envía, solo imprime payload
//
// Lógica de mapeo git → URL:
//   src/content/blog/<category>/<slug>.md → https://<HOST>/blog/<category>/<slug>
//
// Límite IndexNow: 10.000 URLs por petición; si hay más se trocea automáticamente.

import { execSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Host canónico del sitio (debe coincidir con getSiteUrl() / NEXT_PUBLIC_SITE_URL).
// Antes apuntaba a www.focus-on-english.com (dominio deshabilitado → IndexNow avisaba URLs muertas).
const HOST = (process.env.INDEXNOW_HOST || process.env.NEXT_PUBLIC_SITE_URL || "https://linguafly.app")
  .replace(/^https?:\/\//, "")
  .replace(/\/+$/, "");
const KEY = process.env.INDEXNOW_KEY || "59006008bf0856c11d13c983f0cd516d";
const KEY_LOCATION =
  process.env.INDEXNOW_KEY_LOCATION || `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const CHUNK = 10_000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

const args = process.argv.slice(2);
const flag = (name, def = undefined) => {
  const prefix = `--${name}`;
  const hit = args.find((a) => a === prefix || a.startsWith(`${prefix}=`));
  if (!hit) return def;
  if (hit === prefix) return true;
  return hit.slice(prefix.length + 1);
};

const ALL = flag("all", false) === true;
const SINCE = flag("since", "HEAD~1");
const URLS_MANUAL = args.filter((a) => /^https?:\/\//.test(a));
const DRY = flag("dry-run", false) === true;

const categoryFromPath = (relPath) => {
  // src/content/blog/<category>/<slug>.md
  const m = relPath.match(/^src\/content\/blog\/([^/]+)\/([^/]+)\.md$/);
  if (!m) return null;
  return { category: m[1], slug: m[2] };
};

const urlFor = ({ category, slug }) =>
  `https://${HOST}/blog/${category}/${slug}`;

/** Reescribe hosts antiguos / www al host canónico de IndexNow. */
const normalizeToHost = (rawUrl) => {
  try {
    const u = new URL(rawUrl);
    if (
      u.hostname === HOST ||
      u.hostname === `www.${HOST}` ||
      u.hostname === "www.focus-on-english.com" ||
      u.hostname === "focus-on-english.com" ||
      u.hostname === "www.linguafly.app" ||
      u.hostname === "linguafly.app"
    ) {
      u.protocol = "https:";
      u.hostname = HOST;
      u.hash = "";
      return u.toString().replace(/\/+$/, "") || `https://${HOST}`;
    }
  } catch {
    return null;
  }
  return null;
};

const getChangedMdUrls = (sinceRef) => {
  let out = "";
  try {
    out = execSync(
      `git diff --name-only --diff-filter=AMR ${sinceRef} HEAD -- 'src/content/blog/**/*.md'`,
      { cwd: repoRoot, encoding: "utf8" }
    );
  } catch (err) {
    console.error("[indexnow] git diff falló:", err.message);
    return [];
  }
  const files = out.split("\n").map((s) => s.trim()).filter(Boolean);
  const urls = new Set();
  for (const f of files) {
    const parts = categoryFromPath(f);
    if (parts) urls.add(urlFor(parts));
  }
  return [...urls];
};

const fetchSitemapUrls = async () => {
  const res = await fetch(`https://${HOST}/sitemap.xml`);
  if (!res.ok) {
    throw new Error(`sitemap fetch ${res.status}`);
  }
  const xml = await res.text();
  const matches = xml.match(/<loc>[^<]+<\/loc>/g) || [];
  return matches
    .map((m) => m.replace(/<\/?loc>/g, "").trim())
    .filter((u) => u.startsWith(`https://${HOST}`));
};

const submit = async (urlList) => {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };
  if (DRY) {
    console.log(`[indexnow] DRY-RUN ${urlList.length} URLs →`, body);
    return { ok: true, status: 0, dry: true };
  }
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  const text = await res.text().catch(() => "");
  return { ok: res.ok, status: res.status, text };
};

const verifyKeyFile = () => {
  const keyPath = path.join(repoRoot, "public", `${KEY}.txt`);
  if (!existsSync(keyPath)) {
    console.error(`[indexnow] falta public/${KEY}.txt — no puedo continuar.`);
    process.exit(1);
  }
  const content = readFileSync(keyPath, "utf8").trim();
  if (content !== KEY) {
    console.error(
      `[indexnow] public/${KEY}.txt no contiene la clave esperada. Debe ser exactamente: ${KEY}`
    );
    process.exit(1);
  }
};

const main = async () => {
  verifyKeyFile();

  let urls = [];
  let mode = "";
  if (URLS_MANUAL.length) {
    urls = URLS_MANUAL;
    mode = "manual";
  } else if (ALL) {
    urls = await fetchSitemapUrls();
    mode = "sitemap";
  } else {
    urls = getChangedMdUrls(SINCE);
    mode = `git-diff(${SINCE})`;
  }

  urls = [...new Set(urls)]
    .map((u) => normalizeToHost(u) || (u.startsWith(`https://${HOST}/`) ? u.replace(/\/+$/, "") : null))
    .filter(Boolean);
  if (urls.length === 0) {
    console.log(`[indexnow] modo=${mode}: no hay URLs que notificar.`);
    return;
  }

  console.log(`[indexnow] host=${HOST} · modo=${mode} · ${urls.length} URLs:`);
  for (const u of urls.slice(0, 20)) console.log(`  - ${u}`);
  if (urls.length > 20) console.log(`  … (+${urls.length - 20} más)`);

  for (let i = 0; i < urls.length; i += CHUNK) {
    const chunk = urls.slice(i, i + CHUNK);
    const r = await submit(chunk);
    console.log(
      `[indexnow] chunk ${i / CHUNK + 1}/${Math.ceil(urls.length / CHUNK)} · ` +
        `status=${r.status} ok=${r.ok}${r.text ? ` body=${r.text.slice(0, 200)}` : ""}`
    );
    if (!r.ok && !r.dry) process.exitCode = 1;
  }
};

main().catch((err) => {
  console.error("[indexnow] error:", err);
  process.exit(1);
});
