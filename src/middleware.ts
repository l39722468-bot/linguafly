import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import {
  isFreeCourseRoute,
  isLegacyCourseRedirectRoute,
  isPaidCourseRoute,
} from "@/lib/routes/course-access";

const PUBLIC_ROUTES = new Set([
  "/",
  "/contacto",
  "/planes",
  "/cuenta/login",
  "/cuenta/login-admin",
  "/cuenta/registro",
  "/cuenta/recuperar",
  "/cuenta/resetear",
  "/auth/callback",
  "/reset-password",
  "/success",
  "/generador-b2",
  "/api/generate-exercises",
  "/test-nivel",
  "/pilot",
  "/test-toefl",
  "/aprender-ingles",
  "/frases-en-ingles",
  "/aplicaciones-para-aprender-ingles",
  "/certificaciones-ingles-oficiales",
]);

function isBlogRoute(pathname: string) {
  return pathname === "/blog" || pathname.startsWith("/blog/");
}

function normalizeBlogCategorySlug(category: string): string {
  return category
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

function isPublicSEORoute(pathname: string) {
  return (
    pathname.startsWith("/frases-en-ingles/") ||
    pathname.startsWith("/herramientas/")
  );
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isStaticAsset = pathname.includes('.') || pathname.startsWith('/_next/');
  const isApiOrWebhook = pathname.startsWith('/api/');
  const shouldRedirectLegacyCourseRoute = isLegacyCourseRedirectRoute(pathname);

  if (shouldRedirectLegacyCourseRoute && !isStaticAsset && !isApiOrWebhook) {
    const blogUrl = request.nextUrl.clone();
    blogUrl.pathname = '/blog';
    blogUrl.searchParams.delete('next');
    return NextResponse.redirect(blogUrl, 301);
  }

  if (pathname === "/blog") {
    const category = request.nextUrl.searchParams.get("category");
    if (category) {
      const normalizedCategory = normalizeBlogCategorySlug(category);
      if (!normalizedCategory) {
        return NextResponse.next({ request });
      }
      const url = request.nextUrl.clone();
      url.pathname = `/blog/${normalizedCategory}`;
      url.search = "";
      return NextResponse.redirect(url, { status: 301 });
    }
  }

  let response = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Si Supabase no está configurado, permitir rutas públicas sin auth
  const isPublicRoute =
    PUBLIC_ROUTES.has(pathname) ||
    isBlogRoute(pathname) ||
    isPublicSEORoute(pathname) ||
    isFreeCourseRoute(pathname);
  if (!supabaseUrl || !supabaseKey) {
    if (isPaidCourseRoute(pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = "/planes";
      url.searchParams.set("reason", "premium_required");
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url, 303);
    }
    if (isPublicRoute || pathname.startsWith("/misiones")) {
      return response;
    }
    // Para rutas protegidas sin Supabase, redirigir a login
    if (
      pathname.startsWith("/admin") ||
      pathname.startsWith("/misiones") ||
      pathname.startsWith("/onboarding")
    ) {
      const url = request.nextUrl.clone();
      url.pathname = pathname.startsWith("/admin") ? "/cuenta/login-admin" : "/cuenta/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url, 303);
    }
    return response;
  }

  let user = null;
  let profile = null;
  try {
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    });

    const { data: { user: authUser } } = await supabase.auth.getUser();
    user = authUser;

    if (user) {
    const { data } = await supabase
      .from("user_profiles")
      .select("subscription_status, role, placement_completed, language_level, learning_goals")
      .eq("user_id", user.id)
      .single();
    profile = data;
    }
  } catch (err) {
    console.error("[Middleware] Auth error:", err);
    if (isPaidCourseRoute(pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = "/planes";
      url.searchParams.set("reason", "premium_required");
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url, 303);
    }
    if (isPublicRoute) return response;
    if (
      pathname.startsWith("/admin") ||
      pathname.startsWith("/misiones") ||
      pathname.startsWith("/onboarding")
    ) {
      const url = request.nextUrl.clone();
      url.pathname = pathname.startsWith("/admin") ? "/cuenta/login-admin" : "/cuenta/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url, 303);
    }
    return response;
  }

  // Redirección para rutas eliminadas
  if (
    pathname === "/dashboard" || pathname.startsWith("/dashboard/") ||
    pathname === "/profile" || pathname.startsWith("/profile/") ||
    pathname === "/practica-ia" || pathname.startsWith("/practica-ia/") ||
    pathname === "/practica-inteligente" || pathname.startsWith("/practica-inteligente/") ||
    pathname === "/aula" || pathname.startsWith("/aula/")
  ) {
    const url = request.nextUrl.clone();
      url.pathname = "/mi-panel";
    return NextResponse.redirect(url);
  }

  // Rutas públicas que NO deben redirigir al dashboard si está logueado (ej. recursos estáticos, webhooks, etc.)
  // RSC: no redirigir en prefetch salvo rutas de curso de pago (unidad 2+), que sí deben bloquearse.
  const isRSCRequest = request.headers.get('RSC') === '1' || request.nextUrl.searchParams.has('_rsc');
  const isPaidCourse = isPaidCourseRoute(pathname);
  if (
    pathname.startsWith("/api/webhooks") ||
    pathname.startsWith("/audio/") ||
    pathname.includes('.') || // Archivos estáticos
    (isRSCRequest && !isPaidCourse)
  ) {
    return response;
  }

  // Si está autenticado y va a login, enviarlo al panel alumno/admin.
  if (user && pathname === "/cuenta/login") {
    const isAdmin = profile?.role === "admin";
    const url = request.nextUrl.clone();
    url.pathname = isAdmin ? "/admin" : "/mi-panel";
    url.searchParams.delete("next");
    return NextResponse.redirect(url);
  }

  // Si está autenticado y va a registro, redirigir a panel si ya tiene acceso.
  if (user && pathname === "/cuenta/registro") {
    const isPaid = profile?.subscription_status === "active" || profile?.subscription_status === "trialing";
    const isAdmin = profile?.role === "admin";
    
    if (isPaid || isAdmin) {
      const url = request.nextUrl.clone();
      url.pathname = isAdmin ? "/admin" : "/mi-panel";
      url.searchParams.delete("next");
      return NextResponse.redirect(url);
    }
    // Si NO tiene suscripción, permitimos que entre a /cuenta/registro para pagar
  }

  // Rutas públicas generales + unidad 1 / landings de curso
  if (
    PUBLIC_ROUTES.has(pathname) ||
    isBlogRoute(pathname) ||
    isPublicSEORoute(pathname) ||
    isFreeCourseRoute(pathname)
  ) {
    return response;
  }

  // Podcasts son públicos: no requieren autenticación ni suscripción
  if (
    pathname === "/mi-panel/podcasts" ||
    pathname.startsWith("/mi-panel/podcasts/")
  ) {
    return response;
  }

  // Cursos A1–C2: unidad 2+ y extras requieren suscripción (0,99 €/mes)
  if (isPaidCourse) {
    const isPaid =
      profile?.subscription_status === "active" ||
      profile?.subscription_status === "trialing";
    const isAdmin = profile?.role === "admin";

    if (isPaid || isAdmin) {
      return response;
    }

    // Logueado pero perfil aún no "active": dejar pasar al layout,
    // que sincroniza el pago de Stripe → desbloquea unidades.
    if (user) {
      return response;
    }

    const url = request.nextUrl.clone();
    url.pathname = "/planes";
    url.searchParams.set("reason", "premium_required");
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url, 303);
  }

  // Protección para áreas privadas del panel, soporte y administración
  const isProtectedArea = 
    pathname.startsWith("/admin") ||
    pathname.startsWith("/misiones") ||
    pathname.startsWith("/onboarding") ||
    pathname.startsWith("/support/ticket") ||
    pathname.startsWith("/mi-panel");

  if (isProtectedArea) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = pathname.startsWith("/admin") ? "/cuenta/login-admin" : "/cuenta/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url, 303);
    }

    // Si está autenticado, verificar suscripción (excepto outline que sí es "página de cursos")
    const isPaid = profile?.subscription_status === "active" || profile?.subscription_status === "trialing";
    const isAdmin = profile?.role === "admin";
    const isAdminArea = pathname.startsWith("/admin");
    const isToeflExempt = pathname.startsWith("/curso/toefl-");
    const isOutlineOnly = pathname === "/curso-a1/outline" || pathname === "/curso-a2/outline" || pathname === "/curso-b1/outline" || pathname === "/curso-b2/outline";
    const isStudentPanel = pathname.startsWith("/mi-panel");
    const goals = Array.isArray((profile as any)?.learning_goals) ? ((profile as any).learning_goals as string[]) : [];
    const hasPlacementCompleted =
      Boolean((profile as any)?.placement_completed) ||
      Boolean((profile as any)?.language_level) ||
      goals.includes('placement_completed');

    // Admin: si el usuario autenticado no es admin, enviarlo al login de admin (no al de alumno)
    if (isAdminArea && !isAdmin) {
      const url = request.nextUrl.clone();
      url.pathname = "/cuenta/login-admin";
      url.searchParams.set("error", "forbidden");
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url, 303);
    }

    if (!isPaid && !isAdmin && !isToeflExempt && !isOutlineOnly && !isStudentPanel) {
      const url = request.nextUrl.clone();
      url.pathname = "/planes";
      url.searchParams.set("reason", "premium_required");
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url, 303);
    }

    const needsPlacement =
      isPaid &&
      !isAdmin &&
      !hasPlacementCompleted &&
      !pathname.startsWith('/test-nivel') &&
      !pathname.startsWith('/onboarding') &&
      !pathname.startsWith('/success') &&
      !pathname.startsWith('/mi-panel');

    if (needsPlacement) {
      const url = request.nextUrl.clone();
      url.pathname = '/test-nivel';
      url.searchParams.set('source', 'post-pago');
      url.searchParams.set('next', '/mi-panel');
      return NextResponse.redirect(url, 303);
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};
