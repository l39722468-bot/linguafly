'use client';

// ============================================
// SUPABASE AUTH HELPERS
// Funciones helper para autenticación con Supabase
// ============================================

import { supabase } from './supabase-client';
import type { AuthError, User, Session } from '@supabase/supabase-js';

export interface AuthResponse {
  user?: User | null;
  session?: Session | null;
  error?: AuthError | null;
}

/**
 * Registrar nuevo usuario con email y contraseña
 */
export async function signUp(email: string, password: string, name: string): Promise<AuthResponse> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
      emailRedirectTo: `${window.location.origin}/curso-a1/outline`,
    },
  });

  return {
    user: data.user,
    session: data.session,
    error,
  };
}

/**
 * Iniciar sesión con email y contraseña
 */
export async function signIn(email: string, password: string): Promise<AuthResponse> {
  console.log('Attempting sign in for:', email);
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Sign in error:', error.message);
  } else {
    console.log('Sign in successful for:', email);
  }

  return {
    user: data.user,
    session: data.session,
    error,
  };
}

/**
 * Iniciar sesión con proveedor OAuth (Google, GitHub, etc.)
 */
export async function signInWithOAuth(provider: 'google' | 'github') {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  return { data, error };
}

/**
 * Cerrar sesión
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

/**
 * Enviar email para resetear contraseña
 */
export async function resetPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent('/cuenta/resetear')}`,
  });

  return { data, error };
}

/**
 * Actualizar contraseña (después de reset)
 */
export async function updatePassword(newPassword: string) {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  return {
    user: data.user,
    error,
  };
}

/**
 * Obtener sesión actual
 */
export async function getSession(): Promise<{ session: Session | null; error: AuthError | null }> {
  const { data, error } = await supabase.auth.getSession();
  return {
    session: data.session,
    error,
  };
}

/**
 * Obtener usuario actual
 */
export async function getUser(): Promise<{ user: User | null; error: AuthError | null }> {
  const { data, error } = await supabase.auth.getUser();
  return {
    user: data.user,
    error,
  };
}

/**
 * Suscribirse a cambios en el estado de autenticación
 */
export function onAuthStateChange(callback: (user: User | null) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user ?? null);
  });
}
