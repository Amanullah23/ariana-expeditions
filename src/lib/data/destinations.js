import { createClient } from "@/lib/supabase/public";

export async function getPublicDestinations() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("destinations")
    .select("*, destination_places(*)")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Failed to load destinations:", error.message);
    return [];
  }
  return data;
}
