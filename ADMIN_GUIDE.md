# Admin Panel Quick Reference Guide

## Accessing the Admin Panel

1. Navigate to: `http://localhost:3000/admin` (or your domain + `/admin`)
2. Login credentials:
   - **Username**: `admin`
   - **Password**: `admin123`

## Managing Blog Posts

### Creating a New Blog Post

1. Click on the **Blog Posts** tab
2. Scroll down to the form
3. Fill in the required fields:
   - **Title** * (required)
   - **Author** (optional, defaults to "Admin")
   - **Category** (e.g., "Design Tips", "News", "Events")
   - **Status**: Choose "Draft" or "Published"
   - **Cover Image URL**: Paste URL or upload image
   - **Author Avatar URL**: Paste URL or upload image
   - **Tags**: Comma-separated (e.g., "design, tips, modern")
   - **Excerpt**: Short description (auto-generated if left empty)
   - **Content** * (required): Main blog content
4. Click **Add Blog Post**

### Uploading Images

1. Click the **Upload Cover** or **Upload Avatar** button
2. Select an image file (JPEG, PNG, GIF, WebP, max 5MB)
3. Wait for upload to complete
4. The URL will be automatically filled in

### Editing a Blog Post

1. Find the blog post in the list
2. Click **Edit** button
3. Modify the fields
4. Click **Update Blog Post**
5. Click **Cancel** to discard changes

### Deleting a Blog Post

1. Find the blog post in the list
2. Click **Delete** button
3. Confirm the deletion

### Using the Rich Text Editor

The content field supports markdown-like formatting:

- **Bold**: Wrap text with `**` → `**bold text**`
- **Italic**: Wrap text with `_` → `_italic text_`
- **Code**: Wrap text with `` ` `` → `` `code` ``
- **Link**: Use format `[text](url)` → `[Click here](https://example.com)`

Or use the toolbar buttons:
- Click **Bold** to wrap selected text
- Click **Italic** to wrap selected text
- Click **Link** to insert a link
- Click **Code** to wrap as code

## Managing Case Studies

### Creating a New Case Study

1. Click on the **Case Studies** tab
2. Scroll down to the form
3. Fill in the fields:
   - **Title** * (required)
   - **Client** * (required)
   - **Year** (optional, defaults to current year)
   - **Status**: Choose "Draft" or "Published"
   - **Hero Image URL**: Paste URL or upload image
   - **Category** (e.g., "Weddings", "Corporate", "Home")
   - **Tags**: Comma-separated
   - **Metrics**: Format: `Label: Value, Label: Value`
     - Example: `Guest Count: 800, Setup Time: 18 hours, Budget: $50,000`
   - **Summary**: Detailed description
4. Click **Add Case Study**

### Metrics Format

Metrics should be entered as comma-separated pairs:
```
Label: Value, Label: Value, Label: Value
```

Example:
```
Guest Count: 800, Setup Time: 18 hours, Satisfaction: 100%, Budget: $50,000
```

## Managing FAQs

### Creating a New FAQ

1. Click on the **FAQs** tab
2. Scroll down to the form
3. Fill in the fields:
   - **Question** * (required)
   - **Answer** * (required): Supports markdown formatting
4. Click **Add FAQ**

### Editing an FAQ

1. Find the FAQ in the list
2. Click **Edit** button
3. Modify the question or answer
4. Click **Update FAQ**

### Deleting an FAQ

1. Find the FAQ in the list
2. Click **Delete** button
3. Confirm the deletion

## Tips and Best Practices

### Content Writing

1. **Titles**: Keep them concise and descriptive (50-60 characters)
2. **Excerpts**: Write compelling summaries (120-160 characters)
3. **Content**: Use clear, engaging language
4. **Categories**: Be consistent with category names
5. **Tags**: Use 3-5 relevant tags per post

### Images

1. **Size**: Optimize images before uploading (recommended max 2MB)
2. **Dimensions**: 
   - Blog covers: 1200x600px (2:1 ratio)
   - Case study heroes: 1200x600px (2:1 ratio)
   - Author avatars: 200x200px (square)
3. **Format**: Use JPEG for photos, PNG for graphics with transparency
4. **Alt Text**: Use descriptive filenames

### SEO Optimization

1. **Titles**: Include relevant keywords
2. **Excerpts**: Write compelling meta descriptions
3. **Content**: Use natural language, avoid keyword stuffing
4. **Categories**: Use consistent, descriptive categories
5. **Tags**: Use specific, relevant tags

### Draft vs Published

- **Draft**: Content is saved but not visible to public
- **Published**: Content is live and visible to everyone

Use drafts to:
- Save work in progress
- Review content before publishing
- Schedule content (manually publish when ready)

## Keyboard Shortcuts

In the rich text editor:
- **Ctrl+B** (or Cmd+B): Bold selected text
- **Ctrl+I** (or Cmd+I): Italic selected text
- **Ctrl+K** (or Cmd+K): Insert link

## Troubleshooting

### "Unauthorized" Error
- Make sure you're logged in
- Check that `ADMIN_TOKEN` is set in `.env.local`
- Restart the development server

### Image Upload Fails
- Check file size (must be under 5MB)
- Verify file type (JPEG, PNG, GIF, WebP only)
- Check DigitalOcean Spaces credentials in `.env.local`

### Content Not Saving
- Ensure required fields are filled (marked with *)
- Check browser console for errors
- Verify database connection

### Content Not Appearing on Public Pages
- Check that status is set to "Published"
- Refresh the public page
- Clear browser cache

## Security Reminders

1. **Change Default Credentials**: Update username and password in `/app/admin/page.js`
2. **Secure Admin Token**: Change `ADMIN_TOKEN` in `.env.local` to a random string
3. **Don't Share Credentials**: Keep admin access restricted
4. **Logout When Done**: Click the **Logout** button when finished

## Support

For issues or questions:
1. Check the `BLOG_INTEGRATION_README.md` file
2. Review the `INTEGRATION_SUMMARY.md` file
3. Check the database setup in `database/SETUP_INSTRUCTIONS.md`

## Quick Links

- Blog Page: `/blog`
- Case Studies Page: `/case-studies`
- FAQ Page: `/faq`
- Admin Panel: `/admin`
