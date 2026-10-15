export const WORKERS_AI_CHAT_MODEL = "@cf/zai-org/glm-4.7-flash";
export const WORKERS_AI_FALLBACK_CHAT_MODEL = "@cf/meta/llama-3.1-8b-instruct-fast";
export const WORKERS_AI_STT_MODEL = "@cf/openai/whisper-large-v3-turbo";
export const WORKERS_AI_TTS_MODEL = "@cf/deepgram/aura-1";
export const WORKERS_AI_TTS_SPANISH_MODEL = "@cf/deepgram/aura-2-es";

export type WorkersAIMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type WorkersAIBinding = {
  run(
    model: string,
    input: Record<string, unknown>,
    options?: { returnRawResponse?: boolean },
  ): Promise<unknown>;
};

type RateLimitBinding = {
  limit(input: { key: string }): Promise<{ success: boolean }>;
};

export async function enforceAIRateLimit(
  request: Request,
  endpoint: string,
): Promise<Response | null> {
  let env: { AI_RATE_LIMITER?: RateLimitBinding };
  try {
    const cloudflare = await import("@opennextjs/cloudflare");
    const context = await cloudflare.getCloudflareContext({ async: true });
    env = context.env as unknown as { AI_RATE_LIMITER?: RateLimitBinding };
  } catch (error) {
    if (process.env.NODE_ENV !== "production") return null;
    console.error("AI rate limiter context unavailable:", error instanceof Error ? error.name : "UnknownError");
    return Response.json({ error: "AI service is temporarily unavailable." }, { status: 503 });
  }

  const limiter = env.AI_RATE_LIMITER;
  if (!limiter) {
    // Fail closed in production so a bad deployment cannot accidentally expose unmetered AI endpoints.
    return process.env.NODE_ENV === "production"
      ? Response.json({ error: "AI rate limiting is not configured." }, { status: 503 })
      : null;
  }

  // CF-Connecting-IP is set by Cloudflare. Avoid trusting X-Forwarded-For in production.
  const cloudflareIp = request.headers.get("cf-connecting-ip")?.trim();
  const clientKey = cloudflareIp || (process.env.NODE_ENV !== "production" ? "local-development" : "");
  if (!clientKey) {
    return Response.json({ error: "Unable to identify this request for rate limiting." }, { status: 403 });
  }

  try {
    const { success } = await limiter.limit({ key: endpoint + ":" + clientKey });
    if (!success) {
      return Response.json(
        { error: "Too many AI requests. Please wait a minute and try again." },
        { status: 429, headers: { "Retry-After": "60", "Cache-Control": "no-store" } },
      );
    }
    return null;
  } catch (error) {
    console.error("AI rate limit check failed:", error instanceof Error ? error.name : "UnknownError");
    return process.env.NODE_ENV === "production"
      ? Response.json({ error: "AI service is temporarily unavailable." }, { status: 503 })
      : null;
  }
}

export async function getWorkersAIBinding(): Promise<WorkersAIBinding> {
  const cloudflare = await import("@opennextjs/cloudflare");
  const context = await cloudflare.getCloudflareContext({ async: true });
  const ai = (context.env as unknown as { AI?: WorkersAIBinding }).AI;

  if (!ai || typeof ai.run !== "function") {
    throw new Error(
      "Workers AI is not configured. Add the AI binding to wrangler.jsonc and deploy the Worker.",
    );
  }

  return ai;
}

function getTextFromResult(result: unknown): string {
  if (typeof result === "string") return result;
  if (!result || typeof result !== "object") return "";

  const value = result as Record<string, unknown>;
  if (typeof value.response === "string") return value.response;
  if (typeof value.generated_text === "string") return value.generated_text;
  if (typeof value.output_text === "string") return value.output_text;

  const choices = value.choices;
  if (Array.isArray(choices) && choices.length > 0) {
    const choice = choices[0] as Record<string, unknown>;
    const message = choice.message as Record<string, unknown> | undefined;
    if (typeof message?.content === "string") return message.content;
    if (typeof choice.text === "string") return choice.text;
  }

  return "";
}

export function parseJsonObject(text: string): Record<string, unknown> {
  const trimmed = text.trim().replace(/^\x60{3}(?:json)?\s*/i, "").replace(/\s*\x60{3}$/i, "");
  const candidates = [trimmed];
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start >= 0 && end > start) candidates.push(trimmed.slice(start, end + 1));

  for (const candidate of candidates) {
    try {
      const parsed: unknown = JSON.parse(candidate);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        const object = parsed as Record<string, unknown>;
        if (
          object.response &&
          typeof object.response === "object" &&
          !Array.isArray(object.response)
        ) {
          return object.response as Record<string, unknown>;
        }
        return object;
      }
    } catch {
      // Try the next bounded candidate.
    }
  }

  throw new Error("Workers AI returned an invalid structured response.");
}

