"use client";
import { useState } from "react";

export default function AccordionItem({ day, title, desc }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-dark/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-4 text-left"
      >
        <div>
          <span className="text-gold text-xs font-semibold uppercase tracking-wide">
            {day}
          </span>
          <h3 className="font-heading text-lg text-dark">{title}</h3>
        </div>
        <span
          className={`text-dark text-xl transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-40 pb-4" : "max-h-0"
        }`}
      >
        <p className="text-charcoal text-sm">{desc}</p>
      </div>
    </div>
  );
}
