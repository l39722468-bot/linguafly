import { dealExercises } from "@/lib/party/exercises";
import {
  LOBBY_SEAT_MS,
  LOBBY_STALE_MS,
  MAX_SEATS,
  REVEAL_MS,
  TURN_MS,
  type PartyLevel,
  type PublicTable,
  type Seat,
  type TableState,
  type TurnResult,
} from "@/lib/party/types";

const SEAT_COLORS = [
  "#FF6B6B",
  "#FFA06B",
  "#34D399",
  "#60A5FA",
  "#F472B6",
  "#FBBF24",
  "#A78BFA",
  "#2DD4BF",
];

export class PartyError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

export function cleanName(raw: string): string {
  const name = raw.normalize("NFKC").replace(/\s+/g, " ").trim();
  if (name.length < 2 || name.length > 16) {
    throw new PartyError("El nombre necesita entre 2 y 16 letras.");
  }
  if (!/^[\p{L}\p{N} ]+$/u.test(name)) {
    throw new PartyError("El nombre solo puede llevar letras y números.");
  }
  return name;
}

export function makeCode(random: () => number = Math.random): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 4; i += 1) {
    code += alphabet[Math.floor(random() * alphabet.length)];
  }
  return code;
}

export function createTable(input: {
  id: string;
  code: string;
  level: PartyLevel;
  playerId: string;
  name: string;
  now: number;
}): TableState {
  const seat = makeSeat(input.playerId, input.name, 0, input.now);
  return {
    id: input.id,
    code: input.code,
    level: input.level,
    hostId: input.playerId,
    phase: "lobby",
    seats: [seat],
    order: [],
    exercises: [],
    turnIndex: 0,
    turnEndsAt: null,
    revealEndsAt: null,
    lastResult: null,
    version: 1,
    updatedAt: input.now,
  };
}

export function pruneLobby(state: TableState, now: number, keepPlayerId?: string): TableState | null {
  if (state.phase !== "lobby") return state;
  const seats = state.seats.filter(
    (seat) => seat.playerId === keepPlayerId || now - seat.lastSeen <= LOBBY_SEAT_MS,
  );
  if (seats.length === state.seats.length) return state;
  if (seats.length === 0) return null;
  const hostId = seats.some((seat) => seat.playerId === state.hostId) ? state.hostId : seats[0].playerId;
  return commit(state, { seats, hostId }, now);
}

export function joinTable(
  state: TableState,
  input: { playerId: string; name: string; now: number },
): TableState {
  const existing = state.seats.find((seat) => seat.playerId === input.playerId);
  if (existing) {
    return touchSeat(state, input.playerId, input.now, true);
  }
  if (state.phase !== "lobby") {
    throw new PartyError("Esta mesa ya está en partida.", 409);
  }
  if (state.seats.length >= MAX_SEATS) {
    throw new PartyError("Esta mesa está llena.", 409);
  }
  const name = uniqueName(state.seats, input.name);
  const seat = makeSeat(input.playerId, name, state.seats.length, input.now);
  return commit(state, { seats: [...state.seats, seat] }, input.now);
}

export function leaveTable(
  state: TableState,
  playerId: string,
  now: number,
): TableState | null {
  const seat = state.seats.find((item) => item.playerId === playerId);
  if (!seat) return state;
  if (state.phase === "lobby") {
    const seats = state.seats.filter((item) => item.playerId !== playerId);
    if (seats.length === 0) return null;
    const hostId = state.hostId === playerId ? seats[0].playerId : state.hostId;
    return commit(state, { seats, hostId }, now);
  }
  let next = touchSeat(state, playerId, now, false);
  if (activePlayerId(next) === playerId && next.phase === "turn") {
    next = resolveTurn(next, { correct: false, timedOut: true, chosenIndex: null }, now);
  }
  return next;
}

export function startMatch(
  state: TableState,
  playerId: string,
  now: number,
  random: () => number = Math.random,
): TableState {
  if (state.phase !== "lobby") throw new PartyError("La partida ya ha empezado.");
  if (state.hostId !== playerId) throw new PartyError("Solo quien abrió la mesa puede empezar.", 403);
  if (state.seats.length === 0) throw new PartyError("No hay nadie en la mesa.");
  const order = state.seats.map((seat) => seat.playerId);
  return commit(
    state,
    {
      phase: "turn",
      order,
      exercises: dealExercises(state.level, order.length, random),
      turnIndex: 0,
      turnEndsAt: now + TURN_MS,
      revealEndsAt: null,
      lastResult: null,
      seats: state.seats.map((seat) => ({ ...seat, score: 0, connected: true })),
    },
    now,
  );
}

