/**
 * Cloudflare/OpenNext article-only build stub for BlogExerciseMapBanner.
 *
 * The real component (see BlogExerciseMapBanner.tsx) links articles to
 * course units via `@/lib/blog-course-map`, which pulls in the generated
 * blog↔course relation map (`src/generated/blog-course-relations.json`)
 * and the `/blog/ejercicios-relacionados` page. That page is excluded from
 * the Cloudflare Worker build (article-only deployment — see
 * scripts/cf-build.mjs and README.CLOUDFLARE.md), so this stub renders
 * nothing instead of linking to a route that doesn't exist there.
 */
interface BlogExerciseMapBannerProps {
  articleSlug: string;
  articleTitle: string;
}

export function BlogExerciseMapBanner(_props: BlogExerciseMapBannerProps) {
  return null;
}
