import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const steps = [
  {
    number: "01",
    title: "Tell Us Your Vision",
    desc: "Share your travel dates, interests, and group size. Whether you want a fixed itinerary or something fully custom, we start by listening.",
  },
  {
    number: "02",
    title: "We Design Your Itinerary",
    desc: "Our local team builds a day-by-day plan — destinations, accommodation, transport, and guides — matched to your pace and budget.",
  },
  {
    number: "03",
    title: "Review & Refine",
    desc: "We walk you through the proposal and adjust anything until it feels right. No pressure, no rush.",
  },
  {
    number: "04",
    title: "Confirm & Prepare",
    desc: "Once you're happy, a deposit secures your dates. We then guide you through visas, packing, and what to expect on the ground.",
  },
  {
    number: "05",
    title: "Travel With Us",
    desc: "Arrive in Afghanistan and let us take care of the rest — guided, supported, and welcomed the entire way.",
  },
];

const reasons = [
  {
    title: "Local Expertise, International Standards",
    desc: "Founded by an Afghan guide and an international co-founder, so every trip blends deep local knowledge with the reliability travelers expect.",
  },
  {
    title: "Flexible, Not Fixed",
    desc: "Take one of our signature itineraries as-is, or reshape it entirely — extra days, different regions, private groups.",
  },
  {
    title: "Transparent From Day One",
    desc: "Clear pricing, honest safety guidance, and no surprises — we tell you upfront if something isn't possible.",
  },
];

export const metadata = {
  title: "Plan Your Trip | Custom Afghanistan Group Tours",
  description:
    "How to plan your Afghanistan tour with Ariana Expeditions — choose a signature itinerary or build a fully custom Afghanistan cultural tour.",
};

export default function PlanYourTrip() {
  return (
    <>
      <Navbar />

      <section className="relative h-[55vh] w-full overflow-hidden">
        <Image
          src="/images/hero1.jpg"
          alt="Planning your Afghanistan journey"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/40 to-dark/80" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <Reveal>
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">
              Start Here
            </span>
            <h1 className="font-heading text-4xl md:text-5xl text-white mt-2 mb-4 drop-shadow-lg">
              Plan Your Trip
            </h1>
            <p className="text-white max-w-xl mx-auto drop-shadow">
              Five simple steps between where you are now and standing in front
              of the Blue Mosque of Herat.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <Reveal>
          <h2 className="font-heading text-3xl text-center mb-14">
            How It Works
          </h2>
        </Reveal>

        <div className="space-y-8">
          {steps.map((s, i) => (
            <Reveal key={s.number} delay={i * 100}>
              <div className="flex gap-6 items-start">
                <span className="font-heading text-4xl text-gold/60 shrink-0 w-16">
                  {s.number}
                </span>
                <div className="border-l-2 border-dark/10 pl-6 pb-2">
                  <h3 className="font-heading text-xl text-dark mb-2">
                    {s.title}
                  </h3>
                  <p className="text-charcoal leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why plan with us */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="font-heading text-3xl text-center mb-12">
              Why Travelers Plan With Us
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 120}>
                <div className="bg-cream rounded-lg p-6 h-full">
                  <h3 className="font-heading text-lg text-dark mb-2">
                    {r.title}
                  </h3>
                  <p className="text-charcoal text-sm leading-relaxed">
                    {r.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Options: fixed vs custom */}
      <section className="max-w-5xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-8">
        <Reveal>
          <div className="border border-dark/10 rounded-lg p-8 h-full flex flex-col">
            <h3 className="font-heading text-xl text-dark mb-3">
              Choose a Signature Itinerary
            </h3>
            <p className="text-charcoal text-sm leading-relaxed mb-6 flex-1">
              Four carefully designed trips, from a 7-day introduction to the
              21-day Grand Silk Road Expedition — ready to book as they are.
            </p>
            <Link
              href="/trips"
              className="inline-block text-center border border-dark text-dark hover:bg-dark hover:text-white transition-colors duration-300 font-semibold px-6 py-3 rounded"
            >
              Browse Itineraries
            </Link>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="bg-dark rounded-lg p-8 h-full flex flex-col text-white">
            <h3 className="font-heading text-xl mb-3">Build a Custom Trip</h3>
            <p className="text-white/80 text-sm leading-relaxed mb-6 flex-1">
              Tell us your dates, interests, and group size, and we&apos;ll
              design an itinerary from scratch — entirely around you.
            </p>
            <Link
              href="/contact"
              className="inline-block text-center bg-gold hover:bg-white transition-colors duration-300 text-dark font-semibold px-6 py-3 rounded"
            >
              Start Planning
            </Link>
          </div>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
