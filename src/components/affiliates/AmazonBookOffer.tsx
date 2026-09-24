import { BookOpen, ExternalLink } from "lucide-react";
import type { AffiliateBook, AffiliateBookTone } from "@/lib/affiliates/book";

const TONE: Record<
  AffiliateBookTone,
  { card: string; eyebrow: string; icon: string; dot: string }
> = {
  amber: {
    card: "border-amber-200 bg-amber-50",
    eyebrow: "text-amber-800",
    icon: "bg-amber-500",
    dot: "bg-amber-500",
  },
  sky: {
    card: "border-sky-200 bg-sky-50",
    eyebrow: "text-sky-800",
    icon: "bg-sky-600",
    dot: "bg-sky-600",
  },
  emerald: {
    card: "border-emerald-200 bg-emerald-50",
    eyebrow: "text-emerald-800",
    icon: "bg-emerald-600",
    dot: "bg-emerald-600",
  },
};

type AmazonBookOfferProps = {
  book: AffiliateBook;
  variant?: "full" | "compact";
};

export function AmazonBookOffer({ book, variant = "full" }: AmazonBookOfferProps) {
  const compact = variant === "compact";
  const tone = TONE[book.tone];

  return (
    <aside
      aria-label={`Comprar ${book.title} en Amazon`}
      className={
        compact
          ? `rounded-3xl border p-6 shadow-sm ${tone.card}`
          : `rounded-[2rem] border bg-gradient-to-br from-white p-6 shadow-sm sm:p-8 ${tone.card}`
      }
    >
      <p className={`mb-3 text-xs font-bold uppercase tracking-wider ${tone.eyebrow}`}>
        {book.eyebrow}
      </p>
      <div className={compact ? "space-y-4" : "flex flex-col gap-6 sm:flex-row sm:items-start"}>
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white ${tone.icon}`}
          aria-hidden
        >
          <BookOpen className="h-7 w-7" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display text-xl font-black leading-tight text-slate-900 sm:text-2xl">
            {book.title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
            {book.description}
          </p>
          {compact ? null : (
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {book.highlights.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${tone.dot}`} aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          <a
            href={book.url}
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
