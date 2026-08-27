import { getPublicTrips } from "@/lib/data/trips";
import { getPublicPlaces } from "@/lib/data/places";

export default async function sitemap() {
  const base = "https://ariana-expeditions.com";

  const staticPages = [
    "",
    "places",
    "trips",
    "about",
    "faq",
    "terms",
    "contact",
    "plan-your-trip",
    "privacy",
    "e-visa",
  ].map((path) => ({
    url: `${base}/${path}`,
    lastModified: new Date(),
  }));

  const trips = await getPublicTrips();
  const tripPages = trips.map((t) => ({
    url: `${base}/trips/${t.slug}`,
    lastModified: new Date(),
  }));

  const places = await getPublicPlaces();
  const placePages = places.map((pl) => ({
    url: `${base}/places/${pl.slug}`,
    lastModified: pl.updated_at || pl.created_at,
  }));

  return [...staticPages, ...tripPages, ...placePages];
}
