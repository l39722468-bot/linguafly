# Technical Specification - Contact Form and Course Launch Banner Verification

## Context
- **Language**: TypeScript / Next.js
- **Database**: Supabase
- **Email Service**: Resend
- **API Routes**:
  - `/api/contact`: Handles contact form submissions.
  - `/api/newsletter`: Handles launch banner subscriptions.

## Implementation Approach

### Verification Strategy
Since I cannot easily trigger browser-based form submissions in this environment without a running server and a browser, I will:
1. **Code Audit**: Verify the logic in the components and API routes.
2. **Database Schema Verification**: Check if the required Supabase tables exist and match the code's expectations.
3. **Integration Test Script**: Create a Node.js script to programmatically test the API endpoints (if possible) or at least verify the Supabase and Resend configurations.

### Database Schema
Based on the code, we need:
- `newsletter_subscribers`:
  - `email` (text)
  - `subscribed_at` (timestamp)
  - `source` (text)
- `contact_inquiries`:
  - `first_name` (text)
  - `last_name` (text)
  - `email` (text)
  - `phone` (text, nullable)
  - `subject` (text)
  - `message` (text)
  - `created_at` (timestamp)

### Verification Steps
1. **Verify Environment Variables**: Check if `.env` or equivalent exists and has the required keys.
2. **Check Supabase Migrations**: Look for migration files that create these tables.
3. **Create a Test Utility**: A script that attempts to use the `email-service.ts` or directly calls Resend/Supabase with test data.

## Delivery Phases
- **Phase 1: Audit**: Complete code and schema review.
- **Phase 2: Configuration Check**: Verify environment and connectivity.
- **Phase 3: Execution**: Run test calls to ensure data flow.
