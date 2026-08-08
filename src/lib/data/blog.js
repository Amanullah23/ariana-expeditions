import { createClient } from "@/lib/supabase/public";

export async function getPublicBlogPosts() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Failed to load blog posts:", error.message);
    return [];
  }
  return data;
}

export async function getPublicBlogPostBySlug(slug) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) return null;
  return data;
}

export async function getAllBlogSlugs() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("published", true);

  if (error) return [];
  return data.map((p) => p.slug);
}
