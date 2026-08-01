import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicBlogPostBySlug, getAllBlogSlugs } from "@/lib/data/blog";

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPublicBlogPostBySlug(slug);

  if (!post) return {};

  return {
    title: `${post.title} | Ariana Expeditions`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.cover_image ? [post.cover_image] : ["/images/hero1.jpg"],
      type: "article",
    },
  };
}

export const revalidate = 0;

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = await getPublicBlogPostBySlug(slug);

  if (!post) return notFound();

  return (
    <>
      <Navbar />

      <section className="relative h-[50vh] w-full">
        <Image
          src={post.cover_image || "/images/hero1.jpg"}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/30 to-dark/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          {post.category && (
            <span className="bg-gold text-dark text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>
          )}
          <h1 className="font-heading text-3xl md:text-5xl text-white drop-shadow-lg max-w-3xl">
            {post.title}
          </h1>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 text-charcoal/60 text-sm mb-10 pb-6 border-b border-dark/10">
          <span>{post.author}</span>
          <span className="w-1 h-1 rounded-full bg-charcoal/40" />
          <span>{formatDate(post.created_at)}</span>
        </div>

        <div
          className="prose-content text-charcoal leading-relaxed space-y-5"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-16 pt-10 border-t border-dark/10 text-center">
          <h3 className="font-heading text-xl text-dark mb-3">
            Ready to Experience It Yourself?
          </h3>
          <p className="text-charcoal mb-6">
            Explore our guided itineraries or tell us what you have in mind.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/trips"
              className="inline-block bg-gold hover:bg-dark hover:text-white transition-colors duration-300 text-dark font-semibold px-8 py-3 rounded"
            >
              View Trips
            </Link>
            <Link
              href="/contact"
              className="inline-block border border-dark text-dark hover:bg-dark hover:text-white transition-colors duration-300 font-semibold px-8 py-3 rounded"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
