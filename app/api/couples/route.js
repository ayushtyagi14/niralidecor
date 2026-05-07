import { NextResponse } from 'next/server';
import supabaseAdmin from '@/lib/supabaseAdmin';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const featured = searchParams.get('featured');
        
        let query = supabaseAdmin.from('portfolio_couples').select('*').order('created_at', { ascending: false });

        if (featured === 'true') {
            query = query.eq('is_featured', true).limit(5);
        }

        const { data, error } = await query;

        if (error) throw error;

        return NextResponse.json(data || []);
    } catch (error) {
        console.error('Error fetching couples:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const token = request.headers.get('x-admin-token');
        if (token !== process.env.ADMIN_TOKEN) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { slug, name, location, date, description, coverImage, bannerImage, isFeatured, status } = body;

        if (!slug || !name) {
            return NextResponse.json({ error: 'Slug and name are required' }, { status: 400 });
        }

        const coupleData = {
            slug,
            name,
            location: location || '',
            date: date || '',
            description: description || '',
            cover_image: coverImage || '',
            banner_image: bannerImage || '',
            is_featured: isFeatured || false,
            status: status || 'published',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        const { data, error } = await supabaseAdmin.from('portfolio_couples').insert([coupleData]).select();

        if (error) throw error;

        return NextResponse.json(data[0], { status: 201 });
    } catch (error) {
        console.error('Error creating couple:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
