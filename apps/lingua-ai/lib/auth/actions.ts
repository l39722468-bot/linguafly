"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { mapAuthError } from "@/lib/auth/errors";
import { isAuthEmailEnabled } from "@/lib/auth/email";
import { safeNextPath } from "@/lib/auth/paths";
import { isValidEmail, passwordError } from "@/lib/auth/validation";
import { getAuth } from "@/lib/auth/server";

export type AuthFormState =
  | null
  | { status: "error"; message: string }
  | { status: "confirm_email" }
  | { status: "sent" };

function readText(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function authError(error: unknown): { message?: string; code?: string } {
  if (!error || typeof error !== "object") return {};
  const value = error as {
    message?: unknown;
    code?: unknown;
    body?: { message?: unknown; code?: unknown };
  };
  const message = value.body?.message ?? value.message;
  const code = value.body?.code ?? value.code;
  return {
    message: typeof message === "string" ? message : undefined,
    code: typeof code === "string" ? code : undefined,
  };
}

function emailSetupError(): AuthFormState {
  return {
    status: "error",
    message:
      "El envío de correos de LinguaFly AI todavía no está activado. No se ha enviado ningún mensaje. Configura Cloudflare Email Service e inténtalo de nuevo.",
  };
}

export async function signUp(
  _previous: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = readText(formData, "email").toLowerCase();
  const password = String(formData.get("password") ?? "");
  const confirmation = String(formData.get("confirmation") ?? "");
  const invalidPassword = passwordError(password, confirmation);

  if (!isValidEmail(email) || invalidPassword) {
    return {
      status: "error",
      message: invalidPassword ?? "Escribe un correo electrónico válido.",
    };
  }

  if (!(await isAuthEmailEnabled())) return emailSetupError();

  try {
    const context = await getCloudflareContext({ async: true });
    const env = context.env as unknown as CloudflareEnv;
    const baseURL = env.BETTER_AUTH_URL?.trim();
    if (!baseURL) return emailSetupError();

    const auth = await getAuth();
    await auth.api.signUpEmail({
      body: {
        name: email.split("@")[0] || "Alumno",
        email,
        password,
        callbackURL: new URL("/app", baseURL).toString(),
      },
      headers: await headers(),
    });
  } catch (error) {
    return { status: "error", message: mapAuthError(authError(error)) };
  }

  // Email verification is required before a session can be created.
  return { status: "confirm_email" };
}

export async function signIn(
  _previous: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = readText(formData, "email").toLowerCase();
  const password = String(formData.get("password") ?? "");
  const nextPath = safeNextPath(readText(formData, "next"));

  if (!isValidEmail(email) || passwordError(password)) {
    return { status: "error", message: "Revisa el correo y la contraseña." };
  }

  try {
    const auth = await getAuth();
    await auth.api.signInEmail({
      body: { email, password },
      headers: await headers(),
    });
  } catch (error) {
    return { status: "error", message: mapAuthError(authError(error)) };
  }

  redirect(nextPath);
}

export async function requestPasswordReset(
  _previous: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = readText(formData, "email").toLowerCase();

  if (!isValidEmail(email)) {
    return { status: "error", message: "Escribe un correo electrónico válido." };
  }

  if (!(await isAuthEmailEnabled())) return emailSetupError();

  try {
    const context = await getCloudflareContext({ async: true });
    const env = context.env as unknown as CloudflareEnv;
    const baseURL = env.BETTER_AUTH_URL?.trim();
    if (!baseURL) return emailSetupError();

    const auth = await getAuth();
    await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: new URL("/restablecer-contrasena", baseURL).toString(),
      },
      headers: await headers(),
    });
  } catch (error) {
    return { status: "error", message: mapAuthError(authError(error)) };
  }

  // Better Auth intentionally returns a generic response for unknown emails.
  return { status: "sent" };
}

export async function updatePassword(
  _previous: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const password = String(formData.get("password") ?? "");
  const confirmation = String(formData.get("confirmation") ?? "");
  const token = readText(formData, "token");
  const invalidPassword = passwordError(password, confirmation);

  if (invalidPassword) {
    return { status: "error", message: invalidPassword };
  }
  if (!token || token.length > 2048) {
    return {
      status: "error",
      message: "El enlace de recuperación no es válido. Solicita uno nuevo.",
    };
  }

  try {
    const auth = await getAuth();
    await auth.api.resetPassword({
      body: { newPassword: password, token },
      headers: await headers(),
    });
  } catch (error) {
    return {
      status: "error",
      message: mapAuthError(authError(error)),
    };
  }

  redirect("/login");
}

export async function signOut(
  _previous: AuthFormState,
  _formData: FormData,
): Promise<AuthFormState> {
  void _previous;
  void _formData;

  try {
    const auth = await getAuth();
    await auth.api.signOut({ headers: await headers() });
  } catch {
    return {
      status: "error",
      message: "No se ha podido cerrar la sesión. Prueba de nuevo.",
    };
  }

  redirect("/login");
}
