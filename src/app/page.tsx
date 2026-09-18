import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { PublisherHome } from "@/components/magazine/PublisherHome";
import type { Metadata } from "next";
import { listPublisherHomeArticles } from "@/lib/content/publisher-home";
import { HOME_ARTICLE_LIMIT } from "@/lib/content/pagination";
import { SITE_BRAND_NAME, getAbsoluteUrl } from "@/lib/site-brand";
import { SITE_DESCRIPTION, SITE_SERP_TITLE } from "@/lib/site-catalog";
import { llmMarkdownAlternates } from "@/lib/seo/canonical";

export const dynamic = "force-dynamic";

const homeAlternates = llmMarkdownAlternates("/");

export const metadata: Metadata = {
  title: SITE_SERP_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "artículos de idiomas",
    "alimentación",
    "entrenamiento",
    "inteligencia artificial",
    "aprender inglés",
    SITE_BRAND_NAME,
  ],
  alternates: {
    ...homeAlternates,
    types: {
      ...homeAlternates.types,
      "application/rss+xml": getAbsoluteUrl("/feed.xml"),
    },
  },
};

export default async function HomePage() {
  const { articles, total } = await listPublisherHomeArticles(HOME_ARTICLE_LIMIT);

  return (
    <>
      <Navigation />
      <PublisherHome articles={articles} total={total} />
      <Footer />
    </>
  );
}
