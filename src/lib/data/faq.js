import { createClient } from "@/lib/supabase/public";

export async function getPublicFaqItems() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("faq_items")
    .select("*")
    .order("category")
    .order("sort_order");

  if (error) {
    console.error("Failed to load FAQ items:", error.message);
    return [];
  }
  return data;
}
