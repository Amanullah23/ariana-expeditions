"use client";
import { useState, useEffect } from "react";

const provinces = ["Kabul", "Bameyan", "Herat", "Balkh", "Wakhan", "Nuristan"];

export default function RotatingProvince() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % provinces.length);
        setVisible(true);
      }, 300);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`text-white font-semibold border-b-2 border-gold transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {provinces[index]}
    </span>
  );
}
