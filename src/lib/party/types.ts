export const PARTY_LEVELS = ["A1", "A2", "B1", "B2", "C1"] as const;

export type PartyLevel = (typeof PARTY_LEVELS)[number];

export const MAX_SEATS = 8;
/** Con poca gente, la mesa se completa hasta este número. */
export const TABLE_SIZE = 4;
/** Ejercicios que responde cada persona en la partida. */
export const EXERCISES_PER_PLAYER = 8;
export const TURN_MS = 20_000;
export const REVEAL_MS = 4_000;
export const LOBBY_STALE_MS = 90_000;
export const LOBBY_SEAT_MS = 12_000;

export type PartyPhase = "lobby" | "turn" | "reveal" | "ranking";

export interface PartyExercise {
  id: string;
  prompt: string;
  hint: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Seat {
  playerId: string;
  name: string;
  color: string;
  score: number;
  /** Aciertos en la partida en curso. */
  hits: number;
  connected: boolean;
  lastSeen: number;
  bot: boolean;
}

export interface TurnResult {
  playerId: string;
  correct: boolean;
  timedOut: boolean;
  points: number;
  chosenIndex: number | null;
}

export interface TableState {
  id: string;
  code: string;
  level: PartyLevel;
  hostId: string;
  phase: PartyPhase;
  seats: Seat[];
  order: string[];
  exercises: PartyExercise[];
  turnIndex: number;
  turnEndsAt: number | null;
  revealEndsAt: number | null;
  lastResult: TurnResult | null;
  version: number;
  updatedAt: number;
}

export interface PublicSeat {
  playerId: string;
  name: string;
  color: string;
  score: number;
  connected: boolean;
  isYou: boolean;
  isHost: boolean;
  isTurn: boolean;
}

export interface RankingRow {
  place: number;
  playerId: string;
  name: string;
  color: string;
  score: number;
  correct: number;
}

export interface PublicTable {
  id: string;
  code: string;
  level: PartyLevel;
  phase: PartyPhase;
  seats: PublicSeat[];
  activityCount: number;
  turnIndex: number;
  turnEndsAt: number | null;
  revealEndsAt: number | null;
  serverNow: number;
  exercise: {
    prompt: string;
    hint: string;
    options: string[];
    correctIndex: number | null;
    explanation: string | null;
  } | null;
  lastResult: (TurnResult & { name: string }) | null;
  ranking: RankingRow[] | null;
  youAreHost: boolean;
  yourTurn: boolean;
}

export function isPartyLevel(value: string): value is PartyLevel {
  return (PARTY_LEVELS as readonly string[]).includes(value);
}
