# IndexNow — envío de URLs a Bing (y otros)

IndexNow es un protocolo abierto que notifica a los buscadores (Bing, Yandex, Seznam, Naver) cuando una URL se crea o cambia. Una sola petición al endpoint compartido (`api.indexnow.org`) llega a todos. Google no lo soporta todavía.

## Clave del sitio

- Clave: `59006008bf0856c11d13c983f0cd516d`
- Archivo de verificación (expuesto en producción): [`/59006008bf0856c11d13c983f0cd516d.txt`](https://www.focus-on-english.com/59006008bf0856c11d13c983f0cd516d.txt)

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
  https://www.focus-on-english.com/blog/trabajo/cv-ingles \
  https://www.focus-on-english.com/blog/viajes/ingles-alquiler-coche
```

## Respuestas del endpoint

- `200` OK — aceptado.
- `202` Accepted — recibido pero todavía sin procesar.
- `400` Bad Request — JSON inválido o URLs no pertenecen al host declarado.
- `403` Forbidden — el archivo de clave no existe, no es accesible o no coincide.
- `422` Unprocessable — demasiadas URLs para este dominio (el script ya trocea a 10.000).
- `429` Too Many Requests — reintenta en unos minutos.

## Primera puesta en marcha

1. Asegúrate de que el sitio esté desplegado con `public/<clave>.txt` accesible: `curl https://www.focus-on-english.com/59006008bf0856c11d13c983f0cd516d.txt` debe devolver exactamente la clave.
2. Da de alta el sitio en Bing Webmaster Tools si todavía no lo está, y verifica el sitemap `https://www.focus-on-english.com/sitemap.xml`.
3. Ejecuta `npm run indexnow:all` una sola vez para empujar los 327 artículos + hubs.
4. En adelante usa `npm run indexnow` tras cada deploy a main.

## Integración CI (opcional, recomendado)

Para automatizarlo tras cada push a main, añadir `.github/workflows/indexnow.yml`:

```yaml
name: IndexNow
on:
  push:
    branches: [main]
    paths:
      - "src/content/blog/**/*.md"
jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 2
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: node scripts/indexnow-submit.mjs --since=HEAD~1
```

Esto se dispara solo cuando tocas `.md`, detecta lo cambiado entre los 2 últimos commits y lo envía.

## Qué NO hace IndexNow

- No mejora el ranking, solo la velocidad de descubrimiento e indexación en Bing/Yandex/etc.
- No reemplaza al sitemap; lo complementa.
- No afecta a Google (Google ignora IndexNow; sigue usando sitemap + crawl normal).
