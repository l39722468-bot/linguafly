import { Navigation } from "@/components/sections/Navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad y protección de datos personales de Focus English (RGPD).",
  robots: "index, follow",
};

export default function PrivacidadPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-black mb-4">Política de Privacidad</h1>
          <p className="text-slate-600 mb-8 text-sm">
            Última actualización: 6 de abril de 2026
          </p>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 border-l-4 border-peach-500 pl-4 py-2 bg-slate-50 rounded-r">
              Focus English se publica en <strong>fase de validación</strong>: aún no
              existe sociedad mercantil constituida. El responsable del tratamiento es la{" "}
              <strong>persona física</strong> que gestiona el proyecto (en adelante,
              &quot;nosotros&quot; o &quot;el responsable&quot;), identificable y
              contactable en{" "}
              <a href="mailto:soporte@focus-on-english.com" className="text-peach-600 font-medium">
                soporte@focus-on-english.com
              </a>
              . Cuando se constituya una entidad jurídica, actualizaremos esta sección.
              Para el ejercicio de derechos RGPD, use el mismo correo; si la normativa
              exige datos adicionales del responsable, se facilitarán en la respuesta.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              1. Responsable del tratamiento
            </h2>
            <p className="mb-4">
              La denominación <strong>Focus English</strong> es el nombre del proyecto y
              del servicio. El tratamiento de datos personales corresponde a la persona
              física titular del proyecto hasta que exista, en su caso, una razón social que
              lo asuma. El canal principal de contacto es{" "}
              <a href="mailto:soporte@focus-on-english.com" className="text-peach-600 font-medium">
                soporte@focus-on-english.com
              </a>
              .
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              2. Datos personales que tratamos
            </h2>
            <p className="mb-4">Según use nuestros servicios, podemos tratar:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <strong>Identificación y contacto:</strong> nombre, correo electrónico,
                teléfono si nos lo facilita en formularios o registro.
              </li>
              <li>
                <strong>Cuenta y aprendizaje:</strong> datos de perfil, progreso en cursos,
                resultados de ejercicios y uso de la plataforma.
              </li>
              <li>
                <strong>Pagos:</strong> datos gestionados por el proveedor de pagos (por
                ejemplo Stripe); no almacenamos el número completo de su tarjeta en nuestros
                servidores.
              </li>
              <li>
                <strong>Comunicaciones:</strong> mensajes que nos envíe (contacto, soporte).
              </li>
              <li>
                <strong>Técnicos:</strong> dirección IP, identificadores de dispositivo,
                cookies y tecnologías similares, conforme a su configuración de cookies y
                esta política.
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              3. Finalidad y base legal (RGPD)
            </h2>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <strong>Prestación del servicio educativo y la cuenta:</strong> ejecución
                del contrato o medidas precontractuales (art. 6.1.b RGPD).
              </li>
              <li>
                <strong>Cumplimiento de obligaciones legales</strong> (facturación,
                fiscalidad, etc.): art. 6.1.c RGPD.
              </li>
              <li>
                <strong>Comunicaciones comerciales por medios electrónicos:</strong> cuando
                la ley lo exija, solo con su consentimiento previo (art. 6.1.a y normativa
                aplicable en materia de servicios de la sociedad de la información).
              </li>
              <li>
                <strong>Mejora de la seguridad y del servicio, analítica agregada y cookies
                no esenciales:</strong> según corresponda, consentimiento o interés legítimo,
                informado en el banner de cookies y en la configuración disponible.
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4">4. Conservación</h2>
            <p className="mb-4">
              Conservamos los datos el tiempo necesario para las finalidades indicadas y,
              en su caso, para atender reclamaciones o requerimientos legales. Los criterios
              concretos incluyen la duración de la relación contractual, plazos legales de
              prescripción y la necesidad de prueba en litigios.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              5. Destinatarios y encargados del tratamiento
            </h2>
            <p className="mb-4">
              Podemos comunicar datos a proveedores que nos prestan servicios estrictamente
              necesarios (alojamiento, base de datos/autenticación, pasarela de pago,
              email transaccional, analítica, herramientas de consentimiento de cookies,
              procesamiento de voz o IA si activa esas funciones), con contrato de
              encargo de tratamiento u otra base adecuada cuando proceda.
            </p>
            <p className="mb-4">
              Algunos proveedores pueden estar ubicados fuera del Espacio Económico Europeo.
              En esos casos aplicaremos las garantías previstas en el RGPD (decisiones de
              adecuación, cláusulas contractuales tipo u otras medidas).
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">6. Cookies</h2>
            <p className="mb-4">
              Utilizamos cookies y tecnologías similares. Puede gestionar sus preferencias
              mediante el banner de cookies (Cookiebot u otra herramienta configurada en el
              sitio) y obtener más detalle en la declaración de cookies que se muestra desde
              dicho gestor.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">7. Sus derechos</h2>
            <p className="mb-4">Puede ejercer los derechos de:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Acceso, rectificación y supresión</li>
              <li>Limitación del tratamiento</li>
              <li>Oposición</li>
              <li>Portabilidad (cuando proceda)</li>
              <li>
                Retirar el consentimiento en cualquier momento, sin afectar la licitud del
                tratamiento previo
              </li>
            </ul>
            <p className="mb-4">
              Para ello puede escribir a{" "}
              <a href="mailto:soporte@focus-on-english.com" className="text-peach-600 font-medium">
                soporte@focus-on-english.com
              </a>
              , indicando su petición y un medio fehaciente de identificación. También puede
              presentar una reclamación ante la{" "}
              <a
                href="https://www.aepd.es"
                className="text-peach-600 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Agencia Española de Protección de Datos (AEPD)
              </a>
              .
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">8. Menores de edad</h2>
            <p className="mb-4">
              Los servicios están dirigidos a personas con capacidad legal para contratar o
              con la autorización que exija la normativa aplicable. Si detectamos datos de
              menores sin base válida, adoptaremos las medidas oportunas para eliminarlos.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">9. Seguridad</h2>
            <p className="mb-4">
              Aplicamos medidas técnicas y organizativas apropiadas para proteger los datos
              personales frente a accesos no autorizados, pérdida o alteración, en la
              medida de lo razonablemente posible.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              10. Cambios en esta política
            </h2>
            <p className="mb-4">
              Podemos actualizar esta política. La fecha de &quot;última actualización&quot;
              reflejará el cambio relevante. Le recomendamos revisarla periódicamente.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
