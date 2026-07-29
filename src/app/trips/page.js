import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getPublicTrips } from "@/lib/data/trips";

export const metadata = {
  title: "Afghanistan Tours & Group Itineraries",
  description:
    "Guided Afghanistan group tours and cultural tours, from 7-day Bamiyan tours to the 21-day Grand Silk Road Expedition across Afghanistan.",
};

export const revalidate = 0;

export default async function Trips() {
  const trips = await getPublicTrips();

  return (
    <>
      <Navbar />

      <section className="bg-dark pt-32 pb-20 px-6 text-center">
        <Reveal>
          <span className="text-gold text-xs font-semibold tracking-widest uppercase">
            Guided Itineraries
          </span>
          <h1 className="font-heading text-4xl md:text-5xl text-white mt-2 mb-4">
            Trips & Itineraries
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Carefully crafted journeys, or choose a tailor-made adventure of
            your own — every trip led by guides who call this country home.
          </p>
        </Reveal>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-2 gap-8">
        {trips.map((t, i) => (
          <Reveal key={t.id} delay={i * 100}>
            <Link
              href={`/trips/${t.slug}`}
              className="group flex flex-col h-full rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
            >
              <div className="relative h-56 shrink-0">
                <Image
                  src={t.img || "/images/hero1.jpg"}
                  alt={t.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-gold text-dark text-xs font-semibold px-3 py-1 rounded-full">
                  {t.days}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-xs text-charcoal mb-3 tracking-wide">
                  <span>{t.region}</span>
                  {t.difficulty && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-charcoal/50" />
                      <span>{t.difficulty}</span>
                    </>
                  )}
                </div>

                <h3 className="font-heading text-xl mb-2">{t.title}</h3>
                <p className="text-charcoal text-sm mb-4">{t.description}</p>

                {t.highlights?.length > 0 && (
                  <ul className="space-y-1.5 mb-5">
                    {t.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-sm text-charcoal"
                      >
                        <span className="text-gold mt-0.5">✓</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                <span className="inline-block mt-auto text-gold text-sm font-medium group-hover:underline">
                  View Itinerary →
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>

      {trips.length === 0 && (
        <p className="text-charcoal text-center pb-20">
          No trips available yet — check back soon.
        </p>
      )}

      <section className="bg-white py-16 px-6 text-center border-t border-dark/10">
        <Reveal>
          <h2 className="font-heading text-2xl md:text-3xl text-dark mb-3">
            Don&apos;t See What You&apos;re Looking For?
          </h2>
          <p className="text-charcoal max-w-md mx-auto mb-6">
            Every one of our itineraries can be adapted, combined, or built
            entirely from scratch around your dates and interests.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gold hover:bg-dark hover:text-white transition-colors duration-300 text-dark font-semibold px-8 py-3 rounded"
          >
            Request a Custom Itinerary
          </Link>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
