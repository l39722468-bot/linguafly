"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signUp } from "@/lib/auth/actions";
import { AuthShell } from "@/components/auth/auth-shell";
import { SubmitButton } from "@/components/auth/submit-button";
import { TextField } from "@/components/auth/text-field";

export function RegisterForm() {
  const [state, action] = useActionState(signUp, null);

  if (state?.status === "confirm_email") {
    return (
      <AuthShell
        title="Revisa tu correo"
        description="Si la dirección puede registrarse, recibirás un correo para confirmar tu cuenta. Revisa también la carpeta de correo no deseado y sigue el enlace para activar LinguaFly AI."
      >
        <Link href="/login" className="text-sm font-medium text-stone-900 underline">
          Volver al inicio de sesión
        </Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Crear cuenta"
      description="Regístrate con tu correo para practicar inglés con LinguaFly AI."
    >
      <form action={action} className="space-y-5">
        <TextField label="Correo electrónico" name="email" type="email" autoComplete="email" />
        <TextField
          label="Contraseña"
          name="password"
          type="password"
          autoComplete="new-password"
        />
        <TextField
          label="Confirmar contraseña"
          name="confirmation"
          type="password"
          autoComplete="new-password"
        />
        {state?.status === "error" ? (
          <p role="alert" className="text-sm text-red-700">
            {state.message}
          </p>
        ) : null}
        <SubmitButton label="Crear cuenta" />
      </form>
      <p className="mt-6 text-sm text-stone-600">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="font-medium text-stone-900 underline">
          Inicia sesión
        </Link>
      </p>
    </AuthShell>
  );
}
