import type { Metadata } from "next";
import Link from "next/link";
import { AccountError, AccountFrame, buttonClass, fieldClass } from "@/components/account/AccountFrame";
import { safeNextPath } from "@/lib/billing/http";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Crear cuenta",
  robots: { index: false, follow: false },
};

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;
  const nextPath = safeNextPath(params.next, "/cuenta");

  return (
    <AccountFrame
      title="Crea tu cuenta"
      subtitle="Sirve para suscribirte y leer los artículos premium. Las guías gratuitas no la necesitan."
    >
      <AccountError code={params.error} />
      <form action="/api/auth/register" method="post" className="space-y-4">
        <input type="hidden" name="next" value={nextPath} />
        <label className="block text-sm font-bold text-slate-700">
          Correo
          <input className={fieldClass} type="email" name="email" autoComplete="email" required />
        </label>
        <label className="block text-sm font-bold text-slate-700">
          Contraseña
          <input className={fieldClass} type="password" name="password" autoComplete="new-password" minLength={8} required />
        </label>
        <label className="block text-sm font-bold text-slate-700">
          Repite la contraseña
          <input className={fieldClass} type="password" name="password_confirm" autoComplete="new-password" minLength={8} required />
        </label>
        <button className={buttonClass} type="submit">
          Crear cuenta
        </button>
      </form>
      <p className="mt-6 text-sm text-slate-600">
        ¿Ya tienes cuenta?{" "}
        <Link className="font-bold text-coral-700 hover:underline" href={`/cuenta/entrar?next=${encodeURIComponent(nextPath)}`}>
          Entrar
        </Link>
      </p>
    </AccountFrame>
  );
}
