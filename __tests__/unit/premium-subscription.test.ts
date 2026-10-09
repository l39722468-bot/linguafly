/**
 * @jest-environment node
 */
import { articleContentHash } from "@/lib/db/article-hash";
import { articleUpsertBindings } from "@/lib/db/client";
import { hmacSha256Hex } from "@/lib/billing/bytes";
import {
  isPremiumArticle,
  premiumTeaser,
  redactPremiumArticle,
  redactPublicArticleRecord,
} from "@/lib/billing/premium-article";
import { hashPassword, verifyPassword } from "@/lib/billing/password";
import { safeNextPath } from "@/lib/billing/http";
import { signSessionToken, verifySessionToken } from "@/lib/billing/session";
import { verifyStripeSignature } from "@/lib/billing/stripe-signature";
import {
  statusGrantsAccess,
  subscriptionGrantsAccess,
  type StripeSubscription,
} from "@/lib/billing/stripe";

const SECRET = "test-secret-value-0123456789";

describe("premium articles", () => {
  const body = [
    "Primer párrafo visible para todo el mundo.",
    "",
    "Segundo párrafo, todavía dentro del avance.",
    "",
    "Este párrafo es de pago y no debe salir.",
    "",
    "Tampoco este.",
  ].join("\n");

  it("does not let a heading or callout use up the preview", () => {
    const teaser = premiumTeaser(
      [
        "> Aviso corto.",
        "",
        "## Título",
        "",
        "Primer párrafo de verdad.",
        "",
        "Segundo párrafo de verdad.",
        "",
        "Este queda detrás del muro.",
      ].join("\n"),
    );
    expect(teaser).toContain("Primer párrafo de verdad");
    expect(teaser).toContain("Segundo párrafo de verdad");
    expect(teaser).not.toContain("detrás del muro");
  });

  it("keeps only the opening paragraphs", () => {
    const teaser = premiumTeaser(body);
    expect(teaser).toContain("Primer párrafo");
    expect(teaser).toContain("Segundo párrafo");
    expect(teaser).not.toContain("de pago");
    expect(teaser).not.toContain("Tampoco");
  });

  it("stops at an explicit paywall marker", () => {
    const teaser = premiumTeaser("Se ve.\n\n<!-- paywall -->\n\nNo se ve.");
    expect(teaser).toBe("Se ve.");
  });

  it("caps a long opening at 120 words", () => {
    const words = Array.from({ length: 200 }, (_, index) => `palabra${index}`);
    const teaser = premiumTeaser(words.join(" "));
    expect(teaser.split(/\s+/).filter(Boolean)).toHaveLength(120);
    expect(teaser.endsWith("…")).toBe(true);
    expect(teaser).not.toContain("palabra150");
  });

  it("does not change a free article and strips a premium one", () => {
    const free = redactPremiumArticle({
      slug: "gratis",
      category: "metodos",
      premium: false,
      content: body,
      faqs: [{ question: "Q", answer: "A" }],
      downloadPdf: true,
    });
    expect(free.content).toBe(body);
    expect(free.faqs).toHaveLength(1);

    const premium = redactPremiumArticle({
      slug: "de-pago",
      category: "metodos",
      premium: true,
      content: body,
      faqs: [{ question: "Q", answer: "respuesta secreta" }],
      downloadPdf: true,
    });
    expect(premium.content).not.toContain("de pago");
    expect(premium.faqs).toEqual([]);
    expect(premium.downloadPdf).toBe(false);
    expect(isPremiumArticle(premium)).toBe(true);
    expect(isPremiumArticle(free)).toBe(false);
  });

  it("redacts the public JSON record", () => {
    const row = redactPublicArticleRecord({
      slug: "de-pago",
      category: "metodos",
      premium: 1,
      content: body,
      faqs: JSON.stringify([{ question: "Q", answer: "secreto" }]),
    });
    expect(row.content).not.toContain("secreto");
    expect(row.content).not.toContain("de pago");
    expect(row.faqs).toBe("[]");
  });
});

