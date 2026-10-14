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

La configuración desplegada del Worker usa `AUTH_EMAIL_ENABLED=true`, basándonos en que el panel muestra el envío Activado, DNS Configurado y en que confirmaste tener Workers Paid. En desarrollo local, el ejemplo mantiene el envío apagado. Si el envío falla en producción, revisa los logs del Worker y el Registro de actividad de Email Service; la interfaz de registro y recuperación utiliza mensajes prudentes para no afirmar que una entrega está garantizada.

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

## Siguientes pasos antes de publicar

1. Configura el secreto del Worker desde la carpeta `apps/lingua-ai`:
   `npx wrangler secret put BETTER_AUTH_SECRET`.
   Introduce un secreto aleatorio de al menos 32 caracteres; no lo guardes en Git.
2. Comprueba que `BETTER_AUTH_URL` sea `https://app.linguafly.app`.
3. Espera que pasen CI y la prueba local de correo.
4. Publica solo cuando estés listo para habilitar el Worker nuevo:
   `npm run deploy`.

La migración de esquema desde Console no despliega nada por sí sola.

## Estado de la autenticación

- Registro: Better Auth con correo y contraseña; requiere verificar el email antes de poder iniciar sesión.
- Sesiones: cookies httpOnly; seguras en HTTPS; la sesión se valida en el servidor.
- Perfiles: D1, vinculados al ID de usuario de Better Auth. La app no confía en un ID enviado por el navegador para consultar el perfil.
- Verificación y recuperación: callbacks de Better Auth implementados con Cloudflare Email Service; el envío permanece desactivado hasta verificar el dominio y habilitar la variable de configuración.
- Restablecimiento: Better Auth valida el token y la nueva contraseña; las sesiones se revocan tras restablecer.

El proyecto Supabase anterior, sus dependencias y su migración PostgreSQL se conservan durante esta fase como respaldo; ya no son el camino de autenticación usado por estas páginas.
