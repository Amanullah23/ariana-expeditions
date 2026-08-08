"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getBlogPosts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

export async function getBlogPostById(id) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function createBlogPost(formData) {
  const supabase = await createClient();

  const slug = formData.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  // Place new posts at the end of the current order
  const { count } = await supabase
    .from("blog_posts")
    .select("*", { count: "exact", head: true });

  const { data, error } = await supabase
    .from("blog_posts")
    .insert({
      slug,
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      category: formData.category,
      cover_image: formData.coverImage,
      author: formData.author || "Ariana Expeditions Team",
      published: formData.published,
      sort_order: count || 0,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return data;
}

export async function updateBlogPost(id, formData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("blog_posts")
    .update({
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      category: formData.category,
      cover_image: formData.coverImage,
      author: formData.author || "Ariana Expeditions Team",
      published: formData.published,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${formData.slug}`);
}

export async function deleteBlogPost(id) {
  const supabase = await createClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function reorderBlogPosts(orderedIds) {
  const supabase = await createClient();
  const updates = orderedIds.map((id, index) =>
    supabase.from("blog_posts").update({ sort_order: index }).eq("id", id),
  );
  const results = await Promise.all(updates);
  const failed = results.find((r) => r.error);
  if (failed) throw new Error(failed.error.message);

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
