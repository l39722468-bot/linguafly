// ============================================
// API ENDPOINT: RESET USER PROGRESS
// ============================================
// POST /api/admin/reset-progress

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';

// ============================================
// POST - Resetear progreso de usuario
// ============================================

export async function POST(request: NextRequest) {
  try {
    // Parsear body
    const body = await request.json();
    const { userId, resetType, adminSecret } = body;

    // Validar admin secret (seguridad básica)
    const expectedSecret = process.env.ADMIN_SECRET || 'focus-english-admin-2026';
    if (adminSecret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid admin secret' },
        { status: 401 }
      );
    }

    // Validar parámetros
    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    if (!['full', 'progress-only', 'stats-only'].includes(resetType)) {
      return NextResponse.json(
        { error: 'resetType must be: full, progress-only, or stats-only' },
        { status: 400 }
      );
    }

    // Crear cliente de Supabase con service role key
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    
    if (!supabaseServiceKey) {
      return NextResponse.json(
        { error: 'SUPABASE_SERVICE_ROLE_KEY not configured' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const results = {
      lessonsReset: false,
      exercisesReset: false,
      sessionsReset: false,
      statsReset: false,
      errors: [] as string[]
    };

    // Resetear según el tipo
    if (resetType === 'full' || resetType === 'progress-only') {
      // 1. Resetear progreso de lecciones unificado
      try {
        const { error: lessonsError } = await supabase
          .from('user_lesson_progress')
          .delete()
          .eq('user_id', userId);

        if (lessonsError) {
          results.errors.push(`Lessons: ${lessonsError.message}`);
        } else {
          results.lessonsReset = true;
        }
      } catch (e) {
        results.errors.push(`Lessons exception: ${e}`);
      }

      // 1b. Eventos de ejercicios unificados
      try {
        const { error: eventsError } = await supabase
          .from('user_exercise_events')
          .delete()
          .eq('user_id', userId);
        if (eventsError) results.errors.push(`Events: ${eventsError.message}`);
      } catch (e) {
        results.errors.push(`Events exception: ${e}`);
      }

      // 1c. Legado A1
      try {
        const { error: a1ProgErr } = await supabase.from('a1_progress').delete().eq('user_id', userId);
        if (a1ProgErr) results.errors.push(`A1 progress: ${a1ProgErr.message}`);
        const { error: a1ResErr } = await supabase
          .from('a1_exercise_results')
          .delete()
          .eq('user_id', userId);
        if (a1ResErr) results.errors.push(`A1 results: ${a1ResErr.message}`);
        const { error: a1SrsErr } = await supabase.from('a1_srs_cards').delete().eq('user_id', userId);
        if (a1SrsErr) results.errors.push(`A1 SRS: ${a1SrsErr.message}`);
      } catch (e) {
        results.errors.push(`A1 exception: ${e}`);
      }

      // 2. Resetear progreso de ejercicios
      try {
        const { error: exercisesError } = await supabase
          .from('user_exercise_progress')
          .delete()
          .eq('user_id', userId);

        if (exercisesError) {
          results.errors.push(`Exercises: ${exercisesError.message}`);
        } else {
          results.exercisesReset = true;
        }
      } catch (e) {
        results.errors.push(`Exercises exception: ${e}`);
      }

      // 3. Resetear sesiones de práctica
      try {
        const { error: sessionsError } = await supabase
          .from('practice_sessions')
          .delete()
          .eq('user_id', userId);

        if (sessionsError) {
          results.errors.push(`Sessions: ${sessionsError.message}`);
        } else {
          results.sessionsReset = true;
        }
      } catch (e) {
        results.errors.push(`Sessions exception: ${e}`);
      }
    }

    if (resetType === 'full' || resetType === 'stats-only') {
      // 4. Resetear estadísticas
      try {
        const { error: statsError } = await supabase
          .from('user_stats')
          .upsert({
            user_id: userId,
            total_time_spent: 0,
            exercises_completed: 0,
            lessons_completed: 0,
            streak_days: 0,
            last_practice_date: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'user_id'
          });

        if (statsError) {
          results.errors.push(`Stats: ${statsError.message}`);
        } else {
          results.statsReset = true;
        }
      } catch (e) {
        results.errors.push(`Stats exception: ${e}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Progress reset completed',
      userId,
      resetType,
      results,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error resetting progress:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to reset progress',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// ============================================
// GET - Obtener información de progreso actual
// ============================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const adminSecret = searchParams.get('adminSecret');

    // Validar admin secret
    const expectedSecret = process.env.ADMIN_SECRET || 'focus-english-admin-2026';
    if (adminSecret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // Crear cliente de Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Obtener estadísticas actuales
    const { data: stats, error: statsError } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single();

    // Contar registros de progreso
    const { count: lessonsCount } = await supabase
      .from('user_lesson_progress')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    const { count: exercisesCount } = await supabase
      .from('user_exercise_progress')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    const { count: sessionsCount } = await supabase
      .from('practice_sessions')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    return NextResponse.json({
      success: true,
      userId,
      currentProgress: {
        stats: stats || null,
        lessonsProgressCount: lessonsCount || 0,
        exercisesProgressCount: exercisesCount || 0,
        practiceSessionsCount: sessionsCount || 0
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error getting progress info:', error);
    
    return NextResponse.json(
      { error: 'Failed to get progress info' },
      { status: 500 }
    );
  }
}
