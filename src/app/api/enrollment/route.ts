import { NextRequest, NextResponse } from "next/server";
import { ENROLLABLE_COURSES } from "@/lib/enrollment/catalog";
import {
  drainEnrollmentOutbox,
  enrollStudent,
  EnrollmentRateLimitedError,
} from "@/lib/enrollment/engine";
import { resolveEnrollmentStore } from "@/lib/enrollment/resolve-store";
import { parseEnrollmentRequest } from "@/lib/enrollment/schema";
import { logEnrollmentEvent } from "@/lib/enrollment/store";

export const runtime = "nodejs";

function clientIp(request: NextRequest): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || undefined;
  return request.headers.get("cf-connecting-ip") || undefined;
}

function jsonError(message: string, status: number, extra?: Record<string, unknown>) {
  return NextResponse.json({ success: false, error: message, ...extra }, { status });
}

export async function GET() {
  return NextResponse.json({
    success: true,
    courses: ENROLLABLE_COURSES.map((course) => ({
      id: course.id,
      name: course.name,
      level: course.level,
      group: course.group,
    })),
  });
}

export async function POST(request: NextRequest) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return jsonError("Cuerpo JSON inválido", 400);
  }

  const parsed = parseEnrollmentRequest(raw);
  if (!parsed.ok) {
    return jsonError(parsed.error, parsed.status, { issues: parsed.issues });
  }

  const store = await resolveEnrollmentStore();
  const now = new Date().toISOString();

  if (parsed.honeypot) {
    await logEnrollmentEvent(store, {
      email: parsed.value.email,
      courseId: parsed.value.courseId,
      eventType: "honeypot",
      now,
    });
    return NextResponse.json({
      success: true,
      status: "confirmed",
      alreadyEnrolled: false,
      enrollmentId: "ok",
      courseId: parsed.value.courseId,
      courseName: parsed.value.course.name,
      courseHref: parsed.value.course.blogHref,
    });
  }

  try {
    const result = await enrollStudent(
      {
        firstName: parsed.value.firstName,
        lastName: parsed.value.lastName,
        email: parsed.value.email,
        phone: parsed.value.phone,
        course: parsed.value.course,
        currentLevel: parsed.value.currentLevel,
        marketingConsent: parsed.value.marketingConsent,
        source: parsed.value.source || "web",
        idempotencyKey:
          parsed.value.idempotencyKey ||
          request.headers.get("idempotency-key") ||
          undefined,
        clientIp: clientIp(request),
      },
      {
        store,
        n8nWebhookUrl: process.env.N8N_ENROLLMENT_WEBHOOK_URL,
        n8nHmacSecret: process.env.N8N_ENROLLMENT_HMAC_SECRET,
      },
    );

    return NextResponse.json(
      {
        success: true,
        status: result.status,
        alreadyEnrolled: result.status === "duplicate",
        enrollmentId: result.enrollment.id,
        courseId: result.course.id,
        courseName: result.course.name,
        courseHref: result.course.blogHref,
      },
      { status: result.httpStatus },
    );
  } catch (error) {
    if (error instanceof EnrollmentRateLimitedError) {
      return NextResponse.json(
        { success: false, error: error.message },
        {
          status: 429,
          headers: { "retry-after": String(error.retryAfterSeconds) },
        },
      );
    }
    console.error("[api/enrollment]", error);
    return jsonError("No se pudo completar el registro. Inténtalo de nuevo.", 500);
  }
}

/**
 * n8n (cron de reintentos) vacía el outbox de matrículas que no llegaron
 * al webhook. Autenticado con ENROLLMENT_DRAIN_API_KEY.
 */
export async function PUT(request: NextRequest) {
  const expected = process.env.ENROLLMENT_DRAIN_API_KEY;
  if (!expected) {
    return jsonError("El drenaje del outbox no está configurado", 503);
  }
  if (request.headers.get("x-api-key") !== expected) {
    return jsonError("Unauthorized", 401);
  }

  const store = await resolveEnrollmentStore();
  const result = await drainEnrollmentOutbox({
    store,
    n8nWebhookUrl: process.env.N8N_ENROLLMENT_WEBHOOK_URL,
    n8nHmacSecret: process.env.N8N_ENROLLMENT_HMAC_SECRET,
  });
  return NextResponse.json({ success: true, ...result });
}
