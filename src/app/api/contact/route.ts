import { NextResponse } from "next/server";
import { CONTACT_EMAIL } from "@/lib/site-brand";

export const runtime = "nodejs";

/** El contacto público es solo el correo. Esta ruta no recibe mensajes. */
export async function POST() {
  return NextResponse.json(
    {
      error: `Escribe a ${CONTACT_EMAIL}. Esta página no guarda mensajes.`,
    },
    { status: 410 },
  );
}
