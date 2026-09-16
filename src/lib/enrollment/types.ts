import type { DeclaredLevel, EnrollableCourse } from "./catalog";

export type EnrollmentStatus = "confirmed" | "duplicate";

export type EnrollmentRecord = {
  id: string;
  studentId: string;
  email: string;
  courseId: string;
  status: "confirmed";
  source: string;
  idempotencyKey: string | null;
  createdAt: string;
};

export type StudentRecord = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  currentLevel: DeclaredLevel;
  marketingConsent: boolean;
  createdAt: string;
  updatedAt: string;
};

export type EnrollmentEventType =
  | "received"
  | "validated"
  | "enrolled"
  | "duplicate"
  | "honeypot"
  | "n8n_forwarded"
  | "n8n_failed"
  | "outbox_sent"
  | "outbox_failed"
  | "error";

export type EnrollmentEvent = {
  enrollmentId: string | null;
  email: string;
  courseId: string | null;
  eventType: EnrollmentEventType;
  payload?: unknown;
  createdAt: string;
};

export type OutboxDestination = "n8n";

export type OutboxItem = {
  id: string;
  enrollmentId: string;
  destination: OutboxDestination;
  payload: unknown;
  status: "pending" | "sent" | "failed";
  attempts: number;
  lastError: string | null;
  createdAt: string;
  sentAt: string | null;
};

export type EnrollStudentInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  course: EnrollableCourse;
  currentLevel: DeclaredLevel;
  marketingConsent: boolean;
  source: string;
  idempotencyKey?: string;
  clientIp?: string;
};

export type EnrollStudentResult = {
  ok: true;
  status: EnrollmentStatus;
  httpStatus: 200 | 201;
  enrollment: EnrollmentRecord;
  student: StudentRecord;
  course: EnrollableCourse;
  n8n: { forwarded: boolean; error?: string };
};

export type RateLimitDecision = {
  allowed: boolean;
  retryAfterSeconds?: number;
};
