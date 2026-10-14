import { redirect } from "next/navigation";
import { RegisterForm } from "@/components/auth/register-form";
import { getPublicSupabaseEnv } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function RegisterPage() {
  if (getPublicSupabaseEnv()) {
    const supabase = await createServerSupabaseClient();
    const { data } = await supabase.auth.getUser();
    if (data.user) redirect("/app");
  }

  return <RegisterForm />;
}
