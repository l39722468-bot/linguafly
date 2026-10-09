import { hmacSha256Hex, timingSafeEqual } from "@/lib/billing/bytes";

const TOLERANCE_SECONDS = 300;

/** Stripe-Signature header: `t=unix,v1=hex`. */
export async function verifyStripeSignature(
  payload: string,
  header: string | null,
  secret: string,
  nowSeconds = Math.floor(Date.now() / 1000),
): Promise<boolean> {
  if (!header || !secret) return false;
  let timestamp = "";
  const signatures: string[] = [];
  for (const part of header.split(",")) {
    const eq = part.indexOf("=");
    if (eq <= 0) continue;
    const key = part.slice(0, eq).trim();
    const value = part.slice(eq + 1).trim();
    if (key === "t") timestamp = value;
    if (key === "v1" && value) signatures.push(value);
  }
  const stamp = Number(timestamp);
  if (!timestamp || !Number.isFinite(stamp) || signatures.length === 0) return false;
  if (Math.abs(nowSeconds - stamp) > TOLERANCE_SECONDS) return false;
  const expected = await hmacSha256Hex(secret, `${timestamp}.${payload}`);
  return signatures.some((signature) => timingSafeEqual(signature, expected));
}
