import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { ensureAdmin } from '@/lib/admin/ensure-admin';
import { replyToSupportTicket } from '@/lib/support/tickets';
import { hubspotRequest } from '@/lib/crm/hubspot';
import { sendTicketReplyEmail } from '@/lib/email-service';

async function loadHubSpotTicketDetail(hsId: string) {
  const ticket: any = await hubspotRequest(
    `/crm/v3/objects/tickets/${hsId}?properties=subject,content,createdate`,
    'GET'
  );
  if (!ticket?.id) return null;

  let email = '';
  try {
    const assoc: any = await hubspotRequest(
      `/crm/v3/associations/Tickets/Contacts/batch/read`,
      'POST',
      { inputs: [{ id: hsId }] }
    );
    const contactId = assoc?.results?.[0]?.to?.[0]?.id;
    if (contactId) {
      const contact: any = await hubspotRequest(
        `/crm/v3/objects/contacts/${contactId}?properties=email,firstname,lastname`,
        'GET'
      );
      email = String(contact?.properties?.email ?? '');
    }
  } catch {
    // ignore
  }

  return {
    id: `hs:${hsId}`,
    source: 'student' as const,
    subject: String(ticket?.properties?.subject ?? ''),
    content: String(ticket?.properties?.content ?? ''),
    message: String(ticket?.properties?.content ?? ''),
    contactEmail: email,
    email,
    status: 'open',
    adminReply: null,
    repliedAt: null,
    createdate: ticket?.properties?.createdate ?? null,
    createdAt: ticket?.properties?.createdate ?? null,
    hubspot: true,
  };
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ ticketId: string }> }
) {
  try {
    const { ticketId: rawId } = await params;
    const ticketId = decodeURIComponent(rawId);
    const adminCheck = await ensureAdmin();
    if (!adminCheck.ok) {
      return NextResponse.json({ error: adminCheck.message }, { status: adminCheck.status });
    }

    if (ticketId.startsWith('hs:')) {
      const detail = await loadHubSpotTicketDetail(ticketId.slice(3));
      if (!detail) return NextResponse.json({ error: 'Ticket HubSpot no encontrado' }, { status: 404 });
      return NextResponse.json({ ticket: detail });
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
      // Último recurso: puede ser un id numérico de HubSpot sin prefijo
      if (/^\d+$/.test(ticketId)) {
        const detail = await loadHubSpotTicketDetail(ticketId);
        if (detail) return NextResponse.json({ ticket: detail });
      }
      return NextResponse.json({ error: 'Ticket no encontrado' }, { status: 404 });
    }

    const msg = (data.message ?? (data as any).content ?? '') as string;

    return NextResponse.json({
      ticket: {
        id: data.id,
        source: data.source,
        subject: data.subject,
        content: msg,
        message: msg,
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
    const { ticketId: rawId } = await params;
    const ticketId = decodeURIComponent(rawId);
    const body = await request.json().catch(() => ({}));
    const message = (body?.message ?? body?.reply ?? '').toString().trim();
    if (!message) {
      return NextResponse.json({ error: 'Escribe una respuesta' }, { status: 400 });
    }

    const adminCheck = await ensureAdmin();
    if (!adminCheck.ok) {
      return NextResponse.json({ error: adminCheck.message }, { status: adminCheck.status });
    }

    // Respuesta a ticket legacy HubSpot: solo email
    if (ticketId.startsWith('hs:') || /^\d+$/.test(ticketId)) {
      const hsId = ticketId.startsWith('hs:') ? ticketId.slice(3) : ticketId;
      const detail = await loadHubSpotTicketDetail(hsId);
      if (!detail?.email) {
        return NextResponse.json(
          {
            error:
              'Ticket HubSpot sin email de contacto. No se puede responder por correo desde aquí.',
          },
          { status: 400 }
        );
      }
      const mailed = await sendTicketReplyEmail({
        email: detail.email,
        name: detail.email,
        subject: detail.subject || 'Tu consulta',
        reply: message,
        source: 'student',
      });
      if (!mailed) {
        return NextResponse.json({ error: 'No se pudo enviar el email de respuesta' }, { status: 500 });
      }
      return NextResponse.json({
        ok: true,
        ticket: {
          id: detail.id,
          status: 'answered',
          contactEmail: detail.email,
          hubspot: true,
        },
      });
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
