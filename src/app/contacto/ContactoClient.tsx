import Link from "next/link";
import { Navigation } from "@/components/sections/Navigation";
import { CONTACT_EMAIL } from "@/lib/site-brand";

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <section className="mx-auto max-w-3xl px-4 pb-20 pt-16 sm:px-6">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-coral-600">Contacto</p>
          <h1 className="mt-3 font-heading text-4xl font-black text-slate-900 sm:text-5xl">
            Escríbenos por correo
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            Para ponerte en contacto, mándanos un email a{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-coral-600">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
          <p className="mt-8 text-sm text-slate-500">
            También puedes ir al <Link href="/blog" className="font-bold text-coral-600">blog</Link> si buscas un artículo.
          </p>
        </section>
      </main>
    </>
  );
}
