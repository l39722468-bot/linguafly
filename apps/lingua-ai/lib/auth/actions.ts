"use server";

import { redirect } from "next/navigation";
import { isExistingUserSignup, mapAuthError } from "@/lib/auth/errors";
import { authCallbackUrl } from "@/lib/auth/origin";
import { safeNextPath } from "@/lib/auth/paths";
import { isValidEmail, passwordError } from "@/lib/auth/validation";
import { getPublicSupabaseEnv } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type AuthFormState =
  | null
  | { status: "error"; message: string }
  | { status: "confirm_email" }
  | { status: "sent" };

function readText(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function signUp(_previous: AuthFormState, formData: FormData): Promise<AuthFormState> {
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
  if (!getPublicSupabaseEnv()) {
    return { status: "error", message: "El acceso todavía no está configurado." };
  }

  const emailRedirectTo = authCallbackUrl("/app");
  if (!emailRedirectTo) {
    return { status: "error", message: "El acceso todavía no está configurado." };
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo },
  });

  if (error) {
    if (isExistingUserSignup(error)) {
      return { status: "confirm_email" };
    }
    return { status: "error", message: mapAuthError(error) };
  }

  if (data.user && data.user.identities?.length === 0) {
    return { status: "confirm_email" };
  }

  if (!data.session) {
    return { status: "confirm_email" };
  }

  redirect("/app");
}

export async function signIn(_previous: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const email = readText(formData, "email").toLowerCase();
  const password = String(formData.get("password") ?? "");
  const nextPath = safeNextPath(readText(formData, "next"));

  if (!isValidEmail(email) || passwordError(password)) {
    return { status: "error", message: "Revisa el correo y la contraseña." };
  }
  if (!getPublicSupabaseEnv()) {
    return { status: "error", message: "El acceso todavía no está configurado." };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { status: "error", message: mapAuthError(error) };
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
  if (!getPublicSupabaseEnv()) {
    return { status: "error", message: "El acceso todavía no está configurado." };
  }

  const redirectTo = authCallbackUrl("/restablecer-contrasena");
  if (!redirectTo) {
    return { status: "error", message: "El acceso todavía no está configurado." };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });

  if (error && (error.code === "over_request_rate_limit" || /rate limit/i.test(error.message))) {
    return {
      status: "error",
      message: "Demasiados intentos. Espera un momento y prueba de nuevo.",
    };
  }

  if (
    error &&
    /redirect/i.test(error.message) &&
    /url|not allowed|invalid/i.test(error.message)
  ) {
    return { status: "error", message: "El acceso todavía no está configurado." };
  }

  return { status: "sent" };
}

export async function updatePassword(
  _previous: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const password = String(formData.get("password") ?? "");
  const confirmation = String(formData.get("confirmation") ?? "");
  const invalidPassword = passwordError(password, confirmation);

  if (invalidPassword) {
    return { status: "error", message: invalidPassword };
  }
  if (!getPublicSupabaseEnv()) {
    return { status: "error", message: "El acceso todavía no está configurado." };
  }

  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    redirect("/recuperar-contrasena");
  }

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    return { status: "error", message: mapAuthError(error) };
  }

  redirect("/app");
}

function sessionIsGone(error: { name?: string; message?: string } | null): boolean {
  if (!error) return true;
  return (
    error.name === "AuthSessionMissingError" ||
    /auth session missing/i.test(error.message ?? "")
  );
}

export async function signOut(
  previous: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  void previous;
  void formData;

  if (!getPublicSupabaseEnv()) {
    redirect("/login");
  }

  const failure: AuthFormState = {
    status: "error",
    message: "No se ha podido cerrar la sesión. Prueba de nuevo.",
  };

  try {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.signOut();
    const { data, error: userError } = await supabase.auth.getUser();
    // Redirect only when the server accepted the sign-out and the session
    // is gone. A failed revoke or a cookie that is still present stays here.
    const confirmedSignedOut = !error && !data.user && sessionIsGone(userError);

    if (!confirmedSignedOut) {
      return failure;
    }
  } catch {
    return failure;
  }

  redirect("/login");
}
