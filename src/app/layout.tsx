import type { Metadata } from "next";
import "./globals.css";
import { OrganizationSchema, WebsiteSchema } from "./schema";
import GoogleHeadScripts from "@/components/GoogleHeadScripts";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import IubendaConsent from "@/components/IubendaConsent";
import DeferredMonetagAd from "@/components/DeferredMonetagAd";
import ConsentGatedAdSense from "@/components/ConsentGatedAdSense";
import { getSiteUrl, SITE_BRAND_NAME, getAbsoluteUrl } from "@/lib/site-brand";
import { DEFAULT_OG_IMAGE_PATH, ogImageMeta } from "@/lib/seo/og-images";
import { languageAlternates } from "@/lib/seo/canonical";

const siteUrl = getSiteUrl();
const siteOg = ogImageMeta(
  `${SITE_BRAND_NAME} — aprende inglés`,
  DEFAULT_OG_IMAGE_PATH,
);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // Sin title/description del home por defecto: si una URL no define los suyos
  // no debe heredar los de la portada (evita canibalización y duplicados).
  title: {
    default: SITE_BRAND_NAME,
    template: "%s"
  },
  authors: [{ name: SITE_BRAND_NAME, url: siteUrl }],
  creator: SITE_BRAND_NAME,
  publisher: SITE_BRAND_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: SITE_BRAND_NAME,
    url: siteUrl,
    images: siteOg.images,
  },
  twitter: {
    card: "summary_large_image",
    images: siteOg.twitterImages,
  },
  alternates: {
    languages: languageAlternates(siteUrl),
    types: {
      "application/rss+xml": getAbsoluteUrl("/feed.xml"),
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* iubenda debe ejecutarse antes de las etiquetas que autobloquea. */}
        <IubendaConsent />
        {/* Snippet nativo en HTML (no next/script / __next_s). */}
        <GoogleHeadScripts />
        <link rel="describedby" href={getAbsoluteUrl("/llms.txt")} />
        {/* Preconnect críticos: imágenes, fonts, iubenda, gtag */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&family=Plus+Jakarta+Sans:wght@700&display=swap"
        />
        <link rel="preconnect" href="https://cs.iubenda.com" />
        <link rel="dns-prefetch" href="https://cs.iubenda.com" />
        <link rel="preconnect" href="https://cdn.iubenda.com" />
        <link rel="dns-prefetch" href="https://cdn.iubenda.com" />
        <link rel="dns-prefetch" href="https://quge5.com" />
        {/* Schema.org structured data */}
        <OrganizationSchema />
        <WebsiteSchema />

        {/* Anti-piracy protection */}
        <meta name="robots" content="max-image-preview:large" />

      </head>
      <body className="antialiased bg-white text-slate-900 font-sans" suppressHydrationWarning>
        <ConsentGatedAdSense />
        <DeferredMonetagAd />
        {children}
        {/* Scripts deferidos: no bloquean first paint */}
        <GoogleAnalytics />
        {/*
         * JSON-LD deduplication: OpenNext/Cloudflare + force-dynamic pages
         * can emit Server Component <script> tags twice (initial HTML + RSC
         * payload). This inline script removes duplicate JSON-LD blocks by
         * their data-jsonld-id attribute before crawlers see them.
         */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=document.querySelectorAll('script[type="application/ld+json"][data-jsonld-id]');var seen=Object.create(null);for(var i=0;i<s.length;i++){var id=s[i].getAttribute('data-jsonld-id');if(seen[id]){s[i].parentNode.removeChild(s[i]);}else{seen[id]=true;}}})();`,
          }}
        />
        {/* Copyright watermark - contraste 4.5:1 (WCAG AA) */}
        <div
          style={{
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            fontSize: '10px',
            color: 'rgba(0,0,0,0.55)',
            pointerEvents: 'none',
            zIndex: 9999,
            userSelect: 'none'
          }}
          aria-hidden="true"
        >
          © 2026 Linguafly
        </div>
      </body>
    </html>
  );
}
