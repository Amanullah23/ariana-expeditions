import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { createClient } from "@/lib/supabase/public";

async function getThemeBySlug(slug) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("destinations")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) return null;
  return data;
}

async function getPlacesForTheme(themeId) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("places")
    .select("*")
    .eq("destination_id", themeId)
    .eq("status", "active")
    .order("sort_order", { ascending: true });
  if (error) return [];
  return data;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const theme = await getThemeBySlug(slug);
  if (!theme) return {};
  return {
    title: `${theme.title} | Ariana Expeditions`,
    description: theme.intro,
  };
}

export const revalidate = 0;

export default async function ThemeDetail({ params }) {
  const { slug } = await params;
  const theme = await getThemeBySlug(slug);
  if (!theme) return notFound();

  const places = await getPlacesForTheme(theme.id);

  return (
    <>
      <Navbar />

      <section className="relative h-[45vh] w-full">
        <Image
          src={theme.img || "/images/hero1.jpg"}
          alt={theme.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/30 to-dark/80" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          {theme.tag && (
            <span className="bg-gold text-dark text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {theme.tag}
            </span>
          )}
          <h1 className="font-heading text-4xl md:text-5xl text-white drop-shadow-lg">
            {theme.title}
          </h1>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12 text-center">
        <Reveal>
          <Link
            href="/places"
            className="inline-flex items-center gap-2 text-charcoal hover:text-gold transition-colors duration-200 text-sm font-medium mb-8"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            All Sites & Themes
          </Link>
          {theme.intro && (
            <p className="text-charcoal text-lg leading-relaxed">
              {theme.intro}
            </p>
          )}
        </Reveal>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        {places.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {places.map((pl, i) => (
              <Reveal key={pl.id} delay={Math.min(i, 6) * 80}>
                <Link
                  href={`/places/${pl.slug}`}
                  className="group flex flex-col h-full rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
                >
                  <div className="relative h-52 shrink-0">
                    <Image
                      src={pl.main_image || "/images/hero1.jpg"}
                      alt={pl.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {pl.category && (
                      <span className="absolute top-4 left-4 bg-gold text-dark text-xs font-semibold px-3 py-1 rounded-full">
                        {pl.category}
                      </span>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    {pl.province && (
                      <p className="text-gold text-xs font-semibold uppercase tracking-wide mb-1">
                        {pl.province}
                      </p>
                    )}
                    <h3 className="font-heading text-xl mb-2">{pl.name}</h3>
                    <p className="text-charcoal text-sm mb-4 flex-1">
                      {pl.short_description}
                    </p>
                    <span className="text-gold text-sm font-medium group-hover:underline">
                      Discover This Place →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="text-charcoal text-center">
            No sites have been added to this theme yet — check back soon.
          </p>
        )}
      </section>

      <Footer />
    </>
  );
}
