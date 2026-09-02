import { Suspense } from 'react';
import Link from 'next/link';
import { premiumCourseServerService } from '@/lib/services/premium-course-service.server';
import { BookOpen, Clock, Award, Zap } from 'lucide-react';
import { CAMARERO_B2_COURSE } from '@/lib/course/camarero-b2';
import { extractUnitMetadataFromLibCourse } from '@/lib/utils/course-metadata';
import { Metadata } from 'next';
import { getAbsoluteUrl, SITE_BRAND_NAME } from '@/lib/site-brand';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: `Inglés B2 para Camareros | ${SITE_BRAND_NAME}`,
  description: "Curso de inglés B2 para camareros: comunicación profesional en hostelería, resolución de reclamaciones complejas y atención de alto nivel.",
  alternates: {
    canonical: getAbsoluteUrl('/curso-camarero-b2'),
  },
};

async function CourseContent() {
  const units = CAMARERO_B2_COURSE.units.map((u: any) =>
    extractUnitMetadataFromLibCourse(u.id, u.title, u.exercises)
  );
  const totalExercises = units.reduce((s: number, u: any) => s + u.exerciseCount, 0);
  const totalHours = Math.round(units.reduce((s: number, u: any) => s + u.estimatedDuration, 0) / 60);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FF6B6B, #FF8E53, #FFA06B)' }}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-5xl mx-auto px-6 py-20">
          <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white px-4 py-2 rounded-full mb-6">
            <Award className="w-4 h-4 text-yellow-200" />
            <span className="text-xs font-black tracking-widest uppercase">🍽️ Camarero / Restaurante · Nivel B2 · {level_label}</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white tracking-tighter mb-4">
            Inglés B2<br />
            <span className="text-yellow-100">para Camarero</span>
          </h1>
          <p className="text-lg text-white/85 max-w-xl mb-8">
            {units.length} unidades con vocabulario profesional, gramática, escucha y práctica oral para el sector de {"camarero / restaurante"}.
          </p>
          <Link
            href="/{route}/unit-1"
            className="inline-flex items-center gap-2 bg-white text-slate-900 font-black px-6 py-3 rounded-2xl shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <Zap className="w-4 h-4" />
            Empezar Unidad 1
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-slate-50 rounded-t-[60%]" />
      </header>

      <section className="max-w-4xl mx-auto px-6 -mt-2 mb-12">
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { icon: BookOpen, value: units.length, label: 'Unidades' },
            { icon: Clock,    value: `${totalHours}h`, label: 'Duración' },
            { icon: Zap,      value: totalExercises, label: 'Ejercicios' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="bg-white border border-slate-100 rounded-2xl p-5 text-center shadow-sm">
              <Icon className="w-5 h-5 text-slate-400 mx-auto mb-2" />
              <p className="text-3xl font-extrabold text-slate-900 leading-none mb-1">{value}</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Unidades del curso</h2>
        <div className="space-y-3">
          {units.map((unit: any, i: number) => (
            <Link
              key={unit.id}
              href={`/{route}/${unit.id}`}
              className="flex items-center gap-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:border-slate-300 hover:shadow-md transition-all group"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg font-black text-slate-600 group-hover:bg-slate-200 transition-colors">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-900 truncate">{unit.title}</p>
                <p className="text-sm text-slate-500">{unit.exerciseCount} ejercicios · {unit.estimatedDuration} min</p>
              </div>
              <span className="text-slate-400 group-hover:text-slate-600 font-bold text-lg">→</span>
            </Link>
          ))}
        </div>

        <div className="mt-10 p-6 bg-blue-50 border border-blue-100 rounded-2xl">
          <p className="text-sm font-semibold text-blue-900 mb-1">¿Buscas otros niveles?</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {['a1','a2','b1','b2'].map(l => (
              <Link key={l} href={`/curso-camarero-${l}`} className={`px-3 py-1.5 rounded-xl text-sm font-bold border transition-colors ${l === 'b2' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'}`}>
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" /></div>}>
      <CourseContent />
    </Suspense>
  );
}
