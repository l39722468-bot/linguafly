import { ENROLLMENT_D1_SCHEMA_SQL } from "./d1-schema";
import type {
  EnrollmentEvent,
  EnrollmentEventType,
  EnrollmentRecord,
  OutboxItem,
  RateLimitDecision,
  StudentRecord,
} from "./types";

export type UpsertStudentInput = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  currentLevel: StudentRecord["currentLevel"];
  marketingConsent: boolean;
  now: string;
};

export type InsertEnrollmentInput = {
  id: string;
  studentId: string;
  email: string;
  courseId: string;
  source: string;
  idempotencyKey?: string;
  now: string;
};

export interface EnrollmentStore {
  findEnrollmentByEmailAndCourse(
    email: string,
    courseId: string,
  ): Promise<EnrollmentRecord | null>;
  findEnrollmentByIdempotencyKey(
    key: string,
  ): Promise<EnrollmentRecord | null>;
  getStudentById(id: string): Promise<StudentRecord | null>;
  upsertStudent(input: UpsertStudentInput): Promise<StudentRecord>;
  insertEnrollment(
    input: InsertEnrollmentInput,
  ): Promise<{ enrollment: EnrollmentRecord; created: boolean }>;
  appendEvent(event: EnrollmentEvent): Promise<void>;
  enqueueOutbox(item: Omit<OutboxItem, "status" | "attempts" | "lastError" | "sentAt">): Promise<void>;
  listPendingOutbox(limit?: number): Promise<OutboxItem[]>;
  markOutboxSent(id: string, sentAt: string): Promise<void>;
  markOutboxFailed(id: string, error: string): Promise<void>;
  consumeRateLimit(options: {
    key: string;
    limit: number;
    windowMs: number;
    now: number;
  }): Promise<RateLimitDecision>;
}

function clone<T>(value: T): T {
  return structuredClone(value);
}

export class MemoryEnrollmentStore implements EnrollmentStore {
  students = new Map<string, StudentRecord>();
  enrollments = new Map<string, EnrollmentRecord>();
  events: EnrollmentEvent[] = [];
  outbox: OutboxItem[] = [];
  rateLimits = new Map<string, { windowStart: number; count: number }>();

  async findEnrollmentByEmailAndCourse(
    email: string,
    courseId: string,
  ): Promise<EnrollmentRecord | null> {
    for (const enrollment of this.enrollments.values()) {
      if (enrollment.email === email && enrollment.courseId === courseId) {
        return clone(enrollment);
      }
    }
    return null;
  }

  async findEnrollmentByIdempotencyKey(
    key: string,
  ): Promise<EnrollmentRecord | null> {
    for (const enrollment of this.enrollments.values()) {
      if (enrollment.idempotencyKey === key) return clone(enrollment);
    }
    return null;
  }

  async getStudentById(id: string): Promise<StudentRecord | null> {
    const student = this.students.get(id);
    return student ? clone(student) : null;
  }

  async upsertStudent(input: UpsertStudentInput): Promise<StudentRecord> {
    const existing = [...this.students.values()].find(
      (student) => student.email === input.email,
    );
    const record: StudentRecord = {
      id: existing?.id ?? input.id,
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
      phone: input.phone ?? existing?.phone ?? null,
      currentLevel: input.currentLevel,
      marketingConsent: input.marketingConsent,
      createdAt: existing?.createdAt ?? input.now,
      updatedAt: input.now,
    };
    this.students.set(record.id, record);
    return clone(record);
  }

  async insertEnrollment(
    input: InsertEnrollmentInput,
  ): Promise<{ enrollment: EnrollmentRecord; created: boolean }> {
    if (input.idempotencyKey) {
      const byKey = await this.findEnrollmentByIdempotencyKey(
        input.idempotencyKey,
      );
      if (byKey) return { enrollment: byKey, created: false };
    }
    const existing = await this.findEnrollmentByEmailAndCourse(
      input.email,
      input.courseId,
    );
    if (existing) return { enrollment: existing, created: false };

    const enrollment: EnrollmentRecord = {
      id: input.id,
      studentId: input.studentId,
      email: input.email,
      courseId: input.courseId,
      status: "confirmed",
      source: input.source,
      idempotencyKey: input.idempotencyKey ?? null,
      createdAt: input.now,
    };
    this.enrollments.set(enrollment.id, enrollment);
    return { enrollment: clone(enrollment), created: true };
  }

