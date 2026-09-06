# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements (Phase 1)
Integración inicial de formulario de contacto con HubSpot.
Ver [requirements.md](./requirements.md).

### [x] Step: Technical Specification (Phase 1)
Ver [spec.md](./spec.md).

### [x] Step: Planning (Phase 1)
Ver tareas en implementación.

### [x] Step: Implementation (Phase 1) - Contact Form Integration
Finalizado satisfactoriamente.

---

## New Phase: Subscription Ticket Integration

### [x] Step: Requirements (Phase 2)
Crear PRD para la integración de tickets tras suscripción.
Ver [requirements_subscription.md](./requirements_subscription.md).

### [x] Step: Technical Specification (Phase 2)
1. Definir cómo reutilizar la lógica de HubSpot en el webhook de Stripe.
2. Definir los parámetros del ticket de bienvenida.
Ver [spec_subscription.md](./spec_subscription.md).

### [x] Step: Planning (Phase 2)
1. Break down implementation into granular tasks in `plan.md`.

Save to `plan.md`.

### [x] Step: Implementation (Phase 2)

#### [x] 1. Refactor and Enhance `src/lib/crm/hubspot.ts`
Implement `hubspotRequest`, `syncHubSpotContact`, `createHubSpotTicket`, and `associateTicketWithContact` as exported functions.
- **Verification**: Verified with `test-hubspot-direct.mjs` using real account IDs.

#### [x] 2. Update `src/app/api/contact/route.ts` to use `hubspot.ts`
Refactor the contact endpoint to use the centralized library functions.
- **Verification**: Functional.

#### [x] 3. Update `src/app/api/webhooks/stripe/route.ts`
Integrate HubSpot contact sync and ticket creation in the `checkout.session.completed` handler.
- **Verification**: Logic integrated and tested.

#### [x] 4. Final Linting and Verification
Run project-wide linting and ensure type consistency.
- **Verification**: Build error fixed and connection verified.
