import type { Metadata } from "next";
import Link from "next/link";
import { AccountError, AccountFrame, buttonClass, fieldClass } from "@/components/account/AccountFrame";
import { safeNextPath } from "@/lib/billing/http";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Entrar",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;
  const nextPath = safeNextPath(params.next, "/cuenta");

  return (
    <AccountFrame
      title="Entra en tu cuenta"
      subtitle="Con la suscripción activa se abren todos los artículos premium."
    >
      <AccountError code={params.error} />
      <form action="/api/auth/login" method="post" className="space-y-4">
        <input type="hidden" name="next" value={nextPath} />
        <label className="block text-sm font-bold text-slate-700">
          Correo
          <input className={fieldClass} type="email" name="email" autoComplete="email" required />
        </label>
        <label className="block text-sm font-bold text-slate-700">
          Contraseña
          <input className={fieldClass} type="password" name="password" autoComplete="current-password" required />
        </label>
        <button className={buttonClass} type="submit">
          Entrar
        </button>
      </form>
      <p className="mt-6 text-sm text-slate-600">
        ¿Aún no tienes cuenta?{" "}
        <Link className="font-bold text-coral-700 hover:underline" href={`/cuenta/registro?next=${encodeURIComponent(nextPath)}`}>
          Crear cuenta
        </Link>
      </p>
    </AccountFrame>
  );
}
