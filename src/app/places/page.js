import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { getPublicPlaces, getPublicThemes } from "@/lib/data/places";
import PlacesSearch from "./PlacesSearch";

export const metadata = {
  title: "Historical & Cultural Sites of Afghanistan",
  description:
    "Explore 20+ historical, cultural, and natural landmarks across Afghanistan — from ancient citadels to turquoise lakes — each with its own story and connected guided trips.",
};

export const revalidate = 0;

export default async function Places() {
  const [places, themes] = await Promise.all([
    getPublicPlaces(),
    getPublicThemes(),
  ]);

  return (
    <>
      <Navbar />

      <section className="bg-dark pt-32 pb-20 px-6 text-center">
        <Reveal>
          <span className="text-gold text-xs font-semibold tracking-widest uppercase">
            Discover Afghanistan
          </span>
          <h1 className="font-heading text-4xl md:text-5xl text-white mt-2 mb-4">
            Historical & Cultural Sites
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Ancient citadels, sacred valleys, and landscapes that have shaped
            this country for centuries — discover the places first, then choose
            the journey that takes you there.
          </p>
        </Reveal>
      </section>

      <PlacesSearch places={places} themes={themes} />
    </>
  );
}
