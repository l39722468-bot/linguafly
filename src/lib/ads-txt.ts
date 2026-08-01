const MONEYTIZER_ADS_TXT_URL = 'https://ads.themoneytizer.com/ads_txt.php';

export const MONEYTIZER_SITE_ID =
  process.env.MONEYTIZER_SITE_ID || '142310';

export const MONEYTIZER_USER_ID =
  process.env.MONEYTIZER_USER_ID || '132245';

/** Línea AdSense de LinguaFly (equivalente al ads.txt local del script PHP). */
export const ADSENSE_ADS_TXT_LINE =
  'google.com, pub-1198438843650445, DIRECT, f08c47fec0942fa0';

const CACHE_SECONDS = 3600;

function getLocalAdsTxtLines(): string[] {
  const configured = process.env.ADS_TXT_LOCAL_LINES;
  if (configured) {
    return configured.split('\n').map((line) => line.trim()).filter(Boolean);
  }
  return [ADSENSE_ADS_TXT_LINE];
}

function normalizeAdsTxtLine(line: string): string {
  return line.trim().replace(/ /g, '');
}

function formatAdsTxtLine(line: string): string {
  return line.replace(/,/g, ', ');
}

/**
 * Réplica de la fusión del ads_tm.php de The Moneytizer:
 * array_unique(array_merge($moneytizer, $local)) con normalización sin espacios.
 */
export function mergeAdsTxtPhpStyle(
  moneytizerContent: string,
  localContent: string,
): string {
  const localLines = localContent
    .split('\n')
    .map(normalizeAdsTxtLine)
    .filter(Boolean);
  const moneytizerLines = moneytizerContent
    .split('\n')
    .map(normalizeAdsTxtLine)
    .filter(Boolean);

  const seen = new Set<string>();
  const merged: string[] = [];

  for (const line of [...moneytizerLines, ...localLines]) {
    if (seen.has(line)) continue;
    seen.add(line);
    merged.push(formatAdsTxtLine(line));
  }

  return `${merged.join('\n')}\n`;
}

export async function fetchMoneytizerAdsTxt(): Promise<string> {
  const url = `${MONEYTIZER_ADS_TXT_URL}?site_id=${encodeURIComponent(MONEYTIZER_SITE_ID)}&id=${encodeURIComponent(MONEYTIZER_USER_ID)}`;

  const response = await fetch(url, {
    next: { revalidate: CACHE_SECONDS },
    headers: {
      Accept: 'text/plain',
      'User-Agent': 'LinguaFly/ads.txt',
    },
  });

  if (!response.ok) {
    throw new Error(`Moneytizer ads.txt HTTP ${response.status}`);
  }

  const body = await response.text();
  if (!body.trim()) {
    throw new Error('Moneytizer ads.txt vacío');
  }

  return body;
}

export async function getAdsTxtContent(): Promise<string> {
  const localContent = getLocalAdsTxtLines().join('\n');

  try {
    const moneytizerContent = await fetchMoneytizerAdsTxt();
    return mergeAdsTxtPhpStyle(moneytizerContent, localContent);
  } catch {
    return mergeAdsTxtPhpStyle('', localContent);
  }
}

export async function getMoneytizerOnlyAdsTxt(): Promise<string> {
  const content = await fetchMoneytizerAdsTxt();
  return content.endsWith('\n') ? content : `${content}\n`;
}

export function adsTxtResponseHeaders(): HeadersInit {
  return {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': `public, max-age=${CACHE_SECONDS}, s-maxage=${CACHE_SECONDS}`,
  };
}
