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
  {
    title: "Minaret of Jam",
    desc: "Ghor Province",
    img: "/images/jam.jpeg",
  },
  {
    title: "Band-e Amir",
    desc: "Afghanistan's First National Park",
    img: "/images/bameyan.jpeg",
  },
  {
    title: "Blue Mosque",
    desc: "Herat",
    img: "/images/bluem.jpg",
  },
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
  {
    title: "Kandahar",
    desc: "The Historic South",
    img: "/images/hero2.jpg",
  },
];

function Card({ item }) {
  return (
    <div className="group shrink-0 w-64 rounded-lg overflow-hidden shadow-md bg-white select-none">
      <div className="relative h-40 overflow-hidden">
        <Image
          src={item.img}
          alt={item.title}
          fill
          sizes="256px"
          draggable={false}
          className="object-cover transition-transform duration-500 group-hover:scale-110 pointer-events-none"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="font-heading text-base text-dark mb-0.5">
          {item.title}
        </h3>
        <p className="text-charcoal text-xs">{item.desc}</p>
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

  // Duplicate the list so the loop can wrap seamlessly
  const doubled = [...items, ...items];

  // Auto-scroll loop (pure JS, so it can coexist with manual drag/scroll)
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

  // Mouse drag-to-scroll
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

  // Prevent click-through after an actual drag (in case cards get links later)
  function handleClickCapture(e) {
    if (dragState.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  function scrollByAmount(amount) {
    scrollerRef.current?.scrollBy({ left: amount, behavior: "smooth" });
    pauseThenResume();
  }

  return (
    <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
      {/* Left/right arrow controls */}
      <button
        onClick={() => scrollByAmount(-300)}
        aria-label="Scroll left"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-gold transition-colors duration-200 text-dark"
      >
        ‹
      </button>
      <button
        onClick={() => scrollByAmount(300)}
        aria-label="Scroll right"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-gold transition-colors duration-200 text-dark"
      >
        ›
      </button>

      <div
        ref={scrollerRef}
        onMouseDown={handleMouseDown}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => !isDragging && setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={pauseThenResume}
        onClickCapture={handleClickCapture}
        className={`flex gap-6 px-6 overflow-x-auto scrollbar-hide ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        style={{ scrollBehavior: isDragging ? "auto" : undefined }}
      >
        {doubled.map((item, i) => (
          <Card key={`${item.title}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}
