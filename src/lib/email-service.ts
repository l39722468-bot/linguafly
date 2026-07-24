// ============================================
// SERVICIO DE EMAIL
// Gestión de envío de emails con Resend
// ============================================

import { Resend } from 'resend';

// Solo inicializar Resend si la API key está disponible
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

if (!process.env.RESEND_API_KEY) {
  console.error('❌ RESEND_API_KEY no encontrada en las variables de entorno');
} else {
  console.log('📡 Resend configurado con API Key (primeros 5 caracteres):', process.env.RESEND_API_KEY.substring(0, 5) + '...');
}

/**
 * Enviar email de recuperación de contraseña
 */
export async function sendPasswordResetEmail(
  email: string,
  resetToken: string,
  userName: string
): Promise<boolean> {
  // Si Resend no está configurado, simular éxito en desarrollo
  if (!resend) {
    console.warn('Resend not configured, skipping email send');
    return process.env.NODE_ENV === 'development';
  }

  try {
    const resetUrl = `${process.env.NEXTAUTH_URL}/cuenta/resetear?token=${resetToken}`;

    const { data, error } = await resend.emails.send({
      from: 'Focus English <hola@updates.focus-on-english.com>',
      to: [email],
      subject: 'Recupera tu contraseña - Focus English',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                text-align: center;
                border-radius: 10px 10px 0 0;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border: 1px solid #e5e7eb;
                border-top: none;
              }
              .button {
                display: inline-block;
                background: #2563eb;
                color: white;
                padding: 12px 30px;
                text-decoration: none;
                border-radius: 6px;
                font-weight: 600;
                margin: 20px 0;
              }
              .footer {
                background: #f3f4f6;
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #6b7280;
                border-radius: 0 0 10px 10px;
                border: 1px solid #e5e7eb;
                border-top: none;
              }
              .warning {
                background: #fef3c7;
                border-left: 4px solid #f59e0b;
                padding: 15px;
                margin: 20px 0;
                border-radius: 4px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">🔐 Focus English</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Recuperación de contraseña</p>
            </div>
            
            <div class="content">
              <h2 style="color: #1f2937; margin-top: 0;">Hola ${userName},</h2>
              
              <p style="font-size: 16px; color: #4b5563;">
                Hemos recibido una solicitud para restablecer tu contraseña de Focus English.
              </p>
              
              <p style="font-size: 16px; color: #4b5563;">
                Haz clic en el siguiente botón para crear una nueva contraseña:
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" class="button">
                  Restablecer Contraseña
                </a>
              </div>
              
              <p style="font-size: 14px; color: #6b7280;">
                O copia y pega este enlace en tu navegador:
              </p>
              <p style="font-size: 12px; color: #2563eb; word-break: break-all; background: white; padding: 10px; border-radius: 4px;">
                ${resetUrl}
              </p>
              
              <div class="warning">
                <strong>⚠️ Importante:</strong>
                <ul style="margin: 10px 0; padding-left: 20px;">
                  <li>Este enlace expirará en <strong>1 hora</strong></li>
                  <li>Solo puedes usarlo una vez</li>
                  <li>Si no solicitaste este cambio, ignora este email</li>
                </ul>
              </div>
              
              <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
                ¿Tienes problemas? Contáctanos en <a href="mailto:soporte@focus-on-english.com" style="color: #2563eb;">soporte@focus-on-english.com</a>
              </p>
            </div>
            
            <div class="footer">
              <p style="margin: 0 0 10px 0;">
                © ${new Date().getFullYear()} Focus English. Todos los derechos reservados.
              </p>
              <p style="margin: 0;">
                Este email fue enviado a ${email}
              </p>
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
  // Si Resend no está configurado, simular éxito en desarrollo
  if (!resend) {
    console.warn('Resend not configured, skipping email send');
    return process.env.NODE_ENV === 'development';
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Focus English <hola@updates.focus-on-english.com>',
      to: [email],
      subject: '✅ Tu contraseña ha sido actualizada - Focus English',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                padding: 30px;
                text-align: center;
                border-radius: 10px 10px 0 0;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border: 1px solid #e5e7eb;
                border-top: none;
              }
              .alert {
                background: #fee2e2;
                border-left: 4px solid #ef4444;
                padding: 15px;
                margin: 20px 0;
                border-radius: 4px;
              }
              .footer {
                background: #f3f4f6;
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #6b7280;
                border-radius: 0 0 10px 10px;
                border: 1px solid #e5e7eb;
                border-top: none;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">✅ Focus English</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Contraseña actualizada</p>
            </div>
            
            <div class="content">
              <h2 style="color: #1f2937; margin-top: 0;">Hola ${userName},</h2>
              
              <p style="font-size: 16px; color: #4b5563;">
                Tu contraseña ha sido actualizada correctamente.
              </p>
              
              <p style="font-size: 16px; color: #4b5563;">
                Ya puedes iniciar sesión con tu nueva contraseña en:
              </p>
              
              <p style="text-align: center; margin: 20px 0;">
                <a href="${process.env.NEXTAUTH_URL}/cuenta/login" style="display: inline-block; background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600;">
                  Iniciar Sesión
                </a>
              </p>
              
              <div class="alert">
                <strong>🔒 ¿No fuiste tú?</strong>
                <p style="margin: 10px 0 0 0;">
                  Si no realizaste este cambio, tu cuenta puede estar comprometida. 
                  Contacta inmediatamente a nuestro equipo de soporte en 
                  <a href="mailto:soporte@focus-on-english.com" style="color: #ef4444;">soporte@focus-on-english.com</a>
                </p>
              </div>
              
              <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
                <strong>Consejos de seguridad:</strong>
              </p>
              <ul style="font-size: 14px; color: #6b7280;">
                <li>No compartas tu contraseña con nadie</li>
                <li>Usa una contraseña única y fuerte</li>
                <li>Actualiza tu contraseña regularmente</li>
              </ul>
            </div>
            
            <div class="footer">
              <p style="margin: 0 0 10px 0;">
                © ${new Date().getFullYear()} Focus English. Todos los derechos reservados.
              </p>
              <p style="margin: 0;">
                Este email fue enviado a ${email}
              </p>
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
 * Enviar email de bienvenida tras suscripción exitosa
 */
export async function sendWelcomeEmail({
  email,
  name,
  planName,
  tempPassword
}: {
  email: string,
  name: string,
  planName: string,
  tempPassword?: string
}): Promise<boolean> {
  // Si Resend no está configurado, simular éxito en desarrollo
  if (!resend) {
    console.warn('Resend not configured, skipping welcome email');
    return process.env.NODE_ENV === 'development';
  }

  try {
    const siteUrl = (
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXTAUTH_URL ||
      'https://linguafly.app'
    ).replace(/\/$/, '');
    const loginUrl = `${siteUrl}/cuenta/login`;
    const panelUrl = `${siteUrl}/mi-panel`;
    const fromAddress =
      process.env.EMAIL_FROM ||
      process.env.RESEND_FROM ||
      'Focus English <hola@updates.focus-on-english.com>';

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [email],
      subject: 'Tu acceso a Focus English está listo',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%);
                color: white;
                padding: 40px 30px;
                text-align: center;
                border-radius: 10px 10px 0 0;
              }
              .content {
                background: #ffffff;
                padding: 30px;
                border: 1px solid #e5e7eb;
                border-top: none;
              }
              .button {
                display: inline-block;
                background: #ff7e5f !important;
                color: white !important;
                padding: 14px 35px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 700;
                margin: 10px 8px;
              }
              .button-secondary {
                display: inline-block;
                background: #1f2937 !important;
                color: white !important;
                padding: 14px 35px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 700;
                margin: 10px 8px;
              }
              .plan-box {
                background: #fff7ed;
                border: 2px solid #ffedd5;
                padding: 20px;
                border-radius: 12px;
                margin: 20px 0;
                text-align: center;
              }
              .password-box {
                background: #f3f4f6;
                border: 1px dashed #d1d5db;
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
                text-align: center;
              }
              .footer {
                background: #f9fafb;
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #6b7280;
                border-radius: 0 0 10px 10px;
                border: 1px solid #e5e7eb;
                border-top: none;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0; font-size: 32px;">Focus English</h1>
              <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Tu suscripción ya está activa</p>
            </div>
            
            <div class="content">
              <h2 style="color: #1f2937; margin-top: 0;">¡Hola ${name}!</h2>
              
              <p style="font-size: 16px; color: #4b5563;">
                Tu pago se ha confirmado. Ya puedes entrar al <strong>panel del alumno</strong> y desbloquear el resto de unidades de los cursos A1–C2.
              </p>
              
              <div class="plan-box">
                <p style="margin: 0; color: #9a3412; font-size: 14px; font-weight: 600; text-transform: uppercase;">Plan activo</p>
                <h3 style="margin: 5px 0; color: #c2410c; font-size: 24px; font-weight: 800;">${planName}</h3>
              </div>

              ${tempPassword ? `
              <div class="password-box">
                <p style="margin: 0; color: #4b5563; font-size: 14px; font-weight: 600;">Tus claves de acceso</p>
                <div style="background: white; padding: 15px; border-radius: 6px; margin: 10px 0; border: 1px solid #e5e7eb; text-align: left;">
                  <p style="margin: 0; font-size: 14px; color: #6b7280;">Email</p>
                  <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600; color: #1f2937;">${email}</p>
                  <p style="margin: 0; font-size: 14px; color: #6b7280;">Contraseña temporal</p>
                  <p style="margin: 0; font-size: 18px; font-family: monospace; font-weight: bold; color: #ff7e5f;">${tempPassword}</p>
                </div>
                <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 12px;">Te recomendamos cambiarla al entrar en tu cuenta.</p>
              </div>
              ` : `
              <p style="font-size: 16px; color: #4b5563;">
                Accede con tu email: <strong>${email}</strong>. Si no recuerdas la contraseña, usa «Recuperar contraseña» en la página de login.
              </p>
              `}

              <p style="font-size: 15px; color: #4b5563;">
                Con tu suscripción puedes:
              </p>
              <ul style="font-size: 15px; color: #4b5563; padding-left: 20px;">
                <li>Entrar al panel del alumno</li>
                <li>Abrir todas las unidades de los cursos (no solo la unidad 1)</li>
                <li>Continuar desde donde lo dejaste</li>
              </ul>
              
              <div style="text-align: center;">
                <a href="${loginUrl}" class="button">Iniciar sesión</a>
                <a href="${panelUrl}" class="button-secondary">Ir a mi panel</a>
              </div>
              
              <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
                Si tienes dudas, responde a este correo o escríbenos a soporte@focus-on-english.com.
              </p>
            </div>
            
            <div class="footer">
              <p style="margin: 0 0 10px 0;">
                © ${new Date().getFullYear()} Focus English. Todos los derechos reservados.
              </p>
              <p style="margin: 0;">Este email se envió a ${email}</p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('❌ Error enviando email de bienvenida:', error);
      return false;
    }

    console.log('✅ Email de bienvenida enviado con éxito:', data?.id);
    return true;
  } catch (error) {
    console.error('❌ Error en sendWelcomeEmail:', error);
    return false;
  }
}

export default {
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendPasswordChangedEmail,
};
