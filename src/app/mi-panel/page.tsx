import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Navigation } from '@/components/sections/Navigation';
import LearningGoalSelector from '@/components/panel/LearningGoalSelector';
import WorldMapPanel from '@/components/panel/WorldMapPanel';
import { resolveEntitlements } from '@/lib/access/entitlements';
import { getUserProfileByAuthId } from '@/lib/access/user-profile';
import { parseLastSeenPath } from '@/lib/access/parse-last-seen-path';
import { savePlacementResult } from '@/lib/access/save-placement-result';

export const dynamic = 'force-dynamic';

type CourseSummary = {
  courseId: string;
  startedUnits: number;
  completedUnits: number;
  totalExercisesDone: number;
  totalExercisesPlanned: number;
};

const COURSE_LABELS: Record<string, { label: string; href: string }> = {
  'ingles-a1': { label: 'Ingles A1', href: '/curso-a1/outline' },
  'ingles-a2': { label: 'Ingles A2', href: '/curso-a2/outline' },
  'ingles-b1': { label: 'Ingles B1', href: '/curso-b1/outline' },
  'ingles-b2': { label: 'Ingles B2', href: '/curso-b2/outline' },
  'ingles-c1': { label: 'Ingles C1', href: '/curso-c1/outline' },
  'ingles-c2': { label: 'Ingles C2', href: '/curso-c2/outline' },
};

const OFFICIAL_COURSE_BY_LEVEL: Record<string, Array<{ label: string; href: string }>> = {
  A1: [{ label: 'Curso oficial A1', href: '/curso-a1/outline' }],
  A2: [{ label: 'Curso oficial A2', href: '/curso-a2/outline' }],
  B1: [{ label: 'Curso oficial B1', href: '/curso-b1/outline' }],
  B2: [{ label: 'Curso oficial B2', href: '/curso-b2/outline' }],
  C1: [{ label: 'Curso oficial C1', href: '/curso-c1/outline' }],
  C2: [{ label: 'Curso oficial C2', href: '/curso-c2/outline' }],
};

