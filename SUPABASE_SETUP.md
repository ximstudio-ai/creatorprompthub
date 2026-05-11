# 🚀 Supabase Setup Guide

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click **New Project**
4. Fill in:
   - **Project name**: `CreatorPrompt Hub`
   - **Database password**: Create a strong password
   - **Region**: Choose closest to you
5. Click **Create new project** (takes 2-3 minutes)

---

## Step 2: Get Your API Keys

1. Wait for project to initialize
2. Go to **Settings** → **API**
3. Copy these values:
   ```
   NEXT_PUBLIC_SUPABASE_URL = URL (starts with https://)
   NEXT_PUBLIC_SUPABASE_ANON_KEY = anon public key
   ```
4. Go to **Settings** → **Database** → copy the password you set earlier
5. Service Role Key: **Settings** → **API** → `service_role` (secret key)

---

## Step 3: Configure Environment Variables

1. Create `.env.local` file in your project root
2. Copy from `.env.local.example`:
   ```bash
   cp .env.local.example .env.local
   ```
3. Fill in your Supabase values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

---

## Step 4: Enable OAuth Providers

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. **Create a new project**
3. Enable **Google+ API** (or People API)
4. Go to **Credentials** → **Create OAuth 2.0 ID**
5. Select **Web Application**
6. Under **Authorized redirect URIs**, add:
   ```
   https://your-project-ref.supabase.co/auth/v1/callback
   ```
7. Copy **Client ID** and **Client Secret**

#### In Supabase:

1. Go to **Authentication** → **Providers**
2. Find **Google** and click it
3. Paste **Client ID** and **Client Secret**
4. Enable the provider

### GitHub OAuth

1. Go to GitHub → **Settings** → **Developer settings** → **OAuth Apps**
2. Click **New OAuth App**
3. Fill in:
   - **Application name**: `CreatorPrompt Hub`
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**:
     ```
     https://your-project-ref.supabase.co/auth/v1/callback
     ```
4. Copy **Client ID** and **Client Secret**

#### In Supabase:

1. Go to **Authentication** → **Providers**
2. Find **GitHub** and click it
3. Paste **Client ID** and **Client Secret**
4. Enable the provider

---

## Step 5: Configure Redirect URLs in Supabase

1. Go to **Authentication** → **URL Configuration**
2. Under **Redirect URLs**, add:
   ```
   http://localhost:3000/auth/callback
   https://yourdomain.com/auth/callback  (for production)
   ```

---

## Step 6: Install Dependencies

```bash
npm install
```

---

## Step 7: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Test the Flow

1. You should be redirected to `/login`
2. Click **Continue with Google** or **Continue with GitHub**
3. Complete OAuth flow
4. Should redirect to `/dashboard` with your user info
5. Click **Sign Out** to logout

---

## 📁 Project Structure

```
.
├── app/
│   ├── auth/callback/route.ts       ← OAuth callback handler
│   ├── dashboard/page.tsx            ← Protected dashboard (Server Component)
│   ├── login/page.tsx                ← OAuth login page (Client Component)
│   ├── page.tsx                      ← Root redirect
│   └── layout.tsx                    ← Root layout
│
├── components/
│   └── LogoutButton.tsx              ← Logout button (Client Component)
│
├── lib/supabase/
│   ├── client.ts                     ← Browser client (for Client Components)
│   └── server.ts                     ← Server client (for Server Components)
│
├── middleware.ts                     ← Token refresh + route protection
├── .env.local                        ← Environment variables (add to .gitignore)
├── .env.local.example                ← Template
└── package.json
```

---

## 🔐 Security Notes

✅ **HttpOnly Cookies**: Tokens stored securely (not accessible to JavaScript)  
✅ **Automatic Token Refresh**: Middleware calls `getUser()` on every request  
✅ **Protected Routes**: Unauthenticated users redirected to `/login`  
✅ **Server-Side Validation**: `getUser()` used instead of `getSession()`  
✅ **Open Redirect Prevention**: Callback validates `redirectTo` starts with `/`  

---

## 🐛 Troubleshooting

### "Redirect URL mismatch"
- Make sure your OAuth callback URL in Supabase matches exactly
- For development: `http://localhost:3000/auth/callback`
- For production: `https://yourdomain.com/auth/callback`

### "Invalid API key"
- Check `.env.local` has correct values
- Make sure you're using ANON key (not service role key) for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### "CORS Error"
- Go to **Authentication** → **URL Configuration**
- Add your site URL to **Authorized redirect URLs**

### "Token expired / Session broken"
- Middleware should automatically refresh
- Check that `middleware.ts` exists and is running on your routes

---

## 📚 Useful Resources

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Next.js SSR Guide](https://supabase.com/docs/guides/auth/server-side-rendering)
- [OAuth Providers](https://supabase.com/docs/guides/auth/social-login)

---

**✨ Happy building! Your app is now ready to authenticate users with Supabase.**
