"use server";
import { query } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// ---- Places ----

export async function getPlaces() {
  return query("select * from places order by sort_order asc");
}

export async function getPlaceById(id) {
  const places = await query("select * from places where id = $1", [id]);
  const place = places[0];
  if (!place) throw new Error("Place not found");

  const links = await query(
    "select trip_id from place_trips where place_id = $1",
    [id],
  );

  return { ...place, place_trips: links };
}

export async function getAllThemesForSelect() {
  try {
    return await query("select id, title from destinations order by title asc");
  } catch {
    return [];
  }
}

export async function createPlace(formData) {
  await requireSession();

  const slug = formData.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const rows = await query(
    `insert into places
      (slug, name, province, category, short_description, full_details, main_image,
       gallery, visitor_experience, status, destination_id, youtube_url, video_url)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
     returning *`,
    [
      slug,
      formData.name,
      formData.province,
      formData.category,
      formData.shortDescription,
      formData.fullDetails,
      formData.mainImage,
      formData.gallery.filter(Boolean),
      formData.visitorExperience,
      formData.status,
      formData.destinationId || null,
      formData.youtubeUrl || null,
      formData.videoUrl || null,
    ],
  );
  const place = rows[0];

  if (formData.linkedTripIds?.length) {
    for (const tripId of formData.linkedTripIds) {
      await query(
        "insert into place_trips (place_id, trip_id) values ($1, $2)",
        [place.id, tripId],
      );
    }
  }

  revalidatePath("/admin/places");
  revalidatePath("/places");
  return place;
}

export async function updatePlace(id, formData) {
  await requireSession();

  await query(
    `update places set
      name=$1, province=$2, category=$3, short_description=$4, full_details=$5,
      main_image=$6, gallery=$7, visitor_experience=$8, status=$9,
      destination_id=$10, youtube_url=$11, video_url=$12, updated_at=now()
     where id=$13`,
    [
      formData.name,
      formData.province,
      formData.category,
      formData.shortDescription,
      formData.fullDetails,
      formData.mainImage,
      formData.gallery.filter(Boolean),
      formData.visitorExperience,
      formData.status,
      formData.destinationId || null,
      formData.youtubeUrl || null,
      formData.videoUrl || null,
      id,
    ],
  );

  // Replace all trip links (simplest approach for a small list)
  await query("delete from place_trips where place_id = $1", [id]);
  if (formData.linkedTripIds?.length) {
    for (const tripId of formData.linkedTripIds) {
      await query(
        "insert into place_trips (place_id, trip_id) values ($1, $2)",
        [id, tripId],
      );
    }
  }

  revalidatePath("/admin/places");
  revalidatePath("/places");
  revalidatePath(`/places/${formData.slug}`);
}

export async function deletePlace(id) {
  await requireSession();
  await query("delete from places where id = $1", [id]);

  revalidatePath("/admin/places");
  revalidatePath("/places");
}

export async function getAllTripsForLinking() {
  try {
    return await query("select id, title from trips order by title asc");
  } catch {
    return [];
  }
}

// ---- Theme (formerly "Destinations") management — now lives under Places ----

export async function getThemes() {
  return query("select * from destinations order by sort_order asc");
}

export async function getThemeById(id) {
  const rows = await query("select * from destinations where id = $1", [id]);
  if (!rows[0]) throw new Error("Theme not found");
  return rows[0];
}

export async function createTheme(formData) {
  await requireSession();

  const slug = formData.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const rows = await query(
    `insert into destinations (slug, title, tag, intro, img)
     values ($1, $2, $3, $4, $5)
     returning *`,
    [slug, formData.title, formData.tag, formData.intro, formData.img],
  );

  revalidatePath("/admin/places/themes");
  revalidatePath("/places");
  revalidatePath("/");
  return rows[0];
}

export async function updateTheme(id, formData) {
  await requireSession();
  await query(
    "update destinations set title = $1, tag = $2, intro = $3, img = $4 where id = $5",
    [formData.title, formData.tag, formData.intro, formData.img, id],
  );

  revalidatePath("/admin/places/themes");
  revalidatePath("/places");
  revalidatePath("/");
}

export async function deleteTheme(id) {
  await requireSession();
  await query("delete from destinations where id = $1", [id]);

  revalidatePath("/admin/places/themes");
  revalidatePath("/places");
  revalidatePath("/");
}

// ---- Reordering — takes the full list of IDs in their new desired order ----

export async function reorderPlaces(orderedIds) {
  await requireSession();
  await Promise.all(
    orderedIds.map((id, index) =>
      query("update places set sort_order = $1 where id = $2", [index, id]),
    ),
  );

  revalidatePath("/admin/places");
  revalidatePath("/places");
}

export async function reorderThemes(orderedIds) {
  await requireSession();
  await Promise.all(
    orderedIds.map((id, index) =>
      query("update destinations set sort_order = $1 where id = $2", [
        index,
        id,
      ]),
    ),
  );

  revalidatePath("/admin/places/themes");
  revalidatePath("/places");
  revalidatePath("/");
}
