"use client";

import { useState } from "react";
import Link from "next/link";

type Props = {
  initialName: string;
  email: string;
  languageLevel: string;
  subscriptionStatus: string;
  subscriptionPlan: string;
  subscriptionStartDate: string | null;
  isPaid: boolean;
  billingAlert?: string | null;
};

const STATUS_ES: Record<string, string> = {
  active: "Activa",
  inactive: "Inactiva",
  cancelled: "Cancelada",
  canceled: "Cancelada",
  trialing: "Periodo de prueba",
  past_due: "Pago pendiente",
};

const PLAN_ES: Record<string, string> = {
  free: "Gratis",
  basic: "Básico (5,99 €/mes)",
  premium: "Premium",
  enterprise: "Enterprise",
};

export default function AccountSettingsClient({
  initialName,
  email,
  languageLevel,
  subscriptionStatus,
  subscriptionPlan,
  subscriptionStartDate,
  isPaid,
  billingAlert,
}: Props) {
  const [name, setName] = useState(initialName);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function saveName() {
    if (saving) return;
    setSaving(true);
    setError(null);
    setSavedMsg(null);
    try {
      const res = await fetch("/api/profile/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || "No se pudo guardar el nombre.");
        return;
      }
      setName(data.name || name.trim());
      setSavedMsg("Datos guardados.");
    } catch {
      setError("Error al guardar.");
    } finally {
      setSaving(false);
    }
  }

  const statusLabel = STATUS_ES[subscriptionStatus] || subscriptionStatus;
  const planLabel = PLAN_ES[subscriptionPlan] || subscriptionPlan;

  return (
    <div className="space-y-6">
      {billingAlert && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {billingAlert}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
      {savedMsg && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {savedMsg}
        </div>
      )}

      <section className="bg-white border border-slate-200 rounded-2xl p-6">
        <h2 className="text-lg font-black text-slate-900">Datos del alumno</h2>
        <p className="text-sm text-slate-600 mt-1">Tu información de cuenta en Linguafly.</p>

        <div className="mt-5 space-y-4 max-w-md">
          <label className="block text-sm font-bold text-slate-800">
            Nombre
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm"
            />
          </label>

          <div>
            <p className="text-sm font-bold text-slate-800">Email</p>
            <p className="mt-1 text-sm text-slate-700">{email}</p>
            <p className="mt-1 text-xs text-slate-500">
              Para cambiar el email, escribe a soporte.
            </p>
          </div>

          <div>
            <p className="text-sm font-bold text-slate-800">Nivel</p>
            <p className="mt-1 text-sm text-slate-700">{languageLevel}</p>
          </div>

          <button
            type="button"
            onClick={saveName}
            disabled={saving || name.trim().length < 2}
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-60"
          >
            {saving ? "Guardando..." : "Guardar datos"}
          </button>

          <div className="pt-2">
            <Link
              href="/cuenta/recuperar"
              className="text-sm font-semibold text-slate-700 underline hover:text-slate-900"
            >
              Cambiar o recuperar contraseña
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white border border-slate-200 rounded-2xl p-6">
        <h2 className="text-lg font-black text-slate-900">Facturación</h2>
        <p className="text-sm text-slate-600 mt-1">Estado de tu suscripción y pagos.</p>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Estado</p>
            <p className="mt-1 font-bold text-slate-900">{statusLabel}</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Plan</p>
            <p className="mt-1 font-bold text-slate-900">{planLabel}</p>
          </div>
          {subscriptionStartDate && (
            <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 sm:col-span-2">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Alta de suscripción
              </p>
              <p className="mt-1 font-bold text-slate-900">
                {new Date(subscriptionStartDate).toLocaleDateString("es-ES")}
              </p>
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {isPaid ? (
            <>
              <a
                href="/api/stripe/customer-portal"
                className="inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800"
              >
                Ver facturas y método de pago
              </a>
              <a
                href="/api/stripe/customer-portal?intent=cancel"
                className="inline-flex rounded-xl border border-red-300 bg-white px-5 py-2.5 text-sm font-bold text-red-700 hover:bg-red-50"
              >
                Cancelar suscripción
              </a>
            </>
          ) : (
            <Link
              href="/planes"
              className="inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800"
            >
              Activar suscripción
            </Link>
          )}
        </div>

        {isPaid && (
          <p className="mt-3 text-xs text-slate-500">
            La cancelación se gestiona de forma segura en Stripe. Conservarás el acceso hasta el final
            del periodo ya pagado, según la configuración de tu plan.
          </p>
        )}
      </section>
    </div>
  );
}
