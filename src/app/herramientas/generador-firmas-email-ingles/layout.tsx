import { Metadata } from "next";
import { SITE_BRAND_NAME } from "@/lib/site-brand";

export const metadata: Metadata = {
  title: `Generador de firmas de email en inglés gratis | ${SITE_BRAND_NAME}`,
  description: "Crea tu firma profesional para Gmail u Outlook en inglés. Elige la despedida (Kind regards, Best) y el cargo correcto para impresionar a reclutadores.",
  keywords: ["generador firmas email ingles", "email signature generator english", "firmas correo profesional ingles", "kind regards o best regards"],
  alternates: {
    canonical: 'https://linguafly.app/herramientas/generador-firmas-email-ingles',
  },
};

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Generador de Firmas de Email en Inglés",
            "operatingSystem": "Web",
            "applicationCategory": "BusinessApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "EUR"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "120"
            }
          })
        }}
      />
      {children}
    </>
  );
}
