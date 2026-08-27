import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import AccordionFAQ from "./AccordionFAQ";
import Reveal from "@/components/Reveal";
import { getPublicFaqItems } from "@/lib/data/faq";

const categoryMeta = {
  "Safety & Ethics": {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.6}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12c0 4.556-3.02 8.373-7.163 9.616a1.5 1.5 0 01-.674 0C8.02 20.373 5 16.556 5 12V6.545c0-.564.34-1.07.86-1.293l6-2.572a1.5 1.5 0 011.28 0l6 2.572c.52.223.86.729.86 1.293V12z"
        />
      </svg>
    ),
  },
  "Visa & Entry": {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.6}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.83a1.125 1.125 0 00-1.006 0L3.622 6.267A1.125 1.125 0 003 7.273v13.427c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
        />
      </svg>
    ),
  },
  "Women Travelers": {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.6}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
        />
      </svg>
    ),
  },
  "Logistics & Practicalities": {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.6}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v11.177"
        />
      </svg>
    ),
  },
  "Cultural & Legal Considerations": {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.6}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m-15.432 0A8.959 8.959 0 013 12c0-.778.099-1.533.284-2.253"
        />
      </svg>
    ),
  },
  "Health & Preparation": {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.6}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    ),
  },
};

const defaultIcon = (
  <svg
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.6}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 17.25h.007v.008H12v-.008z"
    />
  </svg>
);

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const metadata = {
  title: "FAQ | Planning Afghanistan Tours Safely",
  description:
    "Everything you need to know before booking Afghanistan tours — safety, visas, women travelers, logistics, and culture, answered by our team.",
};

export const revalidate = 0;

export default async function FAQ() {
  const items = await getPublicFaqItems();

  const grouped = items.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  return (
    <>
      <Navbar />

      <section className="bg-dark pt-32 pb-20 px-6 text-center">
        <Reveal>
          <span className="text-gold text-xs font-semibold tracking-widest uppercase">
            Before You Travel
          </span>
          <h1 className="font-heading text-4xl md:text-5xl text-white mt-2 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Everything travelers ask us before booking — safety, visas, culture,
            and practical logistics.
          </p>
        </Reveal>
      </section>

      {categories.length > 0 && (
        <section className="bg-white border-b border-dark/10 px-6 py-6 sticky top-0 z-30 shadow-sm">
          <Reveal>
            <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <a
                  key={cat}
                  href={`#${slugify(cat)}`}
                  className="flex items-center gap-2 text-xs md:text-sm font-medium text-dark border border-dark/15 hover:border-gold hover:text-gold transition-colors duration-200 px-4 py-2 rounded-full"
                >
                  <span className="text-gold">
                    {categoryMeta[cat]?.icon || defaultIcon}
                  </span>
                  {cat}
                </a>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      <section className="max-w-3xl mx-auto px-6 py-16">
        {categories.map((cat, i) => (
          <Reveal key={cat} delay={i * 80}>
            <div id={slugify(cat)} className="mb-14 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-dark text-gold shrink-0">
                  {categoryMeta[cat]?.icon || defaultIcon}
                </span>
                <h2 className="font-heading text-2xl text-dark">{cat}</h2>
              </div>
              <AccordionFAQ items={grouped[cat]} />
              {cat === "Visa & Entry" && (
                <a
                  href="/e-visa/"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 bg-gold hover:bg-dark hover:text-white transition-colors duration-300 text-dark font-semibold px-6 py-2 rounded text-sm"
                >
                  Ream more about e-visa
                </a>
              )}
            </div>
          </Reveal>
        ))}

        {categories.length === 0 && (
          <p className="text-charcoal text-center py-12">
            No FAQ items available yet — check back soon.
          </p>
        )}
      </section>

      <section className="bg-cream py-16 px-6 text-center">
        <Reveal>
          <h2 className="font-heading text-2xl md:text-3xl text-dark mb-3">
            Still Have Questions?
          </h2>
          <p className="text-charcoal max-w-md mx-auto mb-6">
            Our team is happy to help with anything not covered here — reach out
            and we&apos;ll get back to you personally.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-dark hover:bg-gold hover:text-dark text-white transition-colors duration-300 font-semibold px-8 py-3 rounded"
          >
            Contact Us
          </Link>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
