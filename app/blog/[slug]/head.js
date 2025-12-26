'use server';

// SEO for individual blog posts is now handled by
// app/blog/[slug]/layout.js via generateMetadata.
// This head.js is intentionally a no-op to avoid
// duplicating or conflicting meta tags.
export default function Head() {
	return null;
}
