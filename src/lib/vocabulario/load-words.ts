import { readFile } from "node:fs/promises";
import path from "node:path";
import type { VocabSectorFile } from "./types";

export async function loadSectorWords(slug: string): Promise<VocabSectorFile | null> {
  try {
    const file = path.join(process.cwd(), "src/data/vocabulario/words", `${slug}.json`);
    const raw = await readFile(file, "utf-8");
    return JSON.parse(raw) as VocabSectorFile;
  } catch {
    return null;
  }
}
