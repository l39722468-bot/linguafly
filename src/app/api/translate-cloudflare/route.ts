import { NextRequest, NextResponse } from 'next/server';
import { CF_LLAMA_3_3_70B_INSTRUCT_FP8_FAST } from '@/lib/ai/cloudflare-workers-ai-models';
import {
  callCloudflareLlama,
  extractLlamaResponseText,
} from '@/lib/ai/cloudflare-workers-llama';

export const maxDuration = 60;

/**
 * Traducción EN→ES con Cloudflare Workers AI (Llama 3.3 instruct).
 *
 * POST JSON:
 * - `text` (string, requerido): texto en inglés.
 * - `granularity`: `"sentence"` (default) | `"words"` — en `words` devuelve un array alineado token a token (mismo recuento que `text.split(/\s+/)`).
 */
export async function POST(req: NextRequest) {
  if (!process.env.CLOUDFLARE_ACCOUNT_ID || !process.env.CLOUDFLARE_API_TOKEN) {
    return NextResponse.json(
      { error: 'CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN must be configured' },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const text = typeof body.text === 'string' ? body.text.trim() : '';
    const granularity = body.granularity === 'words' ? 'words' : 'sentence';

    if (!text) {
      return NextResponse.json({ error: 'text is required' }, { status: 400 });
    }

    if (granularity === 'sentence') {
      const { ok, status, text: raw } = await callCloudflareLlama(
        [
          {
            role: 'system',
            content:
              'You translate English into natural Spanish for language learners. Return ONLY the Spanish translation, no quotes, no notes.',
          },
          {
            role: 'user',
            content: `Translate to Spanish:\n\n${text}`,
          },
        ],
        { max_tokens: Math.min(2048, 200 + text.length * 2) }
      );

      if (!ok) {
        return NextResponse.json(
          { error: 'Cloudflare Workers AI request failed', detail: raw.slice(0, 500) },
          { status: status >= 400 ? status : 502 }
        );
      }

      const out = extractLlamaResponseText(raw).trim();
      return NextResponse.json({
        ok: true,
        granularity: 'sentence',
        translation: out,
        model: CF_LLAMA_3_3_70B_INSTRUCT_FP8_FAST,
      });
    }

    const tokens = text.split(/\s+/).filter(Boolean);
    if (tokens.length === 0) {
      return NextResponse.json({ ok: true, granularity: 'words', words: [], translations: [] });
    }

    const { ok, status, text: raw } = await callCloudflareLlama(
      [
        {
          role: 'system',
          content: `You align English tokens to Spanish glosses for tooltips. The user sends a JSON array of English tokens. You MUST return ONLY a JSON array of exactly ${tokens.length} strings — Spanish equivalent for each token in the same order. Do not merge tokens. If a token is punctuation-only, translate minimally or repeat the symbol. No markdown, no explanation.`,
        },
        {
          role: 'user',
          content: JSON.stringify(tokens),
        },
      ],
      { max_tokens: Math.min(2048, 100 + tokens.length * 12) }
    );

    if (!ok) {
      return NextResponse.json(
        { error: 'Cloudflare Workers AI request failed', detail: raw.slice(0, 500) },
        { status: status >= 400 ? status : 502 }
      );
    }

    const responseText = extractLlamaResponseText(raw);
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    let translations: string[] = [];
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]) as unknown;
        if (Array.isArray(parsed) && parsed.every((x) => typeof x === 'string')) {
          translations = parsed as string[];
        }
      } catch {
        /* fallthrough */
      }
    }

    if (translations.length !== tokens.length) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Model returned wrong array length',
          words: tokens,
          translations,
          expectedLength: tokens.length,
          rawPreview: responseText.slice(0, 400),
        },
        { status: 422 }
      );
    }

    return NextResponse.json({
      ok: true,
      granularity: 'words',
      words: tokens,
      translations,
      model: CF_LLAMA_3_3_70B_INSTRUCT_FP8_FAST,
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
