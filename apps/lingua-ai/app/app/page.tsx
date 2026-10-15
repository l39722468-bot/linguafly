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
