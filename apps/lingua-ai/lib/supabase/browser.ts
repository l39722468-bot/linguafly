/**
 * The browser client is intentionally unavailable.
 *
 * Session cookies are httpOnly. `document.cookie` cannot read them, and
 * a browser Supabase client would either miss the session or write a
 * second cookie that JavaScript can read. Both outcomes split auth.
 *
 * Do not store the session in localStorage. Future browser features have
 * to go through a Server Action or a Route Handler, which can read the
 * httpOnly cookie from the request.
 */
export function createBrowserSupabaseClient(): never {
  throw new Error(
    "La sesión de LinguaFly AI la gestiona el servidor. El cliente de navegador no puede leer las cookies httpOnly.",
  );
}
