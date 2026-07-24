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

## Pantallas

- **Inicio** — botón «Empezar a aprender»
- **Reproductor de unidad** — ejercicios secuenciales con barra de progreso
- **Completado** — avance automático a la siguiente unidad

## Tipos de ejercicio soportados

| Tipo | Estado |
|------|--------|
| `multiple-choice` | ✅ |
| `true-false` | ✅ |
| `fill-blank` | ✅ |
| `reading` / `reading-comprehension` | ✅ |
| `listening` / `listening-comprehension` | ✅ (audio remoto o transcripción) |
| Otros (writing, speaking, drag-drop…) | ⏭️ Saltar por ahora |

## Estructura

```
mobile/src/
  api/client.ts           # Cliente HTTP
  components/
    ExerciseRenderer.tsx  # Dispatcher de ejercicios
    exercises/            # UI por tipo
  screens/
    UnitPlayerScreen.tsx  # Sesión de unidad completa
  utils/
    bilingual.ts          # Marcadores [[en|es]]
    exercise-eval.ts      # Corrección local
    lesson-progress.ts    # Claves de progreso
```

## Documentación API

Ver `../docs/mobile-app.md`
