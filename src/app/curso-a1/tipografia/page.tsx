import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Type, Palette, AlignLeft, BookOpen, Zap, MessageSquare, Award, Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Estructura Tipográfica — Curso A1 | Focus English',
  description: 'Sistema tipográfico completo del Curso de Inglés A1. Guía de referencia para diseñadores y desarrolladores.',
};

const COURSE_COLORS = [
  { name: 'Coral Principal', hex: '#FF6B6B', tw: 'bg-coral-500', usage: 'CTAs, títulos principales, énfasis crítico' },
  { name: 'Coral Claro', hex: '#FF9B7A', tw: 'bg-coral-400', usage: 'Estados hover, degradados secundarios' },
  { name: 'Melocotón', hex: '#FFA06B', tw: 'bg-peach-500', usage: 'Secundario, íconos, acentos de sección' },
  { name: 'Crema Cálida', hex: '#FEF9F5', tw: 'bg-cream-100', usage: 'Fondo general, superficies en reposo' },
  { name: 'Pizarra Oscura', hex: '#0F172A', tw: 'bg-slate-900', usage: 'Títulos H1, texto de máximo peso' },
  { name: 'Pizarra Media', hex: '#334155', tw: 'bg-slate-700', usage: 'Párrafos, cuerpo de texto principal' },
  { name: 'Pizarra Suave', hex: '#64748B', tw: 'bg-slate-500', usage: 'Subtítulos, metadatos, etiquetas' },
  { name: 'Verde Éxito', hex: '#34D399', tw: 'bg-emerald-400', usage: 'Feedback correcto, logros, racha' },
  { name: 'Ámbar Alerta', hex: '#FBBF24', tw: 'bg-amber-400', usage: 'Advertencias, pistas, tiempo restante' },
];

const TYPE_SCALE = [
  {
    label: 'Display / Hero',
    tag: 'h1',
    size: 'text-6xl md:text-7xl',
    sizePx: '60–72px',
    weight: 'font-black',
    weightVal: '900',
    tracking: 'tracking-tighter',
    leading: 'leading-none',
    color: 'text-slate-900',
    usage: 'Hero del curso, pantalla de bienvenida',
    example: 'Inglés A1',
  },
  {
    label: 'Heading 1',
    tag: 'h1',
    size: 'text-4xl md:text-5xl',
    sizePx: '36–48px',
    weight: 'font-black',
    weightVal: '900',
    tracking: 'tracking-tight',
    leading: 'leading-tight',
    color: 'text-slate-900',
    usage: 'Título de página, nombre de unidad principal',
    example: 'Unidad 1: Saludos y Despedidas',
  },
  {
    label: 'Heading 2',
    tag: 'h2',
    size: 'text-3xl',
    sizePx: '30px',
    weight: 'font-extrabold',
    weightVal: '800',
    tracking: 'tracking-tight',
    leading: 'leading-snug',
    color: 'text-slate-900',
    usage: 'Título de sección dentro de unidad, nombre de lección',
    example: 'Lección 2: El Verbo To Be',
  },
  {
    label: 'Heading 3',
    tag: 'h3',
    size: 'text-2xl',
    sizePx: '24px',
    weight: 'font-bold',
    weightVal: '700',
    tracking: 'tracking-tight',
    leading: 'leading-snug',
    color: 'text-slate-800',
    usage: 'Subtítulo de ejercicio, nombre de bloque temático',
    example: 'Pronunciación y Entonación',
  },
  {
    label: 'Heading 4',
    tag: 'h4',
    size: 'text-xl',
    sizePx: '20px',
    weight: 'font-bold',
    weightVal: '700',
    tracking: 'tracking-normal',
    leading: 'leading-normal',
    color: 'text-slate-800',
    usage: 'Pregunta de ejercicio, instrucción activa',
    example: 'Completa la frase con la palabra correcta',
  },
  {
    label: 'Body Large',
    tag: 'p',
    size: 'text-lg',
    sizePx: '18px',
    weight: 'font-medium',
    weightVal: '500',
    tracking: 'tracking-normal',
    leading: 'leading-relaxed',
    color: 'text-slate-700',
    usage: 'Explicaciones gramaticales, contexto narrativo, introducción de unidad',
    example: 'El verbo «to be» es fundamental en inglés. Se usa para describir identidades, estados y características.',
  },
  {
    label: 'Body Regular',
    tag: 'p',
    size: 'text-base',
    sizePx: '16px',
    weight: 'font-normal',
    weightVal: '400',
    tracking: 'tracking-normal',
    leading: 'leading-relaxed',
    color: 'text-slate-700',
    usage: 'Instrucciones de ejercicio, enunciados de preguntas, pistas',
    example: 'Selecciona la opción correcta para completar la oración. Fíjate en el sujeto de la frase.',
  },
  {
    label: 'Body Small',
    tag: 'p',
    size: 'text-sm',
    sizePx: '14px',
    weight: 'font-normal',
    weightVal: '400',
    tracking: 'tracking-normal',
    leading: 'leading-relaxed',
    color: 'text-slate-600',
    usage: 'Notas al pie, información de duración, descripciones de ejercicios',
    example: 'Esta lección incluye 8 ejercicios y tiene una duración estimada de 15 minutos.',
  },
  {
    label: 'Caption / Meta',
    tag: 'span',
    size: 'text-xs',
    sizePx: '12px',
    weight: 'font-bold',
    weightVal: '700',
    tracking: 'tracking-widest',
    leading: 'leading-normal',
    color: 'text-slate-500',
    usage: 'Etiquetas de categoría, indicadores de nivel, metadatos',
    example: 'NIVEL A1 · UNIDAD 1 · 15 MIN',
  },
];

