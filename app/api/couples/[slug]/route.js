import { NextResponse } from 'next/server';
import supabaseAdmin from '@/lib/supabaseAdmin';

export async function PUT(request, { params }) {
    try {
        const token = request.headers.get('x-admin-token');
        if (token !== process.env.ADMIN_TOKEN) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { slug } = await params;
        const body = await request.json();
        
        const updateData = {
            name: body.name,
            location: body.location || '',
            date: body.date || '',
            description: body.description || '',
            cover_image: body.coverImage || '',
            banner_image: body.bannerImage || '',
            is_featured: body.isFeatured !== undefined ? body.isFeatured : false,
            status: body.status || 'published',
            updated_at: new Date().toISOString()
        };

        // If the admin is modifying the slug itself, update it too
        if (body.slug && body.slug !== slug) {
            updateData.slug = body.slug;
        }

        const { data, error } = await supabaseAdmin
            .from('portfolio_couples')
            .update(updateData)
            .eq('slug', slug)
            .select();

        if (error) throw error;
        if (!data || data.length === 0) {
            return NextResponse.json({ error: 'Couple not found' }, { status: 404 });
        }

        return NextResponse.json(data[0]);
    } catch (error) {
        console.error('Error updating couple:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const token = request.headers.get('x-admin-token');
        if (token !== process.env.ADMIN_TOKEN) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { slug } = await params;

        const { error } = await supabaseAdmin
            .from('portfolio_couples')
            .delete()
            .eq('slug', slug);

        if (error) throw error;

        return NextResponse.json({ message: 'Couple deleted successfully' });
    } catch (error) {
        console.error('Error deleting couple:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
