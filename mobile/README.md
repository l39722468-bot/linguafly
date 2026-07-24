# Focus English — App móvil (Expo)

Scaffold inicial para Android e iOS. Consume la API móvil del backend Next.js.

## Requisitos

- Node.js 20+
- Expo Go (desarrollo) o EAS Build (producción)

## Configuración

```bash
cd mobile
npm install
cp .env.example .env
```

Edita `.env`:

```env
EXPO_PUBLIC_API_URL=https://tu-backend.com
EXPO_PUBLIC_SUPABASE_URL=...
EXPO_PUBLIC_SUPABASE_ANON_KEY=...
```

## Desarrollo

```bash
npm start
```

- Pulsa `a` para Android emulator
- Pulsa `i` para iOS simulator (macOS)

Asegúrate de que el backend Next.js está corriendo (`npm run dev` en la raíz).

## Estructura

```
mobile/
  App.tsx              # Pantalla demo (carga unidad activa vía API)
  src/
    api/client.ts      # Cliente HTTP
    config.ts          # Variables de entorno
    supabase.ts        # Auth Supabase
```

## Documentación completa

Ver `../docs/mobile-app.md` en la raíz del repositorio.
