import { getCloudflareContext } from "@opennextjs/cloudflare";

type D1Statement = {
  bind(...values: (string | number)[]): {
    first<T = unknown>(): Promise<T | null>;
    run(): Promise<unknown>;
  };
};

type AudioCacheDatabase = {
  prepare(query: string): D1Statement;
};

type AudioCacheEnv = {
  DB?: AudioCacheDatabase;
};

const MAX_AUDIO_BASE64_CHARS = 1_500_000;
const AUDIO_CACHE_TTL_DAYS = 180;
const PRIVATE_TEXT = /\b(?:my (?:full )?name is|my address is|my phone(?: number)? is|my email is|my password is|mi nombre es|mi direcci[oó]n es|mi tel[eé]fono es|mi correo(?: electr[oó]nico)? es|mi contrase[nñ]a es|i live at|vivo en la calle)\b/i;
const EMAIL_PATTERN = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;

function normalizeAudioText(text: string): string {
  return text.normalize("NFKC").replace(/\s+/g, " ").trim();
}

function isSafeToCache(text: string): boolean {
  const normalized = normalizeAudioText(text);
  if (!normalized || normalized.length > 1800) return false;
  if (PRIVATE_TEXT.test(normalized) || EMAIL_PATTERN.test(normalized)) return false;
  if (/\b(?:password|contrase[nñ]a|api key|tarjeta de cr[eé]dito|credit card number)\b/i.test(normalized)) return false;
  return true;
}

async function getDatabase(): Promise<AudioCacheDatabase | null> {
  try {
    const cloudflare = await getCloudflareContext({ async: true });
    const env = cloudflare.env as unknown as AudioCacheEnv;
    return env.DB ?? null;
  } catch {
    return null;
  }
}

async function makeAudioCacheKey(text: string, speaker: string, model: string): Promise<string> {
  const identity = ["tutor-audio-v1", speaker, model, normalizeAudioText(text)].join("\u001f");
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(identity));
  const hash = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
  return `audio:${hash}`;
}

/**
 * Returns pre-generated speech from D1 when available. On a miss, synthesize
 * once and save it for later requests. Dynamic/personal text is never persisted.
 */
export async function getOrCreateTutorAudio(
  text: string,
  speaker: string,
  model: string,
  generate: () => Promise<string>,
): Promise<string> {
  if (!isSafeToCache(text)) return generate();

  let db: AudioCacheDatabase | null = null;
  let key = "";
  try {
    db = await getDatabase();
    key = await makeAudioCacheKey(text, speaker, model);
    if (db) {
      const row = await db.prepare(`
        SELECT audio_base64
        FROM tutor_audio_cache
        WHERE cache_key = ?
          AND created_at >= datetime('now', '-${AUDIO_CACHE_TTL_DAYS} days')
        LIMIT 1
      `).bind(key).first<{ audio_base64?: unknown }>();
      if (row && typeof row.audio_base64 === "string" && row.audio_base64.length > 0) {
        return row.audio_base64;
      }
    }
  } catch (error: unknown) {
    console.warn("Tutor audio cache read failed:", error instanceof Error ? error.name : "UnknownError");
  }

  const audioBase64 = await generate();
  if (!db || !key || !audioBase64 || audioBase64.length > MAX_AUDIO_BASE64_CHARS) return audioBase64;

  try {
    await db.prepare(`
      INSERT INTO tutor_audio_cache (cache_key, audio_base64, audio_length)
      VALUES (?, ?, ?)
      ON CONFLICT(cache_key) DO UPDATE SET
        audio_base64 = excluded.audio_base64,
        audio_length = excluded.audio_length,
        created_at = CURRENT_TIMESTAMP
    `).bind(key, audioBase64, audioBase64.length).run();
  } catch (error: unknown) {
    // Speech must still play if persistence is unavailable.
    console.warn("Tutor audio cache write failed:", error instanceof Error ? error.name : "UnknownError");
  }
  return audioBase64;
}
