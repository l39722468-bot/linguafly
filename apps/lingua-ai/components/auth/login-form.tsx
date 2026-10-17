"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signIn } from "@/lib/auth/actions";
import { AuthShell } from "@/components/auth/auth-shell";
import { SubmitButton } from "@/components/auth/submit-button";
import { TextField } from "@/components/auth/text-field";

export function LoginForm({ nextPath, notice }: { nextPath: string; notice: string | null }) {
  const [state, action] = useActionState(signIn, null);

  return (
    <AuthShell
      title="Iniciar sesión"
      description="Entra con el correo y la contraseña de tu cuenta."
    >
      <form action={action} className="space-y-5">
        <input type="hidden" name="next" value={nextPath} />
        <TextField label="Correo electrónico" name="email" type="email" autoComplete="email" />
        <TextField
          label="Contraseña"
          name="password"
          type="password"
          autoComplete="current-password"
        />
        {notice ? (
          <p role="alert" className="text-sm text-red-700">
            {notice}
          </p>
        ) : null}
        {state?.status === "error" ? (
          <p role="alert" className="text-sm text-red-700">
            {state.message}
          </p>
        ) : null}
        <SubmitButton label="Entrar" />
      </form>
      <p className="mt-6 space-y-2 text-sm text-stone-600">
        <Link href="/recuperar-contrasena" className="block font-medium text-stone-900 underline">
          He olvidado mi contraseña
        </Link>
        <span className="block">
          ¿Aún no tienes cuenta?{" "}
          <Link href="/registro" className="font-medium text-stone-900 underline">
            Regístrate
          </Link>
        </span>
      </p>
    </AuthShell>
  );
}
