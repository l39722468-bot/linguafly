import { createClient as createSupabaseClient, type SupabaseClient, type User } from '@supabase/supabase-js';
import { createClient as createCookieClient } from '@/lib/supabase/server';
import type { NextRequest } from 'next/server';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nprqtjljoekoirlrjxlh.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wcnF0amxqb2Vrb2lybHJqeGxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2NTMzNzcsImV4cCI6MjA4NDIyOTM3N30.GdTvAPa08RiadT-yxbGHOGPDz1baypAOeDDezqyFJNA';

export type MobileAuthResult = {
  supabase: SupabaseClient;
  user: User | null;
  authMode: 'bearer' | 'cookie';
};

function extractBearerToken(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.toLowerCase().startsWith('bearer ')) return null;
  const token = authHeader.slice(7).trim();
  return token || null;
}

/**
 * Autenticación para apps nativas (Bearer JWT) con fallback a cookies web.
 */
export async function getMobileAuth(request: NextRequest): Promise<MobileAuthResult> {
  const bearer = extractBearerToken(request);

  if (bearer) {
    const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${bearer}` } },
    });
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(bearer);
    if (error) {
      console.warn('[mobile-auth] bearer validation failed', error.message);
    }
    return { supabase, user: user ?? null, authMode: 'bearer' };
  }

  const supabase = await createCookieClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { supabase, user: user ?? null, authMode: 'cookie' };
}

export function mobileJson<T>(data: T, init?: ResponseInit) {
  return Response.json(data, {
    ...init,
    headers: {
      'Cache-Control': 'private, no-store',
      ...(init?.headers ?? {}),
    },
  });
}

export function mobileError(
  message: string,
  status: number,
  code?: string,
  extra?: Record<string, unknown>
) {
  return mobileJson({ error: message, code, ...extra }, { status });
}
