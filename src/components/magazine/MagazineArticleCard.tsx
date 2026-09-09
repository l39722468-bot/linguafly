import Image from "next/image";
import Link from "next/link";
import { getPublicCategoryLabel } from "@/lib/site-catalog";
import { getArticlePath } from "@/lib/blog-paths";
import { getArticleOgImagePath } from "@/lib/seo/og-images";
import type { BlogPost } from "@/lib/blog";

export function MagazineArticleCard({ article }: { article: BlogPost }) {
  const label = getPublicCategoryLabel(article.category);
  const image = getArticleOgImagePath(article);

  return (
    <Link
      href={getArticlePath(article)}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={image}
          alt={article.alt || article.title}
          fill
          quality={70}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
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
      </div>
    </Link>
  );
}
