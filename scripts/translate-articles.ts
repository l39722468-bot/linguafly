#!/usr/bin/env ts-node
/**
 * Traduce artículos del blog ES → pt-BR usando Cloudflare Workers AI (Llama 3.3 70B).
 *
 * Variables de entorno necesarias:
 *   CLOUDFLARE_ACCOUNT_ID  — ID de cuenta de Cloudflare
 *   CLOUDFLARE_API_TOKEN   — Token de Workers AI
 *
 * Uso:
 *   npx ts-node scripts/translate-articles.ts            # traduce solo artículos nuevos
 *   npx ts-node scripts/translate-articles.ts --force     # retraduce todo
 *   npx ts-node scripts/translate-articles.ts --dry-run   # muestra qué se traduciría
 */

import * as fs from "fs";
import * as path from "path";

/* ------------------------------------------------------------------ */
/*  Config                                                            */
/* ------------------------------------------------------------------ */

const ROOT = path.join(__dirname, "..");
const BLOG_ES_DIR = path.join(ROOT, "src/content/blog");
const BLOG_PT_DIR = path.join(ROOT, "src/content/blog-pt-br");
const MODEL = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2_000;
// Split long articles into ~3 000-char chunks so each LLM call stays well
// within the model's context window and produces higher-quality translations.
const CHUNK_SIZE = 3_000;

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function loadEnv(): void {
  for (const name of [".env.local", ".env"]) {
    const p = path.join(ROOT, name);
    if (fs.existsSync(p)) {
      const txt = fs.readFileSync(p, "utf8");
      for (const line of txt.split("\n")) {
        const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
        if (m && !process.env[m[1]]) {
          let v = m[2].trim();
          if (
            (v.startsWith('"') && v.endsWith('"')) ||
            (v.startsWith("'") && v.endsWith("'"))
          ) {
            v = v.slice(1, -1);
          }
          process.env[m[1]] = v;
        }
      }
      break;
    }
  }
}

function getAllMdFiles(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) return [];
  const results: string[] = [];
  for (const entry of fs.readdirSync(dirPath)) {
    const full = path.join(dirPath, entry);
    if (fs.statSync(full).isDirectory()) {
      results.push(...getAllMdFiles(full));
    } else if (entry.endsWith(".md") || entry.endsWith(".mdx")) {
      results.push(full);
    }
  }
  return results;
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

/* ------------------------------------------------------------------ */
/*  Cloudflare Workers AI                                             */
/* ------------------------------------------------------------------ */

async function callCloudflareAI(
  accountId: string,
  apiToken: string,
  systemPrompt: string,
  userPrompt: string,
  maxTokens = 4096
): Promise<string> {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${MODEL}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
            max_tokens: maxTokens,
          }),
        }
      );

      const raw = await res.text();
      let responseText = raw;
      try {
        const data = JSON.parse(raw);
        if (data?.result?.response) {
          responseText = data.result.response;
        } else if (data?.errors?.length) {
          throw new Error(
            `Cloudflare AI error: ${JSON.stringify(data.errors)}`
          );
        }
      } catch (e) {
        if (e instanceof SyntaxError) {
          /* plain text response — use as-is */
        } else {
          throw e;
        }
      }

      return responseText.trim();
    } catch (err) {
      console.error(
        `  ⚠ Intento ${attempt}/${MAX_RETRIES} falló:`,
        (err as Error).message
      );
      if (attempt < MAX_RETRIES) await sleep(RETRY_DELAY_MS * attempt);
      else throw err;
    }
  }
  throw new Error("Translation failed: all retry attempts exhausted");
}

/* ------------------------------------------------------------------ */
/*  Translation logic                                                 */
/* ------------------------------------------------------------------ */

const SYSTEM_FRONTMATTER = `You are a professional translator specializing in Spanish → Brazilian Portuguese.
You receive a YAML frontmatter block from a blog article about learning English.
Translate ALL human-readable values to Brazilian Portuguese (pt-BR).
Keep keys, dates, URLs, slugs and technical values unchanged.
Return ONLY the translated YAML block — no markdown fences, no explanation.`;

const SYSTEM_BODY = `You are a professional translator specializing in Spanish → Brazilian Portuguese.
You receive a Markdown section from a blog article about learning English.
Translate the text to Brazilian Portuguese (pt-BR) while preserving:
- All Markdown formatting (headings, bold, italic, links, code blocks, lists)
- All URLs unchanged
- English words/phrases that are being taught (these are the subject of the article)
- IPA phonetic transcriptions unchanged
Return ONLY the translated Markdown — no extra explanation.`;

interface TranslationResult {
  file: string;
  status: "translated" | "skipped" | "error";
  error?: string;
}

function splitFrontmatterAndBody(
  content: string
): { frontmatter: string; body: string } | null {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;
  return { frontmatter: match[1], body: match[2] };
}

