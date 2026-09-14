# Deployment Guide - P.S Service Provider

## ✅ Implementation Complete

The backend integration with Supabase is now complete. Here's what was implemented:

### What Was Built

1. **Database Schema** (`supabase/migrations/001_initial_schema.sql`)
   - 7 tables: services, faqs, testimonials, hero_messages, business_info, enquiries, enquiry_status_history
   - Row Level Security (RLS) policies for public read + authenticated write
   - Indexes for performance
   - Auto-updated timestamps
   - 6-month data retention function

2. **Seed Data** (`supabase/seed.sql`)
   - All default services, FAQs, testimonials, hero messages
   - Business info configuration

3. **Supabase Integration**
   - `src/lib/supabase.ts` - Client initialization
   - `src/lib/database.ts` - All CRUD operations
   - `src/lib/auth.ts` - Authentication helpers
   - `src/lib/storage.ts` - Image upload support
   - `src/types/database.ts` - TypeScript types

4. **Updated Application**
   - `src/context/AppContext.tsx` - Now uses Supabase instead of localStorage
   - All admin operations are async and persist to database
   - Optimistic updates for better UX
   - Graceful fallback to demo mode if Supabase not configured

5. **Configuration Files**
   - `.env.example` - Environment variable template
   - `vercel.json` - SPA routing configuration
   - `.gitignore` - Updated with env files

---

## 🚀 Deployment Steps

### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Sign up / Sign in
3. Click "New Project"
4. Fill in:
   - **Name:** `ps-service-provider`
   - **Database Password:** (save this somewhere safe!)
   - **Region:** Choose closest to your users (e.g., Southeast Asia for India)
5. Wait for provisioning (~2 minutes)

### Step 2: Get Supabase Credentials

1. In your Supabase project, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://abcdefg.supabase.co`)
   - **anon public key** (starts with `eyJ...`)

### Step 3: Create Database Tables

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`
4. Paste and click **Run**
5. Verify tables were created in **Table Editor**

### Step 4: Seed Initial Data

1. In **SQL Editor**, create new query
2. Copy contents of `supabase/seed.sql`
3. Paste and click **Run**
4. Verify data in **Table Editor**

### Step 5: Create Admin User

1. Go to **Authentication** → **Users**
2. Click **Add user** → **Create new user**
3. Fill in:
   - **Email:** `admin@psserviceprovider.com` (or your preferred email)
   - **Password:** Choose a strong password
   - **Auto Confirm User:** ✅ Check this box
4. Click **Create user**

### Step 6: Create Storage Bucket (for images)

1. Go to **Storage**
2. Click **New bucket**
3. Name: `cms-images`
4. **Public bucket:** ✅ Check this
5. Click **Create bucket**

### Step 7: Configure Environment Variables Locally

1. Create a `.env.local` file in the project root
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

3. Test locally: `npm run dev`

### Step 8: Deploy to Vercel

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit with Supabase integration"
   git remote add origin https://github.com/yourusername/ps-service-provider.git
   git push -u origin main
   ```

2. Go to https://vercel.com
3. Sign up / Sign in
4. Click **Add New** → **Project**
5. Import your GitHub repository
6. Configure:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
7. Click **Deploy**

### Step 9: Add Environment Variables to Vercel

1. In your Vercel project, go to **Settings** → **Environment Variables**
2. Add these for **Production**:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your anon key
3. Add same variables for **Preview** (for staging)
4. Redeploy: Go to **Deployments** → Latest → **Redeploy**

### Step 10: Verify Deployment

1. Visit your Vercel URL
2. Test the booking form → check Supabase `enquiries` table
3. Go to `/admin/login`
4. Login with your admin credentials
5. Test CMS operations (add/edit/delete services, FAQs, etc.)
6. Verify changes persist after page refresh

---

## 🔒 Security Configuration

### Row Level Security (RLS)

The migration already includes RLS policies:

**Public Access (no auth required):**
- ✅ Read active services, FAQs, testimonials, hero messages, business info
- ✅ Insert enquiries (booking form)

**Authenticated Admin Only:**
- ✅ Full CRUD on all tables
- ✅ Read all enquiries (including inactive content)

### Admin Authentication

- Uses Supabase Auth (email/password)
- Passwords are hashed server-side by Supabase
- Session tokens are httpOnly cookies
- No credentials in frontend code

