import Link from "next/link";
import { BookOpenText, ArrowRight } from "lucide-react";

type CourseTopicCanonicalBannerProps = {
  href: string;
  title: string;
  targetIsCourseUnit: boolean;
  isWorkbook: boolean;
};

export function CourseTopicCanonicalBanner({
  href,
  title,
  targetIsCourseUnit,
  isWorkbook,
}: CourseTopicCanonicalBannerProps) {
  const heading = targetIsCourseUnit
    ? "Guía de esta unidad"
    : "Guía canónica del tema";
  const body = targetIsCourseUnit
    ? isWorkbook
      ? "Este cuaderno es la práctica. La explicación de la unidad está en la guía:"
      : "Sigue esta guía de la unidad para el mismo contenido sin competir en Google."
    : isWorkbook
      ? "Este cuaderno es práctica del curso. Quien busca el tema debe aterrizar en la guía:"
      : "Esta unidad del curso practica el tema. La URL que debe posicionar es la guía, no el número de unidad.";

  return (
    <aside
      aria-label={heading}
      className="mb-8 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm print-hidden"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
          <BookOpenText className="h-5 w-5" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-800 mb-1">
            {heading}
          </p>
          <p className="text-slate-700 text-sm leading-relaxed mb-4">{body}</p>
          <Link
            href={href}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-800 transition-colors"
          >
            <span className="line-clamp-1">{title}</span>
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
        </div>
      </div>
    </aside>
  );
}
