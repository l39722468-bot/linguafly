jest.mock("@opennextjs/cloudflare", () => ({
  getCloudflareContext: jest.fn(),
}));

import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
  detectPreparedTutorIntent,
  getCachedTutorResponse,
  getPreparedTutorResponse,
  isCacheableTutorQuery,
  normalizeTutorQuery,
  saveCachedTutorResponse,
  type CachedTutorAnswer,
} from "@/lib/ai/tutor-response-cache";

const preparedAnswer: CachedTutorAnswer = {
  reply: "Aquí tienes frases:\nEnglish: I have one book.\nEspañol: Tengo un libro.",
  spokenSpanish: "Aquí tienes frases.",
  pronunciationText: "I have one book.",
  feedback: null,
};

function mockD1(firstResult: unknown = null) {
  const first = jest.fn().mockResolvedValue(firstResult);
  const run = jest.fn().mockResolvedValue({ success: true });
  const bind = jest.fn(() => ({ first, run }));
  const prepare = jest.fn(() => ({ bind }));
  (getCloudflareContext as jest.Mock).mockResolvedValue({ env: { DB: { prepare } } });
  return { first, run, bind, prepare };
}

describe("D1 tutor response bank and cache", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("normalizes Spanish accents and punctuation for stable matching", () => {
    expect(normalizeTutorQuery("Muéstrame FRASES, del cero al 10!"))
      .toBe("muestrame frases del cero al 10");
  });

  it("matches the common Spanish request for examples using numbers zero to ten", () => {
    expect(detectPreparedTutorIntent(
      "Muéstrame frases de ejemplo donde se utilicen estos números del 0 hasta el 10",
    )).toBe("numbers_0_10_examples");
  });

  it("does not turn a contextual follow-up into a canned lesson", () => {
    expect(detectPreparedTutorIntent("Dame más ejemplos como esos")).toBeNull();
  });

  it("returns a prepared bilingual answer directly from D1", async () => {
    const { prepare, bind, first } = mockD1({ response_json: JSON.stringify(preparedAnswer) });

    await expect(getPreparedTutorResponse("numbers_0_10_examples"))
      .resolves.toEqual(preparedAnswer);

    expect(prepare).toHaveBeenCalledWith(expect.stringContaining("FROM tutor_response_cache"));
    expect(bind).toHaveBeenCalledWith("prepared:numbers_0_10_examples");
    expect(first).toHaveBeenCalledTimes(1);
  });

  it("rejects invalid intent keys before querying D1", async () => {
    const { prepare } = mockD1();
    await expect(getPreparedTutorResponse("numbers; DROP TABLE articles"))
      .resolves.toBeNull();
    expect(prepare).not.toHaveBeenCalled();
  });

  it("only caches generic, standalone English-learning requests", () => {
    expect(isCacheableTutorQuery("Give me example sentences for the present simple")).toBe(true);
    expect(isCacheableTutorQuery("Dame ejemplos con el presente simple")).toBe(true);
    expect(isCacheableTutorQuery("Give me examples about my family")).toBe(false);
    expect(isCacheableTutorQuery("Dame más ejemplos como esos")).toBe(false);
  });

  it("stores only the answer payload and uses a hashed cache key", async () => {
    const originalCrypto = Object.getOwnPropertyDescriptor(globalThis, "crypto");
    const originalEncoder = Object.getOwnPropertyDescriptor(globalThis, "TextEncoder");
    const digest = jest.fn().mockResolvedValue(new Uint8Array(32).fill(7).buffer);
    Object.defineProperty(globalThis, "crypto", {
      configurable: true,
      value: { subtle: { digest } },
    });
    Object.defineProperty(globalThis, "TextEncoder", {
      configurable: true,
      value: class {
        encode(value: string) { return new Uint8Array(Array.from(value).map((char) => char.charCodeAt(0))); }
      },
    });
    const { bind, run } = mockD1();

    try {
      await saveCachedTutorResponse(
        "Give me example sentences for the present simple",
        "emma",
        "A1",
        "grammar",
        preparedAnswer,
      );
      expect(digest).toHaveBeenCalledTimes(1);
      expect(bind).toHaveBeenCalledTimes(1);
      const [key, json] = bind.mock.calls[0] as [string, string];
      expect(key).toMatch(/^cached:[0-9a-f]{64}$/);
      expect(key).not.toContain("present simple");
      expect(JSON.parse(json)).toEqual({
        reply: preparedAnswer.reply,
        spokenSpanish: preparedAnswer.spokenSpanish,
        pronunciationText: preparedAnswer.pronunciationText,
      });
      expect(run).toHaveBeenCalledTimes(1);
    } finally {
      if (originalCrypto) Object.defineProperty(globalThis, "crypto", originalCrypto);
      else delete (globalThis as { crypto?: unknown }).crypto;
      if (originalEncoder) Object.defineProperty(globalThis, "TextEncoder", originalEncoder);
      else delete (globalThis as { TextEncoder?: unknown }).TextEncoder;
    }
  });

  it("reuses a generic cached answer for the same normalized request", async () => {
    const originalCrypto = Object.getOwnPropertyDescriptor(globalThis, "crypto");
    const originalEncoder = Object.getOwnPropertyDescriptor(globalThis, "TextEncoder");
    const digest = jest.fn().mockResolvedValue(new Uint8Array(32).fill(3).buffer);
    Object.defineProperty(globalThis, "crypto", {
      configurable: true,
      value: { subtle: { digest } },
    });
    Object.defineProperty(globalThis, "TextEncoder", {
      configurable: true,
      value: class {
        encode(value: string) { return new Uint8Array(Array.from(value).map((char) => char.charCodeAt(0))); }
      },
    });
    mockD1({ response_json: JSON.stringify(preparedAnswer) });

    try {
      await expect(getCachedTutorResponse(
        "Give me example sentences for the present simple!",
        "emma",
        "A1",
        "grammar",
      )).resolves.toEqual(preparedAnswer);
    } finally {
      if (originalCrypto) Object.defineProperty(globalThis, "crypto", originalCrypto);
      else delete (globalThis as { crypto?: unknown }).crypto;
      if (originalEncoder) Object.defineProperty(globalThis, "TextEncoder", originalEncoder);
      else delete (globalThis as { TextEncoder?: unknown }).TextEncoder;
    }
  });
});
