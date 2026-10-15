const AUTH_ERROR_MESSAGES = {
  auth: "No se ha podido completar el acceso. Prueba de nuevo.",
  config: "El acceso todavía no está configurado. Revisa la configuración de Cloudflare.",
} as const;

export type AuthErrorCode = keyof typeof AUTH_ERROR_MESSAGES;

export function authErrorMessage(code: string | undefined): string | null {
  if (!code || !(code in AUTH_ERROR_MESSAGES)) return null;
  return AUTH_ERROR_MESSAGES[code as AuthErrorCode];
}

/** Signup must not tell the visitor whether the address is already registered. */
export function isExistingUserSignup(error: { message?: string; code?: string }): boolean {
  const code = error.code ?? "";
  const message = error.message ?? "";
  return (
    code === "user_already_exists" ||
    code === "email_exists" ||
    /already registered|already been registered|user already exists/i.test(message)
  );
}

export function mapAuthError(error: { message?: string; code?: string }): string {
  const code = error.code ?? "";
  const message = error.message ?? "";

  if (
    /missing binding|binding AUTH_DB|BETTER_AUTH_SECRET|BETTER_AUTH_URL|not configured|no está configurado|D1 exclusiva/i.test(message)
  ) {
    return AUTH_ERROR_MESSAGES.config;
  }
  if (
    code === "invalid_credentials" ||
    code === "INVALID_EMAIL_OR_PASSWORD" ||
    /invalid login credentials|invalid email or password/i.test(message)
  ) {
    return "Correo o contraseña incorrectos.";
  }
  if (
    code === "email_not_confirmed" ||
    code === "EMAIL_NOT_VERIFIED" ||
    /email not confirmed|email not verified/i.test(message)
  ) {
    return "Confirma tu correo antes de iniciar sesión.";
  }
  if (/redirect/i.test(message) && /url|not allowed|invalid/i.test(message)) {
    return AUTH_ERROR_MESSAGES.config;
  }
  if (
    code === "weak_password" ||
    code === "PASSWORD_TOO_SHORT" ||
    (/password/i.test(message) && /weak|short|at least/i.test(message))
  ) {
    return "La contraseña no cumple los requisitos.";
  }
  if (code === "over_request_rate_limit" || code === "TOO_MANY_REQUESTS" || /rate limit/i.test(message)) {
    return "Demasiados intentos. Espera un momento y prueba de nuevo.";
  }

  return "No se ha podido completar la operación.";
}
