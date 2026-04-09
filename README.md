# Supabase OAuth — Next.js App Router

Google & GitHub OAuth with Supabase, Next.js 14 App Router, TypeScript.
Production-ready: secure token handling, protected routes, clean UI.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy env template and fill in your keys
cp .env.local.example .env.local

# 3. Run dev server
npm run dev
```

---

## Supabase Dashboard Setup

### 1. Enable OAuth Providers

Go to **Authentication → Providers** and enable:

| Provider | Required fields |
|----------|----------------|
| Google   | Client ID + Client Secret (from Google Cloud Console → Credentials → OAuth 2.0) |
| GitHub   | Client ID + Client Secret (from GitHub → Settings → Developer Settings → OAuth Apps) |

### 2. Add Redirect URLs

Go to **Authentication → URL Configuration → Redirect URLs** and add:

```
http://localhost:3000/auth/callback
https://yourdomain.com/auth/callback
```

### 3. Google Cloud Console Setup

1. Create a project at console.cloud.google.com
2. Enable the **Google+ API** (or People API)
3. Create OAuth 2.0 credentials (Web application)
4. Add authorised redirect URI:
   ```
   https://your-project-ref.supabase.co/auth/v1/callback
   ```
   *(Supabase handles Google → your app redirect internally)*

### 4. GitHub OAuth App Setup

1. GitHub → Settings → Developer Settings → OAuth Apps → New
2. Homepage URL: `http://localhost:3000`
3. Callback URL:
   ```
   https://your-project-ref.supabase.co/auth/v1/callback
   ```

---

## Project Structure

```
.
├── app/
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts      ← Exchange OAuth code → session cookies
│   ├── dashboard/
│   │   └── page.tsx          ← Protected page (Server Component)
│   ├── login/
│   │   └── page.tsx          ← OAuth sign-in UI (Client Component)
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx              ← Root redirect (/ → /login or /dashboard)
│
├── components/
│   ├── LogoutButton.tsx      ← Client Component (needs onClick)
│   └── OAuthButton.tsx       ← Reusable provider button
│
├── lib/
│   └── supabase/
│       ├── client.ts         ← createBrowserClient (Client Components)
│       └── server.ts         ← createServerClient (Server Components + RSC)
│
├── middleware.ts             ← Token refresh + route protection
├── types/
│   └── auth.ts               ← Shared TypeScript types
├── .env.local                ← Environment variables (never commit)
├── package.json
└── tsconfig.json
```

---

## Authentication Flow

```
User clicks "Continue with Google"
         │
         ▼
signInWithOAuth({ provider: "google" })
  → Browser navigates to Google's OAuth page
         │
         ▼
User approves → Google sends ?code=... to Supabase
  → Supabase validates → redirects to /auth/callback?code=...
         │
         ▼
app/auth/callback/route.ts
  exchangeCodeForSession(code)
  → Sets HttpOnly session cookies (access_token + refresh_token)
  → Redirects to /dashboard
         │
         ▼
middleware.ts runs on every request
  → Calls getUser() to validate & refresh token
  → Blocks unauthenticated access to protected routes
         │
         ▼
dashboard/page.tsx (Server Component)
  → getUser() — server-validated, not just cookie-read
  → Renders user data
```

---

## Security Notes

| Practice | Implementation |
|----------|---------------|
| **Never trust only cookies** | All server-side checks use `getUser()` (validates JWT with Supabase server), not `getSession()` |
| **Token refresh** | Middleware calls `getUser()` on every request, which auto-refreshes expiring tokens |
| **HttpOnly cookies** | `@supabase/ssr` stores tokens in HttpOnly cookies — not accessible to JS |
| **Open-redirect prevention** | Callback route validates `redirectTo` starts with `/` before redirecting |
| **Service role key** | Never prefixed with `NEXT_PUBLIC_` — never exposed to the browser |
| **Error info** | Auth errors logged server-side; only safe messages shown to the user |

---

## Key Rules

```
✅ Use createBrowserClient()  in "use client" components
✅ Use createServerClient()   in Server Components, Route Handlers, Middleware
✅ Always call getUser()      for auth validation (not getSession())
✅ Call getUser() in Middleware on every request (token refresh)
✅ router.refresh() before router.push() on logout (clears RSC cache)

❌ Never use getSession()     for security-sensitive checks
❌ Never expose SUPABASE_SERVICE_ROLE_KEY to the browser
❌ Never skip Middleware      — tokens expire silently without it
```
