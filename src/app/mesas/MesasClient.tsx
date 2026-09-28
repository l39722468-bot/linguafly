"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { PartyLevel, PublicTable } from "@/lib/party/types";
import { PARTY_LEVELS, TURN_MS } from "@/lib/party/types";

const LEVEL_COPY: Record<PartyLevel, { title: string; line: string }> = {
  A1: { title: "A1", line: "Saludos, to be, frases cortas" },
  A2: { title: "A2", line: "Pasado, planes y cantidades" },
  B1: { title: "B1", line: "Perfecto, condicional, hábitos" },
  B2: { title: "B2", line: "Matices, wish y condicional" },
  C1: { title: "C1", line: "Inversión, énfasis y registro" },
};

export default function MesasClient() {
  const params = useSearchParams();
  const codeFromUrl = (params.get("mesa") ?? "").toUpperCase();
  const [playerId, setPlayerId] = useState("");
  const [name, setName] = useState("");
  const [level, setLevel] = useState<PartyLevel>("A1");
  const [table, setTable] = useState<PublicTable | null>(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const [clockSkew, setClockSkew] = useState(0);

  useEffect(() => {
    const key = "linguafly-mesa-player";
    const saved = window.localStorage.getItem(key);
    const id = saved && /^[a-zA-Z0-9-]{8,80}$/.test(saved) ? saved : crypto.randomUUID();
    window.localStorage.setItem(key, id);
    setPlayerId(id);
    const sitting = window.sessionStorage.getItem("linguafly-mesa-table");
    if (sitting) setTable({ id: sitting } as PublicTable);
  }, []);

  useEffect(() => {
    if (!table?.serverNow) return;
    setClockSkew(Date.now() - table.serverNow);
  }, [table?.serverNow]);

  const refresh = useCallback(async (tableId: string, currentPlayer: string) => {
    const response = await fetch(
      `/api/mesas?tableId=${encodeURIComponent(tableId)}&playerId=${encodeURIComponent(currentPlayer)}`,
      { cache: "no-store" },
    );
    const body = (await response.json()) as { table?: PublicTable; error?: string };
    if (!response.ok || !body.table) {
      window.sessionStorage.removeItem("linguafly-mesa-table");
      setTable(null);
      if (body.error) setError(body.error);
      return;
    }
    setTable(body.table);
    setError("");
  }, []);

  useEffect(() => {
    if (!playerId || !table?.id || table.level) return;
    void refresh(table.id, playerId);
  }, [playerId, refresh, table?.id, table?.level]);

  useEffect(() => {
    if (!playerId || !table?.id || !table.level) return;
    const timer = window.setInterval(() => {
      void refresh(table.id, playerId);
    }, 800);
    return () => window.clearInterval(timer);
  }, [playerId, refresh, table?.id, table?.level]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 100);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (table?.phase !== "ranking") return;
    let cancelled = false;
    void import("canvas-confetti").then(({ default: confetti }) => {
      if (!cancelled) {
        confetti({ particleCount: 90, spread: 72, origin: { y: 0.35 }, colors: ["#FF6B6B", "#FFA06B", "#FBBF24"] });
      }
    });
    return () => {
      cancelled = true;
    };
  }, [table?.phase, table?.id, table?.turnIndex]);

  async function send(action: string, extra: Record<string, unknown> = {}) {
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/mesas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, playerId, tableId: table?.id, ...extra }),
      });
      const body = (await response.json()) as { table?: PublicTable | null; error?: string };
      if (!response.ok) {
        setError(body.error || "No se ha podido completar la jugada.");
        return;
      }
      if (!body.table) {
        window.sessionStorage.removeItem("linguafly-mesa-table");
        setTable(null);
        return;
      }
      window.sessionStorage.setItem("linguafly-mesa-table", body.table.id);
      window.history.replaceState(null, "", `/mesas?mesa=${body.table.code}`);
      setTable(body.table);
    } catch {
      setError("Sin conexión con la mesa.");
    } finally {
      setPending(false);
    }
  }

  const restoring = Boolean(table && !table.level);
  const seated = Boolean(table?.level);
  const secondsLeft = useMemo(() => {
    if (!table?.turnEndsAt || table.phase !== "turn") return 0;
    return Math.max(0, Math.ceil((table.turnEndsAt - (now - clockSkew)) / 1000));
  }, [clockSkew, now, table?.phase, table?.turnEndsAt]);

  return (
    <main className="min-h-screen text-white" style={{ background: "radial-gradient(circle at 15% 0%, rgba(255,107,107,.38), transparent 36%), radial-gradient(circle at 90% 90%, rgba(255,160,107,.28), transparent 32%), #161326" }}>
      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5">
        <Link href="/" className="text-sm font-black tracking-wide text-white/80">
          Linguafly
        </Link>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-peach-200">Mesas</p>
      </header>
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 pb-36">
        {error ? (
          <p className="rounded-2xl bg-coral-700/90 px-4 py-3 text-sm font-bold" role="alert">
            {error}
          </p>
        ) : null}
        {restoring ? (
          <p className="text-lg font-bold">Volviendo a la mesa…</p>
        ) : !seated ? (
          <Gate
            name={name}
            level={level}
            code={codeFromUrl}
            pending={pending || !playerId}
            onName={setName}
            onLevel={setLevel}
            onEnter={() =>
              void send("enter", codeFromUrl ? { name, code: codeFromUrl } : { name, level })
            }
          />
        ) : table?.phase === "lobby" ? (
          <Lobby table={table} pending={pending} onStart={() => void send("start")} onLeave={() => void send("leave")} />
        ) : table?.phase === "ranking" ? (
          <Ranking table={table} pending={pending} onRematch={() => void send("rematch")} onLeave={() => void send("leave")} />
        ) : table ? (
          <Stage
            table={table}
            secondsLeft={secondsLeft}
            pending={pending}
            onAnswer={(optionIndex) => void send("answer", { optionIndex })}
          />
        ) : null}
      </div>
    </main>
  );
}

