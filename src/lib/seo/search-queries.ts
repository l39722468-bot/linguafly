/**
 * Consultas de búsqueda visibles a partir del título y las keywords.
 * Google ignora meta keywords; lo que cuenta es el texto en página y el ancla.
 */

const GENERIC_KEYWORDS = [
  /^ejercicios de ingl[eé]s gratis$/i,
  /^gram[aá]tica inglesa gratis$/i,
  /^ingl[eé]s de negocios gratis$/i,
  /^ingl[eé]s para viajar gratis$/i,
  /^material de ingl[eé]s gratis$/i,
  /^preparar ingl[eé]s gratis$/i,
  /^curso ingl[eé]s gratis online$/i,
  /^curso de ingl[eé]s gratis$/i,
  /^aprender ingl[eé]s gratis$/i,
  /^curso ingl[eé]s (a1|a2|b1|b2|c1) linguafly$/i,
];

export function isGenericSeoKeyword(keyword: string): boolean {
  const value = keyword.trim();
  if (value.length < 3) return true;
  return GENERIC_KEYWORDS.some((pattern) => pattern.test(value));
}

function normalizeKey(value: string): string {
  return value
    .toLowerCase()
    .replace(/[¿?¡!.,;:()]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function pushUnique(target: string[], seen: Set<string>, value: string) {
  const clean = value.replace(/\s+/g, " ").trim();
  if (!clean || isGenericSeoKeyword(clean)) return;
  const key = normalizeKey(clean);
  if (!key || seen.has(key)) return;
  seen.add(key);
  target.push(clean);
}

function comparisonVariants(text: string): string[] {
  const match = text.match(/^(.+?)\s+(vs\.?|versus)\s+(.+?)(?:\s*[:—–|].*)?$/i);
  if (!match) return [];
  const left = match[1].trim();
  const right = match[3].trim();
  if (!left || !right) return [];
  return [
    `${left} vs ${right}`,
    `${left} versus ${right}`,
    `${left} or ${right}`,
    `${left} v ${right}`,
  ];
}

const SKIP_CONJUNCTION_WORDS = new Set([
  "diferencias",
  "diferencia",
  "ejemplos",
  "ejemplo",
  "uso",
  "usos",
  "guia",
  "guía",
  "opiniones",
  "precios",
  "costes",
  "completa",
  "completo",
  "reglas",
  "nivel",
  "explicados",
  "explicado",
]);

function conjunctionVariants(text: string): string[] {
  const orMatch = text.match(/\b([A-Za-z][A-Za-z'-]{1,24})\s+o\s+([A-Za-z][A-Za-z'-]{1,24})\b/i);
  const andMatch = text.match(/\b([A-Za-z][A-Za-z'-]{1,24})\s+y\s+([A-Za-z][A-Za-z'-]{1,24})\b/i);
  const pair = orMatch || andMatch;
  if (!pair) return [];
  const left = pair[1];
  const right = pair[2];
  if (
    SKIP_CONJUNCTION_WORDS.has(left.toLowerCase()) ||
    SKIP_CONJUNCTION_WORDS.has(right.toLowerCase())
  ) {
    return [];
  }
  const variants = [
    `${left} or ${right}`,
    `${left} and ${right}`,
    `${right} and ${left}`,
    `${left} ${right}`,
  ];
  const wantsExercises = /ejercic|exercise/i.test(text);
  if (wantsExercises) {
    variants.push(
      `${left} and ${right} exercises`,
      `${left} ${right} exercises`,
      `${left} and ${right} exercise`,
    );
  }
  return variants;
}

function accentFoldVariants(text: string): string[] {
  if (!/ingl[eé]s/i.test(text)) return [];
  const folded = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return folded === text ? [] : [folded];
}

export function uniqueSearchQueries(
  input: { title?: string; keywords?: string[] },
  limit = 16,
): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  const title = input.title?.trim() || "";

  if (title) {
    seen.add(normalizeKey(title));
    const vsCore = title.match(/^(.+?\s+(?:vs\.?|versus)\s+.+?)(?:\s*[:—–|].*)?$/i);
    if (vsCore?.[1]) seen.add(normalizeKey(vsCore[1]));
  }

  for (const keyword of input.keywords || []) {
    pushUnique(out, seen, String(keyword));
  }

  if (title) {
    for (const variant of comparisonVariants(title)) {
      pushUnique(out, seen, variant);
    }
    for (const variant of conjunctionVariants(title)) {
      pushUnique(out, seen, variant);
    }
  }

  for (const keyword of [...out]) {
    for (const variant of comparisonVariants(keyword)) {
      pushUnique(out, seen, variant);
    }
    for (const variant of accentFoldVariants(keyword)) {
      pushUnique(out, seen, variant);
    }
  }

  return out.slice(0, limit);
}
