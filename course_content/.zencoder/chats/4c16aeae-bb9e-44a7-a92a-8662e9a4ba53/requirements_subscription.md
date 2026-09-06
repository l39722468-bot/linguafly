# PRD - HubSpot Subscription Ticket Integration

## User Story
Como administrador de Focus English, quiero que cuando un usuario compre una suscripción, se cree automáticamente un ticket en HubSpot para que mi equipo pueda darle la bienvenida personalizada y resolver sus dudas iniciales utilizando respuestas preconfiguradas.

## Functional Requirements
1. **Detección de Suscripción**: La lógica debe activarse cuando se recibe un webhook de Stripe `checkout.session.completed`.
2. **Creación/Actualización de Contacto**: Asegurar que el contacto existe en HubSpot (esto ya se hace parcialmente, pero se puede mejorar).
3. **Creación de Ticket de Bienvenida**:
   - Crear un ticket en HubSpot.
   - Asunto: `Suscripción Iniciada: [Nombre del Plan]`
   - Contenido: `El usuario [Email] ha adquirido el plan [Plan]. Iniciar flujo de bienvenida.`
   - Asociar el ticket con el contacto recién creado/actualizado.

## Technical Requirements
- **Endpoint**: Modificar `src/app/api/webhooks/stripe/route.ts`.
- **HubSpot API**: Usar los mismos helpers o patrones que en `src/app/api/contact/route.ts` (aunque aquí es una ruta Edge/Node distinta, podemos abstraer o replicar los helpers).
- **Error Handling**: Si HubSpot falla, el proceso de Stripe/Supabase NO debe detenerse.

## Assumptions
- Se usará `HUBSPOT_ACCESS_TOKEN` del entorno.
- El pipeline de tickets será el predeterminado.

## Success Criteria
- Tras una compra exitosa en Stripe (simulada o real), aparece un nuevo ticket de "Suscripción Iniciada" en HubSpot vinculado al cliente.
