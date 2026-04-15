import { getIndexNowKey } from "@/lib/seo/indexnow";

export const runtime = "nodejs";

export async function GET() {
  const key = getIndexNowKey();
  if (!key) {
    return new Response("INDEXNOW_KEY no configurada", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  return new Response(key, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
