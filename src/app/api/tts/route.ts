import { NextRequest, NextResponse } from 'next/server';
import { CF_DEEPGRAM_AURA_1, CF_DEEPGRAM_AURA_2_EN } from '@/lib/ai/cloudflare-workers-ai-models';

/** Vercel / hosting: tiempo máximo para generar audio (segundos). */
export const maxDuration = 60;

const MAX_TTS_CHARS = 8000;
const CF_TIMEOUT_MS = 55_000;
const MAX_ATTEMPTS = 3;

function stripMarkup(text: string): string {
  return text
    .replace(/\[\[([^\]|]+)\|[^\]]+\]\]/g, '$1')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    .trim();
}

function normalizeTtsText(raw: unknown): { ok: true; text: string } | { ok: false; error: string } {
  if (raw === null || raw === undefined) {
    return { ok: false, error: 'Text is required' };
  }
  let s = typeof raw === 'string' ? raw : String(raw);
  s = stripMarkup(s);
  s = s.replace(/\s+/g, ' ').trim();
  if (!s) {
    return { ok: false, error: 'Text is empty after normalization' };
  }
  if (s.length > MAX_TTS_CHARS) {
    s = `${s.slice(0, MAX_TTS_CHARS).replace(/\s+\S*$/, '')}…`;
  }
  return { ok: true, text: s };
}

function isLikelyMp3(buffer: ArrayBuffer): boolean {
  if (buffer.byteLength < 32) return false;
  const u8 = new Uint8Array(buffer);
  if (u8[0] === 0xff && (u8[1] & 0xe0) === 0xe0) return true;
  if (u8[0] === 0x49 && u8[1] === 0x44 && u8[2] === 0x33) return true;
  return false;
}

