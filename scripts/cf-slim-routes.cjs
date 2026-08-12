#!/usr/bin/env node
/**
 * Prepara un build más ligero para Cloudflare Workers (límite 64 MiB sin comprimir).
 *
 * Durante el build mueve fuera de src/app las rutas que más hinchan el Worker
 * (cursos sectoriales + demos + APIs de evaluación/IA). Se restauran al terminar.
 *
 * Uso:
 *   node scripts/cf-slim-routes.mjs hide
 *   node scripts/cf-slim-routes.mjs restore
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BACKUP = path.join(ROOT, '.cf-slim-backup');

const HEAVY_APP_DIRS = [
  'curso-camarero-a1',
  'curso-camarero-a2',
  'curso-camarero-b1',
  'curso-camarero-b2',
  'curso-logistica-a1',
  'curso-logistica-a2',
  'curso-logistica-b1',
  'curso-logistica-b2',
  'curso-recepcionista-a1',
  'curso-recepcionista-a2',
  'curso-recepcionista-b1',
  'curso-recepcionista-b2',
  'demo-course',
  'practice',
  'juego-ingles',
  'misiones',
  'tutor-ia',
  'tutor-privado',
  'podcasts',
];

const HEAVY_API_DIRS = [
  'ai-lab',
  'ai-tutor',
  'tutor-avatar',
  'evaluate-answer',
  'evaluate-multiple-choice',
  'evaluate-response',
  'evaluate-sentence-building',
  'evaluate-speaking',
  'evaluate-speaking-azure',
  'evaluate-speaking-part1',
  'evaluate-speaking-part2',
  'evaluate-speaking-part3',
  'evaluate-speaking-part4',
  'evaluate-text-answer',
  'evaluate-writing',
  'generate-audio',
  'generate-exercises',
  'pre-generate-exercises',
  'game-content',
  'roleplay-chat',
  'translate',
  'translate-cloudflare',
];

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function moveDir(from, to) {
  if (!fs.existsSync(from)) return false;
  ensureDir(path.dirname(to));
  if (fs.existsSync(to)) fs.rmSync(to, { recursive: true, force: true });
  // cp+rm: rename falla con EXDEV en algunos FS (p. ej. overlays).
  fs.cpSync(from, to, { recursive: true });
  fs.rmSync(from, { recursive: true, force: true });
  return true;
}

function writeStubPage(appRel, href = '/aprender-ingles') {
  const dest = path.join(ROOT, 'src/app', appRel, 'page.tsx');
  ensureDir(path.dirname(dest));
  fs.writeFileSync(
    dest,
    `import { redirect } from 'next/navigation';\nexport default function CfSlimStub() {\n  redirect('${href}');\n}\n`
  );
}

function hide() {
  ensureDir(BACKUP);
  const manifest = [];

  for (const dir of HEAVY_APP_DIRS) {
    const from = path.join(ROOT, 'src/app', dir);
    const to = path.join(BACKUP, 'app', dir);
    if (moveDir(from, to)) {
      manifest.push({ type: 'app', dir });
      // Stubs so old URLs no den 404 de build; redirigen al hub.
      if (dir.startsWith('curso-')) {
        writeStubPage(dir, '/cursos-por-sector');
        writeStubPage(path.join(dir, '[unitId]'), '/cursos-por-sector');
      } else {
        writeStubPage(dir, '/aprender-ingles');
      }
    }
  }

  for (const dir of HEAVY_API_DIRS) {
    const from = path.join(ROOT, 'src/app/api', dir);
    const to = path.join(BACKUP, 'api', dir);
    if (moveDir(from, to)) {
      manifest.push({ type: 'api', dir });
    }
  }

  fs.writeFileSync(path.join(BACKUP, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`[cf-slim] hid ${manifest.length} route trees → ${BACKUP}`);
}

function restore() {
  const manifestPath = path.join(BACKUP, 'manifest.json');
  if (!fs.existsSync(manifestPath)) {
    console.log('[cf-slim] nothing to restore');
    return;
  }
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  for (const entry of manifest) {
    if (entry.type === 'app') {
      const stub = path.join(ROOT, 'src/app', entry.dir);
      if (fs.existsSync(stub)) fs.rmSync(stub, { recursive: true, force: true });
      moveDir(path.join(BACKUP, 'app', entry.dir), path.join(ROOT, 'src/app', entry.dir));
    } else if (entry.type === 'api') {
      moveDir(path.join(BACKUP, 'api', entry.dir), path.join(ROOT, 'src/app/api', entry.dir));
    }
  }

  fs.rmSync(BACKUP, { recursive: true, force: true });
  console.log(`[cf-slim] restored ${manifest.length} route trees`);
}

const cmd = process.argv[2];
if (cmd === 'hide') hide();
else if (cmd === 'restore') restore();
else {
  console.error('Usage: node scripts/cf-slim-routes.mjs <hide|restore>');
  process.exit(1);
}
