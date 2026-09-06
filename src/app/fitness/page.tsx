import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Check,
  ChevronRight,
  Dumbbell,
  Flame,
  HeartPulse,
  Home,
  Move,
  ShieldCheck,
  Timer,
  Zap,
} from "lucide-react";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { BreadcrumbSchema, FAQSchema } from "@/app/schema";
import { SITE_BRAND_NAME } from "@/lib/site-brand";

const baseUrl = "https://linguafly.app";

export const metadata: Metadata = {
  title: `Entrenamiento físico: rutinas y planes | ${SITE_BRAND_NAME}`,
  description:
    "Rutinas de entrenamiento físico para casa o gimnasio: fuerza, cardio, movilidad y pérdida de grasa, con planes claros para empezar y progresar.",
  alternates: { canonical: `${baseUrl}/fitness` },
  keywords: [
    "entrenamiento físico",
    "rutinas de ejercicio",
    "entrenamiento en casa",
    "ejercicios de fuerza",
    "movilidad",
    "cardio",
    "plan de entrenamiento para principiantes",
  ],
  openGraph: {
    title: `Entrenamiento físico: rutinas y planes | ${SITE_BRAND_NAME}`,
    description:
      "Encuentra una forma realista de entrenar: planes por objetivo, nivel y tiempo disponible.",
    url: `${baseUrl}/fitness`,
    type: "website",
  },
};

const faqs = [
  {
    question: "¿Qué tipo de entrenamiento debería hacer si estoy empezando?",
    answer:
      "Empieza con sesiones sencillas de fuerza de cuerpo completo, caminatas o cardio moderado y movilidad. El mejor plan es el que puedes repetir con buena técnica y sin dolor, aumentando el volumen poco a poco.",
  },
  {
    question: "¿Se puede entrenar bien en casa sin material?",
    answer:
      "Sí. Sentadillas, zancadas, flexiones adaptadas, puentes de glúteos, planchas y ejercicios de movilidad permiten trabajar todo el cuerpo. Una mochila o una banda elástica pueden añadir resistencia cuando lo necesites.",
  },
  {
    question: "¿Cuántos días por semana conviene entrenar?",
    answer:
      "Para empezar, dos o tres sesiones semanales son suficientes. Deja tiempo para recuperarte y prioriza la constancia. También puedes sumar caminatas y breves pausas activas durante el día.",
  },
  {
    question: "¿Esta información sustituye el consejo de un profesional sanitario?",
    answer:
      "No. Esta página tiene finalidad educativa general. Si tienes una lesión, una enfermedad, dolor persistente o dudas sobre tu capacidad para entrenar, consulta con un profesional sanitario antes de comenzar.",
  },
];

const goals = [
  {
    icon: Dumbbell,
    title: "Ganar fuerza",
    text: "Aprende a organizar empujes, tirones, sentadillas y bisagras con progresiones fáciles de seguir.",
    accent: "bg-orange-100 text-orange-700",
  },
  {
    icon: Flame,
    title: "Perder grasa",
    text: "Combina movimiento, fuerza y hábitos sostenibles sin promesas rápidas ni rutinas imposibles.",
    accent: "bg-lime-100 text-lime-800",
  },
  {
    icon: Move,
    title: "Moverte mejor",
    text: "Trabaja movilidad, control y amplitud de movimiento para que tu cuerpo tolere mejor el día a día.",
    accent: "bg-sky-100 text-sky-700",
  },
  {
    icon: HeartPulse,
    title: "Mejorar tu cardio",
    text: "Construye resistencia con caminatas, intervalos y sesiones progresivas que puedas mantener.",
    accent: "bg-rose-100 text-rose-700",
  },
];

const starterPlans = [
  { number: "01", title: "15 minutos en casa", detail: "Sin material · cuerpo completo", time: "15 min" },
  { number: "02", title: "Fuerza 3 días", detail: "Rutina base · progresión semanal", time: "3 días" },
  { number: "03", title: "Movilidad diaria", detail: "Pausas activas · espalda y cadera", time: "10 min" },
];

