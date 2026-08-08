import { createClient } from "@/lib/supabase/public";

export async function getPublicPlaces() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("places")
    .select("*, destinations(title, slug)")
    .eq("status", "active")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Failed to load places:", error.message);
    return [];
  }
  return data;
}

export async function getPublicPlaceBySlug(slug) {
  const supabase = createClient();

  const { data: place, error } = await supabase
    .from("places")
    .select("*, destinations(title, slug)")
    .eq("slug", slug)
    .eq("status", "active")
    .single();

  if (error) return null;

  const { data: links } = await supabase
    .from("place_trips")
    .select("trip_id")
    .eq("place_id", place.id);

  let linkedTrips = [];
  if (links && links.length > 0) {
    const tripIds = links.map((l) => l.trip_id);
    const { data: trips } = await supabase
      .from("trips")
      .select("slug, title, days, img")
      .in("id", tripIds);
    linkedTrips = trips || [];
  }

  return { ...place, linkedTrips };
}

export async function getAllPlaceSlugs() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("places")
    .select("slug")
    .eq("status", "active");

  if (error) return [];
  return data.map((p) => p.slug);
}

export async function getPublicThemes() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("destinations")
    .select("id, title, slug, tag, intro, img")
    .order("sort_order", { ascending: true });

  if (error) return [];
  return data;
}
