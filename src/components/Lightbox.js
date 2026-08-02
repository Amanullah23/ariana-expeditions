"use client";
import { useEffect } from "react";

export default function Lightbox({ images, index, onClose, onNavigate }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % images.length);
      if (e.key === "ArrowLeft")
        onNavigate((index - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, images.length, onClose, onNavigate]);

  return (
    <div
      className="modal-backdrop fixed inset-0 z-100 overflow-hidden flex items-center justify-center"
      onClick={onClose}
    >
      {/* Blurred, zoomed background fill — same photo, so no empty gaps top/bottom */}
      <div
        className="absolute inset-0 bg-center bg-cover scale-110"
        style={{
          backgroundImage: `url(${images[index]})`,
          filter: "blur(30px) brightness(0.45)",
        }}
      />
      <div className="absolute inset-0 bg-black/40" />

      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 hover:bg-white/20 hover:text-gold transition-all duration-200 text-2xl md:text-3xl z-10"
      >
        ✕
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((index - 1 + images.length) % images.length);
        }}
        aria-label="Previous image"
        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 hover:bg-white/20 hover:text-gold transition-all duration-200 text-3xl md:text-4xl z-10"
      >
        ‹
      </button>

      {/* Sharp image on top, still fully visible, never cropped */}
      <img
        src={images[index]}
        alt={`Gallery image ${index + 1}`}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 max-w-[92%] max-h-[85vh] w-auto h-auto object-contain rounded shadow-2xl"
      />

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((index + 1) % images.length);
        }}
        aria-label="Next image"
        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 hover:bg-white/20 hover:text-gold transition-all duration-200 text-3xl md:text-4xl z-10"
      >
        ›
      </button>

      <span className="absolute bottom-4 md:bottom-6 text-white/80 text-sm z-10">
        {index + 1} / {images.length}
      </span>
    </div>
  );
}
