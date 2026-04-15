import { CF_DEEPGRAM_AURA_2_EN } from "@/lib/ai/cloudflare-workers-ai-models";

export type Aura2EnSpeaker = "luna" | "orion";

/**
 * TTS inglés vía Cloudflare Workers AI (@cf/deepgram/aura-2-en).
 * Misma integración que el tutor avatar (greet/turn).
 */
export async function synthesizeAura2English(
  text: string,
  accountId: string,
  apiToken: string,
  speaker: Aura2EnSpeaker = "luna"
): Promise<{ body: ArrayBuffer; contentType: string | null }> {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${CF_DEEPGRAM_AURA_2_EN}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, speaker }),
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Workers AI TTS failed: ${res.status} ${err}`);
  }
  return {
    body: await res.arrayBuffer(),
    contentType: res.headers.get("content-type"),
  };
}
