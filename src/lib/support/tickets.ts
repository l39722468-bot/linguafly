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
  hubspotRequest,
} from '@/lib/crm/hubspot';
import crypto from 'crypto';

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
  persisted: boolean;
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
  const now = new Date().toISOString();
  const displayName = [firstName, lastName].filter(Boolean).join(' ') || email;

  // HubSpot best-effort (no bloquea el ticket)
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

  const payload = {
    source: input.source,
    user_id: input.userId ?? null,
    email,
    first_name: firstName,
    last_name: lastName,
    phone,
    subject,
    message,
    category,
    status: 'open' as const,
    hubspot_ticket_id: hubspotTicketId,
  };

  let data: SupportTicket | null = null;
  let persistError: string | null = null;

  {
    const insert = await supabaseAdmin.from('support_tickets').insert(payload).select('*').single();
    if (!insert.error && insert.data) {
      data = insert.data as SupportTicket;
    } else {
      persistError = insert.error?.message ?? 'insert failed';
      console.warn('[support_tickets] insert failed:', persistError);

      // Compatibilidad con esquemas viejos (p.ej. content en vez de message)
      if (persistError && /column .* does not exist|Could not find/i.test(persistError)) {
        const legacyPayload: Record<string, unknown> = {
          ...payload,
          content: message,
        };
        const retry = await supabaseAdmin
          .from('support_tickets')
          .insert(legacyPayload)
          .select('*')
          .single();
        if (!retry.error && retry.data) {
          data = retry.data as SupportTicket;
          persistError = null;
        } else {
          persistError = retry.error?.message ?? persistError;
        }
      }
    }
  }

  // Fallback: si la tabla/migración no está lista, no perder el ticket:
  // notificamos al admin por email y devolvemos un ticket sintético (HubSpot o UUID).
  if (!data) {
    const fallbackId = hubspotTicketId || crypto.randomUUID();
    data = {
      id: fallbackId,
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
      admin_reply: null,
      replied_at: null,
      replied_by: null,
      hubspot_ticket_id: hubspotTicketId,
      created_at: now,
      updated_at: now,
    };
    console.error(
      '[support_tickets] usando fallback sin persistir en DB. Ejecuta migración. Error:',
      persistError
    );
  }

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
    ticketId: data.id,
  });

  return { ticket: data, mailSent: userMail, persisted: !persistError };
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

/** Lista tickets de HubSpot (legacy) para no perder consultas antiguas. */
export async function listHubSpotTicketsFallback(limit = 50): Promise<
  Array<{
    id: string;
    source: 'student';
    subject: string;
    content: string;
    message: string;
    email: string;
    contactEmail: string;
    status: 'open';
    createdate: string | null;
    createdAt: string | null;
    hubspot: true;
  }>
> {
  const ticketsResp: any = await hubspotRequest(
    `/crm/v3/objects/tickets?limit=${Math.min(limit, 100)}&archived=false&properties=subject,content,createdate`,
    'GET'
  );
  const results: any[] = ticketsResp?.results ?? [];
  if (results.length === 0) return [];

  const mapped = results.map((t: any) => ({
    id: `hs:${String(t.id)}`,
    source: 'student' as const,
    subject: String(t?.properties?.subject ?? ''),
    content: String(t?.properties?.content ?? ''),
    message: String(t?.properties?.content ?? ''),
    email: '',
    contactEmail: '',
    status: 'open' as const,
    createdate: (t?.properties?.createdate as string | null) ?? null,
    createdAt: (t?.properties?.createdate as string | null) ?? null,
    hubspot: true as const,
    _hsId: String(t.id),
  }));

  // Best-effort: asociar emails de contacto
  try {
    const assocResp: any = await hubspotRequest(
      `/crm/v3/associations/Tickets/Contacts/batch/read`,
      'POST',
      { inputs: mapped.map((t) => ({ id: t._hsId })) }
    );
    const ticketToContact = new Map<string, string>();
    for (const r of assocResp?.results ?? []) {
      const fromId = String(r?.from?.id ?? '');
      const toId = r?.to?.[0]?.id;
      if (fromId && toId) ticketToContact.set(fromId, String(toId));
    }
    const contactIds = Array.from(new Set(ticketToContact.values()));
    if (contactIds.length > 0) {
      const contactsResp: any = await hubspotRequest(
        `/crm/v3/objects/contacts/batch/read`,
        'POST',
        { inputs: contactIds.map((id) => ({ id })), properties: ['email'] }
      );
      const idToEmail = new Map<string, string>();
      for (const c of contactsResp?.results ?? []) {
        idToEmail.set(String(c.id), String(c?.properties?.email ?? ''));
      }
      for (const t of mapped) {
        const cid = ticketToContact.get(t._hsId);
        const em = cid ? idToEmail.get(cid) ?? '' : '';
        t.email = em;
        t.contactEmail = em;
      }
    }
  } catch (e) {
    console.warn('[support_tickets] HubSpot contact enrich skipped', e);
  }

  return mapped.map(({ _hsId, ...rest }) => rest);
}
