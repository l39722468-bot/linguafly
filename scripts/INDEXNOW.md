# IndexNow — envío de URLs a Bing (y otros)

IndexNow es un protocolo abierto que notifica a los buscadores (Bing, Yandex, Seznam, Naver) cuando una URL se crea o cambia. Una sola petición al endpoint compartido (`api.indexnow.org`) llega a todos. Google no lo soporta todavía.

## Flujo al crear artículos (obligatorio)

Cada bloque de contenido nuevo del blog debe acabar en Bing lo antes posible:

1. **Keywords Bing** en el frontmatter (además del tema de la unidad):
   - `curso de inglés gratis`
   - `aprender inglés gratis`
   - `curso de inglés online gratis`
   - + 1–2 variantes del nivel/tema (`curso inglés B1 gratis`, etc.)
2. **Merge a `main`** (o push directo) del markdown en `src/content/blog/**` o hubs en `src/content/hubs/**`.
3. El workflow **IndexNow** se dispara solo y notifica a Bing las URLs nuevas/cambiadas.
4. Si el artículo aún no está en producción (CF deploy pendiente), IndexNow igual acepta la URL; Bing la rastrea cuando el deploy esté vivo.
5. Opcional, envío manual inmediato tras el deploy:

```bash
npm run indexnow
# o URLs concretas:
node scripts/indexnow-submit.mjs \
  https://linguafly.app/blog/curso-b1/unidad-7-was-were-going-to \
  https://linguafly.app/blog/curso-b1/unidad-7-was-were-going-to-ejercicios-soluciones
```

IndexNow **no posiciona** por sí solo: acelera el descubrimiento. El ranking en Bing depende de keywords, enlaces internos, hubs y calidad del artículo.

## Host canónico

- **Host:** `linguafly.app` (no usar `www.focus-on-english.com`; ese dominio está deshabilitado)
- Override opcional: `INDEXNOW_HOST` o `NEXT_PUBLIC_SITE_URL`

## Clave del sitio

- Clave: `59006008bf0856c11d13c983f0cd516d`
- Archivo de verificación (expuesto en producción): [`/59006008bf0856c11d13c983f0cd516d.txt`](https://linguafly.app/59006008bf0856c11d13c983f0cd516d.txt)

El archivo vive en `public/` y contiene únicamente la clave. No lo borres ni lo muevas: si el verificador no puede leerlo, las peticiones se rechazan silenciosamente.

## Comandos

```bash
# URLs cambiadas en el último commit (uso diario, tras cada merge a main)
npm run indexnow

# Envío inicial de TODO el sitemap (one-shot la primera vez)
npm run indexnow:all

# No envía, solo imprime el payload (debug)
npm run indexnow:dry
```

Variantes manuales:

```bash
# Cambios desde un ref concreto
node scripts/indexnow-submit.mjs --since=HEAD~5

# URLs explícitas (ignora git)
node scripts/indexnow-submit.mjs \
  https://linguafly.app/blog/curso-b1/unidad-1-repaso-a2-b1 \
  https://linguafly.app/blog/curso-b1/unidad-2-present-perfect-continuous
```

## Respuestas del endpoint

- `200` OK — aceptado.
- `202` Accepted — recibido pero todavía sin procesar.
- `400` Bad Request — JSON inválido o URLs no pertenecen al host declarado.
- `403` Forbidden — el archivo de clave no existe, no es accesible o no coincide.
- `422` Unprocessable — demasiadas URLs para este dominio (el script ya trocea a 10.000).
- `429` Too Many Requests — reintenta en unos minutos.

## Primera puesta en marcha

1. Asegúrate de que el sitio esté desplegado con `public/<clave>.txt` accesible: `curl https://linguafly.app/59006008bf0856c11d13c983f0cd516d.txt` debe devolver exactamente la clave.
2. Da de alta el sitio en Bing Webmaster Tools si todavía no lo está, y verifica el sitemap `https://linguafly.app/sitemap.xml`.
3. Ejecuta `npm run indexnow:all` una sola vez para empujar todos los artículos + hubs.
4. En adelante usa `npm run indexnow` tras cada deploy a main (o deja que el workflow de GitHub Actions lo haga).

## Integración CI (activa)

El repositorio ya incluye `.github/workflows/indexnow.yml` para automatizar el envío tras cada `push` a `main` cuando cambian artículos **o hubs**:

- Trigger: `push` en `main` con cambios en `src/content/blog/**/*.md` o `src/content/hubs/**/*.md`.
- Modo por defecto: envía URLs cambiadas desde `github.event.before` hasta `HEAD`.
- Fallback: si no hay `before` SHA válido (casos especiales), envía sitemap completo (`--all`).
- Manual: `workflow_dispatch` con modo `changed` o `all`.

También puedes ejecutarlo manualmente con `workflow_dispatch`.

## Qué NO hace IndexNow

- No mejora el ranking, solo la velocidad de descubrimiento e indexación en Bing/Yandex/etc.
- No reemplaza al sitemap; lo complementa.
- No afecta a Google (Google ignora IndexNow; sigue usando sitemap + crawl normal).
