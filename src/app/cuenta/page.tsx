import type { Metadata } from "next";
import Link from "next/link";
import { AccountError, AccountFrame, buttonClass } from "@/components/account/AccountFrame";
import { readerHasPremiumAccess } from "@/lib/billing/access";
import { safeNextPath } from "@/lib/billing/http";
import { getReaderSession } from "@/lib/billing/session-cookie";
import { monthlyPriceLabel } from "@/lib/billing/stripe";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tu cuenta",
  robots: { index: false, follow: false },
};

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; checkout?: string; next?: string }>;
}) {
  const params = await searchParams;
  const reader = await getReaderSession();
  const nextPath = safeNextPath(params.next, "/cuenta");

  if (!reader) {
    const query = new URLSearchParams({ next: nextPath });
    if (params.error) query.set("error", params.error);
    return (
      <AccountFrame title="Tu cuenta" subtitle="Entra para ver el estado de la suscripción.">
        <AccountError code={params.error} />
        <Link className={buttonClass} href={`/cuenta/entrar?${query.toString()}`}>
          Entrar
        </Link>
        <p className="mt-6 text-sm text-slate-600">
          <Link className="font-bold text-coral-700 hover:underline" href={`/cuenta/registro?${query.toString()}`}>
            Crear cuenta
          </Link>
        </p>
      </AccountFrame>
    );
  }

  const active = await readerHasPremiumAccess();
  const priceLabel = await monthlyPriceLabel();

  return (
    <AccountFrame title="Tu cuenta" subtitle={reader.email}>
      <AccountError code={params.error} />
      {params.checkout === "ok" ? (
        <p className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          Pago recibido. Si el artículo no se abre al momento, recarga en unos segundos.
        </p>
      ) : null}
      {params.checkout === "cancel" ? (
        <p className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          Has salido del pago. Puedes suscribirte cuando quieras.
        </p>
      ) : null}
      <p className="text-sm font-bold uppercase tracking-wider text-slate-500">Suscripción</p>
      <p className="mt-2 text-lg font-black text-slate-900">
        {active ? "Activa" : "Sin suscripción activa"}
      </p>
      <p className="mt-2 text-sm text-slate-600">
        {active
          ? "Puedes leer todos los artículos premium."
          : `Una suscripción mensual desbloquea todos los artículos premium${priceLabel ? ` (${priceLabel})` : ""}.`}
      </p>
      <div className="mt-6 space-y-3">
        {active ? (
          <form action="/api/billing/portal" method="post">
            <button className={buttonClass} type="submit">
              Gestionar suscripción
            </button>
          </form>
        ) : (
          <form action="/api/billing/checkout" method="post">
            <input type="hidden" name="next" value={nextPath} />
            <button className={buttonClass} type="submit">
              Suscribirme
            </button>
          </form>
        )}
        <form action="/api/auth/logout" method="post">
          <button
            className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-black text-slate-700 hover:border-slate-300"
            type="submit"
          >
            Cerrar sesión
          </button>
        </form>
      </div>
    </AccountFrame>
  );
}
