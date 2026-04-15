import type { Metadata } from "next";
import "./globals.css";
import { OrganizationSchema, WebsiteSchema } from "./schema";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Cookiebot from "@/components/Cookiebot";
import { Analytics } from "@vercel/analytics/next";
import { Nunito, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

// Fuentes mínimas: 3 pesos total para LCP <2.5s
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-nunito",
  display: "swap",
  preload: true,
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-jakarta",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.focus-on-english.com'),
  title: {
    default: "Cursos de Inglés Online en España | Certificados Oficiales | Focus English",
    template: "%s | Focus English"
  },
  description: "Cursos de inglés online en España con certificación oficial. Preparación Cambridge, TOEFL, IELTS. Desde €6.99/mes. +2,500 estudiantes certificados. Prueba gratis 7 días.",
  keywords: [
    "cursos de inglés online España",
    "aprender inglés online España",
    "clases de inglés España", 
    "curso de inglés certificado España",
    "preparación Cambridge B2 España",
    "preparación TOEFL España",
    "preparación IELTS España",
    "inglés para trabajar España",
    "inglés profesional España",
    "inglés de negocios España",
    "curso inglés online España",
    "inglés empresarial España",
    "academias de inglés online España",
    "mejor curso inglés online España",
  ],
  authors: [{ name: "Focus English", url: "https://www.focus-on-english.com" }],
  creator: "Focus English",
  publisher: "Focus English",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Cursos de Inglés Online en España | Certificados Oficiales",
    description: "La mejor academia de inglés online en España. +2,500 estudiantes certificados. Desde €6.99/mes. Preparación Cambridge, TOEFL, IELTS. Prueba gratis.",
    type: "website",
    locale: "es_ES",
    siteName: "Focus English",
    url: "https://www.focus-on-english.com",
    images: [
      {
        url: 'https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Focus English - Aprende inglés para el mundo real',
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cursos de Inglés Online en España | Certificados Oficiales",
    description: "✓ Academia online en España ✓ Desde €6.99/mes ✓ Certificación oficial ✓ +2,500 estudiantes",
    images: ['https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop'],
    site: "@focus_english",
    creator: "@focus_english",
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
    <html lang="es" className={`scroll-smooth ${nunito.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        {/* Preconnect críticos: imágenes, Supabase (auth), Cookiebot */}
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
        <link rel="preconnect" href="https://nprqtjljoekoirlrjxlh.supabase.co" />
        <link rel="dns-prefetch" href="https://nprqtjljoekoirlrjxlh.supabase.co" />
        <link rel="preconnect" href="https://consent.cookiebot.com" />
        <link rel="dns-prefetch" href="https://consent.cookiebot.com" />
        {/* Schema.org structured data */}
        <OrganizationSchema />
        <WebsiteSchema />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1198438843650445"
          crossOrigin="anonymous"
        />
        
        {/* Anti-piracy protection */}
        <meta name="robots" content="max-image-preview:large" />
        

      </head>
      <body className="antialiased bg-white text-slate-900 font-sans dark:bg-slate-950 dark:text-slate-50" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          {/* Scripts deferidos: no bloquean first paint */}
          <Cookiebot />
          <GoogleAnalytics />
          <Analytics />
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
            © 2026 Focus English
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
