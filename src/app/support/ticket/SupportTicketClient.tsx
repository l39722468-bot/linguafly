"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CATEGORIES = [
  { id: "facturacion", label: "Facturación" },
  { id: "cuentas", label: "Cuentas / contraseñas" },
  { id: "cursos", label: "Cursos" },
  { id: "otros", label: "Otros" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

type TicketRow = {
  id: string;
  subject: string;
  message?: string;
  status: string;
  created_at: string;
  category?: string;
  admin_reply?: string | null;
  replied_at?: string | null;
};

const STATUS_LABEL: Record<string, string> = {
  open: "Abierto",
  answered: "Respondido",
  closed: "Cerrado",
};

export default function SupportTicketClient() {
  const [category, setCategory] = useState<CategoryId>("cursos");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [myTickets, setMyTickets] = useState<TicketRow[]>([]);
  const [ticketsLoaded, setTicketsLoaded] = useState(false);

  async function loadMyTickets() {
    try {
      const res = await fetch("/api/support/ticket");
      if (res.status === 401) {
        setIsLoggedIn(false);
        setMyTickets([]);
        setTicketsLoaded(true);
        return;
      }
      if (!res.ok) {
        setIsLoggedIn(false);
        setMyTickets([]);
        setTicketsLoaded(true);
        return;
      }
      setIsLoggedIn(true);
      const data = await res.json();
      const rows = Array.isArray(data.tickets) ? (data.tickets as TicketRow[]) : [];
      setMyTickets(rows.filter((t) => t?.id && t?.created_at));
    } catch {
      setIsLoggedIn(false);
      setMyTickets([]);
    } finally {
      setTicketsLoaded(true);
    }
  }

  useEffect(() => {
    loadMyTickets();
  }, []);

  async function submitTicket() {
    if (submitting) return;
    setSubmitting(true);
    setTicketId(null);
    setError(null);

    try {
      const categoryLabel = CATEGORIES.find((c) => c.id === category)?.label || "Otros";
      const trimmed = message.trim();
      if (!trimmed) {
        setError("Escribe tu mensaje.");
        return;
      }
      if (!isLoggedIn && !email.trim()) {
        setError("Indica tu email para que podamos responderte.");
        return;
      }

      const res = await fetch("/api/support/ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: categoryLabel,
          content: trimmed,
          category,
          email: isLoggedIn ? undefined : email.trim().toLowerCase(),
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || "No se pudo enviar el ticket.");
        return;
      }

      setTicketId(data?.ticketId ?? null);
      setMessage("");
      if (isLoggedIn) {
        await loadMyTickets();
      }
    } catch {
      setError("Error al enviar el ticket.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-14">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-black tracking-tight text-slate-900">Soporte</h1>
        <Link href="/mi-panel" className="text-sm font-semibold text-slate-600 hover:text-slate-900">
          Volver al panel
        </Link>
      </div>

      {isLoggedIn === false && (
        <p className="mt-3 text-sm text-slate-600">
          Sin sesión: indica tu email para que podamos responderte.
        </p>
      )}

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {ticketId && (
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Enviado. Nº de ticket: <span className="font-mono font-bold">{ticketId}</span>
        </div>
      )}

      <div className="mt-6 space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
        {isLoggedIn === false && (
          <label className="block text-sm font-bold text-slate-800">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm"
              required
            />
          </label>
        )}

        <label className="block text-sm font-bold text-slate-800">
          Tema
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as CategoryId)}
            className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm bg-white"
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-bold text-slate-800">
          Mensaje
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          />
        </label>

        <button
          type="button"
          onClick={submitTicket}
          disabled={submitting}
          className="w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-60"
        >
          {submitting ? "Enviando..." : "Enviar"}
        </button>
      </div>

      {isLoggedIn && ticketsLoaded && myTickets.length > 0 && (
        <div className="mt-8">
          <h2 className="text-base font-black text-slate-900">Tus consultas</h2>
          <p className="mt-1 text-xs text-slate-500">Solo tickets enviados desde tu cuenta.</p>
          <div className="mt-3 space-y-2">
            {myTickets.map((t) => {
              const preview = (t.message || t.subject || "").trim();
              const statusLabel = STATUS_LABEL[t.status] || t.status;
              return (
                <div key={t.id} className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-xs font-bold uppercase tracking-wide text-slate-500">
                        {t.subject || t.category || "Consulta"}
                      </div>
                      <div className="mt-1 text-sm font-semibold text-slate-800 whitespace-pre-wrap break-words">
                        {preview.length > 220 ? `${preview.slice(0, 220)}…` : preview}
                      </div>
                      <div className="mt-1 text-xs text-slate-500">
                        {new Date(t.created_at).toLocaleString("es-ES")}
                      </div>
                      {t.admin_reply && (
                        <div className="mt-2 rounded-lg bg-slate-50 border border-slate-100 px-3 py-2 text-xs text-slate-700">
                          <span className="font-bold">Respuesta: </span>
                          {t.admin_reply}
                        </div>
                      )}
                    </div>
                    <span className="shrink-0 text-xs font-bold uppercase text-slate-600">
                      {statusLabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
}