---

## 📊 Database Tables

| Table | Purpose | Public Read | Public Write |
|-------|---------|-------------|--------------|
| `services` | Pest control services | ✅ Active only | ❌ |
| `faqs` | Frequently asked questions | ✅ Active only | ❌ |
| `testimonials` | Customer reviews | ✅ Active only | ❌ |
| `hero_messages` | Homepage rotating text | ✅ Active only | ❌ |
| `business_info` | Company details | ✅ | ❌ |
| `enquiries` | Customer bookings | ❌ | ✅ Insert only |
| `enquiry_status_history` | Status change log | ❌ | ❌ |

---

## 🎯 Features Implemented

### ✅ Completed

- [x] PostgreSQL database schema
- [x] Supabase integration
- [x] Secure admin authentication (Supabase Auth)
- [x] Enquiry creation and storage
- [x] Enquiry status workflow (New → Contacted → Quoted → Booked → Completed)
- [x] Admin search and filters
- [x] CMS for services, FAQs, testimonials, hero messages, business info
- [x] Immediate publishing (no draft/approval workflow)
- [x] Image upload support (Supabase Storage)
- [x] WhatsApp click-to-chat (preserved)
- [x] 6-month data retention function
- [x] Error handling and loading states
- [x] Environment variables (.env.example)
- [x] Vercel deployment config (vercel.json)
- [x] Row Level Security policies

### 🔄 Optional (Future Enhancement)

- [ ] Cloudflare Turnstile integration (client-side widget ready, server verification needs Edge Function)
- [ ] Email notifications (needs Supabase Edge Function or external service)
- [ ] Server-side rate limiting (needs Edge Function)
- [ ] Automated data retention cron job (needs pg_cron or Edge Function)

---

## 🧪 Testing Checklist

### Public Website
- [ ] Home page loads
- [ ] Services page displays all services
- [ ] Booking form submits successfully
- [ ] WhatsApp links work
- [ ] Call links work
- [ ] All pages responsive on mobile

### Admin Panel
- [ ] Login works with Supabase credentials
- [ ] Dashboard shows enquiry counts
- [ ] Can view enquiry details
- [ ] Can update enquiry status
- [ ] Can add admin notes
- [ ] Can search/filter enquiries
- [ ] Can add/edit/delete services
- [ ] Can add/edit/delete FAQs
- [ ] Can add/edit/delete testimonials
- [ ] Can edit hero messages
- [ ] Can update business info
- [ ] Changes persist after refresh
- [ ] Logout works

### Database
- [ ] Enquiries table has new submissions
- [ ] Status history is recorded
- [ ] CMS changes reflected in database
- [ ] RLS policies working (public can't modify admin data)

---

## 💰 Cost Estimate

| Service | Tier | Cost |
|---------|------|------|
| **Supabase** | Free | $0/month |
| **Vercel** | Hobby | $0/month |
| **GitHub** | Free | $0/month |
| **Domain** | Optional | ~₹800-1200/year |
| **Total** | | **₹0/month** |

**Supabase Free Tier Limits:**
- 500 MB database
- 1 GB file storage
- 2 GB bandwidth
- 50,000 monthly active users
- 7-day backup retention

This is more than enough for the initial deployment.

---

## 🐛 Troubleshooting

### "Supabase credentials not configured" warning
- Check `.env.local` file exists
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
- Restart dev server after adding env vars

### Admin login fails
- Verify admin user exists in Supabase Auth
- Check email is confirmed
- Try resetting password via Supabase dashboard

### Data not persisting
- Check browser console for errors
- Verify RLS policies allow the operation
- Check Supabase logs in dashboard

### Images not uploading
- Verify `cms-images` bucket exists
- Check bucket is public
- Verify file size < 50MB (Supabase limit)

---

## 📝 Environment Variables Reference

```env
# Required
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...

# Optional (for future features)
VITE_TURNSTILE_SITE_KEY=0x4AAAAAAA...
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

---

## 🎉 You're Ready!

Your P.S Service Provider website is now a full-stack application with:
- ✅ Persistent database
- ✅ Secure authentication
- ✅ CMS for content management
- ✅ Lead management system
- ✅ Ready for production deployment

Follow the deployment steps above to go live!
