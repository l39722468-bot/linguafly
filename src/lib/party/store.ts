import type { PartyLevel, TableState } from "@/lib/party/types";

export interface PartyStore {
  get(id: string): Promise<TableState | null>;
  getByCode(code: string): Promise<TableState | null>;
  listLobbies(level: PartyLevel): Promise<TableState[]>;
  insert(state: TableState): Promise<void>;
  compareAndSwap(previousVersion: number, next: TableState): Promise<boolean>;
  delete(id: string): Promise<void>;
}

type MemoryGlobal = { tables: Map<string, TableState> };

const globalStore = globalThis as typeof globalStore & {
  __linguaflyParty?: MemoryGlobal;
};

function memoryMap(): Map<string, TableState> {
  if (!globalStore.__linguaflyParty) {
    globalStore.__linguaflyParty = { tables: new Map() };
  }
  return globalStore.__linguaflyParty.tables;
}

export function clearPartyMemory(): void {
  memoryMap().clear();
}

export function memoryPartyStore(): PartyStore {
  return {
    async get(id) {
      return memoryMap().get(id) ?? null;
    },
    async getByCode(code) {
      const wanted = code.toUpperCase();
      for (const table of memoryMap().values()) {
        if (table.code === wanted) return table;
      }
      return null;
    },
    async listLobbies(level) {
      return [...memoryMap().values()].filter(
        (table) => table.phase === "lobby" && table.level === level,
      );
    },
    async insert(state) {
      memoryMap().set(state.id, state);
    },
    async compareAndSwap(previousVersion, next) {
      const current = memoryMap().get(next.id);
      if (!current || current.version !== previousVersion) return false;
      memoryMap().set(next.id, next);
      return true;
    },
    async delete(id) {
      memoryMap().delete(id);
    },
  };
}

const CREATE_SQL = `
CREATE TABLE IF NOT EXISTS party_tables (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  level TEXT NOT NULL,
  phase TEXT NOT NULL,
  version INTEGER NOT NULL,
  state_json TEXT NOT NULL,
  updated_at INTEGER NOT NULL
)`;

export function d1PartyStore(db: D1Database): PartyStore {
  let ready: Promise<void> | null = null;
  const ensure = () => {
    ready ??= db.prepare(CREATE_SQL).run().then(() => undefined);
    return ready;
  };
  const read = (row: { state_json: string } | null) =>
    row ? (JSON.parse(row.state_json) as TableState) : null;

  return {
    async get(id) {
      await ensure();
      const row = await db
        .prepare("SELECT state_json FROM party_tables WHERE id = ?")
        .bind(id)
        .first<{ state_json: string }>();
      return read(row);
    },
    async getByCode(code) {
      await ensure();
      const row = await db
        .prepare("SELECT state_json FROM party_tables WHERE code = ?")
        .bind(code.toUpperCase())
        .first<{ state_json: string }>();
      return read(row);
    },
    async listLobbies(level) {
      await ensure();
      const result = await db
        .prepare("SELECT state_json FROM party_tables WHERE phase = 'lobby' AND level = ?")
        .bind(level)
        .all<{ state_json: string }>();
      return (result.results ?? []).map((row) => JSON.parse(row.state_json) as TableState);
    },
    async insert(state) {
      await ensure();
      await db
        .prepare(
          `INSERT INTO party_tables (id, code, level, phase, version, state_json, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
        )
        .bind(
          state.id,
          state.code,
          state.level,
          state.phase,
          state.version,
          JSON.stringify(state),
          state.updatedAt,
        )
        .run();
    },
    async compareAndSwap(previousVersion, next) {
      await ensure();
      const result = await db
        .prepare(
          `UPDATE party_tables
           SET code = ?, level = ?, phase = ?, version = ?, state_json = ?, updated_at = ?
           WHERE id = ? AND version = ?`,
        )
        .bind(
          next.code,
          next.level,
          next.phase,
          next.version,
          JSON.stringify(next),
          next.updatedAt,
          next.id,
          previousVersion,
        )
        .run();
      return (result.meta?.changes ?? 0) > 0;
    },
    async delete(id) {
      await ensure();
      await db.prepare("DELETE FROM party_tables WHERE id = ?").bind(id).run();
    },
  };
}

export async function partyStoreFromEnv(): Promise<PartyStore> {
  try {
    const mod = await import("@opennextjs/cloudflare");
    const { env } = await mod.getCloudflareContext({ async: true });
    const db = (env as { DB?: D1Database } | undefined)?.DB;
    if (db) return d1PartyStore(db);
  } catch {
    // Next local no tiene el binding de D1: la mesa vive en este proceso.
  }
  return memoryPartyStore();
}
