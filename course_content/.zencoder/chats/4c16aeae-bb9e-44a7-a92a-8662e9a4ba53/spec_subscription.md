# Technical Specification - Subscription Ticket Integration (Phase 2)

## Technical Context
- **Framework**: Next.js 15.
- **Integration Point**: [./src/app/api/webhooks/stripe/route.ts](./src/app/api/webhooks/stripe/route.ts).
- **External API**: HubSpot CRM API v3 (Contacts, Tickets, Associations).

## Implementation Approach

### 1. Centralize HubSpot Logic
Currently, HubSpot logic is duplicated or implemented differently in `src/app/api/contact/route.ts` and `src/app/api/hubspot/sync-profile/route.ts`.
We will enhance [./src/lib/crm/hubspot.ts](./src/lib/crm/hubspot.ts) to include:
- `hubspotRequest`: Generic fetch helper.
- `syncHubSpotContact`: Unified search/create/update logic.
- `createHubSpotTicket`: Logic for creating tickets.
- `associateTicketWithContact`: Logic for linking tickets to contacts.

### 2. Stripe Webhook Integration
In [./src/app/api/webhooks/stripe/route.ts](./src/app/api/webhooks/stripe/route.ts), specifically inside the `checkout.session.completed` handler:
1. Extract customer details (`email`, `firstName`, `lastName`, `planName`).
2. Sync the contact in HubSpot (set `lifecyclestage` to `customer`).
3. Create a ticket with:
   - `subject`: `Suscripción Iniciada: ${planName}`
   - `content`: `El usuario ${customerEmail} ha adquirido el plan ${planName}. Proceder con el alta.`
4. Associate the ticket with the contact.

## Source Code Changes
- **Modified**: [./src/lib/crm/hubspot.ts](././src/lib/crm/hubspot.ts)
  - Refactor to include unified helpers.
- **Modified**: [./src/app/api/webhooks/stripe/route.ts](./src/app/api/webhooks/stripe/route.ts)
  - Replace manual HubSpot calls with unified helpers.
  - Add ticket creation and association logic.

## Data Model Changes
- **HubSpot**: 
  - `Contact` updated (`lifecyclestage`, subscription properties).
  - New `Ticket` created.
  - New `Association` between Ticket and Contact.

## Delivery Phases
1. **Phase 1**: Refactor `hubspot.ts` and test with existing flows.
2. **Phase 2**: Implement ticket creation in Stripe webhook.
3. **Phase 3**: End-to-end verification.

## Verification Approach
- **Manual Webhook Test**: Use Stripe CLI to trigger `checkout.session.completed` or mock the request.
- **HubSpot Validation**: Check if the contact is marked as "Customer" and a ticket is created/linked.
- **Linting**: Ensure `npm run lint` passes.
