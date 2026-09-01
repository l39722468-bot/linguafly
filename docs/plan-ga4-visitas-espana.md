# Plan: controlar visitas con Google Analytics 4 y ver tráfico de España

**Sitio:** [linguafly.app](https://linguafly.app) (Linguafly / Focus English)  
**Audiencia objetivo:** hispanohablantes, sobre todo España (`locale` `es_ES`)  
**Propiedad GA4 Linguafly:** Measurement ID `G-845LV77ZG9`  
**Propiedad legacy (Focus English, no usar):** `G-TNTG3MJ3TL` · `380786116`  
**GTM:** eliminado del layout (el contenedor `GTM-PR2H3P77` respondía 404). Un solo cargador: gtag.  
**Analítica paralela:** Matomo Cloud (`linguaflyapp.matomo.cloud`, site id `1`)

Este plan no pide rehacer el tracking desde cero. El tag de GA4 ya carga en `src/components/GoogleAnalytics.tsx`, los `page_view` SPA se envían en cada cambio de ruta, y los eventos de producto viven en `src/lib/analytics.ts`. El trabajo es **configurar la propiedad, los informes y el consentimiento** para que las visitas de España se vean con claridad y se puedan vigilar cada día.

**Fase 0 (2026-09-01):** auditoría ejecutada. Resultados en [§12](#12-fase-0--resultados-2026-09-01).  
**Propiedad Linguafly `G-845LV77ZG9`:** creada. Snippet de Google **no** se pega en el HTML (el componente ya carga gtag). Falta poner el mismo ID como variable de **build** en Cloudflare si el Worker aún tiene `G-TNTG3MJ3TL`.

---

## 1. Objetivo

1. Ver, cada día, cuántas personas reales visitan Linguafly **desde España**.
2. Separar España del resto (Latam, UE, bots, tráfico interno) sin borrar esos datos.
3. Tener un panel y alertas para detectar caídas o picos en España.
4. Corregir las causas habituales por las que España aparece vacío, en `(not set)` o diluido.

**Regla de oro:** filtrar en los **informes**, no en la **recogida**. Un filtro de datos que excluya todo lo que no sea España borra Latam y el resto de la UE para siempre. España se aísla con comparaciones, audiencias e informes guardados.

---

## 2. Estado actual en el código

| Pieza | Dónde | Qué hace hoy |
|---|---|---|
| GA4 gtag | `src/components/GoogleAnalytics.tsx` | Carga `gtag.js` con `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `anonymize_ip: true`, `content_group` por ruta |
| Pageviews SPA | mismo componente | Primer hit al `config`; el resto con `event: page_view` al cambiar `pathname` |
| Eventos de producto | `src/lib/analytics.ts` | Blog, CTA, cursos, signup, checkout, ejercicios |
| GTM | — | **Eliminado.** `GTM-PR2H3P77` daba 404; un solo cargador gtag |
| Consentimiento | Cookiebot / InMobi + Consent Mode v2 | Default `analytics_storage: denied` en `<head>` (`GoogleConsentMode`); gtag.js carga después y el CMP actualiza a granted |
| Ads | `src/lib/marketing-consent.ts` | AdSense/Monetag sí esperan consentimiento; GA **no** usa ese helper |
| Matomo | `src/components/MatomoAnalytics.tsx` | Segundo contador, independiente de GA4 |

Implicaciones para España:

- Consent Mode v2 arranca en `denied`; Cookiebot/InMobi actualizan a granted. Sin aceptar estadísticas, GA4 solo envía pings sin cookie (modelado).
- En la propiedad nueva hay que **desactivar** los page_view por historial de Medición mejorada. Si no, Next.js y GA4 duplican cada ruta SPA.
- `anonymize_ip: true` es correcto (GA4 ya anonimiza IP). **No impide** el país; la geo se calcula antes de recortar la IP.

---

## 3. Por qué España puede no verse (diagnóstico)

Hacer esta auditoría **antes** de tocar informes. Entras en [analytics.google.com](https://analytics.google.com/) → propiedad **380786116**.

### 3.1 Ajuste obligatorio en EEE (causa nº 1)

**Admin → Recogida y modificación de datos → Recogida de datos → Recogida de datos de ubicación y dispositivo detallados.**

Tiene que estar **activado para la Unión Europea / EEE**. Si está apagado, Google deja de enviar país/ciudad de usuarios de España y el informe muestra `(not set)` o números ridículos.

También revisar:

- Zona horaria de la propiedad: **Madrid (GMT+01:00 / Europe/Madrid)**.
- Moneda: **EUR**.
- País de la empresa: **España**.
- Retención de datos de eventos: **14 meses** (máximo útil para tendencias).

### 3.2 Consentimiento y modelado

En España la mayoría de visitantes rechazan cookies no esenciales. Si GA solo cuenta a quien acepta:

- El tráfico real de España es **mayor** que el de GA.
- Search Console y Cloudflare mostrarán más visitas ES que GA4.

Contraste rápido (mismo periodo, p. ej. 7 días):

| Fuente | Dónde | País |
|---|---|---|
| GA4 | Informes → Atributos del usuario → Datos demográficos | Country = Spain |
| Search Console | Rendimiento → País | España |
| Cloudflare | Analytics / Web Analytics o logs `CF-IPCountry=ES` | ES |
| Matomo | Visitantes → Ubicaciones | Spain |

Si GSC y Cloudflare tienen España y GA4 no, el problema es **consentimiento / granular location / doble tag**, no falta de tráfico.

### 3.3 Doble conteo y ruido

- **GTM + gtag a la vez:** Admin → Flujos de datos → Web → ver hits de `page_view` duplicados en DebugView.
- **Bots y crawlers** (sobre todo EE. UU.): inflan el total y hacen que España parezca un % pequeño.
- **Tráfico interno** (equipo, CI, previews): filtrarlo por IP, no por país.
- **Latam:** México, Colombia, Argentina, etc. son visitas reales; no son “error”. Deben verse en un segundo segmento, no mezcladas con el KPI de España.

### 3.4 Checklist de 15 minutos (Fase 0)

1. Abrir **Informes en tiempo real**. Desde un móvil en España (o VPN ES) entrar en `https://linguafly.app`. Debe aparecer 1 usuario en **Spain** en menos de 30 s.
2. Si no aparece: Chrome DevTools → Red → filtrar `google-analytics` / `gtag` / `collect`. ¿Sale `G-TNTG3MJ3TL`? ¿Hay dos recolectores (GTM y gtag)?
3. Admin → Recogida de datos de ubicación detallada → **ON para UE**.
4. Admin → Flujos de datos → confirmar dominio `linguafly.app` (no solo el host legacy `focus-on-english.com`).
5. Comparar 7 días GA4 Spain vs Search Console España.

---

## 4. Cómo ver las visitas de España (sin desplegar código)

Estos pasos se hacen en la UI de GA4. No cambian el código.

### 4.1 Informe estándar de país

1. **Informes → Atributos del usuario → Detalles demográficos.**
2. Dimensión principal: **País**.
3. Buscar **Spain** (en la interfaz en inglés) o **España** (si la UI está en español). El código de país es `ES`.
4. Clic en Spain → ver ciudades (Madrid, Barcelona, Valencia, etc.). Si las ciudades salen `(not set)` y el país sí, la geo de país funciona; falta detalle de ciudad (señales de Google o granular location).

Métricas a mirar para España:

- Usuarios
- Usuarios nuevos
- Sesiones / sesiones con interacción
- Tiempo medio de interacción
- Tasa de conversión (`sign_up`, `begin_checkout`)

### 4.2 Comparación permanente “España vs resto”

En cualquier informe (Adquisición, Páginas, Embudo):

1. Botón **Comparar**.
2. Condición: `País` **coincide exactamente con** `Spain`.
3. Segunda comparación opcional: `País` **no coincide con** `Spain`.
4. Guardar el informe (pin en la colección **Informes** o “Guardar como informe”).

Así el dashboard diario muestra dos columnas: España | Resto.

### 4.3 Audiencia “España” (para funnels y anuncios)

**Admin → Audiencias → Nueva audiencia → Crear personalizada:**

- Condición: `País` = `Spain`
- Nombre: `ES - visitantes España`
- Ventana: 30 días

Usos: embudo de registro solo ES, remarketing (si hay Consent Mode y ads), exploración de cohortes.

No uses esta audiencia como **filtro de datos** de la propiedad.

### 4.4 Exploración (Explore) — el informe de control semanal

**Explorar → Formato libre:**

| Área | Configuración |
|---|---|
| Dimensiones | País, Ciudad, Página de destino, Grupo de contenido, Fuente/medio, Dispositivo |
| Métricas | Usuarios, Sesiones, Sesiones con interacción, Eventos clave |
| Filtro del informe | País = Spain |
| Segmentos | España orgánico / España directo / España social (opcional) |
| Periodo | 28 días vs 28 anteriores |

Guardar como **“Control semanal ES”**.

Desgloses útiles para Linguafly:

- Landing: `/`, `/blog/*`, `/curso-a1`, `/curso-b2`, `/test-nivel`, `/vocabulario`
- `content_group` (ya se envía desde `getContentGroup()`): Inicio, Blog, Cursos CEFR, etc.
- Eventos: `article_view`, `cta_click`, `sign_up`, `begin_checkout`

### 4.5 Tiempo real

**Informes → En tiempo real → Vista de usuarios por país.**  
Sirve para validar deploys y campañas. Un pico en United States a las 03:00 hora Madrid suele ser bot, no usuario.

---

## 5. Panel de control y alertas (control diario)

### 5.1 Colección de informes GA4

Crear una colección **“Linguafly España”** con:

1. Resumen (usuarios ES 7d / 28d).
2. Adquisición → User acquisition, comparación España.
3. Participación → Páginas y pantallas, filtro Spain.
4. Eventos clave (sign_up, begin_checkout) filtro Spain.
5. Exploración “Control semanal ES”.

### 5.2 Insights personalizados (alertas)

**Informes → Insights → Crear insight:**

- **Caída de usuarios de Spain** > 30 % vs semana anterior → aviso por email.
- **Pico de usuarios United States** anómalo (bots).
- **Caída de `sign_up` con País = Spain**.

GA4 no es un sistema de paging 24/7; para eso, Looker Studio + email o un export a BigQuery.

### 5.3 Looker Studio (recomendado a 7–14 días)

Conectar la propiedad `380786116` a [Looker Studio](https://lookerstudio.google.com/):

- Filtro de página a nivel de informe: `Country` = `Spain`.
- Scorecards: usuarios ES hoy / 7d / 28d.
- Serie temporal usuarios ES vs resto.
- Tabla top landing ES.
- Tabla ciudades ES (Madrid, Barcelona, Valencia, Sevilla, Zaragoza…).
- Embudo: `page_view` → `cta_click` → `sign_up` → `begin_checkout` (solo ES).

Compartir el informe con el equipo. Este es el “control de visitas” operativo; GA4 queda como fuente.

### 5.4 Complemento: Search Console + Cloudflare

No sustituyen a GA4, corrigen su ceguera por cookies:

- **Search Console → Rendimiento → País = España:** clics y impresiones orgánico ES (no depende del banner).
- **Cloudflare** `CF-IPCountry=ES`: visitas de red reales, útil como techo (“cuánta gente ES llega al Worker”).

KPI semanal sugerido:

```
Visitas red ES (Cloudflare) ≥ Sesiones GA4 ES ≥ Clics GSC ES
```

Si GA4 ES << Cloudflare ES, el banner o Consent Mode está cortando demasiado o el tag no espera al consentimiento de forma limpia.

---

## 6. Filtros de calidad (sí) vs filtro de país (no)

### 6.1 Sí: tráfico interno

**Admin → Flujos de datos → Configurar ajustes de tag → Definir tráfico interno.**

- Regla `internal` con IPs del equipo / oficina.
- Luego **Admin → Filtros de datos → Tráfico interno** en modo **Prueba** 48 h y después **Activo**.

### 6.2 Sí: desarrolladores / previews

Excluir hosts `localhost`, `*.workers.dev`, previews de Cloudflare si llegan a la misma propiedad. Mejor: **no poner** `NEXT_PUBLIC_GA_MEASUREMENT_ID` en preview, o usar una propiedad GA4 de staging.

### 6.3 Sí: detección de bots

Dejar activada la **exclusión de bots** de Google (viene por defecto). Revisar top países: si United States + 100 % bounce + 0 s, es crawler.

### 6.4 No: filtro de datos “solo España”

No crear un filtro que descarte `country != Spain`. Perderías México, Colombia, Argentina y el resto de UE. El producto es español global; el KPI de negocio es España, no el único mercado.

---

## 7. Mejoras de código (Fases de implementación)

Ordenadas por impacto para **ver España bien**, no por tamaño de diff.

### Fase A — Consent Mode v2 (imprescindible en España)

Google exige Consent Mode v2 en el EEE para medición y, si hay anuncios, para `ad_user_data` / `ad_personalization`.

Comportamiento deseado:

1. Antes de cualquier `gtag('config')` o GTM, definir el default:

```js
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500,
});
```

2. Cuando Cookiebot (o InMobi TCF) dé consentimiento de **estadísticas**:

```js
gtag('consent', 'update', { analytics_storage: 'granted' });
```

3. Cuando dé **marketing**, actualizar `ad_storage`, `ad_user_data`, `ad_personalization`.

Cookiebot tiene integración nativa con Consent Mode; hay que activarla en el panel de Cookiebot **y** no inyectar `gtag config` a mano de forma que se salte el CMP.

En código Linguafly hoy:

- Ads usan `runWithMarketingConsent`.
- GA no espera un equivalente `statistics`.
- Cookiebot `manual` no bloquea GTM/gtag.

Implementación prevista (cuando se acepte esta fase):

- Nuevo helper `hasStatisticsConsent()` paralelo a `hasMarketingConsent()`.
- `GoogleAnalytics.tsx` y el snippet GTM del layout solo configuran la medición tras consentimiento, o cargan en modo denegado (pings cookieless / modelado).
- Un solo cargador: **o GTM o gtag**, no los dos con la misma propiedad.

### Fase B — Un solo canal de medición

Elegir una arquitectura:

| Opción | Cuándo |
|---|---|
| **Solo GTM** | Si el contenedor `GTM-PR2H3P77` ya dispara GA4, eventos y Consent Mode. Entonces hay que **quitar** `GoogleAnalytics.tsx` y enviar eventos con `dataLayer.push`. |
| **Solo gtag** | Si se quiere el control en repo (`analytics.ts`). Entonces hay que **quitar** el snippet GTM del layout (o dejar GTM solo para ads, sin tag GA4 duplicado). |

Acción inmediata de auditoría (sin preferir aún): en GTM, listar tags que apuntan a `G-TNTG3MJ3TL`. Si existe tag GA4 Configuration + el componente React, hay doble `page_view`.

### Fase C — Consentimiento alineado con Cookiebot

- Cambiar el bloqueo de analítica a algo equivalente a ads: no disparar `config` hasta `Cookiebot.consent.statistics === true` **o** usar Consent Mode cookieless (recomendado: Consent Mode, para no perder el 100 % de ES).
- Verificar que `data-cookieconsent="statistics"` coincide con la categoría real en Cookiebot Manager para `linguafly.app`.
- Dominios autorizados: `linguafly.app` y `www.linguafly.app` (ya están en `cookiebot-config.ts`).

### Fase D — Dimensiones y eventos ya existentes

No hace falta un evento `country`; GA4 lo deriva de la IP. Lo que sí conviene en Admin:

Registrar como **dimensiones personalizadas** (evento) los parámetros que ya se envían, para poder filtrar España **y** contenido:

- `content_group`
- `article_slug` / `article_category`
- `cta_name` / `cta_location`
- `course_level` / `plan_id`

Sin este registro, los parámetros existen en DebugView pero no en informes estándar.

### Fase E — (Opcional) BigQuery Export

Si más adelante se quiere “visitas ES” en SQL:

```sql
SELECT
  COUNT(DISTINCT user_pseudo_id) AS usuarios_es
FROM `proyecto.analytics_380786116.events_*`
WHERE geo.country = 'Spain'
  AND _TABLE_SUFFIX BETWEEN '20260901' AND '20260907'
```

No es necesario para el control diario; Looker Studio basta.

---

## 8. Rutina operativa (quién mira qué)

| Cadencia | Qué | Dónde | Criterio de alarma |
|---|---|---|---|
| Diario (2 min) | Usuarios ES ayer vs hace 7 días | Tiempo real + scorecard Looker | Caída > 30 % sin deploy/SEO conocido |
| Semanal | Exploración “Control semanal ES” | GA4 Explore | Landing ES que cae; ciudades; fuente/medio |
| Semanal | GSC País = España | Search Console | Clics ES vs sesiones GA4 ES |
| Mensual | Embudo ES: visita → CTA → registro → checkout | GA4 + eventos actuales | Fuga rara en un paso |
| Tras cada deploy | 1 hit real desde ES en DebugView | GA4 DebugView | No hay `page_view` duplicado |

DebugView: Chrome con [Google Analytics Debugger](https://chrome.google.com/webstore) o `?debug_mode=true` + Admin → DebugView.

---

## 9. Plan de trabajo por fases

### Fase 0 — Auditoría (sin código)

Resultados del 2026-09-01: ver [§12](#12-fase-0--resultados-2026-09-01).

- [x] Measurement ID `G-TNTG3MJ3TL` **existe y sirve gtag.js** (propiedad citada `380786116`).
- [ ] Confirmar que `NEXT_PUBLIC_GA_MEASUREMENT_ID` está **inlinado en el Worker de producción** (bloqueado: WAF de Cloudflare).
- [x] Ubicación detallada (DEVICE_AND_GEO): **no hay redacción global** en el destino GA4. Falta confirmar el toggle UE en Admin.
- [ ] Zona horaria Madrid, moneda EUR (hace falta Admin GA4).
- [ ] Hit de prueba desde España en tiempo real (bloqueado: IP del agente fuera de ES + challenge Cloudflare).
- [x] Inventario GTM-PR2H3P77: contenedor **404**, no hay tags GA4 duplicados vía GTM.
- [ ] Comparar 7 días: GA4 Spain vs GSC España vs Cloudflare ES (hace falta acceso a las consolas).

### Fase 1 — Informes España (solo UI GA4)

- [ ] Comparación País = Spain en Adquisición y Páginas.
- [ ] Audiencia `ES - visitantes España`.
- [ ] Exploración “Control semanal ES” guardada.
- [ ] Colección de informes “Linguafly España”.
- [ ] Insight de caída de usuarios Spain.
- [ ] Registrar dimensiones personalizadas (`content_group`, etc.).

### Fase 2 — Calidad

- [ ] Filtro de tráfico interno (IPs del equipo).
- [ ] Staging sin ID de producción.
- [ ] Looker Studio con filtro Spain.

### Fase 3 — Código (propiedad Linguafly)

- [x] Consent Mode v2 default (`denied`) en `<head>` (`GoogleConsentMode`).
- [x] Un solo cargador: gtag. Snippet GTM-PR2H3P77 (404) eliminado del layout.
- [x] Un `page_view` por ruta en el componente; en Admin de la propiedad nueva desactivar historial de Medición mejorada.
- [x] Tests: Consent Mode default + gtag no carga sin Measurement ID.
- [x] Pegar el Measurement ID nuevo (`G-845LV77ZG9`) en código / `.env.example`.
- [ ] Cloudflare `linguaflyapp1`: variable de build `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-845LV77ZG9` (si sigue `G-TNTG3MJ3TL`, gana el dashboard).

---

## 10. Criterios de hecho (“España se ve”)

Se considera resuelto cuando, en un periodo de 7 días:

1. El informe de país muestra **Spain** con usuarios > 0 y ciudades españolas reconocibles.
2. La comparación Spain vs resto está fijada en los informes que usa el equipo.
3. Un visitante de prueba en España aparece en tiempo real / DebugView **una sola vez** por pageview.
4. La magnitud GA4 ES es coherente con GSC/Cloudflare (mismo orden, no 10× de diferencia sin explicación de consentimiento).
5. El KPI semanal “usuarios España” se puede leer en menos de un minuto (colección GA4 o Looker Studio).

---

## 11. Referencias internas

- Tag y pageviews: `src/components/GoogleAnalytics.tsx`
- Eventos: `src/lib/analytics.ts`, `src/lib/analytics-events.md`
- GTM: **eliminado** del layout (contenedor `GTM-PR2H3P77` era 404)
- Consent Mode: `src/components/GoogleConsentMode.tsx`, `src/lib/google-consent-mode.ts`
- Consentimiento ads: `src/lib/marketing-consent.ts`, Cookiebot `src/components/Cookiebot.tsx`
- Variable de entorno: `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-845LV77ZG9` (fallback en `getGaTrackingId()`)

Documentación Google relevante:

- [Datos de ubicación y dispositivo detallados (GA4)](https://support.google.com/analytics/answer/14124256)
- [Consent Mode](https://support.google.com/analytics/answer/10000067)
- [Comparar datos en informes](https://support.google.com/analytics/answer/1033068)
- [Audiencias](https://support.google.com/analytics/answer/9267572)

---

## 12. Fase 0 — Resultados (2026-09-01)

Auditoría hecha desde el repo, endpoints públicos de Google/Cookiebot/Matomo y el site vivo. **No hay login** a Analytics, Search Console, GTM ni Cloudflare Dashboard.

Entorno del agente: IP datacenter (Cloudflare `cf-ray` …`CMH`, Columbus, EE. UU.). Cookiebot respondió `CookieConsent.setOutOfRegion()`; no es un visitante español.

### 12.1 IDs y propiedad

| Comprobación | Resultado |
|---|---|
| `G-TNTG3MJ3TL` en `.env.example` / `.env.local.example` | Presente. Comentario: propiedad `380786116`, datos desde enero 2026. |
| `gtag.js?id=G-TNTG3MJ3TL` | **HTTP 200**, ~524 KB, `vtp_destinationId: G-TNTG3MJ3TL`. El stream **está vivo**. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` en el Worker de producción | **No verificado.** `GoogleAnalytics.tsx` no pinta nada si la variable no se inlinó en el build. El workflow de GitHub (`deploy-cloudflare.yml`) **no** pasa esta variable; Workers Builds del dashboard podría sí. |
| `linguafly.app` HTML | **Cloudflare Managed Challenge (403)** a IPs de datacenter. No se pudo leer el JS de producción para confirmar el ID inlinado. |
| `focus-on-english.com` | Vercel `402 DEPLOYMENT_DISABLED`. El host legacy no sirve la web. |

**Acción pendiente (operador):** en Cloudflare → Worker `linguaflyapp1` → Settings → Variables de **build**, `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-845LV77ZG9`. Si queda `G-TNTG3MJ3TL`, el Worker seguirá enviando a Focus English.

### 12.2 Ubicación UE, zona horaria, moneda

Leído del propio `gtag.js` del destino (`__ccd_ga_regscope`):

```
DEVICE_AND_GEO  → disallowAllRegions: false, disallowedRegions: ""
GOOGLE_SIGNALS  → disallowAllRegions: true,  disallowedRegions: ""
```

Interpretación:

- **País/ciudad no están redactados a nivel global.** España *puede* verse en informes si llegan hits.
- **Google Signals está apagado en todas las regiones.** No habrá edad/género ni remarketing por señales; el país no depende de Signals.
- Zona horaria Madrid y moneda EUR **no salen en gtag.js**. Hay que mirarlas en Admin → Configuración de la propiedad.

**Acción pendiente (operador, 2 minutos):**

1. [analytics.google.com](https://analytics.google.com/) → propiedad `380786116`.
2. Admin → Recogida de datos → **Datos de ubicación y dispositivo detallados** → UE/EEE **activado** (el gtag sugiere que ya no hay redacción global; conviene confirmar el toggle).
3. Admin → Configuración de la propiedad → zona **Madrid (Europe/Madrid)**, moneda **EUR**.

### 12.3 Inventario GTM-PR2H3P77 — no hay doble GA4 por GTM

| URL | HTTP |
|---|---|
| `https://www.googletagmanager.com/gtm.js?id=GTM-PR2H3P77` | **404** |
| `https://www.googletagmanager.com/ns.html?id=GTM-PR2H3P77` | **404** |

El snippet sigue en `src/app/layout.tsx` (head + iframe noscript). En cada visita el navegador pide un contenedor que **no existe**: no dispara tags, sí ensucia la red y el `dataLayer` (`gtm.js` / `gtm.start`).

**Conclusión:** no hay inventario de tags GTM porque el contenedor está inédito, borrado o mal ID. **No hay page_view duplicado vía GTM.**

Sí hay otro riesgo de duplicado (sin GTM), ver §12.5.

### 12.4 Hit en tiempo real desde España

No ejecutado:

1. El agente no tiene IP española.
2. `linguafly.app` presenta challenge de Cloudflare a este entorno (Turnstile / managed). Un usuario real en España no debería verlo igual.

**Acción pendiente (operador, 30 s):** desde un móvil en España, abrir `https://linguafly.app/` con las cookies de estadísticas aceptadas. En GA4 → **Informes → En tiempo real** debe aparecer 1 usuario en **Spain**. En DevTools → Red, debe haber `gtag/js?id=G-TNTG3MJ3TL` y un collect a `google-analytics.com` / `analytics.google.com`. Si no hay `gtag/js`, la variable de build no está en el Worker (§12.1).

### 12.5 Hallazgos extra (calidad de medición)

1. **Enhanced Measurement + page_view manual.** El destino GA4 tiene `vtp_enableHistoryEvents: true` y `vtp_enablePageView: true`. `GoogleAnalytics.tsx` también envía `event: page_view` en cada cambio de `pathname`. En navegación SPA puede haber **dos page_view por ruta**, aunque GTM esté muerto. Corrección: Fase 3 (`send_page_view: false` en config **o** desactivar eventos de historial en el stream).
2. **Lista cross-domain obsoleta.** El destino enlaza previews `focusonenglish-*-focusenglish.vercel.app` y `focus-on-english.com`. **No aparece `linguafly.app`.** El host canónico no está en el linker; el dominio viejo está caído (Vercel 402).
3. **Recogida automática de PII activada** (`__ogt_1p_data_v2`: email, teléfono, dirección). Riesgo GDPR en España; no bloquea ver el país, sí conviene apagarlo en Admin del stream.
4. **Cookiebot** ID `474b1dce-7229-40d3-88c2-a2323b9a57f9` vive; la librería soporta Consent Mode v2 (`analytics_storage`, `ad_user_data`, …). En código Linguafly Cookiebot va en `data-blockingmode="manual"` y GA **no** espera `consent.statistics`. Desde EE. UU. Cookiebot marca `setOutOfRegion()` (banner no aplica). Un visitante ES sí verá el CMP.
5. **Matomo** `linguaflyapp.matomo.cloud` / site `1` / `matomo.js` **200**. Segunda fuente válida para contrastar país cuando se tenga login.
6. **WAF.** El challenge de Cloudflare a bots es bueno contra crawlers (EE. UU. inflado), y explica por qué un scrape no ve el HTML real.

### 12.6 Comparativa 7 días GA4 vs GSC vs Cloudflare

No hay API ni sesión en esas consolas. Cuando el operador entre, mismo periodo (7 días):

| Fuente | Dónde | Filtro |
|---|---|---|
| GA4 | Informes → Atributos del usuario → País | Spain |
| Search Console | Rendimiento → País | España |
| Cloudflare | Analytics / `CF-IPCountry=ES` | ES |
| Matomo | Visitantes → Ubicaciones | Spain |

Esperado: Cloudflare ES ≥ GA4 ES ≥ clics GSC ES. Si GA4 Spain = 0 y Cloudflare tiene ES, o falta el ID en el Worker (§12.1) o el hit de prueba (§12.4) falla.

### 12.7 Qué queda bloqueado vs qué está cerrado

| Ítem Fase 0 | Estado |
|---|---|
| ID GA4 vivo | Cerrado: `G-TNTG3MJ3TL` sirve destino real |
| ID inlinado en producción | Abierto: mirar variables de build de `linguaflyapp1` o Network en un navegador ES |
| Ubicación detallada UE | Casi cerrado por gtag (sin redacción DEVICE_AND_GEO); confirmar toggle Admin |
| Timezone / moneda | Abierto: Admin GA4 |
| Tiempo real ES | Abierto: 1 visita humana desde España |
| Inventario GTM | Cerrado: contenedor 404, no duplica GA4 |
| Comparativa 7 días | Abierto: consolas GA4 / GSC / CF / Matomo |

### 12.8 Siguiente paso

Crear la **propiedad GA4 Linguafly** (§13), pegar el Measurement ID en Cloudflare, y validar un hit desde España. La propiedad `G-TNTG3MJ3TL` se conserva solo como archivo (Focus English).

---

## 13. Crear la propiedad GA4 Linguafly

Google no permite crear propiedades desde este repositorio: hay que hacerlo con la cuenta de Google que administra Analytics. El código carga `G-845LV77ZG9` (o `NEXT_PUBLIC_GA_MEASUREMENT_ID` si está definido) con Consent Mode v2 y un `page_view` por ruta, sin GTM.

### 13.1 Alta (5 minutos)

1. Entra en [analytics.google.com](https://analytics.google.com/) con la cuenta de Linguafly.
2. **Administrar** (engranaje) → **Crear** → **Propiedad**.
   - Nombre: `Linguafly`
   - Zona horaria de los informes: **(GMT+01:00) Madrid** (España)
   - Moneda: **Euro (EUR)**
3. Descripción del negocio: sector **Educación**, tamaño el que corresponda. Objetivos: medir interacciones / generar clientes potenciales.
4. **Flujo de datos** → **Web**:
   - URL: `https://linguafly.app` (sin `www` si el canónico es el apex; si usáis ambos, el stream es uno y el dominio extra se añade en “dominios configurados”).
   - Nombre del flujo: `Linguafly web`
   - Medición mejorada: **activada**, luego clic en el engranaje:
     - Dejar: desplazamientos, clics de salida, búsquedas, descargas, vídeo.
     - **Desactivar** “Cambios de página según eventos del historial del navegador”. Next.js ya envía `page_view` con `content_group` desde `GoogleAnalytics.tsx`. Si esto queda ON, cada navegación SPA se cuenta dos veces.
5. Copia el **ID de medición** (`G-XXXXXXXXXX`) y el **ID de propiedad** (número).

### 13.2 Ajustes para ver España

En la propiedad **nueva** (no en `380786116`):

| Ajuste | Dónde | Valor |
|---|---|---|
| Ubicación y dispositivo detallados (UE) | Admin → Recogida de datos | **Activado** para EEE |
| Google Signals | Recogida de datos | **Desactivado** (RGPD; el país no lo necesita) |
| Recogida de datos proporcionados por el usuario / PII auto | Stream → Ajustes | **Desactivado** |
| Retención de datos de eventos | Admin → Ajustes de datos | **14 meses** |
| País de la empresa | Configuración de la propiedad | España |

No hace falta un filtro de datos “solo España”. El país lo asigna GA4 por IP. En informes: **Comparar** → País = Spain (Fase 1).

### 13.3 Consent Mode y Cookiebot / InMobi

El layout ya declara `gtag('consent','default', { analytics_storage: 'denied', ... })` antes de cargar gtag.js.

- **Cookiebot Manager:** activa **Google Consent Mode** (v2) para el dominio `linguafly.app`. Categoría estadísticas → `analytics_storage`; marketing → `ad_storage` / `ad_user_data` / `ad_personalization`.
- **InMobi Choice** (si es el CMP en linguafly.app): confirma que el CMP publica TCF 2.2+ y que Google lee el consent update. No hace falta un segundo GTM.

### 13.4 Cortar a producción

Measurement ID Linguafly: **`G-845LV77ZG9`** (gtag.js HTTP 200). El snippet que da Google **no** se añade al layout: `GoogleAnalytics.tsx` ya hace `gtag('config', id)`.

1. Cloudflare → Worker **linguaflyapp1** → Settings → Variables / Build:
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-845LV77ZG9`
   - Si la variable sigue siendo `G-TNTG3MJ3TL`, **cámbiala**. `NEXT_PUBLIC_*` se inlina en el build y pisa el default del código.
2. Redeploy del Worker (`linguaflyapp1`).
3. Local: `.env.local` con `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-845LV77ZG9`.
4. Prueba: móvil en España → linguafly.app → GA4 **En tiempo real** (propiedad Linguafly) → usuario en **Spain**. En Red: `gtag/js?id=G-845LV77ZG9` (no `G-TNTG3MJ3TL`, no `GTM-PR2H3P77`).
5. La propiedad vieja `380786116` / `G-TNTG3MJ3TL` se deja en solo lectura. No borres datos.

### 13.5 Dimensiones personalizadas (mismo día o Fase 1)

En Admin de la propiedad nueva → Definiciones personalizadas, registrar como dimensión de evento:

- `content_group`
- `article_slug`, `article_category`
- `cta_name`, `cta_location`
- `course_level`, `plan_id`

Sin esto, los parámetros se ven en DebugView pero no en informes estándar.
