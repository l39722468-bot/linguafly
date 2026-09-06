import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Dumbbell,
  Flame,
  HeartPulse,
  MoveUpRight,
  ShieldCheck,
  Sparkles,
  Timer,
  Waves,
  Zap,
} from "lucide-react";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { BreadcrumbSchema, FAQSchema } from "@/app/schema";
import { getAbsoluteUrl } from "@/lib/site-brand";

export const metadata: Metadata = {
  title: "Entrenamiento físico: rutinas y planes | Linguafly",
  description:
    "Rutinas de entrenamiento físico para casa o gimnasio: fuerza, movilidad, cardio y pérdida de grasa. Planes realistas para empezar y progresar.",
  keywords: [
    "entrenamiento físico",
    "rutinas de ejercicio",
    "entrenamiento en casa",
    "ejercicios de fuerza",
    "movilidad",
    "cardio",
    "plan para principiantes",
  ],
  alternates: {
    canonical: getAbsoluteUrl("/fitness"),
  },
  openGraph: {
    title: "Entrenamiento físico que sí puedes mantener | Linguafly",
    description:
      "Planes claros para entrenar con tu tiempo, tu nivel y tu objetivo. Sin promesas extremas.",
    type: "website",
    url: getAbsoluteUrl("/fitness"),
  },
  twitter: {
    card: "summary_large_image",
    title: "Entrenamiento físico que sí puedes mantener | Linguafly",
    description:
      "Fuerza, movilidad y cardio en planes realistas para empezar hoy.",
  },
};

const faqs = [
  {
    question: "¿Cuánto tiempo necesito para empezar a entrenar?",
    answer:
      "Con 15 minutos puedes completar una sesión útil. Lo importante es elegir una frecuencia que puedas repetir y aumentar poco a poco, no comenzar con el plan más exigente.",
  },
  {
    question: "¿Es mejor entrenar en casa o en el gimnasio?",
    answer:
      "El mejor lugar es el que te permite ser constante. En casa puedes trabajar fuerza y movilidad con tu propio peso; el gimnasio amplía las opciones de carga y progresión.",
  },
  {
    question: "¿Puedo entrenar si soy principiante?",
    answer:
      "Sí. Empieza con movimientos sencillos, una intensidad moderada y descansos suficientes. Si tienes una lesión, dolor persistente o una condición médica, consulta con un profesional antes de comenzar.",
  },
  {
    question: "¿Cuándo notaré avances?",
    answer:
      "La regularidad suele mejorar primero tu energía, coordinación y tolerancia al esfuerzo. Lleva un registro sencillo de sesiones y repeticiones para ver avances sin depender solo del espejo o de la báscula.",
  },
];

const goals = [
  {
    number: "01",
    icon: Dumbbell,
    title: "Fuerza",
    description: "Construye una base sólida con ejercicios que puedes repetir y progresar.",
    meta: "Carga · control · confianza",
    href: "#planes",
    accent: "bg-[#ff6b5f]",
  },
  {
    number: "02",
    icon: Flame,
    title: "Pérdida de grasa",
    description: "Combina movimiento, fuerza y hábitos sostenibles sin perseguir extremos.",
    meta: "Ritmo · energía · hábitos",
    href: "#como-entrenar",
    accent: "bg-[#f2a43a]",
  },
  {
    number: "03",
    icon: Waves,
    title: "Movilidad",
    description: "Recupera rango de movimiento para moverte mejor en tu día a día.",
    meta: "Respirar · explorar · soltar",
    href: "#como-entrenar",
    accent: "bg-[#c5e86c]",
  },
  {
    number: "04",
    icon: HeartPulse,
    title: "Cardio",
    description: "Mejora tu resistencia con sesiones que caben en tu agenda real.",
    meta: "Pulso · constancia · aire",
    href: "#planes",
    accent: "bg-[#a9d6e5]",
  },
];

