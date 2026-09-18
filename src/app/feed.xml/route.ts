import { getAbsoluteUrl, getSiteUrl, SITE_BRAND_NAME } from "@/lib/site-brand";
import { getArticlePath } from "@/lib/blog-paths";
import {
  escapeXml,
  listPublisherHomeArticles,
} from "@/lib/content/publisher-home";
import { SITE_DESCRIPTION } from "@/lib/site-catalog";

export const dynamic = "force-dynamic";

export async function GET() {
  const siteUrl = getSiteUrl();
  const { articles } = await listPublisherHomeArticles(40);
  const items = articles
    .map((article) => {
      const url = getAbsoluteUrl(getArticlePath(article));
      const title = escapeXml(article.title);
      const description = escapeXml(article.excerpt || article.description || "");
      const pubDate = new Date(article.date).toUTCString();
      return `    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_BRAND_NAME)}</title>
    <link>${siteUrl}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>es</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=600, s-maxage=600",
    },
  });
}
