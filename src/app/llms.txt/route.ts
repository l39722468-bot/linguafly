import { buildLlmsTxtBody, markdownResponseHeaders } from "@/lib/llm-txt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const body = await buildLlmsTxtBody();
  return new Response(body, {
    headers: markdownResponseHeaders(),
  });
}
