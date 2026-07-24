const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:5436';
const SUPABASE_URL =
  process.env.EXPO_PUBLIC_SUPABASE_URL ?? 'https://nprqtjljoekoirlrjxlh.supabase.co';
const SUPABASE_ANON_KEY =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wcnF0amxqb2Vrb2lybHJqeGxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2NTMzNzcsImV4cCI6MjA4NDIyOTM3N30.GdTvAPa08RiadT-yxbGHOGPDz1baypAOeDDezqyFJNA';

export const config = {
  apiUrl: API_URL.replace(/\/$/, ''),
  supabaseUrl: SUPABASE_URL,
  supabaseAnonKey: SUPABASE_ANON_KEY,
};

export const DEFAULT_COURSE_ID = 'ingles-a1';
