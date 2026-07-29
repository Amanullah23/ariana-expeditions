import { createClient } from "@/lib/supabase/public";

export async function getPublicTestimonials() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Failed to load testimonials:", error.message);
    return [];
  }
  return data;
}
