#!/usr/bin/env node
// Envía URLs a IndexNow (Bing, Yandex, Seznam, Naver) con una sola petición al endpoint compartido.
//
// Uso:
//   node scripts/indexnow-submit.mjs                 # URLs del último commit (tras deploy en main)
//   node scripts/indexnow-submit.mjs --since=HEAD~5  # URLs cambiadas desde ese ref
//   node scripts/indexnow-submit.mjs --all           # Todas las URLs del blog/hubs (sitemap o local)
//   node scripts/indexnow-submit.mjs --urls=https://... https://...
//   node scripts/indexnow-submit.mjs --dry-run
//   node scripts/indexnow-submit.mjs --verify-live   # Bloquea solo 404/410 reales (no CF challenge)
//   node scripts/indexnow-submit.mjs --force         # Permite envío fuera de main (usar con cuidado)
//
// Importante: NO enviar URLs de un PR antes del merge + deploy. Bing las rastrea y marca 404.
// Fuera de CI el script exige branch `main` salvo --force.
//
// Cloudflare Bot Fight / Managed Challenge responde 403 + cf-mitigated: challenge a IPs de
// GitHub Actions. Eso NO es un 404: Bingbot suele pasar. verify-live solo excluye 404/410.

import { execSync } from "node:child_process";
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
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

const walkMd = (dir, acc = []) => {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walkMd(full, acc);
    else if (name.endsWith(".md")) acc.push(full);
  }
  return acc;
};

/** Fallback cuando el sitemap está bloqueado por Cloudflare challenge. */
const collectLocalContentUrls = () => {
  const urls = new Set();
  const blogRoot = path.join(repoRoot, "src/content/blog");
  for (const file of walkMd(blogRoot)) {
    const rel = path.relative(repoRoot, file).replace(/\\/g, "/");
    const blog = categoryFromPath(rel);
    if (blog) urls.add(urlFor(blog));
  }
  const hubsRoot = path.join(repoRoot, "src/content/hubs");
  if (existsSync(hubsRoot)) {
    for (const name of readdirSync(hubsRoot)) {
      if (!name.endsWith(".md")) continue;
      urls.add(`https://${HOST}/blog/temas/${name.replace(/\.md$/, "")}`);
    }
  }
  return [...urls];
};

const isCloudflareChallenge = (res, bodyText = "") => {
  const mitigated = (res.headers.get("cf-mitigated") || "").toLowerCase();
  if (mitigated.includes("challenge")) return true;
  const sample = bodyText.slice(0, 2000).toLowerCase();
  return (
    sample.includes("just a moment...") ||
    sample.includes("challenge-platform") ||
    sample.includes("cdn-cgi/challenge-platform")
  );
};

const fetchSitemapUrls = async () => {
  const res = await fetch(`https://${HOST}/sitemap.xml`, {
    headers: {
      "User-Agent": "LinguaFly-IndexNow-Verify/1.0 (+https://linguafly.app)",
      Accept: "application/xml,text/xml,*/*",
    },
  });
  const text = await res.text().catch(() => "");
  if (isCloudflareChallenge(res, text) || !res.ok) {
    console.warn(
      `[indexnow] sitemap no legible (HTTP ${res.status}${
        isCloudflareChallenge(res, text) ? ", CF challenge" : ""
      }). Usando inventario local de blog/hubs.`
    );
    return collectLocalContentUrls();
  }
  const matches = text.match(/<loc>[^<]+<\/loc>/g) || [];
  return matches
    .map((m) => m.replace(/<\/?loc>/g, "").trim())
    .filter((u) => u.startsWith(`https://${HOST}`));
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Comprueba que la URL corresponde a un .md del repo (fiable cuando CF challenge enmascara 404). */
const localContentExists = (url) => {
  try {
    const u = new URL(url);
    const blog = u.pathname.match(/^\/blog\/([^/]+)\/([^/]+)\/?$/);
    if (blog) {
      const [, category, slug] = blog;
      if (category === "temas") {
        return existsSync(path.join(repoRoot, "src/content/hubs", `${slug}.md`));
      }
      return existsSync(
        path.join(repoRoot, "src/content/blog", category, `${slug}.md`)
      );
    }
    // Otras rutas (home, cursos…): no bloqueamos por inventario local.
    return true;
  } catch {
    return false;
  }
};

/**
 * Clasifica una URL en producción:
 * - live: 2xx/3xx reales
 * - dead: 404/410 (no enviar a IndexNow)
 * - challenge: Cloudflare Bot Fight / managed challenge (no es 404)
 * - unknown: otros errores / red
 */
const checkUrlLive = async (url) => {
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      headers: {
        "User-Agent": "LinguaFly-IndexNow-Verify/1.0 (+https://linguafly.app)",
        Accept: "text/html,application/xhtml+xml",
      },
    });
    const bodyText =
      res.status === 403 || res.status === 503
        ? await res.text().catch(() => "")
        : "";

    if (res.status >= 200 && res.status < 400) {
      return { url, status: res.status, kind: "live" };
    }
    if (res.status === 404 || res.status === 410) {
      return { url, status: res.status, kind: "dead" };
    }
    if (isCloudflareChallenge(res, bodyText)) {
      return { url, status: res.status, kind: "challenge" };
    }
    return { url, status: res.status, kind: "unknown" };
  } catch (err) {
    return { url, status: 0, kind: "unknown", error: err.message };
  }
};

