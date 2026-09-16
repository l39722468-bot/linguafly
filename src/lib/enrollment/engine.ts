import { enrollmentSignatureHeaders } from "./hmac";
import {
  buildN8nPayload,
  dispatchEnrollmentToN8n,
} from "./n8n-client";
import { logEnrollmentEvent, type EnrollmentStore } from "./store";
import type { EnrollStudentInput, EnrollStudentResult } from "./types";

const EMAIL_RATE_LIMIT = 5;
const IP_RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60 * 60 * 1000;

export type EnrollmentEngineDeps = {
  store: EnrollmentStore;
  now?: () => Date;
  id?: () => string;
  n8nWebhookUrl?: string;
  n8nHmacSecret?: string;
  fetchImpl?: typeof fetch;
};

export class EnrollmentRateLimitedError extends Error {
  retryAfterSeconds: number;
  constructor(retryAfterSeconds: number) {
    super("Demasiados intentos de registro. Prueba de nuevo más tarde.");
    this.name = "EnrollmentRateLimitedError";
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

export async function enrollStudent(
  input: EnrollStudentInput,
  deps: EnrollmentEngineDeps,
): Promise<EnrollStudentResult> {
  const nowDate = deps.now?.() ?? new Date();
  const now = nowDate.toISOString();
  const newId = deps.id ?? crypto.randomUUID.bind(crypto);

  const emailLimit = await deps.store.consumeRateLimit({
    key: `email:${input.email}`,
    limit: EMAIL_RATE_LIMIT,
    windowMs: RATE_WINDOW_MS,
    now: nowDate.getTime(),
  });
  if (!emailLimit.allowed) {
    throw new EnrollmentRateLimitedError(emailLimit.retryAfterSeconds ?? 3600);
  }

  if (input.clientIp) {
    const ipLimit = await deps.store.consumeRateLimit({
      key: `ip:${input.clientIp}`,
      limit: IP_RATE_LIMIT,
      windowMs: RATE_WINDOW_MS,
      now: nowDate.getTime(),
    });
    if (!ipLimit.allowed) {
      throw new EnrollmentRateLimitedError(ipLimit.retryAfterSeconds ?? 3600);
    }
  }

  if (input.idempotencyKey) {
    const existingByKey = await deps.store.findEnrollmentByIdempotencyKey(
      input.idempotencyKey,
    );
    if (existingByKey) {
      const student = await deps.store.getStudentById(existingByKey.studentId);
      if (student) {
        await logEnrollmentEvent(deps.store, {
          enrollmentId: existingByKey.id,
          email: input.email,
          courseId: input.course.id,
          eventType: "duplicate",
          now,
          payload: { reason: "idempotency_key" },
        });
        return {
          ok: true,
          status: "duplicate",
          httpStatus: 200,
          enrollment: existingByKey,
          student,
          course: input.course,
          n8n: { forwarded: false },
        };
      }
    }
  }

  const existing = await deps.store.findEnrollmentByEmailAndCourse(
    input.email,
    input.course.id,
  );
  if (existing) {
    const student = await deps.store.getStudentById(existing.studentId);
    if (student) {
      await logEnrollmentEvent(deps.store, {
        enrollmentId: existing.id,
        email: input.email,
        courseId: input.course.id,
        eventType: "duplicate",
        now,
        payload: { reason: "email_course" },
      });
      return {
        ok: true,
        status: "duplicate",
        httpStatus: 200,
        enrollment: existing,
        student,
        course: input.course,
        n8n: { forwarded: false },
      };
    }
  }

  const student = await deps.store.upsertStudent({
    id: newId(),
    email: input.email,
    firstName: input.firstName,
    lastName: input.lastName,
    phone: input.phone,
    currentLevel: input.currentLevel,
    marketingConsent: input.marketingConsent,
    now,
  });

  const inserted = await deps.store.insertEnrollment({
    id: newId(),
    studentId: student.id,
    email: input.email,
    courseId: input.course.id,
    source: input.source,
    idempotencyKey: input.idempotencyKey,
    now,
  });

  const created = inserted.created;
  await logEnrollmentEvent(deps.store, {
    enrollmentId: inserted.enrollment.id,
    email: input.email,
    courseId: input.course.id,
    eventType: created ? "enrolled" : "duplicate",
    now,
  });

  if (!created) {
    return {
      ok: true,
      status: "duplicate",
      httpStatus: 200,
      enrollment: inserted.enrollment,
      student,
      course: input.course,
      n8n: { forwarded: false },
    };
  }

  const payload = buildN8nPayload(input, student.id, inserted.enrollment.id);
  let n8n: EnrollStudentResult["n8n"] = { forwarded: false };

  if (deps.n8nWebhookUrl) {
    const outboxId = newId();
    await deps.store.enqueueOutbox({
      id: outboxId,
      enrollmentId: inserted.enrollment.id,
      destination: "n8n",
      payload,
      createdAt: now,
    });

    n8n = await dispatchEnrollmentToN8n(payload, {
      webhookUrl: deps.n8nWebhookUrl,
      hmacSecret: deps.n8nHmacSecret,
      fetchImpl: deps.fetchImpl,
      signHeaders: enrollmentSignatureHeaders,
    });

    if (n8n.forwarded) {
      await deps.store.markOutboxSent(outboxId, now);
      await logEnrollmentEvent(deps.store, {
        enrollmentId: inserted.enrollment.id,
        email: input.email,
        courseId: input.course.id,
        eventType: "n8n_forwarded",
        now,
      });
    } else if (n8n.error) {
      await deps.store.markOutboxFailed(outboxId, n8n.error);
      await logEnrollmentEvent(deps.store, {
        enrollmentId: inserted.enrollment.id,
        email: input.email,
        courseId: input.course.id,
        eventType: "n8n_failed",
        payload: { error: n8n.error },
        now,
      });
    }
  }

  return {
    ok: true,
    status: "confirmed",
    httpStatus: 201,
    enrollment: inserted.enrollment,
    student,
    course: input.course,
    n8n,
  };
}

export async function drainEnrollmentOutbox(
  deps: EnrollmentEngineDeps,
  limit = 20,
): Promise<{ processed: number; forwarded: number; failed: number }> {
  const pending = await deps.store.listPendingOutbox(limit);
  let forwarded = 0;
  let failed = 0;
  const now = (deps.now?.() ?? new Date()).toISOString();

  for (const item of pending) {
    if (item.destination !== "n8n") continue;
    const n8n = await dispatchEnrollmentToN8n(item.payload as never, {
      webhookUrl: deps.n8nWebhookUrl,
      hmacSecret: deps.n8nHmacSecret,
      fetchImpl: deps.fetchImpl,
      signHeaders: enrollmentSignatureHeaders,
    });
    if (n8n.forwarded) {
      await deps.store.markOutboxSent(item.id, now);
      await logEnrollmentEvent(deps.store, {
        enrollmentId: item.enrollmentId,
        email: String((item.payload as { email?: string }).email ?? ""),
        courseId: String((item.payload as { courseId?: string }).courseId ?? ""),
        eventType: "outbox_sent",
        now,
      });
      forwarded += 1;
    } else {
      await deps.store.markOutboxFailed(
        item.id,
        n8n.error ?? "n8n no configurado",
      );
      await logEnrollmentEvent(deps.store, {
        enrollmentId: item.enrollmentId,
        email: String((item.payload as { email?: string }).email ?? ""),
        courseId: String((item.payload as { courseId?: string }).courseId ?? ""),
        eventType: "outbox_failed",
        payload: { error: n8n.error },
        now,
      });
      failed += 1;
    }
  }

  return { processed: pending.length, forwarded, failed };
}
