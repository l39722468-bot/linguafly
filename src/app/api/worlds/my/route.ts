import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getWorldMapForUser, normalizeCefrLevel } from '@/lib/world-progress';

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from('user_profiles')
      .select('language_level')
      .eq('user_id', user.id)
      .maybeSingle();

    const level = normalizeCefrLevel(profile?.language_level);
    const worlds = await getWorldMapForUser(supabase, user.id, level);
    const nextExercise =
      worlds.flatMap((w) => w.exercises).find((e) => e.status === 'unlocked') ?? null;

    return NextResponse.json({
      level,
      worlds,
      nextExerciseId: nextExercise?.id ?? null,
    });
  } catch (error: any) {
    console.error('[worlds/my] error', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
