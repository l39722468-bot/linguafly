# Deploy Linguafly en Cloudflare (blog gratuito)

**Dominio canónico:** `https://linguafly.app`  
**Producto:** blog + cursos públicos **sin registro, sin Stripe, sin Supabase, sin Resend**  
**Adapter:** `@opennextjs/cloudflare` + Workers (`wrangler`)  
**Corte:** zero-downtime (preview → validar → DNS → apagar Vercel)

---

## Estado (Fase 1 + simplificación blog)

- [x] OpenNext + Wrangler (`wrangler.jsonc`, `open-next.config.ts`, scripts)
- [x] Next.js `15.5.23` (peer OpenNext)
- [x] Eliminado `runtime = 'edge'`
- [x] Eliminado `@vercel/analytics` (GA/GTM siguen)
- [x] Eliminados Resend, Stripe, Supabase (deps + rutas de cuenta/pago)
- [x] Middleware solo SEO/redirects
- [ ] Primer `npm run preview` OK
- [ ] Secrets en Cloudflare Dashboard
- [ ] Deploy preview (`*.workers.dev`)
- [ ] Cutover DNS `linguafly.app`
- [ ] Apagar Vercel

---

## Comandos

```bash
npm run dev
npm run preview   # build + Workers local
npm run deploy    # build + Cloudflare
npm run cf-typegen
```

Variables: `.env.local` + `.dev.vars` (ver `.dev.vars.example`).

---

## Secrets mínimos en Cloudflare Worker

- `NEXT_PUBLIC_SITE_URL=https://linguafly.app`
- `OPENAI_API_KEY` (si se usan APIs AI del blog/cursos)
- `CLOUDFLARE_ACCOUNT_ID` / `CLOUDFLARE_API_TOKEN` (Workers AI / TTS)
- `INDEXNOW_*`, Cookiebot/CMP, GA (públicas)

**Ya no hacen falta:** `SUPABASE_*`, `STRIPE_*`, `RESEND_*`, `NEXTAUTH_*`, OAuth Google/GitHub.

---

## Cache / WAF

- No cachear `/api/*` de forma agresiva.
- `/_next/static/*` con cache largo (`public/_headers`).
- Revisar `docs/CLOUDFLARE-SRI-FIX.md` si Insights rompe scripts.

---

## Cutover

1. `npx wrangler login` + `npm run deploy` → `linguafly.<account>.workers.dev`
2. Smoke: home, blog, un curso A2, contacto
3. Custom domain `linguafly.app` en el Worker
4. Mantener Vercel 24–72h como rollback
5. Apagar Vercel

## Rollback

Reapuntar DNS al origen Vercel y reactivar el proyecto si hacía falta.
