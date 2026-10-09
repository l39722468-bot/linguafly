# Focus English - Landing Page

Plataforma de cursos de inglés especializados para profesionales y estudiantes.

## 🚀 Características

- ✅ **Next.js 15** con App Router
- ✅ **TypeScript** para type safety
- ✅ **Tailwind CSS** para estilos
- ✅ **SEO optimizado** con metadata completa
- ✅ **Blog integrado** con 3 artículos
- ✅ **Cursos dinámicos** (18 páginas)
- ✅ **Protección anti-piratería**
- ✅ **Responsive design**
- ✅ **Sistema CRM con Python** integrado con HubSpot API
- ✅ **Integración con Stripe** para pagos y suscripciones

## 📁 Estructura del Proyecto

```
webapp/
├── app/                      # Next.js App Router
│   ├── blog/                 # Blog con artículos
│   ├── contacto/             # Página de contacto
│   ├── cursos/               # Cursos dinámicos
│   ├── cursos-especializados/# Cursos por sector
│   ├── diagnostico/          # Test de nivel
│   ├── cuenta/               # Auth (login, registro, etc)
│   ├── layout.tsx            # Layout principal
│   ├── page.tsx              # Homepage
│   └── sitemap.ts            # Sitemap dinámico
├── components/
│   └── sections/             # Componentes reutilizables
├── content/
│   └── blog/                 # Artículos en Markdown
├── lib/
│   └── crm/                  # CRM TypeScript para Next.js
├── public/                   # Archivos estáticos
├── src/                      # Código fuente adicional
├── crm_manager.py            # 🐍 Sistema CRM con Python
├── test_crm.py               # 🧪 Suite de pruebas CRM
├── ejemplos_crm.py           # 📚 Ejemplos prácticos CRM
├── stripe_webhook_integration.py # 🔗 Webhooks de Stripe
├── requirements.txt          # Dependencias Python
├── package.json              # Dependencias Node.js
├── tsconfig.json             # Configuración TypeScript
└── tailwind.config.js        # Configuración Tailwind
```

## 🛠️ Instalación

### Next.js (Frontend)
```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar en producción
npm start
```

### Python CRM (Backend)
```bash
# Instalar dependencias Python
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env
# Editar .env y agregar HUBSPOT_ACCESS_TOKEN

# Probar CRM
python test_crm.py

# Ver ejemplos
python ejemplos_crm.py
```

Para más información sobre el CRM, consulta:
- **QUICKSTART_CRM.md** - Inicio rápido
- **CRM_PYTHON_README.md** - Guía completa
- **CRM_PYTHON_DOCS.md** - API Reference

## 📄 Páginas Principales

### Públicas
- `/` - Homepage
- `/blog` - Blog principal
- `/blog/[slug]` - Artículos individuales
- `/curso/ingles-[level]` - Cursos dinámicos
- `/test-nivel` - Test de nivel gratuito
- `/cuenta/registro` - Inscripción a cursos
- `/contacto` - Contacto

### Dinámicas
- **4 Niveles**: a1, a2, b1, b2

- **Total**: 18 páginas de cursos generadas automáticamente

## 📝 Blog

El blog incluye 3 artículos completos:

1. **Inglés Profesional para Tu Sector** (212 líneas)
   - Categoría: Trabajo
   - Keywords: inglés profesional, inglés empresarial

2. **Inglés Esencial para Viajar** (459 líneas)
   - Categoría: Viajes
   - Keywords: inglés para viajar, frases en inglés

3. **Preparar Exámenes Oficiales** (528 líneas)
   - Categoría: Exámenes
   - Keywords: Cambridge, TOEFL, IELTS

## 🎨 Diseño

- **Colores principales**: Violet/Purple gradients
- **Tipografía**: System fonts optimizados
- **Responsive**: Mobile-first approach
- **Accesibilidad**: WCAG 2.1 AA compliant

## 🔒 Seguridad

- Protección anti-piratería implementada
- CSP (Content Security Policy) configurado
- Click derecho deshabilitado
- Shortcuts de desarrollo bloqueados
- Copyright watermark

## 📊 SEO

- ✅ Metadata completa en todas las páginas
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ Sitemap dinámico (~27 URLs)
- ✅ robots.txt configurado
- ✅ Canonical URLs
- ✅ Keywords específicas por página

## Artículos premium (suscripción mensual)

Algunos artículos del blog pueden ser de pago. El resto sigue gratis y no pide cuenta. La suscripción es mensual, el precio vive en Stripe y el código solo guarda el identificador del precio (`STRIPE_PRICE_ID`). La misma lógica corre en Vercel y en Cloudflare (OpenNext): la cuenta del lector es un cliente de Stripe y la cookie de sesión se firma con `AUTH_SECRET`. No hace falta otra base de datos para los lectores.

