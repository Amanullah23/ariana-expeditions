"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// ---- Intro (singleton) ----

export async function getIntro() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("about_intro")
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateIntro(id, description) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("about_intro")
    .update({ description, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/about");
  revalidatePath("/about");
}

// ---- Founders ----

export async function getFounders() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("founders")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return data;
}

export async function getFounderById(id) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("founders")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function createFounder(formData) {
  const supabase = await createClient();
  const { count } = await supabase
    .from("founders")
    .select("*", { count: "exact", head: true });

  const { data, error } = await supabase
    .from("founders")
    .insert({
      full_name: formData.fullName,
      position: formData.position,
      bio: formData.bio,
      image: formData.image,
      sort_order: count || 0,
    })
    .select()
    .single();
  if (error) throw new Error(error.message);

  revalidatePath("/admin/about");
  revalidatePath("/about");
  return data;
}

export async function updateFounder(id, formData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("founders")
    .update({
      full_name: formData.fullName,
      position: formData.position,
      bio: formData.bio,
      image: formData.image,
    })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/about");
  revalidatePath("/about");
}

export async function deleteFounder(id) {
  const supabase = await createClient();
  const { error } = await supabase.from("founders").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/about");
  revalidatePath("/about");
}

export async function reorderFounders(orderedIds) {
  const supabase = await createClient();
  const updates = orderedIds.map((id, index) =>
    supabase.from("founders").update({ sort_order: index }).eq("id", id),
  );
  const results = await Promise.all(updates);
  const failed = results.find((r) => r.error);
  if (failed) throw new Error(failed.error.message);

  revalidatePath("/admin/about");
  revalidatePath("/about");
}

// ---- Licenses ----

export async function getLicenses() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("licenses")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return data;
}

export async function getLicenseById(id) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("licenses")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function createLicense(formData) {
  const supabase = await createClient();
  const { count } = await supabase
    .from("licenses")
    .select("*", { count: "exact", head: true });

  const { data, error } = await supabase
    .from("licenses")
    .insert({
      title: formData.title,
      description: formData.description,
      image: formData.image,
      license_number: formData.licenseNumber,
      sort_order: count || 0,
    })
    .select()
    .single();
  if (error) throw new Error(error.message);

  revalidatePath("/admin/about");
  revalidatePath("/about");
  return data;
}

export async function updateLicense(id, formData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("licenses")
    .update({
      title: formData.title,
      description: formData.description,
      image: formData.image,
      license_number: formData.licenseNumber,
    })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/about");
  revalidatePath("/about");
}

export async function deleteLicense(id) {
  const supabase = await createClient();
  const { error } = await supabase.from("licenses").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/about");
  revalidatePath("/about");
}

export async function reorderLicenses(orderedIds) {
  const supabase = await createClient();
  const updates = orderedIds.map((id, index) =>
    supabase.from("licenses").update({ sort_order: index }).eq("id", id),
  );
  const results = await Promise.all(updates);
  const failed = results.find((r) => r.error);
  if (failed) throw new Error(failed.error.message);

  revalidatePath("/admin/about");
  revalidatePath("/about");
}
