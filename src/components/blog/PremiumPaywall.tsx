import Link from "next/link";

export function PremiumPaywall({
  nextPath,
  loggedIn,
  priceLabel,
}: {
  nextPath: string;
  loggedIn: boolean;
  priceLabel?: string | null;
}) {
  const login = `/cuenta/entrar?next=${encodeURIComponent(nextPath)}`;
  const register = `/cuenta/registro?next=${encodeURIComponent(nextPath)}`;
  const price = priceLabel || "Suscripción mensual";

  return (
    <section className="paywall not-prose my-10 overflow-hidden rounded-[2rem] border border-coral-200 bg-gradient-to-b from-coral-50 to-white p-8 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wider text-coral-700">Artículo premium</p>
      <h2 className="mt-2 font-display text-2xl font-black text-slate-900">
        El resto de este artículo es para suscriptores
      </h2>
      <p className="mt-3 text-slate-600">
        Las guías gratuitas siguen abiertas. Una suscripción mensual desbloquea todos los
        artículos premium. {price !== "Suscripción mensual" ? `Precio: ${price}.` : "El precio lo marca el producto en Stripe."}
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {loggedIn ? (
          <form action="/api/billing/checkout" method="post" className="sm:flex-1">
            <input type="hidden" name="next" value={nextPath} />
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-coral-500 to-peach-500 px-5 py-3 text-sm font-black text-white hover:opacity-90"
            >
              Suscribirme
            </button>
          </form>
        ) : (
          <>
            <Link
              href={register}
              className="inline-flex flex-1 items-center justify-center rounded-full bg-gradient-to-r from-coral-500 to-peach-500 px-5 py-3 text-sm font-black text-white hover:opacity-90"
            >
              Crear cuenta
            </Link>
            <Link
              href={login}
              className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-800 hover:border-coral-200"
            >
              Ya tengo cuenta
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
