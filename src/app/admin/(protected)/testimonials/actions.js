"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getTestimonials() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function getTestimonialById(id) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function createTestimonial(formData) {
  const supabase = await createClient();

  const slug =
    formData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") +
    "-" +
    Math.random().toString(36).slice(2, 8);

  const { count } = await supabase
    .from("testimonials")
    .select("*", { count: "exact", head: true });

  const { data, error } = await supabase
    .from("testimonials")
    .insert({
      slug,
      name: formData.name,
      location: formData.location,
      quote: formData.quote,
      img: formData.imagePreview,
      sort_order: count || 0,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  revalidatePath("/testimonials");
  return data;
}

export async function updateTestimonial(id, formData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("testimonials")
    .update({
      name: formData.name,
      location: formData.location,
      quote: formData.quote,
      img: formData.imagePreview,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function deleteTestimonial(id) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}
