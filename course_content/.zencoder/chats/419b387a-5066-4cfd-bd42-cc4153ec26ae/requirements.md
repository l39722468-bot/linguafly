# Product Requirements Document (PRD) - Contact Form and Course Launch Banner Verification

## Overview
The goal of this task is to verify the correct functionality of the contact form and the course launch banner on the Focus English platform. These features are critical for lead generation and user engagement.

## Features to Verify

### 1. Contact Form
- **Location**: `/contacto` ([./src/app/contacto/page.tsx](./src/app/contacto/page.tsx))
- **Functionality**:
  - Collect user details (First Name, Last Name, Email, Phone, Subject, Message).
  - Submit data to `/api/contact` ([./src/app/api/contact/route.ts](./src/app/api/contact/route.ts)).
  - **Verification Points**:
    - [ ] Data is correctly saved in Supabase table `contact_inquiries`.
    - [ ] Auto-reply email is sent to the user via Resend.
    - [ ] Notification email is sent to the admin via Resend.

### 2. Course Launch Banner
- **Location**: Home Page ([./src/app/page.tsx](./src/app/page.tsx)) and other pages using the `CourseLaunchBanner` component ([./src/components/CourseLaunchBanner.tsx](./components/CourseLaunchBanner.tsx)).
- **Functionality**:
  - Collect user email for launch notification.
  - Submit data to `/api/newsletter` ([./src/app/api/newsletter/route.ts](./src/app/api/newsletter/route.ts)).
  - **Verification Points**:
    - [ ] Email is correctly saved in Supabase table `newsletter_subscribers`.
    - [ ] Thank you email is sent to the user via Resend.
    - [ ] Notification email is sent to the admin via Resend.

## Technical Requirements
- **Supabase**: Ensure tables `contact_inquiries` and `newsletter_subscribers` exist and have the correct schema.
- **Resend**: Ensure API key is configured and emails are being triggered correctly.
- **Environment Variables**:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `RESEND_API_KEY`
  - `ADMIN_EMAIL`

## Success Criteria
- Successful form submissions result in database records in Supabase.
- Emails are logged as sent (or actually sent if in a live environment).
- Proper error handling is in place for missing configurations or failed service calls.

## User Clarifications Needed
- Should I perform a live test (sending real emails) or verify the logic and configuration? (Assumed: Verify logic and run a test script if possible).
- Are there specific test emails to use?
