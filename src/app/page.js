import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import RotatingProvince from "@/components/RotatingProvince";
import DestinationMarquee from "@/components/DestinationMarquee";
import { getPublicTrips } from "@/lib/data/trips";
import { getPublicThemes } from "@/lib/data/places";
import { getPublicTestimonials } from "@/lib/data/testimonials";

export const revalidate = 0;

export default async function Home() {
  const [allTrips, themes, testimonials] = await Promise.all([
    getPublicTrips(),
    getPublicThemes(),
    getPublicTestimonials(3),
  ]);

  const trips = allTrips.slice(0, 4);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen w-full bg-dark overflow-hidden flex flex-col items-center justify-center text-center px-6">
        <div
          className="hero-dots absolute inset-0"
          style={{
            backgroundImage: `
      radial-gradient(circle, rgba(255,255,255,0.18) 1.5px, transparent 1.5px),
      radial-gradient(circle, rgba(255,255,255,0.14) 1px, transparent 1px),
      radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)
    `,
            backgroundSize: "56px 56px, 83px 71px, 37px 97px",
            backgroundPosition: "0 0, 20px 35px, 45px 10px",
          }}
        />

        <div className="relative z-10 max-w-5xl pt-24 md:pt-26">
          <div
            className="fade-up-in flex items-center justify-center gap-4 mb-6"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="h-px w-10 bg-gold" />
            <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">
              Ariana Expeditions
            </span>
            <span className="h-px w-10 bg-gold" />
          </div>

          <h1
            className="fade-up-in font-heading font-extrabold text-3xl md:text-3xl lg:text-6xl text-white leading-[1.05] mb-6"
            style={{ animationDelay: "0.25s" }}
          >
            Travel Through <br className="hidden md:block" />
            <span className="italic text-gold">the Whole Story</span>
          </h1>

          <p
            className="fade-up-in text-white/90 text-lg md:text-xl mb-3"
            style={{ animationDelay: "0.4s" }}
          >
            Explore breathtaking <RotatingProvince />
          </p>

          <p
            className="fade-up-in text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10"
            style={{ animationDelay: "0.5s" }}
          >
            Guided journeys through ancient Silk Road cities, turquoise lakes,
            and timeless mountain landscapes — crafted for travelers who seek
            what few others have experienced.
          </p>

          <div
            className="fade-up-in flex flex-wrap items-center justify-center gap-4"
            style={{ animationDelay: "0.65s" }}
          >
            <Link
              href="/blog"
              className="bg-gold hover:bg-white transition-colors duration-300 text-dark font-semibold px-8 py-3 rounded"
            >
              Read the Stories
            </Link>
            <Link
              href="/plan-your-trip"
              className="border border-white/30 hover:border-gold hover:text-gold transition-colors duration-300 text-white font-semibold px-8 py-3 rounded"
            >
              Plan My Trip
            </Link>
          </div>
        </div>

        <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-white/50 text-xs tracking-widest uppercase">
            Scroll
          </span>
          <svg
            className="w-5 h-5 text-gold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </section>

      {/* Intro */}
      <Reveal>
        <section className="max-w-3xl mx-auto text-center px-6 py-20">
          <h2 className="font-heading text-3xl mb-6">
            Your Journey Begins Here
          </h2>
          <p className="text-charcoal leading-relaxed">
            With over four years of experience guiding travelers across
            Afghanistan, Ariana Expeditions combines international perspective
            with deep local knowledge to create journeys that go beyond the
            ordinary — from the turquoise lakes of Bamyan to the timeless
            streets of Herat.
          </p>
        </section>
      </Reveal>

      {/* Destinations preview */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <Reveal>
          <div className="text-center mb-10">
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">
              Discover Afghanistan
            </span>
            <h2 className="font-heading text-3xl mt-2">Explore by Theme</h2>
          </div>
        </Reveal>

        {themes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {themes.slice(0, 3).map((t, i) => (
              <Reveal key={t.id} delay={i * 120}>
                <Link
                  href={`/places?theme=${encodeURIComponent(t.title)}`}
                  className="group block overflow-hidden rounded-lg shadow-md"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={t.img || "/images/hero1.jpg"}
                      alt={t.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="bg-white p-5 text-center">
                    <h3 className="font-heading text-xl mb-1">{t.title}</h3>
                    <p className="text-charcoal text-sm">{t.tag}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal delay={300}>
          <div className="text-center mb-10">
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">
              Discover Afghanistan
            </span>
            <h2 className="font-heading text-2xl md:text-3xl text-dark mt-2 mb-3">
              Places That Await
            </h2>
            <p className="text-charcoal max-w-lg mx-auto mb-6">
              A glimpse of the landscapes, cities, and landmarks woven into
              every journey.
            </p>
            <Link
              href="/places"
              className="inline-block bg-gold hover:bg-dark hover:text-white transition-colors duration-300 text-dark font-semibold px-8 py-3 rounded"
            >
              Explore All Historical Sites
            </Link>
          </div>
        </Reveal>

        <Reveal delay={350}>
          <DestinationMarquee />
        </Reveal>
      </section>

      {/* Featured trips */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-gold text-xs font-semibold tracking-widest uppercase">
                Curated Itineraries
              </span>
              <h2 className="font-heading text-3xl md:text-4xl mt-2">
                Featured Trips
              </h2>
              <p className="text-charcoal max-w-xl mx-auto mt-3">
                Explore Afghanistan — or let us tailor a journey just for you.
              </p>
            </div>
          </Reveal>

          {trips.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trips.map((t, i) => (
                <Reveal key={t.id} delay={i * 100}>
                  <Link
                    href={`/trips/${t.slug}`}
                    className="group block h-full bg-cream rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={t.img || "/images/hero1.jpg"}
                        alt={t.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <span className="absolute top-3 right-3 bg-gold text-dark text-xs font-semibold px-3 py-1 rounded-full">
                        {t.days}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col">
                      <h3 className="font-heading text-lg mb-2 leading-snug">
                        {t.title}
                      </h3>
                      <p className="text-charcoal text-sm mb-4 flex-1">
                        {t.description}
                      </p>
                      <span className="text-gold text-sm font-medium group-hover:underline">
                        View Itinerary →
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="text-charcoal text-center">
              Trips are being added soon — check back shortly.
            </p>
          )}

          <Reveal delay={400}>
            <div className="text-center mt-12">
              <Link
                href="/trips"
                className="inline-block border border-dark text-dark hover:bg-dark hover:text-white transition-colors duration-300 font-semibold px-8 py-3 rounded"
              >
                View All Trips
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="bg-cream py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="text-center mb-12">
                <span className="text-gold text-xs font-semibold tracking-widest uppercase">
                  Traveler Stories
                </span>
                <h2 className="font-heading text-3xl md:text-4xl mt-2 text-dark">
                  What Our Travelers Say
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {testimonials.map((t, i) => (
                <Reveal key={t.id} delay={i * 120}>
                  <Link
                    href={`/testimonials/${t.slug}`}
                    className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6 h-full flex flex-col"
                  >
                    <span className="text-gold text-3xl font-heading mb-2 leading-none">
                      &ldquo;
                    </span>
                    <p className="text-charcoal text-sm leading-relaxed flex-1 mb-4 line-clamp-4">
                      {t.quote}
                    </p>
                    <div className="mb-3">
                      <p className="font-heading text-dark text-sm">{t.name}</p>
                      <p className="text-charcoal/60 text-xs">{t.location}</p>
                    </div>
                    <span className="text-gold text-xs font-medium group-hover:underline">
                      Read Full Story →
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>

            <Reveal delay={300}>
              <div className="text-center">
                <Link
                  href="/testimonials"
                  className="inline-block border border-dark text-dark hover:bg-dark hover:text-white transition-colors duration-300 font-semibold px-8 py-3 rounded"
                >
                  Read All Traveler Stories
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
