"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa6";
import { trackAction } from "@/components/AnalyticsTracker";

export default function WhatsAppButton() {
  const pathname = usePathname();
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {showTooltip && (
        <div className="flex items-center gap-2 bg-white shadow-lg rounded-full pl-4 pr-2 py-2 animate-fade-in-up">
          <span className="text-dark text-sm font-medium whitespace-nowrap">
            We&apos;re online!
          </span>
          <button
            onClick={() => setShowTooltip(false)}
            aria-label="Dismiss"
            className="text-charcoal/40 hover:text-charcoal w-5 h-5 flex items-center justify-center rounded-full hover:bg-cream transition-colors duration-200"
          >
            ✕
          </button>
        </div>
      )}

      <a
        href="https://wa.me/93770797126"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackAction("WhatsApp button clicked")}
        aria-label="Chat with us on WhatsApp"
        className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5a] shadow-lg flex items-center justify-center transition-colors duration-300 hover:scale-105 transition-transform"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        <FaWhatsapp className="w-7 h-7 text-white relative z-10" />
      </a>
    </div>
  );
}
