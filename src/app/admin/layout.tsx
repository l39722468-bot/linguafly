import Link from "next/link";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/client";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

async function assertAdminAccess() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/cuenta/login-admin?next=/admin");
  }

  let role: string | null = null;

  if (supabaseAdmin) {
    const { data: profile } = await supabaseAdmin
      .from("user_profiles")
      .select("role")
      .eq("user_id", user.id)
      .maybeSingle();
    role = profile?.role ?? null;

    // Fallback por email (por si hubiera filas duplicadas/desalineadas)
    if (role !== "admin" && user.email) {
      const { data: byEmail } = await supabaseAdmin
        .from("user_profiles")
        .select("role,user_id")
        .ilike("email", user.email)
        .limit(5);

      const adminRow = (byEmail || []).find((r) => r.role === "admin");
      if (adminRow) {
        role = "admin";
        // Reparar user_id si estaba desalineado
        if (adminRow.user_id !== user.id) {
          await supabaseAdmin.from("user_profiles").upsert(
            {
              user_id: user.id,
              email: user.email,
              name: "Administrador Linguafly",
              role: "admin",
              subscription_status: "active",
              subscription_plan: "premium",
            },
            { onConflict: "user_id" }
          );
        }
      }
    }

    // Si sigue sin role admin, forzar reparación para admin@linguafly.app
    if (role !== "admin" && user.email?.toLowerCase() === "admin@linguafly.app") {
      await supabaseAdmin.from("user_profiles").upsert(
        {
          user_id: user.id,
          email: user.email,
          name: "Administrador Linguafly",
          role: "admin",
          subscription_status: "active",
          subscription_plan: "premium",
        },
        { onConflict: "user_id" }
      );
      role = "admin";
    }
  }

  if (role !== "admin") {
    redirect("/cuenta/login-admin?error=forbidden&next=/admin");
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await assertAdminAccess();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-900 to-coral-500 text-white flex items-center justify-center font-black">
              A
            </div>
            <div>
              <div className="font-black text-slate-900 leading-tight">Admin Panel</div>
              <div className="text-xs text-slate-500 leading-tight">Alumnos · Progreso · Tickets</div>
            </div>
          </div>

          <nav className="flex items-center gap-2 text-sm font-semibold">
            <Link href="/admin/alumnos" className="px-3 py-2 rounded-lg hover:bg-slate-100 transition">
              Alumnos
            </Link>
            <Link href="/admin/a1-analytics" className="px-3 py-2 rounded-lg hover:bg-slate-100 transition">
              Progreso
            </Link>
            <Link href="/admin/tickets" className="px-3 py-2 rounded-lg hover:bg-slate-100 transition">
              Tickets
            </Link>
            <Link href="/admin/courses" className="px-3 py-2 rounded-lg hover:bg-slate-100 transition">
              Cursos
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
