/**
 * @jest-environment node
 */
import { getEnrollableCourse } from "@/lib/enrollment/catalog";
import {
  drainEnrollmentOutbox,
  enrollStudent,
  EnrollmentRateLimitedError,
} from "@/lib/enrollment/engine";
import { MemoryEnrollmentStore } from "@/lib/enrollment/store";

const course = getEnrollableCourse("ingles-a1")!;

function input(overrides: Record<string, unknown> = {}) {
  return {
    firstName: "Ana",
    lastName: "López",
    email: "ana@linguafly.app",
    course,
    currentLevel: "A1" as const,
    marketingConsent: false,
    source: "test",
    ...overrides,
  };
}

describe("enrollStudent engine", () => {
  it("creates a student once and treats the same email+course as a duplicate", async () => {
    const store = new MemoryEnrollmentStore();
    const first = await enrollStudent(input(), { store });
    expect(first.status).toBe("confirmed");
    expect(first.httpStatus).toBe(201);

    const second = await enrollStudent(input({ firstName: "Anita" }), { store });
    expect(second.status).toBe("duplicate");
    expect(second.httpStatus).toBe(200);
    expect(second.enrollment.id).toBe(first.enrollment.id);
    expect(store.enrollments.size).toBe(1);
  });

  it("allows the same person to enroll in a second course", async () => {
    const store = new MemoryEnrollmentStore();
    await enrollStudent(input(), { store });
    const other = getEnrollableCourse("ingles-b1")!;
    const second = await enrollStudent(input({ course: other }), { store });
    expect(second.status).toBe("confirmed");
    expect(store.enrollments.size).toBe(2);
    expect(store.students.size).toBe(1);
  });

  it("honours the idempotency key", async () => {
    const store = new MemoryEnrollmentStore();
    const first = await enrollStudent(input({ idempotencyKey: "key-abc-123" }), {
      store,
    });
    const second = await enrollStudent(input({ idempotencyKey: "key-abc-123" }), {
      store,
    });
    expect(second.enrollment.id).toBe(first.enrollment.id);
    expect(second.status).toBe("duplicate");
  });

  it("keeps the enrollment if n8n fails and retries the outbox later", async () => {
    const store = new MemoryEnrollmentStore();
    const fetchImpl = jest
      .fn()
      .mockRejectedValueOnce(new Error("n8n down"))
      .mockResolvedValueOnce({ ok: true, text: async () => "" });

    const result = await enrollStudent(input(), {
      store,
      n8nWebhookUrl: "http://n8n.local/webhook/registro-alumnos",
      n8nHmacSecret: "secret",
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });
    expect(result.status).toBe("confirmed");
    expect(result.n8n.forwarded).toBe(false);
    expect(store.outbox[0]?.status).toBe("failed");

    const drained = await drainEnrollmentOutbox({
      store,
      n8nWebhookUrl: "http://n8n.local/webhook/registro-alumnos",
      n8nHmacSecret: "secret",
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });
    expect(drained.forwarded).toBe(1);
    expect(store.outbox[0]?.status).toBe("sent");
    expect(fetchImpl.mock.calls[1][1].headers["x-enrollment-signature"]).toBeTruthy();
  });

  it("rate-limits repeated attempts from the same email", async () => {
    const store = new MemoryEnrollmentStore();
    const now = () => new Date("2026-09-16T08:00:00.000Z");
    const payload = input({ email: "repeat@linguafly.app" });
    for (let i = 0; i < 5; i += 1) {
      await enrollStudent(payload, { store, now });
    }
    await expect(enrollStudent(payload, { store, now })).rejects.toBeInstanceOf(
      EnrollmentRateLimitedError,
    );
  });
});
