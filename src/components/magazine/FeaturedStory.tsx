import Image from "next/image";
import Link from "next/link";
import { getArticlePath } from "@/lib/blog-paths";
import { formatShortEsDate } from "@/lib/content/publisher-home";
import { getPublicCategoryLabel } from "@/lib/site-catalog";
import { getArticleOgImagePath, OG_IMAGE_ASPECT_CLASS } from "@/lib/seo/og-images";
import type { BlogPost } from "@/lib/blog";

export function FeaturedStory({ article }: { article: BlogPost }) {
  const label = getPublicCategoryLabel(article.category);
  const image = getArticleOgImagePath(article);
  const date = formatShortEsDate(article.date);

  return (
    <Link
      href={getArticlePath(article)}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className={`relative ${OG_IMAGE_ASPECT_CLASS} w-full overflow-hidden`}>
        <Image
          src={image}
          alt={article.alt || article.title}
          fill
          priority
          quality={75}
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
          <span className={label.tone.text}>
            {label.icon} {label.name}
          </span>
          {date ? <span> · {date}</span> : null}
          {article.readTime ? <span> · {article.readTime}</span> : null}
        </p>
        <h2 className="font-display mb-3 text-3xl font-black leading-tight text-slate-900 group-hover:text-coral-700 sm:text-4xl">
          {article.title}
        </h2>
        {article.excerpt ? (
          <p className="text-sm leading-relaxed text-slate-600 line-clamp-3 sm:text-base">
            {article.excerpt}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