const plans = [
  {
    label: "PARA HOY",
    title: "15 min en casa",
    detail: "Una sesión corta de cuerpo completo, sin material.",
    time: "15 min",
    level: "Inicial",
    tone: "bg-[#fffaf1]",
  },
  {
    label: "RUTA BASE",
    title: "3 días de fuerza",
    detail: "Una estructura semanal para crear el hábito sin saturarte.",
    time: "3 días",
    level: "Principiante",
    tone: "bg-[#dbe9df]",
  },
  {
    label: "PARA CUIDARTE",
    title: "Movilidad diaria",
    detail: "Pequeños bloques para espalda, caderas y hombros.",
    time: "10 min",
    level: "Todos",
    tone: "bg-[#f6d8cc]",
  },
];

const principles = [
  {
    number: "01",
    title: "Empieza con margen",
    text: "Termina una sesión sintiendo que podrías haber hecho un poco más. Ese margen es lo que permite volver mañana.",
  },
  {
    number: "02",
    title: "Repite antes de añadir",
    text: "Repite la misma estructura varias veces antes de subir peso, duración o dificultad. La técnica marca el camino.",
  },
  {
    number: "03",
    title: "Mide lo que importa",
    text: "Anota sesiones, repeticiones y cómo te sentiste. El progreso también es moverte con más control y menos esfuerzo.",
  },
];

