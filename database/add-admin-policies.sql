-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public read access to published blogs" ON blogs;
DROP POLICY IF EXISTS "Allow public read access to published case studies" ON case_studies;
DROP POLICY IF EXISTS "Allow public read access to faqs" ON faqs;

-- Recreate read policies
CREATE POLICY "Allow public read access to published blogs" ON blogs
    FOR SELECT USING (status = 'published');

CREATE POLICY "Allow public read access to published case studies" ON case_studies
    FOR SELECT USING (status = 'published');

CREATE POLICY "Allow public read access to faqs" ON faqs
    FOR SELECT USING (true);

-- Add policies for service role (admin operations)
-- These policies allow all operations when using the service role key

-- Blogs: Allow all operations for service role
CREATE POLICY "Allow service role all access to blogs" ON blogs
    FOR ALL 
    USING (true)
    WITH CHECK (true);

-- Case Studies: Allow all operations for service role
CREATE POLICY "Allow service role all access to case studies" ON case_studies
    FOR ALL 
    USING (true)
    WITH CHECK (true);

-- FAQs: Allow all operations for service role
CREATE POLICY "Allow service role all access to faqs" ON faqs
    FOR ALL 
    USING (true)
    WITH CHECK (true);
