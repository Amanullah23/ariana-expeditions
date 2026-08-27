import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Afghanistan E-Visa Guide | Ariana Expeditions",
  description:
    "Everything you need to know about applying for an Afghanistan tourist e-visa — application steps, processing times, validity, and entry requirements.",
};

const steps = [
  {
    number: "01",
    title: "Register",
    desc: "Create an account on the official E-Afghans Visa Portal.",
  },
  {
    number: "02",
    title: "Complete the Form",
    desc: "Fill out your personal details and travel information.",
  },
  {
    number: "03",
    title: "Upload Documents",
    desc: "Submit a clear passport scan and a digital passport-sized photo with a white background.",
  },
  {
    number: "04",
    title: "Pay Initial Fee",
    desc: "Pay the processing application fee within 48 hours of submitting your application.",
  },
  {
    number: "05",
    title: "Pay Final Fee",
    desc: "Once approved, pay the remaining fee within 7 days to download your digital visa grant notice.",
  },
];

const quickFacts = [
  {
    label: "Processing Time",
    value: "1–3 Weeks",
    note: "Express available in 1 business day",
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
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    label: "Validity",
    value: "90 Days",
    note: "To enter, from date of issuance",
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
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
        />
      </svg>
    ),
  },
  {
    label: "Maximum Stay",
    value: "30 Days",
    note: "Per entry",
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
  {
    label: "Entry Point",
    value: "Kabul (KBL)",
    note: "Currently the only valid entry airport",
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
          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
        />
      </svg>
    ),
  },
];

export default function EVisaPage() {
  return (
    <>
      <Navbar />

      <section className="bg-dark pt-32 pb-20 px-6 text-center">
        <Reveal>
          <span className="text-gold text-xs font-semibold tracking-widest uppercase">
            Travel Requirements
          </span>
          <h1 className="font-heading text-4xl md:text-5xl text-white mt-2 mb-4">
            Afghanistan E-Visa Guide
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Everything you need to know about applying for your tourist e-visa
            before joining us on your journey.
          </p>
        </Reveal>
      </section>

      {/* Quick facts dashboard */}
      <section className="max-w-6xl mx-auto px-6 -mt-10 relative z-10">
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickFacts.map((fact) => (
              <div
                key={fact.label}
                className="bg-white rounded-xl shadow-md p-5 text-center"
              >
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-gold/15 text-dark mb-3">
                  {fact.icon}
                </span>
                <p className="font-heading text-xl text-dark">{fact.value}</p>
                <p className="text-charcoal text-xs font-semibold uppercase tracking-wide mt-1">
                  {fact.label}
                </p>
                <p className="text-charcoal/60 text-xs mt-1">{fact.note}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Application steps */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <Reveal>
          <div className="text-center mb-12">
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">
              How It Works
            </span>
            <h2 className="font-heading text-3xl md:text-4xl mt-2 text-dark">
              Application Steps
            </h2>
          </div>
        </Reveal>

        <div className="relative">
          <div className="hidden md:block absolute left-6 top-4 bottom-4 w-px bg-dark/10" />
          <div className="space-y-8">
            {steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 100}>
                <div className="relative flex gap-6 items-start">
                  <span className="hidden md:flex shrink-0 w-12 h-12 rounded-full bg-dark text-gold font-heading text-lg items-center justify-center relative z-10">
                    {step.number}
                  </span>
                  <div className="bg-white rounded-lg shadow-sm p-5 flex-1">
                    <span className="md:hidden text-gold font-heading text-sm font-bold">
                      Step {step.number}
                    </span>
                    <h3 className="font-heading text-lg text-dark mb-1">
                      {step.title}
                    </h3>
                    <p className="text-charcoal text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Key details table */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-10">
              <span className="text-gold text-xs font-semibold tracking-widest uppercase">
                Good to Know
              </span>
              <h2 className="font-heading text-3xl md:text-4xl mt-2 text-dark">
                Key Details
              </h2>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="bg-cream rounded-lg overflow-hidden">
              <div className="divide-y divide-dark/10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 p-5">
                  <p className="font-heading text-dark">Cost</p>
                  <div className="sm:col-span-2">
                    <p className="text-charcoal text-sm mb-2">
                      Visa fees vary by nationality and processing option —
                      please get in touch and we&apos;ll walk you through the
                      current cost for your situation.
                    </p>
                    <Link
                      href="/contact"
                      className="inline-block text-gold text-sm font-semibold hover:underline"
                    >
                      Contact Us for Current Pricing →
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 p-5">
                  <p className="font-heading text-dark">Processing Time</p>
                  <p className="text-charcoal text-sm sm:col-span-2">
                    Standard processing takes 1 to 3 weeks. Express processing
                    is available and typically takes 1 business day.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 p-5">
                  <p className="font-heading text-dark">Validity &amp; Stay</p>
                  <p className="text-charcoal text-sm sm:col-span-2">
                    The e-visa is valid for entry within 90 days of issuance,
                    and allows a maximum stay of 30 days once you arrive.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 p-5">
                  <p className="font-heading text-dark">Entry Requirements</p>
                  <p className="text-charcoal text-sm sm:col-span-2">
                    Entry using the e-visa is currently restricted to Kabul
                    International Airport. You may exit Afghanistan through any
                    border crossing.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dark py-16 px-6 text-center">
        <Reveal>
          <h2 className="font-heading text-2xl md:text-3xl text-white mb-3">
            Ready to Apply?
          </h2>
          <p className="text-white/80 max-w-md mx-auto mb-6">
            Applications are submitted through the official E-Afghans Visa
            Portal — the authorized platform for Afghanistan tourist e-visas.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://eafghans.com/e-visa/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gold hover:bg-white transition-colors duration-300 text-dark font-semibold px-8 py-3 rounded"
            >
              Apply on the Official Portal →
            </a>
            <Link
              href="/contact"
              className="inline-block border border-white/30 hover:border-gold hover:text-gold transition-colors duration-300 text-white font-semibold px-8 py-3 rounded"
            >
              Ask Us a Question
            </Link>
          </div>
          <p className="text-white/50 text-xs mt-6 max-w-xl mx-auto">
            Ariana Expeditions is not affiliated with the Afghan government or
            the E-Afghans Visa Portal. Visa requirements and processes can
            change — always confirm current details on the official portal
            before applying.
          </p>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
