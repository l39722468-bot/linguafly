import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { LearningProfileForm } from "@/components/profile/learning-profile-form";
import { getAuth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

type Profile = {
  cefr_level: string | null;
  explanation_language: string;
  learning_goal: string | null;
};

type PracticeSummary = {
  total_attempts: number;
  average_score: number | null;
  best_score: number | null;
};

type PracticeAttempt = {
  id: number;
  score: number;
  total_questions: number;
  cefr_level: string | null;
  completed_at: number;
};

type SkillError = {
  skill: string;
  total_answers: number;
  correct_answers: number;
  incorrect_answers: number;
};

type PracticeInsightSummary = {
  total_answers: number;
};

const skillLabels: Record<string, string> = {
  "present-simple": "Presente simple: tercera persona",
  "present-continuous": "Presente continuo",
  "past-simple": "Pasado simple",
  quantifiers: "Cuantificadores: much y many",
  "polite-requests": "Peticiones con could",
  "present-perfect": "Present perfect con since",
  "second-conditional": "Second conditional",
  "be-used-to-gerund": "Be used to + verbo en -ing",
  "causative-have": "Have something done",
  "gerund-after-preposition": "Verbo en -ing después de una preposición",
  "inversion-hardly": "Inversión con hardly",
  "relative-clauses": "Oraciones relativas con which",
  "would-rather": "Would rather + past simple",
  "vocabulary-precision": "Precisión de vocabulario",
  "third-conditional": "Third conditional",
};

const explanationLanguageLabels: Record<string, string> = {
  es: "Español",
  ca: "Català",
  en: "English",
  fr: "Français",
  pt: "Português",
  de: "Deutsch",
  it: "Italiano",
};

export default async function PrivateHomePage() {
  const auth = await getAuth().catch(() => null);
  if (!auth) redirect("/login?error=config");

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/login");

  let profile: Profile | null = null;
  let profileUnavailable = false;
  let practiceSummary: PracticeSummary | null = null;
  let recentPracticeAttempts: PracticeAttempt[] = [];
  let practiceHistoryUnavailable = false;
  let practiceInsightsUnavailable = false;
  let insightSummary: PracticeInsightSummary = { total_answers: 0 };
  let skillErrors: SkillError[] = [];

  try {
    const context = await getCloudflareContext({ async: true });
    const env = context.env as unknown as CloudflareEnv;

    // The profile key comes only from the validated server-side session.
    await env.AUTH_DB.prepare(
      "INSERT OR IGNORE INTO profiles (user_id) VALUES (?)",
    )
      .bind(session.user.id)
      .run();

    profile = await env.AUTH_DB.prepare(
      "SELECT cefr_level, explanation_language, learning_goal FROM profiles WHERE user_id = ?",
    )
      .bind(session.user.id)
      .first<Profile>();
  } catch {
    profileUnavailable = true;
  }

  try {
    const context = await getCloudflareContext({ async: true });
    const env = context.env as unknown as CloudflareEnv;

    practiceSummary = await env.AUTH_DB.prepare(
      `SELECT COUNT(*) AS total_attempts,
              AVG(score) AS average_score,
              MAX(score) AS best_score
       FROM practice_attempts
       WHERE user_id = ?`,
    )
      .bind(session.user.id)
      .first<PracticeSummary>();

    const history = await env.AUTH_DB.prepare(
      `SELECT id, score, total_questions, cefr_level, completed_at
       FROM practice_attempts
       WHERE user_id = ?
       ORDER BY completed_at DESC, id DESC
       LIMIT 10`,
    )
      .bind(session.user.id)
      .all<PracticeAttempt>();

    recentPracticeAttempts = history.results ?? [];
  } catch {
    // An unapplied practice-history migration must not break the profile page.
    practiceHistoryUnavailable = true;
  }

  try {
    const context = await getCloudflareContext({ async: true });
    const env = context.env as unknown as CloudflareEnv;

    insightSummary =
      (await env.AUTH_DB.prepare(
        "SELECT COUNT(*) AS total_answers FROM practice_question_results WHERE user_id = ?",
      )
        .bind(session.user.id)
        .first<PracticeInsightSummary>()) ?? { total_answers: 0 };

    const errors = await env.AUTH_DB.prepare(
      `SELECT skill,
              COUNT(*) AS total_answers,
              SUM(is_correct) AS correct_answers,
              COUNT(*) - SUM(is_correct) AS incorrect_answers
       FROM practice_question_results
       WHERE user_id = ?
       GROUP BY skill
       HAVING SUM(is_correct) < COUNT(*)
       ORDER BY incorrect_answers DESC,
                CAST(COUNT(*) - SUM(is_correct) AS REAL) / COUNT(*) DESC,
                COUNT(*) DESC
       LIMIT 5`,
    )
      .bind(session.user.id)
      .all<SkillError>();

    skillErrors = errors.results ?? [];
  } catch {
    // Keep the score history visible when per-question analysis is unavailable.
    practiceInsightsUnavailable = true;
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl px-6 py-16">
      <p className="text-sm font-medium uppercase tracking-wide text-stone-500">
        Zona privada
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">LinguaFly AI</h1>
      <p className="mt-4 text-lg leading-relaxed text-stone-600">
        Sesión iniciada como {session.user.email}.
      </p>

      {profileUnavailable ? (
        <p className="mt-6 text-sm text-stone-600">
          No se ha podido cargar el perfil. Comprueba que se ha aplicado la
          migración de la base D1 exclusiva de LinguaFly AI.
        </p>
      ) : (
        <>
          <section className="mt-6 space-y-2 text-sm text-stone-600">
            <h2 className="font-semibold text-stone-900">
              Preferencias actuales
            </h2>
            <p>Nivel de inglés: {profile?.cefr_level ?? "Por determinar"}.</p>
            <p>
              Idioma de las explicaciones:{" "}
              {explanationLanguageLabels[profile?.explanation_language ?? "es"] ??
                profile?.explanation_language ??
                "Español"}
              .
            </p>
            <p>
              Objetivo de aprendizaje:{" "}
              {profile?.learning_goal ?? "Aún no configurado"}.
            </p>
          </section>

          <section className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
            <p className="text-sm font-medium uppercase tracking-wide text-stone-500">
              Tu siguiente paso
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight">
              Practica inglés a tu nivel
            </h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Completa cinco preguntas, comprueba tus respuestas y aprende de las explicaciones en tu idioma.
            </p>
            <Link
              href="/app/practica"
              className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-stone-900 px-5 py-3 text-base font-medium text-white hover:bg-stone-800 sm:w-auto"
            >
              Empezar primera práctica
            </Link>
          </section>

          <section className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
            <p className="text-sm font-medium uppercase tracking-wide text-stone-500">
              Habla en inglés
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight">
              Conversa con tu tutor IA
            </h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Practica conversaciones por voz en tiempo real. El tutor se adapta a tu nivel,
              interpreta el escenario y te ofrece correcciones útiles mientras habláis.
            </p>
            <Link
              href="/app/conversacion"
              className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-stone-900 px-5 py-3 text-base font-medium text-white hover:bg-stone-800 sm:w-auto"
            >
              Empezar a conversar
            </Link>
          </section>

          <section className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
            <p className="text-sm font-medium uppercase tracking-wide text-stone-500">
              Tu progreso
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight">
              Historial de prácticas
            </h2>

            {practiceHistoryUnavailable ? (
              <p className="mt-3 text-sm leading-6 text-stone-600">
                El historial todavía no está disponible. Hay que aplicar la migración
                0002_practice_attempts.sql a la base D1 de LinguaFly AI.
              </p>
            ) : (
              <>
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-xl bg-stone-50 p-4">
                    <p className="text-sm text-stone-600">Prácticas completadas</p>
                    <p className="mt-1 text-2xl font-semibold tabular-nums">
                      {practiceSummary?.total_attempts ?? 0}
                    </p>
                  </div>
                  <div className="rounded-xl bg-stone-50 p-4">
                    <p className="text-sm text-stone-600">Media por práctica</p>
                    <p className="mt-1 text-2xl font-semibold tabular-nums">
                      {practiceSummary?.average_score == null
                        ? "—"
                        : `${practiceSummary.average_score.toLocaleString("es-ES", { maximumFractionDigits: 1, minimumFractionDigits: 1 })}/5`}
                    </p>
                  </div>
                  <div className="rounded-xl bg-stone-50 p-4">
                    <p className="text-sm text-stone-600">Mejor resultado</p>
                    <p className="mt-1 text-2xl font-semibold tabular-nums">
                      {practiceSummary?.best_score == null
                        ? "—"
                        : `${practiceSummary.best_score}/5`}
                    </p>
                  </div>
                </div>

                {recentPracticeAttempts.length === 0 ? (
                  <p className="mt-5 text-sm leading-6 text-stone-600">
                    Aún no tienes prácticas guardadas. Completa tu primera práctica
                    para empezar a ver tu evolución aquí.
                  </p>
                ) : (
                  <ol className="mt-5 divide-y divide-stone-200">
                    {recentPracticeAttempts.map((attempt) => (
                      <li
                        key={attempt.id}
                        className="flex items-center justify-between gap-4 py-4"
                      >
                        <div>
                          <p className="font-medium text-stone-900">
                            {new Date(attempt.completed_at).toLocaleString("es-ES", {
                              dateStyle: "medium",
                              timeStyle: "short",
                              timeZone: "Europe/Madrid",
                            })}
                          </p>
                          <p className="mt-1 text-sm text-stone-600">
                            Nivel {attempt.cefr_level ?? "A1"} · {attempt.total_questions} preguntas
                          </p>
                        </div>
                        <p className="shrink-0 text-lg font-semibold tabular-nums">
                          {attempt.score}/{attempt.total_questions}
                        </p>
                      </li>
                    ))}
                  </ol>
                )}
                {recentPracticeAttempts.length > 0 ? (
                  <p className="mt-2 text-xs text-stone-500">
                    Se muestran las 10 prácticas más recientes.
                  </p>
                ) : null}
              </>
            )}
          </section>

          <section className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
            <p className="text-sm font-medium uppercase tracking-wide text-stone-500">
              Aprendizaje personalizado
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight">
              Temas que conviene reforzar
            </h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Analizamos las respuestas de tus prácticas para identificar los contenidos que necesitan más repaso.
            </p>

            {practiceInsightsUnavailable ? (
              <p className="mt-4 text-sm leading-6 text-stone-600">
                El análisis por pregunta todavía no está disponible. Hay que aplicar la migración
                0003_practice_question_results.sql a la base D1 de LinguaFly AI.
              </p>
            ) : insightSummary.total_answers === 0 ? (
              <p className="mt-4 text-sm leading-6 text-stone-600">
                Completa una nueva práctica para empezar a detectar tus puntos fuertes y los temas que puedes reforzar.
              </p>
            ) : skillErrors.length === 0 ? (
              <p className="mt-4 text-sm leading-6 text-stone-600">
                ¡Buen trabajo! En las respuestas registradas no aparecen temas con errores. Sigue practicando para confirmar tu progreso.
              </p>
            ) : (
              <ol className="mt-5 space-y-3">
                {skillErrors.map((item) => (
                  <li key={item.skill} className="rounded-xl bg-stone-50 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-medium text-stone-900">
                        {skillLabels[item.skill] ?? item.skill}
                      </p>
                      <span className="shrink-0 text-sm font-semibold tabular-nums text-stone-700">
                        {item.incorrect_answers} {item.incorrect_answers === 1 ? "error" : "errores"}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-stone-600">
                      {item.correct_answers} aciertos de {item.total_answers} intentos en este tema.
                    </p>
                  </li>
                ))}
              </ol>
            )}

            <Link
              href="/app/practica"
              className="mt-5 inline-flex w-full items-center justify-center rounded-lg border border-stone-300 px-5 py-3 text-base font-medium text-stone-900 hover:bg-stone-100 sm:w-auto"
            >
              Practicar y revisar explicaciones
            </Link>
          </section>

          <LearningProfileForm
            initialCefrLevel={profile?.cefr_level ?? null}
            initialExplanationLanguage={profile?.explanation_language ?? "es"}
            initialLearningGoal={profile?.learning_goal ?? null}
          />
        </>
      )}

      <div className="mt-8">
        <SignOutButton />
      </div>
    </main>
  );
}
