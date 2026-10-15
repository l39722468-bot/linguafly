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
