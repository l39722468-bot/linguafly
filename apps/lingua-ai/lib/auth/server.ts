import { getCloudflareContext } from "@opennextjs/cloudflare";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

/**
 * Create auth inside the request context so that D1 is read from the
 * dedicated Worker binding, never from the public site's database.
 */
export async function getAuth() {
  const context = await getCloudflareContext({ async: true });
  const env = context.env as unknown as CloudflareEnv;
  const baseURL = env.BETTER_AUTH_URL?.trim();
  const secret = env.BETTER_AUTH_SECRET?.trim();

  if (!env.AUTH_DB) {
    throw new Error("Falta el binding AUTH_DB de la D1 exclusiva de LinguaFly AI.");
  }
  if (!baseURL || !/^https?:\/\//i.test(baseURL)) {
    throw new Error("Configura BETTER_AUTH_URL con el origen de LinguaFly AI.");
  }
  if (!secret || secret.length < 32) {
    throw new Error("BETTER_AUTH_SECRET debe contener al menos 32 caracteres aleatorios.");
  }

  return betterAuth({
    appName: "LinguaFly AI",
    database: env.AUTH_DB,
    baseURL,
    secret,
    trustedOrigins: [baseURL, "http://localhost:5440"],
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
      requireEmailVerification: false,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      revokeSessionsOnPasswordReset: true
    },
    advanced: {
      useSecureCookies: baseURL.startsWith("https://")
    },
    plugins: [
      // Keep last: persists Better Auth cookies from Next.js Server Actions.
      nextCookies()
    ]
  });
}
