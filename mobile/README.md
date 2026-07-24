# App móvil — React Native (Expo)

## Inicio rápido

```bash
# Terminal 1 — backend
cd ..
npm run dev

# Terminal 2 — app
cd mobile
cp .env.example .env
npm install
npm start
```

En dispositivo físico, cambia `EXPO_PUBLIC_API_URL` por la IP de tu máquina (ej. `http://192.168.1.10:5436`).

## Login

- Email/contraseña con Supabase (misma cuenta que la web)
- Opción «Probar unidad 1 gratis sin cuenta» en la pantalla de login

## Ejercicios soportados

| Tipo | Estado |
|------|--------|
| multiple-choice, true-false, fill-blank | ✅ |
| reading, listening | ✅ |
| sentence-building | ✅ |
| writing (evaluación IA) | ✅ |
| pronunciation / speaking (micrófono + IA) | ✅ |
| drag-drop, matching, word-search… | ⏭️ Saltar |

## EAS Build (Android / iOS)

### 1. Instalar EAS CLI e iniciar proyecto

```bash
npm install -g eas-cli   # o usar npx eas
cd mobile
eas login
eas init                 # genera projectId en app.json
```

### 2. Configurar variables de entorno en EAS

```bash
eas secret:create --name EXPO_PUBLIC_API_URL --value https://tu-dominio.com
eas secret:create --name EXPO_PUBLIC_SUPABASE_URL --value ...
eas secret:create --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value ...
```

### 3. Generar builds

```bash
# APK de prueba (Android)
npm run eas:build:android

# Producción Android + iOS
npm run eas:build:all
```

Perfiles en `eas.json`:
- **preview** — APK interno Android
- **production** — AAB/IPA para tiendas
- **development** — cliente de desarrollo

## Estructura

```
mobile/src/
  context/AuthContext.tsx
  screens/LoginScreen.tsx, RegisterScreen.tsx, HomeScreen.tsx, UnitPlayerScreen.tsx
  components/ExerciseRenderer.tsx
  components/exercises/
  api/client.ts, evaluate.ts
```

## Documentación API

Ver `../docs/mobile-app.md`
