import { Navigation } from "@/components/sections/Navigation";
import CookieDeclaration from "@/components/CookieDeclaration";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Información sobre las cookies utilizadas en Linguafly, incluidas las de Google Analytics y Matomo.",
  robots: "index, follow",
};

export default function CookiesPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-black mb-4">Política de Cookies</h1>
          <p className="text-slate-600 mb-8 text-sm">
            Última actualización: 15 de agosto de 2026
          </p>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 border-l-4 border-peach-500 pl-4 py-2 bg-slate-50 rounded-r">
              Utilizamos cookies propias y de terceros para medir el uso del sitio,
              recordar sus preferencias y mejorar la experiencia. Las cookies de
              Google Analytics y Matomo solo se activan cuando acepta la categoría de
              estadísticas en el gestor de consentimiento.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">1. Qué usamos</h2>
            <p className="mb-4">
              En Linguafly utilizamos Cookiebot para gestionar el consentimiento,
              Google Analytics 4 y Matomo Cloud para obtener métricas agregadas de
              navegación, como páginas vistas, interacción general y rendimiento del
              contenido.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              2. Cookies de analítica (Google Analytics y Matomo)
            </h2>
            <p className="mb-4">
              Estas cookies se clasifican como <strong>estadísticas</strong> y nos
              ayudan a entender el uso del sitio sin identificarle directamente.
              Google Analytics normalmente incluye identificadores como <code>_ga</code>,
              <code>_ga_*</code> y otras variantes equivalentes. Matomo Cloud
              (linguaflyapp.matomo.cloud) puede crear cookies como <code>_pk_id</code>,
              <code>_pk_ses</code> y variantes equivalentes para distinguir sesiones
              y visitantes.
            </p>
            <p className="mb-4">
              La configuración actual aplica anonimización de IP en Google Analytics
              y las cookies de analítica no se cargan hasta que exista consentimiento
              para estadísticas.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              3. Declaración actualizada de cookies
            </h2>
            <p className="mb-6">
              La siguiente declaración se genera mediante Cookiebot y refleja las
              cookies detectadas en el sitio, incluidas las de Google Analytics y
              Matomo cuando están presentes:
            </p>

            <CookieDeclaration />

            <h2 className="text-2xl font-bold mt-10 mb-4">
              4. Cómo cambiar el consentimiento
            </h2>
            <p className="mb-4">
              Puede aceptar, rechazar o modificar sus preferencias desde el banner
              de cookies o reabrir el gestor de consentimiento cuando vuelva a
              mostrarse en el sitio.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
