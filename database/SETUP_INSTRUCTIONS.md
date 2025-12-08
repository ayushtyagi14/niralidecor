# Database Setup Instructions

## Step 1: Access Supabase Dashboard

1. Go to https://supabase.com
2. Log in to your account
3. Select your project: **ryhcfvenkfxteawewvpz**

## Step 2: Run Migration Script

1. In the Supabase dashboard, click on **SQL Editor** in the left sidebar
2. Click on **New Query**
3. Copy the entire contents of the file `database/migration.sql`
4. Paste it into the SQL Editor
5. Click **Run** button (or press Ctrl+Enter)

## Step 3: Verify Tables Created

1. Click on **Table Editor** in the left sidebar
2. You should see three new tables:
   - `blogs`
   - `case_studies`
   - `faqs`

## Step 4: Get Service Role Key

1. In the Supabase dashboard, click on **Settings** (gear icon)
2. Click on **API** in the left sidebar
3. Scroll down to **Project API keys**
4. Copy the **service_role** key (NOT the anon key)
5. Add it to your `.env.local` file:

```
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

⚠️ **IMPORTANT**: Never commit the service role key to Git. It has full access to your database.

## Step 5: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit http://localhost:3000/admin
3. Login with:
   - Username: `admin`
   - Password: `admin123`

4. Try creating a test blog post, case study, or FAQ

## Troubleshooting

### Error: "relation does not exist"
- Make sure you ran the migration script successfully
- Check the SQL Editor for any error messages

### Error: "Unauthorized" or "Invalid token"
- Make sure you added `ADMIN_TOKEN=secret123` to `.env.local`
- Make sure you added the `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`
- Restart your development server after adding environment variables

### Images not uploading
- Verify your DigitalOcean Spaces credentials in `.env.local`
- Check that the bucket name is correct
- Ensure the bucket has public read access enabled

## Optional: Add Sample Data

You can add sample data through the admin panel or by running this SQL in the SQL Editor:

```sql
-- Sample Blog Post
INSERT INTO blogs (slug, title, excerpt, content, author, category, status)
VALUES (
    'welcome-to-nirali-decor',
    'Welcome to Nirali Decor Blog',
    'Discover the latest trends in interior design and decoration.',
    'Welcome to our blog! Here we share insights, tips, and inspiration for creating beautiful spaces.',
    'Nirali Team',
    'General',
    'published'
);

-- Sample Case Study
INSERT INTO case_studies (title, client, year, summary, category, status)
VALUES (
    'Luxury Wedding Decoration',
    'The Grand Hotel',
    2024,
    'A stunning wedding decoration project featuring elegant floral arrangements and ambient lighting.',
    'Weddings',
    'published'
);

-- Sample FAQ
INSERT INTO faqs (question, answer)
VALUES (
    'What services do you offer?',
    'We offer a wide range of decoration services including wedding decoration, corporate events, home decoration, and more.'
);
```

## Next Steps

After setup is complete:

1. Customize the admin credentials in `/app/admin/page.js`
2. Change the `ADMIN_TOKEN` to a secure random string
3. Add navigation links to your header/menu for the new pages
4. Start creating content!
