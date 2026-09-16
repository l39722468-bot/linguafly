/**
 * @jest-environment node
 */
import {
  enrollmentSignatureHeaders,
  ENROLLMENT_SIGNATURE_HEADER,
  ENROLLMENT_TIMESTAMP_HEADER,
  signEnrollmentPayload,
  verifyEnrollmentSignature,
} from "@/lib/enrollment/hmac";

const fields = {
  enrollmentId: "enr-1",
  email: "ana@linguafly.app",
  courseId: "ingles-a1",
};

describe("enrollment HMAC", () => {
  it("accepts a fresh canonical signature", () => {
    const timestamp = 1_700_000_000_000;
    const headers = enrollmentSignatureHeaders(fields, "secret", timestamp);
    expect(
      verifyEnrollmentSignature({
        fields,
        secret: "secret",
        timestampHeader: headers[ENROLLMENT_TIMESTAMP_HEADER],
        signatureHeader: headers[ENROLLMENT_SIGNATURE_HEADER],
        now: timestamp + 1000,
      }),
    ).toBe(true);
  });

  it("rejects replays, truncated signatures and the wrong secret", () => {
    const timestamp = 1_700_000_000_000;
    const signature = signEnrollmentPayload(fields, "secret", timestamp);

    expect(
      verifyEnrollmentSignature({
        fields,
        secret: "secret",
        timestampHeader: String(timestamp),
        signatureHeader: signature,
        now: timestamp + 10 * 60 * 1000,
      }),
    ).toBe(false);

    expect(
      verifyEnrollmentSignature({
        fields,
        secret: "other",
        timestampHeader: String(timestamp),
        signatureHeader: signature,
        now: timestamp,
      }),
    ).toBe(false);

    expect(
      verifyEnrollmentSignature({
        fields,
        secret: "secret",
        timestampHeader: String(timestamp),
        signatureHeader: signature.slice(0, 8),
        now: timestamp,
      }),
    ).toBe(false);
  });
});
