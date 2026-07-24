import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { ensureAdmin } from '@/lib/admin/ensure-admin';

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
      console.error('[admin/tickets]', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const tickets = (data ?? []).map((t) => ({
      id: t.id,
      source: t.source,
      subject: t.subject,
      content: t.message,
      message: t.message,
      email: t.email,
      contactEmail: t.email,
      firstName: t.first_name,
      lastName: t.last_name,
      phone: t.phone,
      category: t.category,
      status: t.status,
      adminReply: t.admin_reply,
      repliedAt: t.replied_at,
      createdate: t.created_at,
      createdAt: t.created_at,
      userId: t.user_id,
    }));

    const guest = tickets.filter((t) => t.source === 'guest');
    const student = tickets.filter((t) => t.source === 'student');

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
    });
  } catch (error) {
    console.error('[admin/tickets] error', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
