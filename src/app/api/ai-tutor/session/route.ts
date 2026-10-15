import { NextResponse } from "next/server";

/**
 * OpenAI Realtime session creation has been retired.
 * Voice turns now use Cloudflare Workers AI (Whisper + GLM + Aura) through
 * server-side routes; no third-party API credential is returned to the client.
 */
export async function POST() {
  return NextResponse.json(
    {
      error: "The legacy realtime session endpoint is retired.",
      replacement: "Use the turn-based Workers AI conversation flow.",
    },
    { status: 410 },
  );
}
