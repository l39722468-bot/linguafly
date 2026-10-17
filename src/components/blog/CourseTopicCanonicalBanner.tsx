import Link from "next/link";
import { BookOpenText, ArrowRight } from "lucide-react";

type CourseTopicCanonicalBannerProps = {
  href: string;
  title: string;
  description: string;
  sourceIsCourseUnit: boolean;
  targetIsCourseUnit: boolean;
  isWorkbook: boolean;
};

export function CourseTopicCanonicalBanner({
  href,
  title,
  description,
  sourceIsCourseUnit,
  targetIsCourseUnit,
  isWorkbook,
}: CourseTopicCanonicalBannerProps) {
  const heading = sourceIsCourseUnit
    ? isWorkbook
      ? "Qué encontrarás en este cuaderno"
      : "Qué encontrarás en esta unidad"
    : targetIsCourseUnit
      ? "Practica con esta unidad"
      : "Amplía este tema";

  return (
    <aside
      aria-label={heading}
      className="mb-8 rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-6 shadow-sm print-hidden"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white">
          <BookOpenText className="h-5 w-5" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-sky-800">
            {heading}
          </p>
          <p className="mb-4 text-sm leading-relaxed text-slate-700">
            {description}
          </p>
          <Link
            href={href}
            className="inline-flex items-center gap-2 rounded-xl bg-sky-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-sky-800"
          >
            <span className="line-clamp-1">{title}</span>
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
        </div>
      </div>
    </aside>
  );
}
