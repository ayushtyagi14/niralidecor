import { NextResponse } from 'next/server';
import supabaseAdmin from '@/lib/supabaseAdmin';

// GET all blogs or filter by status
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const isAdmin = request.headers.get('x-admin-token') === process.env.ADMIN_TOKEN;

        let query = supabaseAdmin.from('blogs').select('*').order('created_at', { ascending: false });

        // If not admin, only show published posts
        if (!isAdmin) {
            query = query.eq('status', 'published');
        } else if (status) {
            query = query.eq('status', status);
        }

        const { data, error } = await query;

        if (error) throw error;

        return NextResponse.json(data || []);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST - Create new blog
export async function POST(request) {
    try {
        const token = request.headers.get('x-admin-token');
        if (token !== process.env.ADMIN_TOKEN) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { slug, title, excerpt, content, author, coverImage, avatarImage, tags, categories, status, seoTitle, seoDescription, seoKeywords } = body;

        if (!slug || !title || !content) {
            return NextResponse.json({ error: 'Slug, title and content are required' }, { status: 400 });
        }

        const blogData = {
            slug,
            title,
            excerpt: excerpt || content.slice(0, 140),
            content,
            author: author || 'Admin',
            cover_image: coverImage || '',
            avatar_image: avatarImage || '',
            tags: tags || [],
            categories: categories || [],
            status: status || 'published',
            seo_title: seoTitle || '',
            seo_description: seoDescription || '',
            seo_keywords: seoKeywords || '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        const { data, error } = await supabaseAdmin.from('blogs').insert([blogData]).select();

        if (error) throw error;

        return NextResponse.json(data[0], { status: 201 });
    } catch (error) {
        console.error('Error creating blog:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
