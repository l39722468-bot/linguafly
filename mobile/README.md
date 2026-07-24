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
- **Google** y **Apple** (botones en login y registro)
- Opción «Probar unidad 1 gratis sin cuenta» en la pantalla de login

### Configurar Google / Apple (Supabase Dashboard)

1. **Authentication → Providers**: activa Google y Apple.
2. **Authentication → URL Configuration → Redirect URLs**, añade:
   - `focusenglish://auth/callback` (build nativo / EAS)
   - `exp://127.0.0.1:8081/--/auth/callback` (Expo Go en simulador)
   - `exp://TU_IP:8081/--/auth/callback` (Expo Go en dispositivo físico)
3. **Google Cloud Console**: crea credenciales OAuth (tipo *Web application*) con el redirect de Supabase (`https://<proyecto>.supabase.co/auth/v1/callback`).
4. **Apple Developer**: configura Sign in with Apple y pega el *Services ID* en Supabase.

Para ver la URL exacta que usa tu entorno de desarrollo, arranca la app y revisa la consola o llama a `getOAuthRedirectUri()` desde `src/lib/oauth.ts`.

> **Nota:** Google/Apple con flujo OAuth en navegador funciona bien en builds nativos. En Expo Go puede requerir añadir la URL `exp://...` de tu sesión a Supabase.

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

**¿Qué es EAS Build?** Es el servicio en la nube de Expo que compila tu app y genera el archivo instalable (APK/AAB en Android, IPA en iOS). **No lo necesitas para desarrollar**: con `npm start` y Expo Go puedes probar la app en tu móvil. Solo hace falta EAS cuando quieras publicar en Google Play o App Store, o instalar un APK sin Expo Go.

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
