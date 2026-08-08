"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getPlaces() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("places")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

export async function getPlaceById(id) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("places")
    .select("*, place_trips(trip_id)")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function getAllThemesForSelect() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("destinations")
    .select("id, title")
    .order("title");

  if (error) return [];
  return data;
}

export async function createPlace(formData) {
  const supabase = await createClient();

  const slug = formData.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const { data: place, error } = await supabase
    .from("places")
    .insert({
      slug,
      name: formData.name,
      province: formData.province,
      category: formData.category,
      short_description: formData.shortDescription,
      full_details: formData.fullDetails,
      main_image: formData.mainImage,
      gallery: formData.gallery.filter(Boolean),
      visitor_experience: formData.visitorExperience,
      status: formData.status,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  if (formData.linkedTripIds?.length) {
    const links = formData.linkedTripIds.map((tripId) => ({
      place_id: place.id,
      trip_id: tripId,
    }));
    const { error: linkError } = await supabase
      .from("place_trips")
      .insert(links);
    if (linkError) throw new Error(linkError.message);
  }

  revalidatePath("/admin/places");
  revalidatePath("/places");
  return place;
}

export async function updatePlace(id, formData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("places")
    .update({
      name: formData.name,
      province: formData.province,
      category: formData.category,
      short_description: formData.shortDescription,
      full_details: formData.fullDetails,
      main_image: formData.mainImage,
      gallery: formData.gallery.filter(Boolean),
      visitor_experience: formData.visitorExperience,
      status: formData.status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  // Replace all trip links (simplest approach for a small list)
  await supabase.from("place_trips").delete().eq("place_id", id);
  if (formData.linkedTripIds?.length) {
    const links = formData.linkedTripIds.map((tripId) => ({
      place_id: id,
      trip_id: tripId,
    }));
    const { error: linkError } = await supabase
      .from("place_trips")
      .insert(links);
    if (linkError) throw new Error(linkError.message);
  }

  revalidatePath("/admin/places");
  revalidatePath("/places");
  revalidatePath(`/places/${formData.slug}`);
}

export async function deletePlace(id) {
  const supabase = await createClient();
  const { error } = await supabase.from("places").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/places");
  revalidatePath("/places");
}

export async function getAllTripsForLinking() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("trips")
    .select("id, title")
    .order("title");

  if (error) return [];
  return data;
}
// ---- Theme (formerly "Destinations") management — now lives under Sites ----

export async function getThemes() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("destinations")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

export async function getThemeById(id) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("destinations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function createTheme(formData) {
  const supabase = await createClient();

  const slug = formData.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const { data, error } = await supabase
    .from("destinations")
    .insert({
      slug,
      title: formData.title,
      tag: formData.tag,
      intro: formData.intro,
      img: formData.img,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/admin/places/themes");
  revalidatePath("/places");
  revalidatePath("/");
  return data;
}

export async function updateTheme(id, formData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("destinations")
    .update({
      title: formData.title,
      tag: formData.tag,
      intro: formData.intro,
      img: formData.img,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/places/themes");
  revalidatePath("/places");
  revalidatePath("/");
}

export async function deleteTheme(id) {
  const supabase = await createClient();
  const { error } = await supabase.from("destinations").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/places/themes");
  revalidatePath("/places");
  revalidatePath("/");
}

// ---- Reordering — takes the full list of IDs in their new desired order ----

export async function reorderPlaces(orderedIds) {
  const supabase = await createClient();
  const updates = orderedIds.map((id, index) =>
    supabase.from("places").update({ sort_order: index }).eq("id", id),
  );
  const results = await Promise.all(updates);
  const failed = results.find((r) => r.error);
  if (failed) throw new Error(failed.error.message);

  revalidatePath("/admin/places");
  revalidatePath("/places");
}

export async function reorderThemes(orderedIds) {
  const supabase = await createClient();
  const updates = orderedIds.map((id, index) =>
    supabase.from("destinations").update({ sort_order: index }).eq("id", id),
  );
  const results = await Promise.all(updates);
  const failed = results.find((r) => r.error);
  if (failed) throw new Error(failed.error.message);

  revalidatePath("/admin/places/themes");
  revalidatePath("/places");
  revalidatePath("/");
}
