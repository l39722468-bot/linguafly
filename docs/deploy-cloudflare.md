# Deploy Linguafly en Cloudflare (blog gratuito)

**Dominio canónico:** `https://linguafly.app`  
**Producto:** blog + cursos públicos **sin registro**  
**Adapter:** `@opennextjs/cloudflare` + Workers  
**CI principal:** Cloudflare **Workers Builds** (repo GitHub conectado)  
**CI manual de respaldo:** `.github/workflows/deploy-cloudflare.yml` (`workflow_dispatch`)

Worker name en `wrangler.jsonc`: **`linguafly-app`** (debe coincidir con el Worker del dashboard)

---

## Checklist del Worker en el Dashboard

En **Workers & Pages → tu Worker → Settings → Builds**:

| Campo | Valor recomendado |
|---|---|
| Root directory | `/` (raíz del repo) |
| Branch de producción | `main` |
| **Build command** | `npx opennextjs-cloudflare build` |
| **Deploy command** | `npx opennextjs-cloudflare deploy` |
| Node version | `22` (o la que ofrezca el panel ≥ 20) |

### Build variables / secrets (panel)

**Obligatoria / recomendada**
- `NEXT_PUBLIC_SITE_URL` = `https://linguafly.app`
- `NODE_OPTIONS` = `--max-old-space-size=6144` (el build es pesado)

**Si usas estas features en runtime**
- `OPENAI_API_KEY`
- `CLOUDFLARE_ACCOUNT_ID` / `CLOUDFLARE_API_TOKEN` (Workers AI / TTS internos)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`, Cookiebot/CMP públicos
- `INDEXNOW_*` si aplica

**No hace falta:** `SUPABASE_*`, `STRIPE_*`, `RESEND_*`, OAuth.

### Dominio

1. Worker → **Custom Domains** → añade `linguafly.app` (y `www` si quieres).
2. DNS en Cloudflare (proxied / naranja).
3. SSL Full (strict).
4. Cache Rules: **no cachear** `/api/*` de forma agresiva.

### Compatibilidad

En `wrangler.jsonc` ya están:
- `nodejs_compat`
- `global_fetch_strictly_public`
- assets `.open-next/assets`
- binding `IMAGES`

Si el Worker del dashboard tiene **otro name** distinto de `linguafly`, o bien renómbralo o alinea el `"name"` de `wrangler.jsonc` / el service binding `WORKER_SELF_REFERENCE`.

---

## Estado

- [x] OpenNext + Wrangler en el repo
- [x] Blog sin Supabase/Stripe/Resend
- [x] Workers Builds conectado al repo (por el usuario)
- [ ] Verificar Build/Deploy commands en el panel (tabla de arriba)
- [ ] Primer build verde en Workers Builds
- [ ] Custom domain `linguafly.app`
- [ ] Smoke: home, blog, curso A2, contacto
- [ ] Apagar Vercel

---

## Comandos locales

```bash
npm run preview   # build + Workers local
npm run deploy    # build + deploy (requiere wrangler login)
```

---

## Rollback

Reapuntar DNS a Vercel o desactivar el custom domain del Worker.


## Si el build falla (`Failed: error occurred while running build command`)

1. En **Implementaciones**, abre el build rojo → **View build log** / ver registro.
2. Copia las **últimas 30–40 líneas** (ahí está el error real).
3. En **Settings → Builds → Variables de compilación**, asegúrate de tener:
   - `NODE_OPTIONS` = `--max-old-space-size=6144`
   - `NEXT_PUBLIC_SITE_URL` = `https://linguafly.app`
   - `CI` = `true`
4. Comandos recomendados en Builds:
   - **Build command:** `npm run cf:build`
   - **Deploy command:** `npm run cf:deploy`
   - **Non-production deploy:** `npm run cf:upload`
5. Vuelve a lanzar **Retry deployment**.

Causas frecuentes: falta de memoria en el builder, Node antiguo, o variables `NEXT_PUBLIC_*` ausentes en build.
