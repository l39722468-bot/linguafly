import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

const FALLBACK_KEY = "59006008bf0856c11d13c983f0cd516d";

function resolveKey(): string {
  const fromEnv = (process.env.INDEXNOW_KEY || "").trim();
  if (fromEnv) return fromEnv;

  const keyPath = path.join(process.cwd(), "public", `${FALLBACK_KEY}.txt`);
  if (existsSync(keyPath)) {
    const content = readFileSync(keyPath, "utf8").trim();
    if (content) return content;
  }

  return FALLBACK_KEY;
}

/** Sirve la clave IndexNow en /{key}.txt aunque el asset estático falle o CF lo trate distinto. */
export async function GET() {
  const key = resolveKey();
  return new Response(key, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
      "X-Robots-Tag": "noindex",
    },
  });
}
