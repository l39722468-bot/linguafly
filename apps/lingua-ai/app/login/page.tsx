import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { authErrorMessage } from "@/lib/auth/errors";
import { safeNextPath } from "@/lib/auth/paths";
import { getAuth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;
  let signedIn = false;

  try {
    const auth = await getAuth();
    const session = await auth.api.getSession({ headers: await headers() });
    signedIn = Boolean(session?.user);
  } catch {
    // The form remains available and reports configuration errors on submit.
  }

  if (signedIn) redirect(safeNextPath(params.next));

  return (
    <LoginForm
      nextPath={safeNextPath(params.next)}
      notice={authErrorMessage(params.error)}
    />
  );
}