export function submitAnswer(
  state: TableState,
  input: { playerId: string; optionIndex: number; now: number },
): TableState {
  const live = advance(state, input.now);
  if (live.phase !== "turn") throw new PartyError("Ahora no se puede responder.");
  if (activePlayerId(live) !== input.playerId) {
    throw new PartyError("Este ejercicio le toca a otra persona.", 403);
  }
  const exercise = live.exercises[live.turnIndex];
  if (!exercise || input.optionIndex < 0 || input.optionIndex >= exercise.options.length) {
    throw new PartyError("Elige una de las opciones.");
  }
  const correct = input.optionIndex === exercise.correctIndex;
  return resolveTurn(
    live,
    {
      correct,
      timedOut: false,
      chosenIndex: input.optionIndex,
    },
    input.now,
  );
}

export function rematch(state: TableState, playerId: string, now: number): TableState {
  if (state.phase !== "ranking") throw new PartyError("La partida todavía no ha terminado.");
  if (state.hostId !== playerId) throw new PartyError("Solo quien abrió la mesa puede repetir.", 403);
  const seats = state.seats
    .filter((seat) => seat.connected)
    .map((seat) => ({ ...seat, score: 0 }));
  if (seats.length === 0) throw new PartyError("No queda nadie en la mesa.");
  const hostId = seats.some((seat) => seat.playerId === state.hostId)
    ? state.hostId
    : seats[0].playerId;
  return commit(
    state,
    {
      phase: "lobby",
      hostId,
      seats,
      order: [],
      exercises: [],
      turnIndex: 0,
      turnEndsAt: null,
      revealEndsAt: null,
      lastResult: null,
    },
    now,
  );
}

export function advance(state: TableState, now: number): TableState {
  if (state.phase === "turn" && state.turnEndsAt !== null && now >= state.turnEndsAt) {
    return resolveTurn(state, { correct: false, timedOut: true, chosenIndex: null }, now);
  }
  if (state.phase === "reveal" && state.revealEndsAt !== null && now >= state.revealEndsAt) {
    const nextIndex = state.turnIndex + 1;
    if (nextIndex >= state.order.length) {
      return commit(state, { phase: "ranking", turnEndsAt: null, revealEndsAt: null }, now);
    }
    return commit(
      state,
      {
        phase: "turn",
        turnIndex: nextIndex,
        turnEndsAt: now + TURN_MS,
        revealEndsAt: null,
        lastResult: null,
      },
      now,
    );
  }
  return state;
}

export function touchTable(state: TableState, playerId: string, now: number): TableState {
  const seat = state.seats.find((item) => item.playerId === playerId);
  if (!seat) return advance(state, now);
  const seen = seat.lastSeen;
  let next = advance(state, now);
  if (now - seen < 5_000 && next === state) return state;
  if (!seat.connected && state.phase !== "lobby") {
    next = touchSeat(next, playerId, now, true);
  } else if (now - seen >= 5_000) {
    next = touchSeat(next, playerId, now, seat.connected);
  }
  return next;
}

export function isLobbyStale(state: TableState, now: number): boolean {
  if (state.phase !== "lobby" || state.seats.length === 0) return false;
  return state.seats.every((seat) => now - seat.lastSeen > LOBBY_STALE_MS);
}

export function activityCount(state: TableState): number {
  return state.phase === "lobby" ? state.seats.length : state.order.length;
}

