"use client";

import Image from "next/image";
import Link from "next/link";
import { trackCTAClick } from "@/lib/analytics";
import {
  getRelatedCourseLevels,
  type CEFRLevel,
} from "@/lib/seo/blog-course-recommendations";

interface RelatedCourseCardsProps {
  level: CEFRLevel | null;
  articleSlug: string;
}

export function RelatedCourseCards({ level, articleSlug }: RelatedCourseCardsProps) {
  const levels = getRelatedCourseLevels(level);

  return (
    <section className="mt-12 print-hidden" aria-labelledby="related-courses-title">
      <h2 id="related-courses-title" className="font-display mb-6 text-2xl font-black text-slate-900">
        Explora cursos de inglés por nivel
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {levels.map((courseLevel) => (
          <article key={courseLevel} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="relative h-32 bg-indigo-50">
              <Image
                src="/blog/course-level-card.svg"
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover"
              />
              <span className="absolute bottom-3 left-4 rounded-full bg-white px-3 py-1 text-sm font-black text-indigo-800 shadow">
                Nivel {courseLevel}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-slate-900">Curso de inglés {courseLevel}</h3>
              <p className="mt-1 text-sm text-slate-600">Unidades interactivas · Duración flexible</p>
              <Link
                href={`/blog/curso-${courseLevel.toLowerCase()}`}
                onClick={() => trackCTAClick(`Explorar curso ${courseLevel}`, `blog_related_courses_${articleSlug}`)}
                className="mt-4 inline-flex items-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-slate-700"
              >
                Explorar curso
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
