'use server';

import supabaseAdmin from '@/lib/supabaseAdmin';

export default async function Head({ params }) {
    const { id } = params || {};

    let cs = null;
    if (id) {
        const { data, error } = await supabaseAdmin
            .from('case_studies')
            .select('*')
            .eq('id', id)
            .single();

        if (!error && data && data.status === 'published') {
            cs = data;
        }
    }

    const fallbackTitle = 'Case Studies | Nirali Decor';
    const fallbackDescription =
        'Real wedding and event case studies from Nirali Decor with measurable impact.';

    const metaTitle = cs?.seo_title || cs?.title || fallbackTitle;
    const metaDescription =
        cs?.seo_description || cs?.summary || fallbackDescription;

    const rawKeywords = cs?.seo_keywords || (cs?.tags || []).join(', ');
    const metaKeywords = Array.isArray(rawKeywords)
        ? rawKeywords.join(', ')
        : rawKeywords || undefined;

    return (
        <>
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            {metaKeywords && <meta name="keywords" content={metaKeywords} />}
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            {cs?.hero_image && <meta property="og:image" content={cs.hero_image} />}
        </>
    );
}
