import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createSupportTicket } from '@/lib/support/tickets';
import { supabaseAdmin } from '@/lib/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const body = (await request.json().catch(() => ({}))) as {
      subject?: string;
      content?: string;
      message?: string;
      category?: string;
      email?: string;
      firstName?: string;
      lastName?: string;
      phone?: string;
    };

    const subject = (body.subject ?? '').toString().trim();
    const message = (body.content ?? body.message ?? '').toString().trim();
    const category = (body.category ?? 'general').toString().trim() || 'general';

    if (!subject || !message) {
      return NextResponse.json({ error: 'Asunto y mensaje son obligatorios' }, { status: 400 });
    }

    // Alumno autenticado
    if (user?.email) {
      let firstName: string | null = null;
      let lastName: string | null = null;

      if (supabaseAdmin) {
        const { data: profile } = await supabaseAdmin
          .from('user_profiles')
          .select('name,email')
          .eq('user_id', user.id)
          .maybeSingle();
        const full = (profile?.name || user.user_metadata?.full_name || '').toString().trim();
        if (full) {
          const parts = full.split(/\s+/);
          firstName = parts[0] || null;
          lastName = parts.slice(1).join(' ') || null;
        }
      }

      const { ticket, mailSent } = await createSupportTicket({
        source: 'student',
        email: user.email,
        subject,
        message,
        userId: user.id,
        firstName,
        lastName,
        category,
      });

      return NextResponse.json({ ok: true, ticketId: ticket.id, mailSent });
    }

    // Guest sin sesión: requiere email
    const email = (body.email ?? '').toString().trim().toLowerCase();
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Debes iniciar sesión o indicar un email válido para enviarnos la consulta.' },
        { status: 400 }
      );
    }

    const { ticket, mailSent } = await createSupportTicket({
      source: 'guest',
      email,
      subject,
      message,
      firstName: (body.firstName ?? '').toString().trim() || null,
      lastName: (body.lastName ?? '').toString().trim() || null,
      phone: (body.phone ?? '').toString().trim() || null,
      category,
    });

    return NextResponse.json({ ok: true, ticketId: ticket.id, mailSent, source: 'guest' });
  } catch (e) {
    console.error('[support/ticket] error', e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

/** Listar tickets propios del alumno autenticado */
export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Service role not configured' }, { status: 500 });
    }

    const { data, error } = await supabaseAdmin
      .from('support_tickets')
      .select('id,subject,status,created_at,replied_at,category,source')
      .or(`user_id.eq.${user.id},email.eq.${user.email}`)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ tickets: data ?? [] });
  } catch (e) {
    console.error('[support/ticket] GET error', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
