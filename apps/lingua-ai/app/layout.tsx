import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LinguaFly AI",
  description: "Entrenador personal de inglés.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-stone-50 font-sans text-stone-900 antialiased">
        {children}
      </body>
    </html>
  );
}
