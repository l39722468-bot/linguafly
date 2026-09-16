import { z } from "zod";
import {
  DECLARED_LEVELS,
  ENROLLABLE_COURSE_IDS,
  getEnrollableCourse,
  type DeclaredLevel,
  type EnrollableCourse,
} from "./catalog";

const optionalPhone = z
  .string()
  .trim()
  .max(30)
  .optional()
  .transform((value) => (value && value.length > 0 ? value : undefined));

export const enrollmentRequestSchema = z.object({
  firstName: z.string().trim().min(1, "El nombre es obligatorio").max(80),
  lastName: z.string().trim().max(80).default(""),
  email: z
    .string()
    .trim()
    .max(254)
    .email("Email inválido")
    .transform((email) => email.toLowerCase()),
  phone: optionalPhone,
  courseId: z.enum(ENROLLABLE_COURSE_IDS, {
    message: "Selecciona un curso válido",
  }),
  currentLevel: z.enum(DECLARED_LEVELS).default("unknown"),
  privacyConsent: z.literal(true, {
    message: "Debes aceptar la política de privacidad",
  }),
  marketingConsent: z.boolean().default(false),
  source: z.string().trim().max(80).default("web"),
  idempotencyKey: z.string().trim().min(8).max(80).optional(),
  website: z.string().max(200).optional(),
});

export type EnrollmentRequestInput = z.input<typeof enrollmentRequestSchema>;
export type EnrollmentRequest = z.output<typeof enrollmentRequestSchema>;

export type NormalizedEnrollment = EnrollmentRequest & {
  course: EnrollableCourse;
  currentLevel: DeclaredLevel;
};

export type EnrollmentValidationResult =
  | { ok: true; value: NormalizedEnrollment; honeypot: boolean }
  | { ok: false; error: string; status: 400; issues?: string[] };

export function parseEnrollmentRequest(
  raw: unknown,
): EnrollmentValidationResult {
  if (!raw || typeof raw !== "object") {
    return { ok: false, error: "Cuerpo JSON inválido", status: 400 };
  }

  const candidate = raw as Record<string, unknown>;
  const honeypot =
    typeof candidate.website === "string" && candidate.website.trim().length > 0;

  const parsed = enrollmentRequestSchema.safeParse(raw);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => issue.message);
    return {
      ok: false,
      error: issues[0] || "Datos de registro inválidos",
      status: 400,
      issues,
    };
  }

  const course = getEnrollableCourse(parsed.data.courseId);
  if (!course) {
    return { ok: false, error: "Selecciona un curso válido", status: 400 };
  }

  return {
    ok: true,
    honeypot,
    value: {
      ...parsed.data,
      course,
    },
  };
}
