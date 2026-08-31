#!/usr/bin/env node
// Envía URLs a IndexNow (Bing, Yandex, Seznam, Naver) con una sola petición al endpoint compartido.
//
// Uso:
//   node scripts/indexnow-submit.mjs                 # URLs del último commit (tras deploy en main)
//   node scripts/indexnow-submit.mjs --since=HEAD~5  # URLs cambiadas desde ese ref
//   node scripts/indexnow-submit.mjs --all           # Todas las URLs del sitemap en producción
//   node scripts/indexnow-submit.mjs --urls=https://... https://...
//   node scripts/indexnow-submit.mjs --dry-run
//   node scripts/indexnow-submit.mjs --verify-live   # Solo envía URLs que responden 2xx/3xx
//   node scripts/indexnow-submit.mjs --force         # Permite envío fuera de main (usar con cuidado)
//
// Importante: NO enviar URLs de un PR antes del merge + deploy. Bing las rastrea y marca 404.
// Fuera de CI el script exige branch `main` salvo --force.

import { execSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HOST = (process.env.INDEXNOW_HOST || process.env.NEXT_PUBLIC_SITE_URL || "https://linguafly.app")
  .replace(/^https?:\/\//, "")
  .replace(/\/+$/, "");
const KEY = process.env.INDEXNOW_KEY || "59006008bf0856c11d13c983f0cd516d";
const KEY_LOCATION =
  process.env.INDEXNOW_KEY_LOCATION || `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const CHUNK = 10_000;
const VERIFY_ATTEMPTS = Number(process.env.INDEXNOW_VERIFY_ATTEMPTS || 4);
const VERIFY_WAIT_MS = Number(process.env.INDEXNOW_VERIFY_WAIT_MS || 45_000);

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
const FORCE = flag("force", false) === true;
const VERIFY_LIVE = flag("verify-live", false) === true;
const IN_CI = Boolean(process.env.GITHUB_ACTIONS);

const categoryFromPath = (relPath) => {
  const m = relPath.match(/^src\/content\/blog\/([^/]+)\/([^/]+)\.md$/);
  if (!m) return null;
  return { category: m[1], slug: m[2] };
};

const urlFor = ({ category, slug }) =>
  `https://${HOST}/blog/${category}/${slug}`;

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

const getCurrentBranch = () => {
  try {
    return execSync("git rev-parse --abbrev-ref HEAD", {
      cwd: repoRoot,
      encoding: "utf8",
    }).trim();
  } catch {
    return "";
  }
};

const assertSafeToSubmit = () => {
  if (IN_CI || FORCE) return;
  const branch = getCurrentBranch();
  if (branch && branch !== "main") {
    console.error(
      `[indexnow] ABORT: estás en branch "${branch}", no en main.\n` +
        `  Enviar IndexNow desde un PR indexa URLs que aún no existen en producción → Bing ve 404.\n` +
        `  Flujo correcto: merge a main → esperar deploy CF → comprobar 200 → luego IndexNow.\n` +
        `  Si las URLs YA responden 200 en https://${HOST}, usa --force --verify-live.`
    );
    process.exit(1);
  }
};

const getChangedMdUrls = (sinceRef) => {
  let out = "";
  try {
    out = execSync(
      `git diff --name-only --diff-filter=AMR ${sinceRef} HEAD -- 'src/content/blog/**/*.md' 'src/content/hubs/**/*.md'`,
      { cwd: repoRoot, encoding: "utf8" }
    );
  } catch (err) {
    console.error("[indexnow] git diff falló:", err.message);
    return [];
  }
  const files = out.split("\n").map((s) => s.trim()).filter(Boolean);
  const urls = new Set();
  for (const f of files) {
    const blog = categoryFromPath(f);
    if (blog) {
      urls.add(urlFor(blog));
      continue;
    }
    const hub = f.match(/^src\/content\/hubs\/([^/]+)\.md$/);
    if (hub) {
      urls.add(`https://${HOST}/blog/temas/${hub[1]}`);
    }
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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const checkUrlLive = async (url) => {
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      headers: {
        // Evitar respuestas vacías de algunos WAF; no engaña Bot Fight Mode agresivo.
        "User-Agent": "LinguaFly-IndexNow-Verify/1.0 (+https://linguafly.app)",
        Accept: "text/html,application/xhtml+xml",
      },
    });
    return { url, status: res.status, ok: res.status >= 200 && res.status < 400 };
  } catch (err) {
    return { url, status: 0, ok: false, error: err.message };
  }
};

const filterLiveUrls = async (urls) => {
  const live = [];
  const dead = [];

  for (let attempt = 1; attempt <= VERIFY_ATTEMPTS; attempt++) {
    const toCheck = urls.filter((u) => !live.includes(u));
    if (toCheck.length === 0) break;

    if (attempt > 1) {
      console.log(
        `[indexnow] verify-live: reintento ${attempt}/${VERIFY_ATTEMPTS} en ${VERIFY_WAIT_MS / 1000}s (${toCheck.length} URLs pendientes)…`
      );
      await sleep(VERIFY_WAIT_MS);
    } else {
      console.log(`[indexnow] verify-live: comprobando ${toCheck.length} URLs en https://${HOST}…`);
    }

    const results = [];
    // Secuencial para no disparar rate limits / WAF
    for (const u of toCheck) {
      results.push(await checkUrlLive(u));
    }

    for (const r of results) {
      if (r.ok) {
        if (!live.includes(r.url)) live.push(r.url);
        console.log(`  ✓ ${r.status} ${r.url}`);
      } else if (attempt === VERIFY_ATTEMPTS) {
        dead.push(r);
        console.log(`  ✗ ${r.status || "ERR"}${r.error ? ` (${r.error})` : ""} ${r.url}`);
      } else {
        console.log(`  … ${r.status || "ERR"} (reintentará) ${r.url}`);
      }
    }
  }

  if (dead.length) {
    console.warn(
      `[indexnow] ${dead.length} URL(s) no están 2xx/3xx en producción — NO se envían (evita 404 en Bing).`
    );
  }
  return live;
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
  assertSafeToSubmit();

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

  console.log(`[indexnow] host=${HOST} · modo=${mode} · ${urls.length} URLs candidatas`);
  for (const u of urls.slice(0, 20)) console.log(`  - ${u}`);
  if (urls.length > 20) console.log(`  … (+${urls.length - 20} más)`);

  if (VERIFY_LIVE) {
    urls = await filterLiveUrls(urls);
    if (urls.length === 0) {
      console.error(
        "[indexnow] ninguna URL pasó verify-live. ¿Deploy de Cloudflare pendiente? No se envía nada."
      );
      process.exitCode = 1;
      return;
    }
  }

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
