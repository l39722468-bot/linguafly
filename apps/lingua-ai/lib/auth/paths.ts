const ALLOWED_NEXT_PATHS = new Set(["/app", "/restablecer-contrasena"]);

/** Internal destinations only. Anything else falls back to the private home. */
export function safeNextPath(value: string | null | undefined): string {
  if (!value) return "/app";

  const path = value.split("?")[0]?.split("#")[0] ?? "";
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) {
    return "/app";
  }
  if (path.includes("://")) return "/app";

  return ALLOWED_NEXT_PATHS.has(path) ? path : "/app";
}
