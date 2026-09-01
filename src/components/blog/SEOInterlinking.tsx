import Link from "next/link";

interface SEOInterlinkingProps {
  relatedRoute?: string;
  category?: string;
}

export function SEOInterlinking({ relatedRoute, category }: SEOInterlinkingProps) {
  const isSpanishCourse = Boolean(category?.startsWith("curso-espanol-"));
  const spanishLevel = isSpanishCourse ? category!.replace("curso-espanol-", "").toUpperCase() : "";

  if (isSpanishCourse) {
    const hub = `/blog/${category}`;
    return (
      <div className="my-12 p-8 bg-gradient-to-br from-slate-50 to-teal-50 rounded-3xl border border-teal-100 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-4">
          Keep going with {spanishLevel} Spanish
        </h3>
        <p className="text-slate-700 mb-6 leading-relaxed">
          This guide is part of the <strong>{spanishLevel} Spanish course for English speakers</strong>.
          Stay on this track: the next unit continues the same syllabus (PCIC / DELE).
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={hub}
            className="inline-flex items-center justify-center bg-teal-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-teal-800 transition-all hover:scale-[1.02]"
          >
            All {spanishLevel} Spanish guides
          </Link>
        </div>
      </div>
    );
  }

  // Map category to main route if not specified
  const routeMap: Record<string, string> = {
    trabajo: "ingles-para-trabajo",
    viajes: "ingles-para-viajar",
    gramatica: "gramatica-inglesa-guia",
    examenes: "mejores-certificados-ingles-2026",
    metodos: "aprender-ingles",
    "material-estudio": "aprender-ingles",
    "curso-a1": "ingles-a1",
    "curso-a2": "ingles-a2",
    "curso-b1": "ingles-b1",
    "curso-b2": "ingles-b2",
  };

  const finalRoute = relatedRoute || (category ? routeMap[category] : "aprender-ingles") || "aprender-ingles";
  const isHub = finalRoute === "aprender-ingles";
  
  let href = "/aprender-ingles";
  if (!isHub) {
    if (finalRoute === "ingles-para-viajar") {
      href = "/blog/viajes/ingles-para-viajar";
    } else if (finalRoute === "ingles-para-trabajo") {
      href = "/blog/trabajo/ingles-para-trabajo";
    } else if (finalRoute === "gramatica-inglesa-guia") {
      href = "/blog/gramatica/gramatica-inglesa-guia";
    } else if (finalRoute === "mejores-certificados-ingles-2026") {
      href = "/blog/examenes/mejores-certificados-ingles-2026";
    } else if (finalRoute === "ingles-a1") {
      href = "/blog/metodos/ingles-a1";
    } else if (finalRoute === "ingles-a2") {
      href = "/blog/metodos/ingles-a2";
    } else {
      const slug = finalRoute.replace(/^ingles-/, "");
      if (slug === "b1") {
        href = "/blog/metodos/cursos-online-ingles-b1";
      } else {
        href = `/blog/metodos/ingles-${slug}`;
      }
    }
  }
  
  const routeNameMap: Record<string, string> = {
    "ingles-a1": "Curso de Inglés A1",
    "ingles-a2": "Curso de Inglés A2",
    "ingles-b1": "Curso de Inglés B1",
    "ingles-b2": "Curso de Inglés B2",
    "ingles-para-viajar": "Curso de Inglés para Viajar",
    "ingles-para-trabajo": "Curso de Inglés para el Trabajo",
    "gramatica-inglesa-guia": "Guía Completa de Gramática Inglesa",
    "mejores-certificados-ingles-2026": "Guía de Certificados de Inglés 2026",
    "aprender-ingles": "Guía Maestra para Aprender Inglés",
  };

  const routeName = routeNameMap[finalRoute] || "nuestros cursos especializados";

  const courseSeriesHref =
    category === "curso-b2"
      ? "/blog/curso-b2"
      : category === "curso-b1"
      ? "/blog/curso-b1"
      : category === "curso-a2"
      ? "/blog/curso-a2"
      : category === "curso-a1"
        ? "/blog/curso-a1"
        : null;
  const coursePracticeHref =
    category === "curso-b2"
      ? "/curso-b2"
      : category === "curso-b1"
      ? "/curso-b1"
      : category === "curso-a2"
      ? "/curso-a2"
      : category === "curso-a1"
        ? "/curso-a1"
        : null;

  return (
    <div className="my-12 p-8 bg-gradient-to-br from-slate-50 to-coral-50 rounded-3xl border border-coral-100 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 mb-4">Sigue mejorando tu inglés</h3>
      <p className="text-slate-700 mb-6 leading-relaxed">
        Si te ha servido esta guía, te recomendamos profundizar con nuestro <strong>{routeName}</strong> o volver a nuestra sección principal para seguir aprendiendo.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href={href}
          className="inline-flex items-center justify-center bg-coral-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-coral-700 transition-all hover:scale-[1.02]"
        >
          Ver {routeName}
        </Link>
        {courseSeriesHref && (
          <Link
            href={courseSeriesHref}
            className="inline-flex items-center justify-center bg-white border-2 border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold hover:border-coral-200 hover:bg-coral-50/30 transition-all"
          >
            Todas las guías del curso
          </Link>
        )}
        {coursePracticeHref && (
          <Link
            href={coursePracticeHref}
            className="inline-flex items-center justify-center bg-white border-2 border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold hover:border-coral-200 hover:bg-coral-50/30 transition-all"
          >
            Practicar en el curso
          </Link>
        )}
        {!isHub && !courseSeriesHref && (
          <Link 
            href="/aprender-ingles"
            className="inline-flex items-center justify-center bg-white border-2 border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold hover:border-coral-200 hover:bg-coral-50/30 transition-all"
          >
            Guía &ldquo;Aprender Inglés&rdquo;
          </Link>
        )}
      </div>
    </div>
  );
}
