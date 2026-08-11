import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import VideoPlayer from "@/components/VideoPlayer";
import { getPublicPlaceBySlug, getAllPlaceSlugs } from "@/lib/data/places";

export async function generateStaticParams() {
  const slugs = await getAllPlaceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const place = await getPublicPlaceBySlug(slug);

  if (!place) return {};

  return {
    title: `${place.name} | Afghanistan Historical Sites`,
    description: place.short_description,
    openGraph: {
      title: place.name,
      description: place.short_description,
      images: place.main_image ? [place.main_image] : ["/images/hero1.jpg"],
      type: "article",
    },
  };
}

export const revalidate = 0;

export default async function PlaceDetail({ params }) {
  const { slug } = await params;
  const place = await getPublicPlaceBySlug(slug);

  if (!place) return notFound();

  return (
    <>
      <Navbar />

      <section className="relative h-[55vh] w-full">
        <Image
          src={place.main_image || "/images/hero1.jpg"}
          alt={place.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/30 to-dark/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          {place.category && (
            <span className="bg-gold text-dark text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {place.category}
            </span>
          )}
          <h1 className="font-heading text-4xl md:text-5xl text-white drop-shadow-lg max-w-3xl">
            {place.name}
          </h1>
          {place.province && (
            <p className="text-white/85 mt-3">{place.province}</p>
          )}
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-6 py-16">
        {place.short_description && (
          <p className="text-charcoal text-lg leading-relaxed mb-10">
            {place.short_description}
          </p>
        )}

        {place.full_details && (
          <Reveal>
            <div className="mb-12">
              <h2 className="font-heading text-2xl text-dark mb-4">
                History & Details
              </h2>
              <div className="prose-content text-charcoal leading-relaxed space-y-4">
                {place.full_details.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {(place.youtube_url || place.video_url) && (
          <Reveal>
            <div className="mb-12">
              <h2 className="font-heading text-2xl text-dark mb-4">Watch</h2>
              <VideoPlayer
                youtubeUrl={place.youtube_url}
                videoUrl={place.video_url}
                title={place.name}
              />
            </div>
          </Reveal>
        )}

        {place.gallery?.length > 0 && (
          <Reveal>
            <div className="mb-12">
              <h2 className="font-heading text-2xl text-dark mb-4">Gallery</h2>
              <Gallery images={place.gallery} />
            </div>
          </Reveal>
        )}

        {place.visitor_experience && (
          <Reveal>
            <div className="mb-12 bg-cream rounded-lg p-6 md:p-8">
              <h2 className="font-heading text-xl text-dark mb-3">
                Visitor Experience
              </h2>
              <p className="text-charcoal leading-relaxed italic">
                &ldquo;{place.visitor_experience}&rdquo;
              </p>
            </div>
          </Reveal>
        )}

        {place.linkedTrips?.length > 0 && (
          <Reveal>
            <div className="mb-12">
              <h2 className="font-heading text-2xl text-dark mb-4">
                Trips That Visit {place.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {place.linkedTrips.map((trip) => (
                  <Link
                    key={trip.slug}
                    href={`/trips/${trip.slug}`}
                    className="group flex items-center gap-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4 border border-dark/5"
                  >
                    <div className="relative w-20 h-16 shrink-0 rounded overflow-hidden">
                      <Image
                        src={trip.img || "/images/hero1.jpg"}
                        alt={trip.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-sm text-dark leading-snug">
                        {trip.title}
                      </h3>
                      <p className="text-gold text-xs font-medium">
                        {trip.days}
                      </p>
                    </div>
                    <span className="text-gold group-hover:translate-x-1 transition-transform duration-200">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        <div className="text-center pt-6 border-t border-dark/10">
          <p className="text-charcoal mb-5">
            Don&apos;t see a trip that fits? We can build one entirely around
            the places you want to see.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gold hover:bg-dark hover:text-white transition-colors duration-300 text-dark font-semibold px-8 py-3 rounded"
          >
            Plan a Custom Visit
          </Link>
        </div>
      </article>

      <Footer />
    </>
  );
}
