import { NextResponse } from 'next/server';
import supabaseAdmin from '@/lib/supabaseAdmin';

export async function GET(request, { params }) {
    try {
        const { slug } = await params;
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');

        let query = supabaseAdmin
            .from('portfolio_couple_images')
            .select('*')
            .eq('couple_slug', slug)
            .order('created_at', { ascending: true });

        if (category) {
            query = query.eq('category', category);
        }

        const { data, error } = await query;
        if (error) throw error;

        return NextResponse.json(data || []);
    } catch (error) {
        console.error('Error fetching couple images:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request, { params }) {
    try {
        const token = request.headers.get('x-admin-token');
        if (token !== process.env.ADMIN_TOKEN) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { slug } = await params;
        const body = await request.json();
        const { category, mediaUrl } = body;

        if (!category || !mediaUrl) {
            return NextResponse.json({ error: 'Category and mediaUrl are required' }, { status: 400 });
        }

        const imageData = {
            couple_slug: slug,
            category,
            media_url: mediaUrl,
            created_at: new Date().toISOString()
        };

        const { data, error } = await supabaseAdmin
            .from('portfolio_couple_images')
            .insert([imageData])
            .select();

        if (error) throw error;

        return NextResponse.json(data[0], { status: 201 });
    } catch (error) {
        console.error('Error adding couple image:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const token = request.headers.get('x-admin-token');
        if (token !== process.env.ADMIN_TOKEN) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { slug } = await params; // slug is unused here but we keep it for route consistency
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Image ID is required' }, { status: 400 });
        }

        const { error } = await supabaseAdmin
            .from('portfolio_couple_images')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ message: 'Image deleted successfully' });
    } catch (error) {
        console.error('Error deleting couple image:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
