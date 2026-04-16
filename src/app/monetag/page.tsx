import Script from "next/script";

export const metadata = {
  title: "Monetag Runtime",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MonetagPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-bold text-slate-900">Monetag Runtime</h1>
      <p className="mt-3 text-slate-600">
        Esta ruta aísla la carga de Monetag para no afectar la CSP del resto del sitio.
      </p>
      <Script
        id="monetag-tag"
        src="https://quge5.com/88/tag.min.js"
        data-zone="230407"
        strategy="afterInteractive"
        data-cfasync="false"
      />
    </main>
  );
}
