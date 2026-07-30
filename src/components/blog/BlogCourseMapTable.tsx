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

const PAGE_SIZE = 50;

export function BlogCourseMapTable({
  relations,
  topics,
  courseLabels,
  highlightSlug,
}: BlogCourseMapTableProps) {
  const [search, setSearch] = useState('');
  const [topicFilter, setTopicFilter] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [page, setPage] = useState(1);

  const categories = useMemo(
    () => Array.from(new Set(relations.map((r) => r.articleCategory))).sort(),
    [relations],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return relations.filter((r) => {
      if (topicFilter && r.topicId !== topicFilter) return false;
      if (courseFilter && r.courseLabel !== courseFilter) return false;
      if (categoryFilter && r.articleCategory !== categoryFilter) return false;
      if (!q) return true;
      return (
        r.articleTitle.toLowerCase().includes(q) ||
        r.articleSlug.toLowerCase().includes(q) ||
        r.topicName.toLowerCase().includes(q) ||
        r.unitTitle.toLowerCase().includes(q) ||
        r.courseLabel.toLowerCase().includes(q)
      );
    });
  }, [relations, search, topicFilter, courseFilter, categoryFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [search, topicFilter, courseFilter, categoryFilter]);

  useEffect(() => {
    if (!highlightSlug) return;
    const el = document.getElementById(`articulo-${highlightSlug}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [highlightSlug, pageItems]);

  return (
    <div className="space-y-6">
      {highlightSlug && (
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50 px-5 py-4 text-sm text-indigo-900">
          Has llegado desde un artículo del blog. Las filas de ese artículo aparecen resaltadas.{' '}
          <button
            type="button"
            onClick={() => setSearch(highlightSlug.replace(/-/g, ' '))}
            className="font-bold underline hover:text-indigo-700"
          >
            Filtrar solo ese artículo
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-1 block">Buscar</span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Artículo, tema o unidad..."
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-1 block">Tema</span>
          <select
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
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
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
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
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm bg-white focus:border-indigo-400 focus:outline-none"
          >
            <option value="">Todas</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
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
