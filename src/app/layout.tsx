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
import { SITE_DESCRIPTION, SITE_TAGLINE } from "@/lib/site-catalog";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_TAGLINE.replace(/\.$/, "")} | ${SITE_BRAND_NAME}`,
    template: "%s"
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "idiomas",
    "alimentación",
    "entrenamiento",
    "artículos",
    "guías prácticas",
    SITE_BRAND_NAME,
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
    title: `${SITE_TAGLINE.replace(/\.$/, "")} | ${SITE_BRAND_NAME}`,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "es_ES",
    siteName: SITE_BRAND_NAME,
    url: siteUrl,
    images: [
      {
        url: 'https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: `${SITE_BRAND_NAME} - Idiomas, alimentación y entrenamiento`,
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_TAGLINE.replace(/\.$/, "")} | ${SITE_BRAND_NAME}`,
    description: SITE_DESCRIPTION,
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
        <ConsentGatedAdSense />
        <DeferredMonetagAd />
        {children}
        {/* Scripts deferidos: no bloquean first paint */}
        <GoogleAnalytics />
        <MatomoAnalytics />
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
