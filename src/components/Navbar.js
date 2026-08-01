"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/trips", label: "Trips" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-dark/90 backdrop-blur-md shadow-lg py-3"
            : "bg-linear-to-b from-dark/50 via-dark/20 to-transparent backdrop-blur-[2px] py-6"
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

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide rounded-full transition-all duration-200 ${
                    active
                      ? "text-dark bg-gold"
                      : "text-white/85 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link
              href="/plan-your-trip"
              className="ml-3 bg-white text-dark hover:bg-gold transition-colors duration-300 font-semibold text-sm tracking-wide px-5 py-2.5 rounded-full"
            >
              Plan Your Trip
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden relative w-10 h-10 flex items-center justify-center"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="sr-only">Menu</span>
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-full bg-white rounded-full transition-all duration-300 origin-center ${
                  open ? "rotate-45 translate-y-1.75" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-white rounded-full transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-white rounded-full transition-all duration-300 origin-center ${
                  open ? "-rotate-45 -translate-y-1.75" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile full-height slide-in panel */}
      <div
        className={`fixed inset-0 z-60 lg:hidden transition-all duration-300 ${
          open ? "visible" : "invisible"
        }`}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`absolute top-0 right-0 h-full w-[80%] max-w-sm bg-dark shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
            <span className="font-heading text-lg font-bold text-white">
              Ariana <span className="text-gold">Expeditions</span>
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="w-9 h-9 flex items-center justify-center text-white/70 hover:text-white"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center px-6 gap-1">
            {links.map((l, i) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`py-3.5 text-lg font-heading transition-all duration-300 ${
                    active
                      ? "text-gold"
                      : "text-white/85 hover:text-white hover:pl-2"
                  }`}
                  style={{
                    transitionDelay: open ? `${i * 40}ms` : "0ms",
                  }}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          <div className="px-6 pb-8 pt-4 border-t border-white/10">
            <Link
              href="/plan-your-trip"
              className="block text-center bg-gold hover:bg-white transition-colors duration-300 text-dark font-semibold text-sm tracking-wide px-5 py-3 rounded-full"
            >
              Plan Your Trip
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
