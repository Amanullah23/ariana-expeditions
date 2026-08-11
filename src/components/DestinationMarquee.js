"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";

const items = [
  {
    title: "Echoes of Ariana",
    desc: "Herat, Balkh, Kabul",
    img: "/images/echoes.jpg",
  },
  {
    title: "Valleys of Time",
    desc: "Bamyan, Band-e Amir",
    img: "/images/vally.jpeg",
  },
  {
    title: "Mountains & Nomads",
    desc: "Wakhan, Hindu Kush",
    img: "/images/hindukush.png",
  },
  { title: "Minaret of Jam", desc: "Ghor Province", img: "/images/jam.jpeg" },
  {
    title: "Band-e Amir",
    desc: "Afghanistan's First National Park",
    img: "/images/bameyan.jpeg",
  },
  { title: "Blue Mosque", desc: "Herat", img: "/images/bluem.jpg" },
  {
    title: "Wakhan Corridor",
    desc: "The Roof of Central Asia",
    img: "/images/wakhan.jpg",
  },
  {
    title: "Shahr-e Gholghola",
    desc: "The City of Screams",
    img: "/images/gholghola.jpeg",
  },
  { title: "Kandahar", desc: "The Historic South", img: "/images/hero2.jpg" },
];

function Card({ item }) {
  return (
    <div className="group relative shrink-0 w-72 h-80 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 select-none">
      <Image
        src={item.img}
        alt={item.title}
        fill
        sizes="288px"
        draggable={false}
        className="object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <span className="block w-8 h-px bg-gold mb-3 transition-all duration-300 group-hover:w-14" />
        <h3 className="font-heading text-xl text-white leading-snug mb-1">
          {item.title}
        </h3>
        <p className="text-white/75 text-sm">{item.desc}</p>
      </div>
    </div>
  );
}

export default function DestinationMarquee() {
  const scrollerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const dragState = useRef({ startX: 0, startScrollLeft: 0, moved: false });
  const resumeTimeout = useRef(null);
  const autoScrollFrame = useRef(null);

  const doubled = [...items, ...items];

  useEffect(() => {
    function step() {
      const el = scrollerRef.current;
      if (el && !isPaused && !isDragging) {
        el.scrollLeft += 0.6;
        const halfWidth = el.scrollWidth / 2;
        if (el.scrollLeft >= halfWidth) {
          el.scrollLeft -= halfWidth;
        }
      }
      autoScrollFrame.current = requestAnimationFrame(step);
    }
    autoScrollFrame.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(autoScrollFrame.current);
  }, [isPaused, isDragging]);

  function pauseThenResume() {
    setIsPaused(true);
    clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => setIsPaused(false), 2500);
  }

  const handleMouseDown = useCallback((e) => {
    const el = scrollerRef.current;
    setIsDragging(true);
    setIsPaused(true);
    dragState.current = {
      startX: e.pageX,
      startScrollLeft: el.scrollLeft,
      moved: false,
    };
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      const el = scrollerRef.current;
      const dx = e.pageX - dragState.current.startX;
      if (Math.abs(dx) > 3) dragState.current.moved = true;
      el.scrollLeft = dragState.current.startScrollLeft - dx;
    },
    [isDragging],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    pauseThenResume();
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  function scrollByAmount(amount) {
    scrollerRef.current?.scrollBy({ left: amount, behavior: "smooth" });
    pauseThenResume();
  }

  return (
    <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
      <div className="group/row relative">
        {/* Edge fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 md:w-24 z-10 bg-gradient-to-r from-cream to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 md:w-24 z-10 bg-gradient-to-l from-cream to-transparent" />

        {/* Arrows — fade in on row hover, glass style */}
        <button
          onClick={() => scrollByAmount(-320)}
          aria-label="Scroll left"
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-dark/70 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover/row:opacity-100 hover:bg-gold hover:text-dark transition-all duration-300"
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
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          onClick={() => scrollByAmount(320)}
          aria-label="Scroll right"
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-dark/70 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover/row:opacity-100 hover:bg-gold hover:text-dark transition-all duration-300"
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
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>

        <div
          ref={scrollerRef}
          onMouseDown={handleMouseDown}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => !isDragging && setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={pauseThenResume}
          onClickCapture={(e) => {
            if (dragState.current.moved) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          className={`flex gap-5 px-6 md:px-12 overflow-x-auto scrollbar-hide py-2 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          style={{ scrollBehavior: isDragging ? "auto" : undefined }}
        >
          {doubled.map((item, i) => (
            <Card key={`${item.title}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