export function toPublic(state: TableState, playerId: string, now: number): PublicTable {
  const live = state;
  const showAnswer = live.phase === "reveal" || live.phase === "ranking";
  const exercise =
    live.phase === "lobby" ? null : live.exercises[Math.min(live.turnIndex, live.exercises.length - 1)] ?? null;
  const visibleExercise =
    live.phase === "ranking" || !exercise
      ? null
      : {
          prompt: exercise.prompt,
          hint: exercise.hint,
          options: exercise.options,
          correctIndex: showAnswer ? exercise.correctIndex : null,
          explanation: showAnswer ? exercise.explanation : null,
        };
  const turnPlayer = activePlayerId(live);
  return {
    id: live.id,
    code: live.code,
    level: live.level,
    phase: live.phase,
    seats: live.seats.map((seat) => ({
      playerId: seat.playerId,
      name: seat.name,
      color: seat.color,
      score: seat.score,
      connected: seat.connected,
      isYou: seat.playerId === playerId,
      isHost: seat.playerId === live.hostId,
      isTurn: live.phase !== "lobby" && live.phase !== "ranking" && seat.playerId === turnPlayer,
    })),
    activityCount: activityCount(live),
    turnIndex: live.turnIndex,
    turnEndsAt: live.turnEndsAt,
    revealEndsAt: live.revealEndsAt,
    serverNow: now,
    exercise: visibleExercise,
    lastResult: live.lastResult
      ? {
          ...live.lastResult,
          name: live.seats.find((seat) => seat.playerId === live.lastResult?.playerId)?.name ?? "Jugador",
        }
      : null,
    ranking: live.phase === "ranking" ? finishedRanking(live) : null,
    youAreHost: live.hostId === playerId,
    yourTurn: live.phase === "turn" && turnPlayer === playerId,
  };
}

function finishedRanking(state: TableState): RankingRow[] {
  const rows = state.order.map((playerId, index) => {
    const seat = state.seats.find((item) => item.playerId === playerId);
    return {
      playerId,
      name: seat?.name ?? "Jugador",
      color: seat?.color ?? SEAT_COLORS[0],
      score: seat?.score ?? 0,
      index,
    };
  });
  const ordered = [...rows].sort((a, b) => b.score - a.score || a.index - b.index);
  let place = 0;
  let previous = Number.POSITIVE_INFINITY;
  return ordered.map((row, index) => {
    if (row.score !== previous) place = index + 1;
    previous = row.score;
    return {
      place,
      playerId: row.playerId,
      name: row.name,
      color: row.color,
      score: row.score,
      correct: row.score > 0 ? 1 : 0,
    };
  });
}

function resolveTurn(
  state: TableState,
  outcome: { correct: boolean; timedOut: boolean; chosenIndex: number | null },
  now: number,
): TableState {
  const playerId = activePlayerId(state);
  if (!playerId) return state;
  const points = outcome.correct ? pointsForSpeed(state.turnEndsAt, now) : 0;
  const result: TurnResult = {
    playerId,
    correct: outcome.correct,
    timedOut: outcome.timedOut,
    points,
    chosenIndex: outcome.chosenIndex,
  };
  return commit(
    state,
    {
      phase: "reveal",
      turnEndsAt: null,
      revealEndsAt: now + REVEAL_MS,
      lastResult: result,
      seats: state.seats.map((seat) =>
        seat.playerId === playerId ? { ...seat, score: seat.score + points, lastSeen: now } : seat,
      ),
    },
    now,
  );
}

function pointsForSpeed(turnEndsAt: number | null, now: number): number {
  const remainingMs = Math.max(0, (turnEndsAt ?? now) - now);
  const secondsLeft = Math.round(remainingMs / 1000);
  return 100 + secondsLeft * 10;
}

function activePlayerId(state: TableState): string | null {
  return state.order[state.turnIndex] ?? null;
}

function makeSeat(playerId: string, name: string, index: number, now: number): Seat {
  return {
    playerId,
    name,
    color: SEAT_COLORS[index % SEAT_COLORS.length],
    score: 0,
    connected: true,
    lastSeen: now,
  };
}

function uniqueName(seats: Seat[], name: string): string {
  const taken = new Set(seats.map((seat) => seat.name.toLowerCase()));
  if (!taken.has(name.toLowerCase())) return name;
  for (let n = 2; n < 20; n += 1) {
    const next = `${name.slice(0, 13)} ${n}`;
    if (!taken.has(next.toLowerCase())) return next;
  }
  return `${name.slice(0, 12)} ${seats.length + 1}`;
}

function touchSeat(
  state: TableState,
  playerId: string,
  now: number,
  connected: boolean,
): TableState {
  return commit(
    state,
    {
      seats: state.seats.map((seat) =>
        seat.playerId === playerId ? { ...seat, connected, lastSeen: now } : seat,
      ),
    },
    now,
  );
}

function commit(state: TableState, patch: Partial<TableState>, now: number): TableState {
  return { ...state, ...patch, version: state.version + 1, updatedAt: now };
}
