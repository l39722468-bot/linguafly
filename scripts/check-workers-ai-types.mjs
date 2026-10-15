#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const MIGRATION_FILES = new Set([
  "__tests__/unit/workers-ai.test.ts",
  "src/app/api/ai-lab/chat/route.ts",
  "src/app/api/ai-lab/evaluate/route.ts",
  "src/app/api/ai-lab/stt/route.ts",
  "src/app/api/ai-lab/tts/route.ts",
  "src/app/api/ai-tutor/chat/route.ts",
  "src/app/api/ai-tutor/hint/route.ts",
  "src/app/api/ai-tutor/session/route.ts",
  "src/app/api/ai-tutor/tts/route.ts",
  "src/app/api/course/explain/route.ts",
  "src/app/api/debug/env/route.ts",
  "src/app/api/evaluate-response/route.ts",
  "src/app/api/generate-audio/route.ts",
  "src/app/api/roleplay-chat/route.ts",
  "src/app/api/translate/route.ts",
  "src/app/api/tutor-avatar/greet/route.ts",
  "src/app/api/tutor-avatar/turn/route.ts",
  "src/components/metodologias/RealtimeAITutor.tsx",
  "src/hooks/use-private-tutor.ts",
  "src/hooks/use-realtime-ai.ts",
  "src/hooks/use-speaking-coach.ts",
  "src/lib/ai/evaluator.ts",
  "src/lib/ai/workers-ai.ts",
]);

const tscPath = require.resolve("typescript/bin/tsc");
const result = spawnSync(
  process.execPath,
  [tscPath, "--noEmit", "--pretty", "false"],
  { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
);

if (result.error) {
  console.error("Could not run TypeScript:", result.error.message);
  process.exit(2);
}

const output = [result.stdout || "", result.stderr || ""].join("\n");
const diagnostics = [];
const diagnosticPattern = /^(.+?)\((\d+),(\d+)\): error TS(\d+): (.*)$/gm;
for (const match of output.matchAll(diagnosticPattern)) {
  diagnostics.push({
    file: match[1].replace(/\\/g, "/").replace(/^\.\//, ""),
    line: Number(match[2]),
    column: Number(match[3]),
    code: "TS" + match[4],
    message: match[5],
  });
}

if (result.status !== 0 && diagnostics.length === 0) {
  console.error(output.slice(-12000));
  console.error("TypeScript exited non-zero without parsable diagnostics; refusing to pass the check.");
  process.exit(2);
}

const scopedErrors = diagnostics.filter((diagnostic) => MIGRATION_FILES.has(diagnostic.file));
if (scopedErrors.length > 0) {
  console.error("TypeScript errors were found in the Workers AI migration files:");
  for (const error of scopedErrors) {
    console.error(error.file + "(" + error.line + "," + error.column + "): error " + error.code + ": " + error.message);
  }
  console.error("Migration type-check failed: " + scopedErrors.length + " scoped error(s).");
  process.exit(1);
}

const unrelatedFiles = new Set(diagnostics.map((diagnostic) => diagnostic.file));
console.log("Workers AI migration type-check passed: no diagnostics in migration files.");
if (diagnostics.length > 0) {
  console.warn(
    "The repository-wide TypeScript project currently has " + diagnostics.length + " diagnostic(s) across " +
      unrelatedFiles.size + " file(s) outside this migration. They are not suppressed; " +
      "the standalone project type-check remains a separate repository-wide cleanup task.",
  );
  const examples = [...unrelatedFiles].slice(0, 12);
  console.warn("Existing unrelated-error examples:\n" + examples.map((file) => "- " + file).join("\n"));
} else {
  console.log("No project-wide TypeScript diagnostics.");
}
