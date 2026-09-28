import {
  advance,
  armTogetherStart,
  cleanName,
  createTable,
  isLobbyStale,
  joinTable,
  leaveTable,
  makeCode,
  maybeAutoStart,
  normalizeTable,
  pruneLobby,
  PartyError,
  rematch,
  startMatch,
  submitAnswer,
  toPublic,
  touchTable,
} from "@/lib/party/engine";
import type { PartyStore } from "@/lib/party/store";
import {
  isPartyLevel,
  PARTY_TABLE_SIZE,
  type PartyLevel,
  type PartyMode,
  type PublicTable,
  type TableState,
} from "@/lib/party/types";

export async function enterParty(store: PartyStore, input: {
  playerId: string;
  name: string;
  level?: string;
  mode?: string;
  code?: string;
  now?: number;
}): Promise<PublicTable> {
  const now = input.now ?? Date.now();
  const name = cleanName(input.name);
  if (!input.level || !isPartyLevel(input.level)) {
    throw new PartyError("Elige un nivel: A1, A2, B1, B2 o C1.");
  }
  const mode: PartyMode = input.mode === "together" ? "together" : "solo";
  if (mode === "solo") {
    const created = await insertFresh(store, input.level, input.playerId, name, now, "solo");
    return toPublic(created, input.playerId, now);
  }
  const lobbies = await store.listLobbies(input.level);
  const open = lobbies
    .map((table) => normalizeTable(table))
    .filter((table) => table.mode === "together" && !isLobbyStale(table, now) && humanCount(table) < PARTY_TABLE_SIZE)
    .sort((a, b) => humanCount(b) - humanCount(a) || a.updatedAt - b.updatedAt);
  for (const table of open) {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const fresh = await store.get(table.id);
      if (!fresh || fresh.phase !== "lobby") break;
      const opened = await withoutAbsentSeats(store, normalizeTable(fresh), now, input.playerId);
      if (!opened || opened.phase !== "lobby" || opened.mode !== "together" || humanCount(opened) >= PARTY_TABLE_SIZE) {
        break;
      }
      try {
        const joined = joinTable(opened, {
          playerId: input.playerId,
          name,
          now,
          limit: PARTY_TABLE_SIZE,
        });
        const next = maybeAutoStart(joined, now);
        if (await persist(store, opened, next)) return toPublic(next, input.playerId, now);
      } catch (error) {
        if (error instanceof PartyError && error.status === 409) break;
        throw error;
      }
    }
  }
  const created = await insertFresh(store, input.level, input.playerId, name, now, "together");
  return toPublic(created, input.playerId, now);
}

export async function switchToSolo(
  store: PartyStore,
  tableId: string,
  playerId: string,
  now = Date.now(),
): Promise<PublicTable> {
  const table = normalizeTable(await requireTable(store, tableId));
  const seat = table.seats.find((item) => item.playerId === playerId && !item.bot);
  if (!seat) throw new PartyError("No estás sentado en esta mesa.", 403);
  if (table.phase !== "lobby") throw new PartyError("La partida ya ha empezado.");
  await leaveParty(store, tableId, playerId, now);
  const created = await insertFresh(store, table.level, playerId, seat.name, now, "solo");
  return toPublic(created, playerId, now);
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
  const filled = maybeAutoStart(opened, now);
  const next = touchTable(filled, playerId, now);
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
  mode: PartyMode,
): Promise<TableState> {
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const code = makeCode();
    if (await store.getByCode(code)) continue;
    const opened = createTable({
      id: crypto.randomUUID(),
      code,
      level,
      mode,
      playerId,
      name: cleanName(name),
      now,
    });
    const table = mode === "solo" ? startMatch(opened, playerId, now) : armTogetherStart(opened, now);
    try {
      await store.insert(table);
      return table;
    } catch {
      // Código repetido entre dos altas a la vez.
    }
  }
  throw new PartyError("No se ha podido abrir la mesa.", 503);
}

function humanCount(state: TableState): number {
  return state.seats.filter((seat) => !seat.bot).length;
}

async function requireTable(store: PartyStore, tableId: string): Promise<TableState> {
  const table = await store.get(tableId);
  if (!table) throw new PartyError("Esta mesa ya no existe.", 404);
  return table;
}
