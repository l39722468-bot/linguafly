#!/usr/bin/env node

import ts from "typescript";
import path from "node:path";
import process from "node:process";

const MIGRATION_FILES = [
  "__tests__/unit/workers-ai.test.ts",
  "__tests__/unit/tutor-preferences.test.ts",
  "__tests__/unit/tutor-knowledge.test.ts",
  "__tests__/unit/tutor-response-cache.test.ts",
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
  "src/app/api/tutor-avatar/speech/route.ts",
  "src/components/metodologias/RealtimeAITutor.tsx",
  "src/hooks/use-private-tutor.ts",
  "src/hooks/use-realtime-ai.ts",
  "src/hooks/use-speaking-coach.ts",
  "src/lib/ai/evaluator.ts",
  "src/lib/ai/workers-ai.ts",
  "src/lib/ai/tutor-preferences.ts",
  "src/lib/ai/tutor-knowledge.ts",
  "src/lib/ai/tutor-response-cache.ts",
  "src/hooks/use-avatar-tutor.ts",
  "src/app/tutor-ia/TutorIAClient.tsx",
];
const REPO_ROOT = process.cwd();
const normalized = (value) => path.relative(REPO_ROOT, value).replace(/\\/g, "/");

const configPath = ts.findConfigFile(REPO_ROOT, ts.sys.fileExists, "tsconfig.json");
if (!configPath) {
  console.error("Could not find tsconfig.json.");
  process.exit(2);
}
const configRead = ts.readConfigFile(configPath, ts.sys.readFile);
if (configRead.error) {
  console.error(ts.flattenDiagnosticMessageText(configRead.error.messageText, "\n"));
  process.exit(2);
}
const parsed = ts.parseJsonConfigFileContent(configRead.config, ts.sys, path.dirname(configPath));
if (parsed.errors.length) {
  console.error(ts.formatDiagnosticsWithColorAndContext(parsed.errors, {
    getCurrentDirectory: () => REPO_ROOT,
    getCanonicalFileName: (value) => value,
    getNewLine: () => "\n",
  }));
  process.exit(2);
}

const nextEnvFile = path.join(REPO_ROOT, "next-env.d.ts");
const rootNames = [
  ...(ts.sys.fileExists(nextEnvFile) ? [nextEnvFile] : []),
  ...MIGRATION_FILES.map((file) => path.join(REPO_ROOT, file)),
];
const options = { ...parsed.options, noEmit: true, incremental: false, composite: false };
const program = ts.createProgram({ rootNames, options });
const diagnostics = [...program.getOptionsDiagnostics()];

for (const file of MIGRATION_FILES) {
  const source = program.getSourceFile(path.join(REPO_ROOT, file));
  if (!source) {
    console.error("TypeScript did not load migration file: " + file);
    process.exit(2);
  }
  diagnostics.push(...program.getSyntacticDiagnostics(source));
  diagnostics.push(...program.getSemanticDiagnostics(source));
}

if (diagnostics.length > 0) {
  console.error(ts.formatDiagnosticsWithColorAndContext(diagnostics, {
    getCurrentDirectory: () => REPO_ROOT,
    getCanonicalFileName: (value) => value,
    getNewLine: () => "\n",
  }));
  console.error("Workers AI migration type-check failed: " + diagnostics.length + " diagnostic(s).");
  process.exit(1);
}

console.log("Workers AI migration type-check passed: no TypeScript diagnostics in " + MIGRATION_FILES.length + " migration files.");
