// Google Analytics 4 Event Tracking
// Linguafly — linguafly.app, zona Madrid, EUR.
// Override: NEXT_PUBLIC_GA_MEASUREMENT_ID. Cadena vacía desactiva el tag.

import { isGaMeasurementId } from '@/lib/google-consent-mode';

export const DEFAULT_GA_MEASUREMENT_ID = 'G-ZNL3VGHK2E';
export const LEGACY_GA_MEASUREMENT_ID = 'G-TNTG3MJ3TL';
/** Typo seen in Cloudflare build env: the real Linguafly ID missing the trailing E. */
export const TRUNCATED_GA_MEASUREMENT_ID = 'G-ZNL3VGHK2';
const SUPERSEDED_GA_MEASUREMENT_IDS = new Set([
  LEGACY_GA_MEASUREMENT_ID,
  'G-845LV77ZG9',
  TRUNCATED_GA_MEASUREMENT_ID,
]);

function isTruncatedDefaultGaId(fromEnv: string): boolean {
  return (
    fromEnv !== DEFAULT_GA_MEASUREMENT_ID &&
    DEFAULT_GA_MEASUREMENT_ID.startsWith(fromEnv)
  );
}

export function getGaTrackingId(): string | undefined {
  const fromEnv = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  if (fromEnv === "") return undefined;
  if (
    !fromEnv ||
    fromEnv === "undefined" ||
    fromEnv === "null" ||
    SUPERSEDED_GA_MEASUREMENT_IDS.has(fromEnv) ||
    isTruncatedDefaultGaId(fromEnv) ||
    !isGaMeasurementId(fromEnv)
  ) {
    return DEFAULT_GA_MEASUREMENT_ID;
  }
  return fromEnv;
}

export const GA_TRACKING_ID = getGaTrackingId();

/**
 * Devuelve el grupo de contenido al que pertenece una ruta.
 * Este valor se envía como `content_group` a GA4 para eliminar el "(not set)"
 * en los informes de agrupación de contenido.
 */
export function getContentGroup(pathname: string): string {
  if (pathname === '/') return 'Inicio';
  if (pathname.startsWith('/blog/temas')) return 'Blog - Hub temático';
  if (pathname.startsWith('/blog')) return 'Blog';
  if (/^\/curso-(a1|a2|b1|b2|c1|c2)(\/|$)/.test(pathname)) return 'Cursos CEFR';
  if (pathname.startsWith('/curso-camarero')) return 'Cursos Hostelería';
  if (pathname.startsWith('/curso-logistica')) return 'Cursos Logística';
  if (pathname.startsWith('/curso-recepcionista')) return 'Cursos Recepción';
  if (pathname.startsWith('/cursos-por-sector')) return 'Cursos por Sector';
  if (pathname.startsWith('/podcasts')) return 'Podcasts';
  if (pathname.startsWith('/test-nivel') || pathname.startsWith('/test-toefl')) return 'Test de Nivel';
  if (
    pathname.startsWith('/vocabulario') ||
    pathname.startsWith('/frases-en-ingles') ||
    pathname.startsWith('/aplicaciones-para-aprender-ingles') ||
    pathname.startsWith('/juego-ingles') ||
    pathname.startsWith('/tutor-ia') ||
    pathname.startsWith('/aprender-ingles') ||
    pathname.startsWith('/ingles-para-viajar') ||
    pathname.startsWith('/certificaciones-ingles-oficiales')
  ) return 'Herramientas y Recursos';
  if (pathname.startsWith('/mi-panel') || pathname.startsWith('/onboarding') || pathname.startsWith('/planes')) return 'Área de Usuario';
  if (pathname.startsWith('/privacidad') || pathname.startsWith('/cookies') || pathname.startsWith('/terminos')) return 'Legal';
  if (pathname.startsWith('/sobre-nosotros') || pathname.startsWith('/contacto') || pathname.startsWith('/tutor-privado')) return 'Información';
  return 'Otros';
}

/**
 * Envía un evento page_view a GA4 con todos los parámetros de clasificación.
 * Llama esto en cada cambio de ruta SPA para evitar "(not set)" en los informes.
 */
export const pageview = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag && getGaTrackingId()) {
    const pageTitle = title || document.title;
    const pageLocation = window.location.origin + url;
    const contentGroup = getContentGroup(url);

    window.gtag('event', 'page_view', {
      page_title: pageTitle,
      page_location: pageLocation,
      page_path: url,
      content_group: contentGroup,
    });
  }
};

/**
 * Función base GA4-nativa: envía un evento con parámetros con nombre propio
 * (sin event_category / event_label propios de Universal Analytics).
 * Registra los parámetros como dimensiones personalizadas en GA4 Admin para
 * poder filtrar por ellos en los informes.
 */
export const gaEvent = (eventName: string, params?: Record<string, string | number | boolean | undefined>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};

// ---------------------------------------------------------------------------
// Eventos de artículos del blog
// ---------------------------------------------------------------------------

/** Dispara al cargar un artículo: registra categoría, slug y tiempo estimado de lectura. */
export const trackArticleView = (slug: string, category: string, readingTimeMin: number) => {
  gaEvent('article_view', {
    article_slug: slug,
    article_category: category,
    reading_time_min: readingTimeMin,
  });
};

