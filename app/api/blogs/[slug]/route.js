import { NextResponse } from 'next/server';
import supabaseAdmin from '@/lib/supabaseAdmin';

// GET single blog by slug
export async function GET(request, { params }) {
    try {
        const { slug } = params;
        const isAdmin = request.headers.get('x-admin-token') === process.env.ADMIN_TOKEN;

        let query = supabaseAdmin.from('blogs').select('*').eq('slug', slug).single();

        const { data, error } = await query;

        if (error) throw error;

        // If not admin and post is not published, return 404
        if (!isAdmin && data?.status !== 'published') {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching blog:', error);
        return NextResponse.json({ error: error.message }, { status: 404 });
    }
}

// PUT - Update blog by slug
export async function PUT(request, { params }) {
    try {
        const token = request.headers.get('x-admin-token');
        if (token !== process.env.ADMIN_TOKEN) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { slug } = params;
        const body = await request.json();

        const updateData = {
            title: body.title,
            excerpt: body.excerpt,
            content: body.content,
            author: body.author,
            cover_image: body.coverImage,
            avatar_image: body.avatarImage,
            tags: body.tags,
            category: body.category,
            status: body.status,
            seo_title: body.seoTitle,
            seo_description: body.seoDescription,
            seo_keywords: body.seoKeywords,
            updated_at: new Date().toISOString()
        };

        const { data, error } = await supabaseAdmin
            .from('blogs')
            .update(updateData)
            .eq('slug', slug)
            .select();

        if (error) throw error;

        if (!data || data.length === 0) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json(data[0]);
    } catch (error) {
        console.error('Error updating blog:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE - Delete blog by slug
export async function DELETE(request, { params }) {
    try {
        const token = request.headers.get('x-admin-token');
        if (token !== process.env.ADMIN_TOKEN) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { slug } = params;

        const { data, error } = await supabaseAdmin
            .from('blogs')
            .delete()
            .eq('slug', slug)
            .select();

        if (error) throw error;

        if (!data || data.length === 0) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json(data[0]);
    } catch (error) {
        console.error('Error deleting blog:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
