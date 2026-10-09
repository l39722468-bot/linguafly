import { redirectTo } from "@/lib/billing/http";
import { authSecret, READER_COOKIE, signSessionToken, verifySessionToken, type ReaderSession } from "@/lib/billing/session";
import { cookies } from "next/headers";

const MAX_AGE = 60 * 60 * 24 * 30;

function cookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: MAX_AGE,
  };
}

export async function getReaderSession(): Promise<ReaderSession | null> {
  const secret = authSecret();
  if (!secret) return null;
  const jar = await cookies();
  const token = jar.get(READER_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token, secret);
}

export async function startReaderSession(session: {
  customerId: string;
  email: string;
}): Promise<void> {
  const secret = authSecret();
  if (!secret) throw new Error("AUTH_SECRET no está configurado");
  const token = await signSessionToken(session, secret);
  const jar = await cookies();
  jar.set(READER_COOKIE, token, cookieOptions());
}

export async function endReaderSession(): Promise<void> {
  const jar = await cookies();
  jar.set(READER_COOKIE, "", { ...cookieOptions(), maxAge: 0 });
}

export function accountErrorRedirect(
  request: Request,
  page: "/cuenta/entrar" | "/cuenta/registro",
  code: string,
  nextPath: string,
): Response {
  const params = new URLSearchParams({ error: code, next: nextPath });
  return redirectTo(request, `${page}?${params.toString()}`);
}