const filterLiveUrls = async (urls) => {
  const live = [];
  const challenge = [];
  const dead = [];
  const unknown = [];
  const decided = new Set();

  // Con Bot Fight, CF challenge enmascara 404 reales. Filtrar primero por inventario local.
  const missingLocal = [];
  const candidates = [];
  for (const u of urls) {
    if (!localContentExists(u)) {
      missingLocal.push(u);
      console.log(`  ✗ missing-local (no .md en repo) ${u}`);
    } else {
      candidates.push(u);
    }
  }
  if (missingLocal.length) {
    console.warn(
      `[indexnow] ${missingLocal.length} URL(s) sin fichero local — NO se envían.`
    );
  }
  urls = candidates;

  for (let attempt = 1; attempt <= VERIFY_ATTEMPTS; attempt++) {
    const toCheck = urls.filter((u) => !decided.has(u));
    if (toCheck.length === 0) break;

    if (attempt > 1) {
      console.log(
        `[indexnow] verify-live: reintento ${attempt}/${VERIFY_ATTEMPTS} en ${VERIFY_WAIT_MS / 1000}s (${toCheck.length} URLs pendientes)…`
      );
      await sleep(VERIFY_WAIT_MS);
    } else {
      console.log(`[indexnow] verify-live: comprobando ${toCheck.length} URLs en https://${HOST}…`);
    }

    for (const u of toCheck) {
      const r = await checkUrlLive(u);
      if (r.kind === "live") {
        decided.add(u);
        live.push(u);
        console.log(`  ✓ ${r.status} live ${r.url}`);
      } else if (r.kind === "challenge") {
        // Los challenges de CF no se "curan" esperando desde runners de GitHub.
        decided.add(u);
        challenge.push(r);
        console.log(`  ~ ${r.status} cf-challenge (no es 404) ${r.url}`);
      } else if (r.kind === "dead" && attempt === VERIFY_ATTEMPTS) {
        // 404 puede ser deploy CF aún no propagado → reintentar antes de descartar.
        decided.add(u);
        dead.push(r);
        console.log(`  ✗ ${r.status} dead ${r.url}`);
      } else if (r.kind === "dead") {
        console.log(`  … ${r.status} (posible deploy pendiente; reintentará) ${r.url}`);
      } else if (attempt === VERIFY_ATTEMPTS) {
        decided.add(u);
        unknown.push(r);
        console.log(`  ? ${r.status || "ERR"}${r.error ? ` (${r.error})` : ""} ${r.url}`);
      } else {
        console.log(`  … ${r.status || "ERR"} (reintentará) ${r.url}`);
      }
    }
  }

  if (dead.length) {
    console.warn(
      `[indexnow] ${dead.length} URL(s) con 404/410 reales — NO se envían (evita 404 en Bing).`
    );
  }
  if (challenge.length) {
    console.warn(
      `[indexnow] ${challenge.length} URL(s) con Cloudflare challenge (cf-mitigated). ` +
        `GitHub Actions no puede verificar el HTML; Bingbot sí suele pasar. Se ENVÍAN tras el gate de main.`
    );
  }
  if (unknown.length) {
    console.warn(
      `[indexnow] ${unknown.length} URL(s) con estado desconocido tras reintentos — se ENVÍAN (gate main ya aplicado).`
    );
  }

  // Solo excluimos dead (404/410) y missing-local. Challenge/unknown se envían:
  // el daño de Bing 404 viene de notificar URLs inexistentes, no de un WAF que
  // bloquea al verificador de CI.
  const allowed = [
    ...live,
    ...challenge.map((r) => r.url),
    ...unknown.map((r) => r.url),
  ];
  return {
    allowed,
    deadCount: dead.length + missingLocal.length,
    challengeCount: challenge.length,
  };
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
    mode = "sitemap-or-local";
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
    const { allowed, deadCount } = await filterLiveUrls(urls);
    urls = allowed;
    if (urls.length === 0) {
      console.error(
        "[indexnow] ninguna URL enviable tras verify-live (todas 404/410). ¿Deploy pendiente o slugs incorrectos?"
      );
      process.exitCode = 1;
      return;
    }
    if (deadCount > 0 && urls.length === 0) {
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
