"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gaEvent, trackCTAClick } from "@/lib/analytics";
import type { CEFRLevel } from "@/lib/seo/blog-course-recommendations";

interface CourseCTAProps {
  level: CEFRLevel;
  articleSlug: string;
}

type Variant = "A" | "B";
const STORAGE_KEY = "linguafly-blog-cta-variant";

export function CourseCTA({ level, articleSlug }: CourseCTAProps) {
  const [variant, setVariant] = useState<Variant>("A");

  useEffect(() => {
    let assigned: Variant;
    try {
      const stored = window.sessionStorage.getItem(STORAGE_KEY);
      if (stored === "A" || stored === "B") {
        assigned = stored;
      } else {
        assigned = Math.random() < 0.5 ? "A" : "B";
        window.sessionStorage.setItem(STORAGE_KEY, assigned);
      }
    } catch {
      assigned = Math.random() < 0.5 ? "A" : "B";
    }
    setVariant(assigned);
    gaEvent("blog_cta_variant_view", {
      article_slug: articleSlug,
      cta_variant: assigned,
      course_level: level,
    });
  }, [articleSlug, level]);

  const headline =
    variant === "A"
      ? `Sigue aprendiendo inglés con el curso ${level}`
      : `Da el siguiente paso hacia tu nivel ${level}`;
  const buttonLabel = variant === "A" ? `Explorar curso ${level}` : `Empieza tu curso ${level}`;

  return (
    <aside className="my-8 rounded-2xl border border-coral-200 bg-gradient-to-r from-coral-50 to-white p-5 shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-coral-700">Continúa tu aprendizaje</p>
        <h2 className="mt-1 text-lg font-extrabold text-slate-900">{headline}</h2>
        <p className="mt-1 text-sm text-slate-600">Unidades interactivas y práctica a tu ritmo.</p>
      </div>
      <Link
        href={`/curso-${level.toLowerCase()}`}
        onClick={() => trackCTAClick(`${buttonLabel} · variante ${variant}`, `blog_course_${articleSlug}`)}
        className="mt-4 inline-flex shrink-0 items-center gap-2 rounded-xl bg-coral-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-coral-700 sm:mt-0"
      >
        {buttonLabel}
        <ArrowRight aria-hidden className="h-4 w-4" />
      </Link>
    </aside>
  );
}
