'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { BlogCourseRelation } from '@/lib/blog-course-map';

interface BlogCourseMapTableProps {
  relations: BlogCourseRelation[];
  topics: { id: string; name: string }[];
  courseLabels: string[];
  highlightSlug?: string;
}

interface FilterState {
  search: string;
  topicFilter: string;
  courseFilter: string;
  categoryFilter: string;
}

const PAGE_SIZE = 50;

const EMPTY_FILTERS: FilterState = {
  search: '',
  topicFilter: '',
  courseFilter: '',
  categoryFilter: '',
};

/** Orden estable en cliente (sin importar lógica server/fs de blog-course-map). */
function compareBlogCourseRelations(a: BlogCourseRelation, b: BlogCourseRelation): number {
  const courseCmp = a.courseLabel.localeCompare(b.courseLabel, 'es');
  if (courseCmp !== 0) return courseCmp;
  const unitCmp = a.unitNumber - b.unitNumber;
  if (unitCmp !== 0) return unitCmp;
  return a.articleTitle.localeCompare(b.articleTitle, 'es');
}

function matchesSearch(relation: BlogCourseRelation, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  // Buscar unidades: solo el número (p. ej. 12 o U12)
  const unitOnly = q.replace(/^u\s*/i, '').trim();
  if (/^\d+$/.test(unitOnly) && relation.unitNumber === Number(unitOnly)) {
    return true;
  }

  return (
    relation.articleTitle.toLowerCase().includes(q) ||
    relation.articleSlug.toLowerCase().includes(q) ||
    relation.topicName.toLowerCase().includes(q) ||
    relation.unitTitle.toLowerCase().includes(q) ||
    relation.courseLabel.toLowerCase().includes(q) ||
    `u${relation.unitNumber}`.includes(q) ||
    String(relation.unitNumber).includes(q)
  );
}

