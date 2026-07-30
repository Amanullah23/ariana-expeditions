"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
  FaThreads,
  FaTiktok,
  FaFacebookF,
} from "react-icons/fa6";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/1BhJzeDQ1u/",
    icon: <FaFacebookF className="w-4 h-4" />,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/93789889592",
    icon: <FaWhatsapp className="w-4 h-4" />,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/discover_afghanistan1?igsh=b21mMm0yZnRjZHlo&utm_source=qr",
    icon: <FaInstagram className="w-4 h-4" />,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@Discover_Afghanistan-p8l",
    icon: <FaYoutube className="w-4 h-4" />,
  },
  {
    name: "Threads",
    href: "https://www.threads.com/@discover_afghanistan1?xmt=AQG0_ZU4T1UoZN9MIxrBetPbcc9mr6qbxA_nKkxL4ffK3qU",
    icon: <FaThreads className="w-4 h-4" />,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@ariana_expeditions",
    icon: <FaTiktok className="w-4 h-4" />,
  },
];

const destinationLinks = [
  { label: "Echoes of Ariana", href: "/destinations#echoes-of-ariana" },
  { label: "Valleys of Time", href: "/destinations#valleys-of-time" },
  { label: "Mountains & Nomads", href: "/destinations#mountains-&-nomads" },
];

const exploreLinks = [
  { label: "Trips & Itineraries", href: "/trips" },
  { label: "Plan Your Trip", href: "/plan-your-trip" },
  { label: "About Us", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  async function handleSubscribe(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/mrenrygb", {
        method: "POST",
        body: JSON.stringify({ email, source: "Newsletter Signup" }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        // Also save to Supabase so it shows up in the admin dashboard
        const supabase = createClient();
        await supabase.from("newsletter_signups").insert({ email });

        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer className="bg-dark text-white/80">
      {/* Newsletter bar */}
      <div className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-heading text-xl text-white mb-1">
              Stay Inspired
            </h3>
            <p className="text-white/70 text-sm">
              Occasional updates on new itineraries and travel stories — no
              spam.
            </p>
          </div>

          {status === "success" ? (
            <p className="text-gold text-sm font-medium">
              Thanks — you&apos;re subscribed!
            </p>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex w-full md:w-auto gap-3"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 md:w-64 bg-white/10 border border-white/20 rounded px-4 py-2.5 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-gold hover:bg-white transition-colors duration-300 text-dark font-semibold text-sm px-5 py-2.5 rounded whitespace-nowrap disabled:opacity-60"
              >
                {status === "loading" ? "..." : "Subscribe"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main columns */}
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <span className="block font-heading text-xl font-bold text-white tracking-wide mb-4">
            Ariana <span className="text-gold">Expeditions</span>
          </span>
          <p className="text-sm leading-relaxed mb-5">
            Afghanistan Beyond the Headlines. Guided tours and tailor-made
            expeditions across ancient Silk Road cities, mountains, and timeless
            landscapes.
          </p>
          <div className="flex gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-white/30 text-white hover:border-gold hover:bg-gold hover:text-dark transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading text-base text-white mb-4">
            Destinations
          </h4>
          <ul className="space-y-2.5 text-sm">
            {destinationLinks.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="hover:text-gold transition-colors duration-200"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-base text-white mb-4">Explore</h4>
          <ul className="space-y-2.5 text-sm">
            {exploreLinks.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="hover:text-gold transition-colors duration-200"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-base text-white mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <svg
                className="w-4 h-4 text-gold mt-0.5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
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
              Kabul, Afghanistan
            </li>
            <li className="flex items-start gap-2.5">
              <svg
                className="w-4 h-4 text-gold mt-0.5 shrink-0"
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
              info@arianaexpeditions.com
            </li>
            <li className="flex items-start gap-2.5">
              <svg
                className="w-4 h-4 text-gold mt-0.5 shrink-0"
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
              +93 78 988 592
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>
            © {new Date().getFullYear()} Ariana Expeditions. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/terms"
              className="hover:text-gold transition-colors duration-200"
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/privacy"
              className="hover:text-gold transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <span>Licensed Tour Operator — Afghanistan</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 pb-4 text-center text-[11px] text-white/30">
          Website designed &amp; developed by{" "}
          <a
            href="https://yawari.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold transition-colors duration-200"
          >
            Amanullah Yawari
          </a>
        </div>
      </div>
    </footer>
  );
}