La contraseña no se guarda en claro. Se guarda un hash en los metadatos del cliente de Stripe. Quien tenga acceso al panel de Stripe puede ver ese hash, no la contraseña.

### 1. Crear el producto y el precio en Stripe

1. Entra en el [panel de Stripe](https://dashboard.stripe.com), mejor primero en **modo prueba**.
2. Ve a **Catálogo de productos** y crea un producto, por ejemplo «Linguafly Premium».
3. Añade un precio **recurrente** con intervalo **mensual**. El importe lo eliges tú en Stripe; no va en el código.
4. Copia el identificador del precio. Empieza por `price_`.
5. En **Configuración → Facturación → Portal de clientes**, activa el portal para que el lector pueda cancelar o cambiar la tarjeta.

### 2. Variables de entorno

Copia los nombres desde `.env.example`. Valores de ejemplo, sin claves reales:

```env
STRIPE_SECRET_KEY=sk_test_reemplazar
STRIPE_WEBHOOK_SECRET=whsec_reemplazar
STRIPE_PRICE_ID=price_reemplazar
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_reemplazar
AUTH_SECRET=una-cadena-aleatoria-de-al-menos-16-caracteres
```

- `STRIPE_SECRET_KEY`: clave secreta (`sk_test_` o `sk_live_`).
- `STRIPE_PRICE_ID`: el precio mensual del paso anterior.
- `STRIPE_WEBHOOK_SECRET`: secreto de firma del endpoint (`whsec_`). Se obtiene al crear el webhook.
- `AUTH_SECRET`: firma la cookie `lf_reader`. Generala con `openssl rand -base64 32`. Tiene que ser la misma en todas las instancias que compartan lectores, y distinta en prueba y en producción.
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: el Checkout usado aquí es el de Stripe (página alojada) y no lee esta clave. Déjala puesta para no perderla.

En local: `cp .env.example .env.local` y rellena esos valores.

### 3. Webhook

URL del endpoint (cámbiala por el dominio que reciba el tráfico):

```text
https://linguafly-one.vercel.app/api/billing/webhook
```

En Cloudflare usa el dominio del Worker, con la misma ruta `/api/billing/webhook`. Si los dos despliegues están activos, puedes registrar los dos endpoints: los dos escriben en el mismo cliente de Stripe.

Eventos que hay que enviar:

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

Stripe firma el cuerpo. El servidor rechaza cualquier petición cuya firma no coincida con `STRIPE_WEBHOOK_SECRET`. El webhook guarda en el cliente el estado (`active`, `trialing`, `canceled`, etc.), el id de la suscripción y el fin del periodo. Solo cuenta la suscripción cuyo precio es `STRIPE_PRICE_ID`.

Para probar en local:

```bash
stripe listen --forward-to localhost:5436/api/billing/webhook
```

El comando imprime un `whsec_` temporal: ponlo en `STRIPE_WEBHOOK_SECRET`.

### 4. Marcar un artículo como premium

En el frontmatter del markdown (`src/content/blog/...`):

```yaml
---
title: "Título"
premium: true
---
```

Sin esa clave, o con `premium: false`, el artículo sigue siendo gratis.

El avance público es el texto anterior a un marcador, si lo pones:

```markdown
Este párrafo se ve sin suscripción.

<!-- paywall -->

Este párrafo solo lo recibe quien tiene la suscripción activa.
```

Si no hay marcador, se muestran como avance los dos primeros párrafos, con un tope de 120 palabras. El resto no sale en el HTML, ni en la copia `.md`, ni en `GET /api/articles/:slug` (esas respuestas son públicas y se pueden cachear). El texto completo solo se pinta en la página HTML del artículo, y solo si la sesión corresponde a una suscripción `active` o `trialing` de ese precio. Si Stripe falla, se muestra el muro.

Quien no ha pagado ve el avance y un enlace para crear cuenta, entrar o suscribirse. La cuenta está en `/cuenta`. Checkout y el portal de cliente son los de Stripe.

### 5. Despliegue

La columna `premium` de D1 es nueva. En Cloudflare aplícala antes de sincronizar artículos:

```bash
npm run d1:migrate
```

Eso ejecuta `migrations/d1/0008_articles_premium.sql`. Las filas viejas quedan gratis (`0`) hasta el siguiente sync del markdown. Aunque la columna aún no esté rellena, el build genera `src/lib/content/premium-articles.json` a partir del frontmatter y el muro se aplica igual.

Vuelve a sincronizar el markdown con D1 para guardar el flag y para que el índice de búsqueda de un artículo premium solo lleve el avance, no el cuerpo entero. El cuerpo completo sigue en la columna `content`, en el servidor.

Variables en cada host:

- **Vercel**: Project → Settings → Environment Variables. Añade las cinco. Vuelve a desplegar.
- **Cloudflare / OpenNext**: no las pongas en `wrangler.jsonc`.

```bash
wrangler secret put STRIPE_SECRET_KEY
wrangler secret put STRIPE_WEBHOOK_SECRET
wrangler secret put STRIPE_PRICE_ID
wrangler secret put AUTH_SECRET
```

`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` es pública. En Cloudflare puedes declararla en `[vars]` si la usas; este flujo de Checkout no la necesita.

Después del despliegue, crea el webhook apuntando al dominio que esté en producción y haz una compra de prueba con la tarjeta `4242 4242 4242 4242`. La vuelta de Stripe es `/api/billing/return`. Desde `/cuenta` se abre el portal para cancelar.

## 🚀 Deployment

### Vercel (Recomendado)
```bash
vercel deploy
```

### Build Manual
```bash
npm run build
npm start
```

## 📦 Dependencias Principales

- `next` ^15.1.3 - Framework React
- `react` ^19.0.0 - Biblioteca UI
- `react-dom` ^19.0.0 - React DOM
- `gray-matter` ^4.0.3 - Parse de frontmatter
- `typescript` ^5.7.2 - Type checking
- `tailwindcss` ^3.4.17 - CSS framework

## 🔧 Configuración

### Variables de Entorno

#### Producción
```env
NEXT_PUBLIC_SITE_URL=https://focusenglish.com
```

#### IndexNow (Bing)
```env
INDEXNOW_KEY=tu_clave_indexnow
INDEXNOW_SUBMIT_TOKEN=token_interno_para_api
```

Endpoints disponibles:
- `GET /indexnow-key.txt` → devuelve la clave para validación de Bing.
- `POST /api/indexnow/submit` → envía URLs a IndexNow (protegido con token).

Ejemplo de envío manual:
```bash
curl -X POST "https://www.focus-on-english.com/api/indexnow/submit" \
  -H "Authorization: Bearer TU_INDEXNOW_SUBMIT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"urls":["https://www.focus-on-english.com/blog/metodos/curso-ingles-online"]}'
```

#### HubSpot CRM (Requerido para formulario de signup)
```env
# Obtén tu Access Token desde tu Private App en HubSpot
HUBSPOT_ACCESS_TOKEN=tu_token_aqui
HUBSPOT_PORTAL_ID=147592708
HUBSPOT_API_URL=https://api.hubapi.com
```

**📝 Nota:** Para configurar HubSpot CRM, consulta el archivo `HUBSPOT_SETUP.md` con instrucciones detalladas.

### Next.js Config
- Imágenes de Unsplash permitidas
- React Strict Mode habilitado

## 📚 Documentación Adicional

### Next.js / Frontend
- `IMPLEMENTATION_SUMMARY.md` - Resumen de implementaciones
- `CURSOS_ESPECIALIZADOS.md` - Estructura de cursos
- `public/og-image-placeholder.txt` - Instrucciones para imagen OG
- `HUBSPOT_INTEGRATION_GUIDE.md` - Configuración de HubSpot workflows

### Python CRM / Backend
- **`QUICKSTART_CRM.md`** - Guía de inicio rápido (5 minutos)
- **`CRM_PYTHON_README.md`** - Documentación completa del sistema CRM
- **`CRM_PYTHON_DOCS.md`** - API Reference detallada
- **`crm_manager.py`** - Módulo principal del CRM
- **`test_crm.py`** - Suite de pruebas interactiva
- **`ejemplos_crm.py`** - 8 ejemplos prácticos de uso
- **`stripe_webhook_integration.py`** - Integración con webhooks de Stripe

## ⚠️ Notas Importantes

1. **Imagen Open Graph**: Actualmente usa una imagen temporal de Unsplash. Para producción, crear una imagen personalizada de 1200x630px.

2. **Formularios & CRM**: 
   - ✅ **Formulario de Signup**: Totalmente integrado con HubSpot CRM
   - ✅ **Sistema CRM Python**: Gestión completa de contactos, suscripciones y pagos
   - ✅ **Integración con Stripe**: Webhooks configurados para sincronización automática
   - 📖 **Guías**: Ver `QUICKSTART_CRM.md` y `CRM_PYTHON_README.md`

3. **Test de Nivel**: La funcionalidad del test está pendiente de implementación completa.

4. **CRM Python**: 
   - ✅ Sistema completo implementado con HubSpot API
   - ✅ Gestión de contactos, notas, deals y propiedades personalizadas
   - ✅ Integración con Stripe webhooks
   - ✅ Suite de pruebas y ejemplos incluidos
   - 📖 Ver documentación en `CRM_PYTHON_README.md`

## 🤝 Contribución

Este es un proyecto privado de Focus English.

## 📄 Licencia

UNLICENSED - Todos los derechos reservados © 2026 Focus English

## 📧 Contacto

- Email: info@focusenglish.com
- Web: https://focusenglish.com