function Gate(props: {
  name: string;
  level: PartyLevel;
  code: string;
  pending: boolean;
  onName: (value: string) => void;
  onLevel: (level: PartyLevel) => void;
  onEnter: () => void;
}) {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.18em] text-peach-200">Partida de inglés</p>
        <h1 className="mt-3 font-heading text-5xl font-black leading-none sm:text-7xl">
          Elige nivel.
          <span className="block text-coral-300">Siéntate.</span>
        </h1>
          <p className="mt-5 max-w-xl text-lg text-white/80">
          La mesa juega tantas actividades como personas hay sentadas. Si entras solo, se sientan jugadores automáticos para que la partida no se quede vacía. Cada persona resuelve un ejercicio. Al final sale el ranking.
        </p>
        <ol className="mt-6 grid gap-3 sm:grid-cols-3">
          {["Entras con tu nivel", "Te toca un ejercicio", "Cierras con el ranking"].map((step, index) => (
            <li key={step} className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold">
              <span className="mr-2 text-coral-300">{index + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </div>
      <form
        className="rounded-[2rem] bg-[#FFF8F3] p-5 text-slate-900 shadow-coral-lg sm:p-7"
        onSubmit={(event) => {
          event.preventDefault();
          props.onEnter();
        }}
      >
        <label className="block text-sm font-black" htmlFor="mesa-name">
          Cómo te llamas en la mesa
        </label>
        <input
          id="mesa-name"
          value={props.name}
          onChange={(event) => props.onName(event.target.value)}
          maxLength={16}
          placeholder="Ana"
          className="mt-2 w-full rounded-2xl border-2 border-slate-200 px-4 py-3 text-lg font-bold outline-none focus:border-coral-500"
        />
        {props.code ? (
          <p className="mt-4 text-sm font-bold text-slate-600">
            Te sientas en la mesa <span className="text-slate-900">{props.code}</span>. El nivel ya lo eligió quien la abrió.
          </p>
        ) : (
          <fieldset className="mt-5">
            <legend className="text-sm font-black">Nivel</legend>
            <div className="mt-2 grid grid-cols-1 gap-2">
              {PARTY_LEVELS.map((item) => {
                const selected = props.level === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => props.onLevel(item)}
                    className={`flex items-center justify-between rounded-2xl border-2 px-4 py-3 text-left ${selected ? "border-coral-500 bg-coral-50" : "border-slate-200 bg-white"}`}
                    aria-pressed={selected}
                  >
                    <span className="font-heading text-2xl font-black">{LEVEL_COPY[item].title}</span>
                    <span className="text-sm font-bold text-slate-600">{LEVEL_COPY[item].line}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}
        <button
          type="submit"
          disabled={props.pending || props.name.trim().length < 2}
          className="mt-5 w-full rounded-full bg-coral-500 px-5 py-4 font-heading text-lg font-black text-white disabled:opacity-50"
        >
          {props.code ? "Sentarme" : "Buscar mesa"}
        </button>
      </form>
    </section>
  );
}

function Lobby(props: { table: PublicTable; pending: boolean; onStart: () => void; onLeave: () => void }) {
  const { table } = props;
  return (
    <section className="rounded-[2rem] bg-white/10 p-5 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-peach-200">Mesa {table.code}</p>
          <h1 className="font-heading text-4xl font-black sm:text-5xl">Nivel {table.level}</h1>
          <p className="mt-2 max-w-xl text-white/80">
            Si empezáis ahora, la partida tiene {table.activityCount} {table.activityCount === 1 ? "actividad" : "actividades"}, una por persona. Quien lleva la marca auto responde solo.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void navigator.clipboard?.writeText(`${window.location.origin}/mesas?mesa=${table.code}`)}
          className="rounded-full bg-white px-4 py-2 text-sm font-black text-slate-900"
        >
          Copiar enlace
        </button>
      </div>
      <SeatRail table={table} />
      <div className="mt-8 flex flex-wrap gap-3">
        {table.youAreHost ? (
          <button type="button" onClick={props.onStart} disabled={props.pending} className="rounded-full bg-coral-500 px-6 py-4 font-heading text-lg font-black disabled:opacity-50">
            Empezar partida
          </button>
        ) : (
          <p className="rounded-full bg-white/10 px-5 py-4 font-bold">Esperando a que abra la partida quien llegó primero.</p>
        )}
        <button type="button" onClick={props.onLeave} className="rounded-full px-5 py-4 font-bold text-white/80">
          Levantarme
        </button>
      </div>
    </section>
  );
}

function Stage(props: {
  table: PublicTable;
  secondsLeft: number;
  pending: boolean;
  onAnswer: (optionIndex: number) => void;
}) {
  const { table } = props;
  const exercise = table.exercise;
  const reveal = table.phase === "reveal";
  const active = table.seats.find((seat) => seat.isTurn);
  const ratio = table.phase === "turn" ? props.secondsLeft / (TURN_MS / 1000) : 0;
  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="font-heading text-xl font-black">
          Actividad {Math.min(table.turnIndex + 1, table.activityCount)} de {table.activityCount}
        </p>
        <p className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">
          {table.level} · mesa {table.code}
        </p>
      </div>
      <SeatRail table={table} />
      <div className="mt-5 rounded-[2rem] bg-[#FFF8F3] p-5 text-slate-900 sm:p-8">
        <div className="mb-4 h-3 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-coral-500 transition-all" style={{ width: `${Math.max(0, Math.min(100, ratio * 100))}%` }} />
        </div>
        <p className="text-sm font-black uppercase tracking-[0.16em] text-coral-700">
          {reveal ? "Respuesta" : table.yourTurn ? "Te toca" : `Turno de ${active?.name ?? "la mesa"}`}
          {table.phase === "turn" ? ` · ${props.secondsLeft}s` : ""}
        </p>
        <h2 className="mt-2 font-heading text-3xl font-black leading-tight sm:text-5xl">{exercise?.prompt}</h2>
        <p className="mt-2 text-sm font-bold text-slate-500">{exercise?.hint}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {exercise?.options.map((option, index) => {
            const chosen = table.lastResult?.chosenIndex === index;
            const correct = reveal && exercise.correctIndex === index;
            const missed = reveal && chosen && !correct;
            return (
              <button
                key={`${option}-${index}`}
                type="button"
                disabled={!table.yourTurn || props.pending || reveal}
                onClick={() => props.onAnswer(index)}
                className={`rounded-2xl border-2 px-4 py-4 text-left text-lg font-black disabled:cursor-default ${
                  correct ? "border-emerald-600 bg-emerald-50" : missed ? "border-coral-600 bg-coral-50" : "border-slate-200 bg-white"
                }`}
              >
                <span className="mr-2 text-slate-400">{index + 1}</span>
                {option}
              </button>
            );
          })}
        </div>
        {reveal && table.lastResult ? (
          <div className="mt-5 rounded-2xl bg-slate-900 px-4 py-4 text-white">
            <p className="font-heading text-2xl font-black">
              {table.lastResult.timedOut
                ? `${table.lastResult.name} no llegó a tiempo`
                : table.lastResult.correct
                  ? `${table.lastResult.name} suma ${table.lastResult.points}`
                  : `${table.lastResult.name} no acierta`}
            </p>
            <p className="mt-2 text-white/80">{exercise?.explanation}</p>
          </div>
        ) : null}
        {!table.yourTurn && table.phase === "turn" ? (
          <p className="mt-4 text-sm font-bold text-slate-500">
            Solo responde {active?.name}. {active?.isBot ? "Es un jugador automático." : "Tú verás la solución con la mesa."}
          </p>
        ) : null}
      </div>
    </section>
  );
}

function Ranking(props: { table: PublicTable; pending: boolean; onRematch: () => void; onLeave: () => void }) {
  const rows = props.table.ranking ?? [];
  return (
    <section className="rounded-[2rem] bg-white/10 p-5 sm:p-8">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-peach-200">Fin de la partida</p>
      <h1 className="font-heading text-5xl font-black">Ranking</h1>
      <p className="mt-2 text-white/75">
        {props.table.activityCount} {props.table.activityCount === 1 ? "actividad" : "actividades"} en la mesa {props.table.code}, nivel {props.table.level}.
      </p>
      <ol className="mt-8 grid gap-3">
        {rows.map((row) => (
          <li key={row.playerId} className="flex items-center gap-4 rounded-2xl bg-[#FFF8F3] px-4 py-4 text-slate-900">
            <span className="font-heading text-3xl font-black text-coral-600">{row.place}</span>
            <span className="h-11 w-11 rounded-full" style={{ background: row.color }} aria-hidden />
            <span className="flex-1 font-heading text-2xl font-black">
              {row.name}
              {props.table.seats.find((seat) => seat.playerId === row.playerId)?.isBot ? " · auto" : ""}
            </span>
            <span className="font-heading text-2xl font-black">{row.score}</span>
          </li>
        ))}
      </ol>
      <div className="mt-6 flex flex-wrap gap-3">
        {props.table.youAreHost ? (
          <button type="button" onClick={props.onRematch} disabled={props.pending} className="rounded-full bg-coral-500 px-6 py-4 font-heading text-lg font-black disabled:opacity-50">
            Otra partida
          </button>
        ) : (
          <p className="rounded-full bg-white/10 px-5 py-4 font-bold">Quien abrió la mesa puede lanzar otra.</p>
        )}
        <button type="button" onClick={props.onLeave} className="rounded-full px-5 py-4 font-bold text-white/80">
          Salir
        </button>
      </div>
    </section>
  );
}

function SeatRail({ table }: { table: PublicTable }) {
  return (
    <ul className="mt-6 flex gap-3 overflow-x-auto pb-1">
      {table.seats.map((seat) => (
        <li
          key={seat.playerId}
          className={`min-w-[7.5rem] rounded-2xl px-3 py-3 ${seat.isTurn ? "bg-white text-slate-900" : "bg-white/10"}`}
        >
          <span className="mb-2 block h-8 w-8 rounded-full" style={{ background: seat.color }} aria-hidden />
          <span className="block truncate font-black">
            {seat.name}
            {seat.isYou ? " · tú" : ""}
          </span>
          <span className={`block text-xs font-bold ${seat.isTurn ? "text-slate-500" : "text-white/60"}`}>
            {seat.score} pts{seat.isHost ? " · abre" : ""}{seat.isBot ? " · auto" : ""}
          </span>
        </li>
      ))}
    </ul>
  );
}
