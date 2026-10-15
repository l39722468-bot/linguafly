# LinguaFly AI

Aplicación independiente para practicar inglés. Se ejecuta como un Worker
distinto al de la web pública y usa su propia base Cloudflare D1.

## Separación de recursos

- Worker de esta app: `lingua-ai-app`.
- Base D1 de esta app: `lingua-ai-auth-db`.
- Binding de base de datos: `AUTH_DB`.
- Binding de correo: `EMAIL` (Cloudflare Email Service).
- La web pública sigue usando `linguaflyapp1` y `linguafly_db`.

**No cambies la configuración ni las migraciones de la web pública para instalar esta aplicación.**

## Desarrollo local

Desde esta carpeta:

1. Instala las dependencias:
   `npm ci`.
2. Copia `.dev.vars.example` como `.dev.vars`.
3. Genera un secreto local con Node:
   `node -e "console.log(require('node:crypto').randomBytes(32).toString('base64'))"`.
   Pega el resultado en `BETTER_AUTH_SECRET` dentro de `.dev.vars`.
4. Mantén `BETTER_AUTH_URL=http://localhost:5440` en `.dev.vars`.
5. En desarrollo local, mantén `AUTH_EMAIL_ENABLED=false` salvo que quieras hacer una prueba real de envío. La configuración desplegada del Worker ya usa `AUTH_EMAIL_ENABLED=true` porque confirmaste que el dominio figura Activado y los DNS Configurados en Cloudflare.
6. Aplica el esquema solo a la D1 local:
   `npm run d1:migrate:local`.
7. Arranca Next en desarrollo:
   `npm run dev`.

Para probar con el mismo runtime de Workers que se usa en producción:
`npm run preview`.

Sin una vinculación remota, Wrangler simula los envíos de correo durante el desarrollo; no llegan correos reales. No actives vinculaciones remotas para correo en un entorno de pruebas sin querer enviar mensajes reales.

Los archivos `.dev.vars` y `.env.local` deben permanecer locales y no subirse a Git.

## Activar el envío desde Cloudflare

LinguaFly AI está preparada para usar **Cloudflare Email Service** desde el binding nativo de Workers. Better Auth lo utiliza tanto para confirmar direcciones de correo al registrarse como para enviar enlaces de recuperación de contraseña.

**No actives todavía `AUTH_EMAIL_ENABLED`** hasta completar todos los pasos de esta sección.

1. En el panel de Cloudflare, abre **Compute → Email Service → Email Sending**.
2. Selecciona **Onboard Domain** y elige `linguafly.app`. Cloudflare verificará/configurará los registros necesarios para el envío, incluyendo SPF, DKIM, DMARC y el subdominio de rebotes. Revisa las entradas DNS y espera a que se verifiquen.
3. Comprueba el plan de Workers de la cuenta. El envío a direcciones arbitrarias requiere **Workers Paid**; el plan Free no permite utilizar Email Sending para enviar a cualquier destinatario. La cuota indicada por Cloudflare es de 3.000 correos salientes incluidos al mes en Workers Paid, y después se cobra por uso. Confirma el precio vigente en el panel antes de habilitarlo.
4. Conserva el binding `EMAIL` y la restricción de remitente `noreply@linguafly.app` definidos en `wrangler.jsonc`. El remitente debe pertenecer al dominio incorporado a Email Service.
5. Cuando el dominio se muestre verificado, cambia `AUTH_EMAIL_ENABLED` a `true` en las variables del Worker. Mantén `AUTH_EMAIL_FROM=noreply@linguafly.app`.
6. Después de crear y verificar la D1 nueva, configurar `BETTER_AUTH_SECRET` y comprobar la URL de la aplicación, despliega la nueva app y envía un correo de prueba a una dirección que controles.
7. Revisa los registros de Email Service y la bandeja de entrada, incluida la carpeta de correo no deseado, antes de considerar activada la recuperación en producción.

Cloudflare Email Service está en beta. La documentación oficial de envío y requisitos está en:
`https://developers.cloudflare.com/email-service/get-started/send-emails/`
y la documentación oficial de precios en:
`https://developers.cloudflare.com/email-service/platform/pricing/`.

La configuración versionada mantiene `AUTH_EMAIL_ENABLED=false` durante el primer despliegue para evitar enviar correos antes de completar la comprobación de la aplicación. Tras confirmar que el Worker responde con su dominio definitivo y que el secreto está configurado, se habilitará el envío con una nueva actualización de configuración y se probará con una dirección que controles.

## Aplicar la migración desde el panel de Cloudflare

La base nueva `lingua-ai-auth-db` ya fue creada en el panel; su ID está configurado en `wrangler.jsonc`.

1. En Cloudflare, abre **D1 SQL Database → lingua-ai-auth-db → Console**.
2. Ejecuta el contenido de `sql/cloudflare-console-schema.sql`. Es idempotente y crea las tablas `user`, `session`, `account`, `verification`, `profiles`, sus índices y el trigger de actualización.
3. Comprueba con esta consulta que aparecen las tablas esenciales:

   ```sql
   SELECT name FROM sqlite_master
   WHERE type IN ('table', 'trigger')
     AND name IN ('user', 'session', 'account', 'verification', 'profiles', 'profiles_set_updated_at')
   ORDER BY name;
   ```

   Deben aparecer las cinco tablas y el trigger.
