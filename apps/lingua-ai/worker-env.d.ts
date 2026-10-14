/// <reference types="@cloudflare/workers-types" />

interface LinguaFlyCloudflareEmailMessage {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

interface LinguaFlyCloudflareEmailBinding {
  send(message: LinguaFlyCloudflareEmailMessage): Promise<{ messageId: string }>;
}

declare global {
  interface CloudflareEnv {
    AUTH_DB: D1Database;
    BETTER_AUTH_SECRET: string;
    BETTER_AUTH_URL: string;
    AUTH_EMAIL_ENABLED: string;
    AUTH_EMAIL_FROM: string;
    EMAIL: LinguaFlyCloudflareEmailBinding;
  }
}

export {};
