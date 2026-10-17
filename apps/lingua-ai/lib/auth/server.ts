import { getCloudflareContext } from "@opennextjs/cloudflare";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { createAuthEmailContent, queueAuthEmail } from "@/lib/auth/email";

/**
 * Create auth inside the request context so D1 and Email Service are read
 * from this app's dedicated Worker bindings, never from the public site.
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
      autoSignIn: false,
      requireEmailVerification: true,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      revokeSessionsOnPasswordReset: true,
      sendResetPassword: async ({ user, url }) => {
        const content = createAuthEmailContent({
          name: user.name,
          intro: "Hemos recibido una solicitud para cambiar la contraseña de tu cuenta.",
          actionLabel: "Elegir una contraseña nueva",
          url,
        });
        await queueAuthEmail({
          to: user.email,
          subject: "Restablece tu contraseña de LinguaFly AI",
          ...content,
        });
      },
    },
    emailVerification: {
      sendOnSignUp: true,
      sendOnSignIn: true,
      autoSignInAfterVerification: true,
      expiresIn: 3600,
      sendVerificationEmail: async ({ user, url }) => {
        const content = createAuthEmailContent({
          name: user.name,
          intro: "Confirma tu dirección de correo para activar tu cuenta de LinguaFly AI.",
          actionLabel: "Confirmar mi correo",
          url,
        });
        await queueAuthEmail({
          to: user.email,
          subject: "Confirma tu correo de LinguaFly AI",
          ...content,
        });
      },
    },
    advanced: {
      useSecureCookies: baseURL.startsWith("https://"),
    },
    plugins: [
      // Keep last: persists Better Auth cookies from Next.js Server Actions.
      nextCookies(),
    ],
  });
}
