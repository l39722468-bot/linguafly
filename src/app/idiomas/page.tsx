import type { Metadata } from "next";
import { VerticalHub } from "@/components/magazine/VerticalHub";
import { getVertical } from "@/lib/site-catalog";
import { SITE_BRAND_NAME, getAbsoluteUrl } from "@/lib/site-brand";
import { llmMarkdownAlternates } from "@/lib/seo/canonical";
import { parsePageParam } from "@/lib/content/pagination";
import { getCategoryOgImagePath, ogImageMeta } from "@/lib/seo/og-images";

export const dynamic = "force-dynamic";

const vertical = getVertical("idiomas")!;
const title = `Idiomas: guías para aprender de verdad | ${SITE_BRAND_NAME}`;
const og = ogImageMeta(title, getCategoryOgImagePath(vertical.slug));

export const metadata: Metadata = {
  title,
  description: vertical.description,
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

export default async function IdiomasPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  return <VerticalHub vertical={vertical} page={parsePageParam(page)} />;
}
