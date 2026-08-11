import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import AfghanistanMap from "@/components/AfghanistanMap";
import {
  getAboutIntro,
  getPublicFounders,
  getPublicLicenses,
} from "@/lib/data/about";

const stats = [
  { value: "4+", label: "Years of Experience" },
  { value: "6", label: "Signature Destinations" },
  { value: "2", label: "Founders, One Vision" },
  { value: "100%", label: "Licensed & Local" },
];

const markets = [
  {
    code: "DE",
    country: "Germany",
    desc: "Cultural and educational journeys of 12–21 days — history, UNESCO sites, and meticulously organized itineraries.",
  },
  {
    code: "FR",
    country: "France",
    desc: "Culture, gastronomy, architecture, and history — depth over journey.",
  },
  {
    code: "RU",
    country: "Russia",
    desc: "Growing curiosity about Central Asia and destinations few others have explored.",
  },
  {
    code: "CN",
    country: "China",
    desc: "Rising interest in Central Asian and Ariana Expeditions heritage travel.",
  },
];

const values = [
  {
    title: "Customized Travel Designing",
    desc: "Every itinerary is planned around you — your pace, interests, and comfort.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.6}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
        />
      </svg>
    ),
  },
  {
    title: "Professional Local Team",
    desc: "Guides and logistics staff who know Afghanistan's roads, culture, and people firsthand.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.6}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
        />
      </svg>
    ),
  },
  {
    title: "Deep Local Knowledge",
    desc: "Years guiding travelers across every region we cover, so nothing is left to guesswork.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.6}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m-15.432 0A8.959 8.959 0 013 12c0-.778.099-1.533.284-2.253"
        />
      </svg>
    ),
  },
  {
    title: "We Work With Integrity",
    desc: "Honest business is a sustainable business — we never compromise on quality or values.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.6}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12c0 4.556-3.02 8.373-7.163 9.616a1.5 1.5 0 01-.674 0C8.02 20.373 5 16.556 5 12V6.545c0-.564.34-1.07.86-1.293l6-2.572a1.5 1.5 0 011.28 0l6 2.572c.52.223.86.729.86 1.293V12z"
        />
      </svg>
    ),
  },
];

export const metadata = {
  title: "About Us | Your Afghanistan Travel Specialist",
  description:
    "Meet the founders behind Ariana Expeditions — a trusted Afghanistan travel specialist combining local expertise with international standards.",
};
export const revalidate = 0;