/** Decodifica base64 → ArrayBuffer (Edge-compatible). */
function base64ToArrayBuffer(b64: string): ArrayBuffer {
  const clean = b64.replace(/\s/g, '');
  const binary = atob(clean);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

/**
 * La API REST Workers AI (Deepgram Aura-1) devuelve JSON `{ result: { audio: "<base64>" } }`.
 * Un worker con `returnRawResponse: true` puede devolver MP3 en bruto.
 */
function decodeTtsResponseBody(buf: ArrayBuffer): { ok: true; mp3: ArrayBuffer } | { ok: false; reason: string } {
  if (isLikelyMp3(buf)) {
    return { ok: true, mp3: buf };
  }

  const txt = new TextDecoder().decode(buf);
  try {
    const data = JSON.parse(txt) as {
      success?: boolean;
      errors?: unknown[];
      messages?: unknown[];
      result?: { audio?: string } | string;
    };

    if (data.success === false) {
      const errMsg = JSON.stringify(data.errors ?? data.messages ?? 'unknown');
      return { ok: false, reason: `Cloudflare success=false: ${errMsg.slice(0, 400)}` };
    }

    const r = data.result;
    let b64: string | undefined;
    if (typeof r === 'string' && r.length > 0) {
      b64 = r;
    } else if (r && typeof r === 'object' && typeof r.audio === 'string') {
      b64 = r.audio;
    }

    if (!b64) {
      return { ok: false, reason: `JSON sin result.audio (preview): ${txt.slice(0, 200)}` };
    }

    const mp3 = base64ToArrayBuffer(b64);
    if (!isLikelyMp3(mp3)) {
      return { ok: false, reason: 'Base64 decodificado no es MP3 válido' };
    }
    return { ok: true, mp3 };
  } catch {
    return { ok: false, reason: `No es MP3 ni JSON válido: ${txt.slice(0, 200)}` };
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

const FEMALE_NAMES = new Set([
  'sara', 'maria', 'ana', 'lucia', 'elena', 'sofia', 'laura', 'marta', 'paula', 'isabel',
  'carmen', 'pilar', 'nuria', 'patricia', 'beatriz', 'raquel', 'natalia', 'silvia', 'irene', 'eva',
  'rosa', 'claudia', 'diana', 'susana', 'yolanda', 'monica', 'alicia', 'miriam', 'cristina', 'vera',
  'emma', 'olivia', 'ava', 'isabella', 'sophia', 'mia', 'charlotte', 'amelia', 'harper', 'evelyn',
  'abigail', 'emily', 'elizabeth', 'ella', 'avery', 'camila', 'aria', 'scarlett', 'victoria',
  'madison', 'luna', 'grace', 'chloe', 'penelope', 'layla', 'riley', 'zoey', 'nora', 'lily',
  'eleanor', 'hannah', 'lillian', 'addison', 'aubrey', 'ellie', 'stella', 'natalie', 'zoe',
  'leah', 'hazel', 'violet', 'aurora', 'savannah', 'audrey', 'brooklyn', 'bella', 'claire',
  'skylar', 'lucy', 'anna', 'caroline', 'maya', 'willow', 'naomi', 'ariana', 'valentina',
  'gabriella', 'alice', 'andrea', 'sarah', 'jessica', 'ashley', 'amanda', 'stephanie', 'melissa',
  'jennifer', 'lisa', 'rachel', 'nancy', 'helen', 'margaret', 'sandra', 'linda', 'barbara',
  'judith', 'jane', 'amy', 'angela', 'brenda', 'kathleen', 'pamela', 'martha', 'gloria',
  'tina', 'dana', 'wendy', 'holly', 'teresa', 'shirley', 'kate', 'katie', 'kim', 'kelly',
  'karen', 'donna', 'carol', 'ruth', 'sharon', 'susan', 'mary', 'betty', 'dorothy', 'deborah',
]);

const MALE_NAMES = new Set([
  'carlos', 'juan', 'miguel', 'antonio', 'jose', 'david', 'pablo', 'pedro', 'alejandro',
  'francisco', 'manuel', 'jesus', 'ivan', 'rafael', 'sergio', 'mario', 'jorge', 'alberto',
  'roberto', 'rodrigo', 'javier', 'angel', 'fernando', 'oscar', 'ruben', 'marcos', 'victor',
  'raul', 'andres', 'diego', 'guillermo', 'santiago', 'martin', 'emilio', 'arturo', 'alfredo',
  'armando', 'ernesto', 'gerardo', 'gustavo', 'hector', 'jaime', 'joaquin', 'julio', 'luis',
  'ignacio', 'matias', 'nicolas', 'tomas', 'alonso', 'gonzalo', 'hugo', 'luca', 'marco',
  'james', 'john', 'robert', 'michael', 'william', 'richard', 'joseph', 'thomas', 'charles',
  'christopher', 'daniel', 'matthew', 'anthony', 'mark', 'donald', 'steven', 'paul', 'andrew',
  'joshua', 'kenneth', 'kevin', 'brian', 'george', 'timothy', 'ronald', 'edward', 'jason',
  'jeffrey', 'ryan', 'jacob', 'gary', 'nicholas', 'eric', 'jonathan', 'stephen', 'larry',
  'justin', 'scott', 'brandon', 'benjamin', 'samuel', 'raymond', 'gregory', 'frank', 'alexander',
  'patrick', 'jack', 'dennis', 'jerry', 'tyler', 'aaron', 'adam', 'nathan', 'henry', 'zachary',
  'douglas', 'peter', 'kyle', 'noah', 'ethan', 'jeremy', 'christian', 'walter', 'keith',
  'austin', 'roger', 'terry', 'sean', 'gerald', 'carl', 'harold', 'dylan', 'arthur', 'jordan',
  'jesse', 'joe', 'bryan', 'billy', 'bruce', 'gabriel', 'logan', 'albert', 'alan', 'wayne',
  'elijah', 'randy', 'roy', 'vincent', 'ralph', 'eugene', 'russell', 'bobby', 'mason', 'philip',
  'louis', 'lucas', 'liam', 'oliver', 'aiden', 'sebastian', 'mateo', 'jackson', 'owen', 'leo',
  'julian', 'isaac', 'asher', 'carter', 'wyatt', 'josiah', 'lincoln', 'miles', 'eli', 'nolan',
  'jaxon', 'ezra', 'micah', 'roman', 'damian', 'colton', 'silas', 'theo', 'felix', 'tucker',
  'cooper', 'kai', 'alex', 'tom', 'jake', 'ben', 'sam', 'max', 'chris', 'nick', 'matt',
  'mike', 'jim', 'dan', 'rob', 'jon', 'will', 'steve', 'charlie', 'rick', 'dave', 'bob', 'luke',
  'brad', 'derek', 'greg', 'omar', 'ravi', 'raj', 'arjun', 'wei', 'ming', 'jun', 'zhang',
]);

function detectGender(text: string): 'male' | 'female' {
  const lower = text.toLowerCase();
  const nameMatch = lower.match(/(?:my name is|i'm|i am|soy|me llamo|llamo)\s+([a-záéíóúñ]+)/);
  if (nameMatch) {
    const name = nameMatch[1];
    if (FEMALE_NAMES.has(name)) return 'female';
    if (MALE_NAMES.has(name)) return 'male';
  }
  const words = lower.match(/\b[a-záéíóúñ]+\b/g) || [];
  for (const word of words) {
    if (FEMALE_NAMES.has(word)) return 'female';
    if (MALE_NAMES.has(word)) return 'male';
  }
  return 'male';
}

async function callCloudflareTts(
  accountId: string,
  apiToken: string,
  cleanText: string,
  speaker: string,
  model: string = CF_DEEPGRAM_AURA_1
): Promise<Response> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), CF_TIMEOUT_MS);
  try {
    return await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: cleanText, speaker, encoding: 'mp3' }),
        signal: controller.signal,
      }
    );
  } finally {
    clearTimeout(t);
  }
}