export function BlogCourseMapTable({
  relations,
  topics,
  courseLabels,
  highlightSlug,
}: BlogCourseMapTableProps) {
  const [draft, setDraft] = useState<FilterState>(EMPTY_FILTERS);
  const [applied, setApplied] = useState<FilterState>(EMPTY_FILTERS);
  const [page, setPage] = useState(1);

  const categories = useMemo(
    () => Array.from(new Set(relations.map((r) => r.articleCategory))).sort(),
    [relations],
  );

  const filtered = useMemo(() => {
    return relations
      .filter((r) => {
        if (applied.topicFilter && r.topicId !== applied.topicFilter) return false;
        if (applied.courseFilter && r.courseLabel !== applied.courseFilter) return false;
        if (applied.categoryFilter && r.articleCategory !== applied.categoryFilter) return false;
        return matchesSearch(r, applied.search);
      })
      .sort(compareBlogCourseRelations);
  }, [relations, applied]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [applied]);

  useEffect(() => {
    if (!highlightSlug) return;
    const el = document.getElementById(`articulo-${highlightSlug}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [highlightSlug, pageItems]);

  const applyFilters = (next?: FilterState) => {
    setApplied(next ?? draft);
  };

  const filtersDirty =
    draft.search !== applied.search ||
    draft.topicFilter !== applied.topicFilter ||
    draft.courseFilter !== applied.courseFilter ||
    draft.categoryFilter !== applied.categoryFilter;

  return (
    <div className="space-y-6">
      {highlightSlug && (
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50 px-5 py-4 text-sm text-indigo-900">
          Has llegado desde un artículo del blog. Las filas de ese artículo aparecen resaltadas.{' '}
          <button
            type="button"
            onClick={() => {
              const next = {
                ...EMPTY_FILTERS,
                search: highlightSlug.replace(/-/g, ' '),
              };
              setDraft(next);
              applyFilters(next);
            }}
            className="font-bold underline hover:text-indigo-700"
          >
            Filtrar solo ese artículo
          </button>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-1 block">Buscar</span>
            <input
              type="search"
              value={draft.search}
              onChange={(e) => setDraft((prev) => ({ ...prev, search: e.target.value }))}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  applyFilters();
                }
              }}
              placeholder="Artículo, tema o nº de unidad..."
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
            <p className="mt-1.5 text-xs text-slate-500 leading-snug">
              Para buscar unidades, pon únicamente el número de unidad.
            </p>
          </label>
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-1 block">Tema</span>
            <select
              value={draft.topicFilter}
              onChange={(e) => setDraft((prev) => ({ ...prev, topicFilter: e.target.value }))}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm bg-white focus:border-indigo-400 focus:outline-none"
            >
              <option value="">Todos los temas</option>
              {topics.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-1 block">Curso</span>
            <select
              value={draft.courseFilter}
              onChange={(e) => setDraft((prev) => ({ ...prev, courseFilter: e.target.value }))}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm bg-white focus:border-indigo-400 focus:outline-none"
            >
              <option value="">Todos los cursos</option>
              {courseLabels.map((label) => (
                <option key={label} value={label}>{label}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-1 block">Categoría blog</span>
            <select
              value={draft.categoryFilter}
              onChange={(e) => setDraft((prev) => ({ ...prev, categoryFilter: e.target.value }))}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm bg-white focus:border-indigo-400 focus:outline-none"
            >
              <option value="">Todas</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => applyFilters()}
            className="inline-flex items-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-indigo-700 transition-colors"
          >
            Aplicar filtros
          </button>
          {(applied.search || applied.topicFilter || applied.courseFilter || applied.categoryFilter) && (
            <button
              type="button"
              onClick={() => {
                setDraft(EMPTY_FILTERS);
                applyFilters(EMPTY_FILTERS);
              }}
              className="inline-flex items-center rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Limpiar
            </button>
          )}
          {filtersDirty && (
            <span className="text-xs text-amber-700 font-medium">
              Hay cambios sin aplicar
            </span>
          )}
        </div>
      </div>

      <p className="text-sm text-slate-600">
        <span className="font-bold text-slate-900">{filtered.length}</span> relaciones encontradas
        {filtered.length !== relations.length && (
          <span> (de {relations.length} en total)</span>
        )}
      </p>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-100 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Artículo del blog</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Tema</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Curso</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Unidad</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Practicar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {pageItems.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-slate-500">
                  No hay resultados con los filtros actuales.
                </td>
              </tr>
            ) : (
              pageItems.map((row) => {
                const isHighlighted = highlightSlug === row.articleSlug;
                return (
                  <tr
                    key={`${row.articleSlug}-${row.courseId}-${row.unitNumber}-${row.topicId}`}
                    id={isHighlighted ? `articulo-${row.articleSlug}` : undefined}
                    className={isHighlighted ? 'bg-indigo-50/70' : 'hover:bg-slate-50/80'}
                  >
                    <td className="px-4 py-3 align-top">
                      <Link
                        href={row.articleUrl}
                        className="font-semibold text-slate-900 hover:text-indigo-700 hover:underline leading-snug"
                      >
                        {row.articleTitle}
                      </Link>
                      <p className="text-xs text-slate-500 mt-1 capitalize">{row.articleCategory}</p>
                    </td>
                    <td className="px-4 py-3 align-top text-slate-700">{row.topicName}</td>
                    <td className="px-4 py-3 align-top">
                      <span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                        {row.courseLabel}
                      </span>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <span className="font-medium text-slate-900">U{row.unitNumber}</span>
                      <p className="text-xs text-slate-600 mt-0.5 max-w-xs">{row.unitTitle}</p>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <Link
                        href={row.unitUrl}
                        className="inline-flex items-center rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-700 transition-colors"
                      >
                        Ir a la unidad →
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 disabled:opacity-40 hover:bg-slate-50"
          >
            Anterior
          </button>
          <span className="text-sm text-slate-600">
            Página {page} de {totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 disabled:opacity-40 hover:bg-slate-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
