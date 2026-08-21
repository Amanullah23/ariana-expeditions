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
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p
            className={`text-charcoal text-sm whitespace-pre-line ${open ? "pb-4" : ""}`}
          >
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}
