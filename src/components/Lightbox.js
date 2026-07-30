"use client";
import { useEffect } from "react";
import Image from "next/image";

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
      className="modal-backdrop fixed inset-0 z-[100] bg-black/90 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 hover:bg-white/20 hover:text-gold transition-all duration-200 text-3xl"
      >
        ✕
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((index - 1 + images.length) % images.length);
        }}
        aria-label="Previous image"
        className="absolute left-4 md:left-8 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 hover:bg-white/20 hover:text-gold transition-all duration-200 text-4xl"
      >
        ‹
      </button>

      <div
        className="relative w-full max-w-4xl h-[70vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[index]}
          alt={`Gallery image ${index + 1}`}
          fill
          sizes="100vw"
          className="object-contain"
        />
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((index + 1) % images.length);
        }}
        aria-label="Next image"
        className="absolute right-4 md:right-8 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 hover:bg-white/20 hover:text-gold transition-all duration-200 text-4xl"
      >
        ›
      </button>

      <span className="absolute bottom-6 text-white/60 text-sm">
        {index + 1} / {images.length}
      </span>
    </div>
  );
}
