const DEFAULT_SITE_URL = "https://www.focus-on-english.com";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

type IndexNowSubmission = {
  urls: string[];
};

type IndexNowPayload = {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
};

function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");
}

function getIndexNowKeyLocation(siteUrl: string): string {
  const customKeyLocation = process.env.INDEXNOW_KEY_LOCATION?.trim();
  if (customKeyLocation) {
    return customKeyLocation;
  }

  return `${siteUrl}/indexnow-key.txt`;
}

export function getIndexNowKey(): string {
  return (process.env.INDEXNOW_KEY || "").trim();
}

export function normalizeIndexNowUrls(rawUrls: string[]): string[] {
  const siteUrl = getSiteUrl();
  const siteOrigin = new URL(siteUrl).origin;

  const normalized = new Set<string>();
  for (const rawUrl of rawUrls) {
    const value = (rawUrl || "").trim();
    if (!value) continue;

    let parsed: URL;
    try {
      parsed = new URL(value, siteUrl);
    } catch {
      continue;
    }

    if (parsed.origin !== siteOrigin) continue;

    parsed.hash = "";
    normalized.add(parsed.toString().replace(/\/+$/, ""));
  }

  return Array.from(normalized);
}

export async function submitUrlsToIndexNow(
  submission: IndexNowSubmission
): Promise<{ ok: boolean; status: number; statusText: string; sent: number }> {
  const siteUrl = getSiteUrl();
  const key = getIndexNowKey();
  if (!key) {
    throw new Error("INDEXNOW_KEY no está configurada");
  }

  const urlList = normalizeIndexNowUrls(submission.urls);
  if (!urlList.length) {
    throw new Error("No hay URLs válidas para enviar a IndexNow");
  }

  const host = new URL(siteUrl).host;
  const payload: IndexNowPayload = {
    host,
    key,
    keyLocation: getIndexNowKeyLocation(siteUrl),
    urlList,
  };

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  return {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    sent: urlList.length,
  };
}
