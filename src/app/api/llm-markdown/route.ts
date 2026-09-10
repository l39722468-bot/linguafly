import { markdownResponseHeaders, renderMarkdownTwin } from "@/lib/llm-txt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const path = url.searchParams.get("path") || "";
  if (!path.startsWith("/") || path.includes("..") || !path.endsWith(".md")) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const result = await renderMarkdownTwin(path);
    if (result.status === 301 && result.location) {
      return Response.redirect(result.location, 301);
    }
    if (result.status !== 200 || !result.body) {
      return new Response("Not found", { status: 404 });
    }
    return new Response(result.body, {
      headers: markdownResponseHeaders(result.htmlPath),
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
