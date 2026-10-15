# LinguaFly — migración de conversación a Cloudflare Workers AI

## Objetivo y alcance

La tutoría de voz pregunta al inicio el tema y el nivel (CEFR), detecta preferencias mencionadas al hablar y recupera fragmentos relevantes de los artículos de LinguaFly desde el índice FTS5 de D1. Los artículos se consultan en tiempo de ejecución; no se vuelve a entrenar ni se duplica el contenido. El Worker público incluye `/tutor-ia` y sus endpoints de voz, además de la experiencia de artículos.

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
- `POST /api/tutor-avatar/greet` y `POST /api/tutor-avatar/turn` usan el binding `AI` para TTS, Whisper y chat; comparten limitación de solicitudes y no necesitan tokens REST en runtime.
- \`POST /api/ai-tutor/session\` devuelve HTTP 410: es el endpoint antiguo que creaba sesiones de OpenAI Realtime. El hook cliente se sustituyó por captura por turnos.

## Bindings de Cloudflare

\`wrangler.jsonc\` configura el binding \`AI\` y un binding de limitación \`AI_RATE_LIMITER\`.

El limitador aplica un máximo inicial de 30 solicitudes por minuto por ruta e IP, por ubicación de Cloudflare. Es una defensa adicional; sus contadores son eventualmente consistentes y locales a la ubicación. **No es una cuota de facturación ni reemplaza los límites por usuario/plan**. Antes de cobrar a usuarios hay que integrar la autenticación y cuotas de producto, revisar reglas de WAF y monitorización, y confirmar que el \`namespace_id\` elegido sea único en la cuenta de Cloudflare. Las rutas de IA fallan de forma cerrada en producción si no encuentran el binding del limitador.

Las rutas del tutor oral usan el binding `AI` de Cloudflare; no necesitan que `CLOUDFLARE_ACCOUNT_ID` ni `CLOUDFLARE_API_TOKEN` estén configurados como variables runtime del Worker.

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
5. Verificar que el tutor recupera guías pertinentes para varios temas y que muestra solo enlaces reales devueltos por D1; si la búsqueda falla, la práctica debe continuar sin afirmar que consultó el blog.
5. Validar en Chrome/Safari móvil: permiso de micrófono, silencio para cerrar turno, acentos, ruido, transcripción vacía, interrupción y desconexión.
6. Medir p50/p95 de la transcripción, generación de texto y TTS por separado, coste real y duración por turno.
7. Revisar los logs de Cloudflare y activar límites/alertas de gasto antes del despliegue público.

El build y las llamadas reales a Workers AI deben verificarse contra la versión publicada en Cloudflare antes de considerar la migración validada.

## Dependencias de OpenAI que permanecen

La migración elimina la dependencia directa de la API de OpenAI en los flujos interactivos enumerados arriba. Los scripts de generación de contenido/audio offline y \`src/lib/text-to-speech.ts\` todavía contienen utilidades heredadas basadas en OpenAI. El paquete npm \`openai\` no se elimina en esta fase; hay que revisar los scripts de publicación de material antes de retirarlo. Esto no bloquea que el chat web funcione sin \`OPENAI_API_KEY\`, siempre que no se invoque uno de esos scripts.

## Rollback

No hay migraciones de base de datos ni cambios destructivos. Para revertir, no hacer merge de esta rama o revertir el PR y volver a desplegar la versión estable anterior. No retirar todavía las variables heredadas de OpenAI de los sistemas de generación offline hasta que sus pipelines se migren por separado.
