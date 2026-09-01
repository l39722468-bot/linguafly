import Link from "next/link";
import { HOME_PATHS, type SiteHomeLocale } from "@/lib/site-locales";

const OPTIONS = [
  {
    locale: "es" as const,
    href: HOME_PATHS.es,
    hrefLang: "es",
    flag: "🇪🇸",
    title: "Español",
    subtitle: "Aprender inglés",
  },
  {
    locale: "en" as const,
    href: HOME_PATHS.en,
    hrefLang: "en",
    flag: "🇬🇧",
    title: "English",
    subtitle: "Learn Spanish",
  },
] as const;

export function HomePageSwitcher({ locale }: { locale: SiteHomeLocale }) {
  const isEn = locale === "en";

  return (
    <div className="flex justify-center mb-10">
      <nav
        className="w-full max-w-xl rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-lg sm:p-5"
        aria-label={isEn ? "Switch home" : "Cambiar de home"}
      >
        <p className="mb-3 text-center text-xs font-black uppercase tracking-wider text-slate-500">
          {isEn ? "Switch home" : "Cambiar de home"}
          <span className="mx-1.5 text-slate-300">·</span>
          {isEn ? "Cambiar de home" : "Switch home"}
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {OPTIONS.map((option) => {
            const selected = option.locale === locale;
            return (
              <Link
                key={option.locale}
                href={option.href}
                hrefLang={option.hrefLang}
                aria-current={selected ? "page" : undefined}
                className={
                  selected
                    ? "flex items-center gap-3 rounded-xl border-2 border-[#FF6B6B] bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] px-4 py-3 text-white shadow-md"
                    : "flex items-center gap-3 rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 hover:border-teal-400 hover:bg-teal-50 transition-colors"
                }
              >
                <span className="text-2xl" aria-hidden>
                  {option.flag}
                </span>
                <span className="text-left leading-tight">
                  <span className="block text-base font-black">{option.title}</span>
                  <span className={`block text-sm font-semibold ${selected ? "text-white/90" : "text-slate-600"}`}>
                    {option.subtitle}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
