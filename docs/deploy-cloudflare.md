# Deploy Linguafly en Cloudflare (blog gratuito)

**Dominio canónico:** `https://linguafly.app`  
**Producto:** blog + cursos públicos **sin registro**  
**Adapter:** `@opennextjs/cloudflare` + Workers  
**CI principal:** Cloudflare **Workers Builds** (repo GitHub conectado)  
**CI manual de respaldo:** `.github/workflows/deploy-cloudflare.yml` (`workflow_dispatch`)

Worker name en `wrangler.jsonc`: **`linguaflyapp1`** (debe coincidir con el Worker del dashboard / Workers Builds)

---

## Checklist del Worker en el Dashboard

En **Workers & Pages → linguaflyapp1 → Settings → Builds**:

| Campo | Valor recomendado |
|---|---|
| Root directory | `/` (raíz del repo) |
| Branch de producción | `main` |
| **Build command** | `npm run cf:build` |
| **Deploy command** | `npm run cf:deploy` |
| Non-production deploy | `npm run cf:upload` |
| Node version | **`22`** (obligatorio: wrangler 4.x exige ≥22) |

> **Obligatorio Node 22.** Con Node 20.9 el build muere al instante:
> `ERR_IMPORT_ASSERTION_TYPE_MISSING` al importar `wrangler/package.json`.
> El builder lee `.nvmrc` / `.node-version` (ambos en `22`) o la variable `NODE_VERSION`.

> **No uses** `npx opennextjs-cloudflare …`  
> Ese nombre en npm es un paquete stub vacío. Usa `npm run cf:*` o
> `npx @opennextjs/cloudflare build|deploy`.

> **Límite 64 MiB:** el Worker no puede superar 64 MiB sin comprimir.
> `cf:build` excluye temporalmente cursos sectoriales + demos + APIs pesadas
> (stubs que redirigen) para caber en el límite. Los cursos A1–C2 y el blog siguen.

### Blog: D1 es el origen de verdad

Cloudflare Workers **no tienen `fs`** sobre `src/content/blog`. Las páginas públicas leen D1 (`linguafly_db`) en request time (`force-dynamic` + `Cache-Control` CDN). El markdown queda como input de autoría; CI aplica migraciones y `scripts/sync-articles-to-d1.ts` hace upsert de los artículos `published: true` de idiomas / alimentación / entrenamiento / inteligencia artificial (más el archivo de inglés, que se publica aunque el flag falte en lo antiguo).

No se embebe `blog-articles.json` en el Worker: a 100k artículos reventaría el límite de 64 MiB.

### Build variables / secrets (panel)

**Obligatorias / recomendadas**
- `NODE_VERSION` = `22` ← **sin esto (o sin `.node-version` 22) el build falla**
- `NEXT_PUBLIC_SITE_URL` = `https://linguafly.app`
- `NODE_OPTIONS` = `--max-old-space-size=6144` (el build es pesado; también va en `cf:build`)
- `CI` = `true`

**Si usas estas features en runtime**
- `OPENAI_API_KEY`
- `CLOUDFLARE_ACCOUNT_ID` / `CLOUDFLARE_API_TOKEN` (Workers AI / TTS internos)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-ZNL3VGHK2E` (propiedad Linguafly; no uses `G-TNTG3MJ3TL` ni `G-845LV77ZG9`), Cookiebot/CMP públicos
- `NEXT_PUBLIC_GOOGLE_TAG_GATEWAY_PATH=/gtag` (ruta first-party; vacía = googletagmanager.com)
- `INDEXNOW_*` si aplica

### Google Tag Gateway (Cloudflare)

El snippet carga `<script async src="/gtag/">` + `gtag('config', 'G-ZNL3VGHK2E')`. En el panel **Google Tag Gateway for linguafly.app**:

1. Toggle **on** (ya está en la captura).
2. Measurement ID: `G-ZNL3VGHK2E`.
3. Measurement path: **`/gtag`** — no uses `/metrics` (el Worker legado responde JSON ahí).
4. **Actualizar configuración** si la ruta del panel no es `/gtag`.

Este repo no puede hacer PUT a la API de zona (`.../settings/google-tag-gateway/config`) sin un token de Cloudflare.

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

El `"name"` del Worker y el service binding `WORKER_SELF_REFERENCE` deben ser **`linguaflyapp1`**.

> Si el dominio `linguafly.app` sigue en un Worker antiguo (`linguaflyapp`), muévelo a **Custom Domains** de `linguaflyapp1` (o reconecta Builds al Worker que tenga el dominio).

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
npm run cf:build  # solo build OpenNext (mismo que Workers Builds)
npm run export:blog-data  # regenera src/generated/blog-*.json
```

---

## Rollback

Reapuntar DNS a Vercel o desactivar el custom domain del Worker.

---

## Si el build falla (`Failed: error occurred while running build command`)

1. **Corrige los comandos** del panel a `npm run cf:build` / `npm run cf:deploy` (tabla de arriba).
2. Confirma variables: `NODE_OPTIONS`, `NEXT_PUBLIC_SITE_URL`, `CI`.
3. **Retry deployment**.
4. Si sigue en rojo: abre el build → **View build log** → copia las **últimas 30–40 líneas**.

Causas frecuentes:
- **ENOSPC / No space left on device** al hacer `cf:deploy` (populate static assets) → demasiadas rutas SSG en caché (p. ej. miles de `/blog/temas/*` thin). Solo se prerenderizan hubs + keywords con ≥3 artículos. En el panel CF: **Clear build cache** y reintentar.
- **Worker > 64 MiB** → `code: 10027` (cf:build ya hace slim de rutas pesadas)
- **Node 20.x** → `ERR_IMPORT_ASSERTION_TYPE_MISSING` / wrangler exige ≥22 (fijar `NODE_VERSION=22`)
- Comando `npx opennextjs-cloudflare` (stub npm; preferir `npm run cf:build`)
- OOM sin `NODE_OPTIONS=--max-old-space-size=6144`
- Build command = `npm run build` (solo Next, no OpenNext → falla el deploy después)
- Nombre Worker distinto al de Workers Builds — el repo usa **`linguaflyapp1`** (name + `WORKER_SELF_REFERENCE`)
- Binding `WORKER_SELF_REFERENCE` apuntando a otro Worker inexistente → `code: 10143`
