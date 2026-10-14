import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { authErrorMessage } from "@/lib/auth/errors";
import { safeNextPath } from "@/lib/auth/paths";
import { getPublicSupabaseEnv } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;

  if (getPublicSupabaseEnv()) {
    const supabase = await createServerSupabaseClient();
    const { data } = await supabase.auth.getUser();
    if (data.user) redirect(safeNextPath(params.next));
  }

  return (
    <LoginForm
      nextPath={safeNextPath(params.next)}
      notice={authErrorMessage(params.error)}
    />
  );
}
