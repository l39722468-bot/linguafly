# IndexNow — envío de URLs a Bing (y otros)

IndexNow notifica a Bing, Yandex, Seznam y Naver cuando una URL se crea o cambia. Google no lo soporta.

## Causa típica de 404 en Bing

IndexNow **acepta** URLs que aún no existen en producción. Bing las rastrea después y, si la página no está desplegada, registra **404**.

Eso pasa si se envían URLs desde un PR / branch de feature **antes** del merge a `main` y del deploy en Cloudflare. El contenido solo vive en el PR → producción responde 404.

**Regla:** solo IndexNow URLs que ya responden **200** en `https://linguafly.app/...`.

## Flujo correcto (obligatorio)

1. Crear el artículo en un PR (keywords de tema/nivel + canonical sin `www`).
2. **No** ejecutar IndexNow desde el branch de feature.
3. Merge a `main` → deploy Cloudflare Workers.
4. Comprobar en el navegador (o `curl -I`) que la URL da **200**.
5. El workflow CI (`.github/workflows/indexnow.yml`) envía IndexNow tras el push a `main`. Si hace falta reenviar a mano:

```bash
# Solo desde main, con el deploy ya vivo
git checkout main && git pull
node scripts/indexnow-submit.mjs --since=HEAD~1
# o URLs concretas:
node scripts/indexnow-submit.mjs https://linguafly.app/blog/curso-b1/...
```

6. Confirmar respuesta IndexNow **`200`** o **`202`**.

### Keywords Bing (evitar canibalización)

Las queries de cabeza comerciales las posee **solo el hub**
[`/blog/temas/curso-ingles`](../src/content/hubs/curso-ingles.md):

- `curso de inglés gratis`
- `aprender inglés gratis`
- `curso de inglés online gratis`

**No** las pongas en frontmatter de guías de unidad, cuadernos ni posts temáticos
(gramática, viajes, etc.): Bing las canibaliza.

En artículos usa long-tail + nivel, por ejemplo:

- `curso inglés B1 gratis` / `ejercicios inglés B2 gratis`
- keywords del tema de la unidad (`first conditional`, `wish if only`, …)

### Canonical

Host canónico **sin www**: `https://linguafly.app/blog/...`

## Protecciones del script

`scripts/indexnow-submit.mjs`:

- **Fuera de CI:** rechaza el envío si el branch actual no es `main` (evita indexar PRs no desplegados). Usa `--force` solo si ya verificaste 200 en producción.
- **`--verify-live`:** comprueba HTTP de cada URL y **no envía** las que no dan 2xx/3xx. Reintentos con espera (útil tras un deploy reciente).
- **CI (`GITHUB_ACTIONS`):** permite envío desde el checkout de `main` sin `--force`.

```bash
# Tras merge + deploy: verificar y enviar
node scripts/indexnow-submit.mjs --verify-live --since=HEAD~1

# Forzar desde otro branch (solo si las URLs YA están 200 en prod)
node scripts/indexnow-submit.mjs --force --verify-live https://linguafly.app/blog/...
```

## Host canónico

- **Host:** `linguafly.app` (sin `www`)
- Override: `INDEXNOW_HOST` o `NEXT_PUBLIC_SITE_URL`

## Clave del sitio

- Clave: `59006008bf0856c11d13c983f0cd516d`
- Archivo: `public/59006008bf0856c11d13c983f0cd516d.txt`
- URL: `https://linguafly.app/59006008bf0856c11d13c983f0cd516d.txt`

Si Cloudflare Bot Fight / WAF desafían esa URL, añade Skip para `/{clave}.txt` e `/indexnow-key.txt`. Sin clave legible IndexNow responde `403`.

## Comandos

```bash
# Tras merge a main (último commit)
npm run indexnow

# Con verificación HTTP previa
npm run indexnow:verify

# Sitemap completo (one-shot)
npm run indexnow:all

# Dry-run
npm run indexnow:dry
```

## Respuestas del endpoint

- `200` / `202` — aceptado
- `400` — JSON inválido o host incorrecto
- `403` — clave inaccesible o incorrecta
- `422` / `429` — límite / rate limit

## Integración CI

`.github/workflows/indexnow.yml` en `push` a `main` cuando cambian `src/content/blog/**/*.md` o `src/content/hubs/**/*.md`. Espera breve al deploy y envía con `--verify-live` (reintentos). También `workflow_dispatch` (`changed` | `all`).

## Recuperar URLs ya enviadas con 404

1. Merge de los PRs de contenido a `main`.
2. Esperar deploy CF.
3. Confirmar 200 en cada URL.
4. Reenviar: `node scripts/indexnow-submit.mjs --verify-live --force <urls…>` o `workflow_dispatch` modo `all` tras el merge.
5. En Bing Webmaster Tools, pedir re-rastreo de las URLs afectadas si siguen en error.

## Qué NO hace IndexNow

- No mejora el ranking por sí solo; solo acelera el descubrimiento.
- No reemplaza al sitemap.
- No afecta a Google.
