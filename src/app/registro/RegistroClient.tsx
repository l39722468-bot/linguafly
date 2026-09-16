'use client';

import { Navigation } from "@/components/sections/Navigation";
import { ENROLLABLE_COURSES, getEnrollableCourse } from "@/lib/enrollment/catalog";
import { trackSignUp, trackSignupIntent } from "@/lib/analytics";
import { submitEnrollment } from "./actions";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const CEFR_COURSES = ENROLLABLE_COURSES.filter((course) => course.group === "cefr");
const SECTOR_COURSES = ENROLLABLE_COURSES.filter((course) => course.group === "sector");

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  courseId: string;
  currentLevel: string;
  privacyConsent: boolean;
  marketingConsent: boolean;
  website: string;
};

const INITIAL: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  courseId: "ingles-a1",
  currentLevel: "unknown",
  privacyConsent: false,
  marketingConsent: false,
  website: "",
};

export default function RegistroClient({
  initialCurso,
  initialError,
}: {
  initialCurso?: string;
  initialError?: string;
}) {
  const [formData, setFormData] = useState<FormState>({
    ...INITIAL,
    courseId:
      initialCurso && ENROLLABLE_COURSES.some((course) => course.id === initialCurso)
        ? initialCurso
        : INITIAL.courseId,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    initialError ? "error" : "idle",
  );
  const [errorMessage, setErrorMessage] = useState(initialError || "");
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);
  const [courseHref, setCourseHref] = useState("/blog/curso-a1");
  const [courseName, setCourseName] = useState("Inglés A1 (principiante)");

  useEffect(() => {
    trackSignupIntent("registro_page");
    const params = new URLSearchParams(window.location.search);
    const curso = params.get("curso");
    if (curso && ENROLLABLE_COURSES.some((course) => course.id === curso)) {
      setFormData((prev) => ({ ...prev, courseId: curso }));
      const selected = getEnrollableCourse(curso);
      if (selected) {
        setCourseHref(selected.blogHref);
        setCourseName(selected.name);
      }
    }
    const estado = params.get("estado");
    if (estado === "confirmed" || estado === "duplicate") {
      setAlreadyEnrolled(estado === "duplicate");
      setStatus("success");
      trackSignUp("email", getEnrollableCourse(curso || "ingles-a1")?.level, curso || "ingles-a1");
    }
    const error = params.get("error");
    if (error) {
      setStatus("error");
      setErrorMessage(error);
    }
  }, []);

  const selectedCourse = useMemo(
    () => ENROLLABLE_COURSES.find((course) => course.id === formData.courseId),
    [formData.courseId],
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = event.target;
    const checked = (event.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/enrollment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "registro_web",
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setStatus("error");
        setErrorMessage(data.error || "No se pudo completar el registro.");
        return;
      }
      setAlreadyEnrolled(Boolean(data.alreadyEnrolled));
      setCourseHref(data.courseHref || selectedCourse?.blogHref || "/blog/curso-a1");
      setCourseName(data.courseName || selectedCourse?.name || "tu curso");
      trackSignUp("email", selectedCourse?.level, data.courseId);
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Error de conexión. Por favor, intenta de nuevo.");
    }
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <section className="pt-32 pb-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-coral-700 text-sm font-bold mb-6">
              <span>🎓</span>
              <span>Matrícula de cursos</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6">
              Apúntate a un curso
            </h1>
            <p className="text-xl text-slate-600 mb-4 max-w-2xl mx-auto">
              Deja tu plaza en un curso de inglés A1–C2 o de sector profesional.
              Te confirmamos al momento y te enviamos el acceso.
            </p>
          </div>
        </section>

        <section className="pb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-slate-200">
              {status === "success" ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 text-center">
                  <div className="text-5xl mb-4">🎉</div>
                  <h2 className="text-2xl font-bold text-green-900 mb-2">
                    {alreadyEnrolled ? "Ya estabas apuntado" : "Registro confirmado"}
                  </h2>
                  <p className="text-green-800 text-lg mb-6">
                    {alreadyEnrolled
                      ? `Tu plaza en ${courseName} ya figuraba en el registro. Puedes continuar el curso cuando quieras.`
                      : `Plaza reservada en ${courseName}. Revisa tu correo si configuramos el envío de bienvenida.`}
                  </p>
                  <Link
                    href={courseHref}
                    className="inline-flex items-center justify-center rounded-xl bg-coral-600 px-6 py-3 font-bold text-white hover:bg-coral-700"
                  >
                    Ir al curso
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setFormData(INITIAL);
                      window.history.replaceState({}, "", "/registro");
                    }}
                    className="block mx-auto mt-6 text-green-700 font-bold underline"
                  >
                    Apuntarme a otro curso
                  </button>
                </div>
              ) : (
                <form action={submitEnrollment} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="firstName">
                        Nombre *
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        autoComplete="given-name"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-coral-600 focus:border-transparent"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="lastName">
                        Apellidos
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        autoComplete="family-name"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-coral-600 focus:border-transparent"
                        placeholder="Tus apellidos"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="email">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-coral-600 focus:border-transparent"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="phone">
                      Teléfono
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-coral-600 focus:border-transparent"
                      placeholder="+34 600 000 000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="courseId">
                      Curso *
                    </label>
                    <select
                      id="courseId"
                      name="courseId"
                      value={formData.courseId}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-coral-600 focus:border-transparent"
                    >
                      <optgroup label="Niveles A1–C2">
                        {CEFR_COURSES.map((course) => (
                          <option key={course.id} value={course.id}>
                            {course.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Inglés profesional">
                        {SECTOR_COURSES.map((course) => (
                          <option key={course.id} value={course.id}>
                            {course.name}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="currentLevel">
                      Tu nivel actual
                    </label>
                    <select
                      id="currentLevel"
                      name="currentLevel"
                      value={formData.currentLevel}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-coral-600 focus:border-transparent"
                    >
                      <option value="unknown">No lo sé / prefiero no decirlo</option>
                      <option value="A1">A1</option>
                      <option value="A2">A2</option>
                      <option value="B1">B1</option>
                      <option value="B2">B2</option>
                      <option value="C1">C1</option>
                      <option value="C2">C2</option>
                    </select>
                  </div>

                  <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                    <label htmlFor="website">Sitio web</label>
                    <input
                      id="website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      required
                      id="privacyConsent"
                      name="privacyConsent"
                      checked={formData.privacyConsent}
                      onChange={handleChange}
                      className="mt-1"
                    />
                    <label htmlFor="privacyConsent" className="text-sm text-slate-600">
                      He leído y acepto la{" "}
                      <Link href="/privacidad" className="text-coral-600 font-bold hover:text-coral-700">
                        política de privacidad
                      </Link>
                      {" "}y el tratamiento de mis datos para gestionar la matrícula. *
                    </label>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="marketingConsent"
                      name="marketingConsent"
                      checked={formData.marketingConsent}
                      onChange={handleChange}
                      className="mt-1"
                    />
                    <label htmlFor="marketingConsent" className="text-sm text-slate-600">
                      Quiero recibir avisos de nuevas unidades y recursos (opcional).
                    </label>
                  </div>

                  {status === "error" && (
                    <p className="text-red-600 font-bold text-sm bg-red-50 p-4 rounded-lg border border-red-200">
                      ⚠️ {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-gradient-to-r from-coral-600 to-peach-600 text-white py-4 rounded-lg font-bold text-lg hover:from-coral-700 hover:to-peach-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? "Guardando plaza..." : "Confirmar registro"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
