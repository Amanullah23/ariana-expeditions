import { query } from "@/lib/db";

export async function getTripAdvisorInfo() {
  try {
    const rows = await query("select * from tripadvisor_info limit 1");
    return rows[0] || null;
  } catch {
    return null;
  }
}

export async function getTripAdvisorReviews() {
  try {
    return await query(
      "select * from tripadvisor_reviews order by sort_order asc",
    );
  } catch {
    return [];
  }
}
