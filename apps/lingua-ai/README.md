# LinguaFly AI

Aplicación independiente para practicar inglés. Se ejecuta como un Worker
distinto al de la web pública y usa su propia base Cloudflare D1.

## Separación de recursos

- Worker de esta app: `lingua-ai-app`.
- Base D1 de esta app: `lingua-ai-auth-db`.
- Binding que usa el código: `AUTH_DB`.
- La web pública sigue usando `linguaflyapp1` y `linguafly_db`.

**No cambies la configuración ni las migraciones de la web pública para instalar esta aplicación.**

## Desarrollo local

Desde esta carpeta:

1. Instala las dependencias para actualizar también el lockfile después del cambio de Better Auth:
   `npm install`.
2. Copia `.dev.vars.example` como `.dev.vars`.
3. Genera un secreto local con Node:
   `node -e "console.log(require('node:crypto').randomBytes(32).toString('base64'))"`.
   Pega el resultado en `BETTER_AUTH_SECRET` dentro de `.dev.vars`.
4. Mantén `BETTER_AUTH_URL=http://localhost:5440` en `.dev.vars`.
5. Aplica el esquema solo a la D1 local:
   `npm run d1:migrate:local`.
6. Arranca Next en desarrollo:
   `npm run dev`.

Para probar con el mismo runtime de Workers que se usa en producción:
`npm run preview`.

Los archivos `.dev.vars` y `.env.local` deben permanecer locales y no subirse a Git.

## Preparar Cloudflare (manual; no se ha ejecutado)

Antes de publicar:

1. Desde esta carpeta, crea la nueva D1:
   `npx wrangler d1 create lingua-ai-auth-db`.
2. Copia el ID que entregue Cloudflare y sustituye el valor de ejemplo
   `database_id` en `wrangler.jsonc`.
3. Aplica la migración a esa base nueva, después de verificar el nombre y el ID:
   `npx wrangler d1 migrations apply lingua-ai-auth-db --remote`.
4. Configura el secreto del Worker:
   `npx wrangler secret put BETTER_AUTH_SECRET`.
   Usa un secreto aleatorio de al menos 32 caracteres; no lo guardes en Git.
5. Comprueba que `BETTER_AUTH_URL` sea el origen público correcto.
6. Solo después de probar el registro y el inicio de sesión, despliega con
   `npm run deploy`.

No ejecutes estos pasos remotos contra `linguafly_db`: es la base de la web pública.

## Estado funcional de la autenticación

- Registro e inicio de sesión: Better Auth con email y contraseña.
- Sesiones: cookies httpOnly; seguras en HTTPS; la sesión se valida en el servidor.
- Perfiles: D1, vinculados al ID de usuario de Better Auth. La app no confía en un
  ID enviado por el navegador para consultar el perfil.
- Recuperación de contraseña: **desactivada hasta configurar un proveedor de correo**.
  La interfaz lo indica expresamente y no afirma haber enviado un correo.

El proyecto Supabase anterior, sus dependencias y su migración PostgreSQL se conservan
durante esta fase como respaldo; ya no son el camino de autenticación usado por estas páginas.
