"use client";

import { useActionState } from "react";
import { signOut } from "@/lib/auth/actions";

export function SignOutButton() {
  const [state, action] = useActionState(signOut, null);

  return (
    <form action={action}>
      {state?.status === "error" ? (
        <p role="alert" className="mb-3 text-sm text-red-700">
          {state.message}
        </p>
      ) : null}
      <button
        type="submit"
        className="rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm font-medium text-stone-900"
      >
        Cerrar sesión
      </button>
    </form>
  );
}
