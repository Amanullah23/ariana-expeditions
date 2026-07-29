"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getDestinations() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("destinations")
    .select("*, destination_places(*)")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function getDestinationBySlug(slug) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("destinations")
    .select("*, destination_places(*)")
    .eq("slug", slug)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function createDestination(formData) {
  const supabase = await createClient();

  const slug = formData.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const { data: destination, error } = await supabase
    .from("destinations")
    .insert({
      slug,
      title: formData.title,
      tag: formData.tag,
      intro: formData.intro,
      img: formData.imagePreview,
      gallery: formData.gallery.filter(Boolean),
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  const places = formData.places
    .filter((p) => p.name)
    .map((p, i) => ({
      destination_id: destination.id,
      name: p.name,
      description: p.desc,
      sort_order: i,
    }));

  if (places.length) {
    const { error: placesError } = await supabase
      .from("destination_places")
      .insert(places);
    if (placesError) throw new Error(placesError.message);
  }

  revalidatePath("/admin/destinations");
  revalidatePath("/destinations");
  return destination;
}

export async function updateDestination(id, slug, formData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("destinations")
    .update({
      title: formData.title,
      tag: formData.tag,
      intro: formData.intro,
      img: formData.imagePreview,
      gallery: formData.gallery.filter(Boolean),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  await supabase.from("destination_places").delete().eq("destination_id", id);

  const places = formData.places
    .filter((p) => p.name)
    .map((p, i) => ({
      destination_id: id,
      name: p.name,
      description: p.desc,
      sort_order: i,
    }));

  if (places.length) {
    const { error: placesError } = await supabase
      .from("destination_places")
      .insert(places);
    if (placesError) throw new Error(placesError.message);
  }

  revalidatePath("/admin/destinations");
  revalidatePath("/destinations");
  revalidatePath(`/destinations#${slug}`);
}

export async function deleteDestination(id) {
  const supabase = await createClient();
  const { error } = await supabase.from("destinations").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/destinations");
  revalidatePath("/destinations");
}
