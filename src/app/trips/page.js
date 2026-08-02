import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getPublicTrips } from "@/lib/data/trips";
import TripsSearch from "./TripsSearch";

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

      <TripsSearch trips={trips} />

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
