"use client";
import { useState } from "react";

export default function AccordionFAQ({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div>
      {items.map((item, i) => (
        <div key={item.id} className="border-b border-dark/10">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex justify-between items-center py-4 text-left"
          >
            <h3 className="font-heading text-base text-dark pr-4">
              {item.question}
            </h3>
            <span
              className={`text-dark text-xl shrink-0 transition-transform duration-300 ${
                openIndex === i ? "rotate-45" : ""
              }`}
            >
              +
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === i ? "max-h-60 pb-4" : "max-h-0"
            }`}
          >
            <p className="text-charcoal text-sm leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
