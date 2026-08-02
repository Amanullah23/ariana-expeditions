"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function TripsSearch({ trips }) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [sort, setSort] = useState("default");

  const regions = useMemo(() => {
    const set = new Set(trips.map((t) => t.region).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [trips]);

  const difficulties = useMemo(() => {
    const set = new Set(trips.map((t) => t.difficulty).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [trips]);

  const filtered = useMemo(() => {
    let result = trips.filter((t) => {
      const matchesQuery =
        !query ||
        t.title?.toLowerCase().includes(query.toLowerCase()) ||
        t.description?.toLowerCase().includes(query.toLowerCase()) ||
        t.region?.toLowerCase().includes(query.toLowerCase());

      const matchesRegion = region === "All" || t.region === region;
      const matchesDifficulty =
        difficulty === "All" || t.difficulty === difficulty;

      return matchesQuery && matchesRegion && matchesDifficulty;
    });

    if (sort === "duration-asc") {
      result = [...result].sort((a, b) => parseInt(a.days) - parseInt(b.days));
    } else if (sort === "duration-desc") {
      result = [...result].sort((a, b) => parseInt(b.days) - parseInt(a.days));
    } else if (sort === "title") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [trips, query, region, difficulty, sort]);

  const hasActiveFilters =
    query || region !== "All" || difficulty !== "All" || sort !== "default";

  function clearFilters() {
    setQuery("");
    setRegion("All");
    setDifficulty("All");
    setSort("default");
  }

  return (
    <>
      {/* Search & filter bar */}
      <section className="bg-white border-b border-dark/10 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search input */}
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
                placeholder="Search trips by name, region, or keyword..."
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

            {/* Region filter */}
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="border border-dark/15 rounded-full px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
            >
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r === "All" ? "All Regions" : r}
                </option>
              ))}
            </select>

            {/* Difficulty filter */}
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="border border-dark/15 rounded-full px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
            >
              {difficulties.map((d) => (
                <option key={d} value={d}>
                  {d === "All" ? "All Difficulty Levels" : d}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-dark/15 rounded-full px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
            >
              <option value="default">Sort: Featured</option>
              <option value="duration-asc">Duration: Shortest First</option>
              <option value="duration-desc">Duration: Longest First</option>
              <option value="title">Name: A–Z</option>
            </select>
          </div>

          {/* Active filter summary */}
          <div className="flex items-center justify-between mt-3">
            <p className="text-charcoal text-xs">
              Showing{" "}
              <span className="font-semibold text-dark">{filtered.length}</span>{" "}
              of {trips.length} trip{trips.length !== 1 ? "s" : ""}
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

      {/* Results grid */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {filtered.map((t, i) => (
              <Reveal key={t.id} delay={Math.min(i, 6) * 80}>
                <Link
                  href={`/trips/${t.slug}`}
                  className="group flex flex-col h-full rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
                >
                  <div className="relative h-56 shrink-0">
                    <Image
                      src={t.img || "/images/hero1.jpg"}
                      alt={t.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-gold text-dark text-xs font-semibold px-3 py-1 rounded-full">
                      {t.days}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-charcoal mb-3 tracking-wide">
                      <span>{t.region}</span>
                      {t.difficulty && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-charcoal/50" />
                          <span>{t.difficulty}</span>
                        </>
                      )}
                    </div>

                    <h3 className="font-heading text-xl mb-2">{t.title}</h3>
                    <p className="text-charcoal text-sm mb-4">
                      {t.description}
                    </p>

                    {t.highlights?.length > 0 && (
                      <ul className="space-y-1.5 mb-5">
                        {t.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-2 text-sm text-charcoal"
                          >
                            <span className="text-gold mt-0.5">✓</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}

                    <span className="inline-block mt-auto text-gold text-sm font-medium group-hover:underline">
                      View Itinerary →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg
              className="w-12 h-12 text-charcoal/20 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <p className="text-charcoal mb-2">No trips match your search.</p>
            <button
              onClick={clearFilters}
              className="text-gold text-sm font-medium hover:underline"
            >
              Clear filters and see all trips
            </button>
          </div>
        )}
      </section>
    </>
  );
}
