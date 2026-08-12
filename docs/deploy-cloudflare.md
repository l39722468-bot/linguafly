# Deploy Linguafly en Cloudflare (migración desde Vercel)

**Dominio canónico:** `https://linguafly.app`  
**Estrategia de corte:** zero-downtime (preview → validar → DNS → apagar Vercel)  
**Adapter:** `@opennextjs/cloudflare` + Workers (`wrangler`)

---

## Estado actual del repo (Fase 1)

- [x] Next.js bump a `15.5.23` (peer de OpenNext)
- [x] `@opennextjs/cloudflare` + `wrangler`
- [x] `wrangler.jsonc`, `open-next.config.ts`, `public/_headers`
- [x] Scripts `preview` / `deploy` / `cf-typegen`
- [x] Eliminado `runtime = 'edge'` (no soportado por OpenNext Cloudflare)
- [x] Quitado `@vercel/analytics` del layout (GA/GTM siguen)
- [ ] Primer `npm run preview` OK en esta máquina / CI
- [ ] Secrets en Cloudflare Dashboard
- [ ] Deploy preview (`*.workers.dev`)
- [ ] Cutover DNS `linguafly.app`
- [ ] Webhooks Stripe / OAuth / Supabase redirects
- [ ] Apagar Vercel

---

## Comandos

```bash
# Dev habitual (Node)
npm run dev

# Build + runtime Workers local
npm run preview

# Deploy a Cloudflare (requiere login wrangler)
npm run deploy

# Tipos de bindings
npm run cf-typegen
```

Variables locales Wrangler: copiar `.dev.vars.example` → `.dev.vars`  
Variables Next: seguir con `.env.local` (y `NEXTJS_ENV` en `.dev.vars`).

---

## Inventario de integraciones (cutover)

| Sistema | Qué actualizar | Notas |
|---|---|---|
| Cloudflare DNS | `linguafly.app` / `www` → Worker | Proxied, SSL Full (strict) |
| Supabase Auth | Site URL + Redirect URLs | Incluir `https://linguafly.app/**` |
| Stripe | Webhook endpoint | `https://linguafly.app/api/webhooks/stripe` |
| Stripe Customer Portal / success URLs | Base URL canónica | Revisar `NEXT_PUBLIC_SITE_URL` |
| Google / GitHub OAuth | Callback URLs | Si están activos |
| Resend | Dominio / From ya en CF DNS | Sin cambio de host de app |
| IndexNow / crons GitHub Actions | Base URL de API | `INDEXNOW_*`, jobs que peguen a `/api` |
| Cookiebot / CMP | Hosts autorizados | Añadir `linguafly.app` / `www.linguafly.app` |
| GA / GTM | Sin cambio de hosting | Ya en layout |

### Variables críticas (Dashboard Cloudflare → Worker → Settings → Variables)

Copiar desde Vercel al menos:

- `NEXT_PUBLIC_SITE_URL=https://linguafly.app`
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_*`, `NEXT_PUBLIC_STRIPE_*`
- `OPENAI_API_KEY` (+ org si aplica)
- `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_SITE_URL`
- `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN` (Workers AI)
- `NEXTAUTH_*` / OAuth si se usan
- `INDEXNOW_*`, HubSpot, Cookiebot/CMP públicos, etc.

Ver `.env.example` como checklist completo.

---

## Cache / WAF (día del corte)

- **No cachear** HTML autenticado ni `/api/*` (Cache Rules).
- Cache largo OK para `/_next/static/*` (ya en `public/_headers`) y estáticos de `public/` con cuidado.
- Revisar transformaciones que rompan scripts (ver `docs/CLOUDFLARE-SRI-FIX.md`).

---

## Riesgos conocidos

1. **APIs largas** (speaking, TTS, AI tutor): límites CPU/tiempo de Workers → medir en preview; mitigar con timeouts o workers aparte si hace falta.
2. **Bundle / assets grandes** en `public/audio` y blog images → a medio plazo R2.
3. **SEO canónico mixto** (`focus-on-english.com` vs `linguafly.app` en metadata): alinear redirects y `metadataBase` en un PR dedicado post-hosting.
4. **Incremental cache**: activar R2 (`NEXT_INC_CACHE_R2_BUCKET`) cuando el preview esté estable.

---

## Procedimiento de cutover (opción A)

1. `npx wrangler login` + `npm run deploy` → URL `linguafly.<account>.workers.dev`.
2. Smoke test: home, blog, curso, login, Stripe **test**, 2–3 APIs AI.
3. Configurar custom domain `linguafly.app` en el Worker (DNS proxied).
4. Actualizar Stripe webhook + Supabase redirects al dominio canónico.
5. Mantener Vercel 24–72h como rollback.
6. Apagar proyecto Vercel cuando los errores estén OK.

---

## Rollback

1. En Cloudflare DNS, volver a apuntar el hostname al origen/Vercel anterior (o desactivar custom domain del Worker).
2. Reactivar deploy Vercel si estaba pausado.
3. Revertir webhook Stripe al endpoint Vercel.
