import Image from "next/image";
import Link from "next/link";
import { getArticlePath } from "@/lib/blog-paths";
import { formatShortEsDate } from "@/lib/content/publisher-home";
import { getPublicCategoryLabel } from "@/lib/site-catalog";
import { getArticleOgImagePath } from "@/lib/seo/og-images";
import type { BlogPost } from "@/lib/blog";

export function FeaturedStory({ article }: { article: BlogPost }) {
  const label = getPublicCategoryLabel(article.category);
  const image = getArticleOgImagePath(article);
  const date = formatShortEsDate(article.date);

  return (
    <Link
      href={getArticlePath(article)}
      className="group relative flex min-h-[320px] overflow-hidden rounded-3xl bg-slate-900 sm:min-h-[420px]"
    >
      <Image
        src={image}
        alt={article.alt || article.title}
        fill
        priority
        quality={75}
        sizes="(max-width: 1024px) 100vw, 66vw"
        className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
      <div className="relative mt-auto p-6 sm:p-8">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-white/80">
          {label.icon} {label.name}
          {date ? ` · ${date}` : ""}
          {article.readTime ? ` · ${article.readTime}` : ""}
        </p>
        <h2 className="font-display mb-3 max-w-3xl text-3xl font-black leading-tight text-white sm:text-5xl">
          {article.title}
        </h2>
        {article.excerpt ? (
          <p className="max-w-2xl text-sm leading-relaxed text-white/80 line-clamp-2 sm:text-base">
            {article.excerpt}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
