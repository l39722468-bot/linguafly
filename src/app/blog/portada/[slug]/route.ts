import { getPublishedArticle } from "@/lib/content/articles";
import { renderArticleCoverSvg } from "@/lib/seo/article-cover";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  if (!/^[a-z0-9-]+$/i.test(slug)) {
    return new Response("Not found", { status: 404 });
  }

  let title = slug.replace(/-/g, " ");
  let category: string | undefined;
  try {
    const article = await getPublishedArticle(slug);
    if (article) {
      title = article.title;
      category = article.category;
    }
  } catch {
    // The pattern still depends on the slug, so the cover stays unique.
  }

  return new Response(renderArticleCoverSvg({ slug, title, category }), {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
      "X-Robots-Tag": "noindex",
    },
  });
}
