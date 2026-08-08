import { createClient } from "@/lib/supabase/public";

export async function getAboutIntro() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("about_intro")
    .select("*")
    .single();

  if (error) {
    console.error("Failed to load about intro:", error.message);
    return null;
  }
  return data;
}

export async function getPublicFounders() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("founders")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Failed to load founders:", error.message);
    return [];
  }
  return data;
}

export async function getPublicLicenses() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("licenses")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Failed to load licenses:", error.message);
    return [];
  }
  return data;
}
