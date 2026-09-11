"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// ---- Overall info (singleton) ----

export async function getInfo() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tripadvisor_info")
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateInfo(id, formData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("tripadvisor_info")
    .update({
      overall_rating: formData.overallRating,
      review_count: formData.reviewCount,
      profile_url: formData.profileUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/tripadvisor");
  revalidatePath("/");
}

// ---- Reviews ----

export async function getReviews() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tripadvisor_reviews")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return data;
}

export async function getReviewById(id) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tripadvisor_reviews")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function createReview(formData) {
  const supabase = await createClient();
  const { count } = await supabase
    .from("tripadvisor_reviews")
    .select("*", { count: "exact", head: true });

  const { data, error } = await supabase
    .from("tripadvisor_reviews")
    .insert({
      reviewer_name: formData.reviewerName,
      reviewer_location: formData.reviewerLocation,
      review_date: formData.reviewDate,
      rating: formData.rating,
      title: formData.title,
      excerpt: formData.excerpt,
      review_url: formData.reviewUrl,
      sort_order: count || 0,
    })
    .select()
    .single();
  if (error) throw new Error(error.message);

  revalidatePath("/admin/tripadvisor");
  revalidatePath("/");
  return data;
}

export async function updateReview(id, formData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("tripadvisor_reviews")
    .update({
      reviewer_name: formData.reviewerName,
      reviewer_location: formData.reviewerLocation,
      review_date: formData.reviewDate,
      rating: formData.rating,
      title: formData.title,
      excerpt: formData.excerpt,
      review_url: formData.reviewUrl,
    })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/tripadvisor");
  revalidatePath("/");
}

export async function deleteReview(id) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("tripadvisor_reviews")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/tripadvisor");
  revalidatePath("/");
}

export async function reorderReviews(orderedIds) {
  const supabase = await createClient();
  const updates = orderedIds.map((id, index) =>
    supabase
      .from("tripadvisor_reviews")
      .update({ sort_order: index })
      .eq("id", id),
  );
  const results = await Promise.all(updates);
  const failed = results.find((r) => r.error);
  if (failed) throw new Error(failed.error.message);

  revalidatePath("/admin/tripadvisor");
  revalidatePath("/");
}
