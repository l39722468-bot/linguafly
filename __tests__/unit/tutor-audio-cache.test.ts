jest.mock("@opennextjs/cloudflare", () => ({
  getCloudflareContext: jest.fn(),
}));

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getOrCreateTutorAudio } from "@/lib/ai/tutor-audio-cache";

const ORIGINAL_CRYPTO = Object.getOwnPropertyDescriptor(globalThis, "crypto");
const ORIGINAL_TEXT_ENCODER = Object.getOwnPropertyDescriptor(globalThis, "TextEncoder");

function setStableCrypto() {
  const digest = jest.fn().mockResolvedValue(new Uint8Array(32).fill(7).buffer);
  Object.defineProperty(globalThis, "crypto", {
    configurable: true,
    value: { subtle: { digest } },
  });
  Object.defineProperty(globalThis, "TextEncoder", {
    configurable: true,
    value: class {
      encode(value: string) {
        return new Uint8Array(Array.from(value).map((char) => char.charCodeAt(0)));
      }
    },
  });
}

function restoreGlobals() {
  if (ORIGINAL_CRYPTO) Object.defineProperty(globalThis, "crypto", ORIGINAL_CRYPTO);
  else delete (globalThis as { crypto?: unknown }).crypto;
  if (ORIGINAL_TEXT_ENCODER) Object.defineProperty(globalThis, "TextEncoder", ORIGINAL_TEXT_ENCODER);
  else delete (globalThis as { TextEncoder?: unknown }).TextEncoder;
}

function mockD1(audioBase64: unknown = null) {
  const first = jest.fn().mockResolvedValue(
    typeof audioBase64 === "string" ? { audio_base64: audioBase64 } : null,
  );
  const run = jest.fn().mockResolvedValue({ success: true });
  const bind = jest.fn(() => ({ first, run }));
  const prepare = jest.fn(() => ({ bind }));
  (getCloudflareContext as jest.Mock).mockResolvedValue({ env: { DB: { prepare } } });
  return { first, run, bind, prepare };
}

describe("tutor audio cache", () => {
  afterEach(() => {
    jest.clearAllMocks();
    restoreGlobals();
  });

  it("returns previously generated audio from D1 without calling TTS again", async () => {
    setStableCrypto();
    const { first, prepare, bind } = mockD1("SUQz_cached_audio");
    const generate = jest.fn().mockResolvedValue("SUQz_new_audio");

    await expect(getOrCreateTutorAudio("Hello there.", "carina", "spanish-model", generate))
      .resolves.toBe("SUQz_cached_audio");

    expect(generate).not.toHaveBeenCalled();
    expect(prepare).toHaveBeenCalledWith(expect.stringContaining("FROM tutor_audio_cache"));
    expect(bind).toHaveBeenCalledWith(expect.stringMatching(/^audio:[0-9a-f]{64}$/));
    expect(first).toHaveBeenCalledTimes(1);
  });

  it("stores a safe audio segment after generating it once", async () => {
    setStableCrypto();
    const { run, bind } = mockD1(null);
    const generate = jest.fn().mockResolvedValue("SUQz_generated_audio");

    await expect(getOrCreateTutorAudio(
      "Could I have a glass of water, please?",
      "pandora",
      "english-model",
      generate,
    )).resolves.toBe("SUQz_generated_audio");

    expect(generate).toHaveBeenCalledTimes(1);
    expect(run).toHaveBeenCalledTimes(1);
    expect(bind).toHaveBeenLastCalledWith(
      expect.stringMatching(/^audio:[0-9a-f]{64}$/),
      "SUQz_generated_audio",
      "SUQz_generated_audio".length,
    );
  });

  it("does not persist personal information", async () => {
    const { prepare, run } = mockD1(null);
    const generate = jest.fn().mockResolvedValue("SUQz_personal_audio");

    await expect(getOrCreateTutorAudio(
      "My email is alex@example.com",
      "carina",
      "spanish-model",
      generate,
    )).resolves.toBe("SUQz_personal_audio");

    expect(generate).toHaveBeenCalledTimes(1);
    expect(prepare).not.toHaveBeenCalled();
    expect(run).not.toHaveBeenCalled();
  });

  it("shares a single TTS generation between concurrent cache misses in the same worker", async () => {
    setStableCrypto();
    const { run } = mockD1(null);
    const generate = jest.fn().mockResolvedValue("SUQz_one_generation");

    await expect(Promise.all([
      getOrCreateTutorAudio("Nice to meet you.", "pandora", "english-model", generate),
      getOrCreateTutorAudio("Nice to meet you.", "pandora", "english-model", generate),
    ])).resolves.toEqual([
      "SUQz_one_generation",
      "SUQz_one_generation",
    ]);
    expect(generate).toHaveBeenCalledTimes(1);
    expect(run).toHaveBeenCalledTimes(1);
  });;
});
