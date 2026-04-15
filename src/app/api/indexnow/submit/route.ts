import { NextRequest, NextResponse } from "next/server";
import { submitUrlsToIndexNow } from "@/lib/seo/indexnow";

export const runtime = "nodejs";

type RequestBody = {
  urls?: string[];
  url?: string;
};

function getAuthTokenFromRequest(request: NextRequest): string {
  const authHeader = request.headers.get("authorization") || "";
  if (authHeader.toLowerCase().startsWith("bearer ")) {
    return authHeader.slice(7).trim();
  }

  return (
    request.headers.get("x-indexnow-token") ||
    request.nextUrl.searchParams.get("token") ||
    ""
  ).trim();
}

export async function POST(request: NextRequest) {
  const expectedToken = (process.env.INDEXNOW_SUBMIT_TOKEN || "").trim();
  if (!expectedToken) {
    return NextResponse.json(
      { error: "INDEXNOW_SUBMIT_TOKEN no está configurado" },
      { status: 503 }
    );
  }

  const receivedToken = getAuthTokenFromRequest(request);
  if (!receivedToken || receivedToken !== expectedToken) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  let body: RequestBody;
  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return NextResponse.json(
      { error: "Body inválido. Esperado JSON con `url` o `urls`." },
      { status: 400 }
    );
  }

  const urls = Array.isArray(body.urls)
    ? body.urls
    : body.url
      ? [body.url]
      : [];

  if (!urls.length) {
    return NextResponse.json(
      { error: "Debes enviar al menos una URL en `url` o `urls`." },
      { status: 400 }
    );
  }

  try {
    const result = await submitUrlsToIndexNow({ urls });
    return NextResponse.json({
      ok: result.ok,
      status: result.status,
      statusText: result.statusText,
      sent: result.sent,
    });
  } catch (error) {
    console.error("[api/indexnow/submit]", error);
    return NextResponse.json(
      { error: "No se pudo enviar a IndexNow" },
      { status: 500 }
    );
  }
}
