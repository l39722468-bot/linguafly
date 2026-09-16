import { getAbsoluteUrl } from "@/lib/site-brand";
import { publicCourseStartPath } from "./catalog";
import type { EnrollStudentInput } from "./types";

export type N8nEnrollmentPayload = {
  enrollmentId: string;
  studentId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  courseId: string;
  courseName: string;
  courseHref: string;
  currentLevel: string;
  marketingConsent: boolean;
  source: string;
  alreadyPersisted: true;
};

export type N8nDispatchResult = { forwarded: boolean; error?: string };

export async function dispatchEnrollmentToN8n(
  payload: N8nEnrollmentPayload,
  options: {
    webhookUrl?: string;
    hmacSecret?: string;
    fetchImpl?: typeof fetch;
    signHeaders?: (
      fields: { enrollmentId: string; email: string; courseId: string },
      secret: string,
    ) => Record<string, string>;
  },
): Promise<N8nDispatchResult> {
  const webhookUrl = options.webhookUrl?.trim();
  if (!webhookUrl) {
    return { forwarded: false };
  }

  const body = JSON.stringify(payload);
  const headers: Record<string, string> = {
    "content-type": "application/json",
    accept: "application/json",
  };
  if (options.hmacSecret && options.signHeaders) {
    Object.assign(
      headers,
      options.signHeaders(
        {
          enrollmentId: payload.enrollmentId,
          email: payload.email,
          courseId: payload.courseId,
        },
        options.hmacSecret,
      ),
    );
  }

  const fetchImpl = options.fetchImpl ?? fetch;
  try {
    const response = await fetchImpl(webhookUrl, {
      method: "POST",
      headers,
      body,
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      return {
        forwarded: false,
        error: `n8n respondió ${response.status}${detail ? `: ${detail.slice(0, 180)}` : ""}`,
      };
    }
    return { forwarded: true };
  } catch (error) {
    return {
      forwarded: false,
      error: error instanceof Error ? error.message : "No se pudo contactar con n8n",
    };
  }
}

export function buildN8nPayload(
  input: EnrollStudentInput,
  studentId: string,
  enrollmentId: string,
): N8nEnrollmentPayload {
  return {
    enrollmentId,
    studentId,
    email: input.email,
    firstName: input.firstName,
    lastName: input.lastName,
    phone: input.phone ?? null,
    courseId: input.course.id,
    courseName: input.course.name,
    courseHref: getAbsoluteUrl(publicCourseStartPath(input.course)),
    currentLevel: input.currentLevel,
    marketingConsent: input.marketingConsent,
    source: input.source,
    alreadyPersisted: true,
  };
}
