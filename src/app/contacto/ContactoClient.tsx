import Link from "next/link";
import { Navigation } from "@/components/sections/Navigation";
import { CONTACT_EMAIL } from "@/lib/site-brand";
import { ContactMailForm } from "./ContactMailForm";

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <section className="mx-auto max-w-3xl px-4 pb-8 pt-16 sm:px-6">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-coral-600">Contacto</p>
          <h1 className="mt-3 font-heading text-4xl font-black text-slate-900 sm:text-5xl">
            Escríbenos por correo
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Puedes ponerte en contacto con el equipo a través de{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-coral-600">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>

        <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            <ContactMailForm />
          </div>
          <p className="mt-8 text-sm text-slate-500">
            También puedes ir al <Link href="/blog" className="font-bold text-coral-600">blog</Link> si buscas un artículo.
          </p>
        </section>
      </main>
    </>
  );
}
