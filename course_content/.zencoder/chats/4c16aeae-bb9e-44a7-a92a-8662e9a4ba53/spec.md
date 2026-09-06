# Technical Specification - HubSpot Ticket Integration

## Technical Context
- **Framework**: Next.js 15 (App Router).
- **Runtime**: Node.js (for `src/app/api/contact/route.ts`).
- **External API**: HubSpot CRM API v3.
- **Dependencies**: Native `fetch` API.
- **Environment Variables**: `HUBSPOT_API_KEY`.

## Implementation Approach
We will modify the existing `POST` handler in `src/app/api/contact/route.ts`. The new logic will be executed after saving to Supabase but before (or in parallel with) sending emails.

### HubSpot Integration Logic
1. **Sync Contact**:
   - Reuse the pattern from `src/app/api/hubspot/sync-profile/route.ts`.
   - Search contact by `email`.
   - If exists: `PATCH /crm/v3/objects/contacts/{contactId}`.
   - If not exists: `POST /crm/v3/objects/contacts`.
2. **Create Ticket**:
   - `POST /crm/v3/objects/tickets`.
   - Properties:
     - `subject`: The subject from the form.
     - `content`: The message from the form.
     - `hs_pipeline`: Default (or configurable).
     - `hs_pipeline_stage`: Default (or "new").
3. **Associate Ticket with Contact**:
   - `PUT /crm/v3/objects/tickets/{ticketId}/associations/contacts/{contactId}/228`.
   - Association Type ID `228` is typically "Ticket to Contact".

## Source Code Changes
- **Modified**: [./src/app/api/contact/route.ts](./src/app/api/contact/route.ts)
  - Add HubSpot API helper functions (or inline logic).
  - Integrate HubSpot sync into the `POST` workflow.
  - Add robust error logging for HubSpot failures.

## Data Model Changes
- **HubSpot**: 
  - New `Ticket` objects created.
  - Associations created between `Tickets` and `Contacts`.
- **Supabase**: No changes to `contact_inquiries`.

## Delivery Phases
1. **Phase 1: HubSpot Contact Sync**: Ensure user details are updated in HubSpot.
2. **Phase 2: HubSpot Ticket Creation**: Create a ticket with form data.
3. **Phase 3: Association**: Link the ticket to the contact.

## Verification Approach
- **Manual Test**: Submit the contact form on the web and verify:
  1. Contact is created/updated in HubSpot.
  2. Ticket is created in HubSpot with correct data.
  3. Ticket is associated with the contact.
- **Logs**: Monitor server logs for API responses and potential errors.
- **Existing Tests**: Run `npm test` to ensure no regressions in other areas.
