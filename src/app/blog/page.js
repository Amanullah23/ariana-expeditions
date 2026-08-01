import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getPublicBlogPosts } from "@/lib/data/blog";

export const metadata = {
  title: "Travel Guide & Blog | Ariana Expeditions",
  description:
    "Everything you need to know before visiting Afghanistan — safety, visas, culture, food, and the best time to travel, from an Afghanistan travel specialist.",
};

export const revalidate = 0;

export default async function Blog() {
  const posts = await getPublicBlogPosts();

  return (
    <>
      <Navbar />

      <section className="bg-dark pt-32 pb-20 px-6 text-center">
        <Reveal>
          <span className="text-gold text-xs font-semibold tracking-widest uppercase">
            Travel Guide
          </span>
          <h1 className="font-heading text-4xl md:text-5xl text-white mt-2 mb-4">
            The Ariana Journal
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Practical guidance and honest answers for travelers considering
            Afghanistan — safety, culture, visas, food, and everything in
            between.
          </p>
        </Reveal>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <Reveal key={post.id} delay={i * 100}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col h-full bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48 shrink-0">
                    <Image
                      src={post.cover_image || "/images/hero1.jpg"}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {post.category && (
                      <span className="absolute top-3 left-3 bg-gold text-dark text-xs font-semibold px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h2 className="font-heading text-lg mb-2 leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-charcoal text-sm mb-4 flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <span className="text-gold text-sm font-medium group-hover:underline">
                      Read More →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="text-charcoal text-center py-12">
            New articles are on the way — check back soon.
          </p>
        )}
      </section>

      <section className="bg-white py-16 px-6 text-center border-t border-dark/10">
        <Reveal>
          <h2 className="font-heading text-2xl md:text-3xl text-dark mb-3">
            Have a Question We Haven&apos;t Covered?
          </h2>
          <p className="text-charcoal max-w-md mx-auto mb-6">
            Check our full FAQ, or reach out directly and we&apos;ll answer
            personally.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/faq"
              className="inline-block border border-dark text-dark hover:bg-dark hover:text-white transition-colors duration-300 font-semibold px-8 py-3 rounded"
            >
              Visit FAQ
            </Link>
            <Link
              href="/contact"
              className="inline-block bg-gold hover:bg-dark hover:text-white transition-colors duration-300 text-dark font-semibold px-8 py-3 rounded"
            >
              Contact Us
            </Link>
          </div>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
