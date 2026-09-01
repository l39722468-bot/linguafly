"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HOME_PATHS, localeFromPathname } from "@/lib/site-locales";

export function HomeLanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);

  const base =
    "inline-flex items-center rounded-full border border-[#FFD9C2] bg-[#FFF4ED] p-0.5 text-xs font-black";
  const idle = "px-2.5 py-1 rounded-full text-gray-600 hover:text-[#FF6B6B] transition-colors";
  const active = "px-2.5 py-1 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white";

  return (
    <nav
      className={compact ? base : `${base} shrink-0`}
      aria-label="Language / Idioma"
    >
      <Link
        href={HOME_PATHS.es}
        hrefLang="es"
        className={locale === "es" ? active : idle}
        aria-current={locale === "es" ? "page" : undefined}
        title="Home in Spanish — learn English"
      >
        ES
      </Link>
      <Link
        href={HOME_PATHS.en}
        hrefLang="en"
        className={locale === "en" ? active : idle}
        aria-current={locale === "en" ? "page" : undefined}
        title="Home in English — learn Spanish"
      >
        EN
      </Link>
    </nav>
  );
}
