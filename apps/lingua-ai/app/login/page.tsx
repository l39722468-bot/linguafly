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

  try {
    const auth = await getAuth();
    const session = await auth.api.getSession({ headers: await headers() });
    if (session?.user) redirect(safeNextPath(params.next));
  } catch (error) {
    // Next.js redirect signals must not be swallowed by this setup check.
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof (error as { digest?: unknown }).digest === "string" &&
      (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }
  }

  return (
    <LoginForm
      nextPath={safeNextPath(params.next)}
      notice={authErrorMessage(params.error)}
    />
  );
}
