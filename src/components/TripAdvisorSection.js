"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function TripAdvisorSection({ info, reviews }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const cardsPerView = 3; // desktop shows 3 at a time; mobile shows 1 via CSS

  useEffect(() => {
    if (reviews.length <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [reviews.length]);

  function goTo(i) {
    clearInterval(timerRef.current);
    setIndex((i + reviews.length) % reviews.length);
  }

  if (!info || reviews.length === 0) return null;

  const visibleReview = reviews[index];

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl text-dark mb-2">
            Top Ranking Afghanistan Tour Company
          </h2>
          <p className="text-charcoal/60">
            Real traveler reviews on TripAdvisor
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 items-center">
          {/* Left — score summary */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p className="font-heading text-2xl text-dark tracking-wide mb-3">
              {info.overall_rating >= 4.5
                ? "EXCELLENT"
                : info.overall_rating >= 3.5
                  ? "VERY GOOD"
                  : "GOOD"}
            </p>
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((n) => (
                <span
                  key={n}
                  className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${
                    n <= Math.round(info.overall_rating)
                      ? "border-[#34E0A1] bg-[#34E0A1]/10"
                      : "border-dark/15"
                  }`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      n <= Math.round(info.overall_rating)
                        ? "bg-[#34E0A1]"
                        : "bg-dark/15"
                    }`}
                  />
                </span>
              ))}
            </div>
            <p className="text-charcoal text-sm mb-4">
              Based on{" "}
              <span className="font-semibold">{info.review_count}</span> review
              {info.review_count !== 1 ? "s" : ""}
            </p>
            <a
              href={info.profile_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-dark hover:text-[#34E0A1] transition-colors duration-200"
            >
              <svg
                className="w-6 h-6 text-[#34E0A1]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle
                  cx="8.5"
                  cy="12"
                  r="2.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle
                  cx="15.5"
                  cy="12"
                  r="2.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              Tripadvisor
            </a>
          </div>

          {/* Right — scrolling review cards */}
          <div className="relative">
            {reviews.length > 1 && (
              <>
                <button
                  onClick={() => goTo(index - 1)}
                  aria-label="Previous review"
                  className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-md items-center justify-center text-charcoal hover:text-dark"
                >
                  ‹
                </button>
                <button
                  onClick={() => goTo(index + 1)}
                  aria-label="Next review"
                  className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-md items-center justify-center text-charcoal hover:text-dark"
                >
                  ›
                </button>
              </>
            )}

            {/* Desktop: shows up to 3 cards, but never more slots than real reviews exist */}
            <div
              key={index}
              className={`hidden md:grid gap-5 animate-fade-slide ${
                reviews.length === 1
                  ? "grid-cols-1 max-w-sm mx-auto"
                  : reviews.length === 2
                    ? "grid-cols-2"
                    : "grid-cols-3"
              }`}
            >
              {Array.from({ length: Math.min(3, reviews.length) }).map(
                (_, offset) => {
                  const r = reviews[(index + offset) % reviews.length];
                  return (
                    <ReviewCard key={`${r.id}-slot-${offset}`} review={r} />
                  );
                },
              )}
            </div>

            {/* Mobile: 1 card + dots */}
            <div className="md:hidden">
              <div key={index} className="animate-fade-slide">
                <ReviewCard review={visibleReview} />
              </div>
              {reviews.length > 1 && (
                <div className="flex justify-center gap-1.5 mt-4">
                  {reviews.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      aria-label={`Go to review ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === index ? "w-6 bg-gold" : "w-1.5 bg-dark/15"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }) {
  return (
    <a
      href={review.review_url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white border border-dark/10 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-5 h-full"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-charcoal font-semibold text-sm shrink-0">
          {review.reviewer_name?.[0] || "?"}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-dark text-sm truncate">
            {review.reviewer_name}
          </p>
          <p className="text-charcoal/50 text-xs">{review.review_date}</p>
        </div>
        <svg
          className="w-5 h-5 text-[#34E0A1] ml-auto shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </div>
      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
              n <= review.rating ? "border-[#34E0A1]" : "border-dark/15"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                n <= review.rating ? "bg-[#34E0A1]" : "bg-transparent"
              }`}
            />
          </span>
        ))}
      </div>
      {review.title && (
        <p className="font-semibold text-dark text-sm mb-1.5 line-clamp-2">
          {review.title}
        </p>
      )}
      <p className="text-charcoal text-sm line-clamp-3 mb-2">
        {review.excerpt}
      </p>
      <span className="text-gold text-xs font-medium">Read more</span>
    </a>
  );
}
