import supabaseAdmin from '@/lib/supabaseAdmin';

export async function generateMetadata(props) {
  // In Next.js App Router, params may be a Promise in some cases,
  // so we resolve it before accessing slug.
  const resolved = await props.params;
  const slug = resolved?.slug?.toString().toLowerCase() || '';

  if (!slug) {
    const fallbackTitle = 'Blog | Nirali Decor';
    const fallbackDescription =
      'Indian wedding decor ideas, trends, and inspiration from Nirali Decor.';

    return {
      title: fallbackTitle,
      description: fallbackDescription,
    };
  }

  let post = null;
  const { data, error } = await supabaseAdmin
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!error && data) {
    post = data;
  }

  const fallbackTitle = 'Blog | Nirali Decor';
  const fallbackDescription =
    'Indian wedding decor ideas, trends, and inspiration from Nirali Decor.';

  const metaTitle = post?.seo_title || post?.title || fallbackTitle;
  const metaDescription =
    post?.seo_description || post?.excerpt || fallbackDescription;

  const rawKeywords = post?.seo_keywords || (post?.tags || []).join(', ');
  const metaKeywords = Array.isArray(rawKeywords)
    ? rawKeywords.join(', ')
    : rawKeywords || undefined;

  const openGraph = {
    title: metaTitle,
    description: metaDescription,
  };

  if (post?.cover_image) {
    openGraph.images = [post.cover_image];
  }

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    openGraph,
  };
}

export default function BlogPostLayout({ children }) {
  return children;
}
