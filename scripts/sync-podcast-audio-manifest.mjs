#!/usr/bin/env node
/**
 * Regenera src/lib/podcasts/audio-available.ts a partir de los MP3 en disco.
 *
 * Usage:
 *   node scripts/sync-podcast-audio-manifest.mjs
 *   node scripts/sync-podcast-audio-manifest.mjs --check   # sale con código 1 si está desactualizado
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const AUDIO_ROOT = path.join(ROOT, 'public', 'audio', 'podcasts');
const OUT_FILE = path.join(ROOT, 'src', 'lib', 'podcasts', 'audio-available.ts');

const CHECK_ONLY = process.argv.includes('--check');

function collectEpisodeIds() {
  if (!fs.existsSync(AUDIO_ROOT)) {
    return [];
  }

  const ids = [];

  for (const levelDir of fs.readdirSync(AUDIO_ROOT, { withFileTypes: true })) {
    if (!levelDir.isDirectory()) continue;
    const dirPath = path.join(AUDIO_ROOT, levelDir.name);
    for (const file of fs.readdirSync(dirPath)) {
      if (!file.endsWith('.mp3')) continue;
      ids.push(file.slice(0, -4));
    }
  }

  return [...new Set(ids)].sort();
}

function buildManifestSource(ids) {
  const lines = ids.map((id) => `  '${id}',`).join('\n');

  return `/** Auto-generado por scripts/sync-podcast-audio-manifest.mjs — no editar a mano. */
export const PODCAST_EPISODES_WITH_AUDIO = new Set([
${lines}
])

export function isPodcastAudioAvailable(episodeId: string): boolean {
  return PODCAST_EPISODES_WITH_AUDIO.has(episodeId)
}
`;
}

function main() {
  const ids = collectEpisodeIds();

  if (ids.length === 0) {
    console.error(`❌  No se encontraron MP3 en ${path.relative(ROOT, AUDIO_ROOT)}`);
    process.exit(1);
  }

  const next = buildManifestSource(ids);
  const prev = fs.existsSync(OUT_FILE) ? fs.readFileSync(OUT_FILE, 'utf8') : null;

  if (CHECK_ONLY) {
    if (prev === next) {
      console.log(`✅  Manifest al día (${ids.length} episodios)`);
      return;
    }
    console.error(`❌  ${path.relative(ROOT, OUT_FILE)} está desactualizado. Ejecuta: node scripts/sync-podcast-audio-manifest.mjs`);
    process.exit(1);
  }

  if (prev === next) {
    console.log(`⏭️  Sin cambios (${ids.length} episodios)`);
    return;
  }

  fs.writeFileSync(OUT_FILE, next, 'utf8');
  console.log(`✅  Actualizado ${path.relative(ROOT, OUT_FILE)} (${ids.length} episodios)`);
}

main();
