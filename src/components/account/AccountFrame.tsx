import Link from "next/link";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";

export function AccountFrame({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-50 px-4 pb-20 pt-28">
        <div className="mx-auto max-w-lg rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-xs font-bold uppercase tracking-wider text-coral-600">Linguafly</p>
          <h1 className="mt-2 font-display text-3xl font-black text-slate-900">{title}</h1>
          {subtitle ? <p className="mt-3 text-slate-600">{subtitle}</p> : null}
          <div className="mt-8">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export function AccountError({ code }: { code?: string }) {
  const message = accountErrorMessage(code);
  if (!message) return null;
  return (
    <p className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      {message}
    </p>
  );
}

export function accountErrorMessage(code?: string): string | null {
  switch (code) {
    case "credenciales":
      return "El correo o la contraseña no coinciden.";
    case "existe":
      return "Ya hay una cuenta con ese correo. Entra con ella.";
    case "datos":
      return "Revisa el correo y usa una contraseña de al menos 8 caracteres.";
    case "config":
      return "El acceso de lectores todavía no está configurado en el servidor.";
    case "stripe":
      return "Stripe no ha podido completar la operación. Revisa la configuración y vuelve a intentarlo.";
    case "portal":
      return "El portal de cliente de Stripe no está disponible. Actívalo en el panel de Stripe.";
    case "limite":
      return "Demasiados intentos. Espera unos minutos y vuelve a probar.";
    case "entra":
      return "El pago está registrado. Entra con tu cuenta para abrir los artículos premium.";
    default:
      return null;
  }
}

export const fieldClass =
  "mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none ring-coral-200 focus:ring-2";

export const buttonClass =
  "inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-coral-500 to-peach-500 px-5 py-3 text-sm font-black text-white hover:opacity-90";
