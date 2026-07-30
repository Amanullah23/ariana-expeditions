"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

const contactCards = [
  {
    label: "General Info",
    name: "Ariana Expeditions Team",
    role: "For general inquiries, partnerships, and press",
    phone: "+31 6 17285552",
    whatsapp: "https://wa.me/31617285552",
    email: "info@arianaexpeditions.com",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        />
      </svg>
    ),
  },
  {
    label: "Kabul Office",
    name: "Mr. Jalal Mosavi",
    role: "Co-Founder & Guide, Kabul, Afghanistan",
    phone: "+93 78 787382",
    whatsapp: "https://wa.me/93789889592",
    email: "jalal.mosavi@arianaexpeditions.com",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    label: "Germany Office",
    name: "Mr. Rik Alexander",
    role: "Founder, Berlin, Germany",
    phone: "+31 6 17285552",
    whatsapp: "https://wa.me/31617285552",
    email: "rik@arianaexpeditions.com",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/mrenrygb", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        alert("Something went wrong — please try again or email us directly.");
      }
    } catch {
      alert("Something went wrong — please try again or email us directly.");
    }
  }

  return (
    <>
      <Navbar />

      <section className="bg-dark pt-32 pb-16 px-6 text-center">
        <Reveal>
          <span className="text-gold text-xs font-semibold tracking-widest uppercase">
            Get In Touch
          </span>
          <h1 className="font-heading text-4xl md:text-5xl text-white mt-2 mb-4">
            Plan Your Journey
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Tell us what you have in mind, and we&apos;ll get back to you to
            start planning.
          </p>
        </Reveal>
      </section>

      {/* Offices & general info */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactCards.map((c, i) => (
            <Reveal key={c.label} delay={i * 100}>
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-7 h-full flex flex-col">
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-dark text-gold mb-5">
                  {c.icon}
                </span>

                <span className="text-gold text-xs font-semibold uppercase tracking-widest mb-2">
                  {c.label}
                </span>

                {c.name && (
                  <>
                    <h3 className="font-heading text-lg text-dark leading-snug">
                      {c.name}
                    </h3>
                    <p className="text-charcoal/70 text-xs mb-4">{c.role}</p>
                  </>
                )}

                <div className="mt-auto space-y-3 pt-3">
                  <a
                    href={`tel:${c.phone.replace(/\s+/g, "")}`}
                    className="group flex items-center gap-3 text-sm text-charcoal hover:text-dark transition-colors duration-200"
                  >
                    <span className="shrink-0 w-9 h-9 rounded-full bg-dark/8 group-hover:bg-dark flex items-center justify-center transition-colors duration-200">
                      <svg
                        className="w-4.5 h-4.5 text-dark group-hover:text-gold transition-colors duration-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                        />
                      </svg>
                    </span>
                    <span className="font-medium">{c.phone}</span>
                  </a>
                  <a
                    href={c.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-sm text-charcoal hover:text-dark transition-colors duration-200"
                  >
                    <span className="shrink-0 w-9 h-9 rounded-full bg-[#25D366]/15 group-hover:bg-[#25D366] flex items-center justify-center transition-colors duration-200">
                      <svg
                        className="w-4.5 h-4.5 text-[#25D366] group-hover:text-white transition-colors duration-200"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path d="M12.004 2C6.478 2 2 6.478 2 12.004c0 1.858.502 3.665 1.453 5.243L2 22l4.887-1.417a9.96 9.96 0 004.117.876h.005c5.526 0 10.004-4.478 10.004-10.004C21.013 6.478 16.53 2 12.004 2zm5.836 15.833a8.286 8.286 0 01-5.831 2.42h-.004a8.311 8.311 0 01-4.235-1.16l-.303-.18-3.15.913.842-3.07-.198-.315a8.28 8.28 0 01-1.27-4.437c0-4.583 3.73-8.312 8.317-8.312a8.26 8.26 0 015.878 2.437 8.259 8.259 0 012.436 5.878 8.29 8.29 0 01-2.482 5.826z" />
                      </svg>
                    </span>
                    <span className="font-medium">WhatsApp</span>
                  </a>

                  <a
                    href={`mailto:${c.email}`}
                    className="group flex items-center gap-3 text-sm text-charcoal hover:text-dark transition-colors duration-200"
                  >
                    <span className="shrink-0 w-9 h-9 rounded-full bg-gold/20 group-hover:bg-gold flex items-center justify-center transition-colors duration-200">
                      <svg
                        className="w-4.5 h-4.5 text-gold group-hover:text-dark transition-colors duration-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                      </svg>
                    </span>
                    <span className="font-medium break-all">{c.email}</span>
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Inquiry form */}
      <section className="max-w-2xl mx-auto px-6 pb-20">
        <Reveal>
          <h2 className="font-heading text-2xl text-dark mb-2 text-center">
            Send Us an Inquiry
          </h2>
          <p className="text-charcoal text-sm mb-6 text-center">
            Fill out the details below and we&apos;ll follow up with everything
            you need to start planning.
          </p>

          {submitted ? (
            <div className="text-center bg-white rounded-lg shadow-md p-10">
              <h2 className="font-heading text-2xl text-dark mb-3">
                Thank you!
              </h2>
              <p className="text-charcoal">
                Your inquiry has been received. Our team will be in touch soon.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg shadow-md p-8 space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-dark mb-1">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  name="fullname"
                  className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1">
                  Email
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1">
                  Preferred Trip
                </label>
                <select
                  name="preferredTrip"
                  className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
                >
                  <option>Afghanistan Highlights (10 days)</option>
                  <option>Bamyan & Band-e Amir (7 days)</option>
                  <option>The Grand Silk Road Expedition (21 days)</option>
                  <option>Wakhan & The Roof of Afghanistan (14 days)</option>
                  <option>The Grand Ariana Expedition (21 days)</option>
                  <option>Custom / Not sure yet</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">
                    Travel Dates
                  </label>
                  <input
                    type="text"
                    name="travelDates"
                    placeholder="e.g. Sept 2026"
                    className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">
                    # of Travelers
                  </label>
                  <input
                    type="number"
                    name="travelers"
                    min="1"
                    className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="4"
                  className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gold hover:bg-dark hover:text-white transition-colors duration-300 text-dark font-semibold py-3 rounded"
              >
                Send Inquiry
              </button>
            </form>
          )}
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
