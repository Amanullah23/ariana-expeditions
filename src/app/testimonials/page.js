import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getPublicTestimonials } from "@/lib/data/testimonials";

export const metadata = {
  title: "Traveler Stories | Ariana Expeditions",
  description:
    "Real stories from travelers who explored Afghanistan with Ariana Expeditions — their journeys, their words, their photos.",
};

export const revalidate = 0;

export default async function Testimonials() {
  const testimonials = await getPublicTestimonials();

  return (
    <>
      <Navbar />

      <section className="bg-dark pt-32 pb-20 px-6 text-center">
        <Reveal>
          <span className="text-gold text-xs font-semibold tracking-widest uppercase">
            Traveler Stories
          </span>
          <h1 className="font-heading text-4xl md:text-5xl text-white mt-2 mb-4">
            What Our Travelers Say
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Real journeys, real people — read the stories behind the quotes.
          </p>
        </Reveal>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <Reveal key={t.id} delay={Math.min(i, 6) * 80}>
                <Link
                  href={`/testimonials/${t.slug}`}
                  className="group flex flex-col items-center text-center h-full bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-8"
                >
                  <svg
                    className="w-9 h-9 text-gold mb-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                  </svg>

                  <p className="text-charcoal text-sm leading-relaxed flex-1 line-clamp-6 mb-6">
                    {t.quote}
                  </p>

                  <span className="block w-10 h-px bg-dark/15 mb-5" />

                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-cream mb-4 shrink-0">
                    <Image
                      src={t.img || "/images/hero1.jpg"}
                      alt={t.name}
                      fill
                      sizes="64px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <h3 className="font-heading text-lg text-dark">{t.name}</h3>
                  {t.location && (
                    <p className="text-charcoal/60 text-xs mt-0.5">
                      {t.location}
                    </p>
                  )}
                  {t.trip_taken && (
                    <p className="text-gold text-xs font-semibold uppercase tracking-wide mt-2">
                      {t.trip_taken}
                    </p>
                  )}

                  <span className="text-gold text-xs font-medium mt-4 group-hover:underline">
                    Read Full Story →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="text-charcoal text-center py-12">
            Traveler stories are on the way — check back soon.
          </p>
        )}
      </section>

      <section className="bg-white py-16 px-6 text-center border-t border-dark/10">
        <Reveal>
          <h2 className="font-heading text-2xl md:text-3xl text-dark mb-3">
            Ready to Write Your Own Story?
          </h2>
          <p className="text-charcoal max-w-md mx-auto mb-6">
            Explore our guided itineraries and start planning your own
            Afghanistan journey.
          </p>
          <Link
            href="/trips"
            className="inline-block bg-gold hover:bg-dark hover:text-white transition-colors duration-300 text-dark font-semibold px-8 py-3 rounded"
          >
            View Trips
          </Link>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
