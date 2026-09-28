import { Suspense } from "react";
import type { Metadata } from "next";
import { canonicalAlternates } from "@/lib/seo/canonical";
import MesasClient from "./MesasClient";

export const metadata: Metadata = {
  title: "Mesas de inglés: elige nivel y juega",
  description:
    "Elige A1, A2, B1, B2 o C1 y responde ocho ejercicios de gramática, vocabulario, phrasal verbs, false friends y fonética. La mesa cierra con el ranking.",
  alternates: canonicalAlternates("/mesas"),
};

export default function MesasPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#161326]" />}>
      <MesasClient />
    </Suspense>
  );
}
