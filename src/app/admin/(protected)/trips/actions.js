"use server";
import { query } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getTrips() {
  const trips = await query("select * from trips order by sort_order asc");
  if (trips.length === 0) return [];

  const tripIds = trips.map((t) => t.id);
  const items = await query(
    "select * from trip_itinerary_items where trip_id = any($1::uuid[]) order by sort_order asc",
    [tripIds],
  );

  const itemsByTrip = {};
  for (const item of items) {
    (itemsByTrip[item.trip_id] ??= []).push(item);
  }

  return trips.map((t) => ({
    ...t,
    trip_itinerary_items: itemsByTrip[t.id] || [],
  }));
}

export async function getTripBySlug(slug) {
  const trips = await query("select * from trips where slug = $1", [slug]);
  const trip = trips[0];
  if (!trip) throw new Error("Trip not found");

  const items = await query(
    "select * from trip_itinerary_items where trip_id = $1 order by sort_order asc",
    [trip.id],
  );

  return { ...trip, trip_itinerary_items: items };
}

async function replaceItineraryItems(tripId, itinerary) {
  await query("delete from trip_itinerary_items where trip_id = $1", [tripId]);

  if (!itinerary?.length) return;

  const items = itinerary
    .filter((d) => d.title || d.day)
    .map((d, i) => ({
      trip_id: tripId,
      day_label: d.day,
      title: d.title,
      description: d.desc,
      sort_order: i,
    }));

  for (const item of items) {
    await query(
      `insert into trip_itinerary_items (trip_id, day_label, title, description, sort_order)
       values ($1, $2, $3, $4, $5)`,
      [
        item.trip_id,
        item.day_label,
        item.title,
        item.description,
        item.sort_order,
      ],
    );
  }
}

export async function createTrip(formData) {
  await requireSession();

  const slug = formData.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const rows = await query(
    `insert into trips
      (slug, title, days, region, difficulty, description, img, gallery, highlights, includes, excludes, youtube_url, video_url)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
     returning *`,
    [
      slug,
      formData.title,
      formData.days,
      formData.region,
      formData.difficulty,
      formData.desc,
      formData.img,
      formData.gallery ? formData.gallery.filter(Boolean) : [],
      formData.highlights.filter(Boolean),
      formData.includes.filter(Boolean),
      formData.excludes.filter(Boolean),
      formData.youtubeUrl || null,
      formData.videoUrl || null,
    ],
  );
  const trip = rows[0];

  await replaceItineraryItems(trip.id, formData.itinerary);

  revalidatePath("/admin/trips");
  revalidatePath("/trips");
  return trip;
}

export async function updateTrip(id, formData) {
  await requireSession();

  await query(
    `update trips set
      title=$1, days=$2, region=$3, difficulty=$4, description=$5,
      img=$6, gallery=$7, highlights=$8, includes=$9, excludes=$10,
      youtube_url=$11, video_url=$12
     where id=$13`,
    [
      formData.title,
      formData.days,
      formData.region,
      formData.difficulty,
      formData.desc,
      formData.img,
      formData.gallery ? formData.gallery.filter(Boolean) : [],
      formData.highlights.filter(Boolean),
      formData.includes.filter(Boolean),
      formData.excludes.filter(Boolean),
      formData.youtubeUrl || null,
      formData.videoUrl || null,
      id,
    ],
  );

  await replaceItineraryItems(id, formData.itinerary);

  revalidatePath("/admin/trips");
  revalidatePath("/trips");
  revalidatePath(`/trips/${formData.slug}`);
}

export async function deleteTrip(id) {
  await requireSession();

  // trip_itinerary_items has ON DELETE CASCADE, so this cleans up both tables.
  await query("delete from trips where id = $1", [id]);

  revalidatePath("/admin/trips");
  revalidatePath("/trips");
}

export async function reorderTrips(orderedIds) {
  await requireSession();

  await Promise.all(
    orderedIds.map((id, index) =>
      query("update trips set sort_order = $1 where id = $2", [index, id]),
    ),
  );

  revalidatePath("/admin/trips");
  revalidatePath("/trips");
  revalidatePath("/");
}
