import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { ensureAdmin } from '@/lib/admin/ensure-admin';
import { listHubSpotTicketsFallback } from '@/lib/support/tickets';

export async function GET(request: NextRequest) {
  try {
    const adminCheck = await ensureAdmin();
    if (!adminCheck.ok) {
      return NextResponse.json({ error: adminCheck.message }, { status: adminCheck.status });
    }

    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'SUPABASE_SERVICE_ROLE_KEY not configured' }, { status: 500 });
    }

    const source = request.nextUrl.searchParams.get('source'); // guest | student | all
    const status = request.nextUrl.searchParams.get('status'); // open | answered | closed | all
    const limit = Math.min(Number(request.nextUrl.searchParams.get('limit') ?? 100), 200);

    let tickets: any[] = [];
    let dbError: string | null = null;

    let query = supabaseAdmin
      .from('support_tickets')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (source === 'guest' || source === 'student') {
      query = query.eq('source', source);
    }
    if (status === 'open' || status === 'answered' || status === 'closed') {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error) {
      console.error('[admin/tickets] supabase:', error);
      dbError = error.message;
    } else {
      tickets = (data ?? []).map((t) => {
        const msg = (t.message ?? t.content ?? '') as string;
        return {
          id: t.id,
          source: t.source ?? 'student',
          subject: t.subject,
          content: msg,
          message: msg,
          email: t.email,
          contactEmail: t.email,
          firstName: t.first_name,
          lastName: t.last_name,
          phone: t.phone,
          category: t.category,
          status: t.status ?? 'open',
          adminReply: t.admin_reply,
          repliedAt: t.replied_at,
          createdate: t.created_at,
          createdAt: t.created_at,
          userId: t.user_id,
          hubspotTicketId: t.hubspot_ticket_id,
        };
      });
    }

    // Incluir tickets HubSpot legacy (p.ej. el de lramlo2026) si aún no están en DB
    try {
      const hs = await listHubSpotTicketsFallback(50);
      const knownHs = new Set(
        tickets
          .map((t) => String(t.hubspotTicketId || ''))
          .filter(Boolean)
          .concat(
            tickets
              .map((t) => String(t.id || ''))
              .filter((id) => id.startsWith('hs:'))
              .map((id) => id.slice(3))
          )
      );
      for (const t of hs) {
        const rawId = t.id.startsWith('hs:') ? t.id.slice(3) : t.id;
        if (knownHs.has(rawId)) continue;
        // Filtros opcionales
        if (source === 'guest') continue;
        if (status && status !== 'all' && status !== 'open') continue;
        tickets.push(t);
      }
    } catch (e) {
      console.warn('[admin/tickets] HubSpot fallback skipped', e);
    }

    // Ordenar por fecha desc
    tickets.sort((a, b) => {
      const da = new Date(a.createdAt || a.createdate || 0).getTime();
      const db = new Date(b.createdAt || b.createdate || 0).getTime();
      return db - da;
    });

    const guest = tickets.filter((t) => t.source === 'guest');
    const student = tickets.filter((t) => t.source !== 'guest');

    return NextResponse.json({
      tickets,
      sections: {
        guest,
        student,
      },
      counts: {
        guest: guest.length,
        student: student.length,
        open: tickets.filter((t) => t.status === 'open').length,
      },
      warning: dbError
        ? `DB support_tickets: ${dbError}. Se muestran también tickets de HubSpot si existen. Aplica la migración SQL.`
        : null,
    });
  } catch (error) {
    console.error('[admin/tickets] error', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