type Goal = 'general' | 'travel' | 'professional';
type AccessState = 'included' | 'limited' | 'blocked';
const VALID_LEVELS = new Set(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']);

function accessLabel(state: AccessState): string {
  if (state === 'included') return 'Incluido';
  if (state === 'limited') return 'Limitado';
  return 'Bloqueado';
}

function normalizeStatus(status: string | null | undefined): string {
  if (!status) return 'not_started';
  return status;
}

function normalizeLevel(level: string | null | undefined): string | null {
  if (!level) return null;
  const normalized = level.toUpperCase().trim();
  return VALID_LEVELS.has(normalized) ? normalized : null;
}

export default async function MiPanelPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/cuenta/login?next=/mi-panel');
  }

  const resolvedSearchParams = (await searchParams) ?? {};
  const rawPlacement = resolvedSearchParams.placement;
  const rawLevel = resolvedSearchParams.level;
  const placementFromQuery = Array.isArray(rawPlacement) ? rawPlacement[0] : rawPlacement;
  const levelFromQueryRaw = Array.isArray(rawLevel) ? rawLevel[0] : rawLevel;
  const levelFromQuery = normalizeLevel(levelFromQueryRaw);
  const shouldPersistFromQuery = placementFromQuery === '1' && Boolean(levelFromQuery);

  if (shouldPersistFromQuery && levelFromQuery) {
    await savePlacementResult({
      supabase,
      userId: user.id,
      level: levelFromQuery,
    });
  }

  const profile = await getUserProfileByAuthId<any>(supabase, user.id, '*');
  const assignedCourse = parseLastSeenPath(profile?.last_seen_path as string | undefined);

  if (shouldPersistFromQuery && assignedCourse) {
    redirect(assignedCourse.coursePath + '/' + assignedCourse.unitSlug);
  }

  const { data: lessonProgress } = await supabase
    .from('user_lesson_progress')
    .select('course_id, unit_id, status, exercises_completed, exercises_total')
    .eq('user_id', user.id);

  const now = new Date().toISOString();
  const { data: srsDueCards } = await supabase
    .from('a1_srs_cards')
    .select('id')
    .eq('user_id', user.id)
    .lte('next_review_at', now);
  const srsA1DueCount = srsDueCards?.length ?? 0;

  const byCourse = new Map<string, CourseSummary>();
  for (const row of lessonProgress ?? []) {
    const courseId = String(row.course_id ?? '').trim();
    if (!courseId) continue;

    if (!byCourse.has(courseId)) {
      byCourse.set(courseId, {
        courseId,
        startedUnits: 0,
        completedUnits: 0,
        totalExercisesDone: 0,
        totalExercisesPlanned: 0,
      });
    }

    const current = byCourse.get(courseId)!;
    const status = normalizeStatus(row.status);
    const done = Number(row.exercises_completed ?? 0);
    const planned = Number(row.exercises_total ?? 0);

    if (status === 'in_progress' || status === 'completed' || done > 0) {
      current.startedUnits += 1;
    }
    if (status === 'completed' || (planned > 0 && done >= planned)) {
      current.completedUnits += 1;
    }
    current.totalExercisesDone += done;
    current.totalExercisesPlanned += planned;
  }

  const summaries = Array.from(byCourse.values()).sort((a, b) => a.courseId.localeCompare(b.courseId));

  const studentName =
    (profile?.name as string | undefined) ||
    (user.user_metadata?.full_name as string | undefined) ||
    (user.email ?? 'Alumno');
  const subscriptionStatus = (profile?.subscription_status as string | undefined) ?? 'inactive';
  const subscriptionPlan = (profile?.subscription_plan as string | undefined) ?? 'free';
  const entitlements = resolveEntitlements({
    subscriptionStatus,
    subscriptionPlan,
  });
  const languageLevel = (levelFromQuery ?? ((profile?.language_level as string | undefined) ?? 'A1')).toUpperCase();
  const learningGoals = Array.isArray(profile?.learning_goals) ? (profile?.learning_goals as string[]) : [];
  const hasPlacementCompleted =
    Boolean(profile?.placement_completed) ||
    learningGoals.includes('placement_completed') ||
    Boolean(normalizeLevel(profile?.language_level as string | undefined)) ||
    shouldPersistFromQuery;
  const selectedGoal = (learningGoals.find((goal) => goal === 'travel' || goal === 'professional' || goal === 'general') ?? 'general') as Goal;
  const recommendedOfficialCourses = OFFICIAL_COURSE_BY_LEVEL[languageLevel] ?? OFFICIAL_COURSE_BY_LEVEL.A1;
  const primaryCourseHref = assignedCourse
    ? `${assignedCourse.coursePath}/${assignedCourse.unitSlug}`
    : (recommendedOfficialCourses[0]?.href || '/curso-a1/outline');

  const blockAccess = {
    officialCourses: (entitlements.officialCourses ? 'included' : 'blocked') as AccessState,
    travelTrack: (entitlements.travelTrack ? 'included' : 'blocked') as AccessState,
    professionalTrack: (entitlements.professionalTrack ? 'included' : 'blocked') as AccessState,
    aiSpeaking: (entitlements.aiSpeakingFull ? 'included' : entitlements.aiSpeakingLimited ? 'limited' : 'blocked') as AccessState,
    podcasts: (entitlements.podcasts ? 'included' : 'blocked') as AccessState,
    readings: (entitlements.readings ? 'included' : 'blocked') as AccessState,
    vocabulary: (entitlements.vocabulary ? 'included' : 'blocked') as AccessState,
  };

  const goalTitle = selectedGoal === 'travel'
    ? 'Ruta: Inglés para viajar'
    : selectedGoal === 'professional'
      ? 'Ruta: Inglés profesional'
      : 'Ruta: General y exámenes oficiales';

  if (entitlements.isPaid && !hasPlacementCompleted) {
    redirect('/test-nivel?source=post-pago&next=/mi-panel');
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <section className="bg-white border border-slate-200 rounded-2xl p-6">
            <p className="text-sm text-slate-500">Panel del alumno</p>
            <h1 className="text-3xl font-black text-slate-900 mt-1">Hola, {studentName}</h1>
            <p className="text-slate-600 mt-2">
              Aqui tienes tu centro de control: cursos, progreso, suscripcion, pagos y soporte.
            </p>
            {hasPlacementCompleted && (
              <div className="mt-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Objetivo principal</p>
                <LearningGoalSelector initialGoal={selectedGoal} />
              </div>
            )}
          </section>

          {srsA1DueCount > 0 && (
            <section className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-black">
                    {srsA1DueCount}
                  </span>
                  <span className="text-lg font-black text-blue-900">Repasos pendientes A1</span>
                </div>
                <p className="text-sm text-blue-700 mt-1">
                  Tienes {srsA1DueCount} {srsA1DueCount === 1 ? 'ejercicio que repasa' : 'ejercicios que repasan'} hoy segun tu sistema de repeticion espaciada.
                </p>
              </div>
              <Link
                href="/curso-a1/practica-inteligente?mode=srs"
                className="flex-shrink-0 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition"
              >
                Repasar ahora
              </Link>
            </section>
          )}

          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
            <Link href={hasPlacementCompleted ? primaryCourseHref : "/test-nivel?source=panel&next=/mi-panel"} className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition">
              <div className="text-lg font-black text-slate-900">Mis cursos</div>
              <div className="text-sm text-slate-600 mt-1">
                {hasPlacementCompleted
                  ? 'Entrar al contenido y continuar clases.'
                  : 'Completa el test para desbloquear cursos por nivel.'}
              </div>
            </Link>
            <Link href="/mi-panel/cuenta" className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition">
              <div className="text-lg font-black text-slate-900">Configuración</div>
              <div className="text-sm text-slate-600 mt-1">Datos, facturación y cancelar suscripción.</div>
            </Link>
            <Link href="/support/ticket" className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition">
              <div className="text-lg font-black text-slate-900">Soporte y tickets</div>
              <div className="text-sm text-slate-600 mt-1">Enviar dudas y ver estado de tus consultas.</div>
            </Link>
            <Link href="/planes" className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition">
              <div className="text-lg font-black text-slate-900">Suscripcion y pago</div>
              <div className="text-sm text-slate-600 mt-1">Cambiar plan o revisar tu suscripcion actual.</div>
            </Link>
            <Link href="/test-nivel" className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition">
              <div className="text-lg font-black text-slate-900">Test de nivel</div>
              <div className="text-sm text-slate-600 mt-1">Repetir test para ajustar tu ruta de aprendizaje.</div>
            </Link>
          </section>

          {!hasPlacementCompleted && (
            <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h2 className="text-xl font-black text-amber-900">Paso obligatorio: test de nivel</h2>
              <p className="text-amber-800 mt-2">
                Para mostrarte cursos adecuados y activar tu ruta personalizada, primero debes completar el test de nivel.
              </p>
              <div className="mt-4">
                <Link
                  href="/test-nivel?source=post-pago&next=/mi-panel"
                  className="inline-flex px-4 py-2 rounded-lg bg-amber-600 text-white text-sm font-bold hover:bg-amber-700 transition"
                >
                  Hacer test ahora
                </Link>
              </div>
            </section>
          )}

          {hasPlacementCompleted && (
            <section className="bg-white border border-slate-200 rounded-2xl p-5">
              <h2 className="text-xl font-black text-slate-900">{goalTitle}</h2>
              <p className="text-sm text-slate-600 mt-1">
                Nivel detectado: <span className="font-bold text-slate-900">{languageLevel}</span>. Estas son tus opciones desbloqueadas por plan.
              </p>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-xl p-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-black text-slate-900">Cursos oficiales por nivel</h3>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      blockAccess.officialCourses === 'included' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {blockAccess.officialCourses === 'included' ? accessLabel(blockAccess.officialCourses) : 'Unidad 1 gratis'}
                    </span>
                  </div>
                  <div className="mt-3 space-y-2">
                    {blockAccess.officialCourses === 'included' ? (
                      recommendedOfficialCourses.map((course) => (
                        <Link key={course.href} href={course.href} className="block text-sm font-semibold text-coral-700 hover:text-coral-800">
                          {course.label}
                        </Link>
                      ))
                    ) : (
                      <>
                        <p className="text-sm text-slate-600">
                          Puedes hacer la unidad 1 de cada curso gratis. El resto se desbloquea desde 5,99 €/mes.
                        </p>
                        <Link href="/curso-a1/unit-1" className="block text-sm font-semibold text-coral-700 hover:text-coral-800">
                          Empezar unidad 1 (A1)
                        </Link>
                        <Link href="/planes" className="block text-sm font-semibold text-slate-700 hover:text-coral-700">
                          Ver suscripción 5,99 €/mes
                        </Link>
                      </>
                    )}
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-black text-slate-900">Speaking con IA</h3>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      blockAccess.aiSpeaking === 'included'
                        ? 'bg-emerald-100 text-emerald-700'
                        : blockAccess.aiSpeaking === 'limited'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-red-100 text-red-700'
                    }`}>
                      {accessLabel(blockAccess.aiSpeaking)}
                    </span>
                  </div>
                  <div className="mt-3 space-y-2">
                    {blockAccess.aiSpeaking !== 'blocked' ? (
                      <>
                        <Link href="/tutor-ia" className="block text-sm font-semibold text-coral-700 hover:text-coral-800">
                          Practicar speaking con IA
                        </Link>
                        {blockAccess.aiSpeaking === 'limited' && (
                          <p className="text-xs text-amber-700">Plan básico: práctica de IA en modalidad limitada.</p>
                        )}
                      </>
                    ) : (
                      <p className="text-sm text-slate-600">Disponible en planes con suscripción activa.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-dashed border-slate-300 rounded-xl p-4 bg-slate-50">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-black text-slate-900">Cursos de inglés para viajar</h3>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      blockAccess.travelTrack === 'included' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {accessLabel(blockAccess.travelTrack)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">
                    {blockAccess.travelTrack === 'included'
                      ? 'Incluido en premium. Ruta de viaje disponible en esta fase como contenido curado.'
                      : 'Disponible en plan premium.'}
                  </p>
                  <Link href="/mi-panel/ruta-viaje" className="inline-flex mt-2 text-sm font-semibold text-coral-700 hover:text-coral-800">
                    Ver ruta de viaje
                  </Link>
                </div>
                <div className="border border-dashed border-slate-300 rounded-xl p-4 bg-slate-50">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-black text-slate-900">Cursos por sector profesional</h3>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      blockAccess.professionalTrack === 'included' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {accessLabel(blockAccess.professionalTrack)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">
                    {blockAccess.professionalTrack === 'included'
                      ? 'Incluido en premium. Puedes empezar por una ruta profesional específica.'
                      : 'Disponible en plan premium.'}
                  </p>
                  <div className="mt-2 space-y-1">
                    <Link href="/curso-recepcionista-b2" className="block text-sm font-semibold text-coral-700 hover:text-coral-800">
                      → Inglés para Recepcionista (B2)
                    </Link>
                    <Link href="/mi-panel/ruta-profesional" className="block text-sm font-semibold text-coral-700 hover:text-coral-800">
                      Ver ruta profesional
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-slate-200 rounded-xl p-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-black text-slate-900">Podcasts</h3>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      blockAccess.podcasts === 'included' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {accessLabel(blockAccess.podcasts)}
                    </span>
                  </div>
                  {blockAccess.podcasts === 'included' ? (
                    <Link href="/mi-panel/podcasts" className="inline-flex mt-2 text-sm font-semibold text-coral-700 hover:text-coral-800">
                      Abrir podcasts
                    </Link>
                  ) : (
                    <p className="text-sm text-slate-600 mt-2">Activa tu plan para desbloquear esta sección.</p>
                  )}
                </div>
                <div className="border border-slate-200 rounded-xl p-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-black text-slate-900">Lecturas</h3>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      blockAccess.readings === 'included' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {accessLabel(blockAccess.readings)}
                    </span>
                  </div>
                  {blockAccess.readings === 'included' ? (
                    <Link href="/mi-panel/lecturas" className="inline-flex mt-2 text-sm font-semibold text-coral-700 hover:text-coral-800">
                      Abrir lecturas
                    </Link>
                  ) : (
                    <p className="text-sm text-slate-600 mt-2">Activa tu plan para desbloquear esta sección.</p>
                  )}
                </div>
                <div className="border border-slate-200 rounded-xl p-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-black text-slate-900">Vocabulario</h3>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      blockAccess.vocabulary === 'included' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {accessLabel(blockAccess.vocabulary)}
                    </span>
                  </div>
                  {blockAccess.vocabulary === 'included' ? (
                    <Link href="/mi-panel/vocabulario" className="inline-flex mt-2 text-sm font-semibold text-coral-700 hover:text-coral-800">
                      Abrir vocabulario
                    </Link>
                  ) : (
                    <p className="text-sm text-slate-600 mt-2">Activa tu plan para desbloquear esta sección.</p>
                  )}
                </div>
              </div>
            </section>
          )}

          {hasPlacementCompleted && entitlements.isPaid && <WorldMapPanel />}

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1 bg-white border border-slate-200 rounded-2xl p-5">
              <h2 className="text-xl font-black text-slate-900">Mi suscripcion</h2>
              <div className="mt-3 space-y-2 text-sm">
                <p className="text-slate-600">
                  Estado: <span className="font-bold text-slate-900">{subscriptionStatus}</span>
                </p>
                <p className="text-slate-600">
                  Plan: <span className="font-bold text-slate-900">{subscriptionPlan}</span>
                </p>
                <p className="text-slate-600">
                  Nivel: <span className="font-bold text-slate-900">{languageLevel}</span>
                </p>
              </div>
              <Link
                href="/mi-panel/cuenta"
                className="inline-flex mt-4 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition"
              >
                Configuración de cuenta
              </Link>
              <Link
                href="/planes"
                className="inline-flex mt-2 px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition"
              >
                Ver planes
              </Link>
            </div>

            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5">
              <h2 className="text-xl font-black text-slate-900">Mi progreso academico</h2>
              {!hasPlacementCompleted ? (
                <p className="text-slate-600 mt-3 text-sm">
                  Completa el test de nivel para activar tu ruta y empezar a registrar progreso.
                </p>
              ) : summaries.length === 0 ? (
                <p className="text-slate-600 mt-3 text-sm">
                  Aun no hay progreso registrado. Empieza por tu curso para ver avance por unidades.
                </p>
              ) : (
                <div className="mt-4 space-y-3">
                  {summaries.map((s) => {
                    const meta = COURSE_LABELS[s.courseId] ?? {
                      label: s.courseId,
                      href: '/curso-a1/outline',
                    };
                    return (
                      <div key={s.courseId} className="border border-slate-200 rounded-xl p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-bold text-slate-900">{meta.label}</p>
                            <p className="text-xs text-slate-500 mt-1">
                              Unidades iniciadas: {s.startedUnits} · completadas: {s.completedUnits}
                            </p>
                          </div>
                          <Link href={meta.href} className="text-sm font-semibold text-coral-700 hover:text-coral-800">
                            Ir al curso
                          </Link>
                        </div>
                        <div className="mt-2 text-xs text-slate-500">
                          Ejercicios: {s.totalExercisesDone}/{s.totalExercisesPlanned || 0}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
