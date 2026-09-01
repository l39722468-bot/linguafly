# Plan: controlar visitas con Google Analytics 4 y ver tráfico de España

**Sitio:** [linguafly.app](https://linguafly.app) (Linguafly / Focus English)  
**Audiencia objetivo:** hispanohablantes, sobre todo España (`locale` `es_ES`)  
**Propiedad GA4 ya en producción:** Measurement ID `G-TNTG3MJ3TL` · ID de propiedad `380786116`  
**GTM en el layout:** `GTM-PR2H3P77`  
**Analítica paralela:** Matomo Cloud (`linguaflyapp.matomo.cloud`, site id `1`)

Este plan no pide rehacer el tracking desde cero. El tag de GA4 ya carga en `src/components/GoogleAnalytics.tsx`, los `page_view` SPA se envían en cada cambio de ruta, y los eventos de producto viven en `src/lib/analytics.ts`. El trabajo es **configurar la propiedad, los informes y el consentimiento** para que las visitas de España se vean con claridad y se puedan vigilar cada día.

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
| GTM | `src/app/layout.tsx` | Contenedor `GTM-PR2H3P77` en `<head>` + noscript |
| Consentimiento | Cookiebot `data-blockingmode="manual"` | Atributo `data-cookieconsent="statistics"` en GTM y GA; **no hay Consent Mode v2 en código** |
| Ads | `src/lib/marketing-consent.ts` | AdSense/Monetag sí esperan consentimiento; GA **no** usa ese helper |
| Matomo | `src/components/MatomoAnalytics.tsx` | Segundo contador, independiente de GA4 |

Implicaciones para España:

- En la UE, si **no** está activo Consent Mode v2 y el usuario rechaza cookies, Google puede modelar mal o no atribuir geolocalización.
- Cookiebot en modo `manual` **no bloquea automáticamente** los scripts. GA y GTM pueden dispararse antes de que el usuario acepte estadísticas.
- Si GTM también tiene una etiqueta GA4 `G-TNTG3MJ3TL`, cada visita se cuenta **dos veces**.
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

- [ ] Confirmar propiedad `380786116` / `G-TNTG3MJ3TL` en producción (`NEXT_PUBLIC_GA_MEASUREMENT_ID`).
- [ ] Activar **ubicación detallada** para la UE.
- [ ] Zona horaria Madrid, moneda EUR.
- [ ] Hit de prueba desde España en tiempo real.
- [ ] Inventario de tags en GTM-PR2H3P77 (¿GA4 duplicado?).
- [ ] Comparar 7 días: GA4 Spain vs GSC España vs Cloudflare ES.

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

### Fase 3 — Código (PR aparte, no este documento)

- [ ] Consent Mode v2 + Cookiebot/InMobi.
- [ ] Un solo cargador (GTM **o** gtag).
- [ ] `GoogleAnalytics` espera consentimiento de estadísticas (o defaults denied).
- [ ] Tests: no cargar gtag si no hay measurement id; no disparar `page_view` duplicado en navegación SPA.

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
- GTM: `src/app/layout.tsx` (`GTM-PR2H3P77`)
- Consentimiento ads: `src/lib/marketing-consent.ts`, Cookiebot `src/components/Cookiebot.tsx`
- Variable de entorno: `.env.example` → `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-TNTG3MJ3TL`

Documentación Google relevante:

- [Datos de ubicación y dispositivo detallados (GA4)](https://support.google.com/analytics/answer/14124256)
- [Consent Mode](https://support.google.com/analytics/answer/10000067)
- [Comparar datos en informes](https://support.google.com/analytics/answer/1033068)
- [Audiencias](https://support.google.com/analytics/answer/9267572)
