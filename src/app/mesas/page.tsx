import { Suspense } from "react";
import type { Metadata } from "next";
import { canonicalAlternates } from "@/lib/seo/canonical";
import MesasClient from "./MesasClient";

export const metadata: Metadata = {
  title: "Mesas de inglés: elige nivel y juega",
  description:
    "Siéntate en una mesa, elige A1, A2, B1, B2 o C1 y resuelve un ejercicio. La partida tiene una actividad por persona y cierra con el ranking.",
  alternates: canonicalAlternates("/mesas"),
};

export default function MesasPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#161326]" />}>
      <MesasClient />
    </Suspense>
  );
}
