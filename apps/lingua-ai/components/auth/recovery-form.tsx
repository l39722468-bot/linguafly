"use client";

import { useActionState } from "react";
import Link from "next/link";
import { requestPasswordReset } from "@/lib/auth/actions";
import { AuthShell } from "@/components/auth/auth-shell";
import { SubmitButton } from "@/components/auth/submit-button";
import { TextField } from "@/components/auth/text-field";

export function RecoveryForm() {
  const [state, action] = useActionState(requestPasswordReset, null);

  if (state?.status === "sent") {
    return (
      <AuthShell
        title="Revisa tu correo"
        description="Si hay una cuenta con ese correo, te enviaremos un enlace para elegir una contraseña nueva."
      >
        <Link href="/login" className="text-sm font-medium text-stone-900 underline">
          Volver al inicio de sesión
        </Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Recuperar contraseña"
      description="Escribe el correo de tu cuenta y te enviaremos un enlace para restablecerla."
    >
      <form action={action} className="space-y-5">
        <TextField label="Correo electrónico" name="email" type="email" autoComplete="email" />
        {state?.status === "error" ? (
          <p role="alert" className="text-sm text-red-700">
            {state.message}
          </p>
        ) : null}
        <SubmitButton label="Enviar enlace" />
      </form>
      <p className="mt-6 text-sm text-stone-600">
        <Link href="/login" className="font-medium text-stone-900 underline">
          Volver al inicio de sesión
        </Link>
      </p>
    </AuthShell>
  );
}