const CONTENT_PATTERNS = [
  {
    icon: BookOpen,
    label: 'Título de Módulo',
    color: 'bg-coral-50 border-coral-200',
    iconColor: 'text-coral-600',
    preview: (
      <div className="space-y-1">
        <span className="text-xs font-bold tracking-widest text-coral-500 uppercase">Módulo 1 · 10 Unidades</span>
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Fundamentos del Inglés</h2>
        <p className="text-sm font-medium text-slate-500">Saludos, identidad y entorno inmediato</p>
      </div>
    ),
  },
  {
    icon: Tag,
    label: 'Encabezado de Unidad',
    color: 'bg-peach-50 border-peach-200',
    iconColor: 'text-peach-600',
    preview: (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-1 bg-coral-100 text-coral-700 rounded-full text-xs font-black tracking-wide uppercase">A1</span>
          <span className="text-xs font-bold text-slate-400 tracking-wider">Unidad 1 de 22</span>
        </div>
        <h3 className="text-xl font-extrabold tracking-tight text-slate-900">Saludos y Despedidas</h3>
        <p className="text-sm text-slate-600 leading-relaxed">Hello, Hi, Bye, See you · Verbo «To Be» (positivo)</p>
      </div>
    ),
  },
  {
    icon: Zap,
    label: 'Instrucción de Ejercicio',
    color: 'bg-slate-50 border-slate-200',
    iconColor: 'text-slate-600',
    preview: (
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <span className="flex-shrink-0 w-7 h-7 bg-coral-500 text-white rounded-full text-xs font-black flex items-center justify-center">3</span>
          <div>
            <p className="text-base font-bold text-slate-800 leading-snug">Completa la frase con el verbo correcto</p>
            <p className="text-sm text-slate-500 mt-0.5">Elige entre: am · is · are</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-700 font-medium">
          She <span className="inline-block mx-1 border-b-2 border-coral-400 min-w-[3rem] text-center text-coral-600">___</span> a teacher.
        </div>
      </div>
    ),
  },
  {
    icon: MessageSquare,
    label: 'Feedback de Respuesta',
    color: 'bg-emerald-50 border-emerald-200',
    iconColor: 'text-emerald-600',
    preview: (
      <div className="space-y-3">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
          <p className="text-sm font-extrabold text-emerald-700 mb-1">¡Correcto! +10 XP</p>
          <p className="text-sm text-emerald-600 leading-relaxed">«She <strong>is</strong> a teacher.» El pronombre «she» siempre usa «is».</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <p className="text-sm font-extrabold text-red-700 mb-1">Casi. Inténtalo de nuevo</p>
          <p className="text-sm text-red-600 leading-relaxed">Recuerda: «She», «He» e «It» siempre van con «<strong>is</strong>».</p>
        </div>
      </div>
    ),
  },
  {
    icon: Award,
    label: 'Logro / Insignia',
    color: 'bg-amber-50 border-amber-200',
    iconColor: 'text-amber-600',
    preview: (
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
          <span className="text-2xl">🏆</span>
        </div>
        <div>
          <p className="text-xs font-black tracking-widest text-amber-600 uppercase mb-0.5">Logro Desbloqueado</p>
          <p className="text-base font-extrabold text-slate-900">Primera Conversación</p>
          <p className="text-sm text-slate-500">Completaste tu primer diálogo en inglés</p>
        </div>
      </div>
    ),
  },
  {
    icon: AlignLeft,
    label: 'Explicación Gramatical',
    color: 'bg-blue-50 border-blue-200',
    iconColor: 'text-blue-600',
    preview: (
      <div className="space-y-2">
        <p className="text-xs font-black tracking-widest text-blue-600 uppercase">Nota Gramatical</p>
        <h4 className="text-base font-bold text-slate-800">El Verbo «To Be» en Presente</h4>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {[['I', 'am'], ['You', 'are'], ['He/She/It', 'is']].map(([pron, verb]) => (
            <div key={pron} className="bg-white rounded-lg border border-blue-100 px-2 py-1.5 text-center">
              <p className="text-xs font-bold text-blue-500">{pron}</p>
              <p className="text-sm font-extrabold text-slate-800">{verb}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

function ColorSwatch({ color }: { color: typeof COURSE_COLORS[0] }) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="w-10 h-10 rounded-lg flex-shrink-0 border border-black/10 shadow-sm"
        style={{ backgroundColor: color.hex }}
      />
      <div className="min-w-0">
        <p className="text-xs font-black text-slate-800 truncate">{color.name}</p>
        <p className="text-xs font-mono text-slate-500">{color.hex}</p>
        <p className="text-xs text-slate-400 leading-tight mt-0.5">{color.usage}</p>
      </div>
    </div>
  );
}

function TypeScaleRow({ item }: { item: typeof TYPE_SCALE[0] }) {
  const Tag = item.tag as keyof JSX.IntrinsicElements;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 py-6 border-b border-slate-100 last:border-0 items-start">
      <div className="lg:col-span-1">
        <p className="text-xs font-black tracking-widest text-slate-400 uppercase mb-1">{item.label}</p>
        <div className="flex flex-wrap gap-1">
          <span className="text-xs font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{item.sizePx}</span>
          <span className="text-xs font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{item.weightVal}</span>
          <span className="text-xs font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">&lt;{item.tag}&gt;</span>
        </div>
      </div>
      <div className="lg:col-span-3">
        <Tag className={`${item.size} ${item.weight} ${item.tracking} ${item.leading} ${item.color} font-sans`}>
          {item.example}
        </Tag>
      </div>
      <div className="lg:col-span-1">
        <p className="text-xs text-slate-400 leading-relaxed">{item.usage}</p>
      </div>
    </div>
  );
}

export default function TypographyGuidePage() {
  return (
    <div className="min-h-screen bg-cream-100">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <Link
            href="/curso-a1"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-coral-600 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Curso A1
          </Link>

          <div className="flex items-start gap-5">
            <div className="w-14 h-14 bg-coral-100 text-coral-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <Type className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-black tracking-widest text-coral-500 uppercase">Guía de Diseño</span>
                <span className="text-xs font-bold text-slate-300">·</span>
                <span className="text-xs font-bold text-slate-400">Curso A1 · Focus English</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-3">
                Estructura Tipográfica
              </h1>
              <p className="text-lg font-medium text-slate-600 max-w-2xl leading-relaxed">
                Sistema tipográfico completo del Curso de Inglés A1. Define la jerarquía visual, el peso y el color de cada elemento textual para garantizar consistencia y legibilidad óptima.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            {[
              { label: 'Familia: Nunito', icon: '𝐍' },
              { label: 'Escala: 9 niveles', icon: '≡' },
              { label: 'Pesos: 400–900', icon: 'W' },
              { label: 'Paleta: 9 tokens', icon: '⬤' },
            ].map((chip) => (
              <div key={chip.label} className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full text-xs font-bold">
                <span className="text-slate-400">{chip.icon}</span>
                {chip.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-14">

        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center">
              <span className="text-xs font-black">01</span>
            </div>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Familia Tipográfica</h2>
              <p className="text-sm text-slate-500">Fuente única con múltiples pesos para toda la plataforma</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-xs font-black tracking-widest text-slate-400 uppercase">Principal · Display &amp; Headings</p>
                <div>
                  <p className="text-5xl font-black text-slate-900 leading-none mb-1">Nunito</p>
                  <p className="text-2xl font-extrabold text-slate-700">Black 900</p>
                  <p className="text-xl font-bold text-slate-600">Bold 700</p>
                  <p className="text-lg font-semibold text-slate-500">SemiBold 600</p>
                </div>
                <p className="text-xs font-mono text-slate-400">font-family: &apos;Nunito&apos;, system-ui, sans-serif</p>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-black tracking-widest text-slate-400 uppercase">Cuerpo &amp; UI</p>
                <div className="space-y-2">
                  <p className="text-base font-medium text-slate-700">Medium 500 — Explicaciones y contexto narrativo largo</p>
                  <p className="text-base font-normal text-slate-700">Regular 400 — Instrucciones de ejercicio y enunciados</p>
                  <p className="text-sm font-normal text-slate-600">Small Regular — Metadatos, notas, duraciones</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mt-4">
                  <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Caracteres A–Z · a–z · 0–9</p>
                  <p className="text-base font-medium text-slate-700 leading-relaxed tracking-wide">
                    ABCDEFGHIJKLMNOPQRSTUVWXYZ
                  </p>
                  <p className="text-base font-normal text-slate-600 leading-relaxed tracking-wide">
                    abcdefghijklmnopqrstuvwxyz
                  </p>
                  <p className="text-base font-normal text-slate-500 leading-relaxed tracking-wide">
                    0123456789 .,!?;:&#39;&quot;()-
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center">
              <span className="text-xs font-black">02</span>
            </div>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Escala Tipográfica</h2>
              <p className="text-sm text-slate-500">Jerarquía completa de 9 niveles con ejemplos reales del curso</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="hidden lg:grid grid-cols-5 gap-4 px-8 py-4 bg-slate-50 border-b border-slate-100">
              <div className="col-span-1">
                <p className="text-xs font-black tracking-widest text-slate-400 uppercase">Nivel</p>
              </div>
              <div className="col-span-3">
                <p className="text-xs font-black tracking-widest text-slate-400 uppercase">Ejemplo en Contexto</p>
              </div>
              <div className="col-span-1">
                <p className="text-xs font-black tracking-widest text-slate-400 uppercase">Uso</p>
              </div>
            </div>
            <div className="px-8">
              {TYPE_SCALE.map((item) => (
                <TypeScaleRow key={item.label} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center">
              <span className="text-xs font-black">03</span>
            </div>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Paleta Cromática del Texto</h2>
              <p className="text-sm text-slate-500">Tokens de color para cada capa jerárquica</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {COURSE_COLORS.map((color) => (
                <ColorSwatch key={color.name} color={color} />
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center">
              <span className="text-xs font-black">04</span>
            </div>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Patrones por Tipo de Contenido</h2>
              <p className="text-sm text-slate-500">Composición tipográfica real para cada elemento del curso</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CONTENT_PATTERNS.map((pattern) => {
              const Icon = pattern.icon;
              return (
                <div key={pattern.label} className={`bg-white rounded-2xl border ${pattern.color.split(' ')[1]} shadow-sm overflow-hidden`}>
                  <div className={`flex items-center gap-2 px-5 py-3 border-b ${pattern.color}`}>
                    <Icon className={`w-4 h-4 ${pattern.iconColor}`} />
                    <p className={`text-xs font-black tracking-widest uppercase ${pattern.iconColor}`}>{pattern.label}</p>
                  </div>
                  <div className="p-5">
                    {pattern.preview}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center">
              <span className="text-xs font-black">05</span>
            </div>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Espaciado y Ritmo Vertical</h2>
              <p className="text-sm text-slate-500">Reglas de espacio entre elementos tipográficos</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-3">
                <p className="text-xs font-black tracking-widest text-slate-400 uppercase mb-4">Tabla de Espaciado</p>
                {[
                  { context: 'Display → H1', value: 'mb-6 (24px)', usage: 'Entre hero y primer encabezado' },
                  { context: 'H1 → Párrafo', value: 'mb-4 (16px)', usage: 'Título de página a descripción' },
                  { context: 'H2 → Párrafo', value: 'mb-3 (12px)', usage: 'Encabezado de sección a contenido' },
                  { context: 'H3 → Párrafo', value: 'mb-2 (8px)', usage: 'Sub-sección a texto de instrucción' },
                  { context: 'Párrafo → Párrafo', value: 'mb-4 (16px)', usage: 'Entre bloques de texto seguidos' },
                  { context: 'Párrafo → Label', value: 'mt-1 (4px)', usage: 'Texto a metadato adyacente' },
                  { context: 'Sección → Sección', value: 'py-12 (48px)', usage: 'Bloques de contenido distintos' },
                ].map((row) => (
                  <div key={row.context} className="flex items-start gap-4 py-2 border-b border-slate-50">
                    <span className="text-xs font-bold text-slate-700 w-28 flex-shrink-0">{row.context}</span>
                    <span className="text-xs font-mono text-coral-600 w-24 flex-shrink-0">{row.value}</span>
                    <span className="text-xs text-slate-400">{row.usage}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <p className="text-xs font-black tracking-widest text-slate-400 uppercase mb-4">Interlineado (line-height)</p>
                {[
                  { label: 'leading-none', value: '1.0', usage: 'Display / Hero de gran tamaño' },
                  { label: 'leading-tight', value: '1.25', usage: 'H1, H2 — Títulos principales' },
                  { label: 'leading-snug', value: '1.375', usage: 'H3, H4 — Subtítulos y preguntas' },
                  { label: 'leading-normal', value: '1.5', usage: 'Etiquetas, labels de interfaz' },
                  { label: 'leading-relaxed', value: '1.625', usage: 'Cuerpo de texto, párrafos de explicación' },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-4 py-2 border-b border-slate-50">
                    <span className="text-xs font-mono text-blue-600 w-32 flex-shrink-0">{row.label}</span>
                    <span className="text-xs font-bold text-slate-700 w-8 flex-shrink-0">{row.value}</span>
                    <span className="text-xs text-slate-400">{row.usage}</span>
                  </div>
                ))}

                <div className="mt-6 bg-slate-50 rounded-xl p-5 border border-slate-100">
                  <p className="text-xs font-black tracking-widest text-slate-400 uppercase mb-3">Kerning &amp; Tracking</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono text-slate-600">tracking-tighter</span>
                      <span className="text-xs text-slate-500">−0.05em · Display Hero</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono text-slate-600">tracking-tight</span>
                      <span className="text-xs text-slate-500">−0.025em · H1, H2</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono text-slate-600">tracking-normal</span>
                      <span className="text-xs text-slate-500">0em · Cuerpo de texto</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono text-slate-600">tracking-wide</span>
                      <span className="text-xs text-slate-500">+0.025em · Botones, chips</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono text-slate-600">tracking-widest</span>
                      <span className="text-xs text-slate-500">+0.1em · Labels UPPERCASE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center">
              <span className="text-xs font-black">06</span>
            </div>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Vista Integrada — Pantalla de Unidad</h2>
              <p className="text-sm text-slate-500">Todos los niveles tipográficos en contexto real</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-coral-500 to-peach-500 px-8 py-8">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🗣️</span>
                </div>
                <div>
                  <p className="text-xs font-black tracking-widest text-white/70 uppercase mb-1">Módulo 1 · Unidad 1 de 22</p>
                  <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-2">Saludos y Despedidas</h1>
                  <p className="text-base font-medium text-white/80 max-w-lg leading-relaxed">
                    Aprende los saludos más comunes del inglés y el verbo «to be» en presente positivo.
                  </p>
                </div>
              </div>
            </div>

            <div className="px-8 py-8 space-y-8">
              <div className="space-y-3">
                <p className="text-xs font-black tracking-widest text-coral-500 uppercase">Nota Gramatical</p>
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">El Verbo «To Be»</h2>
                <p className="text-base font-medium text-slate-700 leading-relaxed max-w-2xl">
                  El verbo «to be» es el más importante del inglés. Equivale a «ser» o «estar» en español y cambia según el sujeto de la oración.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="text-xl font-bold tracking-tight text-slate-800 mb-4">Ejercicio 3: Completa la oración</h3>
                <p className="text-sm font-normal text-slate-500 mb-5">Selecciona la forma correcta del verbo «to be» según el sujeto.</p>

                <div className="space-y-3">
                  {[
                    { q: 'I ___ a student.', opts: ['am', 'is', 'are'], correct: 0 },
                    { q: 'She ___ my teacher.', opts: ['am', 'is', 'are'], correct: 1 },
                  ].map((ex, i) => (
                    <div key={i} className="bg-white rounded-xl border border-slate-200 p-4">
                      <p className="text-base font-bold text-slate-800 mb-3">{ex.q}</p>
                      <div className="flex flex-wrap gap-2">
                        {ex.opts.map((opt, j) => (
                          <span
                            key={opt}
                            className={`px-4 py-2 rounded-xl text-sm font-bold border-2 cursor-default ${
                              j === ex.correct
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                                : 'bg-white border-slate-200 text-slate-500'
                            }`}
                          >
                            {opt}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                <p className="text-sm font-extrabold text-emerald-700 mb-1">¡Perfecto! +10 XP · Racha de 3</p>
                <p className="text-sm font-normal text-emerald-600 leading-relaxed">
                  «I <strong>am</strong>» y «She <strong>is</strong>» son las formas correctas. Los pronombres en singular tienen formas únicas del verbo «to be».
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ejercicio 3 de 8 · Lección 1 · ~12 min restantes</p>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-coral-100 text-coral-700 rounded-full text-xs font-black uppercase tracking-wide">
                    A1
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
                    Gramática
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black tracking-widest text-slate-400 uppercase">Focus English · Guía de Diseño</p>
            <p className="text-xs text-slate-400 mt-0.5">Estructura Tipográfica v1.0 · Curso A1</p>
          </div>
          <Link
            href="/curso-a1"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-coral-500 text-white rounded-xl text-sm font-bold hover:bg-coral-600 transition-colors"
          >
            Ver el Curso A1
          </Link>
        </div>
      </footer>
    </div>
  );
}
