import { getPublicTrips } from "@/lib/data/trips";

export default async function sitemap() {
  const base = "https://arianaexpeditions.com";

  const staticPages = [
    "",
    "destinations",
    "trips",
    "about",
    "faq",
    "terms",
    "contact",
    "plan-your-trip",
    "privacy",
  ].map((path) => ({
    url: `${base}/${path}`,
    lastModified: new Date(),
  }));

  const trips = await getPublicTrips();
  const tripPages = trips.map((t) => ({
    url: `${base}/trips/${t.slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...tripPages];
}