export default function FitnessPage() {
  const breadcrumbItems = [
    { name: "Inicio", url: getAbsoluteUrl("/") },
    { name: "Fitness", url: getAbsoluteUrl("/fitness") },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQSchema questions={faqs} />
      <Navigation />
      <main className="overflow-hidden bg-[#f8f3eb] text-slate-950">
        <section className="relative border-b border-[#ded5c7] bg-[#f8f3eb] px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24 lg:pt-10">
          <div className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-[#f5c7b4]/60 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-56 w-56 rounded-full bg-[#dceea0]/40 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl">
            <nav aria-label="Breadcrumb" className="mb-12 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-slate-500">
              <Link href="/" className="transition-colors hover:text-[#e85d4a]">Inicio</Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
              <span className="text-slate-950">Fitness</span>
            </nav>

            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
              <div className="max-w-2xl">
                <div className="mb-7 inline-flex items-center gap-2 border border-slate-950 bg-[#c5e86c] px-3 py-2 text-[11px] font-black uppercase tracking-[0.2em] shadow-[4px_4px_0_#111827]">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  Laboratorio de entrenamiento
                </div>
                <h1 className="max-w-xl text-balance font-display text-5xl font-black leading-[0.96] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-[5.5rem]">
                  Entrenamiento físico que <span className="text-[#e85d4a]">sí puedes mantener</span>
                </h1>
                <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-700 sm:text-xl">
                  Rutas claras para entrenar en casa o en el gimnasio, según tu objetivo, tu nivel y el tiempo que tienes hoy. Sin promesas extremas: solo un plan que puedas repetir.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link href="#planes" className="group inline-flex items-center justify-center gap-3 bg-slate-950 px-5 py-3.5 text-sm font-black text-white shadow-[5px_5px_0_#e85d4a] transition-transform hover:-translate-y-0.5 focus-visible:outline-slate-950">
                    Ver planes para empezar
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                  <Link href="#objetivos" className="inline-flex items-center justify-center gap-2 border-2 border-slate-950 bg-transparent px-5 py-3 text-sm font-black text-slate-950 transition-colors hover:bg-white">
                    Explorar ejercicios
                    <MoveUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Para personas reales · en cualquier lugar · a tu ritmo</p>
              </div>

              <div className="relative lg:pl-4">
                <div className="absolute -right-3 -top-5 hidden rotate-3 border border-slate-950 bg-[#ff6b5f] px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white shadow-[3px_3px_0_#111827] sm:block">Tu punto de partida</div>
                <div className="relative border-2 border-slate-950 bg-slate-950 p-3 shadow-[10px_10px_0_#e85d4a] sm:p-4">
                  <div className="bg-[#122033] p-5 text-white sm:p-7">
                    <div className="flex items-start justify-between gap-4 border-b border-white/15 pb-5">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#c5e86c]">Prescripción semanal</p>
                        <h2 className="mt-2 font-display text-2xl font-black tracking-tight text-white sm:text-3xl">Diseña tu ruta</h2>
                      </div>
                      <div className="text-right">
                        <p className="font-display text-4xl font-black leading-none text-[#c5e86c]">90</p>
                        <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-300">min / semana</p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <p className="mb-3 text-xs font-bold text-slate-300">¿Qué quieres priorizar?</p>
                      <div className="flex flex-wrap gap-2" role="group" aria-label="Objetivos de entrenamiento">
                        <a href="#planes" aria-current="true" className="border border-[#c5e86c] bg-[#c5e86c] px-3 py-2 text-xs font-black text-slate-950 transition-transform hover:-translate-y-0.5">Fuerza</a>
                        <a href="#como-entrenar" className="border border-white/30 px-3 py-2 text-xs font-black text-white transition-colors hover:border-[#ff8f78] hover:text-[#ffb09c]">Perder grasa</a>
                        <a href="#como-entrenar" className="border border-white/30 px-3 py-2 text-xs font-black text-white transition-colors hover:border-[#ff8f78] hover:text-[#ffb09c]">Moverte mejor</a>
                      </div>
                    </div>
                    <div className="mt-7 space-y-4">
                      <div className="flex gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#c5e86c] font-display text-sm font-black text-[#c5e86c]">01</div>
                        <div className="flex-1 pt-1">
                          <div className="flex items-center justify-between gap-3 text-xs font-black"><span>Elige objetivo</span><span className="text-[#c5e86c]">Listo</span></div>
                          <div className="mt-2 h-1.5 bg-white/15"><div className="h-full w-full bg-[#c5e86c]" /></div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#ff8f78] font-display text-sm font-black text-[#ff8f78]">02</div>
                        <div className="flex-1 pt-1">
                          <div className="flex items-center justify-between gap-3 text-xs font-black"><span>Sigue el plan</span><span className="text-slate-400">Siguiente</span></div>
                          <div className="mt-2 h-1.5 bg-white/15"><div className="h-full w-[62%] bg-[#ff8f78]" /></div>
                        </div>
                      </div>
                      <div className="flex gap-3 opacity-70">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-white/40 font-display text-sm font-black">03</div>
                        <div className="flex-1 pt-1">
                          <div className="flex items-center justify-between gap-3 text-xs font-black"><span>Mide tu progreso</span><span className="text-slate-400">Después</span></div>
                          <div className="mt-2 h-1.5 bg-white/15"><div className="h-full w-[20%] bg-white/70" /></div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-7 flex items-center gap-2 border-t border-white/15 pt-4 text-xs text-slate-300"><Timer className="h-4 w-4 text-[#c5e86c]" aria-hidden="true" /> 3 sesiones · 30 min cada una · ajustable</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b-2 border-slate-950 bg-[#ff8f78] px-4 py-5 sm:px-6 lg:px-8" aria-label="Qué encontrarás">
          <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-slate-950/25">
            <div className="flex items-center gap-3 sm:px-6 sm:first:pl-0"><Check className="h-5 w-5 shrink-0" strokeWidth={3} aria-hidden="true" /><span className="text-sm font-black">Casa o gimnasio</span></div>
            <div className="flex items-center gap-3 sm:px-6"><ShieldCheck className="h-5 w-5 shrink-0" strokeWidth={2.5} aria-hidden="true" /><span className="text-sm font-black">Amable para principiantes</span></div>
            <div className="flex items-center gap-3 sm:px-6 sm:last:pr-0"><Zap className="h-5 w-5 shrink-0" strokeWidth={2.5} aria-hidden="true" /><span className="text-sm font-black">Sin promesas extremas</span></div>
          </div>
        </section>

        <section id="objetivos" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <div>
                <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-[#e85d4a]">01 / Elige tu dirección</p>
                <h2 className="max-w-lg font-display text-4xl font-black leading-[1.03] tracking-[-0.045em] sm:text-5xl">Tu objetivo no necesita un plan imposible.</h2>
              </div>
              <p className="max-w-xl text-lg leading-relaxed text-slate-600 lg:justify-self-end">Empieza por lo que quieres sentir y construir. Después elegimos la dosis justa de movimiento para que avances sin vivir pendiente del entrenamiento.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {goals.map((goal) => {
                const Icon = goal.icon;
                return (
                  <Link key={goal.number} href={goal.href} className="group relative flex min-h-[270px] flex-col justify-between overflow-hidden border-2 border-slate-950 bg-white p-5 transition-transform hover:-translate-y-1 focus-visible:-translate-y-1">
                    <div className={`absolute right-0 top-0 h-20 w-20 ${goal.accent} transition-transform duration-300 group-hover:scale-125`} aria-hidden="true" />
                    <div className="relative flex items-start justify-between">
                      <span className="font-display text-4xl font-black tracking-[-0.08em] text-slate-950">{goal.number}</span>
                      <Icon className="h-7 w-7 text-slate-950" strokeWidth={2.2} aria-hidden="true" />
                    </div>
                    <div className="relative">
                      <h3 className="font-display text-2xl font-black">{goal.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">{goal.description}</p>
                      <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-3 text-[10px] font-black uppercase tracking-[0.14em] text-slate-500"><span>{goal.meta}</span><ArrowRight className="h-4 w-4 text-[#e85d4a] transition-transform group-hover:translate-x-1" aria-hidden="true" /></div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section id="planes" className="bg-[#111827] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 border-b border-white/20 pb-10 md:flex-row md:items-end">
              <div>
                <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-[#c5e86c]">02 / Elige tu punto de partida</p>
                <h2 className="max-w-2xl font-display text-4xl font-black leading-[1.03] tracking-[-0.045em] text-white sm:text-5xl">Un plan pequeño también cuenta como plan.</h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-slate-300">Tres rutas de entrada. Escoge la que tenga menos fricción esta semana y deja que la constancia haga su trabajo.</p>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {plans.map((plan, index) => (
                <a key={plan.title} href={index === 1 ? "#como-entrenar" : "#objetivos"} className={`group flex min-h-[320px] flex-col justify-between border-2 border-white/80 p-6 text-slate-950 transition-transform hover:-translate-y-1 ${plan.tone}`}>
                  <div className="flex items-start justify-between gap-4"><span className="border border-slate-950 px-2 py-1 text-[10px] font-black tracking-[0.18em]">{plan.label}</span><span className="font-display text-5xl font-black leading-none opacity-20">0{index + 1}</span></div>
                  <div><h3 className="max-w-xs font-display text-3xl font-black leading-none tracking-[-0.04em]">{plan.title}</h3><p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-700">{plan.detail}</p></div>
                  <div className="flex items-end justify-between border-t border-slate-950/20 pt-4"><div className="flex gap-5 text-xs font-black uppercase tracking-[0.12em]"><span>{plan.time}</span><span>{plan.level}</span></div><span className="flex h-9 w-9 items-center justify-center border border-slate-950 transition-colors group-hover:bg-slate-950 group-hover:text-white"><ArrowRight className="h-4 w-4" aria-hidden="true" /></span></div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="como-entrenar" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-[#e85d4a]">03 / Entrena con criterio</p>
              <h2 className="max-w-md font-display text-4xl font-black leading-[1.03] tracking-[-0.045em] sm:text-5xl">Progresar no es hacerlo todo.</h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-600">Es aprender a escuchar tu cuerpo, repetir lo que funciona y ajustar el plan cuando cambia tu semana.</p>
              <div className="mt-8 border-l-4 border-[#c5e86c] pl-5 text-sm font-bold leading-relaxed text-slate-700">La mejor rutina es la que te ayuda a seguir siendo una persona con una vida completa.</div>
            </div>
            <div className="divide-y-2 divide-slate-950 border-y-2 border-slate-950">
              {principles.map((principle) => (
                <article key={principle.number} className="grid gap-5 py-7 sm:grid-cols-[80px_1fr] sm:gap-8">
                  <div className="font-display text-5xl font-black tracking-[-0.08em] text-[#e85d4a]">{principle.number}</div>
                  <div><h3 className="font-display text-2xl font-black">{principle.title}</h3><p className="mt-2 max-w-xl leading-relaxed text-slate-600">{principle.text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
          <div className="mx-auto grid max-w-7xl items-stretch gap-5 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="relative overflow-hidden border-2 border-slate-950 bg-[#c5e86c] p-7 sm:p-10">
              <div className="absolute -right-10 -top-16 font-display text-[13rem] font-black leading-none text-white/35" aria-hidden="true">↗</div>
              <div className="relative max-w-2xl"><p className="text-xs font-black uppercase tracking-[0.22em] text-slate-700">Conecta movimiento y aprendizaje</p><h2 className="mt-5 max-w-xl font-display text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl">¿Te apetece ampliar tu vocabulario de fitness en inglés?</h2><p className="mt-4 max-w-xl text-slate-700">Consulta nuestro recurso de deportes y fitness para reconocer ejercicios, material y rutinas cuando entrenas o viajas.</p><Link href="/vocabulario/deportes-y-fitness" className="mt-7 inline-flex items-center gap-2 border-2 border-slate-950 bg-slate-950 px-4 py-3 text-sm font-black text-white transition-colors hover:bg-transparent hover:text-slate-950">Explorar vocabulario <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
            </div>
            <div className="flex flex-col justify-between border-2 border-slate-950 bg-white p-7 sm:p-10"><div><p className="text-xs font-black uppercase tracking-[0.22em] text-[#e85d4a]">Nota importante</p><ShieldCheck className="mt-5 h-9 w-9 text-slate-950" aria-hidden="true" /><p className="mt-5 text-sm leading-relaxed text-slate-700">Este contenido es educativo y no sustituye el consejo de un profesional sanitario o del ejercicio.</p></div><p className="mt-10 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Infórmate · adapta · pide ayuda cuando la necesites</p></div>
          </div>
        </section>

        <section className="border-t border-[#ded5c7] bg-[#fffaf1] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-[#e85d4a]">04 / Preguntas frecuentes</p><h2 className="font-display text-4xl font-black leading-[1.03] tracking-[-0.045em] sm:text-5xl">Antes de ponerte en marcha.</h2></div><p className="max-w-sm text-sm leading-relaxed text-slate-600">Respuestas claras para dar el primer paso con expectativas realistas.</p></div>
            <div className="grid gap-4 md:grid-cols-2">
              {faqs.map((faq, index) => <article key={faq.question} className="border-2 border-slate-950 bg-white p-6"><div className="flex gap-4"><span className="font-display text-sm font-black text-[#e85d4a]">0{index + 1}</span><div><h3 className="font-display text-lg font-black leading-snug">{faq.question}</h3><p className="mt-3 text-sm leading-relaxed text-slate-600">{faq.answer}</p></div></div></article>)}
            </div>
          </div>
        </section>

        <section className="bg-[#ff6b5f] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center"><div><p className="text-xs font-black uppercase tracking-[0.22em] text-slate-950/70">Tu siguiente sesión</p><h2 className="mt-3 max-w-2xl font-display text-4xl font-black leading-none tracking-[-0.045em] text-slate-950 sm:text-5xl">Hazlo sencillo. Hazlo tuyo.</h2></div><Link href="#planes" className="group inline-flex shrink-0 items-center gap-3 border-2 border-slate-950 bg-slate-950 px-5 py-3.5 text-sm font-black text-white transition-colors hover:bg-transparent hover:text-slate-950">Ver planes <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
