"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getTrips() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("trips")
    .select("*, trip_itinerary_items(*)")
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

export async function getTripBySlug(slug) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("trips")
    .select("*, trip_itinerary_items(*)")
    .eq("slug", slug)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function createTrip(formData) {
  const supabase = await createClient();

  const slug = formData.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const { data: trip, error } = await supabase
    .from("trips")
    .insert({
      slug,
      title: formData.title,
      days: formData.days,
      region: formData.region,
      difficulty: formData.difficulty,
      description: formData.desc,
      img: formData.img,
      gallery: formData.gallery ? formData.gallery.filter(Boolean) : [],
      highlights: formData.highlights.filter(Boolean),
      includes: formData.includes.filter(Boolean),
      excludes: formData.excludes.filter(Boolean),
      youtube_url: formData.youtubeUrl || null,
      video_url: formData.videoUrl || null,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  if (formData.itinerary?.length) {
    const items = formData.itinerary
      .filter((d) => d.title || d.day)
      .map((d, i) => ({
        trip_id: trip.id,
        day_label: d.day,
        title: d.title,
        description: d.desc,
        sort_order: i,
      }));

    if (items.length) {
      const { error: itemsError } = await supabase
        .from("trip_itinerary_items")
        .insert(items);
      if (itemsError) throw new Error(itemsError.message);
    }
  }

  revalidatePath("/admin/trips");
  revalidatePath("/trips");
  return trip;
}

export async function updateTrip(id, formData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("trips")
    .update({
      title: formData.title,
      days: formData.days,
      region: formData.region,
      difficulty: formData.difficulty,
      description: formData.desc,
      img: formData.img,
      gallery: formData.gallery ? formData.gallery.filter(Boolean) : [],
      highlights: formData.highlights.filter(Boolean),
      includes: formData.includes.filter(Boolean),
      excludes: formData.excludes.filter(Boolean),
      youtube_url: formData.youtubeUrl || null,
      video_url: formData.videoUrl || null,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  // Replace all itinerary items (simplest approach for a small list)
  await supabase.from("trip_itinerary_items").delete().eq("trip_id", id);

  if (formData.itinerary?.length) {
    const items = formData.itinerary
      .filter((d) => d.title || d.day)
      .map((d, i) => ({
        trip_id: id,
        day_label: d.day,
        title: d.title,
        description: d.desc,
        sort_order: i,
      }));

    if (items.length) {
      const { error: itemsError } = await supabase
        .from("trip_itinerary_items")
        .insert(items);
      if (itemsError) throw new Error(itemsError.message);
    }
  }

  revalidatePath("/admin/trips");
  revalidatePath("/trips");
  revalidatePath(`/trips/${formData.slug}`);
}

export async function deleteTrip(id) {
  const supabase = await createClient();
  const { error } = await supabase.from("trips").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/trips");
  revalidatePath("/trips");
}

export async function reorderTrips(orderedIds) {
  const supabase = await createClient();
  const updates = orderedIds.map((id, index) =>
    supabase.from("trips").update({ sort_order: index }).eq("id", id),
  );
  const results = await Promise.all(updates);
  const failed = results.find((r) => r.error);
  if (failed) throw new Error(failed.error.message);

  revalidatePath("/admin/trips");
  revalidatePath("/trips");
  revalidatePath("/");
}
