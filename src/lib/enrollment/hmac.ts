import { createHmac, timingSafeEqual } from "node:crypto";

export const ENROLLMENT_TIMESTAMP_HEADER = "x-enrollment-timestamp";
export const ENROLLMENT_SIGNATURE_HEADER = "x-enrollment-signature";
export const DEFAULT_SIGNATURE_MAX_SKEW_MS = 5 * 60 * 1000;

export type EnrollmentSignatureFields = {
  enrollmentId: string;
  email: string;
  courseId: string;
};

export function canonicalEnrollmentMessage(
  fields: EnrollmentSignatureFields,
  timestamp: number,
): string {
  return `${timestamp}.${fields.enrollmentId}.${fields.email}.${fields.courseId}`;
}

export function signEnrollmentPayload(
  fields: EnrollmentSignatureFields,
  secret: string,
  timestamp: number,
): string {
  return createHmac("sha256", secret)
    .update(canonicalEnrollmentMessage(fields, timestamp))
    .digest("hex");
}

function safeEqualHex(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left, "utf8");
  const rightBuffer = Buffer.from(right, "utf8");
  if (leftBuffer.length !== rightBuffer.length) return false;
  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function verifyEnrollmentSignature(options: {
  fields: EnrollmentSignatureFields;
  secret: string;
  timestampHeader: string | null | undefined;
  signatureHeader: string | null | undefined;
  now?: number;
  maxSkewMs?: number;
}): boolean {
  const timestamp = Number(options.timestampHeader);
  const signature = (options.signatureHeader || "").trim().toLowerCase();
  if (!Number.isFinite(timestamp) || !signature) return false;

  const now = options.now ?? Date.now();
  const maxSkew = options.maxSkewMs ?? DEFAULT_SIGNATURE_MAX_SKEW_MS;
  if (Math.abs(now - timestamp) > maxSkew) return false;

  const expected = signEnrollmentPayload(
    options.fields,
    options.secret,
    timestamp,
  );
  return safeEqualHex(expected, signature);
}

export function enrollmentSignatureHeaders(
  fields: EnrollmentSignatureFields,
  secret: string,
  timestamp = Date.now(),
): Record<string, string> {
  return {
    [ENROLLMENT_TIMESTAMP_HEADER]: String(timestamp),
    [ENROLLMENT_SIGNATURE_HEADER]: signEnrollmentPayload(
      fields,
      secret,
      timestamp,
    ),
  };
}
