const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:5436';
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const config = {
  apiUrl: API_URL.replace(/\/$/, ''),
  supabaseUrl: SUPABASE_URL,
  supabaseAnonKey: SUPABASE_ANON_KEY,
};

export const DEFAULT_COURSE_ID = 'ingles-a1';
