# Blog, Case Studies & FAQ Integration

This document outlines the integration of blog, case studies, and FAQ functionality into the main Nirali Decor project.

## Features Added

1. **Blog System**
   - Blog listing page with filtering and search
   - Individual blog post pages
   - Admin panel for managing blog posts
   - Support for categories, tags, and draft/published status
   - Image upload to DigitalOcean Spaces
   - Markdown-like formatting support

2. **Case Studies**
   - Case studies listing page with filtering
   - Individual case study detail pages
   - Metrics display
   - Admin panel for managing case studies
   - Image upload support

3. **FAQs**
   - FAQ page with accordion interface
   - Admin panel for managing FAQs
   - Markdown-like formatting support

4. **Admin Panel**
   - Secure login system
   - Manage all content types from one place
   - Image upload functionality
   - Rich text editing with formatting toolbar
   - Draft/Published status management

## Setup Instructions

### 1. Environment Variables

Add the following to your `.env.local` file:

```env
# Admin Token (change this to a secure random string)
ADMIN_TOKEN=secret123

# Supabase Service Role Key (for admin operations)
# Get this from your Supabase project settings
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 2. Database Setup

Run the SQL migration script to create the necessary tables in Supabase:

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `database/migration.sql`
4. Run the query

This will create:
- `blogs` table
- `case_studies` table
- `faqs` table
- Necessary indexes for performance
- Row Level Security (RLS) policies

### 3. Install Dependencies

The project already has all necessary dependencies. If you need to reinstall:

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

## Pages Created

### Public Pages

1. **Blog** - `/blog`
   - Lists all published blog posts
   - Filter by category
   - Search functionality

2. **Blog Detail** - `/blog/[slug]`
   - Full blog post content
   - Author information
   - Tags display

3. **Case Studies** - `/case-studies`
   - Lists all published case studies
   - Filter by category

4. **Case Study Detail** - `/case-studies/[id]`
   - Full case study details
   - Metrics display
   - Hero image

5. **FAQ** - `/faq`
   - Accordion-style FAQ display
   - Formatted answers

### Admin Pages

1. **Admin Panel** - `/admin`
   - Login: username: `admin`, password: `admin123`
   - Manage blogs, case studies, and FAQs
   - Upload images
   - Draft/publish content

## API Routes

### Blogs
- `GET /api/blogs` - Get all blogs (published only for public)
- `GET /api/blogs/[slug]` - Get single blog by slug
- `POST /api/blogs` - Create new blog (admin only)
- `PUT /api/blogs/[slug]` - Update blog (admin only)
- `DELETE /api/blogs/[slug]` - Delete blog (admin only)

### Case Studies
- `GET /api/case-studies` - Get all case studies
- `GET /api/case-studies/[id]` - Get single case study
- `POST /api/case-studies` - Create new case study (admin only)
- `PUT /api/case-studies/[id]` - Update case study (admin only)
- `DELETE /api/case-studies/[id]` - Delete case study (admin only)

### FAQs
- `GET /api/faqs` - Get all FAQs
- `GET /api/faqs/[id]` - Get single FAQ
- `POST /api/faqs` - Create new FAQ (admin only)
- `PUT /api/faqs/[id]` - Update FAQ (admin only)
- `DELETE /api/faqs/[id]` - Delete FAQ (admin only)

### Upload
- `POST /api/upload/image` - Upload image to DigitalOcean Spaces (admin only)

## Components Created

1. **FormattedTextarea** - `/components/Blog/FormattedTextarea.js`
   - Rich text editor with formatting toolbar
   - Support for bold, italic, links, and code

2. **Accordion** - `/components/Blog/Accordion.js`
   - Collapsible FAQ display
   - Animated transitions

## Styling

All pages have dedicated CSS files with modern, responsive designs:
- `/app/blog/blog.css`
- `/app/case-studies/case-studies.css`
- `/app/faq/faq.css`
- `/app/admin/admin.css`

## Security

- Admin routes are protected with token authentication
- Row Level Security (RLS) enabled on all tables
- Public can only read published content
- Admin operations require authentication token

## Image Upload

Images are uploaded to DigitalOcean Spaces with the following features:
- File type validation (images only)
- File size limit (5MB)
- Unique filename generation
- Public read access

## Markdown Support

Content supports markdown-like formatting:
- `**bold**` → **bold**
- `_italic_` → _italic_
- `` `code` `` → `code`
- `[link](url)` → [link](url)

## Next Steps

1. Update navigation to include links to new pages
2. Customize admin credentials (change username/password in `/app/admin/page.js`)
3. Change `ADMIN_TOKEN` in `.env.local` to a secure random string
4. Add your Supabase service role key to `.env.local`
5. Run the database migration
6. Test all functionality

## Notes

- The admin panel uses localStorage for authentication (simple demo implementation)
- For production, consider implementing proper JWT-based authentication
- All data is stored in Supabase (PostgreSQL)
- Images are stored in DigitalOcean Spaces
- No Git operations were performed as requested
