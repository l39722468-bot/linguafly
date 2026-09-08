import type { Metadata } from "next";
import { VerticalHub } from "@/components/magazine/VerticalHub";
import { getVertical } from "@/lib/site-catalog";
import { SITE_BRAND_NAME, getAbsoluteUrl } from "@/lib/site-brand";
import { parsePageParam } from "@/lib/content/pagination";

export const dynamic = "force-dynamic";

const vertical = getVertical("alimentacion")!;

export const metadata: Metadata = {
  title: `Alimentación: comidas reales y hábitos sostenibles | ${SITE_BRAND_NAME}`,
  description: vertical.description,
  alternates: { canonical: getAbsoluteUrl(vertical.href) },
};

export default async function AlimentacionPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  return <VerticalHub vertical={vertical} page={parsePageParam(page)} />;
}