export default function FitnessLandingPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#f8f7f2] pt-24 text-slate-950 dark:bg-slate-950 dark:text-white">
        <BreadcrumbSchema
          items={[
            { name: "Inicio", url: "/" },
            { name: "Fitness", url: "/fitness" },
          ]}
        />
        <FAQSchema questions={faqs} />

        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 py-6 text-sm font-bold text-slate-500 dark:text-slate-400">
            <Link href="/" className="inline-flex items-center gap-1 hover:text-coral-600">
              <Home className="h-4 w-4" /> Inicio
            </Link>
            <ChevronRight className="h-4 w-4 text-slate-300" />
            <span className="text-slate-900 dark:text-white">Fitness</span>
          </nav>

          <section className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 px-6 py-10 text-white shadow-2xl sm:px-10 lg:px-16 lg:py-16">
            <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full border-[44px] border-coral-500/30" aria-hidden="true" />
            <div className="absolute bottom-0 right-1/3 h-3 w-32 bg-lime-300" aria-hidden="true" />
            <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-lime-300/40 bg-lime-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-lime-200">
                  <Activity className="h-4 w-4" /> Training lab · Linguafly
                </div>
                <h1 className="max-w-3xl font-display text-4xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
                  Entrenamiento físico que{" "}
                  <span className="text-coral-400">sí puedes mantener</span>
                </h1>
                <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
                  Rutinas claras para casa o gimnasio, organizadas por objetivo, nivel y tiempo disponible.
                  Empieza con lo que puedes hacer hoy y progresa sin extremos.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <a href="#planes" className="inline-flex items-center gap-2 rounded-2xl bg-coral-500 px-6 py-3.5 font-black text-white transition hover:bg-coral-400">
                    Ver planes para empezar <ArrowRight className="h-5 w-5" />
                  </a>
                  <Link href="/vocabulario/deportes-y-fitness" className="inline-flex items-center gap-2 rounded-2xl border border-slate-600 px-6 py-3.5 font-black text-white transition hover:border-lime-300 hover:text-lime-200">
                    Explorar ejercicios
                  </Link>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 backdrop-blur sm:p-7">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-lime-200">Tu punto de partida</p>
                    <p className="mt-1 text-2xl font-black">Plan semanal</p>
                  </div>
                  <Timer className="h-8 w-8 text-coral-300" />
                </div>
                <div className="grid grid-cols-3 gap-2 py-6">
                  {["Fuerza", "Cardio", "Movilidad"].map((label, index) => (
                    <div key={label} className={`rounded-xl px-2 py-3 text-center text-xs font-black ${index === 0 ? "bg-coral-500 text-white" : "bg-white/10 text-slate-300"}`}>
                      {label}
                    </div>
                  ))}
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-5xl font-black text-lime-300">90</p>
                    <p className="text-sm font-bold text-slate-400">minutos esta semana</p>
                  </div>
                  <div className="w-36">
                    <div className="mb-2 flex justify-between text-xs font-bold text-slate-400"><span>Progreso</span><span>60%</span></div>
                    <div className="h-3 rounded-full bg-white/10"><div className="h-3 w-3/5 rounded-full bg-lime-300" /></div>
                  </div>
                </div>
                <div className="mt-7 space-y-3 text-sm font-bold text-slate-300">
                  {["Elige un objetivo realista", "Sigue una rutina sencilla", "Mide cómo te sientes"].map((step, index) => (
                    <div key={step} className="flex items-center gap-3"><span className="grid h-6 w-6 place-items-center rounded-full bg-lime-300 text-xs text-slate-950">{index + 1}</span>{step}</div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 py-10 sm:grid-cols-3">
            {[
              ["02–03", "sesiones para empezar", "La constancia gana a la intensidad."],
              ["15", "minutos también cuentan", "Entrena aunque tengas poco tiempo."],
              ["0", "promesas milagro", "Progreso gradual, técnica y recuperación."],
            ].map(([value, label, text]) => (
              <div key={label} className="border-l-4 border-coral-500 bg-white p-5 shadow-sm dark:bg-slate-900">
                <p className="font-display text-4xl font-black text-slate-950 dark:text-white">{value}</p>
                <p className="font-black text-coral-600">{label}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{text}</p>
              </div>
            ))}
          </section>

          <section className="py-12">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div><p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-coral-600">Entrena con intención</p><h2 className="font-display text-3xl font-black sm:text-4xl">¿Qué quieres conseguir?</h2></div>
              <Zap className="hidden h-10 w-10 text-lime-500 sm:block" />
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {goals.map(({ icon: Icon, title, text, accent }) => (
                <article key={title} className="group rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-coral-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                  <div className={`mb-7 grid h-12 w-12 place-items-center rounded-2xl ${accent}`}><Icon className="h-6 w-6" /></div>
                  <h3 className="text-xl font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{text}</p>
                  <a href="#principios" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-coral-600">Ver enfoque <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></a>
                </article>
              ))}
            </div>
          </section>

          <section id="planes" className="rounded-[2rem] bg-orange-100/70 p-6 sm:p-10 dark:bg-orange-950/30">
            <div className="mb-8 max-w-2xl"><p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-orange-700 dark:text-orange-300">Empieza sin complicarte</p><h2 className="font-display text-3xl font-black sm:text-4xl">Tres caminos para tu primera semana</h2><p className="mt-3 text-slate-600 dark:text-slate-300">Elige una puerta de entrada. Después ajustaremos volumen, dificultad y descanso.</p></div>
            <div className="grid gap-4 lg:grid-cols-3">
              {starterPlans.map((plan) => (
                <a key={plan.number} href="#principios" className="group rounded-2xl bg-slate-950 p-6 text-white transition hover:-translate-y-1 hover:bg-slate-900">
                  <div className="flex items-start justify-between"><span className="font-display text-4xl font-black text-lime-300">{plan.number}</span><span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-slate-300">{plan.time}</span></div>
                  <h3 className="mt-8 text-xl font-black">{plan.title}</h3><p className="mt-2 text-sm text-slate-400">{plan.detail}</p>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-black text-coral-300">Ver estructura <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                </a>
              ))}
            </div>
          </section>

          <section id="principios" className="grid gap-10 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div><p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-coral-600">La base de cualquier plan</p><h2 className="font-display text-3xl font-black sm:text-5xl">Entrenar mejor no es entrenar a lo loco</h2><p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">Una buena rutina te dice qué hacer, cuánto hacer y cuándo parar. La adaptamos a tu realidad, no al revés.</p><Link href="/vocabulario/deportes-y-fitness" className="mt-7 inline-flex items-center gap-2 font-black text-coral-600">Consulta el vocabulario de fitness <ArrowRight className="h-5 w-5" /></Link></div>
            <div className="space-y-4">
              {[
                ["01", "Técnica antes que velocidad", "Controla el movimiento y reduce la dificultad si pierdes la postura."],
                ["02", "Progresión pequeña", "Añade alguna repetición, unos segundos o un poco de carga cuando estés preparado."],
                ["03", "Recuperación incluida", "Dormir, descansar y alternar intensidades también forman parte del entrenamiento."],
              ].map(([number, title, text]) => <div key={number} className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><span className="font-display text-3xl font-black text-coral-500">{number}</span><div><h3 className="font-black">{title}</h3><p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{text}</p></div><Check className="ml-auto h-5 w-5 shrink-0 text-lime-500" /></div>)}
            </div>
          </section>

          <section className="rounded-[2rem] bg-white p-6 shadow-sm dark:bg-slate-900 sm:p-10">
            <div className="mb-8 flex items-center gap-3"><ShieldCheck className="h-8 w-8 text-lime-600" /><h2 className="font-display text-3xl font-black">Preguntas frecuentes</h2></div>
            <div className="grid gap-6 md:grid-cols-2">
              {faqs.map((faq) => <article key={faq.question} className="border-t border-slate-200 pt-5 dark:border-slate-700"><h3 className="font-black">{faq.question}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{faq.answer}</p></article>)}
            </div>
            <p className="mt-8 text-xs leading-relaxed text-slate-500">Aviso: el contenido es educativo y no sustituye la evaluación ni las indicaciones de un profesional sanitario.</p>
          </section>

          <section className="mt-12 flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-coral-500 p-7 text-white sm:flex-row sm:items-center sm:p-10">
            <div><p className="text-2xl font-black">Tu siguiente sesión puede empezar hoy.</p><p className="mt-1 text-coral-100">Elige un objetivo pequeño y conviértelo en un hábito.</p></div>
            <a href="#planes" className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-slate-950 px-6 py-3.5 font-black text-white hover:bg-slate-800">Elegir mi plan <ArrowRight className="h-5 w-5" /></a>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
