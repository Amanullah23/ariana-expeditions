import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import { getPublicDestinations } from "@/lib/data/destinations";

export const metadata = {
  title: "Afghanistan Destinations | Silk Road Afghanistan Tours",
  description:
    "Explore Afghanistan by theme — Silk Road cities, ancient valleys, and remote mountains. Discover the destinations behind our Afghanistan cultural tours.",
};

export const revalidate = 0;

export default async function Destinations() {
  const groups = await getPublicDestinations();

  return (
    <>
      <Navbar />

      <section className="bg-dark pt-32 pb-20 px-6 text-center">
        <Reveal>
          <span className="text-gold text-xs font-semibold tracking-widest uppercase">
            Explore Afghanistan
          </span>
          <h1 className="font-heading text-4xl md:text-5xl text-white mt-2 mb-4">
            Destinations
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Not by province. By theme — discover Afghanistan through the stories
            its landscapes tell.
          </p>
        </Reveal>
      </section>

      {groups.length > 0 && (
        <section className="bg-white border-b border-dark/10 px-6 py-6 sticky top-0 z-30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <Reveal>
            <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-3">
              {groups.map((g) => (
                <a
                  key={g.slug}
                  href={`#${g.slug}`}
                  className="text-xs md:text-sm font-medium text-dark border border-dark/15 hover:border-gold hover:text-gold transition-colors duration-200 px-4 py-2 rounded-full"
                >
                  {g.title}
                </a>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {groups.map((g, i) => {
        const places = (g.destination_places || []).sort(
          (a, b) => a.sort_order - b.sort_order,
        );

        return (
          <section
            key={g.id}
            id={g.slug}
            className={`py-20 px-6 scroll-mt-24 ${i % 2 === 1 ? "bg-white" : "bg-cream"}`}
          >
            <Reveal>
              <div
                className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={g.img || "/images/hero1.jpg"}
                    alt={g.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <div>
                  {g.tag && (
                    <span className="text-gold text-xs font-semibold tracking-widest uppercase">
                      {g.tag}
                    </span>
                  )}
                  <h2 className="font-heading text-3xl mt-2 mb-3">{g.title}</h2>
                  {g.intro && <p className="text-charcoal mb-6">{g.intro}</p>}

                  {places.length > 0 && (
                    <div className="space-y-4 mb-6">
                      {places.map((p) => (
                        <div
                          key={p.id}
                          className="flex gap-4 bg-white/60 rounded-lg p-4 border border-dark/5"
                        >
                          <span className="shrink-0 w-9 h-9 rounded-full bg-dark text-gold flex items-center justify-center font-heading text-sm">
                            {p.name.charAt(0)}
                          </span>
                          <div>
                            <h3 className="font-heading text-lg text-dark">
                              {p.name}
                            </h3>
                            <p className="text-charcoal text-sm">
                              {p.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {g.gallery?.length > 0 && (
                    <>
                      <h3 className="font-heading text-sm uppercase tracking-widest text-gold mb-3">
                        Gallery
                      </h3>
                      <Gallery images={g.gallery} />
                    </>
                  )}
                </div>
              </div>
            </Reveal>
          </section>
        );
      })}

      {groups.length === 0 && (
        <p className="text-charcoal text-center py-20">
          No destinations available yet — check back soon.
        </p>
      )}

      <section className="bg-dark py-16 px-6 text-center">
        <Reveal>
          <h2 className="font-heading text-2xl md:text-3xl text-white mb-3">
            Ready to See These Places Yourself?
          </h2>
          <p className="text-white/80 max-w-md mx-auto mb-6">
            Every destination above features in one or more of our guided
            itineraries — or we can build one entirely around your interests.
          </p>
          <Link
            href="/trips"
            className="inline-block bg-gold hover:bg-white transition-colors duration-300 text-dark font-semibold px-8 py-3 rounded"
          >
            View Trips
          </Link>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
