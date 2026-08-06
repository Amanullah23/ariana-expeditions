"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

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
  const isFirstRender = useRef(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-dark/90 backdrop-blur-md shadow-lg py-3"
          : "bg-linear-to-b from-dark/50 via-dark/20 to-transparent backdrop-blur-[2px] py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6">
        <Link href="/" className="flex items-center group">
          <Image
            src="/images/logo-3.png"
            alt="Ariana Expeditions"
            width={1300}
            height={441}
            className="h-10 md:h-16 w-auto transition-transform duration-300 group-hover:scale-105"
            priority
          />
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
          <div className="w-6 flex flex-col gap-1.25">
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

      {/* Mobile dropdown — expands downward from under the navbar */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-150" : "max-h-0"
        }`}
      >
        <div className="border-t border-white/10 px-6 py-6 flex flex-col gap-1">
          {links.map((l, i) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`py-3 text-base font-heading transition-all duration-300 ${
                  active
                    ? "text-gold"
                    : "text-white/85 hover:text-white hover:pl-2"
                } ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
                style={{ transitionDelay: open ? `${i * 50}ms` : "0ms" }}
              >
                {l.label}
              </Link>
            );
          })}

          <Link
            href="/plan-your-trip"
            className={`mt-3 block text-center bg-gold hover:bg-white transition-all duration-300 text-dark font-semibold text-sm tracking-wide px-5 py-3 rounded-full ${
              open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            }`}
            style={{ transitionDelay: open ? `${links.length * 50}ms` : "0ms" }}
          >
            Plan Your Trip
          </Link>
        </div>
      </div>
    </nav>
  );
}
