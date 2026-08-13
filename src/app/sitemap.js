import { getPublicTrips } from "@/lib/data/trips";
import { getPublicBlogPosts } from "@/lib/data/blog";
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
    "blog",
  ].map((path) => ({
    url: `${base}/${path}`,
    lastModified: new Date(),
  }));

  const trips = await getPublicTrips();
  const tripPages = trips.map((t) => ({
    url: `${base}/trips/${t.slug}`,
    lastModified: new Date(),
  }));

  const posts = await getPublicBlogPosts();
  const blogPages = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.updated_at || p.created_at,
  }));

  const places = await getPublicPlaces();
  const placePages = places.map((pl) => ({
    url: `${base}/places/${pl.slug}`,
    lastModified: pl.updated_at || pl.created_at,
  }));

  return [...staticPages, ...tripPages, ...blogPages, ...placePages];
}
