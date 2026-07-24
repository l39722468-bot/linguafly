import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createSupportTicket } from '@/lib/support/tickets';

export const runtime = 'nodejs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, subject, message } = body;

    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    if (!email.includes('@')) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
    }

    // Fuente de verdad: support_tickets (guest)
    const { ticket } = await createSupportTicket({
      source: 'guest',
      email,
      subject,
      message,
      firstName,
      lastName,
      phone: phone || null,
      category: 'general',
    });

    // Compatibilidad: también guardar en contact_inquiries si la tabla existe
    if (supabaseUrl && supabaseServiceKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        await supabase.from('contact_inquiries').insert([
          {
            first_name: firstName,
            last_name: lastName,
            email: email.toLowerCase().trim(),
            phone: phone || null,
            subject,
            message,
            created_at: new Date().toISOString(),
          },
        ]);
      } catch (e) {
        console.warn('[contact] contact_inquiries insert skipped', e);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Consulta recibida correctamente. Te responderemos en breve.',
      ticketId: ticket.id,
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Error al procesar la solicitud',
      },
      { status: 500 }
    );
  }
}