  async appendEvent(event: EnrollmentEvent): Promise<void> {
    this.events.push(clone(event));
  }

  async enqueueOutbox(
    item: Omit<OutboxItem, "status" | "attempts" | "lastError" | "sentAt">,
  ): Promise<void> {
    this.outbox.push({
      ...clone(item),
      status: "pending",
      attempts: 0,
      lastError: null,
      sentAt: null,
    });
  }

  async listPendingOutbox(limit = 20): Promise<OutboxItem[]> {
    return this.outbox
      .filter((item) => item.status === "pending" || item.status === "failed")
      .slice(0, limit)
      .map((item) => clone(item));
  }

  async markOutboxSent(id: string, sentAt: string): Promise<void> {
    const item = this.outbox.find((entry) => entry.id === id);
    if (!item) return;
    item.status = "sent";
    item.sentAt = sentAt;
    item.lastError = null;
  }

  async markOutboxFailed(id: string, error: string): Promise<void> {
    const item = this.outbox.find((entry) => entry.id === id);
    if (!item) return;
    item.status = "failed";
    item.attempts += 1;
    item.lastError = error;
  }

  async consumeRateLimit(options: {
    key: string;
    limit: number;
    windowMs: number;
    now: number;
  }): Promise<RateLimitDecision> {
    const current = this.rateLimits.get(options.key);
    if (!current || options.now - current.windowStart >= options.windowMs) {
      this.rateLimits.set(options.key, {
        windowStart: options.now,
        count: 1,
      });
      return { allowed: true };
    }
    if (current.count >= options.limit) {
      const retryAfterSeconds = Math.ceil(
        (current.windowStart + options.windowMs - options.now) / 1000,
      );
      return { allowed: false, retryAfterSeconds };
    }
    current.count += 1;
    return { allowed: true };
  }
}

let memoryStore: MemoryEnrollmentStore | undefined;

export function getMemoryEnrollmentStore(): MemoryEnrollmentStore {
  if (!memoryStore) memoryStore = new MemoryEnrollmentStore();
  return memoryStore;
}

export function resetMemoryEnrollmentStore(): void {
  memoryStore = new MemoryEnrollmentStore();
}

function asBoolean(value: unknown): boolean {
  return value === 1 || value === true || value === "1";
}

