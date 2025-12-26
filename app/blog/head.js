'use server';

// Intentionally return nothing here so that:
// - /blog uses metadata from app/blog/layout.js (your main blog SEO)
// - /blog/[slug] uses per-post SEO from app/blog/[slug]/head.js (from the database)
export default function Head() {
    return null;
}
