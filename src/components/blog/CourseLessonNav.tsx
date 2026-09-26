"use client";

import Link from "next/link";
import type { CourseLessonLink } from "@/lib/seo/course-lesson-nav";
import {
  trackNextLessonClicked,
  trackPreviousLessonClicked,
  trackRelatedArticleClicked,
} from "@/lib/analytics";

export function CourseLessonNav({
  links,
  sourcePath,
}: {
  links: CourseLessonLink[];
  sourcePath: string;
}) {
  if (links.length === 0) return null;

  return (
    <nav aria-label="Progreso del curso" className="mb-8 print-hidden">
      <ul className="flex flex-wrap gap-2">
        {links.map((link) => (
          <li key={`${link.kind}-${link.href}`}>
            <Link
              href={link.href}
              onClick={() => {
                if (link.kind === "next") trackNextLessonClicked(sourcePath, link.href);
                else if (link.kind === "previous") trackPreviousLessonClicked(sourcePath, link.href);
                else trackRelatedArticleClicked(sourcePath, link.href, link.kind);
              }}
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:border-coral-300 hover:text-coral-700"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
