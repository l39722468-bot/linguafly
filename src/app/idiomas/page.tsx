import type { Metadata } from "next";
import { IdiomasHub } from "@/components/magazine/IdiomasHub";
import { getVertical } from "@/lib/site-catalog";
import { SITE_BRAND_NAME, getAbsoluteUrl } from "@/lib/site-brand";
import { llmMarkdownAlternates } from "@/lib/seo/canonical";
import { getCategoryOgImagePath, ogImageMeta } from "@/lib/seo/og-images";

export const dynamic = "force-dynamic";

const vertical = getVertical("idiomas")!;
const title = `Idiomas: inglés por temática y nivel A1–C1 | ${SITE_BRAND_NAME}`;
const og = ogImageMeta(title, getCategoryOgImagePath(vertical.slug));

export const metadata: Metadata = {
  title,
  description: vertical.description,
  keywords: [
    "aprender inglés",
    "inglés A1",
    "inglés A2",
    "inglés B1",
    "inglés B2",
    "inglés C1",
    "gramática inglesa",
    "inglés para viajar",
    "inglés para trabajar",
    SITE_BRAND_NAME,
  ],
  alternates: llmMarkdownAlternates(vertical.href),
  openGraph: {
    title,
    description: vertical.description,
    type: "website",
    locale: "es_ES",
    url: getAbsoluteUrl(vertical.href),
    siteName: SITE_BRAND_NAME,
    images: og.images,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: vertical.description,
    images: og.twitterImages,
  },
};

export default async function IdiomasPage() {
  return <IdiomasHub vertical={vertical} />;
}
