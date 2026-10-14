/// <reference types="@cloudflare/workers-types" />

interface CloudflareEnv {
  AUTH_DB: D1Database;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
}

export {};
