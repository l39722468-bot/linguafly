"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-stone-900 px-4 py-3 text-base font-medium text-white disabled:opacity-60"
    >
      {pending ? "Espera…" : label}
    </button>
  );
}
