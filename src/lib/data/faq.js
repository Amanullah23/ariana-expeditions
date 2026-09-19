import { query } from "@/lib/db";

export async function getPublicFaqItems() {
  try {
    return await query(
      "select * from faq_items order by category asc, sort_order asc",
    );
  } catch (err) {
    console.error("Failed to load FAQ items:", err.message);
    return [];
  }
}
