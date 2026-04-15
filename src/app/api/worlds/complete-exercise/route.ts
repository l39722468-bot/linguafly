import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { completeWorldExercise } from '@/lib/world-progress';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json().catch(() => ({}));
    const exerciseId = String(body?.exerciseId || '').trim();
    const score = Number(body?.score);

    if (!exerciseId || !Number.isFinite(score)) {
      return NextResponse.json(
        { error: 'exerciseId y score son obligatorios' },
        { status: 400 }
      );
    }

    const result = await completeWorldExercise(supabase, user.id, exerciseId, score);
    return NextResponse.json({ ok: true, ...result });
  } catch (error: any) {
    const message = error?.message || 'Error interno';
    const status =
      message.includes('bloqueado') || message.includes('no encontrado') ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
