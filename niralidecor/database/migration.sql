-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    author TEXT DEFAULT 'Admin',
    cover_image TEXT,
    avatar_image TEXT,
    tags TEXT[] DEFAULT '{}',
    category TEXT DEFAULT 'General',
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published')),
    seo_title TEXT,
    seo_description TEXT,
    seo_keywords TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create case_studies table
CREATE TABLE IF NOT EXISTS case_studies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    client TEXT NOT NULL,
    year INTEGER,
    hero_image TEXT,
    summary TEXT,
    metrics JSONB DEFAULT '[]',
    tags TEXT[] DEFAULT '{}',
    category TEXT DEFAULT 'General',
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published')),
    seo_title TEXT,
    seo_description TEXT,
    seo_keywords TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create faqs table
CREATE TABLE IF NOT EXISTS faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    seo_title TEXT,
    seo_description TEXT,
    seo_keywords TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs(status);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_case_studies_status ON case_studies(status);
CREATE INDEX IF NOT EXISTS idx_case_studies_category ON case_studies(category);
CREATE INDEX IF NOT EXISTS idx_case_studies_created_at ON case_studies(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_faqs_created_at ON faqs(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to published blogs" ON blogs
    FOR SELECT USING (status = 'published');

CREATE POLICY "Allow public read access to published case studies" ON case_studies
    FOR SELECT USING (status = 'published');

CREATE POLICY "Allow public read access to faqs" ON faqs
    FOR SELECT USING (true);

-- Note: For admin operations (INSERT, UPDATE, DELETE), you'll need to use the service role key
-- or create additional policies based on your authentication setup
