"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { mapAuthError } from "@/lib/auth/errors";
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

  try {
    const auth = await getAuth();
    await auth.api.signUpEmail({
      body: {
        name: email.split("@")[0] || "Alumno",
        email,
        password,
      },
      headers: await headers(),
    });
  } catch (error) {
    return { status: "error", message: mapAuthError(authError(error)) };
  }

  redirect("/app");
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

  // No mail transport is configured yet. Do not invoke the reset endpoint
  // or tell the visitor that an email was sent when it was not.
  void email;
  return {
    status: "error",
    message:
      "La recuperación por correo todavía no está configurada. No se ha enviado ningún mensaje.",
  };
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
