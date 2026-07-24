import { supabaseAdmin } from '@/lib/supabase/client';
import {
  sendTicketReceivedEmail,
  sendTicketReplyEmail,
  sendTicketAdminNotifyEmail,
} from '@/lib/email-service';
import {
  syncHubSpotContact,
  createHubSpotTicket,
  associateTicketWithContact,
} from '@/lib/crm/hubspot';

export type TicketSource = 'guest' | 'student';
export type TicketStatus = 'open' | 'answered' | 'closed';

export type SupportTicket = {
  id: string;
  source: TicketSource;
  user_id: string | null;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  subject: string;
  message: string;
  category: string;
  status: TicketStatus;
  admin_reply: string | null;
  replied_at: string | null;
  replied_by: string | null;
  hubspot_ticket_id: string | null;
  created_at: string;
  updated_at: string;
};

export type CreateTicketInput = {
  source: TicketSource;
  email: string;
  subject: string;
  message: string;
  userId?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  category?: string;
};

export async function createSupportTicket(input: CreateTicketInput): Promise<{
  ticket: SupportTicket;
  mailSent: boolean;
}> {
  if (!supabaseAdmin) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY not configured');
  }

  const email = input.email.trim().toLowerCase();
  const subject = input.subject.trim();
  const message = input.message.trim();
  if (!email || !subject || !message) {
    throw new Error('Email, asunto y mensaje son obligatorios');
  }

  const firstName = (input.firstName ?? '').trim() || null;
  const lastName = (input.lastName ?? '').trim() || null;
  const phone = (input.phone ?? '').trim() || null;
  const category = (input.category ?? 'general').trim() || 'general';

  // HubSpot best-effort
  let hubspotTicketId: string | null = null;
  try {
    const contactId = await syncHubSpotContact({
      email,
      firstName: firstName ?? undefined,
      lastName: lastName ?? undefined,
      phone: phone ?? undefined,
    });
    const hsId = await createHubSpotTicket({
      subject: `[${input.source}] ${subject}`,
      content: message,
    });
    if (hsId) {
      hubspotTicketId = String(hsId);
      if (contactId) await associateTicketWithContact(hsId, contactId);
    }
  } catch (e) {
    console.warn('[support_tickets] HubSpot skipped:', e);
  }

  const { data, error } = await supabaseAdmin
    .from('support_tickets')
    .insert({
      source: input.source,
      user_id: input.userId ?? null,
      email,
      first_name: firstName,
      last_name: lastName,
      phone,
      subject,
      message,
      category,
      status: 'open',
      hubspot_ticket_id: hubspotTicketId,
    })
    .select('*')
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? 'No se pudo crear el ticket');
  }

  const ticket = data as SupportTicket;
  const displayName = [firstName, lastName].filter(Boolean).join(' ') || email;

  const userMail = await sendTicketReceivedEmail({
    email,
    name: displayName,
    subject,
    source: input.source,
  });

  await sendTicketAdminNotifyEmail({
    email,
    name: displayName,
    subject,
    message,
    source: input.source,
    ticketId: ticket.id,
  });

  return { ticket, mailSent: userMail };
}

export async function replyToSupportTicket(params: {
  ticketId: string;
  reply: string;
  adminUserId: string;
}): Promise<SupportTicket> {
  if (!supabaseAdmin) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY not configured');
  }

  const reply = params.reply.trim();
  if (!reply) throw new Error('La respuesta no puede estar vacía');

  const { data: existing, error: getErr } = await supabaseAdmin
    .from('support_tickets')
    .select('*')
    .eq('id', params.ticketId)
    .maybeSingle();

  if (getErr || !existing) {
    throw new Error(getErr?.message ?? 'Ticket no encontrado');
  }

  const now = new Date().toISOString();
  const previousReply = (existing.admin_reply as string | null) || '';
  const combinedReply = previousReply
    ? `${previousReply}\n\n---\n${now}\n${reply}`
    : reply;

  const { data: updated, error: updErr } = await supabaseAdmin
    .from('support_tickets')
    .update({
      admin_reply: combinedReply,
      status: 'answered',
      replied_at: now,
      replied_by: params.adminUserId,
      updated_at: now,
    })
    .eq('id', params.ticketId)
    .select('*')
    .single();

  if (updErr || !updated) {
    throw new Error(updErr?.message ?? 'No se pudo guardar la respuesta');
  }

  const name =
    [updated.first_name, updated.last_name].filter(Boolean).join(' ') ||
    updated.email;

  const mailed = await sendTicketReplyEmail({
    email: updated.email,
    name,
    subject: updated.subject,
    reply,
    source: updated.source,
  });

  if (!mailed) {
    console.warn('[support_tickets] reply saved but email failed for', updated.email);
  }

  return updated as SupportTicket;
}
