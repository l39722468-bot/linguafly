# Registro de alumnos con n8n

Workflow de matrícula **idempotente** para los cursos Linguafly. La app Next.js guarda primero en D1; n8n orquesta HubSpot, el email de bienvenida y los reintentos.

```
Alumno → POST /api/enrollment → D1 (fuente de verdad)
                           ↘ HMAC → n8n /webhook/registro-alumnos
                                      → Postgres UNIQUE(email, course_id)
                                      → HubSpot (no bloquea)
                                      → Email de bienvenida (no bloquea)
```

Si n8n está caído, la plaza **sigue guardada** en D1. El workflow de reintentos drena el outbox cada 5 minutos.

## Arranque local

```bash
cp n8n/.env.example n8n/.env
# rellena N8N_ENCRYPTION_KEY y N8N_ENROLLMENT_HMAC_SECRET
cd n8n && docker compose up -d
```

1. Abre http://localhost:5678 y crea la cuenta de n8n.
2. Crea la credencial **Postgres Linguafly** (`host=postgres`, `database=n8n`, usuario/clave del `.env`).
3. (Opcional) SMTP Linguafly y `HUBSPOT_ACCESS_TOKEN`.
4. Importa, en este orden:
   - `workflows/registro-alumnos-errores.json`
   - `workflows/registro-alumnos.json`
   - `workflows/registro-alumnos-reintentos.json`
5. Activa los tres workflows.
6. En la app:

```
N8N_ENROLLMENT_WEBHOOK_URL=http://localhost:5678/webhook/registro-alumnos
N8N_ENROLLMENT_HMAC_SECRET=el-mismo-secreto
ENROLLMENT_DRAIN_API_KEY=el-mismo-del-compose
```

El webhook productivo de n8n (tras activar el workflow) es:

`POST /webhook/registro-alumnos`

En pruebas manuales usa `/webhook-test/registro-alumnos`.

## Fiabilidad

| Riesgo | Mitigación |
| --- | --- |
| Doble clic / reintento HTTP | `UNIQUE(email, course_id)` + clave de idempotencia |
| Replay del webhook | HMAC canónico `timestamp.enrollmentId.email.courseId` (5 min) |
| HubSpot o SMTP caídos | `onError: continueRegularOutput` + reintentos del nodo |
| n8n caído | Outbox en D1 + cron cada 5 min |
| Fallo no recuperable | Error workflow → `failed_enrollments` + email a ops |
| Bots | Honeypot `website` + rate limit email/IP |

## Regenerar JSON

```bash
node n8n/scripts/generate-workflows.mjs
node n8n/scripts/validate-workflow.mjs
```
