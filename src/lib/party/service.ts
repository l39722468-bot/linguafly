import {
  advance,
  cleanName,
  createTable,
  isLobbyStale,
  joinTable,
  leaveTable,
  makeCode,
  pruneLobby,
  PartyError,
  rematch,
  startMatch,
  submitAnswer,
  toPublic,
  touchTable,
} from "@/lib/party/engine";
import type { PartyStore } from "@/lib/party/store";
import { isPartyLevel, MAX_SEATS, type PartyLevel, type PublicTable, type TableState } from "@/lib/party/types";

export async function enterParty(store: PartyStore, input: {
  playerId: string;
  name: string;
  level?: string;
  code?: string;
  now?: number;
}): Promise<PublicTable> {
  const now = input.now ?? Date.now();
  const name = cleanName(input.name);
  const code = input.code?.trim().toUpperCase();
  if (code) {
    const table = await store.getByCode(code);
    if (!table) throw new PartyError("No hay ninguna mesa con ese código.", 404);
    const opened = await withoutAbsentSeats(store, table, now, input.playerId);
    if (!opened) throw new PartyError("No hay ninguna mesa con ese código.", 404);
    const next = joinTable(opened, { playerId: input.playerId, name, now });
    await persist(store, opened, next);
    return toPublic(next, input.playerId, now);
  }
  if (!input.level || !isPartyLevel(input.level)) {
    throw new PartyError("Elige un nivel: A1, A2, B1, B2 o C1.");
  }
  const level: PartyLevel = input.level;
  const lobbies = await store.listLobbies(level);
  const open = lobbies
    .filter((table) => !isLobbyStale(table, now) && table.seats.length < MAX_SEATS)
    .sort((a, b) => b.seats.length - a.seats.length || a.updatedAt - b.updatedAt);
  for (const table of open) {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const fresh = await store.get(table.id);
      if (!fresh || fresh.phase !== "lobby") break;
      const opened = await withoutAbsentSeats(store, fresh, now, input.playerId);
      if (!opened || opened.seats.length >= MAX_SEATS) break;
      try {
        const next = joinTable(opened, { playerId: input.playerId, name, now });
        if (await persist(store, opened, next)) return toPublic(next, input.playerId, now);
      } catch (error) {
        if (error instanceof PartyError && error.status === 409) break;
        throw error;
      }
    }
  }
  const created = await insertFresh(store, level, input.playerId, name, now);
  return toPublic(created, input.playerId, now);
}

export async function readParty(
  store: PartyStore,
  tableId: string,
  playerId: string,
  now = Date.now(),
): Promise<PublicTable> {
  const table = await requireTable(store, tableId);
  const opened = await withoutAbsentSeats(store, table, now, playerId);
  if (!opened) throw new PartyError("Esta mesa ya no existe.", 404);
  const next = touchTable(opened, playerId, now);
  await persist(store, opened, next);
  if (!next.seats.some((seat) => seat.playerId === playerId)) {
    throw new PartyError("No estás sentado en esta mesa.", 403);
  }
  return toPublic(next, playerId, now);
}

export async function startParty(
  store: PartyStore,
  tableId: string,
  playerId: string,
  now = Date.now(),
): Promise<PublicTable> {
  return mutate(store, tableId, playerId, now, (state) => startMatch(state, playerId, now));
}

export async function answerParty(
  store: PartyStore,
  tableId: string,
  playerId: string,
  optionIndex: number,
  now = Date.now(),
): Promise<PublicTable> {
  return mutate(store, tableId, playerId, now, (state) =>
    submitAnswer(state, { playerId, optionIndex, now }),
  );
}

export async function rematchParty(
  store: PartyStore,
  tableId: string,
  playerId: string,
  now = Date.now(),
): Promise<PublicTable> {
  return mutate(store, tableId, playerId, now, (state) => rematch(state, playerId, now));
}

export async function leaveParty(
  store: PartyStore,
  tableId: string,
  playerId: string,
  now = Date.now(),
): Promise<PublicTable | null> {
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const table = await store.get(tableId);
    if (!table) return null;
    const next = leaveTable(advance(table, now), playerId, now);
    if (!next) {
      await store.delete(table.id);
      return null;
    }
    if (await persist(store, table, next)) return null;
  }
  throw new PartyError("La mesa se ha movido. Prueba otra vez.", 409);
}

async function withoutAbsentSeats(
  store: PartyStore,
  state: TableState,
  now: number,
  keepPlayerId?: string,
): Promise<TableState | null> {
  const pruned = pruneLobby(advance(state, now), now, keepPlayerId);
  if (!pruned) {
    await store.delete(state.id);
    return null;
  }
  if (pruned === state) return state;
  if (!(await persist(store, state, pruned))) return null;
  return pruned;
}

async function mutate(
  store: PartyStore,
  tableId: string,
  playerId: string,
  now: number,
  change: (state: TableState) => TableState,
): Promise<PublicTable> {
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const current = await requireTable(store, tableId);
    const next = change(advance(current, now));
    if (await persist(store, current, next)) return toPublic(next, playerId, now);
  }
  throw new PartyError("La mesa se ha movido. Prueba otra vez.", 409);
}

async function persist(store: PartyStore, previous: TableState, next: TableState): Promise<boolean> {
  if (next === previous) return true;
  if (previous.version === next.version) return true;
  return store.compareAndSwap(previous.version, next);
}

async function insertFresh(
  store: PartyStore,
  level: PartyLevel,
  playerId: string,
  name: string,
  now: number,
): Promise<TableState> {
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const code = makeCode();
    if (await store.getByCode(code)) continue;
    const table = createTable({
      id: crypto.randomUUID(),
      code,
      level,
      playerId,
      name: cleanName(name),
      now,
    });
    try {
      await store.insert(table);
      return table;
    } catch {
      // Código repetido entre dos altas a la vez.
    }
  }
  throw new PartyError("No se ha podido abrir la mesa.", 503);
}

async function requireTable(store: PartyStore, tableId: string): Promise<TableState> {
  const table = await store.get(tableId);
  if (!table) throw new PartyError("Esta mesa ya no existe.", 404);
  return table;
}
