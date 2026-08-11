import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicTripBySlug, getAllTripSlugs } from "@/lib/data/trips";
import AccordionItem from "./AccordionItem";
import Gallery from "@/components/Gallery";
import VideoPlayer from "@/components/VideoPlayer";
import EnquireButton from "@/components/EnquireButton";

export async function generateStaticParams() {
  const slugs = await getAllTripSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const trip = await getPublicTripBySlug(slug);

  if (!trip) return {};

  return {
    title: `${trip.title} | ${trip.days} Afghanistan Tour`,
    description: trip.description,
  };
}

export const revalidate = 0;

export default async function TripDetail({ params }) {
  const { slug } = await params;
  const trip = await getPublicTripBySlug(slug);

  if (!trip) return notFound();

  const itinerary = (trip.trip_itinerary_items || [])
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((item) => ({
      day: item.day_label,
      title: item.title,
      desc: item.description,
    }));

  return (
    <>
      <Navbar />

      <section className="relative h-[60vh] w-full">
        <Image
          src={trip.img || "/images/hero1.jpg"}
          alt={trip.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/30 to-dark/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <span className="bg-gold text-dark text-xs font-semibold px-3 py-1 rounded-full mb-4">
            {trip.days}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl text-white drop-shadow-lg">
            {trip.title}
          </h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        {trip.description && (
          <p className="text-charcoal text-lg leading-relaxed mb-12">
            {trip.description}
          </p>
        )}

        {(trip.youtube_url || trip.video_url) && (
          <div className="mb-12">
            <h2 className="font-heading text-2xl text-dark mb-4">
              See This Journey
            </h2>
            <VideoPlayer
              youtubeUrl={trip.youtube_url}
              videoUrl={trip.video_url}
              title={trip.title}
            />
          </div>
        )}

        {itinerary.length > 0 && (
          <>
            <h2 className="font-heading text-2xl mb-4">Day-by-Day Itinerary</h2>
            <div className="mb-12">
              {itinerary.map((item, i) => (
                <AccordionItem key={i} {...item} />
              ))}
            </div>
          </>
        )}

        {trip.gallery?.length > 0 && (
          <>
            <h2 className="font-heading text-2xl mb-4">Gallery</h2>
            <div className="mb-12">
              <Gallery images={trip.gallery} />
            </div>
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {trip.includes?.length > 0 && (
            <div>
              <h3 className="font-heading text-lg mb-3 text-dark">Includes</h3>
              <ul className="space-y-2">
                {trip.includes.map((i) => (
                  <li key={i} className="text-charcoal text-sm flex gap-2">
                    <span className="text-gold">✓</span> {i}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {trip.excludes?.length > 0 && (
            <div>
              <h3 className="font-heading text-lg mb-3 text-dark">Excludes</h3>
              <ul className="space-y-2">
                {trip.excludes.map((i) => (
                  <li key={i} className="text-charcoal text-sm flex gap-2">
                    <span className="text-charcoal">–</span> {i}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="text-center">
          <EnquireButton
            href="/contact"
            className="inline-block bg-gold hover:bg-dark hover:text-white transition-colors duration-300 text-dark font-semibold px-8 py-3 rounded"
          >
            Enquire About This Trip
          </EnquireButton>
        </div>
      </section>

      <Footer />
    </>
  );
}
