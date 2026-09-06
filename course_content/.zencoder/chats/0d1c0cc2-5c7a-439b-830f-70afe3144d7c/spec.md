# Technical Specification: Paid Courses Dashboard Protection

## 1. Technical Context
- **Framework**: Next.js 15 (App Router)
- **Authentication**: Supabase Auth (SSR)
- **Database**: Supabase (Table: `user_profiles`)
- **Middleware**: Edge Runtime

## 2. Implementation Approach

### 2.1 Middleware Enhancement (`src/middleware.ts`)
The core protection will live in the middleware to ensure that no premium page content is even partially rendered for unauthorized users.

**Logic Flow**:
1. Identify if the current path is within the protected areas: `/dashboard`, `/curso`, `/cursos`, `/aula`, `/app`.
2. Get the authenticated user via `supabase.auth.getUser()`.
3. If no user, redirect to `/cuenta/login?next=...` (Current behavior, will be maintained).
4. If user exists:
   - Fetch the user's profile from the `user_profiles` table using the `id`.
   - Check `role` and `subscription_status`.
   - **Access Granted** if:
     - `role === 'admin'` OR
     - `subscription_status` is in `['active', 'trialing']`.
   - **Access Denied** if none of the above match.
5. On **Access Denied**:
   - Redirect to `/planes` with a query parameter indicating access was denied (e.g., `/planes?reason=subscription_required`).

### 2.2 Performance Considerations
- Database queries in middleware should be as efficient as possible.
- We will select only the necessary columns (`subscription_status`, `role`).
- Future optimization: Consider caching the subscription status in a secure cookie to avoid DB lookups on every page navigation within the dashboard. For the initial "maximum protection" phase, we will stick to real-time DB checks.

## 3. Source Code Changes

### `src/middleware.ts`
- Update the `middleware` function to include the profile check.
- Use `supabaseAdmin` or the current client (if permissions allow) to fetch the profile. Since middleware uses the user's session, the standard client should work if RLS allows the user to read their own profile (which it does).

## 4. Data Model / Interface Changes
No changes to the data model are required as the `user_profiles` table already contains the necessary fields.

## 5. Delivery Phases
1. **Phase 1**: Implement real-time subscription check in middleware.
2. **Phase 2**: Add unauthorized access feedback (toasts or messages on the `/planes` page).
3. **Phase 3**: Verification and testing with multiple user roles/statuses.

## 6. Verification Approach
- **Manual Testing**:
  - Test with a logged-out user (should go to login).
  - Test with a logged-in user with `subscription_status = 'inactive'` (should go to `/planes`).
  - Test with a logged-in user with `subscription_status = 'active'` (should access dashboard).
  - Test with an `admin` user with `subscription_status = 'inactive'` (should access dashboard).
- **Commands**:
  - `npm run lint`
  - `npm run type-check`
