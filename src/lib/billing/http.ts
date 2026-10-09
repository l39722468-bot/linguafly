export function safeNextPath(value: string | null | undefined, fallback = "/cuenta"): string {
  if (!value) return fallback;
  const path = value.trim();
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("://") || path.includes("\\")) {
    return fallback;
  }
  return path;
}

export function requestOrigin(request: Request): string {
  const url = new URL(request.url);
  const forwardedHost = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const host = forwardedHost?.split(",")[0]?.trim();
  if (!host) return url.origin;
  const protoHeader = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const proto = protoHeader || url.protocol.replace(":", "") || "https";
  return `${proto}://${host}`;
}

export function redirectTo(request: Request, path: string, status = 303): Response {
  return Response.redirect(new URL(path, requestOrigin(request)), status);
}
