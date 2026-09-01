"use client";

import { useEffect } from "react";

/** Root layout is Spanish (`html lang="es"`). Set English on the parallel home. */
export function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = previous || "es";
    };
  }, [lang]);
  return null;
}
