import { bytesToBase64Url, hmacSha256Base64Url, timingSafeEqual } from "@/lib/billing/bytes";

export const READER_COOKIE = "lf_reader";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;

export type ReaderSession = {
  customerId: string;
  email: string;
  exp: number;
};

export function authSecret(): string | null {
  const secret = process.env.AUTH_SECRET?.trim();
  if (!secret || secret.length < 16) return null;
  return secret;
}

export async function signSessionToken(
  session: { customerId: string; email: string },
  secret: string,
  nowSeconds = Math.floor(Date.now() / 1000),
): Promise<string> {
  const payload: ReaderSession = {
    customerId: session.customerId,
    email: session.email,
    exp: nowSeconds + SESSION_TTL_SECONDS,
  };
  const body = bytesToBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const signature = await hmacSha256Base64Url(secret, body);
  return `${body}.${signature}`;
}

export async function verifySessionToken(
  token: string,
  secret: string,
  nowSeconds = Math.floor(Date.now() / 1000),
): Promise<ReaderSession | null> {
  const dot = token.indexOf(".");
  if (dot <= 0) return null;
  const body = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  if (!body || !signature) return null;
  const expected = await hmacSha256Base64Url(secret, body);
  if (!timingSafeEqual(signature, expected)) return null;
  try {
    const json = new TextDecoder().decode(base64UrlToBytes(body));
    const parsed = JSON.parse(json) as Partial<ReaderSession>;
    if (!parsed.customerId || !parsed.email || typeof parsed.exp !== "number") return null;
    if (parsed.exp <= nowSeconds) return null;
    return {
      customerId: parsed.customerId,
      email: parsed.email,
      exp: parsed.exp,
    };
  } catch {
    return null;
  }
}

function base64UrlToBytes(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((value.length + 3) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}
