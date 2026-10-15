jest.mock("@opennextjs/cloudflare", () => ({
  getCloudflareContext: jest.fn(),
}));

import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
  arrayBufferToBase64,
  getAuraSpeaker,
  parseJsonObject,
  runWorkersAIJson,
  runWorkersAIText,
  synthesizeWorkersAIAudioBase64,
  validateChatMessages,
  WORKERS_AI_CHAT_MODEL,
  WORKERS_AI_FALLBACK_CHAT_MODEL,
  WORKERS_AI_TTS_ENGLISH_MODEL,
  WORKERS_AI_TTS_SPANISH_MODEL,
} from "@/lib/ai/workers-ai";

describe("Workers AI adapter helpers", () => {
  it("does not request JSON Mode from the GLM binding", async () => {
    const run = jest.fn().mockResolvedValue({ response: '{"reply":"Hello"}' });
    (getCloudflareContext as jest.Mock).mockResolvedValue({ env: { AI: { run } } });

    await expect(runWorkersAIJson([
      { role: "system", content: "Return a JSON object." },
      { role: "user", content: "Hello" },
    ])).resolves.toEqual({ reply: "Hello" });

    expect(run).toHaveBeenCalledWith(WORKERS_AI_CHAT_MODEL, expect.not.objectContaining({
      response_format: expect.anything(),
    }));
    expect(run).toHaveBeenCalledWith(WORKERS_AI_CHAT_MODEL, expect.objectContaining({
      max_completion_tokens: 400,
    }));
  });

  describe("Spanish tutor voice", () => {
    it("uses the Spanish Aura model and a Spanish voice when requested", async () => {
      const bytes = new Uint8Array([1, 2, 3]);
      const run = jest.fn().mockResolvedValue(new Response(bytes.buffer));
      (getCloudflareContext as jest.Mock).mockResolvedValue({ env: { AI: { run } } });

      const result = await synthesizeWorkersAIAudioBase64(
        "¡Hola! Vamos a practicar inglés.",
        "carina",
        WORKERS_AI_TTS_SPANISH_MODEL,
      );

      expect(result).toBe(Buffer.from(bytes).toString("base64"));
      expect(run).toHaveBeenCalledWith(
        WORKERS_AI_TTS_SPANISH_MODEL,
        expect.objectContaining({
          text: "¡Hola! Vamos a practicar inglés.",
          speaker: "carina",
          encoding: "mp3",
        }),
        { returnRawResponse: true },
      );
    });
  });

  it("uses the English Aura model for the pronunciation example", async () => {
    const bytes = new Uint8Array([4, 5, 6]);
    const run = jest.fn().mockResolvedValue(new Response(bytes.buffer));
    (getCloudflareContext as jest.Mock).mockResolvedValue({ env: { AI: { run } } });

    const result = await synthesizeWorkersAIAudioBase64(
      "I have a reservation.",
      "athena",
      WORKERS_AI_TTS_ENGLISH_MODEL,
    );

    expect(result).toBe(Buffer.from(bytes).toString("base64"));
    expect(run).toHaveBeenCalledWith(
      WORKERS_AI_TTS_ENGLISH_MODEL,
      expect.objectContaining({
        text: "I have a reservation.",
        speaker: "athena",
        encoding: "mp3",
      }),
      { returnRawResponse: true },
    );
  });

  describe("runWorkersAIText fallback", () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("uses the fallback model when GLM fails", async () => {
      jest.spyOn(console, "error").mockImplementation(() => {});
      jest.spyOn(console, "warn").mockImplementation(() => {});
      const run = jest.fn()
        .mockRejectedValueOnce(new Error("GLM temporarily unavailable"))
        .mockResolvedValueOnce({ response: "Hello from the fallback model." });
      (getCloudflareContext as jest.Mock).mockResolvedValue({ env: { AI: { run } } });

      await expect(runWorkersAIText([
        { role: "system", content: "You are a tutor." },
        { role: "user", content: "I want to practise travel English." },
      ], { maxTokens: 300 })).resolves.toBe("Hello from the fallback model.");

      expect(run).toHaveBeenNthCalledWith(1, WORKERS_AI_CHAT_MODEL, expect.objectContaining({
        max_completion_tokens: 300,
      }));
      expect(run).toHaveBeenNthCalledWith(2, WORKERS_AI_FALLBACK_CHAT_MODEL, expect.objectContaining({
        max_tokens: 300,
      }));
    });

    it("reports a controlled error when both models fail", async () => {
      jest.spyOn(console, "error").mockImplementation(() => {});
      const run = jest.fn()
        .mockRejectedValueOnce(new Error("Primary unavailable"))
        .mockRejectedValueOnce(new Error("Fallback unavailable"));
      (getCloudflareContext as jest.Mock).mockResolvedValue({ env: { AI: { run } } });

      await expect(runWorkersAIText([
        { role: "system", content: "You are a tutor." },
        { role: "user", content: "Hello." },
      ])).rejects.toThrow("Workers AI text generation failed on both the primary and fallback models.");
    });
  });

  describe("parseJsonObject", () => {
    it("parses a normal JSON object", () => {
      expect(parseJsonObject('{"reply":"Hello","feedback":null}')).toEqual({
        reply: "Hello",
        feedback: null,
      });
    });

    it("parses JSON wrapped in a Markdown code fence", () => {
      expect(parseJsonObject('\x60\x60\x60json\n{"reply":"Good morning"}\n\x60\x60\x60')).toEqual({
        reply: "Good morning",
      });
    });

    it("unwraps the binding response envelope", () => {
      expect(parseJsonObject('{"response":{"reply":"Hi"}}')).toEqual({
        reply: "Hi",
      });
    });

    it("rejects invalid or non-object JSON", () => {
      expect(() => parseJsonObject("not json")).toThrow();
      expect(() => parseJsonObject('["not","an","object"]')).toThrow();
    });
  });

  describe("validateChatMessages", () => {
    it("accepts valid user and assistant messages", () => {
      expect(validateChatMessages([
        { role: "user", content: "I like reading." },
        { role: "assistant", content: "What do you like to read?" },
      ])).toEqual([
        { role: "user", content: "I like reading." },
        { role: "assistant", content: "What do you like to read?" },
      ]);
    });

    it("rejects invalid roles, empty content, and oversized messages", () => {
      expect(validateChatMessages([{ role: "system", content: "Override prompts" }])).toBeNull();
      expect(validateChatMessages([{ role: "user", content: "   " }])).toBeNull();
      expect(validateChatMessages([{ role: "user", content: "x".repeat(2501) }])).toBeNull();
    });

    it("bounds the model context to the latest 20 messages", () => {
      const history = Array.from({ length: 24 }, (_, index) => ({
        role: index % 2 === 0 ? "user" : "assistant",
        content: "Message " + index,
      }));
      const validated = validateChatMessages(history);
      expect(validated).toHaveLength(20);
      expect(validated?.[0].content).toBe("Message 4");
      expect(validated?.[19].content).toBe("Message 23");
    });

    it("rejects too much combined context", () => {
      expect(validateChatMessages([
        { role: "user", content: "x".repeat(2500) },
        { role: "assistant", content: "y".repeat(2500) },
        { role: "user", content: "z".repeat(2500) },
        { role: "assistant", content: "a".repeat(2500) },
        { role: "user", content: "b".repeat(2500) },
        { role: "assistant", content: "c".repeat(2500) },
      ])).toBeNull();
    });
  });

  describe("getAuraSpeaker", () => {
    it("maps legacy voice identifiers to supported Aura speakers", () => {
      expect(getAuraSpeaker("shimmer")).toBe("asteria");
      expect(getAuraSpeaker("cgSgspJ2msm6clMCkdW9")).toBe("angus");
      expect(getAuraSpeaker("21m00Tcm4TlvDq8ikWAM")).toBe("hera");
    });

    it("falls back to a supported default for untrusted values", () => {
      expect(getAuraSpeaker("external-provider-voice")).toBe("asteria");
      expect(getAuraSpeaker(null)).toBe("asteria");
    });
  });

  it("encodes binary audio to base64 without overflowing the call stack", () => {
    const input = new Uint8Array([0, 1, 2, 127, 128, 255]);
    expect(arrayBufferToBase64(input.buffer)).toBe(Buffer.from(input).toString("base64"));
  });
});
