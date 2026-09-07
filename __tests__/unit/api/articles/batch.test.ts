/**
 * @jest-environment node
 */

// The route module imports `next/server`, which expects the Web Fetch API
// (`Request`, `Response`, `Headers`, `fetch`). jsdom does not provide them,
// so polyfill from Node's undici before importing the route.
import { fetch, Headers, Request, Response } from "undici";

Object.assign(globalThis, { fetch, Headers, Request, Response });

const insertArticlesBatch = jest.fn();
const resolveCloudflareEnv = jest.fn();

jest.mock("@/lib/db/client", () => ({
  DatabaseClient: jest.fn().mockImplementation(() => ({
    insertArticlesBatch: (...args: unknown[]) => insertArticlesBatch(...args),
  })),
  resolveCloudflareEnv: (...args: unknown[]) => resolveCloudflareEnv(...args),
}));

import { POST } from "@/app/api/articles/batch/route";

// The route handler only uses `.headers` and `.json()`, which both
// `NextRequest` and the undici `Request` expose. Cast to the handler's
// parameter type to satisfy TypeScript without pulling in Next's server.
type PostRequest = Parameters<typeof POST>[0];

function createRequest(body: unknown, apiKey?: string): PostRequest {
  const headers = new Headers({ "Content-Type": "application/json" });
  if (apiKey !== undefined) headers.set("x-api-key", apiKey);
  return new Request("https://linguafly.dev/api/articles/batch", {
    method: "POST",
    headers,
    body: typeof body === "string" ? body : JSON.stringify(body),
  }) as unknown as PostRequest;
}

const validArticle = {
  slug: "hola-mundo",
  title: "Hola Mundo",
  content: "contenido",
  category: "viajes",
  tags: ["a1"],
};

describe("POST /api/articles/batch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resolveCloudflareEnv.mockResolvedValue({
      env: { ARTICLES_API_KEY: "test-secret" },
      ctx: { waitUntil: jest.fn() },
    });
    insertArticlesBatch.mockResolvedValue({
      success: true,
      batchNumber: 1,
      count: 1,
      failed: 0,
    });
  });

  it("rejects requests without a valid API key", async () => {
    const res = await POST(
      createRequest({ articles: [validArticle], batchNumber: 1 }, "wrong")
    );
    expect(res.status).toBe(401);
    expect(insertArticlesBatch).not.toHaveBeenCalled();
  });

  it("returns 503 when ARTICLES_API_KEY is not configured", async () => {
    resolveCloudflareEnv.mockResolvedValue({ env: {}, ctx: undefined });
    const res = await POST(
      createRequest({ articles: [validArticle], batchNumber: 1 }, "any")
    );
    expect(res.status).toBe(503);
  });

  it("validates the articles array", async () => {
    const res = await POST(
      createRequest({ articles: [], batchNumber: 1 }, "test-secret")
    );
    expect(res.status).toBe(400);

    const res2 = await POST(
      createRequest({ articles: [{ slug: "x" }], batchNumber: 1 }, "test-secret")
    );
    expect(res2.status).toBe(400);
  });

  it("rejects malformed JSON bodies", async () => {
    const res = await POST(createRequest("{not-json", "test-secret"));
    expect(res.status).toBe(400);
  });

  it("imports a valid batch and returns 201", async () => {
    const res = await POST(
      createRequest({ articles: [validArticle], batchNumber: 3 }, "test-secret")
    );
    expect(res.status).toBe(201);
    expect(insertArticlesBatch).toHaveBeenCalledWith([validArticle], 3);
    await expect(res.json()).resolves.toEqual({
      success: true,
      batchNumber: 1,
      count: 1,
      failed: 0,
    });
  });
});