export async function runWorkersAIJson(
  messages: WorkersAIMessage[],
  options: { temperature?: number; maxTokens?: number } = {},
): Promise<Record<string, unknown>> {
  const ai = await getWorkersAIBinding();
  const result = await ai.run(WORKERS_AI_CHAT_MODEL, {
    messages,
    temperature: options.temperature ?? 0.6,
    max_completion_tokens: options.maxTokens ?? 400,
  });

  // Some Workers AI models use a native { response: {...} } envelope.
  if (result && typeof result === "object") {
    const outer = result as Record<string, unknown>;
    if (outer.response && typeof outer.response === "object" && !Array.isArray(outer.response)) {
      return outer.response as Record<string, unknown>;
    }
  }

  return parseJsonObject(getTextFromResult(result));
}

export async function runWorkersAIText(
  messages: WorkersAIMessage[],
  options: { temperature?: number; maxTokens?: number } = {},
): Promise<string> {
  const ai = await getWorkersAIBinding();
  const temperature = options.temperature ?? 0.6;
  const maxTokens = options.maxTokens ?? 400;

  try {
    const result = await ai.run(WORKERS_AI_CHAT_MODEL, {
      messages,
      temperature,
      max_completion_tokens: maxTokens,
    });
    const text = getTextFromResult(result).trim();
    if (!text) throw new Error("Primary Workers AI model returned an empty response.");
    return text;
  } catch (primaryError: unknown) {
    console.error(
      "Primary Workers AI text generation failed; trying fallback model:",
      primaryError instanceof Error
        ? `${primaryError.name}: ${primaryError.message.slice(0, 180)}`
        : "UnknownError",
    );
  }

  // The lightweight fallback keeps the speaking tutor usable when GLM is
  // temporarily unavailable or returns no text. It uses the model-specific
  // max_tokens parameter documented by Workers AI for this model.
  try {
    const result = await ai.run(WORKERS_AI_FALLBACK_CHAT_MODEL, {
      messages,
      temperature,
      max_tokens: maxTokens,
    });
    const text = getTextFromResult(result).trim();
    if (!text) throw new Error("Fallback Workers AI model returned an empty response.");
    console.warn("Tutor text response generated with the fallback Workers AI model.");
    return text;
  } catch (fallbackError: unknown) {
    console.error(
      "Fallback Workers AI text generation failed:",
      fallbackError instanceof Error
        ? `${fallbackError.name}: ${fallbackError.message.slice(0, 180)}`
        : "UnknownError",
    );
    throw new Error("Workers AI text generation failed on both the primary and fallback models.");
  }
}

export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = "";

  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    const chunk = bytes.subarray(offset, Math.min(offset + chunkSize, bytes.length));
    binary += String.fromCharCode(...chunk);
  }

  return btoa(binary);
}

/**
 * Generate MP3 audio using the Worker AI binding and return base64 for the
 * legacy avatar-tutor response contract. No account token is needed at runtime.
 */
export async function synthesizeWorkersAIAudioBase64(
  text: string,
  speaker: string,
  model: string = WORKERS_AI_TTS_MODEL,
): Promise<string> {
  const ai = await getWorkersAIBinding();
  const result = await ai.run(
    model,
    { text, speaker, encoding: "mp3" },
    { returnRawResponse: true },
  );

  let audioBase64 = "";
  if (result instanceof Response) {
    if (!result.ok) {
      console.error("Workers AI TTS returned status:", result.status);
      throw new Error(`Workers AI TTS request failed with status ${result.status}.`);
    }
    audioBase64 = arrayBufferToBase64(await result.arrayBuffer());
  } else if (
    result &&
    typeof result === "object" &&
    typeof (result as { getReader?: unknown }).getReader === "function"
  ) {
    // Use duck typing because a stream may come from a different JS realm.
    audioBase64 = arrayBufferToBase64(
      await new Response(result as ReadableStream<Uint8Array>).arrayBuffer(),
    );
  } else if (result instanceof ArrayBuffer) {
    audioBase64 = arrayBufferToBase64(result);
  } else if (ArrayBuffer.isView(result)) {
    const view = result as ArrayBufferView;
    const bytes = new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
    audioBase64 = arrayBufferToBase64(bytes.slice().buffer);
  } else if (result instanceof Blob) {
    audioBase64 = arrayBufferToBase64(await result.arrayBuffer());
  }

  if (!audioBase64) {
    throw new Error("Workers AI TTS returned empty or unsupported audio.");
  }
  return audioBase64;
}

