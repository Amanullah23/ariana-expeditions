"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/trips", label: "Trips" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark/95 backdrop-blur-sm shadow-lg py-3"
          : "bg-gradient-to-b from-dark/70 to-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6">
        <Link href="/" className="flex items-center group">
          <span className="font-heading text-xl md:text-2xl font-bold text-white tracking-wide group-hover:text-gold transition-colors duration-300">
            Ariana{" "}
            <span className="text-gold group-hover:text-white transition-colors duration-300">
              Expeditions
            </span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative font-body text-sm tracking-wide transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:bg-gold after:transition-all after:duration-300 ${
                  active
                    ? "text-gold after:w-full"
                    : "text-white/90 hover:text-gold after:w-0 hover:after:w-full"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/plan-your-trip"
            className="ml-2 bg-gold hover:bg-white text-dark font-semibold text-sm tracking-wide px-5 py-2 rounded transition-colors duration-300"
          >
            Plan Your Trip
          </Link>
        </div>

        <button
          className="md:hidden relative w-8 h-6 flex flex-col justify-between"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-[2px] w-full bg-white transition-transform duration-300 ${open ? "rotate-45 translate-y-[10px]" : ""}`}
          />
          <span
            className={`block h-[2px] w-full bg-white transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`block h-[2px] w-full bg-white transition-transform duration-300 ${open ? "-rotate-45 -translate-y-[10px]" : ""}`}
          />
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-96 border-t border-white/10" : "max-h-0"}`}
      >
        <div className="bg-dark/98 backdrop-blur-sm px-6 py-6 flex flex-col gap-5">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm tracking-wide ${active ? "text-gold" : "text-white/90 hover:text-gold"}`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/plan-your-trip"
            className="bg-gold text-dark font-semibold text-sm tracking-wide px-5 py-2.5 rounded text-center mt-1"
          >
            Plan Your Trip
          </Link>
        </div>
      </div>
    </nav>
  );
}
