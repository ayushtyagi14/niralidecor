# Troubleshooting: "posts.map is not a function" Error

## Problem
You're seeing the error: `TypeError: posts.map is not a function`

## Root Cause
This error occurs when the API returns an error object or undefined instead of an array of posts. This typically happens because:

1. **Database tables don't exist yet** (most common)
2. API route is returning an error
3. Network/connection issue

## Solution

### Step 1: Run the Database Migration

The database tables need to be created in Supabase. Follow these steps:

1. **Open Supabase Dashboard**
   - Go to https://supabase.com
   - Log in to your account
   - Select your project

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Run Migration Script**
   - Open the file: `database/migration.sql`
   - Copy ALL the SQL code
   - Paste it into the SQL Editor
   - Click "Run" (or press Ctrl+Enter)

4. **Verify Tables Created**
   - Click on "Table Editor" in the left sidebar
   - You should see these tables:
     - ✅ `blogs`
     - ✅ `case_studies`
     - ✅ `faqs`

### Step 2: Get Service Role Key

1. In Supabase dashboard, click **Settings** (gear icon)
2. Click **API** in the left sidebar
3. Scroll to **Project API keys**
4. Copy the **service_role** key (NOT the anon key)
5. Open `.env.local` file
6. Replace `your_service_role_key_here` with the actual key:

```env
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 3: Restart Development Server

1. Stop the server (Ctrl+C in terminal)
2. Start it again:
   ```bash
   npm run dev
   ```

### Step 4: Test

1. Visit http://localhost:3000/blog
2. You should see "No blog posts found" (not an error)
3. Visit http://localhost:3000/admin
4. Login and create a test blog post
5. Refresh the blog page - you should see your post!

## Quick Verification

Run this SQL in Supabase SQL Editor to check if tables exist:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('blogs', 'case_studies', 'faqs');
```

You should see 3 rows returned.

## Still Having Issues?

### Check Browser Console

1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for error messages
4. Common errors:

**"relation does not exist"**
- Tables not created yet
- Run the migration script

**"Invalid API key"**
- Service role key not set or incorrect
- Check `.env.local` file

**"Unauthorized"**
- Admin token not set
- Check `ADMIN_TOKEN` in `.env.local`

### Check API Response

1. Open browser DevTools (F12)
2. Go to Network tab
3. Refresh the page
4. Click on the `/api/blogs` request
5. Check the Response tab
6. Should see: `[]` (empty array) or `[{...}]` (array with posts)
7. If you see `{"error": "..."}`, that's the problem

## Common Error Messages

### "relation 'blogs' does not exist"
**Solution**: Run the database migration script

### "Invalid or expired token"
**Solution**: Add `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`

### "No such bucket"
**Solution**: Check DigitalOcean Spaces credentials

### Page shows "No blog posts found"
**Solution**: This is CORRECT! Create posts in the admin panel

## Next Steps After Fix

1. ✅ Verify all pages load without errors
2. ✅ Login to admin panel (`/admin`)
3. ✅ Create test content
4. ✅ Verify content appears on public pages

## Need More Help?

Check these files:
- `database/SETUP_INSTRUCTIONS.md` - Detailed database setup
- `ADMIN_GUIDE.md` - How to use admin panel
- `INTEGRATION_CHECKLIST.md` - Complete setup checklist
