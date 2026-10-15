# LinguaFly — migración de conversación a Cloudflare Workers AI

## Objetivo y alcance

La migración sustituye las llamadas de ejecución a la API de OpenAI en los flujos interactivos de conversación, tutoría, voz, pistas y evaluación por bindings de Cloudflare Workers AI. El Worker público incluye ahora la página `/tutor-ia` y sus endpoints `/api/tutor-avatar/greet` y `/api/tutor-avatar/turn`, además de la experiencia de artículos. No cambia el contenido de cursos ni modifica las tablas de D1/Supabase.

La implementación de voz de esta fase es **por turnos**, no una conversación de audio full-duplex en streaming: el navegador detecta una pausa, envía la grabación a Whisper, genera la respuesta con GLM y sintetiza la voz con Aura. Esto evita depender de OpenAI Realtime, pero añade la latencia de tres solicitudes consecutivas. Se debe medir antes de anunciarlo como «tiempo real».

## Modelos

- Texto y respuestas estructuradas: \`@cf/zai-org/glm-4.7-flash\`.
- Reconocimiento de voz por lotes: \`@cf/openai/whisper-large-v3-turbo\`, alojado y ejecutado mediante Workers AI; no requiere una llamada a la API de OpenAI.
- Síntesis de voz: \`@cf/deepgram/aura-1\`.

El adaptador común está en \`src/lib/ai/workers-ai.ts\`. Mantiene un único punto para acceder al binding, validar mensajes, interpretar JSON, convertir audio a base64 y mapear los identificadores antiguos de voces.

## Rutas migradas

- \`POST /api/ai-tutor/chat\` — respuesta y feedback pedagógico.
- \`POST /api/ai-tutor/hint\` — pistas para continuar hablando.
- \`POST /api/ai-tutor/tts\` — síntesis Aura.
- \`POST /api/ai-lab/stt\` — transcripción Whisper, límite de 8 MB.
- \`POST /api/ai-lab/tts\` — síntesis Aura.
- \`POST /api/ai-lab/chat\` — conversación de misión en streaming.
- \`POST /api/ai-lab/evaluate\` y \`POST /api/evaluate-response\` — evaluación y feedback.
- \`POST /api/translate\` y \`POST /api/course/explain\`.
- \`POST /api/roleplay-chat\`.
- \`GET/POST /api/generate-audio\`.
- \`POST /api/tutor-avatar/greet\` y \`POST /api/tutor-avatar/turn\` ahora comparten la limitación de solicitudes.
- \`POST /api/ai-tutor/session\` devuelve HTTP 410: es el endpoint antiguo que creaba sesiones de OpenAI Realtime. El hook cliente se sustituyó por captura por turnos.

## Bindings de Cloudflare

\`wrangler.jsonc\` configura el binding \`AI\` y un binding de limitación \`AI_RATE_LIMITER\`.

El limitador aplica un máximo inicial de 30 solicitudes por minuto por ruta e IP, por ubicación de Cloudflare. Es una defensa adicional; sus contadores son eventualmente consistentes y locales a la ubicación. **No es una cuota de facturación ni reemplaza los límites por usuario/plan**. Antes de cobrar a usuarios hay que integrar la autenticación y cuotas de producto, revisar reglas de WAF y monitorización, y confirmar que el \`namespace_id\` elegido sea único en la cuenta de Cloudflare. Las rutas de IA fallan de forma cerrada en producción si no encuentran el binding del limitador.

No hay secretos nuevos que añadir para Workers AI: el binding usa la identidad de Cloudflare. Las rutas de tutor-avatar existentes siguen usando las variables \`CLOUDFLARE_ACCOUNT_ID\` y \`CLOUDFLARE_API_TOKEN\` para las llamadas REST que ya tenían; no se devuelven estos valores al cliente.

## Límites y controles del adaptador

- El cuerpo de chat acepta hasta 100 mensajes, pero envía al modelo solo los últimos 20.
- Cada mensaje se limita a 2.500 caracteres y el contexto combinado a 14.000 caracteres.
- La generación de voz se limita a 1.800 caracteres por solicitud.
- La transcripción rechaza archivos de más de 8 MB y archivos que declaren un tipo no-audio.
- Los errores enviados al cliente son genéricos; los logs no deben incluir audio, transcripciones completas ni credenciales.
- El frontend ya no genera puntuaciones o correcciones ficticias: presenta feedback solo cuando lo devuelve el modelo.

## Verificación previa a producción

Ejecutar en un entorno con dependencias instaladas:

1. \`npm test -- --runInBand __tests__/unit/workers-ai.test.ts\`
2. \`npm run type-check\`
3. \`npm run preview\` y probar el Worker de OpenNext con el binding \`AI\`.
4. Probar cada endpoint con cuerpo vacío/inválido, mensajes largos y solicitudes repetidas; confirmar respuestas 400/413/429 y que ninguna credencial llegue al navegador.
5. Validar en Chrome/Safari móvil: permiso de micrófono, silencio para cerrar turno, acentos, ruido, transcripción vacía, interrupción y desconexión.
6. Medir p50/p95 de la transcripción, generación de texto y TTS por separado, coste real y duración por turno.
7. Revisar los logs de Cloudflare y activar límites/alertas de gasto antes del despliegue público.

No se debe considerar superado el control de calidad hasta que estas pruebas se ejecuten contra un entorno Cloudflare real. La rama y el código se prepararon mediante GitHub; el build y las llamadas reales a Workers AI no se han ejecutado desde esta sesión.

## Dependencias de OpenAI que permanecen

La migración elimina la dependencia directa de la API de OpenAI en los flujos interactivos enumerados arriba. Los scripts de generación de contenido/audio offline y \`src/lib/text-to-speech.ts\` todavía contienen utilidades heredadas basadas en OpenAI. El paquete npm \`openai\` no se elimina en esta fase; hay que revisar los scripts de publicación de material antes de retirarlo. Esto no bloquea que el chat web funcione sin \`OPENAI_API_KEY\`, siempre que no se invoque uno de esos scripts.

## Rollback

No hay migraciones de base de datos ni cambios destructivos. Para revertir, no hacer merge de esta rama o revertir el PR y volver a desplegar la versión estable anterior. No retirar todavía las variables heredadas de OpenAI de los sistemas de generación offline hasta que sus pipelines se migren por separado.
