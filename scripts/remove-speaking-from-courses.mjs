#!/usr/bin/env node
/**
 * Elimina todo el speaking de los cursos activos en src/lib/course/:
 * - Borra archivos *lesson-*-speaking.ts
 * - Actualiza *-lessons-index.ts y comentarios de unit-*.ts
 * - Quita ejercicios speaking de unidades C1 monolíticas
 */
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve('src/lib/course');

function walk(dir, pred) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) out.push(...walk(full, pred));
    else if (pred(full, name)) out.push(full);
  }
  return out;
}

function isSpeakingLessonFile(name) {
  return /lesson-\d+-speaking\.ts$/i.test(name) || /speaking\.ts$/i.test(name);
}

/** Extrae objetos de nivel superior de un array TS literal. */
function splitTopLevelObjects(arrayBody) {
  const items = [];
  let i = 0;
  const n = arrayBody.length;
  while (i < n) {
    while (i < n && /\s|,/.test(arrayBody[i])) i++;
    if (i >= n) break;
    if (arrayBody[i] !== '{') {
      // comentario o basura: saltar hasta siguiente {
      const next = arrayBody.indexOf('{', i);
      if (next === -1) break;
      i = next;
    }
    let depth = 0;
    let inStr = null;
    let escape = false;
    const start = i;
    for (; i < n; i++) {
      const ch = arrayBody[i];
      if (inStr) {
        if (escape) {
          escape = false;
          continue;
        }
        if (ch === '\\') {
          escape = true;
          continue;
        }
        if (ch === inStr) inStr = null;
        continue;
      }
      if (ch === '"' || ch === "'" || ch === '`') {
        inStr = ch;
        continue;
      }
      if (ch === '{') depth++;
      else if (ch === '}') {
        depth--;
        if (depth === 0) {
          i++;
          items.push(arrayBody.slice(start, i));
          break;
        }
      }
    }
    if (depth !== 0) break;
  }
  return items;
}

