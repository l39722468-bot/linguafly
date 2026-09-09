import Link from "next/link";
import { getArticleHubLink } from "@/lib/seo/article-hub-link";
import { isEnglishLearningCategory } from "@/lib/site-catalog";

interface SEOInterlinkingProps {
  category?: string;
}

export function SEOInterlinking({ category }: SEOInterlinkingProps) {
  const hub = getArticleHubLink(category);
  const english = isEnglishLearningCategory(category || "");

  return (
    <div className="my-12 p-8 bg-gradient-to-br from-slate-50 to-coral-50 rounded-3xl border border-coral-100 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 mb-4">
        {english ? "Sigue mejorando tu inglés" : "Sigue leyendo"}
      </h3>
      <p className="text-slate-700 mb-6 leading-relaxed">
        Si te ha servido esta guía, continúa con{" "}
        <strong>{hub.label}</strong>
        {hub.showIndex ? " o con el resto de la sección." : "."}
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href={hub.href}
          className="inline-flex items-center justify-center bg-coral-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-coral-700 transition-all hover:scale-[1.02]"
        >
          Ver {hub.label}
        </Link>
        {hub.showIndex && (
          <Link
            href={hub.indexHref}
            className="inline-flex items-center justify-center bg-white border-2 border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold hover:border-coral-200 hover:bg-coral-50/30 transition-all"
          >
            {hub.indexLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
