/**
 * @jest-environment node
 */
import { fetch, Headers, Request, Response } from "undici";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

Object.assign(globalThis, { fetch, Headers, Request, Response });

jest.mock("@/lib/db/client", () => ({
  resolveCloudflareEnv: jest.fn(async () => {
    throw new Error("no cloudflare in tests");
  }),
}));

import { GET, POST, PUT } from "@/app/api/enrollment/route";
import { resetMemoryEnrollmentStore } from "@/lib/enrollment/store";

type PostRequest = Parameters<typeof POST>[0];

function createRequest(
  body: unknown,
  extras?: { method?: string; apiKey?: string },
): PostRequest {
  const headers = new Headers({ "Content-Type": "application/json" });
  if (extras?.apiKey) headers.set("x-api-key", extras.apiKey);
  return new Request("https://linguafly.dev/api/enrollment", {
    method: extras?.method ?? "POST",
    headers,
    body: extras?.method === "PUT" ? undefined : JSON.stringify(body),
  }) as unknown as PostRequest;
}

const validBody = {
  firstName: "Ana",
  lastName: "López",
  email: "ana@linguafly.app",
  courseId: "ingles-a1",
  privacyConsent: true,
};

describe("POST /api/enrollment", () => {
  beforeEach(() => {
    resetMemoryEnrollmentStore();
    delete process.env.N8N_ENROLLMENT_WEBHOOK_URL;
    delete process.env.N8N_ENROLLMENT_HMAC_SECRET;
    delete process.env.ENROLLMENT_DRAIN_API_KEY;
  });

  it("lists enrollable courses", async () => {
    const res = await GET();
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(
      data.courses.some((course: { id: string }) => course.id === "ingles-a1"),
    ).toBe(true);
  });

  it("rejects invalid payloads", async () => {
    const res = await POST(createRequest({ firstName: "Ana", email: "nope" }));
    expect(res.status).toBe(400);
  });

  it("registers a student and is idempotent", async () => {
    const first = await POST(createRequest(validBody));
    expect(first.status).toBe(201);
    const created = await first.json();
    expect(created.success).toBe(true);
    expect(created.alreadyEnrolled).toBe(false);

    const second = await POST(createRequest(validBody));
    expect(second.status).toBe(200);
    const duplicated = await second.json();
    expect(duplicated.alreadyEnrolled).toBe(true);
    expect(duplicated.enrollmentId).toBe(created.enrollmentId);
  });

  it("pretends success for honeypot submissions", async () => {
    const res = await POST(
      createRequest({ ...validBody, website: "http://bots.test" }),
    );
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
  });

  it("requires a drain API key", async () => {
    const res = await PUT(createRequest({}, { method: "PUT", apiKey: "nope" }));
    expect(res.status).toBe(503);
  });
});

describe("n8n workflow export", () => {
  const repoRoot = path.join(__dirname, "..", "..", "..");

  it("is a valid, reliable enrollment graph", () => {
    const result = spawnSync("node", ["n8n/scripts/validate-workflow.mjs"], {
      cwd: repoRoot,
      encoding: "utf8",
    });
    expect(result.stderr).toBe("");
    expect(result.status).toBe(0);
    expect(result.stdout).toContain("n8n workflows OK");
  });

  it("keeps HMAC verification and idempotent SQL in the main workflow", () => {
    const workflow = JSON.parse(
      fs.readFileSync(
        path.join(repoRoot, "n8n/workflows/registro-alumnos.json"),
        "utf8",
      ),
    );
    const code = workflow.nodes
      .filter((node: { type: string }) => node.type === "n8n-nodes-base.code")
      .map((node: { parameters?: { jsCode?: string } }) => node.parameters?.jsCode)
      .join("\n");
    expect(code).toContain("timingSafeEqual");
    expect(code).toContain("ingles-a1");
    expect(workflow.settings.errorWorkflow).toBe("wf_registro_alumnos_errores");
  });
});
