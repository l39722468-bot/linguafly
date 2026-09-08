import Link from "next/link";
import { paginationHref } from "@/lib/content/pagination";

export function ArticlePagination({
  page,
  pages,
  hrefBase,
}: {
  page: number;
  pages: number;
  hrefBase: string;
}) {
  if (pages <= 1) return null;

  const prev = page > 1 ? paginationHref(hrefBase, page - 1) : null;
  const next = page < pages ? paginationHref(hrefBase, page + 1) : null;

  return (
    <nav
      className="mt-12 flex items-center justify-center gap-4"
      aria-label="Paginación de artículos"
    >
      {prev ? (
        <Link
          href={prev}
          rel="prev"
          className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-800 hover:border-coral-200"
        >
          ← Anterior
        </Link>
      ) : (
        <span className="rounded-2xl border border-transparent px-5 py-3 text-sm font-black text-slate-300">
          ← Anterior
        </span>
      )}
      <p className="text-sm font-bold text-slate-500">
        Página {page} de {pages}
      </p>
      {next ? (
        <Link
          href={next}
          rel="next"
          className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-800 hover:border-coral-200"
        >
          Siguiente →
        </Link>
      ) : (
        <span className="rounded-2xl border border-transparent px-5 py-3 text-sm font-black text-slate-300">
          Siguiente →
        </span>
      )}
    </nav>
  );
}
