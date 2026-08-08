import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import {
  getPublicTestimonialBySlug,
  getAllTestimonialSlugs,
} from "@/lib/data/testimonials";

export async function generateStaticParams() {
  const slugs = await getAllTestimonialSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const testimonial = await getPublicTestimonialBySlug(slug);

  if (!testimonial) return {};

  return {
    title: `${testimonial.name}'s Story | Ariana Expeditions`,
    description: testimonial.quote,
    openGraph: {
      title: `${testimonial.name}'s Story`,
      description: testimonial.quote,
      images: testimonial.img ? [testimonial.img] : ["/images/hero1.jpg"],
      type: "article",
    },
  };
}

export const revalidate = 0;

export default async function TestimonialDetail({ params }) {
  const { slug } = await params;
  const testimonial = await getPublicTestimonialBySlug(slug);

  if (!testimonial) return notFound();

  return (
    <>
      <Navbar />

      <div className="pt-28 md:pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 text-charcoal hover:text-gold transition-colors duration-200 text-sm font-medium mb-10"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              All Traveler Stories
            </Link>
          </Reveal>

          {/* Profile header */}
          <Reveal>
            <div className="flex flex-col items-center text-center mb-14">
              <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-md mb-5 shrink-0">
                <Image
                  src={testimonial.img || "/images/hero1.jpg"}
                  alt={testimonial.name}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
              <h1 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-2">
                {testimonial.name}
              </h1>
              {testimonial.location && (
                <p className="text-charcoal/70 text-sm">
                  {testimonial.location}
                </p>
              )}
              {testimonial.trip_taken && (
                <span className="inline-block bg-gold text-dark text-xs font-semibold px-3 py-1 rounded-full mt-4">
                  {testimonial.trip_taken}
                </span>
              )}
            </div>
          </Reveal>

          {/* Quote */}
          <Reveal>
            <div className="text-center mb-14">
              <span className="text-gold text-5xl font-heading leading-none">
                &ldquo;
              </span>
              <p className="text-dark text-lg md:text-xl leading-relaxed italic -mt-3 max-w-2xl mx-auto">
                {testimonial.quote}
              </p>
            </div>
          </Reveal>

          {testimonial.bio && (
            <Reveal>
              <div className="mb-12 pb-12 border-b border-dark/10">
                <h2 className="font-heading text-xl text-dark mb-3">Bio</h2>
                <p className="text-charcoal leading-relaxed">
                  {testimonial.bio}
                </p>
              </div>
            </Reveal>
          )}

          {testimonial.full_story && (
            <Reveal>
              <div className="mb-12 pb-12 border-b border-dark/10">
                <h2 className="font-heading text-xl text-dark mb-4">
                  The Full Story
                </h2>
                <div className="text-charcoal leading-relaxed space-y-4">
                  {testimonial.full_story.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {testimonial.gallery?.length > 0 && (
            <Reveal>
              <div className="mb-12">
                <h2 className="font-heading text-xl text-dark mb-4">
                  Photos From the Journey
                </h2>
                <Gallery images={testimonial.gallery} />
              </div>
            </Reveal>
          )}

          <div className="text-center pt-4">
            <p className="text-charcoal mb-5">
              Inspired by {testimonial.name.split(" ")[0]}&apos;s journey? Start
              planning your own.
            </p>
            <Link
              href="/trips"
              className="inline-block bg-gold hover:bg-dark hover:text-white transition-colors duration-300 text-dark font-semibold px-8 py-3 rounded"
            >
              View Trips
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
