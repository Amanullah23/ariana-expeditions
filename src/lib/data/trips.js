import { query } from "@/lib/db";

export async function getPublicTrips() {
  try {
    return await query("select * from trips order by sort_order asc");
  } catch (err) {
    console.error("Failed to load trips:", err.message);
    return [];
  }
}

export async function getPublicTripBySlug(slug) {
  try {
    const trips = await query("select * from trips where slug = $1", [slug]);
    const trip = trips[0];
    if (!trip) return null;

    const items = await query(
      "select * from trip_itinerary_items where trip_id = $1 order by sort_order asc",
      [trip.id],
    );

    return { ...trip, trip_itinerary_items: items };
  } catch (err) {
    console.error("Failed to load trip:", err.message);
    return null;
  }
}

export async function getAllTripSlugs() {
  try {
    const trips = await query("select slug from trips");
    return trips.map((t) => t.slug);
  } catch (err) {
    console.error("Failed to load trip slugs:", err.message);
    return [];
  }
}
