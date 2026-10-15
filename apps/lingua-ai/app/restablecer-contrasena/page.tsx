import { redirect } from "next/navigation";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const dynamic = "force-dynamic";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  if (!token || token.length > 2048) {
    redirect("/recuperar-contrasena");
  }

  return <ResetPasswordForm token={token} />;
}
