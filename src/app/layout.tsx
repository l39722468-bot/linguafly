import type { Metadata } from "next";
import "./globals.css";
import { OrganizationSchema, WebsiteSchema } from "./schema";
import GoogleHeadScripts from "@/components/GoogleHeadScripts";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import MatomoAnalytics from "@/components/MatomoAnalytics";
import IubendaConsent from "@/components/IubendaConsent";
import DeferredMonetagAd from "@/components/DeferredMonetagAd";
import ConsentGatedAdSense from "@/components/ConsentGatedAdSense";
import { SITE_BRAND_NAME, getSiteUrl } from "@/lib/site-brand";

const siteUrl = getSiteUrl();

// True only while `scripts/cf-build.mjs` runs the pruned Cloudflare Worker
// build (see CF_BUILD there). Never set for `next build` (Vercel) or local
// dev, so the full app keeps ads/analytics scripts everywhere else.
const isCloudflareWorkerBuild = process.env.CF_BUILD === "true";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `Blog para Aprender Inglés | ${SITE_BRAND_NAME}`,
    template: "%s"
  },
  description: "Blog de contenido de calidad para aprender inglés: consultas de gramática, vocabulario, frases, habilidades y métodos de estudio.",
  keywords: [
    "blog de inglés",
    "consultas de inglés",
    "aprender inglés",
    "aprender inglés gratis",
    "aprender inglés pdf",
    "curso inglés",
    "curso de inglés gratis",
    "gramática inglesa",
    "inglés gratis",
    "inglés pdf",
    "vocabulario inglés",
    "frases en inglés",
    "métodos para estudiar inglés",
  ],
  authors: [{ name: SITE_BRAND_NAME, url: siteUrl }],
  creator: SITE_BRAND_NAME,
  publisher: SITE_BRAND_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: `Blog para Aprender Inglés | ${SITE_BRAND_NAME}`,
    description: "Guías de gramática, vocabulario y frases en inglés para resolver dudas y aprender de forma práctica.",
    type: "website",
    locale: "es_ES",
    siteName: SITE_BRAND_NAME,
    url: siteUrl,
    images: [
      {
        url: 'https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: `${SITE_BRAND_NAME} - Aprende inglés para el mundo real`,
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog para Aprender Inglés | ${SITE_BRAND_NAME}`,
    description: "Consultas de inglés resueltas con guías claras: gramática, vocabulario, frases y métodos de estudio.",
    images: ['https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop'],
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
        {/* Microsoft Clarity tracking code for linguafly.app */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ybyy7k072w");`,
          }}
        />
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
        {!isCloudflareWorkerBuild && <ConsentGatedAdSense />}
        {!isCloudflareWorkerBuild && <DeferredMonetagAd />}
        {children}
        {/* Scripts deferidos: no bloquean first paint */}
        {!isCloudflareWorkerBuild && <GoogleAnalytics />}
        {!isCloudflareWorkerBuild && <MatomoAnalytics />}
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
