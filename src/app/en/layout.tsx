import type { Metadata } from "next";
import { SITE_BRAND_NAME, getAbsoluteUrl } from "@/lib/site-brand";
import { HtmlLang } from "@/components/seo/HtmlLang";

export const metadata: Metadata = {
  title: `Learn Spanish A1–C2: Free Course for English Speakers | ${SITE_BRAND_NAME}`,
  description:
    "A complete Spanish course for English-speaking adults. A1 is live: theory guides and answered workbooks, aligned with DELE / Instituto Cervantes PCIC.",
  keywords: [
    "learn Spanish",
    "Spanish A1 course",
    "Spanish for English speakers",
    "free Spanish course",
    "DELE A1",
  ],
  openGraph: {
    title: `Learn Spanish A1–C2 | ${SITE_BRAND_NAME}`,
    description:
      "Spanish course for English speakers. Start A1: greetings, names, and soy / eres.",
    locale: "en_US",
    type: "website",
    url: getAbsoluteUrl("/en"),
  },
  alternates: {
    canonical: getAbsoluteUrl("/en"),
    languages: {
      en: getAbsoluteUrl("/en"),
      es: getAbsoluteUrl("/"),
      "x-default": getAbsoluteUrl("/"),
    },
  },
};

export default function EnglishHomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <HtmlLang lang="en" />
      {children}
    </>
  );
}
