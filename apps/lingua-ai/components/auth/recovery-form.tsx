"use client";

import { useActionState } from "react";
import Link from "next/link";
import { requestPasswordReset } from "@/lib/auth/actions";
import { AuthShell } from "@/components/auth/auth-shell";
import { SubmitButton } from "@/components/auth/submit-button";
import { TextField } from "@/components/auth/text-field";

export function RecoveryForm() {
  const [state, action] = useActionState(requestPasswordReset, null);

  return (
    <AuthShell
      title="Recuperar contraseña"
      description="El envío de correos de recuperación todavía está pendiente de configurar. Este formulario no enviará mensajes hasta que se active un proveedor de correo."
    >
      <form action={action} className="space-y-5">
        <TextField label="Correo electrónico" name="email" type="email" autoComplete="email" />
        {state?.status === "error" ? (
          <p role="alert" className="text-sm text-red-700">
            {state.message}
          </p>
        ) : null}
        <SubmitButton label="Comprobar recuperación" />
      </form>
      <p className="mt-6 text-sm text-stone-600">
        <Link href="/login" className="font-medium text-stone-900 underline">
          Volver al inicio de sesión
        </Link>
      </p>
    </AuthShell>
  );
}
