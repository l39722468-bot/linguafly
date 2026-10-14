import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { RegisterForm } from "@/components/auth/register-form";
import { getAuth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function RegisterPage() {
  try {
    const auth = await getAuth();
    const session = await auth.api.getSession({ headers: await headers() });
    if (session?.user) redirect("/app");
  } catch {
    // Keep the registration page visible if local Cloudflare bindings have
    // not been configured yet; the server action displays a safe error.
  }

  return <RegisterForm />;
}