function mapStudentRow(row: Record<string, unknown>): StudentRecord {
  return {
    id: String(row.id),
    email: String(row.email),
    firstName: String(row.first_name),
    lastName: String(row.last_name ?? ""),
    phone: row.phone == null ? null : String(row.phone),
    currentLevel: String(row.current_level || "unknown") as StudentRecord["currentLevel"],
    marketingConsent: asBoolean(row.marketing_consent),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

function mapEnrollmentRow(row: Record<string, unknown>): EnrollmentRecord {
  return {
    id: String(row.id),
    studentId: String(row.student_id),
    email: String(row.email),
    courseId: String(row.course_id),
    status: "confirmed",
    source: String(row.source ?? "web"),
    idempotencyKey:
      row.idempotency_key == null ? null : String(row.idempotency_key),
    createdAt: String(row.created_at),
  };
}

function mapOutboxRow(row: Record<string, unknown>): OutboxItem {
  return {
    id: String(row.id),
    enrollmentId: String(row.enrollment_id),
    destination: "n8n",
    payload: row.payload ? JSON.parse(String(row.payload)) : {},
    status: String(row.status) as OutboxItem["status"],
    attempts: Number(row.attempts ?? 0),
    lastError: row.last_error == null ? null : String(row.last_error),
    createdAt: String(row.created_at),
    sentAt: row.sent_at == null ? null : String(row.sent_at),
  };
}

export class D1EnrollmentStore implements EnrollmentStore {
  private schemaReady: Promise<void> | null = null;

  constructor(private readonly db: D1Database) {}

  private async ensureSchema(): Promise<void> {
    if (!this.schemaReady) {
      this.schemaReady = (async () => {
        const statements = ENROLLMENT_D1_SCHEMA_SQL.split(";")
          .map((statement) => statement.trim())
          .filter(Boolean);
        for (const statement of statements) {
          await this.db.prepare(statement).run();
        }
      })();
    }
    await this.schemaReady;
  }

  async findEnrollmentByEmailAndCourse(
    email: string,
    courseId: string,
  ): Promise<EnrollmentRecord | null> {
    await this.ensureSchema();
    const row = await this.db
      .prepare(
        `SELECT id, student_id, email, course_id, source, idempotency_key, created_at
         FROM course_enrollments
         WHERE email = ? AND course_id = ?
         LIMIT 1`,
      )
      .bind(email, courseId)
      .first<Record<string, unknown>>();
    return row ? mapEnrollmentRow(row) : null;
  }

  async findEnrollmentByIdempotencyKey(
    key: string,
  ): Promise<EnrollmentRecord | null> {
    const row = await this.db
      .prepare(
        `SELECT id, student_id, email, course_id, source, idempotency_key, created_at
         FROM course_enrollments
         WHERE idempotency_key = ?
         LIMIT 1`,
      )
      .bind(key)
      .first<Record<string, unknown>>();
    return row ? mapEnrollmentRow(row) : null;
  }

  async getStudentById(id: string): Promise<StudentRecord | null> {
    const row = await this.db
      .prepare(
        `SELECT id, email, first_name, last_name, phone, current_level, marketing_consent, created_at, updated_at
         FROM students WHERE id = ? LIMIT 1`,
      )
      .bind(id)
      .first<Record<string, unknown>>();
    return row ? mapStudentRow(row) : null;
  }

  async upsertStudent(input: UpsertStudentInput): Promise<StudentRecord> {
    await this.ensureSchema();
    await this.db
      .prepare(
        `INSERT INTO students (
           id, email, first_name, last_name, phone, current_level, marketing_consent, created_at, updated_at
         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(email) DO UPDATE SET
           first_name = excluded.first_name,
           last_name = excluded.last_name,
           phone = COALESCE(excluded.phone, students.phone),
           current_level = excluded.current_level,
           marketing_consent = excluded.marketing_consent,
           updated_at = excluded.updated_at`,
      )
      .bind(
        input.id,
        input.email,
        input.firstName,
        input.lastName,
        input.phone ?? null,
        input.currentLevel,
        input.marketingConsent ? 1 : 0,
        input.now,
        input.now,
      )
      .run();

    const row = await this.db
      .prepare(
        `SELECT id, email, first_name, last_name, phone, current_level, marketing_consent, created_at, updated_at
         FROM students WHERE email = ? LIMIT 1`,
      )
      .bind(input.email)
      .first<Record<string, unknown>>();
    if (!row) {
      throw new Error("No se pudo guardar el alumno");
    }
    return mapStudentRow(row);
  }

  async insertEnrollment(
    input: InsertEnrollmentInput,
  ): Promise<{ enrollment: EnrollmentRecord; created: boolean }> {
    if (input.idempotencyKey) {
      const byKey = await this.findEnrollmentByIdempotencyKey(
        input.idempotencyKey,
      );
      if (byKey) return { enrollment: byKey, created: false };
    }

    const result = await this.db
      .prepare(
        `INSERT OR IGNORE INTO course_enrollments (
           id, student_id, email, course_id, status, source, idempotency_key, created_at
         ) VALUES (?, ?, ?, ?, 'confirmed', ?, ?, ?)`,
      )
      .bind(
        input.id,
        input.studentId,
        input.email,
        input.courseId,
        input.source,
        input.idempotencyKey ?? null,
        input.now,
      )
      .run();

    const enrollment = await this.findEnrollmentByEmailAndCourse(
      input.email,
      input.courseId,
    );
    if (!enrollment) {
      throw new Error("No se pudo guardar la matrícula");
    }
    const created = Boolean(
      result.meta &&
        typeof result.meta === "object" &&
        "changes" in result.meta &&
        Number((result.meta as { changes?: number }).changes) > 0,
    );
    return { enrollment, created };
  }

  async appendEvent(event: EnrollmentEvent): Promise<void> {
    await this.ensureSchema();
    await this.db
      .prepare(
        `INSERT INTO enrollment_events (
           enrollment_id, email, course_id, event_type, payload, created_at
         ) VALUES (?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        event.enrollmentId,
        event.email,
        event.courseId,
        event.eventType,
        event.payload == null ? null : JSON.stringify(event.payload),
        event.createdAt,
      )
      .run();
  }

  async enqueueOutbox(
    item: Omit<OutboxItem, "status" | "attempts" | "lastError" | "sentAt">,
  ): Promise<void> {
    await this.db
      .prepare(
        `INSERT INTO enrollment_outbox (
           id, enrollment_id, destination, payload, status, attempts, created_at
         ) VALUES (?, ?, ?, ?, 'pending', 0, ?)`,
      )
      .bind(
        item.id,
        item.enrollmentId,
        item.destination,
        JSON.stringify(item.payload),
        item.createdAt,
      )
      .run();
  }

  async listPendingOutbox(limit = 20): Promise<OutboxItem[]> {
    await this.ensureSchema();
    const result = await this.db
      .prepare(
        `SELECT id, enrollment_id, destination, payload, status, attempts, last_error, created_at, sent_at
         FROM enrollment_outbox
         WHERE status IN ('pending', 'failed') AND attempts < 8
         ORDER BY created_at ASC
         LIMIT ?`,
      )
      .bind(limit)
      .all<Record<string, unknown>>();
    return (result.results ?? []).map(mapOutboxRow);
  }

  async markOutboxSent(id: string, sentAt: string): Promise<void> {
    await this.db
      .prepare(
        `UPDATE enrollment_outbox
         SET status = 'sent', sent_at = ?, last_error = NULL
         WHERE id = ?`,
      )
      .bind(sentAt, id)
      .run();
  }

  async markOutboxFailed(id: string, error: string): Promise<void> {
    await this.db
      .prepare(
        `UPDATE enrollment_outbox
         SET status = 'failed', attempts = attempts + 1, last_error = ?
         WHERE id = ?`,
      )
      .bind(error.slice(0, 500), id)
      .run();
  }

  async consumeRateLimit(options: {
    key: string;
    limit: number;
    windowMs: number;
    now: number;
  }): Promise<RateLimitDecision> {
    await this.ensureSchema();
    const windowStartIso = new Date(
      options.now - (options.now % options.windowMs),
    ).toISOString();
    await this.db
      .prepare(
        `INSERT INTO enrollment_rate_limits (key, window_start, count)
         VALUES (?, ?, 1)
         ON CONFLICT(key) DO UPDATE SET
           count = CASE
             WHEN enrollment_rate_limits.window_start = excluded.window_start
             THEN enrollment_rate_limits.count + 1
             ELSE 1
           END,
           window_start = excluded.window_start`,
      )
      .bind(options.key, windowStartIso)
      .run();

    const row = await this.db
      .prepare(
        `SELECT count, window_start FROM enrollment_rate_limits WHERE key = ? LIMIT 1`,
      )
      .bind(options.key)
      .first<{ count: number; window_start: string }>();

    if (!row || row.count <= options.limit) {
      return { allowed: true };
    }
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil(options.windowMs / 1000),
    };
  }
}

export async function logEnrollmentEvent(
  store: EnrollmentStore,
  event: {
    enrollmentId?: string | null;
    email: string;
    courseId?: string | null;
    eventType: EnrollmentEventType;
    payload?: unknown;
    now?: string;
  },
): Promise<void> {
  await store.appendEvent({
    enrollmentId: event.enrollmentId ?? null,
    email: event.email,
    courseId: event.courseId ?? null,
    eventType: event.eventType,
    payload: event.payload,
    createdAt: event.now ?? new Date().toISOString(),
  });
}
