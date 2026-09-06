# PRD - HubSpot Inquiry Integration

## User Story
Como administrador de Focus English, quiero que las consultas enviadas a través del formulario de contacto de la web se sincronicen automáticamente con HubSpot, creando un ticket de soporte para que mi equipo pueda atenderlas utilizando respuestas preconfiguradas.

## Functional Requirements
1. **Sincronización de Contacto**: Cuando un usuario envía un mensaje en `/contacto`, el sistema debe buscar si el contacto ya existe en HubSpot por su email.
   - Si existe, se actualizan sus datos (nombre, apellidos, teléfono).
   - Si no existe, se crea un nuevo contacto.
2. **Creación de Ticket**: Para cada consulta enviada, se debe crear un **Ticket** en HubSpot.
   - El ticket debe estar asociado al contacto.
   - El ticket debe incluir el asunto (`subject`) y el cuerpo del mensaje (`message`) de la consulta.
   - El ticket debe asignarse a un pipeline de soporte (por defecto "support_pipeline").
3. **Persistencia en Supabase**: Se debe mantener el flujo actual de guardar la consulta en la tabla `contact_inquiries` de Supabase.
4. **Notificaciones**: Se debe mantener el flujo actual de envío de emails a través de Resend (auto-respuesta al usuario y notificación al admin).

## Technical Requirements
- **Endpoint**: Modificar `src/app/api/contact/route.ts` para incluir la lógica de HubSpot.
- **HubSpot API**: Utilizar la API de CRM v3 para Objetos (Contacts y Tickets) y Asociaciones.
- **Error Handling**: Si la sincronización con HubSpot falla, la consulta debe guardarse igualmente en Supabase y notificarse por email, pero se debe registrar el error en los logs del servidor.

## Assumptions
- Se utilizará la variable de entorno `HUBSPOT_API_KEY` (o `HUBSPOT_ACCESS_TOKEN`) ya existente.
- Se usará el pipeline de tickets por defecto de HubSpot a menos que se especifique lo contrario.

## Success Criteria
- Al enviar el formulario de contacto, aparece un nuevo ticket en el portal de HubSpot.
- El ticket está vinculado al contacto que envió el formulario.
- Se conservan las funcionalidades actuales (Supabase + Resend).
