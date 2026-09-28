import { dealExercises, exercisesForLevel } from "@/lib/party/exercises";
import {
  advance,
  createTable,
  joinTable,
  leaveTable,
  pruneLobby,
  rematch,
  startMatch,
  submitAnswer,
  toPublic,
} from "@/lib/party/engine";
import { answerParty, enterParty, readParty } from "@/lib/party/service";
import { clearPartyMemory, memoryPartyStore } from "@/lib/party/store";
import { EXERCISES_PER_PLAYER, MAX_SEATS, REVEAL_MS, TURN_MS } from "@/lib/party/types";
import type { TableState } from "@/lib/party/types";
import { getParkedPageRedirect, isPublicSitePath } from "@/lib/site-catalog";

const NOW = 1_700_000_000_000;

function tableWith(names: string[]) {
  let state = createTable({
    id: "mesa-1",
    code: "AB12",
    level: "A1",
    playerId: "player-1",
    name: names[0],
    now: NOW,
  });
  names.slice(1).forEach((name, index) => {
    state = joinTable(state, { playerId: `player-${index + 2}`, name, now: NOW });
  });
  return state;
}

describe("mesas de inglés", () => {
  beforeEach(() => clearPartyMemory());

  it("keeps the page public", () => {
    expect(isPublicSitePath("/mesas")).toBe(true);
    expect(getParkedPageRedirect("/mesas")).toBeNull();
  });

  it("deals eight exercises per player and hides the answer until the reveal", () => {
    const started = startMatch(tableWith(["Ana", "Luis", "Marta"]), "player-1", NOW, () => 0.2);
    expect(started.order).toEqual(Array.from({ length: EXERCISES_PER_PLAYER }, () => ["player-1", "player-2", "player-3"]).flat());
    expect(started.exercises).toHaveLength(3 * EXERCISES_PER_PLAYER);
    expect(new Set(started.exercises.map((item) => item.id)).size).toBe(3 * EXERCISES_PER_PLAYER);

    const hidden = toPublic(started, "player-1", NOW);
    expect(hidden.activityCount).toBe(3 * EXERCISES_PER_PLAYER);
    expect(hidden.exercise?.correctIndex).toBeNull();
    expect(hidden.exercise?.explanation).toBeNull();
    expect(hidden.yourTurn).toBe(true);
    expect(toPublic(started, "player-2", NOW).yourTurn).toBe(false);

    const exercise = started.exercises[0];
    const answered = submitAnswer(started, {
      playerId: "player-1",
      optionIndex: exercise.correctIndex,
      now: NOW + 2_000,
    });
    const shown = toPublic(answered, "player-2", NOW + 2_000);
    expect(shown.phase).toBe("reveal");
    expect(shown.exercise?.correctIndex).toBe(exercise.correctIndex);
    expect(shown.exercise?.explanation).toBeTruthy();
    expect(shown.seats.find((seat) => seat.playerId === "player-1")?.score).toBe(100 + 18 * 10);
  });

  it("rejects an answer from the player who is waiting", () => {
    const started = startMatch(tableWith(["Ana", "Luis"]), "player-1", NOW, () => 0.1);
    expect(() =>
      submitAnswer(started, { playerId: "player-2", optionIndex: 0, now: NOW + 500 }),
    ).toThrow("Este ejercicio le toca a otra persona.");
  });

  it("gives no points for a miss and ranks the correct player first", () => {
    let state = startMatch(tableWith(["Ana", "Luis"]), "player-1", NOW, () => 0.3);
    state = submitAnswer(state, { playerId: "player-1", optionIndex: wrongIndex(state), now: NOW + 1_000 });
    expect(state.seats[0].score).toBe(0);
    state = advance(state, NOW + 1_000 + REVEAL_MS);
    expect(state.phase).toBe("turn");
    expect(state.turnIndex).toBe(1);
    state = submitAnswer(state, {
      playerId: "player-2",
      optionIndex: state.exercises[1].correctIndex,
      now: state.turnEndsAt! - 5_000,
    });
    state = playOut(state);
    expect(state.phase).toBe("ranking");
    const ranking = toPublic(state, "player-1", state.updatedAt).ranking ?? [];
    expect(ranking.map((row) => row.playerId)).toEqual(["player-2", "player-1"]);
    expect(ranking[0].place).toBe(1);
    expect(ranking[0].score).toBeGreaterThan(0);
    expect(ranking[1].score).toBe(0);
  });

  it("closes a turn when the time runs out", () => {
    const started = startMatch(tableWith(["Ana"]), "player-1", NOW, () => 0.4);
    const timedOut = advance(started, NOW + TURN_MS);
    expect(timedOut.phase).toBe("reveal");
    expect(timedOut.lastResult?.timedOut).toBe(true);
    expect(timedOut.lastResult?.points).toBe(0);
    const nextTurn = advance(timedOut, timedOut.revealEndsAt ?? NOW);
    expect(nextTurn.phase).toBe("turn");
    expect(nextTurn.turnIndex).toBe(1);
    const ranked = playOut(nextTurn);
    expect(ranked.phase).toBe("ranking");
    expect(ranked.order).toHaveLength(EXERCISES_PER_PLAYER);
  });

  it("does not change how many activities a match has after it starts", () => {
    const started = startMatch(tableWith(["Ana", "Luis", "Marta"]), "player-1", NOW, () => 0.5);
    const left = leaveTable(started, "player-3", NOW + 100);
    expect(left?.order).toHaveLength(3 * EXERCISES_PER_PLAYER);
    expect(left?.phase).toBe("turn");
  });

  it("opens a private match for the person who enters", async () => {
    const store = memoryPartyStore();
    const first = await enterParty(store, { playerId: "player-ana1", name: "Ana", level: "B1", now: NOW });
    expect(first.phase).toBe("turn");
    expect(first.yourTurn).toBe(true);
    expect(first.activityCount).toBe(EXERCISES_PER_PLAYER);
    expect(first.seats.map((seat) => seat.name)).toEqual(["Ana"]);
    expect(first.seats[0]?.isYou).toBe(true);
    const seated = await store.get(first.id);
    expect(seated?.seats).toHaveLength(1);
    expect(seated?.seats.every((seat) => !seat.bot)).toBe(true);

    const second = await enterParty(store, { playerId: "player-luis1", name: "Luis", level: "B1", now: NOW });
    expect(second.id).not.toBe(first.id);
    expect(second.seats.map((seat) => seat.name)).toEqual(["Luis"]);
    expect(second.activityCount).toBe(EXERCISES_PER_PLAYER);
    expect((await store.get(first.id))?.seats.map((seat) => seat.name)).toEqual(["Ana"]);
  });

  it("gives every exercise to the only player", async () => {
    const store = memoryPartyStore();
    const host = await enterParty(store, { playerId: "player-host", name: "Nuria", level: "A2", now: NOW });
    expect(host.phase).toBe("turn");
    expect(host.activityCount).toBe(EXERCISES_PER_PLAYER);
    expect((await store.get(host.id))?.seats).toHaveLength(1);

    const privateState = await store.get(host.id);
    const firstCorrect = privateState?.exercises[0].correctIndex ?? 0;
    let table = await answerParty(store, host.id, "player-host", firstCorrect, NOW + 1_000);
    expect(table.phase).toBe("reveal");
    table = await readParty(store, host.id, "player-host", NOW + 1_000 + REVEAL_MS);
    expect(table.yourTurn).toBe(true);
    expect(table.turnIndex).toBe(1);
    expect(table.seats).toHaveLength(1);
  });

  it("frees a lobby seat when that person stops responding", () => {
    const state = tableWith(["Ana", "Luis"]);
    const stale = {
      ...state,
      seats: state.seats.map((seat, index) =>
        index === 0 ? { ...seat, lastSeen: NOW - 30_000 } : seat,
      ),
    };
    const pruned = pruneLobby(stale, NOW, "player-2");
    expect(pruned?.seats.map((seat) => seat.playerId)).toEqual(["player-2"]);
    expect(pruned?.hostId).toBe("player-2");
    const playing = startMatch(state, "player-1", NOW, () => 0.2);
    const stillPlaying = pruneLobby(
      {
        ...playing,
        seats: playing.seats.map((seat) => ({ ...seat, lastSeen: NOW - 30_000 })),
      },
      NOW + 30_000,
    );
    expect(stillPlaying?.order).toHaveLength(2 * EXERCISES_PER_PLAYER);
    expect(stillPlaying?.phase).toBe("turn");
  });

  it("stops at eight seats", () => {
    const names = Array.from({ length: MAX_SEATS }, (_, index) => `P${index + 1}`);
    const full = tableWith(names);
    expect(full.seats).toHaveLength(MAX_SEATS);
    expect(() => joinTable(full, { playerId: "extra-player", name: "Extra", now: NOW })).toThrow(
      "Esta mesa está llena.",
    );
  });

  it("drops leftover automatic seats and keeps the player's exercises", () => {
    const started = startMatch(tableWith(["Ana"]), "player-1", NOW, () => 0.2);
    const withBot = {
      ...started,
      seats: [
        ...started.seats,
        {
          playerId: "pAB121k9m2",
          name: "Lucía",
          color: "#FFA06B",
          score: 0,
          hits: 0,
          connected: true,
          lastSeen: NOW,
          bot: true,
        },
      ],
      order: started.order.flatMap((id) => [id, "pAB121k9m2"]),
      exercises: [...started.exercises, ...started.exercises],
    };
    const cleaned = advance(withBot, NOW);
    expect(cleaned.seats.map((seat) => seat.playerId)).toEqual(["player-1"]);
    expect(cleaned.order.every((id) => id === "player-1")).toBe(true);
    expect(cleaned.order).toHaveLength(EXERCISES_PER_PLAYER);
    expect(cleaned.phase).toBe("turn");
    expect(cleaned.exercises).toHaveLength(EXERCISES_PER_PLAYER);
  });

  it("starts again for the same player only", () => {
    let state = startMatch(tableWith(["Ana", "Luis"]), "player-1", NOW, () => 0.2);
    state = playOut(state);
    expect(state.phase).toBe("ranking");
    const again = rematch(state, "player-1", NOW + 10_000, () => 0.4);
    expect(again.phase).toBe("turn");
    expect(again.seats.map((seat) => seat.name)).toEqual(["Ana"]);
    expect(again.order).toHaveLength(EXERCISES_PER_PLAYER);
    expect(again.seats.every((seat) => !seat.bot)).toBe(true);
  });

  it("keeps a correct option inside every dealt exercise", () => {
    const kinds = ["Gramática", "Vocabulario", "Phrasal verb", "False friend", "Fonética"];
    for (const level of ["A1", "A2", "B1", "B2", "C1"] as const) {
      const bank = exercisesForLevel(level);
      expect(bank).toHaveLength(35);
      expect(new Set(bank.map((item) => item.id)).size).toBe(bank.length);
      for (const kind of kinds) {
        expect(bank.filter((item) => item.hint === kind)).toHaveLength(7);
      }
      for (const item of bank) {
        expect(item.options).toHaveLength(4);
        expect(new Set(item.options).size).toBe(4);
        expect(item.options[item.correctIndex]).toBeTruthy();
        expect(item.explanation.length).toBeGreaterThan(20);
      }
      const mixed = dealExercises(level, 5, () => 0.91);
      expect(new Set(mixed.map((item) => item.hint)).size).toBe(5);
      const dealt = dealExercises(level, MAX_SEATS * EXERCISES_PER_PLAYER, () => 0.91);
      for (const item of dealt) {
        const source = bank.find((entry) => entry.id === item.id);
        expect(source).toBeTruthy();
        expect(item.options[item.correctIndex]).toBe(source?.options[source.correctIndex]);
      }
    }
  });
});

function playOut(state: TableState): TableState {
  let current = state;
  for (let step = 0; step < 200 && current.phase !== "ranking"; step += 1) {
    if (current.phase === "turn" && current.turnEndsAt) current = advance(current, current.turnEndsAt);
    else if (current.phase === "reveal" && current.revealEndsAt) current = advance(current, current.revealEndsAt);
    else break;
  }
  return current;
}

function wrongIndex(state: { exercises: { correctIndex: number }[]; turnIndex: number }) {
  const correct = state.exercises[state.turnIndex].correctIndex;
  return correct === 0 ? 1 : 0;
}
