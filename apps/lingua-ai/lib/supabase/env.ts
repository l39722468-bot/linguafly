export type PublicSupabaseEnv = {
  url: string;
  anonKey: string;
};

/**
 * Public Supabase settings only. The service role key is intentionally unused.
 */
export function getPublicSupabaseEnv(): PublicSupabaseEnv | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";

  if (!url || !anonKey) return null;
  if (!url.startsWith("https://")) return null;

  return { url, anonKey };
}
