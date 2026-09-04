import { Navigation } from "@/components/sections/Navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Términos y condiciones de uso del sitio web y servicios de Linguafly.",
  robots: "index, follow",
};

export default function TerminosPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-black mb-4">Términos y Condiciones</h1>
          <p className="text-slate-600 mb-8 text-sm">
            Última actualización: 6 de abril de 2026
          </p>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 border-l-4 border-peach-500 pl-4 py-2 bg-slate-50 rounded-r">
              El sitio se ofrece en <strong>fase de validación técnica y de producto</strong>
              ; no hay sociedad mercantil de alta en este momento. Las condiciones se
              actualizarán cuando exista una entidad jurídica o cuando se activen pagos de
              forma definitiva; conviene revisión legal antes de cobrar a clientes de forma
              habitual.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">1. Objeto y aceptación</h2>
            <p className="mb-4">
              Las presentes condiciones regulan el acceso y uso del sitio web y los
              servicios ofrecidos bajo la marca <strong>Linguafly</strong> (en adelante,
              el &quot;Servicio&quot;) por la persona física que gestiona el proyecto hasta
              que, en su caso, una razón social asuma la titularidad. Al registrarse,
              contratar o utilizar el Servicio, usted declara haber leído y aceptado estas
              condiciones y la{" "}
              <a href="/privacidad" className="text-peach-600 font-medium">
                Política de Privacidad
              </a>
              .
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">2. Descripción del Servicio</h2>
            <p className="mb-4">
              Linguafly ofrece contenidos y herramientas para el aprendizaje del inglés
              (cursos, ejercicios, recursos complementarios y funcionalidades asociadas). En
              esta fase el Servicio puede cambiar con frecuencia, incluir errores o
              interrupciones y no supone aún una oferta comercial cerrada. Nos reservamos el
              derecho a modificar, suspender o discontinuar partes del Servicio con la
              antelación razonable que sea posible, salvo causas de fuerza mayor o requisitos
              legales/técnicos urgentes.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">3. Registro y cuenta</h2>
            <p className="mb-4">
              Usted se compromete a facilitar datos veraces y a mantener la confidencialidad
              de sus credenciales. Es responsable de la actividad realizada desde su cuenta.
              Debe notificarnos de inmediato cualquier uso no autorizado.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              4. Propiedad intelectual e industrial
            </h2>
            <p className="mb-4">
              Los contenidos del Servicio (textos, diseño, audio, vídeo, software, marcas, etc.)
              están protegidos por la legislación aplicable. Salvo licencia expresa, no está
              permitida su copia, distribución pública, comunicación, transformación o
              explotación más allá del uso privado permitido por la ley.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">5. Pagos y suscripciones</h2>
            <p className="mb-4">
              El acceso a determinados contenidos puede requerir el pago de una suscripción u
              otra modalidad indicada en el momento de la contratación. Los pagos pueden
              procesarse a través de terceros (por ejemplo, Stripe), sujetos también a sus
              términos.
            </p>
            <p className="mb-4">
              Salvo que se indique lo contrario o que la normativa de consumo obligue a un
              tratamiento distinto, las condiciones de facturación, renovación, cancelación y
              reembolso serán las publicadas en el flujo de compra y en las comunicaciones
              asociadas a su cuenta.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">6. Uso aceptable</h2>
            <p className="mb-4">Queda prohibido, entre otros:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                Eludir medidas técnicas de protección o acceder a sistemas de forma no
                autorizada.
              </li>
              <li>
                Utilizar el Servicio de forma que vulnere derechos de terceros o la
                legislación vigente.
              </li>
              <li>
                Extraer masivamente contenidos (&quot;scraping&quot;) sin permiso expreso.
              </li>
              <li>
                Revender o redistribuir el acceso al Servicio sin autorización escrita.
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              7. Resultados educativos y limitación de responsabilidad
            </h2>
            <p className="mb-4">
              El aprendizaje de idiomas depende de factores personales y del uso que haga del
              Servicio. No garantizamos resultados concretos (exámenes oficiales,
              certificaciones, promociones laborales, etc.).
            </p>
            <p className="mb-4">
              En la medida permitida por la ley aplicable, el Servicio se ofrece &quot;tal
              cual&quot; y no nos responsabilizamos de daños indirectos, lucro cesante o
              pérdida de oportunidades, salvo los casos en que la ley no permita dicha
              exclusión o limitación (por ejemplo, en relación con consumidores).
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">8. Enlaces a terceros</h2>
            <p className="mb-4">
              El sitio puede incluir enlaces a sitios o servicios de terceros. No
              controlamos esos sitios y no somos responsables de sus contenidos ni de sus
              políticas de privacidad.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">9. Duración y baja</h2>
            <p className="mb-4">
              Puede dejar de usar el Servicio y solicitar la baja o el ejercicio de sus
              derechos de datos según la Política de Privacidad. Podremos suspender o dar de
              baja cuentas que incumplan estas condiciones.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              10. Legislación aplicable y jurisdicción
            </h2>
            <p className="mb-4">
              Para usuarios residentes en España, las presentes condiciones se rigen por la
              legislación española. En materia de consumidores, serán competentes los juzgados
              y tribunales del domicilio del usuario o los que corresponda según la normativa
              de protección de consumidores y usuarios.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">11. Contacto</h2>
            <p className="mb-4">
              Para cualquier consulta sobre estas condiciones:{" "}
              <a href="mailto:soporte@focus-on-english.com" className="text-peach-600 font-medium">
                soporte@focus-on-english.com
              </a>
              .
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