export function getAuraSpeaker(voiceId: unknown): string {
  const byLegacyId: Record<string, string> = {
    EXAVitQu4vr4xnSDxMaL: "asteria",
    cgSgspJ2msm6clMCkdW9: "angus",
    "21m00Tcm4TlvDq8ikWAM": "hera",
    ErXwobaYiN019PkySvjV: "orion",
    shimmer: "asteria",
    ash: "orion",
    alloy: "angus",
    echo: "orion",
    fable: "hera",
    onyx: "angus",
    nova: "asteria",
    "": "asteria",
  };
  const allowed = new Set([
    "angus", "asteria", "arcas", "orion", "orpheus", "athena", "luna",
    "zeus", "perseus", "helios", "hera", "stella",
  ]);
  if (typeof voiceId !== "string") return "asteria";
  if (allowed.has(voiceId)) return voiceId;
  return byLegacyId[voiceId] ?? "asteria";
}

export function validateChatMessages(input: unknown): WorkersAIMessage[] | null {
  if (!Array.isArray(input) || input.length === 0 || input.length > 100) return null;

  // Clients may retain the full transcript locally; only send a bounded recent window to the model.
  const recentInput = input.slice(-20);
  const messages: WorkersAIMessage[] = [];
  let totalCharacters = 0;

  for (const item of recentInput) {
    if (!item || typeof item !== "object") return null;
    const message = item as Record<string, unknown>;
    if (message.role !== "user" && message.role !== "assistant") return null;
    if (typeof message.content !== "string") return null;
    const content = message.content.trim();
    if (!content || content.length > 2500) return null;
    totalCharacters += content.length;
    if (totalCharacters > 14000) return null;
    messages.push({ role: message.role, content });
  }

  if (!messages.some((message) => message.role === "user")) return null;
  return messages;
}
function extractStreamDelta(eventText: string): string {
  const dataLines = eventText
    .split(/\r?\n/)
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.slice(5).trim());

  if (dataLines.length === 0) return "";
  const pieces: string[] = [];

  for (const data of dataLines) {
    if (!data || data === "[DONE]") continue;
    try {
      const event: unknown = JSON.parse(data);
      if (!event || typeof event !== "object") continue;
      const value = event as Record<string, unknown>;
      const choices = value.choices;
      if (Array.isArray(choices) && choices.length > 0) {
        const choice = choices[0] as Record<string, unknown>;
        const delta = choice.delta as Record<string, unknown> | undefined;
        const message = choice.message as Record<string, unknown> | undefined;
        if (typeof delta?.content === "string") pieces.push(delta.content);
        else if (typeof message?.content === "string") pieces.push(message.content);
        else if (typeof choice.text === "string") pieces.push(choice.text);
      } else if (typeof value.response === "string") {
        pieces.push(value.response);
      } else if (typeof value.generated_text === "string") {
        pieces.push(value.generated_text);
      }
    } catch {
      // A non-JSON data frame may be a plain-text event.
      pieces.push(data);
    }
  }

  return pieces.join("");
}

export async function streamWorkersAIText(
  messages: WorkersAIMessage[],
  options: { temperature?: number; maxTokens?: number } = {},
): Promise<ReadableStream<Uint8Array>> {
  const ai = await getWorkersAIBinding();
  const result = await ai.run(WORKERS_AI_CHAT_MODEL, {
    messages,
    temperature: options.temperature ?? 0.6,
    max_completion_tokens: options.maxTokens ?? 500,
    stream: true,
  });

  const source = result instanceof Response
    ? result.body
    : result as ReadableStream<Uint8Array> | null;
  if (!source || typeof source.getReader !== "function") {
    const text = getTextFromResult(result);
    return new ReadableStream<Uint8Array>({
      start(controller) {
        if (text) controller.enqueue(new TextEncoder().encode(text));
        controller.close();
      },
    });
  }

  const reader = source.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const blocks = buffer.split(/\r?\n\r?\n/);
          buffer = blocks.pop() ?? "";
          for (const block of blocks) {
            const delta = extractStreamDelta(block);
            if (delta) controller.enqueue(encoder.encode(delta));
          }
        }
        buffer += decoder.decode();
        if (buffer.trim()) {
          const delta = extractStreamDelta(buffer);
          if (delta) controller.enqueue(encoder.encode(delta));
        }
        controller.close();
      } catch (error) {
        controller.error(error);
      } finally {
        reader.releaseLock();
      }
    },
    cancel() {
      return reader.cancel();
    },
  });
}
