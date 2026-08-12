/**
 * Exporta unidades de curso a public/course-data/{level}/unit-{n}.json
 * para servirlas como assets estáticos (fuera del Worker JS, límite 64 MiB).
 *
 * Uso: npx tsx scripts/export-course-data.ts
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.join(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'public', 'course-data');

function writeUnit(level: string, id: number, title: string, exercises: unknown[]) {
  const dir = path.join(OUT, level);
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `unit-${id}.json`);
  fs.writeFileSync(
    file,
    JSON.stringify({
      id,
      title,
      exercises,
    })
  );
}

function writeFinal(level: string, title: string, exercises: unknown[]) {
  const dir = path.join(OUT, level);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, 'test-final.json'),
    JSON.stringify({ title, exercises })
  );
}

async function exportFromIndex(
  level: string,
  loader: () => Promise<{ units: Array<{ id: number; title: string; exercises: unknown[] }> }>
) {
  const course = await loader();
  let n = 0;
  for (const u of course.units) {
    writeUnit(level, u.id, u.title || `Unidad ${u.id}`, Array.isArray(u.exercises) ? u.exercises : []);
    n++;
  }
  console.log(`[export-course-data] ${level}: ${n} units`);
}

async function exportA1Units() {
  let n = 0;
  for (let id = 1; id <= 60; id++) {
    try {
      const mod = await import(`../src/lib/course/a1/unit-${id}.ts`);
      const exercises =
        mod[`UNIT_${id}_EXERCISES`] ||
        mod.default ||
        [];
      const title = mod.UNIT_TITLE || mod.title || `Unidad ${id}`;
      if (!Array.isArray(exercises) || !exercises.length) continue;
      writeUnit('a1', id, String(title), exercises);
      n++;
    } catch {
      // unit missing
    }
  }
  console.log(`[export-course-data] a1: ${n} units`);
}

async function main() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  await exportA1Units();

  await exportFromIndex('a2', async () => {
    const mod = await import('../src/lib/course/a2/index.ts');
    return mod.A2_COURSE_CONTENT;
  });
  await exportFromIndex('b1', async () => {
    const mod = await import('../src/lib/course/b1/index.ts');
    return mod.B1_COURSE;
  });
  await exportFromIndex('b2', async () => {
    const mod = await import('../src/lib/course/b2/index.ts');
    return mod.B2_COURSE;
  });
  await exportFromIndex('c1', async () => {
    const mod = await import('../src/lib/course/c1/index.ts');
    return mod.C1_COURSE;
  });
  await exportFromIndex('c2', async () => {
    const mod = await import('../src/lib/course/c2/index.ts');
    return mod.C2_COURSE;
  });

  // Final tests
  try {
    const a1 = await import('../src/lib/course/a1/final-test-a1.ts');
    writeFinal('a1', a1.FINAL_TEST_A1_TITLE ?? 'Test final A1', a1.FINAL_TEST_A1_EXERCISES ?? []);
  } catch {}
  try {
    const a2 = await import('../src/lib/course/a2/final-test-a2.ts');
    writeFinal('a2', a2.FINAL_TEST_A2_TITLE ?? 'Test final A2', a2.FINAL_TEST_A2_EXERCISES ?? []);
  } catch {}
  try {
    const b1 = await import('../src/lib/course/b1/final-test-b1.ts');
    writeFinal('b1', b1.FINAL_TEST_B1_TITLE ?? 'Test final B1', b1.FINAL_TEST_B1_EXERCISES ?? []);
  } catch {}
  try {
    const b2 = await import('../src/lib/course/b2/final-test-b2.ts');
    writeFinal('b2', b2.FINAL_TEST_B2_TITLE ?? 'Test final B2', b2.FINAL_TEST_B2_EXERCISES ?? []);
  } catch {}

  console.log(`[export-course-data] done → ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
