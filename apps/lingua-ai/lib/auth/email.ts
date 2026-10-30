import { getCloudflareContext } from "@opennextjs/cloudflare";

type EmailMessage = {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

export async function isAuthEmailEnabled(): Promise<boolean> {
  const context = await getCloudflareContext({ async: true });
  const env = context.env as unknown as CloudflareEnv;
  return env.AUTH_EMAIL_ENABLED === "true" && Boolean(env.EMAIL);
}

export async function queueAuthEmail(
  message: Omit<EmailMessage, "from">,
): Promise<void> {
  const context = await getCloudflareContext({ async: true });
  const env = context.env as unknown as CloudflareEnv;

  if (env.AUTH_EMAIL_ENABLED !== "true" || !env.EMAIL) {
    throw new Error(
      "El envío de correo de LinguaFly AI todavía no está activado en Cloudflare.",
    );
  }

  const sender = env.AUTH_EMAIL_FROM?.trim();
  if (!sender || !sender.includes("@")) {
    throw new Error("Configura AUTH_EMAIL_FROM con una dirección verificada.");
  }

  const delivery = env.EMAIL.send({
    ...message,
    from: sender,
  }).catch((error: unknown) => {
    // Do not log recipient addresses, reset tokens, or message contents.
    const detail =
      error && typeof error === "object" && "message" in error
        ? String((error as { message: unknown }).message)
        : "Error desconocido";
    console.error("[LinguaFly AI] Cloudflare Email Service no pudo enviar el correo:", detail);
  });

  // Keep the email attempt alive after the request finishes without creating
  // an email-existence timing side channel in Better Auth.
  if (context.ctx) {
    context.ctx.waitUntil(delivery);
  } else {
    // Fallback for Next.js development outside the Workers request context.
    await delivery;
  }
}

export function createAuthEmailContent(input: {
  name: string;
  intro: string;
  actionLabel: string;
  url: string;
}): { text: string; html: string } {
  const name = input.name.trim() || "alumno";
  const safeName = escapeHtml(name);
  const safeIntro = escapeHtml(input.intro);
  const safeLabel = escapeHtml(input.actionLabel);
  const safeUrl = escapeHtml(input.url);

  const text = [
    `Hola ${name},`,
    "",
    input.intro,
    "",
    `${input.actionLabel}: ${input.url}`,
    "",
    "Si no has solicitado esta acción, puedes ignorar este mensaje.",
    "",
    "LinguaFly AI",
  ].join("\n");

  const html = `<!doctype html>
<html lang="es">
  <body style="margin:0;background:#f7f5f0;font-family:Arial,Helvetica,sans-serif;color:#292524">
    <main style="max-width:560px;margin:32px auto;padding:32px;background:#ffffff;border:1px solid #e7e5e4;border-radius:16px">
      <p style="font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#78716c">LinguaFly AI</p>
      <h1 style="font-size:24px;line-height:1.3">Hola ${safeName}</h1>
      <p style="font-size:16px;line-height:1.6">${safeIntro}</p>
      <p style="margin:28px 0">
        <a href="${safeUrl}" style="display:inline-block;padding:12px 18px;border-radius:8px;background:#292524;color:#ffffff;text-decoration:none;font-weight:700">${safeLabel}</a>
      </p>
      <p style="font-size:13px;line-height:1.6;color:#78716c">Si no has solicitado esta acción, puedes ignorar este mensaje.</p>
    </main>
  </body>
</html>`;

  return { text, html };
}
