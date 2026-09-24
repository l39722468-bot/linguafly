import { BookOpen, ExternalLink } from "lucide-react";
import {
  APTIS_BOOK_AMAZON_URL,
  APTIS_BOOK_TITLE,
} from "@/lib/affiliates/aptis-book";

const HIGHLIGHTS = [
  "4 tests completos: gramática, reading, writing, listening y speaking",
  "Respuestas, modelos, transcripciones y hojas fotocopiables",
  "Audio y fotos de speaking por QR, con notas para hispanohablantes",
];

type AptisBookOfferProps = {
  variant?: "full" | "compact";
};

export function AptisBookOffer({ variant = "full" }: AptisBookOfferProps) {
  const compact = variant === "compact";

  return (
    <aside
      aria-label={`Comprar ${APTIS_BOOK_TITLE} en Amazon`}
      className={
        compact
          ? "rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm"
          : "rounded-[2rem] border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-6 shadow-sm sm:p-8"
      }
    >
      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-amber-800">
        Libro para el examen
      </p>
      <div className={compact ? "space-y-4" : "flex flex-col gap-6 sm:flex-row sm:items-start"}>
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white"
          aria-hidden
        >
          <BookOpen className="h-7 w-7" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display text-xl font-black leading-tight text-slate-900 sm:text-2xl">
            {APTIS_BOOK_TITLE}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
            Cuatro prácticas al estilo del Aptis General, con consejos para
            llegar a B1, B2 o C1. Tapa blanda, a la venta en Amazon.
          </p>
          {compact ? null : (
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          <a
            href={APTIS_BOOK_AMAZON_URL}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-800"
          >
            Comprar en Amazon
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
          <p className="mt-3 text-xs leading-relaxed text-slate-500">
            Enlace de afiliado. Como afiliado de Amazon, Linguafly obtiene
            ingresos por las compras que cumplen los requisitos, sin coste
            adicional para ti. El precio y la disponibilidad los marca Amazon.
          </p>
        </div>
      </div>
    </aside>
  );
}
