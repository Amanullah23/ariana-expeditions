"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { createClient } from "@/lib/supabase/client";
import { trackAction } from "@/components/AnalyticsTracker";
import {
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaLocationDot,
} from "react-icons/fa6";

const contactCards = [
  {
    label: "General Info",
    name: "Ariana Expeditions Team",
    role: "For general inquiries, partnerships, and press",
    phone: "+31 6 17285552",
    whatsapp: "https://wa.me/31617285552",
    email: "info@ariana-expeditions.com",
    icon: <FaEnvelope className="w-7 h-7" />,
  },
  {
    label: "Kabul Office",
    name: "Mr. Jalal Musavi",
    role: "Founder & Guide, Kabul, Afghanistan",
    phone: "+93 78 988 9592",
    whatsapp: "https://wa.me/93789889592",
    email: "jalal.musavi@ariana-expeditions.com",
    icon: <FaLocationDot className="w-7 h-7" />,
  },
  {
    label: "Germany Office",
    name: "Mr. Rik Alexander",
    role: "Co-Founder, Berlin, Germany",
    phone: "+31 6 12766779",
    whatsapp: "https://wa.me/31612766779",
    email: "rik@ariana-expeditions.com",
    icon: <FaLocationDot className="w-7 h-7" />,
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
        // Also save to Supabase so it shows up in the admin dashboard
        const supabase = createClient();
        await supabase.from("inquiries").insert({
          fullname: data.get("fullname"),
          email: data.get("email"),
          phone: data.get("phone"),
          preferred_trip: data.get("preferredTrip"),
          travel_dates: data.get("travelDates"),
          travelers: data.get("travelers"),
          message: data.get("message"),
        });

        setSubmitted(true);
        trackAction("Contact form submitted");
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
                      <FaPhone className="w-4.5 h-4.5 text-dark group-hover:text-gold transition-colors duration-200" />
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
                      <FaWhatsapp className="w-4.5 h-4.5 text-[#25D366] group-hover:text-white transition-colors duration-200" />
                    </span>
                    <span className="font-medium">WhatsApp</span>
                  </a>

                  <a
                    href={`mailto:${c.email}`}
                    className="group flex items-center gap-3 text-sm text-charcoal hover:text-dark transition-colors duration-200"
                  >
                    <span className="shrink-0 w-9 h-9 rounded-full bg-gold/20 group-hover:bg-gold flex items-center justify-center transition-colors duration-200">
                      <FaEnvelope className="w-4.5 h-4.5 text-gold group-hover:text-dark transition-colors duration-200" />
                    </span>
                    <span className="font-medium wrap-break-word">
                      {c.email}
                    </span>
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