describe("reader session", () => {
  it("round-trips a signed cookie and rejects tampering", async () => {
    const token = await signSessionToken(
      { customerId: "cus_123", email: "ana@example.com" },
      SECRET,
      1_000,
    );
    const session = await verifySessionToken(token, SECRET, 1_000);
    expect(session?.customerId).toBe("cus_123");
    expect(session?.email).toBe("ana@example.com");

    const forged = `${token.slice(0, -1)}${token.endsWith("a") ? "b" : "a"}`;
    expect(await verifySessionToken(forged, SECRET, 1_000)).toBeNull();
    expect(await verifySessionToken(token, SECRET, 1_000 + 60 * 60 * 24 * 31)).toBeNull();
  });
});

describe("stripe webhook signature", () => {
  it("accepts a fresh v1 signature and rejects a stale one", async () => {
    const payload = JSON.stringify({ id: "evt_1", type: "customer.subscription.updated" });
    const timestamp = "1700000000";
    const signature = await hmacSha256Hex(SECRET, `${timestamp}.${payload}`);
    const header = `t=${timestamp},v1=${signature}`;
    expect(await verifyStripeSignature(payload, header, SECRET, 1700000100)).toBe(true);
    expect(await verifyStripeSignature(payload, header, SECRET, 1700000401)).toBe(false);
    expect(await verifyStripeSignature(payload, `t=${timestamp},v1=deadbeef`, SECRET, 1700000100)).toBe(false);
  });
});

describe("subscription access", () => {
  const subscription = (status: string, priceId: string): StripeSubscription => ({
    id: "sub_1",
    status,
    customer: "cus_123",
    current_period_end: 1_800_000_000,
    items: { data: [{ price: { id: priceId } }] },
  });

  it("grants access only for the configured price while it is active", () => {
    const now = 1_700_000_000_000;
    expect(subscriptionGrantsAccess(subscription("active", "price_blog"), "price_blog", now)).toBe(true);
    expect(subscriptionGrantsAccess(subscription("trialing", "price_blog"), "price_blog", now)).toBe(true);
    expect(subscriptionGrantsAccess(subscription("active", "price_other"), "price_blog", now)).toBe(false);
    expect(subscriptionGrantsAccess(subscription("canceled", "price_blog"), "price_blog", now)).toBe(false);
    expect(subscriptionGrantsAccess(subscription("past_due", "price_blog"), "price_blog", now)).toBe(false);
    expect(statusGrantsAccess("active", 1_600_000_000, now)).toBe(false);
  });
});

describe("passwords and redirects", () => {
  it("verifies the hash it just created", async () => {
    const { hash, salt } = await hashPassword("correcta-123");
    expect(await verifyPassword("correcta-123", hash, salt)).toBe(true);
    expect(await verifyPassword("otra", hash, salt)).toBe(false);
  });

  it("only allows same-site paths", () => {
    expect(safeNextPath("/blog/metodos/algo")).toBe("/blog/metodos/algo");
    expect(safeNextPath("https://evil.test")).toBe("/cuenta");
    expect(safeNextPath("//evil.test")).toBe("/cuenta");
  });
});

describe("premium sync hash", () => {
  it("keeps the previous hash until an article is marked premium", () => {
    const base = {
      slug: "uno",
      title: "Uno",
      content: "cuerpo",
      category: "metodos",
    };
    expect(articleContentHash(base)).toBe(articleContentHash({ ...base, premium: false }));
    expect(articleContentHash({ ...base, premium: true })).not.toBe(articleContentHash(base));
    const bindings = articleUpsertBindings({ ...base, premium: true });
    expect(bindings).toHaveLength(20);
    expect(bindings[bindings.length - 1]).toBe(1);
    expect(articleUpsertBindings(base).at(-1)).toBe(0);
  });
});
