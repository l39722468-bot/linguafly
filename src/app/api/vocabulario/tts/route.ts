import { NextRequest, NextResponse } from "next/server";
import { synthesizeAura2English } from "@/lib/ai/cloudflare-tts";

export const maxDuration = 30;

/** Longitud máxima de la palabra/frase a sintetizar (protección abuso/coste) */
const MAX_CHARS = 120;

/**
 * Sanitiza texto para pronunciación EN: letras, espacios, guiones y apóstrofos.
 */
function sanitizePronunciationText(raw: string | null): string | null {
  if (raw == null) return null;
  const t = raw.trim();
  if (t.length === 0 || t.length > MAX_CHARS) return null;
  if (!/^[a-zA-Z][a-zA-Z\s'\-]*$/u.test(t)) return null;
  return t;
}

/**
 * GET /api/vocabulario/tts?text=hello
 * Audio generado con Cloudflare Workers AI (Deepgram Aura 2 EN).
 * Requiere CLOUDFLARE_ACCOUNT_ID y CLOUDFLARE_API_TOKEN (mismas vars que el tutor).
 */
export async function GET(request: NextRequest) {
  const text = sanitizePronunciationText(request.nextUrl.searchParams.get("text"));
  if (!text) {
    return NextResponse.json({ error: "Parámetro text inválido o demasiado largo" }, { status: 400 });
  }

  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !apiToken) {
    return NextResponse.json(
      { error: "TTS no configurado (faltan CLOUDFLARE_ACCOUNT_ID / CLOUDFLARE_API_TOKEN)" },
      { status: 503 }
    );
  }

  try {
    const { body, contentType } = await synthesizeAura2English(text, accountId, apiToken, "luna");
    const ct = contentType || "audio/wav";
    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": ct,
        "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "TTS error";
    console.error("[vocabulario/tts]", msg);
    return NextResponse.json({ error: "Fallo al generar audio", detail: msg }, { status: 502 });
  }
}
