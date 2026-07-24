"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Mode = "general" | "reset";

export default function SupportTicketClient() {
  const searchParams = useSearchParams();
  const initialMode: Mode =
    searchParams.get("type") === "practice" || searchParams.get("type") === "exam"
      ? "reset"
      : "general";

  const [mode, setMode] = useState<Mode>(initialMode);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const [goal, setGoal] = useState("emailing");
  const [level, setLevel] = useState("b1");
  const [weekId, setWeekId] = useState("semana-01");
  const [type, setType] = useState<"practice" | "exam">("practice");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [myTickets, setMyTickets] = useState<
    Array<{ id: string; subject: string; status: string; created_at: string }>
  >([]);

  const resetTicketText = useMemo(() => {
    return [
      "RESET REQUEST (manual)",
      `Type: ${type}`,
      `Goal: ${goal}`,
      `Level: ${level}`,
      `Week: ${weekId}`,
      "",
      "Context:",
      "- I have exhausted the allowed reset cycles.",
      "- Please decide whether to grant extra resets or move me to a lower level.",
      "",
      "Notes:",
      notes || "(none)",
    ].join("\n");
  }, [goal, level, weekId, type, notes]);

  useEffect(() => {
    const t = searchParams.get("type");
    const g = searchParams.get("goal");
    const l = searchParams.get("level");
    const w = searchParams.get("week");

    if (t === "practice" || t === "exam") {
      setType(t);
      setMode("reset");
    }
    if (g) setGoal(g);
    if (l) setLevel(l);
    if (w) setWeekId(w);
  }, [searchParams]);

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/support/ticket");
        if (res.status === 401) {
          setIsLoggedIn(false);
          return;
        }
        if (res.ok) {
          setIsLoggedIn(true);
          const data = await res.json();
          setMyTickets(data.tickets ?? []);
        } else {
          setIsLoggedIn(false);
        }
      } catch {
        setIsLoggedIn(false);
      }
    }
    checkSession();
  }, []);

  async function submitTicket() {
    if (submitting) return;
    setSubmitting(true);
    setTicketId(null);
    setError(null);

    try {
      const payload =
        mode === "reset"
          ? {
              subject: `Support ticket - reset - ${type} - ${goal} - ${level}`,
              content: resetTicketText,
              category: "reset",
              email: isLoggedIn ? undefined : email,
              firstName: isLoggedIn ? undefined : firstName,
              lastName: isLoggedIn ? undefined : lastName,
            }
          : {
              subject,
              content: message,
              category: "general",
              email: isLoggedIn ? undefined : email,
              firstName: isLoggedIn ? undefined : firstName,
              lastName: isLoggedIn ? undefined : lastName,
            };

      if (!isLoggedIn && !payload.email) {
        setError("Indica tu email para que podamos responderte.");
        return;
      }
      if (mode === "general" && (!payload.subject || !payload.content)) {
        setError("Asunto y mensaje son obligatorios.");
        return;
      }

      const res = await fetch("/api/support/ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || "No se pudo enviar el ticket.");
        return;
      }

      setTicketId(data?.ticketId ?? null);
      setSubject("");
      setMessage("");
      setNotes("");
      if (isLoggedIn) {
        const listRes = await fetch("/api/support/ticket");
        if (listRes.ok) {
          const listData = await listRes.json();
          setMyTickets(listData.tickets ?? []);
        }
      }
    } catch {
      setError("Error al enviar el ticket.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <nav className="text-[12px] font-extrabold text-slate-500">
        <Link className="hover:text-slate-700" href="/">
          Home
        </Link>{" "}
        / <span className="text-slate-700">Soporte</span>
      </nav>

      <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
        Centro de soporte
      </h1>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Envía tu consulta. Si no tienes cuenta, indícanos tu email y te responderemos
        por el sistema de tickets. Si eres alumno, queda vinculado a tu perfil.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setMode("general")}
          className={[
            "px-4 py-2 rounded-xl text-sm font-bold border",
            mode === "general"
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white text-slate-700 border-slate-200",
          ].join(" ")}
        >
          Consulta general
        </button>
        <button
          type="button"
          onClick={() => setMode("reset")}
          className={[
            "px-4 py-2 rounded-xl text-sm font-bold border",
            mode === "reset"
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white text-slate-700 border-slate-200",
          ].join(" ")}
        >
          Solicitar reset
        </button>
      </div>

      {isLoggedIn === false && (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          No has iniciado sesión. Puedes enviar la consulta como visitante indicando tu email.{" "}
          <Link href="/cuenta/login?next=/support/ticket" className="font-bold underline">
            Iniciar sesión
          </Link>{" "}
          o{" "}
          <Link href="/contacto" className="font-bold underline">
            ir a Contacto
          </Link>
          .
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {ticketId && (
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Ticket enviado correctamente. ID: <span className="font-mono font-bold">{ticketId}</span>
        </div>
      )}

      <div className="mt-6 grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {isLoggedIn === false && (
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm font-black text-slate-800">
              Nombre
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-semibold"
              />
            </label>
            <label className="text-sm font-black text-slate-800">
              Apellidos
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-semibold"
              />
            </label>
            <label className="text-sm font-black text-slate-800 sm:col-span-2">
              Email (para responderte) *
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-semibold"
                placeholder="tu@email.com"
              />
            </label>
          </div>
        )}

        {mode === "general" ? (
          <>
            <label className="text-sm font-black text-slate-800">
              Asunto *
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-semibold"
                placeholder="¿En qué podemos ayudarte?"
              />
            </label>
            <label className="text-sm font-black text-slate-800">
              Mensaje *
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={7}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold"
                placeholder="Cuéntanos tu duda o incidencia..."
              />
            </label>
          </>
        ) : (
          <>
            <div className="grid gap-2 sm:grid-cols-2">
              <label className="text-sm font-black text-slate-800">
                Goal
                <input
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-semibold"
                />
              </label>
              <label className="text-sm font-black text-slate-800">
                Level
                <input
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-semibold"
                />
              </label>
              <label className="text-sm font-black text-slate-800">
                Week
                <input
                  value={weekId}
                  onChange={(e) => setWeekId(e.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-semibold"
                />
              </label>
              <label className="text-sm font-black text-slate-800">
                Type
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as "practice" | "exam")}
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-semibold"
                >
                  <option value="practice">practice</option>
                  <option value="exam">exam</option>
                </select>
              </label>
            </div>
            <label className="text-sm font-black text-slate-800">
              Notas
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold"
              />
            </label>
            <pre className="overflow-auto rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs text-slate-700 whitespace-pre-wrap">
              {resetTicketText}
            </pre>
          </>
        )}

        <button
          type="button"
          onClick={submitTicket}
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-60"
        >
          {submitting ? "Enviando..." : "Enviar ticket"}
        </button>
      </div>

      {isLoggedIn && myTickets.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-black text-slate-900">Tus consultas</h2>
          <div className="mt-3 space-y-2">
            {myTickets.map((t) => (
              <div
                key={t.id}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 flex items-center justify-between gap-3"
              >
                <div>
                  <div className="font-semibold text-slate-800">{t.subject}</div>
                  <div className="text-xs text-slate-500">
                    {new Date(t.created_at).toLocaleString("es-ES")}
                  </div>
                </div>
                <span className="text-xs font-bold uppercase text-slate-600">{t.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