/** Hito de scroll (25, 50, 75 o 100 %). Solo se dispara una vez por hito por sesión de página. */
export const trackScrollMilestone = (percent: 25 | 50 | 75 | 100, slug: string) => {
  gaEvent('scroll_milestone', {
    scroll_percent: percent,
    article_slug: slug,
  });
};

/** Tiempo total en la página al salir (segundos). */
export const trackTimeOnPage = (seconds: number, slug: string) => {
  gaEvent('time_on_page', {
    article_slug: slug,
    time_seconds: seconds,
  });
};

// ---------------------------------------------------------------------------
// Eventos de CTA y navegación
// ---------------------------------------------------------------------------

/** Clic en cualquier CTA de la web. */
export const trackCTAClick = (ctaName: string, location: string) => {
  gaEvent('cta_click', {
    cta_name: ctaName,
    cta_location: location,
  });
};

/** Vista de una página de curso. */
export const trackCourseView = (level: string, goal: string) => {
  gaEvent('course_view', {
    course_level: level,
    course_goal: goal,
  });
};

/** Inicio de un test de nivel. */
export const trackTestStart = (testType: string) => {
  gaEvent('test_start', {
    test_type: testType,
  });
};

// ---------------------------------------------------------------------------
// Eventos de conversión estándar GA4
// ---------------------------------------------------------------------------

/** Intento de registro (vista del form o primer clic en CTA de registro). */
export const trackSignupIntent = (source: string) => {
  gaEvent('signup_intent', {
    signup_source: source,
  });
};

/** Registro completado (equivalente al evento estándar GA4 `sign_up`). */
export const trackSignUp = (method: string, level?: string, planId?: string) => {
  gaEvent('sign_up', {
    method,
    user_level: level,
    plan_id: planId,
  });
};

/** Inicio de sesión (evento estándar GA4 `login`). */
export const trackLogin = (method: string = 'email') => {
  gaEvent('login', { method });
};

/** Inicio del proceso de pago (evento estándar GA4 `begin_checkout`). */
export const trackBeginCheckout = (planId: string, value: number, currency: string = 'EUR') => {
  gaEvent('begin_checkout', {
    plan_id: planId,
    value,
    currency,
  });
};

// ---------------------------------------------------------------------------
// Eventos de cursos (course_preview y cursos CEFR)
// ---------------------------------------------------------------------------

export const trackA1PreviewLanding = () => {
  gaEvent('a1_preview_landing_view', { course_level: 'A1' });
};

export const trackUnitCardClick = (unitId: string, unitNumber: number) => {
  gaEvent('unit_card_click', {
    unit_id: unitId,
    unit_number: unitNumber,
  });
};

export const trackFilterUsage = (filterType: 'topic' | 'difficulty' | 'search', filterValue: string) => {
  gaEvent('filter_usage', {
    filter_type: filterType,
    filter_value: filterValue,
  });
};

export const trackViewModeToggle = (viewMode: 'grid' | 'modules') => {
  gaEvent('view_mode_toggle', { view_mode: viewMode });
};

export const trackAudioPlayback = (action: 'play' | 'pause' | 'speed_change' | 'seek', unitId?: string, value?: number) => {
  gaEvent(`audio_${action}`, {
    unit_id: unitId,
    playback_value: value,
  });
};

export const trackTranslationToggle = (showTranslation: boolean, unitId?: string) => {
  gaEvent('translation_toggle', {
    unit_id: unitId,
    show_translation: showTranslation,
  });
};

export const trackUnitTimeSpent = (unitId: string, seconds: number) => {
  gaEvent('unit_time_spent', {
    unit_id: unitId,
    time_seconds: seconds,
  });
};

export const trackExerciseCompletion = (unitId: string, exerciseIndex: number, totalExercises: number) => {
  gaEvent('exercise_completion', {
    unit_id: unitId,
    exercise_number: exerciseIndex + 1,
    total_exercises: totalExercises,
  });
};

export const trackUnitCompletion = (unitId: string, totalExercises: number, durationMinutes: number) => {
  gaEvent('unit_completion', {
    unit_id: unitId,
    total_exercises: totalExercises,
    duration_minutes: durationMinutes,
  });
};

// ---------------------------------------------------------------------------
// Compatibilidad con código legacy (no se usa internamente, pero se mantiene
// por si hay llamadas externas no rastreadas).
// ---------------------------------------------------------------------------

/** @deprecated Usa gaEvent() directamente con parámetros GA4 nativos. */
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  gaEvent(action, {
    event_category: category,
    event_label: label,
    value,
  });
};

/** @deprecated Usa trackArticleView() + trackScrollMilestone(). */
export const trackBlogView = (slug: string) => trackArticleView(slug, 'unknown', 5);

/** @deprecated Usa trackScrollMilestone(). */
export const trackScrollDepth = (depth: number, page: string) => {
  gaEvent('scroll_depth', { scroll_percent: depth, article_slug: page });
};

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    _paq?: Array<unknown[]>;
  }
}
