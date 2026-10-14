import { NextResponse } from "next/server";
import { getAppOrigin } from "@/lib/auth/origin";
import { safeNextPath } from "@/lib/auth/paths";
import { getPublicSupabaseEnv } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const origin = getAppOrigin();
  if (!origin) {
    return new NextResponse("El acceso todavía no está configurado.", {
      status: 500,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const nextPath = safeNextPath(url.searchParams.get("next"));
  const loginUrl = new URL("/login", origin);
  loginUrl.searchParams.set("error", "auth");

  if (!code || code.length > 2048 || !getPublicSupabaseEnv()) {
    return NextResponse.redirect(loginUrl);
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.redirect(new URL(nextPath, origin));
}
