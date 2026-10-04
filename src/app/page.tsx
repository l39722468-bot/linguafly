import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { PublisherHome } from "@/components/magazine/PublisherHome";
import type { Metadata } from "next";
import { listPublisherHomeArticles } from "@/lib/content/publisher-home";
import { HOME_ARTICLE_LIMIT } from "@/lib/content/pagination";
import { SITE_BRAND_NAME, getAbsoluteUrl, getSiteUrl } from "@/lib/site-brand";
import { DEFAULT_OG_IMAGE_PATH, ogImageMeta } from "@/lib/seo/og-images";
import { SITE_DESCRIPTION, SITE_SERP_TITLE } from "@/lib/site-catalog";
import { llmMarkdownAlternates } from "@/lib/seo/canonical";

export const dynamic = "force-dynamic";

const homeAlternates = llmMarkdownAlternates("/");
const homeOg = ogImageMeta(`${SITE_BRAND_NAME} — aprende inglés`, DEFAULT_OG_IMAGE_PATH);

export const metadata: Metadata = {
  title: SITE_SERP_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "aprender inglés",
    "cursos de inglés gratis",
    "gramática inglesa",
    "inglés para viajar",
    "inglés para trabajar",
    "exámenes oficiales de inglés",
    SITE_BRAND_NAME,
  ],
  openGraph: {
    title: SITE_SERP_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "es_ES",
    siteName: SITE_BRAND_NAME,
    url: getSiteUrl(),
    images: homeOg.images,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_SERP_TITLE,
    description: SITE_DESCRIPTION,
    images: homeOg.twitterImages,
  },
  alternates: {
    ...homeAlternates,
    types: {
      ...homeAlternates.types,
      "application/rss+xml": getAbsoluteUrl("/feed.xml"),
    },
  },
};

export default async function HomePage() {
  const { articles } = await listPublisherHomeArticles(HOME_ARTICLE_LIMIT);

  return (
    <>
      <Navigation />
      <PublisherHome articles={articles} />
      <Footer />
    </>
  );
}
