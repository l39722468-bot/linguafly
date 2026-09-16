#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const files = [
  "registro-alumnos.json",
  "registro-alumnos-errores.json",
  "registro-alumnos-reintentos.json",
];

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

for (const file of files) {
  const full = path.join(ROOT, "workflows", file);
  if (!fs.existsSync(full)) {
    fail(`Missing ${file}`);
    continue;
  }
  const workflow = JSON.parse(fs.readFileSync(full, "utf8"));
  if (!workflow.name || !Array.isArray(workflow.nodes) || !workflow.connections) {
    fail(`${file} is not a valid n8n workflow export`);
    continue;
  }
  const names = new Set(workflow.nodes.map((node) => node.name));
  for (const [source, outputs] of Object.entries(workflow.connections)) {
    if (!names.has(source)) fail(`${file}: connection from unknown node ${source}`);
    for (const branch of outputs.main || []) {
      for (const edge of branch || []) {
        if (!names.has(edge.node)) {
          fail(`${file}: connection to unknown node ${edge.node}`);
        }
      }
    }
  }
}

const main = JSON.parse(
  fs.readFileSync(path.join(ROOT, "workflows", "registro-alumnos.json"), "utf8"),
);
const requiredNodes = [
  "Webhook registro",
  "Validar firma y datos",
  "Buscar matrícula existente",
  "Upsert alumno",
  "Insertar matrícula",
  "Email de bienvenida",
  "Crear o actualizar HubSpot",
  "Responder OK",
];
const present = new Set(main.nodes.map((node) => node.name));
for (const name of requiredNodes) {
  if (!present.has(name)) fail(`Main workflow missing node: ${name}`);
}

const webhook = main.nodes.find((node) => node.name === "Webhook registro");
if (webhook?.parameters?.path !== "registro-alumnos") {
  fail("Webhook path must be registro-alumnos");
}
if (webhook?.parameters?.responseMode !== "responseNode") {
  fail("Webhook must wait for Respond to Webhook");
}
if (main.settings?.errorWorkflow !== "wf_registro_alumnos_errores") {
  fail("Main workflow must declare the error workflow");
}
const validate = main.nodes.find((node) => node.name === "Validar firma y datos");
if (!String(validate?.parameters?.jsCode || "").includes("timingSafeEqual")) {
  fail("Validation node must verify HMAC with timingSafeEqual");
}
const insert = main.nodes.find((node) => node.name === "Insertar matrícula");
if (!String(insert?.parameters?.query || "").includes("ON CONFLICT")) {
  fail("Enrollment insert must be idempotent (ON CONFLICT)");
}
const hubspot = main.nodes.find((node) => node.name === "Crear o actualizar HubSpot");
if (hubspot?.onError !== "continueRegularOutput") {
  fail("HubSpot failures must not fail the enrollment");
}

if (process.exitCode) {
  console.error("n8n workflow validation failed");
  process.exit(process.exitCode);
}
console.log("n8n workflows OK");
