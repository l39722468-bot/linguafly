"use client";

import Link from "next/link";
import { ArrowRight, ClipboardCheck } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";

export function TestWidgetSidebar() {
  return (
    <section className="rounded-3xl border border-indigo-100 bg-indigo-50 p-6 shadow-sm">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white">
        <ClipboardCheck aria-hidden className="h-5 w-5" />
      </div>
      <p className="text-xs font-bold uppercase tracking-wider text-indigo-700">Test gratuito</p>
      <h2 className="mt-1 text-xl font-black text-slate-900">Descubre tu nivel</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">
        Completa el test y recibe tu nivel CEFR con recomendaciones personalizadas. Al terminar,
        puedes compartir tu email para recibir el resultado.
      </p>
      <Link
        href="/test-nivel"
        onClick={() => trackCTAClick("Descubre tu nivel - Test gratuito", "blog_sidebar")}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-indigo-700"
      >
        Hacer el test gratuito
        <ArrowRight aria-hidden className="h-4 w-4" />
      </Link>
    </section>
  );
}
