import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | Ariana Expeditions",
  description:
    "How Ariana Expeditions collects, uses, and protects your personal information.",
};

export default function Privacy() {
  return (
    <>
      <Navbar />

      <section className="bg-dark pt-32 pb-16 px-6 text-center">
        <h1 className="font-heading text-4xl md:text-5xl text-white mb-4">
          Privacy Policy
        </h1>
        <p className="text-white/80 max-w-xl mx-auto">
          Your trust matters to us — here&apos;s how we handle your information.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 space-y-10">
        <div>
          <h2 className="font-heading text-2xl text-dark mb-3">
            Information We Collect
          </h2>
          <p className="text-charcoal leading-relaxed">
            When you submit a booking inquiry or newsletter signup, we collect
            the details you provide — such as your name, email address, phone
            number, travel dates, and any message you send us. We do not collect
            payment information through this website.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-2xl text-dark mb-3">
            How We Use Your Information
          </h2>
          <p className="text-charcoal leading-relaxed">
            We use the information you provide solely to respond to your
            inquiry, plan your itinerary, and communicate with you about your
            trip. If you sign up for our newsletter, we&apos;ll send occasional
            updates about new itineraries and travel stories — you can
            unsubscribe at any time.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-2xl text-dark mb-3">
            How We Protect Your Information
          </h2>
          <p className="text-charcoal leading-relaxed">
            Your personal information is sacred to us. We will never sell or
            share it with third parties for marketing purposes. Inquiry and
            newsletter data is handled through trusted third-party services
            (such as our form and email providers) solely to deliver the
            functionality of this site.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-2xl text-dark mb-3">Cookies</h2>
          <p className="text-charcoal leading-relaxed">
            This website may use basic analytics cookies to understand how
            visitors use our site, helping us improve content and user
            experience. No personally identifiable information is sold or shared
            through this data.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-2xl text-dark mb-3">Your Rights</h2>
          <p className="text-charcoal leading-relaxed">
            You may request a copy of the information we hold about you, ask us
            to correct it, or request that we delete it at any time — just reach
            out via our{" "}
            <a href="/contact" className="text-gold hover:underline">
              contact page
            </a>
            .
          </p>
        </div>

        <div className="border-t border-dark/10 pt-8">
          <h2 className="font-heading text-2xl text-dark mb-3">Questions?</h2>
          <p className="text-charcoal leading-relaxed">
            If you have any questions about this Privacy Policy or how your data
            is handled, contact us at{" "}
            <a
              href="mailto:info@arianaexpeditions.com"
              className="text-gold hover:underline"
            >
              info@arianaexpeditions.com
            </a>
            .
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
