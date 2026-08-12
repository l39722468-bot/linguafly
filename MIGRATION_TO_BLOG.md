# Migración a blog gratuito

## Objetivo
Linguafly / Focus English como **blog + cursos públicos**, sin cuentas de usuario ni pagos.

## Eliminado
- **Supabase** (auth, perfiles, progreso en servidor, panel)
- **Stripe** (checkout, webhooks, portal, planes)
- **Resend** (emails de bienvenida, reset, newsletter, tickets)
- Rutas: `/cuenta/*`, `/mi-panel/*`, `/admin/*`, `/planes`, `/success`, `/onboarding`, `/auth/*`
- APIs asociadas (auth, stripe, newsletter, signup, progress, mobile auth, etc.)

## Conservado
- Blog (`/blog`)
- Landings SEO
- Cursos A1–C2 y por sector como contenido público
- APIs de contenido/AI que no dependen de auth (evaluate, TTS, translate, blog search…)
- Analytics (GA/GTM) y CMP

## Comportamiento
- `isFreeAccessMode()` / `isBlogOnlyMode()` siempre activos
- Middleware: solo redirects SEO y rutas de cuenta legacy → `/blog`
- Acceso a unidades de curso: sin gates

## Hosting
Ver `docs/deploy-cloudflare.md` (migración Vercel → Cloudflare Workers / OpenNext).
