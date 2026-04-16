import Link from "next/link";

export const metadata = {
  title: "Monetag",
  robots: {
    index: false,
    follow: false,
  },
};

/** La etiqueta Monetag se carga en el layout global; esta ruta evita 404 por enlaces antiguos. */
export default function MonetagLegacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-bold text-slate-900">Monetag</h1>
      <p className="mt-3 text-slate-600">
        El script de Monetag está instalado en todas las páginas del sitio. Puedes volver al inicio o
        usar la comprobación de Monetag sobre la URL principal.
      </p>
      <p className="mt-6">
        <Link href="/" className="font-bold text-coral-600 hover:underline">
          Ir al inicio →
        </Link>
      </p>
    </main>
  );
}
