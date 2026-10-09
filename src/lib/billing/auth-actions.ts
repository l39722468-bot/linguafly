import { accountErrorRedirect, endReaderSession, startReaderSession } from "@/lib/billing/session-cookie";
import { hashPassword, verifyPassword } from "@/lib/billing/password";
import { redirectTo, safeNextPath } from "@/lib/billing/http";
import {
  createReaderCustomer,
  listCustomersByEmail,
  StripeApiError,
  StripeConfigError,
  updateCustomerMetadata,
} from "@/lib/billing/stripe";
import { authSecret } from "@/lib/billing/session";

const attempts = new Map<string, { count: number; resetAt: number }>();

function tooManyAttempts(key: string): boolean {
  const now = Date.now();
  const row = attempts.get(key);
  if (!row || row.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return false;
  }
  row.count += 1;
  return row.count > 8;
}

function normalizeEmail(value: FormDataEntryValue | null): string {
  return String(value || "").trim().toLowerCase();
}

function readPassword(value: FormDataEntryValue | null): string {
  return String(value || "");
}

export async function registerPost(request: Request) {
  const form = await request.formData();
  const email = normalizeEmail(form.get("email"));
  const password = readPassword(form.get("password"));
  const nextPath = safeNextPath(String(form.get("next") || "/cuenta"));
  const fail = (code: string) => accountErrorRedirect(request, "/cuenta/registro", code, nextPath);

  if (!authSecret()) return fail("config");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 8 || password.length > 200) {
    return fail("datos");
  }
  if (password !== readPassword(form.get("password_confirm"))) return fail("datos");
  if (tooManyAttempts(`register:${email}`)) return fail("limite");

  try {
    const existing = await listCustomersByEmail(email);
    const readers = existing.filter(
      (customer) => customer.metadata?.app === "linguafly-blog" || customer.metadata?.password_hash,
    );
    if (readers.some((customer) => customer.metadata?.password_hash)) return fail("existe");

    const { hash, salt } = await hashPassword(password);
    const reusable = readers.find((customer) => customer.metadata?.app === "linguafly-blog");
    const customer = reusable
      ? await updateCustomerMetadata(reusable.id, {
          app: "linguafly-blog",
          password_hash: hash,
          password_salt: salt,
          subscription_status: reusable.metadata?.subscription_status || "none",
        })
      : await createReaderCustomer({ email, passwordHash: hash, passwordSalt: salt });

    await startReaderSession({ customerId: customer.id, email });
    return redirectTo(request, nextPath);
  } catch (error) {
    console.error("[auth/register]", error);
    if (error instanceof StripeConfigError || error instanceof StripeApiError) return fail("stripe");
    return fail("stripe");
  }
}

export async function loginPost(request: Request) {
  const form = await request.formData();
  const email = normalizeEmail(form.get("email"));
  const password = readPassword(form.get("password"));
  const nextPath = safeNextPath(String(form.get("next") || "/cuenta"));
  const fail = (code: string) => accountErrorRedirect(request, "/cuenta/entrar", code, nextPath);

  if (!authSecret()) return fail("config");
  if (!email || !password) return fail("credenciales");
  if (tooManyAttempts(`login:${email}`)) return fail("limite");

  try {
    const customers = await listCustomersByEmail(email);
    for (const customer of customers) {
      const hash = customer.metadata?.password_hash;
      const salt = customer.metadata?.password_salt;
      if (!hash || !salt) continue;
      if (await verifyPassword(password, hash, salt)) {
        await startReaderSession({ customerId: customer.id, email: customer.email || email });
        return redirectTo(request, nextPath);
      }
    }
    return fail("credenciales");
  } catch (error) {
    console.error("[auth/login]", error);
    return fail("stripe");
  }
}

export async function logoutPost(request: Request) {
  await endReaderSession();
  return redirectTo(request, "/cuenta/entrar");
}
