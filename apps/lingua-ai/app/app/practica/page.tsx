import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { PracticeSession } from "@/components/practice/practice-session";
import { getAuth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

type PracticeProfile = {
  cefr_level: string | null;
  explanation_language: string;
};

export default async function PracticePage() {
  const auth = await getAuth().catch(() => null);
  if (!auth) redirect("/login?error=config");

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/login");

  let profile: PracticeProfile | null = null;

  try {
    const context = await getCloudflareContext({ async: true });
    const env = context.env as unknown as CloudflareEnv;

    profile = await env.AUTH_DB.prepare(
      "SELECT cefr_level, explanation_language FROM profiles WHERE user_id = ?",
    )
      .bind(session.user.id)
      .first<PracticeProfile>();
  } catch {
    // The first exercise can still run with beginner-level defaults if profile
    // data is temporarily unavailable. The dashboard reports profile failures.
  }

  return (
    <PracticeSession
      cefrLevel={profile?.cefr_level ?? null}
      explanationLanguage={profile?.explanation_language ?? "es"}
    />
  );
}
