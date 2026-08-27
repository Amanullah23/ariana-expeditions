"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/places", label: "Explore Places" },
  { href: "/trips", label: "Trips" },
  { href: "/about", label: "About" },
  {
    href: "/faq",
    label: "FAQ",
    children: [{ href: "/blog", label: "Blog" }],
  },
  { href: "/e-visa", label: "E-Visa" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState(null);
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
          : "bg-gradient-to-b from-dark/50 via-dark/20 to-transparent backdrop-blur-[2px] py-6"
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
            const active =
              pathname === l.href ||
              l.children?.some((c) => pathname === c.href);

            if (!l.children) {
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
            }

            return (
              <div
                key={l.href}
                className="relative"
                onMouseEnter={() => setDesktopDropdown(l.href)}
                onMouseLeave={() => setDesktopDropdown(null)}
              >
                <Link
                  href={l.href}
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium tracking-wide rounded-full transition-all duration-200 ${
                    active
                      ? "text-dark bg-gold"
                      : "text-white/85 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {l.label}
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      desktopDropdown === l.href ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Link>

                <div
                  className={`absolute left-0 top-full pt-2 transition-all duration-200 ${
                    desktopDropdown === l.href
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-1 pointer-events-none"
                  }`}
                >
                  <div className="bg-dark/95 backdrop-blur-md border border-white/10 rounded-xl shadow-lg overflow-hidden min-w-[140px]">
                    {l.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className={`block px-4 py-2.5 text-sm transition-colors duration-200 ${
                          pathname === c.href
                            ? "text-gold font-medium"
                            : "text-white/80 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
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
          <div className="w-6 flex flex-col gap-[5px]">
            <span
              className={`block h-[2px] w-full bg-white rounded-full transition-all duration-300 origin-center ${
                open ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-full bg-white rounded-full transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-[2px] w-full bg-white rounded-full transition-all duration-300 origin-center ${
                open ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile dropdown — expands downward from under the navbar */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-[700px]" : "max-h-0"
        }`}
      >
        <div className="border-t border-white/10 px-6 py-6 flex flex-col gap-1">
          {links.map((l, i) => {
            const active = pathname === l.href;
            return (
              <div key={l.href}>
                <Link
                  href={l.href}
                  className={`block py-3 text-base font-heading transition-all duration-300 ${
                    active
                      ? "text-gold"
                      : "text-white/85 hover:text-white hover:pl-2"
                  } ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
                  style={{ transitionDelay: open ? `${i * 50}ms` : "0ms" }}
                >
                  {l.label}
                </Link>
                {l.children?.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className={`block py-2.5 pl-5 text-sm font-heading border-l border-white/15 ml-1 transition-all duration-300 ${
                      pathname === c.href
                        ? "text-gold"
                        : "text-white/65 hover:text-white"
                    } ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
                    style={{
                      transitionDelay: open ? `${i * 50 + 25}ms` : "0ms",
                    }}
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
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
