import { createClient } from "@/lib/supabase/public";

export async function getPublicTestimonials(limit) {
  const supabase = createClient();
  let query = supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;

  if (error) {
    console.error("Failed to load testimonials:", error.message);
    return [];
  }
  return data;
}

export async function getPublicTestimonialBySlug(slug) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}

export async function getAllTestimonialSlugs() {
  const supabase = createClient();
  const { data, error } = await supabase.from("testimonials").select("slug");

  if (error) return [];
  return data.map((t) => t.slug).filter(Boolean);
}
