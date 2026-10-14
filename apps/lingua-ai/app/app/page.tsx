import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { getAuth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

type Profile = {
  cefr_level: string | null;
  explanation_language: string;
  learning_goal: string | null;
};

export default async function PrivateHomePage() {
  let session: Awaited<ReturnType<Awaited<ReturnType<typeof getAuth>>["api"]["getSession"]>>;

  try {
    const auth = await getAuth();
    session = await auth.api.getSession({ headers: await headers() });
  } catch {
    redirect("/login?error=config");
  }

  if (!session?.user) {
    redirect("/login");
  }

  let profile: Profile | null = null;
  let profileUnavailable = false;

  try {
    const context = await getCloudflareContext({ async: true });
    const env = context.env as unknown as CloudflareEnv;

    // The profile key comes only from the validated server-side session.
    await env.AUTH_DB.prepare(
      "INSERT OR IGNORE INTO profiles (user_id) VALUES (?)",
    ).bind(session.user.id).run();

    profile = await env.AUTH_DB.prepare(
      "SELECT cefr_level, explanation_language, learning_goal FROM profiles WHERE user_id = ?",
    ).bind(session.user.id).first<Profile>();
  } catch {
    profileUnavailable = true;
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center px-6 py-16">
      <p className="text-sm font-medium uppercase tracking-wide text-stone-500">
        Zona privada
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">LinguaFly AI</h1>
      <p className="mt-4 text-lg leading-relaxed text-stone-600">
        Sesión iniciada como {session.user.email}.
      </p>
      {profileUnavailable ? (
        <p className="mt-4 text-sm text-stone-600">
          No se ha podido cargar el perfil. Comprueba que se ha aplicado la
          migración de la base D1 exclusiva de LinguaFly AI.
        </p>
      ) : (
        <section className="mt-6 space-y-2 text-sm text-stone-600">
          <p>Nivel de inglés: {profile?.cefr_level ?? "Por determinar"}.</p>
          <p>Idioma de las explicaciones: {profile?.explanation_language ?? "es"}.</p>
          <p>Objetivo de aprendizaje: {profile?.learning_goal ?? "Aún no configurado"}.</p>
        </section>
      )}
      <div className="mt-8">
        <SignOutButton />
      </div>
    </main>
  );
}
