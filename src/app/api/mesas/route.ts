import { NextRequest, NextResponse } from "next/server";
import { PartyError } from "@/lib/party/engine";
import {
  answerParty,
  enterParty,
  leaveParty,
  readParty,
  rematchParty,
  startParty,
} from "@/lib/party/service";
import { partyStoreFromEnv } from "@/lib/party/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const tableId = request.nextUrl.searchParams.get("tableId") ?? "";
    const playerId = request.nextUrl.searchParams.get("playerId") ?? "";
    const table = await readParty(await partyStoreFromEnv(), tableId, cleanPlayerId(playerId));
    return NextResponse.json({ table });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const store = await partyStoreFromEnv();
    const playerId = cleanPlayerId(body.playerId);
    const tableId = String(body.tableId ?? "");
    const action = String(body.action ?? "");

    if (action === "enter") {
      const table = await enterParty(store, {
        playerId,
        name: String(body.name ?? ""),
        level: body.level ? String(body.level) : undefined,
        code: body.code ? String(body.code) : undefined,
      });
      return NextResponse.json({ table });
    }
    if (action === "start") {
      return NextResponse.json({ table: await startParty(store, tableId, playerId) });
    }
    if (action === "answer") {
      const optionIndex = Number(body.optionIndex);
      return NextResponse.json({
        table: await answerParty(store, tableId, playerId, optionIndex),
      });
    }
    if (action === "rematch") {
      return NextResponse.json({ table: await rematchParty(store, tableId, playerId) });
    }
    if (action === "leave") {
      const table = await leaveParty(store, tableId, playerId);
      return NextResponse.json({ table });
    }
    return NextResponse.json({ error: "Acción desconocida." }, { status: 400 });
  } catch (error) {
    return errorResponse(error);
  }
}

function cleanPlayerId(raw: unknown): string {
  const id = String(raw ?? "");
  if (!/^[a-zA-Z0-9-]{8,80}$/.test(id)) {
    throw new PartyError("No se ha podido identificar al jugador.");
  }
  return id;
}

function errorResponse(error: unknown) {
  const status = error instanceof PartyError ? error.status : 500;
  const message = error instanceof Error ? error.message : "No se ha podido jugar esta mesa.";
  if (status === 500) console.error("[mesas]", error);
  return NextResponse.json({ error: message }, { status });
}
