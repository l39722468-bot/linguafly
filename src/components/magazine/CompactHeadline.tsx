import Image from "next/image";
import Link from "next/link";
import { getArticlePath } from "@/lib/blog-paths";
import { formatShortEsDate } from "@/lib/content/publisher-home";
import { getPublicCategoryLabel } from "@/lib/site-catalog";
import { getArticleOgImagePath } from "@/lib/seo/og-images";
import type { BlogPost } from "@/lib/blog";

export function CompactHeadline({ article }: { article: BlogPost }) {
  const label = getPublicCategoryLabel(article.category);
  const image = getArticleOgImagePath(article);
  const date = formatShortEsDate(article.date);

  return (
    <Link
      href={getArticlePath(article)}
      className="group flex gap-3 border-b border-slate-100 py-3 last:border-b-0"
    >
      <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100">
        <Image
          src={image}
          alt={article.alt || article.title}
          fill
          quality={60}
          sizes="96px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="mb-1 text-[11px] font-black uppercase tracking-wider text-slate-400">
          <span className={label.tone.text}>{label.name}</span>
          {date ? <span> · {date}</span> : null}
        </p>
        <h3 className="line-clamp-2 text-sm font-black leading-snug text-slate-900 group-hover:text-coral-700">
          {article.title}
        </h3>
      </div>
    </Link>
  );
}
