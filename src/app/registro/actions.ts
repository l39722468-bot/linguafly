"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  enrollStudent,
  EnrollmentRateLimitedError,
} from "@/lib/enrollment/engine";
import { parseEnrollmentRequest } from "@/lib/enrollment/schema";
import { resolveEnrollmentStore } from "@/lib/enrollment/resolve-store";
import { logEnrollmentEvent } from "@/lib/enrollment/store";

function formString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function submitEnrollment(formData: FormData) {
  const raw = {
    firstName: formString(formData, "firstName"),
    lastName: formString(formData, "lastName"),
    email: formString(formData, "email"),
    phone: formString(formData, "phone"),
    courseId: formString(formData, "courseId"),
    currentLevel: formString(formData, "currentLevel") || "unknown",
    privacyConsent: formData.get("privacyConsent") === "on",
    marketingConsent: formData.get("marketingConsent") === "on",
    website: formString(formData, "website"),
    source: "registro_web",
  };

  const parsed = parseEnrollmentRequest(raw);
  if (!parsed.ok) {
    redirect(`/registro?error=${encodeURIComponent(parsed.error)}`);
    return;
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
    redirect(
      `/registro?estado=confirmed&curso=${encodeURIComponent(parsed.value.courseId)}`,
    );
  }

  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");
  const clientIp =
    forwarded?.split(",")[0]?.trim() ||
    headerList.get("cf-connecting-ip") ||
    undefined;

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
        source: "registro_web",
        clientIp,
      },
      {
        store,
        n8nWebhookUrl: process.env.N8N_ENROLLMENT_WEBHOOK_URL,
        n8nHmacSecret: process.env.N8N_ENROLLMENT_HMAC_SECRET,
      },
    );
    redirect(
      `/registro?estado=${result.status}&curso=${encodeURIComponent(result.course.id)}`,
    );
  } catch (error) {
    if (
      typeof error === "object" &&
      error &&
      "digest" in error &&
      String((error as { digest?: string }).digest).startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }
    if (error instanceof EnrollmentRateLimitedError) {
      redirect("/registro?error=Demasiados%20intentos.%20Prueba%20mas%20tarde.");
    }
    console.error("[registro/actions]", error);
    redirect("/registro?error=No%20se%20pudo%20completar%20el%20registro.");
  }
}
