import { getPublicTrips } from "@/lib/data/trips";
import { getPublicBlogPosts } from "@/lib/data/blog";

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

  return [...staticPages, ...tripPages, ...blogPages];
}
