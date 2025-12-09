import { NextResponse } from 'next/server';
import supabaseAdmin from '@/lib/supabaseAdmin';

export async function GET() {
    try {
        // Test connection
        const { data: blogs, error: blogsError } = await supabaseAdmin
            .from('blogs')
            .select('*')
            .limit(5);

        const { data: cases, error: casesError } = await supabaseAdmin
            .from('case_studies')
            .select('*')
            .limit(5);

        const { data: faqs, error: faqsError } = await supabaseAdmin
            .from('faqs')
            .select('*')
            .limit(5);

        return NextResponse.json({
            success: true,
            blogs: {
                count: blogs?.length || 0,
                data: blogs,
                error: blogsError?.message || null
            },
            case_studies: {
                count: cases?.length || 0,
                data: cases,
                error: casesError?.message || null
            },
            faqs: {
                count: faqs?.length || 0,
                data: faqs,
                error: faqsError?.message || null
            },
            env: {
                hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
                hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
                hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
            }
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
