import type { Metadata } from "next";
import { VerticalHub } from "@/components/magazine/VerticalHub";
import { getVertical } from "@/lib/site-catalog";
import { SITE_BRAND_NAME } from "@/lib/site-brand";
import { getAbsoluteUrl } from "@/lib/site-brand";

const vertical = getVertical("idiomas")!;

export const metadata: Metadata = {
  title: `Idiomas: guías para aprender de verdad | ${SITE_BRAND_NAME}`,
  description: vertical.description,
  alternates: { canonical: getAbsoluteUrl(vertical.href) },
};

export default function IdiomasPage() {
  return <VerticalHub vertical={vertical} />;
}
