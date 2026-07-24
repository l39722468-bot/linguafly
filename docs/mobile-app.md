# App móvil Android / iOS — Focus English

Esta guía describe la capa preparada para construir apps nativas con **Expo (React Native)** consumiendo la API móvil del backend Next.js.

## Arquitectura

```
┌─────────────────────┐      HTTPS + Bearer JWT      ┌──────────────────────────┐
│  App Expo (mobile/) │  ─────────────────────────►  │  Next.js API /api/mobile │
│  React Native UI    │                              │  Supabase + contenido    │
└─────────────────────┘                              └──────────────────────────┘
```

- **Backend**: sigue siendo el monolito Next.js (sin duplicar contenido).
- **Contenido de cursos**: se sirve por API (antes solo por `import()` en web).
- **Auth**: Supabase en la app + `Authorization: Bearer <access_token>` en cada petición.
- **Progreso**: mismas tablas (`user_lesson_progress`, `a1_progress` legado).

## API v1

Base: `https://tu-dominio.com/api/mobile/v1`

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/` | No | Índice de la API |
| GET | `/me` | Sí | Perfil + entitlements |
| GET | `/course/{courseId}` | Opcional | Catálogo + estado secuencial |
| GET | `/course/{courseId}/units/{unitId}` | Según unidad | Ejercicios validados (layout 6 lecciones) |
| GET | `/progress?courseId=` | Sí | Progreso del alumno |
| POST | `/progress/record` | Sí | Registrar intento de ejercicio |

### Cursos soportados

`ingles-a1`, `ingles-a2`, `ingles-b1`, `ingles-b2`, `ingles-c1`, `ingles-c2`

### Autenticación móvil

```http
Authorization: Bearer <supabase_access_token>
```

El token se obtiene con `@supabase/supabase-js` en la app:

```typescript
const { data } = await supabase.auth.getSession();
const token = data.session?.access_token;
```

### Ejemplo: cargar unidad activa

```typescript
import { MobileApiClient } from '@/lib/mobile/api-client';

const api = new MobileApiClient({
  baseUrl: 'https://focusonenglish.com',
  getAccessToken: async () => {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  },
});

const catalog = await api.getCourseCatalog('ingles-a1');
const unitId = `unit-${catalog.sequential.currentUnitNumber}`;
const unit = await api.getUnit('ingles-a1', unitId);
```

### Códigos de error de acceso a unidad

| Código HTTP | code | Significado |
|-------------|------|-------------|
| 401 | `auth_required` | Login necesario |
| 402 | `premium_required` | Suscripción requerida |
| 403 | `sequential_locked` | Unidad bloqueada (modo secuencial) |

## Carpeta `mobile/`

Scaffold Expo listo para desarrollo:

```bash
cd mobile
npm install
cp .env.example .env
npm start
```

Variables:

- `EXPO_PUBLIC_API_URL` — URL del backend Next.js
- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`

## Roadmap recomendado

### Fase 1 — MVP (actual)
- [x] API de contenido por unidad (todos los niveles CEFR)
- [x] Auth Bearer + progreso
- [x] Cliente TypeScript (`src/lib/mobile/api-client.ts`)
- [x] Scaffold Expo

### Fase 2 — UI nativa
- [ ] Pantallas: login, selector de curso, reproductor de ejercicios
- [ ] Implementar tipos de ejercicio prioritarios (multiple-choice, fill-blank, listening)
- [ ] Integrar `/api/evaluate-speaking` con `expo-av`

### Fase 3 — Publicación
- [ ] EAS Build (Android + iOS)
- [ ] Deep links OAuth (`focusenglish://auth/callback`)
- [ ] Stripe / suscripciones (web checkout + deep link o IAP)

## Archivos clave en el repo

| Archivo | Rol |
|---------|-----|
| `src/lib/api/mobile-auth.ts` | Bearer + cookies |
| `src/lib/course/load-unit-for-api.ts` | Carga server-side de unidades |
| `src/lib/mobile/api-client.ts` | Cliente HTTP tipado |
| `src/lib/mobile/types.ts` | Contratos JSON |
| `src/app/api/mobile/v1/**` | Rutas REST |
| `mobile/` | App Expo |

## Notas

- La web sigue usando `import()` dinámico; la API es la vía oficial para apps nativas.
- El modo secuencial (una unidad a la vez para suscriptores) también se aplica en la API móvil.
- Para evaluación de speaking/escritura, reutilizar los endpoints existentes `/api/evaluate-*`.
