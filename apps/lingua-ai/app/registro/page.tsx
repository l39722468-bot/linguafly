import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { RegisterForm } from "@/components/auth/register-form";
import { getAuth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function RegisterPage() {
  let signedIn = false;
  try {
    const auth = await getAuth();
    const session = await auth.api.getSession({ headers: await headers() });
    signedIn = Boolean(session?.user);
  } catch {
    // Keep this page visible when local Cloudflare bindings are not ready.
  }

  if (signedIn) redirect("/app");
  return <RegisterForm />;
}
