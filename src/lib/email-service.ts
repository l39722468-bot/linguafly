// ============================================
// SERVICIO DE EMAIL
// Gestión de envío de emails con Resend
// ============================================

import { Resend } from 'resend';

const BRAND_NAME = 'Linguafly';
const DEFAULT_SITE_URL = 'https://linguafly.app';
// Requiere dominio verificado en Resend (p. ej. updates.linguafly.app).
const DEFAULT_FROM = 'Linguafly <hola@updates.linguafly.app>';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

if (!process.env.RESEND_API_KEY) {
  console.error('❌ RESEND_API_KEY no encontrada en las variables de entorno');
} else {
  console.log(
    '📡 Resend configurado con API Key (primeros 5 caracteres):',
    process.env.RESEND_API_KEY.substring(0, 5) + '...'
  );
}

function getPublicSiteUrl(): string {
  const candidates = [
    process.env.EMAIL_SITE_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXTAUTH_URL,
    DEFAULT_SITE_URL,
  ];

  for (const raw of candidates) {
    if (!raw) continue;
    const cleaned = raw.trim().replace(/\/$/, '');
    if (!cleaned) continue;
    // Evitar enlaces al dominio antiguo (provocan 404 / redirect rotos)
    if (/focus-on-english\.com/i.test(cleaned)) continue;
    if (/^https?:\/\//i.test(cleaned)) return cleaned;
  }

  return DEFAULT_SITE_URL;
}

function getFromAddress(): string {
  return process.env.EMAIL_FROM || process.env.RESEND_FROM || DEFAULT_FROM;
}

/**
 * Enviar email de recuperación de contraseña
 */
export async function sendPasswordResetEmail(
  email: string,
  resetToken: string,
  userName: string
): Promise<boolean> {
  if (!resend) {
    console.warn('Resend not configured, skipping email send');
    return process.env.NODE_ENV === 'development';
  }

  try {
    const siteUrl = getPublicSiteUrl();
    const resetUrl = `${siteUrl}/cuenta/resetear?token=${resetToken}`;

    const { data, error } = await resend.emails.send({
      from: getFromAddress(),
      to: [email],
      subject: `Recupera tu contraseña - ${BRAND_NAME}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"></head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0; font-size: 28px;">${BRAND_NAME}</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Recuperación de contraseña</p>
            </div>
            <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
              <h2 style="color: #1f2937; margin-top: 0;">Hola ${userName},</h2>
              <p style="font-size: 16px; color: #4b5563;">Hemos recibido una solicitud para restablecer tu contraseña de ${BRAND_NAME}.</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" style="display: inline-block; background: #ff7e5f; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600;">Restablecer contraseña</a>
              </div>
              <p style="font-size: 12px; color: #2563eb; word-break: break-all;">${resetUrl}</p>
            </div>
            <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
              © ${new Date().getFullYear()} ${BRAND_NAME}
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('❌ Error enviando email:', error);
      return false;
    }

    console.log('✅ Email de recuperación enviado:', data?.id);
    return true;
  } catch (error) {
    console.error('❌ Error en sendPasswordResetEmail:', error);
    return false;
  }
}

/**
 * Enviar email de confirmación de cambio de contraseña
 */
export async function sendPasswordChangedEmail(
  email: string,
  userName: string
): Promise<boolean> {
  if (!resend) {
    console.warn('Resend not configured, skipping email send');
    return process.env.NODE_ENV === 'development';
  }

  try {
    const loginUrl = `${getPublicSiteUrl()}/cuenta/login`;

    const { data, error } = await resend.emails.send({
      from: getFromAddress(),
      to: [email],
      subject: `Tu contraseña ha sido actualizada - ${BRAND_NAME}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"></head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0; font-size: 28px;">${BRAND_NAME}</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Contraseña actualizada</p>
            </div>
            <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
              <h2 style="color: #1f2937; margin-top: 0;">Hola ${userName},</h2>
              <p style="font-size: 16px; color: #4b5563;">Tu contraseña ha sido actualizada correctamente.</p>
              <p style="text-align: center; margin: 20px 0;">
                <a href="${loginUrl}" style="display: inline-block; background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600;">Iniciar sesión</a>
              </p>
            </div>
            <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
              © ${new Date().getFullYear()} ${BRAND_NAME}
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('❌ Error enviando email:', error);
      return false;
    }

    console.log('✅ Email de confirmación enviado:', data?.id);
    return true;
  } catch (error) {
    console.error('❌ Error en sendPasswordChangedEmail:', error);
    return false;
  }
}

/**
 * Enviar nueva contraseña temporal generada desde el panel admin.
 */
export async function sendAdminTempPasswordEmail({
  email,
  name,
  tempPassword,
}: {
  email: string;
  name: string;
  tempPassword: string;
}): Promise<boolean> {
  if (!resend) {
    console.warn('Resend not configured, skipping admin temp password email');
    return process.env.NODE_ENV === 'development';
  }

  try {
    const siteUrl = getPublicSiteUrl();
    const loginUrl = `${siteUrl}/cuenta/login`;

    const { data, error } = await resend.emails.send({
      from: getFromAddress(),
      to: [email],
      subject: `Nueva contraseña temporal - ${BRAND_NAME}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"></head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0; font-size: 28px;">${BRAND_NAME}</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Contraseña restablecida por administración</p>
            </div>
            <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
              <h2 style="color: #1f2937; margin-top: 0;">Hola ${name},</h2>
              <p style="font-size: 16px; color: #4b5563;">
                Se ha generado una <strong>contraseña temporal</strong> para tu cuenta. Úsala para iniciar sesión y cámbiala cuando puedas.
              </p>
              <div style="background: white; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #e5e7eb;">
                <p style="margin: 0; font-size: 14px; color: #6b7280;">Email</p>
                <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600; color: #1f2937;">${email}</p>
                <p style="margin: 0; font-size: 14px; color: #6b7280;">Contraseña temporal</p>
                <p style="margin: 0; font-size: 18px; font-family: monospace; font-weight: bold; color: #ff7e5f;">${tempPassword}</p>
              </div>
              <p style="text-align: center; margin: 24px 0;">
                <a href="${loginUrl}" style="display: inline-block; background: #ff7e5f; color: white; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: 600;">Iniciar sesión</a>
              </p>
            </div>
            <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
              © ${new Date().getFullYear()} ${BRAND_NAME}
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('❌ Error enviando email de password admin:', error);
      return false;
    }

    console.log('✅ Email de password admin enviado:', data?.id);
    return true;
  } catch (error) {
    console.error('❌ Error en sendAdminTempPasswordEmail:', error);
    return false;
  }
}

/**
 * Enviar email de bienvenida tras suscripción exitosa
 */
export async function sendWelcomeEmail({
  email,
  name,
  planName,
  tempPassword,
}: {
  email: string;
  name: string;
  planName: string;
  tempPassword?: string;
}): Promise<boolean> {
  if (!resend) {
    console.warn('Resend not configured, skipping welcome email');
    return process.env.NODE_ENV === 'development';
  }

  try {
    const siteUrl = getPublicSiteUrl();
    const loginUrl = `${siteUrl}/cuenta/login`;
    const recoverUrl = `${siteUrl}/cuenta/recuperar`;
    const panelUrl = `${siteUrl}/mi-panel`;
    const fromAddress = getFromAddress();

    if (!tempPassword) {
      console.warn(
        '⚠️ sendWelcomeEmail: sin contraseña temporal; el alumno no podrá iniciar sesión con claves nuevas'
      );
    }

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [email],
      subject: `Tu acceso a ${BRAND_NAME} está listo`,
      html: `
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"></head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0; font-size: 32px;">${BRAND_NAME}</h1>
              <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Tu suscripción ya está activa</p>
            </div>
            
            <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
              <h2 style="color: #1f2937; margin-top: 0;">¡Hola ${name}!</h2>
              
              <p style="font-size: 16px; color: #4b5563;">
                Tu pago se ha confirmado. Ya puedes entrar al <strong>panel del alumno</strong> y acceder al resto de unidades de los cursos A1–C2.
              </p>
              
              <div style="background: #fff7ed; border: 2px solid #ffedd5; padding: 20px; border-radius: 12px; margin: 20px 0; text-align: center;">
                <p style="margin: 0; color: #9a3412; font-size: 14px; font-weight: 600; text-transform: uppercase;">Plan activo</p>
                <h3 style="margin: 5px 0; color: #c2410c; font-size: 24px; font-weight: 800;">${planName}</h3>
              </div>

              ${
                tempPassword
                  ? `
              <div style="background: #f3f4f6; border: 1px dashed #d1d5db; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #4b5563; font-size: 14px; font-weight: 600; text-align: center;">Tus claves de acceso</p>
                <div style="background: white; padding: 15px; border-radius: 6px; margin: 10px 0; border: 1px solid #e5e7eb;">
                  <p style="margin: 0; font-size: 14px; color: #6b7280;">Email</p>
                  <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600; color: #1f2937;">${email}</p>
                  <p style="margin: 0; font-size: 14px; color: #6b7280;">Contraseña temporal</p>
                  <p style="margin: 0; font-size: 18px; font-family: monospace; font-weight: bold; color: #ff7e5f;">${tempPassword}</p>
                </div>
                <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 12px; text-align: center;">
                  Entra con el botón «Iniciar sesión» de la web. Si no funciona, usa «¿Olvidaste tu contraseña?» o
                  <a href="${recoverUrl}" style="color: #2563eb;"> recupera tu acceso aquí</a>.
                </p>
              </div>
              `
                  : `
              <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 0 0 10px 0; font-size: 15px; color: #92400e;">
                  Tu cuenta está activa con el email <strong>${email}</strong>.
                  Para crear o recuperar tu contraseña:
                </p>
                <ol style="margin: 0; padding-left: 18px; font-size: 14px; color: #92400e; text-align: left;">
                  <li>Entra en <a href="${loginUrl}" style="color: #c2410c; font-weight: 700;">Iniciar sesión</a></li>
                  <li>Pulsa <strong>«¿Olvidaste tu contraseña?»</strong></li>
                  <li>O ve directo a <a href="${recoverUrl}" style="color: #c2410c; font-weight: 700;">recuperar contraseña</a></li>
                </ol>
              </div>
              `
              }

              <p style="font-size: 15px; color: #4b5563;">Con tu suscripción puedes:</p>
              <ul style="font-size: 15px; color: #4b5563; padding-left: 20px;">
                <li>Entrar al panel del alumno</li>
                <li>Abrir todas las unidades de los cursos (no solo la unidad 1)</li>
                <li>Continuar desde donde lo dejaste</li>
              </ul>
              
              <div style="text-align: center; margin: 28px 0;">
                <a href="${loginUrl}" style="display: inline-block; background: #ff7e5f; color: white !important; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 700; margin: 6px;">Iniciar sesión</a>
                <a href="${recoverUrl}" style="display: inline-block; background: #ffffff; color: #c2410c !important; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 700; margin: 6px; border: 2px solid #fed7aa;">¿Olvidaste tu contraseña?</a>
              </div>
              <p style="font-size: 12px; color: #6b7280; word-break: break-all; text-align: center;">
                Si el botón no funciona, copia este enlace:<br/>
                <a href="${loginUrl}" style="color: #2563eb;">${loginUrl}</a>
              </p>
              
              <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
                Si tienes dudas, responde a este correo.
              </p>
            </div>
            
            <div style="background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
              <p style="margin: 0 0 10px 0;">© ${new Date().getFullYear()} ${BRAND_NAME}. Todos los derechos reservados.</p>
              <p style="margin: 0;">Este email se envió a ${email}</p>
              <p style="margin: 8px 0 0 0;"><a href="${panelUrl}" style="color: #6b7280;">${panelUrl}</a></p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('❌ Error enviando email de bienvenida:', error);
      return false;
    }

    console.log('✅ Email de bienvenida enviado con éxito:', data?.id, '| siteUrl:', siteUrl);
    return true;
  } catch (error) {
    console.error('❌ Error en sendWelcomeEmail:', error);
    return false;
  }
}

function getAdminNotifyEmail(): string {
  return (
    process.env.ADMIN_EMAIL ||
    process.env.TICKETS_ADMIN_EMAIL ||
    'admin@linguafly.app'
  );
}

export async function sendTicketReceivedEmail({
  email,
  name,
  subject,
  source,
}: {
  email: string;
  name: string;
  subject: string;
  source: 'guest' | 'student';
}): Promise<boolean> {
  if (!resend) {
    console.warn('Resend not configured, skipping ticket received email');
    return process.env.NODE_ENV === 'development';
  }

  try {
    const siteUrl = getPublicSiteUrl();
    const { data, error } = await resend.emails.send({
      from: getFromAddress(),
      to: [email],
      subject: `Hemos recibido tu consulta - ${BRAND_NAME}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%); color: white; padding: 28px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 26px;">${BRAND_NAME}</h1>
            <p style="margin: 8px 0 0;">Consulta recibida</p>
          </div>
          <div style="background: #fff; border: 1px solid #e5e7eb; border-top: none; padding: 28px;">
            <p>Hola ${name},</p>
            <p>Hemos recibido tu consulta <strong>«${subject}»</strong>${
              source === 'student' ? ' (cuenta de alumno)' : ''
            }.</p>
            <p>Nuestro equipo te responderá por email a través del sistema de tickets.</p>
            <p style="margin-top: 24px;"><a href="${siteUrl}/contacto" style="color: #2563eb;">${siteUrl}</a></p>
          </div>
        </div>
      `,
    });
    if (error) {
      console.error('❌ ticket received email:', error);
      return false;
    }
    console.log('✅ ticket received email:', data?.id);
    return true;
  } catch (e) {
    console.error('❌ sendTicketReceivedEmail', e);
    return false;
  }
}

export async function sendTicketAdminNotifyEmail({
  email,
  name,
  subject,
  message,
  source,
  ticketId,
}: {
  email: string;
  name: string;
  subject: string;
  message: string;
  source: 'guest' | 'student';
  ticketId: string;
}): Promise<boolean> {
  if (!resend) return process.env.NODE_ENV === 'development';

  try {
    const siteUrl = getPublicSiteUrl();
    const adminTo = getAdminNotifyEmail();
    const label = source === 'student' ? 'Alumno' : 'Visitante (sin cuenta)';
    const { data, error } = await resend.emails.send({
      from: getFromAddress(),
      to: [adminTo],
      subject: `[Ticket ${label}] ${subject}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Nuevo ticket (${label})</h2>
          <p><strong>ID:</strong> ${ticketId}</p>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Asunto:</strong> ${subject}</p>
          <div style="background:#f4f4f4;padding:12px;border-radius:8px;white-space:pre-wrap;">${message.replace(/</g, '&lt;')}</div>
          <p style="margin-top:16px;"><a href="${siteUrl}/admin/tickets">Abrir panel de tickets</a></p>
        </div>
      `,
    });
    if (error) {
      console.error('❌ ticket admin notify:', error);
      return false;
    }
    console.log('✅ ticket admin notify:', data?.id);
    return true;
  } catch (e) {
    console.error('❌ sendTicketAdminNotifyEmail', e);
    return false;
  }
}

export async function sendTicketReplyEmail({
  email,
  name,
  subject,
  reply,
  source,
}: {
  email: string;
  name: string;
  subject: string;
  reply: string;
  source: 'guest' | 'student';
}): Promise<boolean> {
  if (!resend) {
    console.warn('Resend not configured, skipping ticket reply email');
    return process.env.NODE_ENV === 'development';
  }

  try {
    const siteUrl = getPublicSiteUrl();
    const loginHint =
      source === 'student'
        ? `<p>También puedes revisar tu panel: <a href="${siteUrl}/mi-panel">${siteUrl}/mi-panel</a></p>`
        : `<p>Si quieres crear una cuenta de alumno: <a href="${siteUrl}/cuenta/registro">${siteUrl}/cuenta/registro</a></p>`;

    const { data, error } = await resend.emails.send({
      from: getFromAddress(),
      to: [email],
      subject: `Respuesta a tu consulta: ${subject} - ${BRAND_NAME}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 28px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 26px;">${BRAND_NAME}</h1>
            <p style="margin: 8px 0 0;">Respuesta a tu ticket</p>
          </div>
          <div style="background: #fff; border: 1px solid #e5e7eb; border-top: none; padding: 28px;">
            <p>Hola ${name},</p>
            <p>Hemos respondido a tu consulta <strong>«${subject}»</strong>:</p>
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;white-space:pre-wrap;margin:16px 0;">${reply.replace(/</g, '&lt;')}</div>
            <p>Si necesitas más ayuda, responde a este correo o envía una nueva consulta.</p>
            ${loginHint}
          </div>
        </div>
      `,
    });
    if (error) {
      console.error('❌ ticket reply email:', error);
      return false;
    }
    console.log('✅ ticket reply email:', data?.id);
    return true;
  } catch (e) {
    console.error('❌ sendTicketReplyEmail', e);
    return false;
  }
}

export default {
  sendWelcomeEmail,
  sendAdminTempPasswordEmail,
  sendPasswordResetEmail,
  sendPasswordChangedEmail,
  sendTicketReceivedEmail,
  sendTicketAdminNotifyEmail,
  sendTicketReplyEmail,
};