/** Worker propio (ej. `returnRawResponse: true`) o proxy TTS. */
async function callCustomTtsWorker(
  url: string,
  cleanText: string,
  speaker: string,
  bearerSecret?: string
): Promise<Response> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), CF_TIMEOUT_MS);
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (bearerSecret) {
    headers.Authorization = `Bearer ${bearerSecret}`;
  }
  try {
    return await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ text: cleanText, speaker }),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(t);
  }
}

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const rawBody = body as { text?: unknown; speaker?: unknown };
    const textField = rawBody?.text;
    const normalized = normalizeTtsText(textField);
    if (!normalized.ok) {
      return NextResponse.json({ error: normalized.error }, { status: 400 });
    }

    /** Para podcasts / batch: voces explícitas (`orion` | `luna`). Si no viene, se infiere del texto. */
    const speakerRaw = rawBody?.speaker;
    const explicitSpeaker =
      typeof speakerRaw === 'string' && (speakerRaw === 'orion' || speakerRaw === 'luna')
        ? speakerRaw
        : null;

    const workerUrl = process.env.CLOUDFLARE_TTS_WORKER_URL?.trim();
    const workerSecret = process.env.CLOUDFLARE_TTS_WORKER_SECRET;
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;

    const useRestApi = Boolean(accountId && apiToken);
    if (!workerUrl && !useRestApi) {
      console.error(
        'TTS: define CLOUDFLARE_TTS_WORKER_URL o bien CLOUDFLARE_ACCOUNT_ID + CLOUDFLARE_API_TOKEN'
      );
      return NextResponse.json(
        {
          error: 'TTS not configured',
          hint: 'CLOUDFLARE_TTS_WORKER_URL or CLOUDFLARE_ACCOUNT_ID + CLOUDFLARE_API_TOKEN',
        },
        { status: 500 }
      );
    }

    const cleanText = normalized.text;
    const speaker =
      explicitSpeaker ?? (detectGender(cleanText) === 'female' ? 'luna' : 'orion');
    const ttsModel = explicitSpeaker ? CF_DEEPGRAM_AURA_2_EN : CF_DEEPGRAM_AURA_1;

    let lastStatus = 0;
    let lastBody = '';

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      if (attempt > 0) {
        await sleep(250 * 2 ** (attempt - 1));
      }

      let response: Response;
      try {
        response = workerUrl
          ? await callCustomTtsWorker(workerUrl, cleanText, speaker, workerSecret)
          : await callCloudflareTts(accountId!, apiToken!, cleanText, speaker, ttsModel);
      } catch (e: unknown) {
        const name = e instanceof Error ? e.name : '';
        const msg = e instanceof Error ? e.message : String(e);
        console.error(`TTS fetch attempt ${attempt + 1}/${MAX_ATTEMPTS}:`, name, msg);
        if (attempt === MAX_ATTEMPTS - 1) {
          return NextResponse.json(
            { error: 'TTS request failed or timed out', detail: name === 'AbortError' ? 'timeout' : msg },
            { status: 504 }
          );
        }
        continue;
      }

      lastStatus = response.status;

      if (response.ok) {
        const rawBuf = await response.arrayBuffer();
        const decoded = decodeTtsResponseBody(rawBuf);
        if (!decoded.ok) {
          console.error('TTS: no se pudo obtener MP3:', decoded.reason);
          return NextResponse.json(
            { error: 'TTS returned invalid audio payload', detail: decoded.reason },
            { status: 502 }
          );
        }
        return new NextResponse(decoded.mp3, {
          headers: {
            'Content-Type': 'audio/mpeg',
            'Cache-Control': 'public, max-age=3600',
          },
        });
      }

      lastBody = await response.text();
      console.error(`Cloudflare TTS HTTP ${response.status} (attempt ${attempt + 1}):`, lastBody.slice(0, 800));

      const retriable = response.status === 429 || (response.status >= 502 && response.status <= 504);
      if (!retriable || attempt === MAX_ATTEMPTS - 1) {
        return NextResponse.json(
          {
            error: 'TTS generation failed',
            status: response.status,
            detail: lastBody.slice(0, 500),
          },
          { status: response.status >= 400 && response.status < 600 ? response.status : 502 }
        );
      }
    }

    return NextResponse.json(
      { error: 'TTS generation failed', status: lastStatus, detail: lastBody.slice(0, 500) },
      { status: 502 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'TTS error';
    console.error('TTS error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
