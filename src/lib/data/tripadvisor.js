import { createClient } from "@/lib/supabase/public";

export async function getTripAdvisorInfo() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tripadvisor_info")
    .select("*")
    .single();

  if (error) return null;
  return data;
}

export async function getTripAdvisorReviews() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tripadvisor_reviews")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) return [];
  return data;
}
