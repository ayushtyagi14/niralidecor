import supabaseAdmin from "@/lib/supabaseAdmin";

export default async function sitemap() {
  const baseUrl = "https://www.niralidecor.com";

  // Static top-level routes
  const staticRoutes = [
    "",
    "/about-us",
    "/portfolio",
    "/testimonials",
    "/blog",
    "/faq",
    "/contact-us",
    "/case-studies",
  ];

  const urls = staticRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  try {
    // Fetch published blogs and case studies for dynamic URLs
    const [{ data: blogs, error: blogsError }, { data: caseStudies, error: caseStudiesError }] =
      await Promise.all([
        supabaseAdmin
          .from("blogs")
          .select("slug, updated_at, status")
          .eq("status", "published"),
        supabaseAdmin
          .from("case_studies")
          .select("id, updated_at, created_at, status")
          .eq("status", "published"),
      ]);

    if (!blogsError && Array.isArray(blogs)) {
      urls.push(
        ...blogs.map((blog) => ({
          url: `${baseUrl}/blog/${blog.slug}`,
          lastModified: blog.updated_at ? new Date(blog.updated_at) : new Date(),
        })),
      );
    }

    if (!caseStudiesError && Array.isArray(caseStudies)) {
      urls.push(
        ...caseStudies.map((cs) => ({
          url: `${baseUrl}/case-studies/${cs.id}`,
          lastModified: cs.updated_at ? new Date(cs.updated_at) : new Date(cs.created_at || new Date()),
        })),
      );
    }
  } catch (e) {
    console.error("Error building sitemap:", e);
  }

  return urls;
}
