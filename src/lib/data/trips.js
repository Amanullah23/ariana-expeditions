import { createClient } from "@/lib/supabase/public";

export async function getPublicTrips() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Failed to load trips:", error.message);
    return [];
  }
  return data;
}

export async function getPublicTripBySlug(slug) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("trips")
    .select("*, trip_itinerary_items(*)")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}

export async function getAllTripSlugs() {
  const supabase = createClient();
  const { data, error } = await supabase.from("trips").select("slug");
  if (error) return [];
  return data.map((t) => t.slug);
}
