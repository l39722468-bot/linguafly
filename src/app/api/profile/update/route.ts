import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getUserProfileByAuthId } from '@/lib/access/user-profile';

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = (await request.json().catch(() => ({}))) as { name?: string };
    const name = (body.name ?? '').toString().trim();

    if (!name || name.length < 2) {
      return NextResponse.json({ error: 'Indica un nombre válido.' }, { status: 400 });
    }
    if (name.length > 80) {
      return NextResponse.json({ error: 'El nombre es demasiado largo.' }, { status: 400 });
    }

    const nowIso = new Date().toISOString();
    const existing = await getUserProfileByAuthId<{ id?: string; user_id?: string }>(
      supabase,
      user.id,
      'id,user_id'
    );

    const payload = {
      name,
      email: user.email ?? undefined,
      updated_at: nowIso,
    };

    let error: { message: string } | null = null;

    if (existing?.user_id) {
      const res = await supabase
        .from('user_profiles')
        .update(payload)
        .eq('user_id', user.id);
      error = res.error;
    } else if (existing?.id) {
      const res = await supabase.from('user_profiles').update(payload).eq('id', user.id);
      error = res.error;
    } else {
      const res = await supabase.from('user_profiles').upsert(
        {
          user_id: user.id,
          ...payload,
        },
        { onConflict: 'user_id' }
      );
      error = res.error;
    }

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await supabase.auth.updateUser({
      data: { full_name: name },
    });

    return NextResponse.json({ ok: true, name });
  } catch (e) {
    console.error('[profile/update] error', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
