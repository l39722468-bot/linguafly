import type { Metadata } from "next";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { IdiomasHub } from "@/components/magazine/IdiomasHub";
import { JsonLd } from "@/components/seo/JsonLd";
import { getVertical } from "@/lib/site-catalog";
import { SITE_BRAND_NAME, getAbsoluteUrl, getSiteUrl } from "@/lib/site-brand";
import { llmMarkdownAlternates } from "@/lib/seo/canonical";
import { getCategoryOgImagePath, ogImageMeta } from "@/lib/seo/og-images";
import {
  IDIOMAS_PRESENTACION_DESCRIPTION,
  IDIOMAS_PRESENTACION_MARKDOWN,
  IDIOMAS_PRESENTACION_SEO_TITLE,
  IDIOMAS_PRESENTACION_TITLE,
  IDIOMAS_PRESENTACION_UPDATED,
} from "@/lib/content/idiomas-presentacion";

export const dynamic = "force-dynamic";

const vertical = getVertical("idiomas")!;
const title = IDIOMAS_PRESENTACION_SEO_TITLE;
const description = IDIOMAS_PRESENTACION_DESCRIPTION;
const og = ogImageMeta(title, getCategoryOgImagePath(vertical.slug));

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "qué es Linguafly",
    "aprender inglés gratis",
    "curso de inglés gratis",
    "cursos de inglés A1 a C2",
    "gramática inglesa",
    "inglés para viajar",
    "inglés para trabajar",
    "exámenes oficiales de inglés",
    SITE_BRAND_NAME,
  ],
  alternates: llmMarkdownAlternates(vertical.href),
  openGraph: {
    title,
    description,
    type: "article",
    locale: "es_ES",
    url: getAbsoluteUrl(vertical.href),
    siteName: SITE_BRAND_NAME,
    images: og.images,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: og.twitterImages,
  },
};

function PresentacionArticle() {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-coral-600">
        {SITE_BRAND_NAME} · Qué ofrecemos
      </p>
      <h1 className="font-display mb-8 text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
        {IDIOMAS_PRESENTACION_TITLE}
      </h1>
      <div className="prose prose-lg prose-slate max-w-none prose-headings:font-display prose-headings:font-black prose-a:font-semibold prose-a:text-coral-700 hover:prose-a:text-coral-800">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ href, children }) =>
              href && href.startsWith("/") ? (
                <Link href={href}>{children}</Link>
              ) : (
                <a href={href}>{children}</a>
              ),
          }}
        >
          {IDIOMAS_PRESENTACION_MARKDOWN}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default async function IdiomasPage() {
  const url = getAbsoluteUrl(vertical.href);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: IDIOMAS_PRESENTACION_TITLE,
    description,
    url,
    mainEntityOfPage: url,
    inLanguage: "es-ES",
    dateModified: IDIOMAS_PRESENTACION_UPDATED,
    image: getAbsoluteUrl(getCategoryOgImagePath(vertical.slug)),
    author: { "@type": "Organization", name: SITE_BRAND_NAME, url: getSiteUrl() },
    publisher: { "@type": "Organization", name: SITE_BRAND_NAME, url: getSiteUrl() },
  };
  return (
    <>
      <JsonLd data={articleSchema} />
      <IdiomasHub vertical={vertical} article={<PresentacionArticle />} />
    </>
  );
}
