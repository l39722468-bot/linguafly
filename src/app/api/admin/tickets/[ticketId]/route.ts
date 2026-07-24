import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { ensureAdmin } from '@/lib/admin/ensure-admin';
import { replyToSupportTicket } from '@/lib/support/tickets';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ ticketId: string }> }
) {
  try {
    const { ticketId } = await params;
    const adminCheck = await ensureAdmin();
    if (!adminCheck.ok) {
      return NextResponse.json({ error: adminCheck.message }, { status: adminCheck.status });
    }

    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'SUPABASE_SERVICE_ROLE_KEY not configured' }, { status: 500 });
    }

    const { data, error } = await supabaseAdmin
      .from('support_tickets')
      .select('*')
      .eq('id', ticketId)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    if (!data) {
      return NextResponse.json({ error: 'Ticket no encontrado' }, { status: 404 });
    }

    return NextResponse.json({
      ticket: {
        id: data.id,
        source: data.source,
        subject: data.subject,
        content: data.message,
        message: data.message,
        contactEmail: data.email,
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
        phone: data.phone,
        category: data.category,
        status: data.status,
        adminReply: data.admin_reply,
        repliedAt: data.replied_at,
        createdate: data.created_at,
        createdAt: data.created_at,
        userId: data.user_id,
      },
    });
  } catch (error) {
    console.error('[admin/tickets/ticketId] GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ ticketId: string }> }
) {
  try {
    const { ticketId } = await params;
    const body = await request.json().catch(() => ({}));
    const message = (body?.message ?? body?.reply ?? '').toString().trim();
    if (!message) {
      return NextResponse.json({ error: 'Escribe una respuesta' }, { status: 400 });
    }

    const adminCheck = await ensureAdmin();
    if (!adminCheck.ok) {
      return NextResponse.json({ error: adminCheck.message }, { status: adminCheck.status });
    }

    const updated = await replyToSupportTicket({
      ticketId,
      reply: message,
      adminUserId: adminCheck.userId,
    });

    return NextResponse.json({
      ok: true,
      ticket: {
        id: updated.id,
        status: updated.status,
        adminReply: updated.admin_reply,
        repliedAt: updated.replied_at,
        contactEmail: updated.email,
      },
    });
  } catch (error) {
    console.error('[admin/tickets/ticketId] POST error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
