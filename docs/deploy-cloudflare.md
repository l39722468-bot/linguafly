# Deploy Linguafly en Cloudflare (blog gratuito)

**Dominio canónico:** `https://linguafly.app`  
**Producto:** blog + cursos públicos **sin registro**  
**Adapter:** `@opennextjs/cloudflare` + Workers  
**CI principal:** Cloudflare **Workers Builds** (repo GitHub conectado)  
**CI manual de respaldo:** `.github/workflows/deploy-cloudflare.yml` (`workflow_dispatch`)

Worker name en `wrangler.jsonc`: **`linguafly-app`** (debe coincidir con el Worker del dashboard)

---

## Checklist del Worker en el Dashboard

En **Workers & Pages → linguafly-app → Settings → Builds**:

| Campo | Valor recomendado |
|---|---|
| Root directory | `/` (raíz del repo) |
| Branch de producción | `main` |
| **Build command** | `npm run cf:build` |
| **Deploy command** | `npm run cf:deploy` |
| Non-production deploy | `npm run cf:upload` |
| Node version | `22` (o ≥ 20.9) |

> **No uses** `npx opennextjs-cloudflare …`  
> Ese nombre en npm es un paquete stub vacío (“For Security Holding Purposes”) **sin CLI**.  
> Si el builder no encuentra el binario local, el build falla con  
> `Failed: error occurred while running build command`.  
> Usa siempre `npm run cf:*` o, como alternativa oficial, `npx @opennextjs/cloudflare build|deploy`.

### Build variables / secrets (panel)

**Obligatorias / recomendadas**
- `NEXT_PUBLIC_SITE_URL` = `https://linguafly.app`
- `NODE_OPTIONS` = `--max-old-space-size=6144` (el build es pesado; también va en `cf:build`)
- `CI` = `true`
- `NODE_VERSION` = `22` (si el panel lo respeta)

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

El `"name"` del Worker y el service binding `WORKER_SELF_REFERENCE` deben ser **`linguafly-app`**.

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
- Comando `npx opennextjs-cloudflare` (stub npm sin ejecutable)
- OOM sin `NODE_OPTIONS=--max-old-space-size=6144`
- Build command = `npm run build` (solo Next, no OpenNext → falla el deploy después)
- Node < 20.9
