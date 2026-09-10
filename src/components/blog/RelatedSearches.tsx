import Link from "next/link";
import { getCanonicalTopicPath, getArticlePath } from "@/lib/blog-paths";
import { visibleSearchPhrases } from "@/lib/seo/search-queries";

export function RelatedSearches({
  title,
  keywords,
  category,
  slug,
}: {
  title: string;
  keywords?: string[];
  category: string;
  slug: string;
}) {
  const queries = visibleSearchPhrases({ title, keywords }, 24);
  if (queries.length === 0) return null;

  const currentPath = getArticlePath({ category, slug });

  return (
    <section aria-labelledby="consultas-relacionadas" className="mb-8">
      <h2
        id="consultas-relacionadas"
        className="mb-4 text-sm font-black uppercase tracking-widest text-slate-500"
      >
        Consultas relacionadas
      </h2>
      <ul className="flex flex-wrap gap-2">
        {queries.map((query) => {
          const href = getCanonicalTopicPath(query, category);
          const isCurrent = href === currentPath;
          const className =
            "px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:border-coral-300 hover:text-coral-600 transition-all hover:shadow-sm";
          return (
            <li key={query.toLowerCase()}>
              {isCurrent ? (
                <span className={className}>{query}</span>
              ) : (
                <Link href={href} className={className}>
                  {query}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
