import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { RealtimeConversation } from "@/components/conversation/realtime-conversation";
import { getAuth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

type ConversationProfile = {
  cefr_level: string | null;
  explanation_language: string;
};

export default async function ConversationPage() {
  const auth = await getAuth().catch(() => null);
  if (!auth) redirect("/login?error=config");

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/login");

  let profile: ConversationProfile | null = null;

  try {
    const context = await getCloudflareContext({ async: true });
    const env = context.env as unknown as CloudflareEnv;

    profile = await env.AUTH_DB.prepare(
      "SELECT cefr_level, explanation_language FROM profiles WHERE user_id = ?",
    )
      .bind(session.user.id)
      .first<ConversationProfile>();
  } catch {
    // The session can start with A1/Spanish defaults while a new profile is initialized.
  }

  return (
    <RealtimeConversation
      cefrLevel={profile?.cefr_level ?? null}
      explanationLanguage={profile?.explanation_language ?? "es"}
    />
  );
}
