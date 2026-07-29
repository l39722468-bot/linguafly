import { parseUnitNumber } from "@/lib/access/sequential-unit-access";

export type ParsedLastSeenPath = {
  coursePath: string;
  unitSlug: string;
  unitNumber: number;
};

const LAST_SEEN_PATH_RE = /^(\/curso-(?:a1|a2|b1|b2|c1|c2))\/(unit-\d+)$/i;

/** Parsea rutas como `/curso-b2/unit-15` escritas por admin o progreso. */
export function parseLastSeenPath(
  path: string | null | undefined
): ParsedLastSeenPath | null {
  if (!path) return null;

  const trimmed = path.trim();
  const match = trimmed.match(LAST_SEEN_PATH_RE);
  if (!match) return null;

  const unitNumber = parseUnitNumber(match[2]);
  if (!unitNumber) return null;

  return {
    coursePath: match[1].toLowerCase(),
    unitSlug: `unit-${unitNumber}`,
    unitNumber,
  };
}
