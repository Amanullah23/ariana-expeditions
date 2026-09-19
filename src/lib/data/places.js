import { query } from "@/lib/db";

export async function getPublicPlaces() {
  try {
    return await query(
      `select p.*, json_build_object('title', d.title, 'slug', d.slug) as destinations
       from places p
       left join destinations d on d.id = p.destination_id
       where p.status = 'active'
       order by p.sort_order asc`,
    );
  } catch (err) {
    console.error("Failed to load places:", err.message);
    return [];
  }
}

export async function getPublicPlaceBySlug(slug) {
  try {
    const rows = await query(
      `select p.*, json_build_object('title', d.title, 'slug', d.slug) as destinations
       from places p
       left join destinations d on d.id = p.destination_id
       where p.slug = $1 and p.status = 'active'`,
      [slug],
    );
    const place = rows[0];
    if (!place) return null;

    const links = await query(
      "select trip_id from place_trips where place_id = $1",
      [place.id],
    );

    let linkedTrips = [];
    if (links.length > 0) {
      const tripIds = links.map((l) => l.trip_id);
      linkedTrips = await query(
        "select slug, title, days, img from trips where id = any($1::uuid[])",
        [tripIds],
      );
    }

    return { ...place, linkedTrips };
  } catch (err) {
    console.error("Failed to load place:", err.message);
    return null;
  }
}

export async function getAllPlaceSlugs() {
  try {
    const rows = await query("select slug from places where status = 'active'");
    return rows.map((p) => p.slug);
  } catch {
    return [];
  }
}

export async function getPublicThemes() {
  try {
    return await query(
      "select id, title, slug, tag, intro, img from destinations order by sort_order asc",
    );
  } catch {
    return [];
  }
}
