const LOCAL_HTTP_HOSTS = new Set(["localhost", "127.0.0.1", "::1", "[::1]"]);

/**
 * Origin allowed in confirmation and recovery links.
 *
 * Only APP_ORIGIN is accepted. The request host, including
 * x-forwarded-host, is ignored so a caller cannot choose where those
 * links point.
 *
 * Local development:
 *   APP_ORIGIN=http://localhost:5440
 * http is accepted only for localhost, 127.0.0.1 and ::1.
 *
 * Vercel, later: set APP_ORIGIN to the deployment's https origin in the
 * project environment variables. Allow that same origin's
 * /auth/callback URL in Supabase Auth. Do not derive it from the request.
 */
export function getAppOrigin(): string | null {
  const raw = process.env.APP_ORIGIN?.trim() ?? "";
  if (!raw) return null;

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }

  if (url.username || url.password) return null;
  if (url.search || url.hash) return null;
  if (url.pathname !== "/" && url.pathname !== "") return null;

  const host = url.hostname.toLowerCase();
  if (url.protocol === "http:") {
    if (!LOCAL_HTTP_HOSTS.has(host)) return null;
  } else if (url.protocol !== "https:") {
    return null;
  }

  return url.origin;
}

export function authCallbackUrl(
  nextPath: "/app" | "/restablecer-contrasena",
): string | null {
  const origin = getAppOrigin();
  if (!origin) return null;

  const url = new URL("/auth/callback", origin);
  url.searchParams.set("next", nextPath);
  return url.toString();
}
