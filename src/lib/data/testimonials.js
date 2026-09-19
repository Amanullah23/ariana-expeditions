import { query } from "@/lib/db";

export async function getPublicTestimonials(limit) {
  try {
    const sql = limit
      ? "select * from testimonials order by sort_order asc limit $1"
      : "select * from testimonials order by sort_order asc";
    const params = limit ? [limit] : [];
    return await query(sql, params);
  } catch (err) {
    console.error("Failed to load testimonials:", err.message);
    return [];
  }
}

export async function getPublicTestimonialBySlug(slug) {
  try {
    const rows = await query("select * from testimonials where slug = $1", [
      slug,
    ]);
    return rows[0] || null;
  } catch {
    return null;
  }
}

export async function getAllTestimonialSlugs() {
  try {
    const rows = await query("select slug from testimonials");
    return rows.map((t) => t.slug).filter(Boolean);
  } catch {
    return [];
  }
}
