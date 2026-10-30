"use client";

import { useActionState } from "react";
import { updatePassword } from "@/lib/auth/actions";
import { AuthShell } from "@/components/auth/auth-shell";
import { SubmitButton } from "@/components/auth/submit-button";
import { TextField } from "@/components/auth/text-field";

export function ResetPasswordForm({ token }: { token: string }) {
  const [state, action] = useActionState(updatePassword, null);

  return (
    <AuthShell
      title="Contraseña nueva"
      description="Elige una contraseña de al menos 8 caracteres para tu cuenta."
    >
      <form action={action} className="space-y-5">
        <input type="hidden" name="token" value={token} />
        <TextField
          label="Contraseña nueva"
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
        <SubmitButton label="Guardar contraseña" />
      </form>
    </AuthShell>
  );
}
