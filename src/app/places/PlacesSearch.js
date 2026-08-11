"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";

export default function PlacesSearch({ places, themes }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [province, setProvince] = useState("All");
  const [theme, setTheme] = useState("All");

  const categories = useMemo(() => {
    const set = new Set(places.map((p) => p.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [places]);

  const provinces = useMemo(() => {
    const set = new Set(places.map((p) => p.province).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [places]);

  const filtered = useMemo(() => {
    return places.filter((pl) => {
      const matchesQuery =
        !query ||
        pl.name?.toLowerCase().includes(query.toLowerCase()) ||
        pl.short_description?.toLowerCase().includes(query.toLowerCase()) ||
        pl.province?.toLowerCase().includes(query.toLowerCase());

      const matchesCategory = category === "All" || pl.category === category;
      const matchesProvince = province === "All" || pl.province === province;
      const matchesTheme = theme === "All" || pl.destinations?.title === theme;

      return matchesQuery && matchesCategory && matchesProvince && matchesTheme;
    });
  }, [places, query, category, province, theme]);

  const hasActiveFilters =
    query || category !== "All" || province !== "All" || theme !== "All";

  function clearFilters() {
    setQuery("");
    setCategory("All");
    setProvince("All");
    setTheme("All");
  }

  function selectTheme(themeTitle) {
    setTheme((current) => (current === themeTitle ? "All" : themeTitle));
  }

  return (
    <>
      {/* Search & filter bar */}
      <section className="bg-white border-b border-dark/10 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-charcoal/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, province, or keyword..."
                className="w-full border border-dark/15 rounded-full pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-colors duration-200"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-dark"
                >
                  ✕
                </button>
              )}
            </div>

            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="border border-dark/15 rounded-full px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
            >
              <option value="All">All Themes</option>
              {themes.map((t) => (
                <option key={t.id} value={t.title}>
                  {t.title}
                </option>
              ))}
            </select>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-dark/15 rounded-full px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All Categories" : c}
                </option>
              ))}
            </select>

            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="border border-dark/15 rounded-full px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
            >
              {provinces.map((pv) => (
                <option key={pv} value={pv}>
                  {pv === "All" ? "All Provinces" : pv}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between mt-3">
            <p className="text-charcoal text-xs">
              Showing{" "}
              <span className="font-semibold text-dark">{filtered.length}</span>{" "}
              of {places.length} site{places.length !== 1 ? "s" : ""}
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-gold text-xs font-medium hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
      </section>
      {/* Themed browsing banners */}
      {themes.length > 0 && (
        <section className="bg-cream py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <h2 className="font-heading text-2xl md:text-3xl text-dark text-center mb-10">
                Or Browse by Theme
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {themes.map((t, i) => (
                <Reveal key={t.id} delay={i * 100}>
                  <Link
                    href={`/places/theme/${t.slug}`}
                    className="group block text-left w-full rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white"
                  >
                    <div className="relative h-40">
                      <Image
                        src={t.img || "/images/hero1.jpg"}
                        alt={t.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      {t.tag && (
                        <p className="text-gold text-xs font-semibold uppercase tracking-wide mb-1">
                          {t.tag}
                        </p>
                      )}
                      <h3 className="font-heading text-lg text-dark">
                        {t.title}
                      </h3>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="max-w-6xl mx-auto px-6 py-16">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((pl, i) => (
              <Reveal key={pl.id} delay={Math.min(i, 6) * 80}>
                <Link
                  href={`/places/${pl.slug}`}
                  className="group flex flex-col h-full rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
                >
                  <div className="relative h-52 shrink-0">
                    <Image
                      src={pl.main_image || "/images/hero1.jpg"}
                      alt={pl.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {pl.category && (
                      <span className="absolute top-4 left-4 bg-gold text-dark text-xs font-semibold px-3 py-1 rounded-full">
                        {pl.category}
                      </span>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    {pl.province && (
                      <p className="text-gold text-xs font-semibold uppercase tracking-wide mb-1">
                        {pl.province}
                      </p>
                    )}
                    <h3 className="font-heading text-xl mb-2">{pl.name}</h3>
                    <p className="text-charcoal text-sm mb-4 flex-1">
                      {pl.short_description}
                    </p>
                    <span className="text-gold text-sm font-medium group-hover:underline">
                      Discover This Place →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-charcoal mb-2">No sites match your search.</p>
            <button
              onClick={clearFilters}
              className="text-gold text-sm font-medium hover:underline"
            >
              Clear filters and see all sites
            </button>
          </div>
        )}

        {places.length === 0 && (
          <p className="text-charcoal text-center">
            New destinations are being added soon — check back shortly.
          </p>
        )}
      </section>

      <Footer />
    </>
  );
}