4. **Solo cuando el paso 3 haya terminado correctamente**, ejecuta el contenido de `sql/cloudflare-console-record-migration.sql`. Este crea/actualiza el registro `d1_migrations` para que Wrangler sepa que `0001_better_auth_and_profiles.sql` ya se aplicó desde la consola y no intente crear las tablas otra vez.
5. Comprueba el registro:

   ```sql
   SELECT name, applied_at FROM d1_migrations
   ORDER BY id;
   ```

   Debe aparecer `0001_better_auth_and_profiles.sql`.

También se puede ver el esquema completo desde la consola con `SELECT name, sql FROM sqlite_master WHERE type IN ('table','index','trigger') ORDER BY type, name;`.

**No ejecutes estos SQL contra `linguafly_db`**: es la base de la web pública. Asegúrate de que el nombre de la página sea exactamente `lingua-ai-auth-db`.

## Historial de prácticas

Los resultados terminados se guardan en `practice_attempts`, dentro de la D1 exclusiva de esta app. La migración `migrations/0002_practice_attempts.sql` crea esa tabla y su índice; cada consulta y escritura filtra por el usuario de la sesión validada.

Después de actualizar el código de esta app y antes de desplegarlo, ejecuta desde esta carpeta:

```powershell
npm run d1:migrate:remote
```

Este comando aplica las migraciones pendientes a `lingua-ai-auth-db` mediante la configuración de `apps/lingua-ai/wrangler.jsonc`. No ejecutes esta migración en `linguafly_db` ni cambies las migraciones de la web pública. Después puedes ejecutar `npx opennextjs-cloudflare build` y `npx wrangler deploy`.

## Análisis de respuestas por tema

La migración `migrations/0003_practice_question_results.sql` crea `practice_question_results`, que vincula cada una de las cinco respuestas validadas a su práctica y a un tema gramatical o de vocabulario. El servidor comprueba los identificadores de pregunta y calcula la puntuación usando el banco de preguntas versionado; no confía en la puntuación que envía el navegador.

Tras actualizar esta app, aplica las migraciones pendientes desde `apps/lingua-ai` a la base D1 dedicada:

```powershell
npm run d1:migrate:remote
```

Después ejecuta la comprobación de tipos, compila y despliega el Worker. El resumen por temas empieza a poblarse con las prácticas realizadas desde que la migración esté aplicada; los intentos antiguos conservan su puntuación, pero no pueden reconstruir respuestas que nunca se guardaron.

## Conversación de inglés por voz con Cloudflare Workers AI

La ruta protegida `/app/conversacion` permite conversar en inglés mediante turnos de voz: el alumno graba una intervención breve, el servidor la transcribe, genera una respuesta pedagógica y sintetiza el audio. Se conservan los escenarios de conversación libre, escucha y responde, restaurante, viajes y entrevista de trabajo.

La conversación utiliza el binding nativo `AI` configurado en este Worker privado en `wrangler.jsonc`. No requiere `OPENAI_API_KEY`, un token externo de IA ni claves de proveedor en el navegador.

### Modelos evaluados y selección inicial

- **Reconocimiento de voz:** `@cf/openai/whisper-large-v3-turbo`, alojado y ejecutado por Cloudflare Workers AI. La API recibe el audio codificado en base64 y devuelve la transcripción en inglés. La documentación del catálogo indica una tarifa de referencia de **0,000513 USD por minuto de audio**.
- **Tutor y diálogo:** `@cf/openai/gpt-oss-20b`, el modelo abierto de OpenAI servido por Cloudflare. No llama a la API de OpenAI; se invoca con `env.AI.run`. El precio publicado en el catálogo es **0,20 USD por millón de tokens de entrada y 0,30 USD por millón de tokens de salida**.
- **Voz del tutor:** `@cf/deepgram/aura-2-en`, que genera audio en inglés desde texto. La referencia publicada es **0,03 USD por 1.000 caracteres**; el texto hablado se limita en el servidor para acotar el uso.

Los precios son referencias del catálogo consultado y pueden cambiar. Consulta el catálogo y los datos de facturación de tu cuenta antes de abrir la función a más usuarios. Los tres componentes se llaman desde el Worker privado a través del binding `AI`; no se ha realizado fine-tuning ni se guardan las conversaciones en D1.

### Diferencia respecto a Realtime

Esta versión reemplaza la sesión continua WebRTC por una secuencia de turnos. El flujo es: autenticación Better Auth → transcripción → generación de texto con historial corto → síntesis de voz. Es una ruta más fácil de auditar y no necesita una clave de OpenAI, pero puede introducir más latencia entre turnos y no equivale a una conversación full-duplex con interrupciones en tiempo real.

El endpoint `/api/conversacion/turn` requiere una sesión válida, limita la grabación a 5 MB, valida el escenario, toma el nivel CEFR y el idioma de explicación de la D1 de esta app, limita el historial enviado al modelo y devuelve respuestas sin caché. Las grabaciones y transcripciones no se persisten en la cuenta. Si la síntesis de voz falla, la respuesta textual sigue disponible.

