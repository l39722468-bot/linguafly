# Especificación Técnica: AI Tutor Pro

## Contexto Técnico
- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **IA Generativa**: OpenAI (GPT-4o)
- **Voz**: ElevenLabs API
- **Reconocimiento de voz**: Web Speech API (Browser-native) para baja latencia.

## Arquitectura de Componentes
### 1. `AIConversationSimulator.tsx` (Refactorización)
- **Estado**: Gestionará una lista de `Message` (id, role, text, audioUrl, corrections).
- **Audio**: Un objeto `Audio` persistente para reproducir las respuestas de la IA.
- **Feedback**: Renderizado de sugerencias gramaticales debajo de cada mensaje del usuario.

### 2. Hook `useAIConversation`
- Manejará las llamadas a la API de chat.
- Gestionará la cola de audio para asegurar que la IA hable después de recibir la respuesta.

## API Endpoints

### `POST /api/ai-tutor/chat`
- **Entrada**: `{ tutorId, scenarioId, messages, level }`
- **Lógica**: 
  - Selecciona el system prompt basado en el `tutorId`.
  - Instruye a la IA para:
    1. Mantener la charla.
    2. Proporcionar un JSON que contenga: `reply` (texto para hablar) y `feedback` (opcional, correcciones técnicas).
- **Salida**: `{ reply, feedback }`

### `POST /api/ai-tutor/tts`
- **Entrada**: `{ text, voiceId }`
- **Lógica**: Llama a ElevenLabs `/v1/text-to-speech/{voice_id}`.
- **Salida**: Stream de audio MPEG.

## Estructura de Datos
```typescript
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  audioUrl?: string;
  feedback?: {
    original: string;
    correction: string;
    explanation: string;
  };
}
```

## Fases de Entrega
1. **Fase A**: Configuración de API Routes (OpenAI + ElevenLabs).
2. **Fase B**: Integración de Reconocimiento de Voz en el componente UI.
3. **Fase C**: Lógica de Feedback Híbrido (Prompts + UI).
4. **Fase D**: Pulido de latencia y pruebas de flujo completo.

## Verificación
- **Pruebas**: Usar `npm run test` para validar la lógica de parseo de feedback.
- **Lint**: `npm run lint` para asegurar calidad de código.