function chunkBody(body: string): string[] {
  const lines = body.split("\n");
  const chunks: string[] = [];
  let current = "";

  for (const line of lines) {
    if (current.length + line.length + 1 > CHUNK_SIZE && current.length > 0) {
      chunks.push(current);
      current = line;
    } else {
      current += (current ? "\n" : "") + line;
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

async function translateArticle(
  filePath: string,
  accountId: string,
  apiToken: string
): Promise<string> {
  const content = fs.readFileSync(filePath, "utf8");
  const parsed = splitFrontmatterAndBody(content);

  if (!parsed) {
    throw new Error("Could not parse frontmatter");
  }

  // Translate frontmatter
  console.log("    → Traduciendo frontmatter…");
  const translatedFM = await callCloudflareAI(
    accountId,
    apiToken,
    SYSTEM_FRONTMATTER,
    parsed.frontmatter,
    2048
  );

  // Translate body in chunks
  const chunks = chunkBody(parsed.body);
  const translatedChunks: string[] = [];
  for (let i = 0; i < chunks.length; i++) {
    console.log(`    → Traduciendo cuerpo (parte ${i + 1}/${chunks.length})…`);
    const translated = await callCloudflareAI(
      accountId,
      apiToken,
      SYSTEM_BODY,
      chunks[i],
      4096
    );
    translatedChunks.push(translated);
    // Small delay between chunks to respect rate limits
    if (i < chunks.length - 1) await sleep(500);
  }

  // Clean up translated frontmatter (remove any markdown fences the LLM may have added)
  let cleanFM = translatedFM
    .replace(/^```ya?ml?\n?/i, "")
    .replace(/\n?```$/i, "")
    .trim();

  return `---\n${cleanFM}\n---\n${translatedChunks.join("\n")}`;
}

/* ------------------------------------------------------------------ */
/*  Main                                                              */
/* ------------------------------------------------------------------ */

async function main(): Promise<void> {
  loadEnv();

  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  if (!accountId || !apiToken) {
    console.error(
      "❌ Faltan CLOUDFLARE_ACCOUNT_ID o CLOUDFLARE_API_TOKEN en .env / .env.local / variables de entorno"
    );
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const dryRun = args.includes("--dry-run");

  // Ensure output directory exists
  if (!fs.existsSync(BLOG_PT_DIR)) {
    fs.mkdirSync(BLOG_PT_DIR, { recursive: true });
  }

  // Gather all ES articles
  const allFiles = getAllMdFiles(BLOG_ES_DIR);
  console.log(`📚 Encontrados ${allFiles.length} artículos en español\n`);

  const results: TranslationResult[] = [];

  for (const filePath of allFiles) {
    const relativePath = path.relative(BLOG_ES_DIR, filePath);
    const outputPath = path.join(BLOG_PT_DIR, relativePath);
    const outputDir = path.dirname(outputPath);
    const displayName = relativePath;

    // Skip if already translated (unless --force)
    if (!force && fs.existsSync(outputPath)) {
      console.log(`⏭️  Ya traducido: ${displayName}`);
      results.push({ file: displayName, status: "skipped" });
      continue;
    }

    if (dryRun) {
      console.log(`🔍 Pendiente: ${displayName}`);
      results.push({ file: displayName, status: "skipped" });
      continue;
    }

    console.log(`\n🔄 Traduciendo: ${displayName}`);

    try {
      const translated = await translateArticle(filePath, accountId, apiToken);

      // Ensure output subdirectory exists
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      fs.writeFileSync(outputPath, translated, "utf8");
      console.log(`  ✅ Guardado: ${outputPath}`);
      results.push({ file: displayName, status: "translated" });

      // Small delay between articles
      await sleep(1_000);
    } catch (err) {
      const msg = (err as Error).message;
      console.error(`  ❌ Error: ${msg}`);
      results.push({ file: displayName, status: "error", error: msg });
    }
  }

  // Summary
  const translated = results.filter((r) => r.status === "translated").length;
  const skipped = results.filter((r) => r.status === "skipped").length;
  const errors = results.filter((r) => r.status === "error").length;

  console.log("\n" + "=".repeat(60));
  console.log("📊 Resumen de traducción:");
  console.log(`   ✅ Traducidos: ${translated}`);
  console.log(`   ⏭️  Omitidos:   ${skipped}`);
  console.log(`   ❌ Errores:    ${errors}`);
  console.log("=".repeat(60));

  if (errors > 0) {
    console.log("\nArtículos con error:");
    for (const r of results.filter((r) => r.status === "error")) {
      console.log(`  - ${r.file}: ${r.error}`);
    }
    console.warn(
      "\n⚠ Se encontraron errores de traducción. Se continuará sin fallo para permitir commit de resultados parciales."
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
