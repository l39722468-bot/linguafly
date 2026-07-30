import { createClient as supabaseCreateClient } from '@supabase/supabase-js';
import { supabase as browserSupabase } from '../supabase-client';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nprqtjljoekoirlrjxlh.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wcnF0amxqb2Vrb2lybHJqeGxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2NTMzNzcsImV4cCI6MjA4NDIyOTM3N30.GdTvAPa08RiadT-yxbGHOGPDz1baypAOeDDezqyFJNA';

// Un solo cliente en navegador (evita múltiples instancias GoTrueClient).
export const supabase =
  typeof window !== 'undefined' ? browserSupabase : supabaseUrl && supabaseAnonKey ? browserSupabase : null;

export function getSupabaseClient() {
  return supabase;
}

export const createClientComponentClient = () => browserSupabase;
export const createClient = () => browserSupabase;

// Server-side client with service role key (for admin operations)
export const supabaseAdmin = supabaseUrl && process.env.SUPABASE_SERVICE_ROLE_KEY
  ? supabaseCreateClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY)
  : null;
