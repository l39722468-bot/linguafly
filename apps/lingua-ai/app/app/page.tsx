import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { getPublicSupabaseEnv } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function PrivateHomePage() {
  if (!getPublicSupabaseEnv()) {
    redirect("/login?error=config");
  }

  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) {
    redirect("/login");
  }

  const profileResult = await supabase
    .from("profiles")
    .select("cefr_level, explanation_language, learning_goal")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center px-6 py-16">
      <p className="text-sm font-medium uppercase tracking-wide text-stone-500">
        Zona privada
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">LinguaFly AI</h1>
      <p className="mt-4 text-lg leading-relaxed text-stone-600">
        Sesión iniciada como {user.email}.
      </p>
      {profileResult.error ? (
        <p className="mt-4 text-sm text-stone-600">
          El perfil todavía no está disponible. Aplica la migración de perfiles
          en Supabase para crearlo.
        </p>
      ) : (
        <p className="mt-4 text-sm text-stone-600">
          Idioma de las explicaciones:{" "}
          {profileResult.data?.explanation_language ?? "es"}.
        </p>
      )}
      <div className="mt-8">
        <SignOutButton />
      </div>
    </main>
  );
}
