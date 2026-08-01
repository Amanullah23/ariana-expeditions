"use client";
import { useState } from "react";
import Link from "next/link";
import { provincesData } from "@/data/provincesData";

// 12 well-known provinces get a gold marker + clickable info card.
// The rest still render with borders and name labels, just no marker.
const famousProvinces = {
  Kabul: {
    desc: "The capital — museums, bazaars, and the gateway to the rest of Afghanistan.",
    href: "/destinations#echoes-of-ariana",
  },
  Hirat: {
    desc: "Home to the Blue Mosque and centuries of Persianate art and architecture.",
    href: "/destinations#echoes-of-ariana",
  },
  Balkh: {
    desc: "One of the oldest cities in the world, a great center of learning on the Silk Road.",
    href: "/destinations#echoes-of-ariana",
  },
  Bamyan: {
    desc: "Valley of ancient rock-carved niches and dramatic red cliffs.",
    href: "/destinations#valleys-of-time",
  },
  Kandahar: {
    desc: "The historic heart of the south, rarely visited by international travelers.",
    href: "/trips/grand-ariana-expedition",
  },
  Ghor: {
    desc: "Home to the Minaret of Jam, one of the world's least-visited UNESCO World Heritage Sites.",
    href: "/trips/grand-ariana-expedition",
  },
  Badakhshan: {
    desc: "Home to the remote Wakhan Corridor, bordering Pakistan, Tajikistan, and China.",
    href: "/destinations#mountains-&-nomads",
  },
  Nangarhar: {
    desc: "A historic eastern province along the ancient trade routes toward the Khyber Pass.",
    href: "/trips",
  },
  Kunduz: {
    desc: "A northern province known for its fertile plains and historic trade significance.",
    href: "/trips",
  },
  Paktya: {
    desc: "A culturally rich province in the country's southeast.",
    href: "/trips",
  },
  Hilmand: {
    desc: "Afghanistan's largest province by area, with a deep agricultural history.",
    href: "/trips",
  },
  Faryab: {
    desc: "A northern province known for its traditional carpet-weaving heritage.",
    href: "/trips",
  },
};

export default function AfghanistanMap() {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  const activeName = selected || hovered;
  const activeInfo = activeName ? famousProvinces[activeName] : null;

  return (
    <div className="relative bg-cream rounded-2xl p-6 md:p-10">
      <svg
        viewBox="0 0 700 580"
        className="w-full h-auto max-w-3xl mx-auto"
        role="img"
        aria-label="Interactive map of Afghanistan showing all provinces"
      >
        {provincesData.map((p) => {
          const isFamous = Boolean(famousProvinces[p.name]);
          const isActive = activeName === p.name;
          return (
            <g key={p.name}>
              <path
                d={p.path}
                fill={
                  isActive ? "var(--color-terracotta)" : "var(--color-dark)"
                }
                fillOpacity={isActive ? 1 : 0.85}
                stroke="var(--color-gold)"
                strokeWidth="1"
                className="transition-colors duration-200"
                onMouseEnter={() => isFamous && setHovered(p.name)}
                onMouseLeave={() => isFamous && setHovered(null)}
                onClick={() => isFamous && setSelected(p.name)}
                style={{ cursor: isFamous ? "pointer" : "default" }}
              />
              <text
                x={p.cx}
                y={p.cy}
                fontSize="7"
                fill="white"
                textAnchor="middle"
                className="pointer-events-none select-none"
                opacity={0.85}
              >
                {p.name}
              </text>
              {isFamous && (
                <circle
                  cx={p.cx}
                  cy={p.cy - 12}
                  r={isActive ? 7 : 5}
                  fill="var(--color-gold)"
                  stroke="white"
                  strokeWidth="1.2"
                  className="transition-all duration-200 pointer-events-none"
                />
              )}
            </g>
          );
        })}
      </svg>

      <div className="mt-6 min-h-[100px] flex items-center justify-center">
        {activeInfo ? (
          <div className="relative bg-white rounded-lg shadow-sm p-5 max-w-md text-center">
            {selected && (
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-charcoal/40 hover:text-dark"
              >
                ✕
              </button>
            )}
            <h3 className="font-heading text-lg text-dark mb-1">
              {activeName}
            </h3>
            <p className="text-charcoal text-sm mb-3">{activeInfo.desc}</p>
            <Link
              href={activeInfo.href}
              className="text-gold text-sm font-medium hover:underline"
            >
              Explore →
            </Link>
          </div>
        ) : (
          <p className="text-charcoal/60 text-sm text-center">
            Click a gold marker to explore that province
          </p>
        )}
      </div>

      <p className="text-center text-charcoal/40 text-xs mt-4">
        Map boundary data derived from public GIS sources (Natural Earth, public
        domain).
      </p>
    </div>
  );
}
