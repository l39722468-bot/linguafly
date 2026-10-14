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
5. Mantén `AUTH_EMAIL_ENABLED=false` durante el desarrollo normal. El envío está apagado hasta que el dominio y el remitente estén verificados en Cloudflare.
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

La variable `AUTH_EMAIL_ENABLED` está en `false` por defecto para impedir que el registro o la recuperación afirmen que enviaron mensajes antes de que el dominio esté verificado. Mientras está apagada, las acciones de registro/recuperación muestran un error claro y no envían correo.

## Preparar la base D1 y desplegar (manual; no se ha ejecutado)

Antes de publicar:

1. Desde esta carpeta, crea una D1 nueva:
   `npx wrangler d1 create lingua-ai-auth-db`.
2. Copia el ID que entregue Cloudflare y sustituye el valor de ejemplo
   `database_id` en `wrangler.jsonc`.
3. Aplica la migración a esa base nueva, después de verificar el nombre y el ID:
   `npx wrangler d1 migrations apply lingua-ai-auth-db --remote`.
4. Configura el secreto del Worker:
   `npx wrangler secret put BETTER_AUTH_SECRET`.
   Usa un secreto aleatorio de al menos 32 caracteres; no lo guardes en Git.
5. Comprueba que `BETTER_AUTH_URL` sea `https://app.linguafly.app`.
6. Completa la sección de activación de correo anterior; habilita `AUTH_EMAIL_ENABLED=true` solo cuando el dominio esté verificado y hayas probado el envío.
7. Solo después de probar registro, verificación de email, inicio de sesión, recuperación y restablecimiento, despliega con `npm run deploy`.

No ejecutes estos pasos remotos contra `linguafly_db`: es la base de la web pública.

## Estado de la autenticación

- Registro: Better Auth con correo y contraseña; requiere verificar el email antes de poder iniciar sesión.
- Sesiones: cookies httpOnly; seguras en HTTPS; la sesión se valida en el servidor.
- Perfiles: D1, vinculados al ID de usuario de Better Auth. La app no confía en un ID enviado por el navegador para consultar el perfil.
- Verificación y recuperación: callbacks de Better Auth implementados con Cloudflare Email Service; el envío permanece desactivado hasta verificar el dominio y habilitar la variable de configuración.
- Restablecimiento: Better Auth valida el token y la nueva contraseña; las sesiones se revocan tras restablecer.

El proyecto Supabase anterior, sus dependencias y su migración PostgreSQL se conservan durante esta fase como respaldo; ya no son el camino de autenticación usado por estas páginas.
