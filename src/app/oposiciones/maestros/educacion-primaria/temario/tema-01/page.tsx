import type { Metadata } from "next";
import Link from "next/link";

const pageTitle = "Tema 1 de oposiciones de Primaria: desarrollo de 6 a 12 años";
const pageDescription = "Apuntes de estudio sobre el desarrollo psicoevolutivo de niños y niñas de 6 a 12 años: dimensiones cognitiva, motriz, afectiva y social, implicaciones didácticas y test gratuito.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/oposiciones/maestros/educacion-primaria/temario/tema-01/" },
  openGraph: { title: pageTitle, description: pageDescription, type: "article" },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="mt-10"><h2 className="text-2xl font-bold tracking-tight">{title}</h2><div className="mt-4 space-y-4 leading-8 text-slate-700">{children}</div></section>;
}

export default function TemaUnoPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-gradient-to-br from-indigo-50 via-white to-sky-50">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
          <nav aria-label="Migas de pan" className="mb-5 text-sm text-slate-500">
            <Link href="/oposiciones/maestros/educacion-primaria/" className="underline underline-offset-4">Oposiciones de Primaria</Link>
            <span className="mx-2">/</span><Link href="/oposiciones/maestros/educacion-primaria/temario/" className="underline underline-offset-4">Temario</Link><span className="mx-2">/</span><span>Tema 1</span>
          </nav>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.15em] text-indigo-700">Tema 1 · Apuntes gratuitos</p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{pageTitle}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">Características generales del desarrollo psicoevolutivo de los niños y niñas de seis a doce años: aspectos cognitivos, motrices, afectivos y sociales. Implicaciones para la enseñanza y el aprendizaje.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#resumen" className="rounded-xl bg-indigo-700 px-5 py-3 font-semibold text-white hover:bg-indigo-800">Ir al resumen</a>
            <Link href="/oposiciones/maestros/educacion-primaria/test/tema-01/" className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold hover:border-indigo-400">Hacer el test del tema</Link>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
          <strong>Nota de preparación:</strong> estos apuntes son material didáctico original de apoyo. Contrasta el título literal del tema, las referencias y los requisitos con el temario y la convocatoria oficial que te correspondan. No sustituyen las disposiciones oficiales.
        </div>

        <Section title="1. Introducción">
          <p>Conocer cómo se desarrollan los niños y niñas durante la Educación Primaria ayuda al docente a seleccionar objetivos, situaciones de aprendizaje, apoyos y formas de evaluación ajustados a las características del alumnado. Entre los seis y los doce años se producen avances importantes en el razonamiento, la coordinación motriz, la regulación emocional, la comunicación y la participación social.</p>
          <p>El desarrollo no consiste en una secuencia idéntica para todo el alumnado. El ritmo individual depende de la interacción entre factores biológicos, experiencias, contextos familiares y culturales, oportunidades educativas y relaciones. Por ello, las edades orientan la planificación, pero no deben utilizarse como etiquetas rígidas para valorar la capacidad de una persona.</p>
        </Section>

        <Section title="2. Qué entendemos por desarrollo psicoevolutivo">
          <p>El desarrollo psicoevolutivo es un proceso de cambio y continuidad en distintas dimensiones de la persona a lo largo del tiempo. Para estudiarlo en el contexto escolar conviene distinguir cuatro ámbitos interrelacionados:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li><strong>Cognitivo:</strong> atención, memoria, lenguaje, razonamiento, planificación y resolución de problemas.</li>
            <li><strong>Motriz:</strong> coordinación gruesa y fina, equilibrio, orientación espacial y control postural.</li>
            <li><strong>Afectivo y personal:</strong> autoconcepto, autoestima, motivación, autonomía y regulación emocional.</li>
            <li><strong>Social:</strong> comunicación, cooperación, comprensión de normas, resolución de conflictos y pertenencia al grupo.</li>
          </ul>
          <p>La separación es útil para organizar el estudio, pero en el aula los ámbitos actúan conjuntamente. Por ejemplo, una tarea cooperativa de construcción puede exigir planificación cognitiva, destreza manual, gestión de la frustración y negociación con iguales.</p>
        </Section>

        <Section title="3. Desarrollo cognitivo">
          <h3 className="text-lg font-bold text-slate-900">3.1. Atención, memoria y estrategias</h3>
          <p>A lo largo de la etapa suele aumentar la capacidad para sostener la atención, seleccionar información relevante y utilizar estrategias para recordar. Estas capacidades no crecen de forma automática: mejoran cuando el alumnado aprende a planificar, organizar, elaborar y revisar la información y cuando las tareas tienen una finalidad comprensible.</p>
          <p>En la práctica docente, conviene presentar las consignas con claridad, dividir las tareas complejas en pasos, activar los conocimientos previos y ofrecer herramientas de organización como listas de comprobación, mapas conceptuales y ejemplos resueltos. Los apoyos pueden retirarse gradualmente a medida que aumenta la autonomía.</p>
          <h3 className="text-lg font-bold text-slate-900">3.2. Razonamiento y pensamiento</h3>
          <p>Las propuestas inspiradas en Jean Piaget describen avances hacia formas de pensamiento lógico aplicado a situaciones concretas durante buena parte de esta etapa. El alumnado puede progresar en la clasificación, la seriación, la comprensión de relaciones y la consideración de más de una dimensión de un problema. Sin embargo, el desempeño depende del conocimiento previo, de la familiaridad con la tarea y de las ayudas disponibles; no debe deducirse una capacidad individual únicamente a partir de la edad.</p>
          <p>Las experiencias manipulativas, la comparación de ejemplos, la formulación de hipótesis y la explicación del procedimiento ayudan a conectar lo concreto con representaciones más abstractas. El objetivo no es memorizar una etiqueta evolutiva, sino comprender qué tipo de apoyo facilita el aprendizaje.</p>
          <h3 className="text-lg font-bold text-slate-900">3.3. Lenguaje y metacognición</h3>
          <p>El vocabulario, la comprensión de textos y la capacidad de explicar razonamientos continúan desarrollándose. También puede mejorar la metacognición: reconocer qué se sabe, detectar un error y elegir una estrategia de mejora. El docente puede modelar en voz alta cómo aborda un problema, proponer preguntas de autoevaluación y pedir al alumnado que justifique sus decisiones.</p>
        </Section>

        <Section title="4. Desarrollo motriz">
          <p>En Educación Primaria se consolidan habilidades de coordinación, equilibrio y control corporal, a la vez que progresa la motricidad fina necesaria para escribir, dibujar, recortar y manipular materiales. Existe una gran diversidad en la experiencia motriz y en el ritmo de adquisición de destrezas.</p>
          <p>Las actividades educativas deben ofrecer oportunidades variadas y seguras para moverse, explorar el espacio, ajustar la fuerza y coordinar acciones. En las tareas gráficas o manipulativas interesa valorar tanto el proceso como el resultado, graduar la dificultad y proporcionar materiales o tiempos alternativos cuando sea necesario.</p>
          <p>El desarrollo motor también se relaciona con la participación, la confianza y la interacción con iguales. Por eso, las propuestas de Educación Física y las pausas activas pueden contribuir al bienestar y a la disposición para aprender, sin convertir las diferencias físicas en motivos de comparación o exclusión.</p>
        </Section>

        <Section title="5. Desarrollo afectivo y personal">
          <p>Durante estos años, la percepción de la propia competencia y el autoconcepto se construyen en parte mediante las experiencias de éxito, la comparación social y el feedback recibido de las personas adultas y de los iguales. Las expectativas del entorno y el clima del aula pueden favorecer la confianza, la participación y la disposición a asumir retos.</p>
          <p>La regulación emocional avanza con la ayuda de modelos, lenguaje emocional, rutinas predecibles y estrategias explícitas para afrontar errores y conflictos. No significa que desaparezca la frustración: el alumnado necesita aprender a identificarla, pedir ayuda, revisar sus decisiones y volver a intentarlo.</p>
          <p>El profesorado puede utilizar feedback concreto centrado en estrategias y progreso, objetivos alcanzables, oportunidades para revisar los trabajos y actividades que normalicen el error como parte del aprendizaje. Es importante evitar atribuir una conducta aislada a un rasgo fijo de personalidad.</p>
        </Section>

        <Section title="6. Desarrollo social y moral">
          <p>El grupo de iguales adquiere relevancia como espacio para cooperar, negociar reglas, construir amistades y contrastar puntos de vista. El alumnado puede comprender mejor la reciprocidad y la justicia, pero necesita experiencias guiadas para resolver desacuerdos, considerar distintas perspectivas y reconocer el impacto de sus acciones.</p>
          <p>Las estructuras cooperativas funcionan mejor cuando cada integrante tiene una responsabilidad clara y existen normas compartidas, seguimiento del trabajo y reflexión individual y grupal. El docente debe intervenir ante exclusión, acoso o desigualdades de participación y no asumir que cualquier agrupamiento produce cooperación por sí solo.</p>
          <p>El desarrollo moral y la convivencia se pueden trabajar mediante dilemas apropiados a la edad, asambleas, acuerdos de aula, reparación del daño y análisis de situaciones cotidianas. Las normas son más educativas cuando se explican, se aplican con coherencia y se conectan con el respeto y los derechos de las demás personas.</p>
        </Section>

        <Section title="7. Implicaciones para la enseñanza y el aprendizaje">
          <p>Conocer el desarrollo orienta las decisiones didácticas, pero no justifica aplicar una misma tarea de manera uniforme. Una respuesta educativa ajustada combina expectativas altas, accesibilidad, apoyos graduados y oportunidades para que todo el alumnado participe y progrese.</p>
          <ul className="list-disc space-y-2 pl-6">
            <li><strong>Partir de los conocimientos previos:</strong> explorar ideas iniciales antes de introducir un concepto.</li>
            <li><strong>Aprendizaje activo:</strong> alternar manipulación, diálogo, lectura, práctica y reflexión.</li>
            <li><strong>Andamiaje:</strong> ofrecer ejemplos, preguntas guía y apoyos temporales, retirándolos cuando ya no sean necesarios.</li>
            <li><strong>Inclusión:</strong> prever distintas formas de acceder a la información y demostrar lo aprendido, manteniendo objetivos claros.</li>
            <li><strong>Evaluación formativa:</strong> recoger evidencias durante el proceso y dar feedback útil para el siguiente paso.</li>
            <li><strong>Clima emocional seguro:</strong> establecer rutinas claras, promover el respeto y responder de forma educativa a los errores.</li>
            <li><strong>Colaboración:</strong> coordinarse con familias y profesionales del centro dentro de sus funciones y respetando la confidencialidad.</li>
          </ul>
        </Section>

        <Section title="8. Ejemplo práctico de aplicación en el aula">
          <p>En una tarea sobre el cuidado del agua, el alumnado de un mismo grupo puede observar recipientes con distintas cantidades, registrar datos, compararlos y diseñar una propuesta para reducir el consumo del centro. La actividad combina observación y razonamiento; registro escrito y representación gráfica; manipulación y coordinación; escucha, acuerdo y reparto de responsabilidades.</p>
          <p>Para responder a las diferencias individuales, el docente puede ofrecer una tabla parcialmente completada, apoyos visuales, vocabulario clave, roles alternativos y distintos modos de presentar las conclusiones. La evaluación considera la comprensión del fenómeno, el uso de evidencias, la colaboración y la capacidad de revisar una propuesta tras recibir feedback.</p>
          <p>Este ejemplo muestra que las dimensiones del desarrollo no se trabajan de forma aislada. Se integran en tareas con un propósito, con apoyos adaptados y oportunidades reales de participación.</p>
        </Section>

        <Section title="9. Errores frecuentes al estudiar este tema">
          <ul className="list-disc space-y-2 pl-6">
            <li>Tratar las edades como límites fijos que describen a todo el alumnado por igual.</li>
            <li>Confundir una teoría evolutiva con una receta didáctica universal.</li>
            <li>Explicar el desarrollo únicamente mediante la maduración, sin considerar las experiencias y el contexto.</li>
            <li>Separar cognición, emoción, movimiento y socialización como si fueran procesos independientes.</li>
            <li>Proponer metodologías activas sin definir objetivos, apoyos ni criterios para comprobar el aprendizaje.</li>
          </ul>
        </Section>

        <Section title="10. Resumen para repasar">
          <div id="resumen" className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-5">
            <ul className="list-disc space-y-2 pl-6">
              <li>El desarrollo entre los 6 y los 12 años es multidimensional, dinámico y diverso.</li>
              <li>Las dimensiones cognitiva, motriz, afectiva y social interactúan continuamente.</li>
              <li>Las referencias evolutivas orientan la enseñanza, pero no deben convertirse en etiquetas rígidas.</li>
              <li>El aprendizaje mejora con conocimientos previos, actividad significativa, andamiaje y feedback.</li>
              <li>La intervención educativa debe promover inclusión, autonomía, bienestar, convivencia y evaluación formativa.</li>
            </ul>
          </div>
        </Section>

        <Section title="11. Referencias de partida">
          <ul className="list-disc space-y-3 pl-6">
            <li><a className="font-semibold text-indigo-700 underline underline-offset-4" href="https://boe.es/buscar/doc.php?id=BOE-A-2007-5478" target="_blank" rel="noreferrer">Orden ECI/592/2007, de 12 de marzo (BOE)</a>: referencia para el temario de Educación Primaria; verificar su aplicación en la convocatoria correspondiente.</li>
            <li>Piaget, J. — obras sobre el desarrollo del pensamiento y la construcción del conocimiento. Consultar una edición académica o bibliotecaria verificable.</li>
            <li>Vygotsky, L. S. — obras sobre pensamiento, lenguaje e interacción social en el aprendizaje. Consultar una edición académica o bibliotecaria verificable.</li>
            <li>Bruner, J. S. — trabajos sobre construcción del conocimiento y andamiaje educativo. Consultar una edición académica o bibliotecaria verificable.</li>
            <li>Normativa curricular estatal y autonómica aplicable a Educación Primaria, junto con la convocatoria oficial vigente.</li>
          </ul>
          <p className="text-sm text-slate-500">Las referencias bibliográficas son pistas de lectura. Antes de su publicación definitiva conviene completar edición, año, editorial y páginas consultadas a partir de ejemplares verificables.</p>
        </Section>

        <div className="mt-12 rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
          <h2 className="text-2xl font-bold">Comprueba lo que has aprendido</h2>
          <p className="mt-3 leading-7 text-slate-300">Practica con 20 preguntas originales del tema, recibe una puntuación orientativa y consulta la explicación de las respuestas.</p>
          <Link href="/oposiciones/maestros/educacion-primaria/test/tema-01/" className="mt-5 inline-flex rounded-xl bg-white px-5 py-3 font-semibold text-slate-900 hover:bg-indigo-50">Empezar test del tema 1 →</Link>
        </div>
      </article>
    </main>
  );
}