### Configuración

El binding de Workers AI se declara en `apps/lingua-ai/wrangler.jsonc` bajo `ai.binding = "AI"`. No añadas `OPENAI_API_KEY` ni ninguna clave de proveedor para esta función. Para ejecutar el flujo en local, utiliza `npm run preview` para probarlo dentro del runtime de Workers; comprueba que tu cuenta permite ejecutar los modelos de Workers AI.

## Metodología educativa de conversación

El tutor no intenta comportarse como un chatbot generalista: sus instrucciones de sesión establecen una metodología explícita de enseñanza de idiomas.

- **Input comprensible por nivel CEFR:** vocabulario, longitud de frase y ritmo ajustados al alumno.
- **Enfoque comunicativo y tareas reales:** role-play de conversación libre, restaurante, viaje y entrevista; el alumno tiene que resolver algo hablando.
- **Práctica de escucha primero:** el modo «Escucha y responde» presenta un mensaje breve de audio y una sola pregunta de comprensión. La transcripción del tutor permanece oculta al empezar, para que la lectura no sustituya a la escucha; el alumno puede mostrarla cuando lo necesite.
- **Producción activa y tiempo de espera:** el tutor hace una pregunta cada vez y deja espacio para que el alumno formule su respuesta, en vez de resolverla por él.
- **Corrección selectiva y amable (recast):** responde primero al significado, ofrece un modelo más natural y explica como máximo un punto importante en el idioma de explicación del perfil.
- **Reciclaje y recuperación activa:** reutiliza frases útiles más adelante e invita al alumno a decir algo parecido en una nueva situación.

Esta es una estrategia de prompting pedagógico; no significa que se haya reentrenado el modelo base. Las transcripciones de esta conversación no se persisten todavía, y no se muestran puntuaciones de pronunciación sin una evaluación fiable.

La conversación utiliza Workers AI según la selección de modelos documentada en la sección anterior. No se necesita un secreto de OpenAI para esta función.

## Preparar y desplegar el Worker

El Worker configurado para esta app se llama `lingua-ai-app`. Su dominio deseado es `app.linguafly.app`, y la configuración personalizada se aplicará al desplegar.

Antes de desplegar:

1. En Cloudflare DNS, comprueba que `app.linguafly.app` no tiene ya un registro DNS que entre en conflicto. Wrangler configurará este subdominio como dominio personalizado para el nuevo Worker.
2. Desde la carpeta `apps/lingua-ai`, prepara un archivo local de secretos. No lo subas a Git:

   En PowerShell, genera un secreto aleatorio y guárdalo en el archivo excluido de Git:

   ```powershell
   $secret = node -e "process.stdout.write(require('node:crypto').randomBytes(32).toString('base64url'))"
   Set-Content -Path .worker-secrets -Value "BETTER_AUTH_SECRET=$secret" -NoNewline
   git check-ignore .worker-secrets
   ```

   El último comando debe mostrar `.worker-secrets`. Si no lo muestra, detente y no despliegues hasta comprobar el `.gitignore`.
3. Comprueba una vez más que `database_id` en `wrangler.jsonc` coincide con el ID de `lingua-ai-auth-db` en el panel. No lo cambies por `linguafly_db`.
4. Compila el bundle de Cloudflare OpenNext:

   ```powershell
   npx opennextjs-cloudflare build
   ```

5. Despliega el Worker y el secreto en la misma operación:

   ```powershell
   npx wrangler deploy --secrets-file .worker-secrets
   ```

   No pegues el secreto en el chat ni en un archivo versionado. El archivo local `.worker-secrets` debe quedarse en tu ordenador.
6. Confirma que el despliegue termina correctamente y que `app.linguafly.app` responde. En el primer despliegue, el envío de correos permanece apagado mediante `AUTH_EMAIL_ENABLED=false`.
7. Comprueba registro/inicio de sesión y el endpoint de sesión; solo después activaremos `AUTH_EMAIL_ENABLED=true` para probar verificación y recuperación con una dirección tuya.

El despliegue y la migración de esquema son operaciones distintas. La migración de D1 ya se aplicó desde Console y no hay que repetirla.


## Estado de la autenticación

- Registro: Better Auth con correo y contraseña; requiere verificar el email antes de poder iniciar sesión.
- Sesiones: cookies httpOnly; seguras en HTTPS; la sesión se valida en el servidor.
- Perfiles: D1, vinculados al ID de usuario de Better Auth. La app no confía en un ID enviado por el navegador para consultar el perfil.
- Verificación y recuperación: callbacks de Better Auth implementados con Cloudflare Email Service; el envío permanece desactivado hasta verificar el dominio y habilitar la variable de configuración.
- Restablecimiento: Better Auth valida el token y la nueva contraseña; las sesiones se revocan tras restablecer.

El proyecto Supabase anterior, sus dependencias y su migración PostgreSQL se conservan durante esta fase como respaldo; ya no son el camino de autenticación usado por estas páginas.
