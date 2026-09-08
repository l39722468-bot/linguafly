import Link from "next/link";
import { getPublicCategoryLabel } from "@/lib/site-catalog";
import { getArticlePath } from "@/lib/blog-paths";
import type { BlogPost } from "@/lib/blog";

export function MagazineArticleCard({ article }: { article: BlogPost }) {
  const label = getPublicCategoryLabel(article.category);

  return (
    <Link
      href={getArticlePath(article)}
      className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wide">
        <span className={`rounded-full px-3 py-1 ${label.tone.badge}`}>
          {label.icon} {label.name}
        </span>
        <span className="text-slate-400">{article.readTime}</span>
      </div>
      <h3 className="font-display mb-3 text-xl font-black leading-tight text-slate-900 group-hover:text-coral-700">
        {article.title}
      </h3>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">{article.excerpt}</p>
      <span className={`text-sm font-black ${label.tone.text}`}>
        Leer artículo →
      </span>
    </Link>
  );
}