function isSpeakingExerciseObject(objSrc) {
  if (/id:\s*["']c1-u\d+-s\d+["']/i.test(objSrc)) return true;
  if (/topicName:\s*["']Speaking["']/i.test(objSrc)) return true;
  if (/type:\s*["']speaking(?:-analysis)?["']/i.test(objSrc)) return true;
  if (/type:\s*["']speaking-part[1-4]["']/i.test(objSrc)) return true;
  return false;
}

function stripC1Speaking(filePath) {
  const src = fs.readFileSync(filePath, 'utf8');
  const marker = /export const UNIT_\d+_EXERCISES(?::[^=]*)?=\s*\[/;
  const m = src.match(marker);
  if (!m) return { changed: false, removed: 0 };

  const arrStart = m.index + m[0].length;
  // find matching closing ]; for the array
  let depth = 1;
  let inStr = null;
  let escape = false;
  let i = arrStart;
  for (; i < src.length; i++) {
    const ch = src[i];
    if (inStr) {
      if (escape) {
        escape = false;
        continue;
      }
      if (ch === '\\') {
        escape = true;
        continue;
      }
      if (ch === inStr) inStr = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      inStr = ch;
      continue;
    }
    if (ch === '[') depth++;
    else if (ch === ']') {
      depth--;
      if (depth === 0) break;
    }
  }
  if (depth !== 0) {
    console.warn('Could not parse array in', filePath);
    return { changed: false, removed: 0 };
  }

  const body = src.slice(arrStart, i);
  const items = splitTopLevelObjects(body);
  if (!items.length) return { changed: false, removed: 0 };

  const kept = [];
  let removed = 0;
  for (const item of items) {
    if (isSpeakingExerciseObject(item)) removed++;
    else kept.push(item);
  }
  if (!removed) return { changed: false, removed: 0 };

  const newBody =
    '\n' +
    kept
      .map((it) => it.trim())
      .join(',\n') +
    (kept.length ? ',\n' : '\n');

  let header = src.slice(0, m.index + m[0].length);
  header = header
    .replace(/18 ejercicios por lección × 6 lecciones = 108/g, '18 ejercicios por lección × 5 lecciones = 90')
    .replace(/g1\.\.g18, v1\.\.v18, r1\.\.r18, l1\.\.l18, w1\.\.w18, s1\.\.s18/g, 'g1..g18, v1..v18, r1..r18, l1..l18, w1..w18')
    .replace(/× 6 lecciones/g, '× 5 lecciones')
    .replace(/6 lecciones/g, '5 lecciones');

  const footer = src.slice(i);
  const out = header + newBody + footer;
  fs.writeFileSync(filePath, out);
  return { changed: true, removed };
}

function updateLessonsIndex(filePath) {
  let src = fs.readFileSync(filePath, 'utf8');
  const before = src;

  // Remove speaking import lines
  src = src.replace(
    /^import\s+\{\s*UNIT_\d+_LESSON_\d+_SPEAKING\s*\}\s+from\s+['"]\.\/unit-\d+-lesson-\d+-speaking['"];\s*\n/gm,
    ''
  );

  // Remove speaking property from UNIT_N_LESSONS object
  src = src.replace(/,?\s*\n\s*speaking:\s*UNIT_\d+_LESSON_\d+_SPEAKING,?/g, '');
  // Clean trailing commas before closing brace if needed (already handled by optional commas)

  // Remove from ALL_LESSONS array
  src = src.replace(/,?\s*\n\s*UNIT_\d+_LESSON_\d+_SPEAKING,?/g, '');

  // Comments
  src = src
    .replace(/Índice de las 6 lecciones/g, 'Índice de las 5 lecciones')
    .replace(/las 6 lecciones/g, 'las 5 lecciones')
    .replace(/Gramática, Vocabulario, Lectura, Escucha, Oral, Escrita/g, 'Gramática, Vocabulario, Lectura, Escucha, Escrita')
    .replace(/,\s*Oral,\s*/g, ', ')
    .replace(/90 ejercicios/g, '75 ejercicios')
    .replace(/6 lecciones ×/g, '5 lecciones ×');

  // Fix double commas / empty lines artifacts
  src = src.replace(/,\s*,/g, ',');
  src = src.replace(/\{\s*,/g, '{');
  src = src.replace(/,\s*\}/g, '\n}');
  src = src.replace(/\[\s*,/g, '[');
  src = src.replace(/,\s*\]/g, '\n]');

  if (src !== before) {
    fs.writeFileSync(filePath, src);
    return true;
  }
  return false;
}

function updateUnitComment(filePath) {
  let src = fs.readFileSync(filePath, 'utf8');
  const before = src;
  src = src
    .replace(/Carga las 6 lecciones: Gramática, Vocabulario, Lectura, Escucha, Oral, Escrita\./g, 'Carga las 5 lecciones: Gramática, Vocabulario, Lectura, Escucha, Escrita.')
    .replace(/6 lecciones × 15 ejercicios/g, '5 lecciones × 15 ejercicios')
    .replace(/\(6 lecciones/g, '(5 lecciones')
    .replace(/las 6 lecciones/g, 'las 5 lecciones');
  if (src !== before) {
    fs.writeFileSync(filePath, src);
    return true;
  }
  return false;
}

function main() {
  console.log('ROOT', ROOT);

  // 1) Delete speaking lesson files
  const speakingFiles = walk(ROOT, (_f, name) => isSpeakingLessonFile(name));
  let deleted = 0;
  for (const f of speakingFiles) {
    // Keep non-lesson helpers if any, but all current matches are lessons
    if (!/lesson-\d+-speaking\.ts$/i.test(path.basename(f))) {
      // skip non-lesson speaking utils if present
      if (!/unit-.*speaking/i.test(path.basename(f))) continue;
    }
    fs.unlinkSync(f);
    deleted++;
  }
  console.log('Deleted speaking lesson files:', deleted);

  // 2) Update lessons indexes
  const indexes = walk(ROOT, (_f, name) => /lessons-index\.ts$/i.test(name));
  let idxUpdated = 0;
  for (const f of indexes) {
    if (updateLessonsIndex(f)) idxUpdated++;
  }
  console.log('Updated lessons-index files:', idxUpdated);

  // 3) Update unit.ts comments
  const units = walk(ROOT, (_f, name) => /^unit-\d+\.ts$/i.test(name));
  let unitUpdated = 0;
  for (const f of units) {
    if (updateUnitComment(f)) unitUpdated++;
  }
  console.log('Updated unit comment files:', unitUpdated);

  // 4) Strip C1 speaking exercises
  const c1Dir = path.join(ROOT, 'c1');
  const c1Units = walk(c1Dir, (_f, name) => /^unit-\d+\.ts$/i.test(name));
  let c1Changed = 0;
  let c1Removed = 0;
  for (const f of c1Units) {
    const r = stripC1Speaking(f);
    if (r.changed) {
      c1Changed++;
      c1Removed += r.removed;
      console.log('C1 stripped', path.basename(f), 'removed', r.removed);
    }
  }
  console.log('C1 units changed:', c1Changed, 'exercises removed:', c1Removed);

  // 5) Sanity: remaining speaking lesson files
  const remaining = walk(ROOT, (_f, name) => /lesson-\d+-speaking\.ts$/i.test(name));
  console.log('Remaining speaking lesson files:', remaining.length);
  if (remaining.length) {
    console.log(remaining.slice(0, 20));
    process.exitCode = 1;
  }
}

main();
