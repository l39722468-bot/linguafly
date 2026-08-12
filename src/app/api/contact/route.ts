import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

/**
 * Contact form for the free blog — accepts submissions without a backend CRM/DB.
 * Messages are logged; wire to email later if needed.
 */
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

    console.info('[contact]', {
      firstName,
      lastName,
      email: String(email).toLowerCase().trim(),
      phone: phone || null,
      subject,
      messageLength: String(message).length,
    });

    return NextResponse.json({
      success: true,
      message: 'Consulta recibida correctamente. Te responderemos en breve.',
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
