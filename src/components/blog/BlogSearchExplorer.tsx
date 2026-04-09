"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export type BlogCategoryOption = { slug: string; label: string };

type SearchResponse = {
  hits: {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    image?: string;
    alt?: string;
  }[];
  total: number;
};

export function BlogSearchExplorer({
  categories,
  articleCount,
  forcedCategory,
  forcedCategoryLabel,
}: {
  categories: BlogCategoryOption[];
  articleCount: number;
  /** Si se define (p. ej. en /blog/[category]), la búsqueda queda acotada a esta categoría. */
  forcedCategory?: string;
  /** Etiqueta legible para la categoría fija (opcional). */
  forcedCategoryLabel?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const formId = useId();

  const initialQ = searchParams.get("q") || "";
  const initialCat = forcedCategory
    ? forcedCategory
    : searchParams.get("c") || "all";
  const initialMatch: "any" | "all" = forcedCategory
    ? "any"
    : searchParams.get("m") === "all"
      ? "all"
      : "any";

  const [query, setQuery] = useState(initialQ);
  const [category, setCategory] = useState(initialCat);
  const [matchMode, setMatchMode] = useState<"any" | "all">(initialMatch);
  const [offset, setOffset] = useState(0);
  const pageSize = 24;

  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const prevQueryCat = useRef<{ q: string; c: string; m: "any" | "all" } | null>(
    null
  );

  const syncUrl = useCallback(
    (nextQ: string, nextCat: string, matchForUrl?: "any" | "all") => {
      const params = new URLSearchParams(searchParams.toString());
      const trimmed = nextQ.trim();
      const m = matchForUrl ?? matchMode;
      if (trimmed) params.set("q", trimmed);
      else params.delete("q");
      if (!forcedCategory) {
        if (nextCat && nextCat !== "all") params.set("c", nextCat);
        else params.delete("c");
        if (m === "all") params.set("m", "all");
        else params.delete("m");
      } else {
        params.delete("c");
        params.delete("m");
      }
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams, forcedCategory, matchMode]
  );

  const fetchSearch = useCallback(
    async (q: string, cat: string, off: number, showSpinner: boolean) => {
      const trimmed = q.trim();
      const c = cat || "all";

      if (!trimmed && c === "all") {
        setData(null);
        setLoading(false);
        setError(null);
        return;
      }

      if (forcedCategory && !trimmed) {
        setData(null);
        setLoading(false);
        setError(null);
        return;
      }

      const tokens = trimmed
        ? trimmed.split(/\s+/).filter((t) => t.length > 0)
        : [];
      if (
        trimmed.length > 0 &&
        tokens.every((t) => t.length < 2)
      ) {
        setData(null);
        setLoading(false);
        return;
      }

      if (showSpinner) setLoading(true);
      setError(null);
      try {
        const categoryParam = forcedCategory || c;
        const searchMatch: "any" | "all" = forcedCategory ? "any" : matchMode;
        const params = new URLSearchParams({
          q: trimmed,
          category: categoryParam,
          limit: String(pageSize),
          offset: String(off),
          match: searchMatch,
        });
        const res = await fetch(`/api/blog/search?${params.toString()}`);
        if (!res.ok) throw new Error("Error de red");
        const json: SearchResponse = await res.json();
        setData(json);
      } catch {
        setError("No se pudieron cargar los resultados. Inténtalo de nuevo.");
        setData(null);
      } finally {
        setLoading(false);
      }
    },
    [pageSize, forcedCategory, matchMode]
  );

  const qParam = searchParams.get("q") || "";
  const cParam = searchParams.get("c") || "all";
  const mParam: "any" | "all" =
    searchParams.get("m") === "all" ? "all" : "any";

  useEffect(() => {
    setQuery(qParam);
    if (!forcedCategory) {
      setCategory(cParam);
      setMatchMode(mParam);
    } else {
      setCategory(forcedCategory);
      setMatchMode("any");
    }
    setOffset(0);
  }, [qParam, cParam, mParam, forcedCategory]);

  useEffect(() => {
    const trimmed = query.trim();
    const cat = forcedCategory || category || "all";

    if (forcedCategory && !trimmed) {
      setData(null);
      setLoading(false);
      return;
    }

    if (!trimmed && cat === "all") {
      setData(null);
      setLoading(false);
      return;
    }

    const tokens = trimmed
      ? trimmed.split(/\s+/).filter((t) => t.length > 0)
      : [];
    if (trimmed.length > 0 && tokens.every((t) => t.length < 2)) {
      setData(null);
      setLoading(false);
      return;
    }

    const prev = prevQueryCat.current;
    const effectiveM = forcedCategory ? "any" : matchMode;
    const qcChanged =
      !prev ||
      prev.q !== query ||
      prev.c !== category ||
      prev.m !== effectiveM;
    prevQueryCat.current = { q: query, c: category, m: effectiveM };

    const run = () =>
      void fetchSearch(query, forcedCategory || category, offset, true);

    if (!qcChanged) {
      run();
      return;
    }

    const t = setTimeout(run, 320);
    return () => clearTimeout(t);
  }, [query, category, offset, fetchSearch, forcedCategory, matchMode]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    syncUrl(query, category);
    setOffset(0);
    void fetchSearch(query, forcedCategory || category, 0, true);
  };

  const totalPages =
    data && data.total > 0 ? Math.ceil(data.total / pageSize) : 0;
  const currentPage = Math.floor(offset / pageSize) + 1;

  const showHint =
    !forcedCategory &&
    !query.trim() &&
    category === "all" &&
    !loading &&
    !data;

  const shortTokens =
    query.trim().length > 0 &&
    query.trim().split(/\s+/).every((t) => t.length > 0 && t.length < 2);

  return (
    <section
      className="mb-14 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8"
      aria-labelledby={`${formId}-heading`}
    >
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id={`${formId}-heading`}
            className="font-display text-2xl font-black tracking-tight text-slate-900"
          >
            {forcedCategory ? "Buscar en esta categoría" : "Buscar en el blog"}
          </h2>
          <p className="mt-1 text-slate-600">
            Palabras clave en títulos, resúmenes y contenido.{" "}
            {forcedCategory ? (
              <>
                Varios términos: basta con que coincida{" "}
                <span className="font-medium text-slate-700">una</span>.{" "}
              </>
            ) : matchMode === "all" ? (
              <>
                Modo <span className="font-semibold text-slate-800">todas</span>: deben aparecer
                todos los términos en el mismo artículo.{" "}
              </>
            ) : (
              <>
                Modo <span className="font-semibold text-slate-800">cualquiera</span>: basta con un
                término; cambia a «Todas» si quieres que coincidan todos.{" "}
              </>
            )}
            <span className="text-slate-500">
              {articleCount.toLocaleString("es-ES")}{" "}
              {forcedCategory
                ? "artículos en esta sección."
                : "artículos indexados."}
            </span>
          </p>
          {forcedCategory && forcedCategoryLabel && (
            <p className="mt-2 text-sm font-semibold text-coral-700">
              Solo en: {forcedCategoryLabel}
            </p>
          )}
        </div>
      </div>

      {!forcedCategory && (
        <div
          className="mb-5 flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Coincidencia con varias palabras"
        >
          <span className="text-sm font-medium text-slate-700">Varias palabras:</span>
          <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-0.5">
            <button
              type="button"
              onClick={() => {
                setMatchMode("any");
                setOffset(0);
                syncUrl(query, category, "any");
              }}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                matchMode === "any"
                  ? "bg-white text-coral-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Cualquiera (O)
            </button>
            <button
              type="button"
              onClick={() => {
                setMatchMode("all");
                setOffset(0);
                syncUrl(query, category, "all");
              }}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                matchMode === "all"
                  ? "bg-white text-coral-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Todas (Y)
            </button>
          </div>
        </div>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
        <div className="relative flex-1">
          <label htmlFor={`${formId}-q`} className="sr-only">
            Buscar artículos
          </label>
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            aria-hidden
          />
          <input
            id={`${formId}-q`}
            type="search"
            name="q"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOffset(0);
              syncUrl(e.target.value, forcedCategory || category);
            }}
            placeholder="Ej. IELTS, present perfect, entrevista..."
            autoComplete="off"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:border-coral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coral-200"
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {!forcedCategory && (
            <>
              <label htmlFor={`${formId}-cat`} className="sr-only">
                Categoría
              </label>
              <select
                id={`${formId}-cat`}
                name="c"
                value={category}
                onChange={(e) => {
                  const next = e.target.value;
                  setCategory(next);
                  setOffset(0);
                  syncUrl(query, next);
                }}
                className="min-w-[200px] rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 focus:border-coral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coral-200"
              >
                <option value="all">Todas las categorías</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.label}
                  </option>
                ))}
              </select>
            </>
          )}
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-coral-500 to-peach-500 px-6 py-3.5 font-bold text-white shadow-sm transition hover:shadow-md"
          >
            Buscar
          </button>
        </div>
      </form>

      {forcedCategory && !query.trim() && (
        <p className="mt-4 text-sm text-slate-500">
          Escribe palabras clave para acotar resultados. El listado completo de la categoría está
          más abajo.
        </p>
      )}

      {showHint && (
        <p className="mt-4 text-sm text-slate-500">
          Escribe al menos 2 caracteres por palabra o elige una categoría para listar artículos.
        </p>
      )}

      {shortTokens && (
        <p className="mt-4 text-sm text-amber-800">
          Escribe al menos 2 caracteres en cada palabra clave (o selecciona solo una categoría).
        </p>
      )}

      {loading && (
        <p className="mt-6 text-center text-slate-500" role="status">
          Buscando…
        </p>
      )}

      {error && (
        <p className="mt-6 text-center text-red-600" role="alert">
          {error}
        </p>
      )}

      {data && !loading && (
        <>
          <p className="mt-6 text-sm text-slate-600">
            {data.total === 0
              ? "No hay artículos que coincidan."
              : `${data.total.toLocaleString("es-ES")} resultado${data.total === 1 ? "" : "s"}`}
          </p>

          {data.hits.length > 0 && (
            <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.hits.map((article) => (
                <li key={`${article.category}-${article.slug}`}>
                  <Link
                    href={`/blog/${article.category}/${article.slug}`}
                    className="group block h-full rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition hover:border-coral-200 hover:bg-white hover:shadow-md"
                  >
                    {article.image && (
                      <div className="relative mb-3 h-36 w-full overflow-hidden rounded-xl">
                        <Image
                          src={article.image}
                          alt={article.alt || article.title}
                          fill
                          quality={70}
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="rounded-full bg-coral-100 px-2 py-0.5 font-semibold text-coral-800">
                        {article.category}
                      </span>
                      <span>
                        {new Date(article.date).toLocaleDateString("es-ES", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span>·</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 transition group-hover:text-coral-600">
                      {article.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                      {article.excerpt}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {data.total > pageSize && (
            <nav
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
              aria-label="Paginación de resultados"
            >
              <button
                type="button"
                disabled={offset === 0}
                onClick={() => setOffset((o) => Math.max(0, o - pageSize))}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 hover:border-coral-300 hover:text-coral-700"
              >
                Anterior
              </button>
              <span className="text-sm text-slate-600">
                Página {currentPage} de {totalPages}
              </span>
              <button
                type="button"
                disabled={offset + pageSize >= data.total}
                onClick={() => setOffset((o) => o + pageSize)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 hover:border-coral-300 hover:text-coral-700"
              >
                Siguiente
              </button>
            </nav>
          )}
        </>
      )}
    </section>
  );
}
