import { query } from "@/lib/db";

export async function getPublicBlogPosts() {
  try {
    return await query(
      "select * from blog_posts where published = true order by sort_order asc",
    );
  } catch (err) {
    console.error("Failed to load blog posts:", err.message);
    return [];
  }
}

export async function getPublicBlogPostBySlug(slug) {
  try {
    const rows = await query(
      "select * from blog_posts where slug = $1 and published = true",
      [slug],
    );
    return rows[0] || null;
  } catch {
    return null;
  }
}

export async function getAllBlogSlugs() {
  try {
    const rows = await query(
      "select slug from blog_posts where published = true",
    );
    return rows.map((p) => p.slug);
  } catch {
    return [];
  }
}