export default async function About() {
  const [intro, founders, licenses] = await Promise.all([
    getAboutIntro(),
    getPublicFounders(),
    getPublicLicenses(),
  ]);

  return (
    <>
      <Navbar />

      <section className="bg-dark pt-32 pb-20 px-6 text-center">
        <Reveal>
          <span className="text-gold text-xs font-semibold tracking-widest uppercase">
            Our Story
          </span>
          <h1 className="font-heading text-4xl md:text-5xl text-white mt-2 mb-4">
            Travel Through the Heart of Afghanistan
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            A crossroads of civilizations, a land of ancient Silk Road cities,
            breathtaking mountain landscapes, and traditions that have endured
            for centuries.
          </p>
        </Reveal>
      </section>

      {/* Stats strip */}
      <section className="bg-white border-b border-dark/10 px-6 py-10">
        <Reveal>
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-heading text-3xl md:text-4xl text-dark">
                  {s.value}
                </div>
                <div className="text-charcoal text-xs md:text-sm tracking-wide mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Intro */}
      {/* Intro */}
      {intro?.description && (
        <section className="max-w-4xl mx-auto px-6 py-16 text-center">
          <Reveal>
            <p className="text-charcoal leading-relaxed">{intro.description}</p>
          </Reveal>
        </section>
      )}

      {/* Founders */}
      {/* Founders */}
      {founders.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-2 gap-10">
          {founders.map((f, i) => (
            <Reveal key={f.id} delay={i * 150}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
                <div className="relative h-64">
                  <Image
                    src={f.image || "/images/hero1.jpg"}
                    alt={f.full_name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl text-dark">
                    {f.full_name}
                  </h3>
                  {f.position && (
                    <p className="text-gold text-sm font-medium mb-3">
                      {f.position}
                    </p>
                  )}
                  {f.bio && (
                    <div className="text-charcoal text-sm leading-relaxed space-y-3">
                      {f.bio.split("\n\n").map((para, idx) => (
                        <p key={idx}>{para}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </section>
      )}

      {/* Philosophy */}
      <section className="bg-dark py-20 px-6 text-center">
        <Reveal>
          <span className="text-gold text-xs font-semibold tracking-widest uppercase">
            Our Philosophy
          </span>
          <h2 className="font-heading text-3xl md:text-4xl text-white mt-2 mb-5">
            Genuine Human Connection, Above All
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto leading-relaxed">
            We believe the most memorable journeys are built on genuine human
            connections. Our tours are designed for curious travelers who seek
            more than sightseeing — people who want to understand a place
            through its history, culture, and everyday life.
          </p>
        </Reveal>
      </section>

      {/* Values grid */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <Reveal>
          <h2 className="font-heading text-3xl text-center mb-12">
            What We Stand For
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 100}>
              <div className="text-center h-full">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-dark text-gold mb-4">
                  {v.icon}
                </span>
                <h3 className="font-heading text-lg text-dark mb-2">
                  {v.title}
                </h3>
                <p className="text-charcoal text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      {/* International travelers */}
      <section className="bg-dark py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">
              A Global Welcome
            </span>
            <h2 className="font-heading text-3xl md:text-4xl text-white mt-2 mb-4">
              Trusted by Travelers Worldwide
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-12">
              We work closely with cultural and specialist travel communities
              across the world to bring discerning travelers safely and
              knowledgeably into Afghanistan.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {markets.map((m, i) => (
              <Reveal key={m.country} delay={i * 100}>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 h-full">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold text-dark font-heading font-bold text-sm mb-4">
                    {m.code}
                  </span>
                  <h3 className="font-heading text-lg text-white mb-2">
                    {m.country}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* Interactive map */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <Reveal>
          <div className="text-center mb-10">
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">
              Where We Go
            </span>
            <h2 className="font-heading text-3xl md:text-4xl mt-2 text-dark">
              Explore Afghanistan on the Map
            </h2>
            <p className="text-charcoal max-w-xl mx-auto mt-3">
              Hover over a destination to learn more, or click through to
              explore it in detail.
            </p>
          </div>
          <AfghanistanMap />
        </Reveal>
      </section>
      {/* Licensing */}

      {/* Licensing */}
      {licenses.length > 0 && (
        <section className="bg-white py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="text-center mb-12">
                <span className="text-gold text-xs font-semibold tracking-widest uppercase">
                  Fully Licensed
                </span>
                <h2 className="font-heading text-3xl md:text-4xl mt-2 text-dark">
                  Registered & Regulated
                </h2>
                <p className="text-charcoal max-w-xl mx-auto mt-3">
                  Ariana Expeditions operates as a fully licensed tour operator
                  in both Afghanistan and Germany, giving travelers confidence
                  and legal recourse on both ends of their journey.
                </p>
              </div>
            </Reveal>

            <div
              className={`grid grid-cols-1 ${licenses.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1 max-w-md mx-auto"} gap-8`}
            >
              {licenses.map((lic, i) => (
                <Reveal key={lic.id} delay={i * 100}>
                  <div className="bg-cream rounded-lg p-6 text-center h-full flex flex-col items-center">
                    <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-white border border-dark/10">
                      <Image
                        src={lic.image || "/images/hero1.jpg"}
                        alt={lic.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain p-4"
                      />
                    </div>
                    <h3 className="font-heading text-lg text-dark mb-1">
                      {lic.title}
                    </h3>
                    {lic.description && (
                      <p className="text-charcoal text-sm mb-1">
                        {lic.description}
                      </p>
                    )}
                    {lic.license_number && (
                      <p className="text-charcoal/60 text-xs mt-1">
                        License No. {lic.license_number}
                      </p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* Closing CTA */}
      <section className="bg-cream py-16 px-6 text-center">
        <Reveal>
          <h2 className="font-heading text-2xl md:text-3xl text-dark mb-3">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-charcoal max-w-md mx-auto mb-6">
            Explore our curated itineraries, or tell us what you have in mind
            and we&apos;ll design something just for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/trips"
              className="inline-block bg-gold hover:bg-dark hover:text-white text-dark transition-colors duration-300 font-semibold px-8 py-3 rounded"
            >
              View Trips
            </Link>
            <Link
              href="/contact"
              className="inline-block border border-dark text-dark hover:bg-dark hover:text-white transition-colors duration-300 font-semibold px-8 py-3 rounded"
            >
              Contact Us
            </Link>
          </div>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
