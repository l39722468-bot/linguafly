#!/usr/bin/env node
/**
 * Generates importable n8n workflow JSON for student course enrollment.
 * Run: node n8n/scripts/generate-workflows.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "workflows");

const COURSE_IDS = [
  "ingles-a1",
  "ingles-a2",
  "ingles-b1",
  "ingles-b2",
  "ingles-c1",
  "ingles-c2",
  "camarero-a1",
  "camarero-a2",
  "camarero-b1",
  "camarero-b2",
  "logistica-a1",
  "logistica-a2",
  "logistica-b1",
  "logistica-b2",
  "recepcionista-a1",
  "recepcionista-a2",
  "recepcionista-b1",
  "recepcionista-b2",
];

const VALIDATE_CODE = `const crypto = require('crypto');
const ALLOWED = new Set(${JSON.stringify(COURSE_IDS)});

function header(headers, name) {
  const key = Object.keys(headers || {}).find((k) => k.toLowerCase() === name.toLowerCase());
  return key ? String(headers[key]) : '';
}

const root = $input.first().json;
const headers = root.headers || {};
const payload = root.body && typeof root.body === 'object' ? root.body : (root.payload || root);

const email = String(payload.email || '').trim().toLowerCase();
const courseId = String(payload.courseId || '');
const enrollmentId = String(payload.enrollmentId || '');
const firstName = String(payload.firstName || '').trim();

if (!email.includes('@') || !email.includes('.') || firstName.length === 0 || !ALLOWED.has(courseId)) {
  return [{ json: { valid: false, status: 400, response: { success: false, error: 'Datos de registro inválidos' } } }];
}

const secret = $env.N8N_ENROLLMENT_HMAC_SECRET || '';
if (secret) {
  const timestamp = Number(header(headers, 'x-enrollment-timestamp'));
  const signature = header(headers, 'x-enrollment-signature').toLowerCase();
  const skew = Math.abs(Date.now() - timestamp);
  const expected = crypto.createHmac('sha256', secret)
    .update(timestamp + '.' + enrollmentId + '.' + email + '.' + courseId)
    .digest('hex');
  let ok = Number.isFinite(timestamp) && Boolean(signature) && skew <= 5 * 60 * 1000 && expected.length === signature.length;
  if (ok) {
    try { ok = crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature)); }
    catch (error) { ok = false; }
  }
  if (!ok) {
    return [{ json: { valid: false, status: 401, response: { success: false, error: 'Firma inválida' } } }];
  }
}

return [{ json: {
  valid: true,
  email,
  courseId,
  enrollmentId: enrollmentId || crypto.randomUUID(),
  studentId: String(payload.studentId || crypto.randomUUID()),
  firstName,
  lastName: String(payload.lastName || '').trim(),
  phone: payload.phone || null,
  courseName: String(payload.courseName || courseId),
  courseHref: String(payload.courseHref || ''),
  currentLevel: String(payload.currentLevel || 'unknown'),
  marketingConsent: Boolean(payload.marketingConsent),
  source: String(payload.source || 'n8n'),
  alreadyPersisted: Boolean(payload.alreadyPersisted),
} }];
`;

const BUILD_HUBSPOT_CODE = `const item = $input.first().json;
const properties = {
  email: item.email,
  firstname: item.firstName,
  lastname: item.lastName || '',
  phone: item.phone || '',
  lifecyclestage: 'customer',
  hs_lead_status: 'CONNECTED',
};
return [{ json: { ...item, hubspotProperties: properties, hasHubSpot: Boolean($env.HUBSPOT_ACCESS_TOKEN) } }];
`;

const BUILD_SUCCESS_CODE = `const item = $input.first().json;
return [{ json: {
  status: item.alreadyExisted ? 200 : 201,
  response: {
    success: true,
    alreadyEnrolled: Boolean(item.alreadyExisted),
    enrollmentId: item.enrollmentId,
    studentId: item.studentId,
    courseId: item.courseId,
    courseName: item.courseName,
  }
} }];
`;

function node(partial) {
  return {
    typeVersion: 1,
    position: [0, 0],
    ...partial,
  };
}

function conn(from, to, fromIndex = 0) {
  return { from, to, fromIndex };
}

function connectionsFrom(edges) {
  const connections = {};
  for (const edge of edges) {
    if (!connections[edge.from]) connections[edge.from] = { main: [] };
    const mains = connections[edge.from].main;
    while (mains.length <= edge.fromIndex) mains.push([]);
    mains[edge.fromIndex].push({ node: edge.to, type: "main", index: 0 });
  }
  return connections;
}

const postgresCreds = {
  postgres: { id: "postgres-linguafly", name: "Postgres Linguafly" },
};

const emailCreds = {
  smtp: { id: "smtp-linguafly", name: "SMTP Linguafly" },
};

const mainWorkflow = {
  name: "Linguafly · Registro de alumnos",
  id: "wf_registro_alumnos",
  active: false,
  nodes: [
    node({
      id: "note-intro",
      name: "Cómo funciona",
      type: "n8n-nodes-base.stickyNote",
      typeVersion: 1,
      position: [-280, 80],
      parameters: {
        width: 320,
        height: 420,
        content:
          "## Registro fiable de alumnos\n\n1. Webhook firmado (HMAC).\n2. Valida email + curso.\n3. Upsert en Postgres con UNIQUE(email, course_id).\n4. HubSpot y email **no bloquean** la matrícula.\n5. Si este workflow falla, el error workflow guarda `failed_enrollments`.\n\nLa app Next.js ya persistió en D1 antes de llamar.",
      },
    }),
    node({
      id: "webhook",
      name: "Webhook registro",
      type: "n8n-nodes-base.webhook",
      typeVersion: 2.1,
      position: [120, 300],
      webhookId: "registro-alumnos",
      parameters: {
        httpMethod: "POST",
        path: "registro-alumnos",
        responseMode: "responseNode",
        options: {},
      },
    }),
    node({
      id: "validate",
      name: "Validar firma y datos",
      type: "n8n-nodes-base.code",
      typeVersion: 2,
      position: [360, 300],
      parameters: { jsCode: VALIDATE_CODE },
    }),
    node({
      id: "if-valid",
      name: "¿Payload válido?",
      type: "n8n-nodes-base.if",
      typeVersion: 2.2,
      position: [600, 300],
      parameters: {
        conditions: {
          options: {
            caseSensitive: true,
            leftValue: "",
            typeValidation: "strict",
            version: 2,
          },
          conditions: [
            {
              id: "valid-true",
              leftValue: "={{ $json.valid }}",
              rightValue: true,
              operator: { type: "boolean", operation: "true", singleValue: true },
            },
          ],
          combinator: "and",
        },
      },
    }),
    node({
      id: "respond-invalid",
      name: "Responder error",
      type: "n8n-nodes-base.respondToWebhook",
      typeVersion: 1.1,
      position: [860, 520],
      parameters: {
        respondWith: "json",
        responseBody: "={{ JSON.stringify($json.response) }}",
        options: { responseCode: "={{ $json.status || 400 }}" },
      },
    }),
    node({
      id: "find-enrollment",
      name: "Buscar matrícula existente",
      type: "n8n-nodes-base.postgres",
      typeVersion: 2.5,
      position: [860, 180],
      credentials: postgresCreds,
      parameters: {
        operation: "executeQuery",
        query:
          "SELECT id, student_id, status FROM course_enrollments WHERE lower(email) = lower($1) AND course_id = $2 LIMIT 1",
        options: {
          queryReplacement: "={{ $json.email }},={{ $json.courseId }}",
        },
      },
    }),
    node({
      id: "merge-found",
      name: "Añadir si ya existía",
      type: "n8n-nodes-base.code",
      typeVersion: 2,
      position: [1080, 180],
      parameters: {
        jsCode: `const validated = $('Validar firma y datos').first().json;
const found = $input.first().json;
const alreadyExisted = Boolean(found && found.id);
return [{ json: { ...validated, alreadyExisted, existingEnrollmentId: found.id || null } }];`,
      },
    }),
    node({
      id: "upsert-student",
      name: "Upsert alumno",
      type: "n8n-nodes-base.postgres",
      typeVersion: 2.5,
      position: [1320, 180],
      credentials: postgresCreds,
      retryOnFail: true,
      maxTries: 3,
      waitBetweenTries: 2000,
      parameters: {
        operation: "executeQuery",
        query: `INSERT INTO students (id, email, first_name, last_name, phone, current_level, marketing_consent, created_at, updated_at)
VALUES ($1::uuid, $2, $3, $4, $5, $6, $7, NOW(), NOW())
ON CONFLICT (email) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  phone = COALESCE(EXCLUDED.phone, students.phone),
  current_level = EXCLUDED.current_level,
  marketing_consent = EXCLUDED.marketing_consent,
  updated_at = NOW()
RETURNING id, email;`,
        options: {
          queryReplacement:
            "={{ $json.studentId }},={{ $json.email }},={{ $json.firstName }},={{ $json.lastName }},={{ $json.phone }},={{ $json.currentLevel }},={{ $json.marketingConsent }}",
        },
      },
    }),
    node({
      id: "insert-enrollment",
      name: "Insertar matrícula",
      type: "n8n-nodes-base.postgres",
      typeVersion: 2.5,
      position: [1560, 180],
      credentials: postgresCreds,
      retryOnFail: true,
      maxTries: 3,
      waitBetweenTries: 2000,
      parameters: {
        operation: "executeQuery",
        query: `INSERT INTO course_enrollments (id, student_id, email, course_id, status, source, created_at)
VALUES ($1::uuid, $2::uuid, $3, $4, 'confirmed', $5, NOW())
ON CONFLICT (email, course_id) DO UPDATE SET status = course_enrollments.status
RETURNING id, student_id, email, course_id, status;`,
        options: {
          queryReplacement:
            "={{ $('Añadir si ya existía').first().json.enrollmentId }},={{ $('Añadir si ya existía').first().json.studentId }},={{ $('Añadir si ya existía').first().json.email }},={{ $('Añadir si ya existía').first().json.courseId }},={{ $('Añadir si ya existía').first().json.source }}",
        },
      },
    }),
    node({
      id: "audit",
      name: "Auditoría",
      type: "n8n-nodes-base.postgres",
      typeVersion: 2.5,
      position: [1800, 180],
      credentials: postgresCreds,
      parameters: {
        operation: "executeQuery",
        query: `INSERT INTO enrollment_events (enrollment_id, email, course_id, event_type, payload)
VALUES ($1::uuid, $2, $3, $4, $5::jsonb)`,
        options: {
          queryReplacement:
            "={{ $json.id }},={{ $json.email }},={{ $json.course_id }},={{ $('Añadir si ya existía').first().json.alreadyExisted ? 'duplicate' : 'enrolled' }},={{ JSON.stringify($('Añadir si ya existía').first().json) }}",
        },
      },
    }),
    node({
      id: "prepare-side-effects",
      name: "Preparar HubSpot y email",
      type: "n8n-nodes-base.code",
      typeVersion: 2,
      position: [2040, 180],
      parameters: { jsCode: BUILD_HUBSPOT_CODE.replace("const item = $input.first().json;", "const item = $('Añadir si ya existía').first().json;") },
    }),
    node({
      id: "if-hubspot",
      name: "¿Sincronizar HubSpot?",
      type: "n8n-nodes-base.if",
      typeVersion: 2.2,
      position: [2280, 80],
      parameters: {
        conditions: {
          options: {
            caseSensitive: true,
            leftValue: "",
            typeValidation: "strict",
            version: 2,
          },
          conditions: [
            {
              id: "hubspot-on",
              leftValue: "={{ $json.hasHubSpot }}",
              rightValue: true,
              operator: { type: "boolean", operation: "true", singleValue: true },
            },
          ],
          combinator: "and",
        },
      },
    }),
    node({
      id: "hubspot-search",
      name: "Buscar contacto HubSpot",
      type: "n8n-nodes-base.httpRequest",
      typeVersion: 4.2,
      position: [2520, -40],
      onError: "continueRegularOutput",
      retryOnFail: true,
      maxTries: 4,
      waitBetweenTries: 3000,
      parameters: {
        method: "POST",
        url: "https://api.hubapi.com/crm/v3/objects/contacts/search",
        sendHeaders: true,
        headerParameters: {
          parameters: [
            {
              name: "Authorization",
              value: "=Bearer {{ $env.HUBSPOT_ACCESS_TOKEN }}",
            },
            { name: "Content-Type", value: "application/json" },
          ],
        },
        sendBody: true,
        specifyBody: "json",
        jsonBody:
          "={{ JSON.stringify({ filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: $json.email }] }], properties: ['email'] }) }}",
        options: { timeout: 15000 },
      },
    }),
    node({
      id: "hubspot-upsert",
      name: "Crear o actualizar HubSpot",
      type: "n8n-nodes-base.httpRequest",
      typeVersion: 4.2,
      position: [2760, -40],
      onError: "continueRegularOutput",
      retryOnFail: true,
      maxTries: 4,
      waitBetweenTries: 3000,
      parameters: {
        method: "={{ $json.results && $json.results.length ? 'PATCH' : 'POST' }}",
        url: "={{ $json.results && $json.results.length ? 'https://api.hubapi.com/crm/v3/objects/contacts/' + $json.results[0].id : 'https://api.hubapi.com/crm/v3/objects/contacts' }}",
        sendHeaders: true,
        headerParameters: {
          parameters: [
            {
              name: "Authorization",
              value: "=Bearer {{ $env.HUBSPOT_ACCESS_TOKEN }}",
            },
            { name: "Content-Type", value: "application/json" },
          ],
        },
        sendBody: true,
        specifyBody: "json",
        jsonBody:
          "={{ JSON.stringify({ properties: Object.assign({}, $('Preparar HubSpot y email').first().json.hubspotProperties, { course_interest: $('Preparar HubSpot y email').first().json.courseId, last_cefr_level: $('Preparar HubSpot y email').first().json.currentLevel }) }) }}",
        options: { timeout: 15000 },
      },
    }),
    node({
      id: "if-email",
      name: "¿Enviar bienvenida?",
      type: "n8n-nodes-base.if",
      typeVersion: 2.2,
      position: [2280, 320],
      parameters: {
        conditions: {
          options: {
            caseSensitive: true,
            leftValue: "",
            typeValidation: "strict",
            version: 2,
          },
          conditions: [
            {
              id: "email-on",
              leftValue: "={{ Boolean($env.ENROLLMENT_FROM_EMAIL) && !$('Añadir si ya existía').first().json.alreadyExisted }}",
              rightValue: true,
              operator: { type: "boolean", operation: "true", singleValue: true },
            },
          ],
          combinator: "and",
        },
      },
    }),
    node({
      id: "send-welcome",
      name: "Email de bienvenida",
      type: "n8n-nodes-base.emailSend",
      typeVersion: 2.1,
      position: [2520, 240],
      credentials: emailCreds,
      onError: "continueRegularOutput",
      retryOnFail: true,
      maxTries: 3,
      waitBetweenTries: 5000,
      parameters: {
        fromEmail: "={{ $env.ENROLLMENT_FROM_EMAIL }}",
        toEmail: "={{ $('Preparar HubSpot y email').first().json.email }}",
        subject: "={{ 'Tu plaza en ' + $('Preparar HubSpot y email').first().json.courseName + ' está confirmada' }}",
        html: "=<p>Hola {{ $('Preparar HubSpot y email').first().json.firstName }},</p><p>Ya estás apuntado a <strong>{{ $('Preparar HubSpot y email').first().json.courseName }}</strong>.</p><p><a href=\"{{ $('Preparar HubSpot y email').first().json.courseHref }}\">Empezar el curso</a></p><p>— Linguafly</p>",
        options: {},
      },
    }),
    node({
      id: "build-success",
      name: "Componer respuesta OK",
      type: "n8n-nodes-base.code",
      typeVersion: 2,
      position: [3000, 180],
      parameters: { jsCode: BUILD_SUCCESS_CODE.replace("const item = $input.first().json;", "const item = $('Añadir si ya existía').first().json;") },
    }),
    node({
      id: "respond-ok",
      name: "Responder OK",
      type: "n8n-nodes-base.respondToWebhook",
      typeVersion: 1.1,
      position: [3240, 180],
      parameters: {
        respondWith: "json",
        responseBody: "={{ JSON.stringify($json.response) }}",
        options: { responseCode: "={{ $json.status }}" },
      },
    }),
  ],
  connections: connectionsFrom([
    conn("Webhook registro", "Validar firma y datos"),
    conn("Validar firma y datos", "¿Payload válido?"),
    conn("¿Payload válido?", "Buscar matrícula existente", 0),
    conn("¿Payload válido?", "Responder error", 1),
    conn("Buscar matrícula existente", "Añadir si ya existía"),
    conn("Añadir si ya existía", "Upsert alumno"),
    conn("Upsert alumno", "Insertar matrícula"),
    conn("Insertar matrícula", "Auditoría"),
    conn("Auditoría", "Preparar HubSpot y email"),
    conn("Preparar HubSpot y email", "¿Sincronizar HubSpot?"),
    conn("¿Sincronizar HubSpot?", "Buscar contacto HubSpot", 0),
    conn("¿Sincronizar HubSpot?", "¿Enviar bienvenida?", 1),
    conn("Buscar contacto HubSpot", "Crear o actualizar HubSpot"),
    conn("Crear o actualizar HubSpot", "¿Enviar bienvenida?"),
    conn("¿Enviar bienvenida?", "Email de bienvenida", 0),
    conn("¿Enviar bienvenida?", "Componer respuesta OK", 1),
    conn("Email de bienvenida", "Componer respuesta OK"),
    conn("Componer respuesta OK", "Responder OK"),
  ]),
  settings: {
    executionOrder: "v1",
    saveDataErrorExecution: "all",
    saveDataSuccessExecution: "all",
    saveManualExecutions: true,
    callerPolicy: "workflowsFromSameOwner",
    errorWorkflow: "wf_registro_alumnos_errores",
    timezone: "Europe/Madrid",
  },
  tags: [{ name: "linguafly" }, { name: "enrollment" }],
  meta: {
    description:
      "Webhook de matrícula de alumnos: validación HMAC, idempotencia Postgres, HubSpot y email no bloqueantes.",
  },
};

const errorWorkflow = {
  name: "Linguafly · Errores de registro",
  id: "wf_registro_alumnos_errores",
  active: false,
  nodes: [
    node({
      id: "error-trigger",
      name: "Error Trigger",
      type: "n8n-nodes-base.errorTrigger",
      typeVersion: 1,
      position: [200, 240],
      parameters: {},
    }),
    node({
      id: "log-failure",
      name: "Guardar fallo",
      type: "n8n-nodes-base.postgres",
      typeVersion: 2.5,
      position: [460, 240],
      credentials: postgresCreds,
      parameters: {
        operation: "executeQuery",
        query: `INSERT INTO failed_enrollments (execution_id, workflow_name, email, course_id, error_message, payload)
VALUES ($1, $2, $3, $4, $5, $6::jsonb)`,
        options: {
          queryReplacement:
            "={{ $json.execution.id }},={{ $json.workflow.name }},={{ $json.execution.data?.resultData?.runData ? '' : ($json.execution.data?.startData?.destinationNode || '') }},={{ '' }},={{ $json.execution.error?.message || 'unknown' }},={{ JSON.stringify($json) }}",
        },
      },
    }),
    node({
      id: "notify-admin",
      name: "Avisar a ops",
      type: "n8n-nodes-base.emailSend",
      typeVersion: 2.1,
      position: [720, 240],
      credentials: emailCreds,
      onError: "continueRegularOutput",
      parameters: {
        fromEmail: "={{ $env.ENROLLMENT_FROM_EMAIL }}",
        toEmail: "={{ $env.ENROLLMENT_ADMIN_EMAIL }}",
        subject: "Fallo en el registro de alumnos n8n",
        text: "={{ 'Ejecución ' + $json.execution.id + ' — ' + ($json.execution.error?.message || 'error') }}",
        options: {},
      },
    }),
  ],
  connections: connectionsFrom([
    conn("Error Trigger", "Guardar fallo"),
    conn("Guardar fallo", "Avisar a ops"),
  ]),
  settings: {
    executionOrder: "v1",
    saveDataErrorExecution: "all",
    timezone: "Europe/Madrid",
  },
  tags: [{ name: "linguafly" }, { name: "enrollment" }, { name: "errors" }],
};

const retryWorkflow = {
  name: "Linguafly · Reintentos outbox de matrícula",
  id: "wf_registro_alumnos_reintentos",
  active: false,
  nodes: [
    node({
      id: "cron",
      name: "Cada 5 minutos",
      type: "n8n-nodes-base.scheduleTrigger",
      typeVersion: 1.2,
      position: [200, 240],
      parameters: {
        rule: {
          interval: [{ field: "minutes", minutesInterval: 5 }],
        },
      },
    }),
    node({
      id: "if-configured",
      name: "¿Drain configurado?",
      type: "n8n-nodes-base.if",
      typeVersion: 2.2,
      position: [440, 240],
      parameters: {
        conditions: {
          options: {
            caseSensitive: true,
            leftValue: "",
            typeValidation: "strict",
            version: 2,
          },
          conditions: [
            {
              id: "drain-on",
              leftValue: "={{ Boolean($env.LINGUAFLY_DRAIN_URL) && Boolean($env.ENROLLMENT_DRAIN_API_KEY) }}",
              rightValue: true,
              operator: { type: "boolean", operation: "true", singleValue: true },
            },
          ],
          combinator: "and",
        },
      },
    }),
    node({
      id: "drain",
      name: "Drenar outbox D1",
      type: "n8n-nodes-base.httpRequest",
      typeVersion: 4.2,
      position: [700, 160],
      retryOnFail: true,
      maxTries: 3,
      waitBetweenTries: 4000,
      parameters: {
        method: "PUT",
        url: "={{ $env.LINGUAFLY_DRAIN_URL }}",
        sendHeaders: true,
        headerParameters: {
          parameters: [
            { name: "x-api-key", value: "={{ $env.ENROLLMENT_DRAIN_API_KEY }}" },
            { name: "Content-Type", value: "application/json" },
          ],
        },
        options: { timeout: 20000 },
      },
    }),
    node({
      id: "noop",
      name: "Sin drain",
      type: "n8n-nodes-base.noOp",
      typeVersion: 1,
      position: [700, 360],
      parameters: {},
    }),
  ],
  connections: connectionsFrom([
    conn("Cada 5 minutos", "¿Drain configurado?"),
    conn("¿Drain configurado?", "Drenar outbox D1", 0),
    conn("¿Drain configurado?", "Sin drain", 1),
  ]),
  settings: {
    executionOrder: "v1",
    timezone: "Europe/Madrid",
  },
  tags: [{ name: "linguafly" }, { name: "enrollment" }, { name: "retries" }],
};

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(
  path.join(OUT, "registro-alumnos.json"),
  JSON.stringify(mainWorkflow, null, 2) + "\n",
);
fs.writeFileSync(
  path.join(OUT, "registro-alumnos-errores.json"),
  JSON.stringify(errorWorkflow, null, 2) + "\n",
);
fs.writeFileSync(
  path.join(OUT, "registro-alumnos-reintentos.json"),
  JSON.stringify(retryWorkflow, null, 2) + "\n",
);

console.log("Wrote n8n workflows to", OUT);
